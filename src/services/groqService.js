
// Training context for therapist bot
const TRAINING_CONTEXT = {
    therapy: {
        context: `You are a compassionate AI therapist with expertise in:
        - Mental health counseling
        - Cognitive Behavioral Therapy (CBT)
        - Mindfulness and stress reduction
        - Anxiety and depression management
        - Trauma-informed care
        - Crisis intervention
        - Therapeutic communication
        - Evidence-based treatments
        - Self-care and wellness
        - Health condition support, including:
          - Prompting users to describe symptoms when they report feeling unwell
          - Analyzing symptoms to suggest possible health conditions
          - Recommending consultations with specialists at Chennai hospitals: Perambur Wellness Hospital (Perambur), Avadi Care Clinic (Avadi), or Tambaram Therapy Center (Tambaram)
          - When recommending a doctor, provide: doctor name, specialization, and booking link in this exact format: <a href="URL" target="_blank" rel="noopener noreferrer">Book now</a>
          - Always use the actual booking URL from the hospital data, never use placeholders like "link"
          - Ask if the user wants to book an appointment only once, providing specialist details only if they agree
        For non-therapy queries (e.g., technical questions), politely redirect to therapy support. Responses must be concise (under 100 words), empathetic, and professional, avoiding unnecessary elaboration.`,
        tone: "empathetic, supportive, professional, and non-judgmental"
    }
};

// Mock hospital and doctor data
const HOSPITALS = [
    {
        name: "Perambur Wellness Hospital",
        location: "Perambur, Chennai",
        specialist: {
            name: "Dr. Kumar",
            specialization: "Neurology",
            contact: "044-2555 1234",
            bookingLink: "http://www.peramburwellnesshospital.com/book"
        }
    },
    {
        name: "Avadi Care Clinic",
        location: "Avadi, Chennai",
        specialist: {
            name: "Dr. V. Jayanthini",
            specialization: "Psychiatry",
            contact: "+91 9123456789",
            bookingLink: "https://avadiclinic.com/book-appointment"
        }
    },
    {
        name: "Tambaram Therapy Center",
        location: "Tambaram, Chennai",
        specialist: {
            name: "Dr. C. Alagappan",
            specialization: "General Medicine",
            contact: "+91 9012345678",
            bookingLink: "https://tambaramtherapy.com/book-appointment"
        }
    }
];

// Function to get system prompt
const getSystemPrompt = (customContext = '') => {
    const { context, tone } = TRAINING_CONTEXT.therapy;
    return `${context}\n\nYour communication style should be ${tone}.\n\n${customContext ? `Additional Context: ${customContext}` : ''}\n\nAlways provide helpful, accurate, and relevant responses while maintaining the appropriate tone.`;
};

export const sendMessageToGroq = async (message, conversationHistory = [], options = {}) => {
    const {
        customContext = '',
        temperature = 0.7,
        maxTokens = 200
    } = options;

    try {
        // Check for unwell queries or affirmations
        const isUnwellQuery = /not feeling well|feeling bad|unwell|sick|ill|not good|bleeding|chest pain|heart/i.test(message);
        const isAffirmation = /^(yes|sure|okay|ok|yeah|yep)$/i.test(message.trim());
        const isNonTherapyQuery = /web3|blockchain|python|code|programming/i.test(message);

        // Check if symptom or appointment prompt was recently sent
        const hasRecentSymptomPrompt = conversationHistory.slice(-2).some(msg => 
            msg.role === 'assistant' && msg.text.includes("Please describe your symptoms")
        );
        const hasRecentAppointmentPrompt = conversationHistory.slice(-2).some(msg => 
            msg.role === 'assistant' && msg.text.includes("Would you like to book an appointment")
        );

        // Prepare messages for the API
        const messages = [
            {
                role: "system",
                content: getSystemPrompt(customContext)
            },
            ...conversationHistory.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
            })),
            {
                role: "user",
                content: message
            }
        ];

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_GROQ}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: messages,
                max_tokens: maxTokens,
                temperature: temperature
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        let responseText = data.choices[0].message.content;

        // Handle conversation flow
        if (isNonTherapyQuery) {
            responseText = "I’m here to assist with therapy and health concerns. Could you share how you’re feeling or any symptoms you’re experiencing?";
        } else if (isUnwellQuery) {
            responseText = "Please describe your symptoms (e.g., headache, fatigue, chest pain, or severity of bleeding) for further assistance.";
        } else if (hasRecentSymptomPrompt && !isAffirmation) {
            // Analyze symptoms and suggest a specialist
            const isCardiac = /chest pain|heart|cardiac/i.test(message);
            const isBleeding = /bleeding/i.test(message);
            const hospital = (isBleeding || isCardiac) 
                ? HOSPITALS.find(h => h.name.includes("Perambur")) || HOSPITALS[0]
                : HOSPITALS[Math.floor(Math.random() * HOSPITALS.length)];
            const specialist = hospital.specialist;
            responseText = `I'm concerned about your symptoms. Would you like to book an appointment with ${specialist.name}, a ${specialist.specialization.toLowerCase()} specialist at ${hospital.name}?`;
        } else if (isAffirmation && hasRecentAppointmentPrompt) {
            const hospital = HOSPITALS.find(h => h.name.includes("Perambur")) || HOSPITALS[0];
            const specialist = hospital.specialist;
            responseText = `I recommend seeing ${specialist.name}, a ${specialist.specialization.toLowerCase()} specialist at ${hospital.name}. <a href="${specialist.bookingLink}" target="_blank" rel="noopener noreferrer">Book now</a>`;
        } else if (hasRecentSymptomPrompt || hasRecentAppointmentPrompt) {
            responseText = "Please clarify your symptoms or needs, and I’ll assist further.";
        }

        return responseText;
    } catch (error) {
        console.error('Error calling Groq API:', error);
        return "Sorry, I can't connect now. Try again soon or contact a crisis hotline if urgent.";
    }
};
