import React, { useState, useEffect, useMemo } from 'react';
import ChatInput from './ChatInput';
import TrainingSettings from './TrainingSettings';
import { sendMessageToGroq } from '../services/groqService';

const ChatInterface = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm your AI therapy assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [trainingSettings, setTrainingSettings] = useState({
        trainingMode: 'therapy',
        customContext: '',
        temperature: 0.7,
        maxTokens: 500
    });

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        const messagesContainer = document.getElementById('messages-container');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputMessage;
        setInputMessage('');
        setIsTyping(true);

        try {
            // Get AI response from Groq with training settings
            const aiResponse = await sendMessageToGroq(currentInput, messages, trainingSettings);

            const botResponse = {
                id: Date.now() + 1,
                text: aiResponse,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('Error getting AI response:', error);
            const errorResponse = {
                id: Date.now() + 1,
                text: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleTrainingSettingsChange = (newSettings) => {
        setTrainingSettings(newSettings);
        // Update the welcome message based on training mode
        const welcomeMessages = {
            therapy: "Hello! I'm your AI therapy assistant. How can I help you today?",
            web3: "Hello! I'm your Web3 expert assistant. Ready to explore blockchain, DeFi, NFTs, and more!",
            general: "Hello! I'm your AI assistant. How can I help you today?"
        };

        setMessages(prev => [
            {
                ...prev[0],
                text: welcomeMessages[newSettings.trainingMode] || welcomeMessages.therapy
            },
            ...prev.slice(1)
        ]);
    };

    // Function to parse message text for links
    const formatMessageText = (text) => {
        const linkRegex = /<a\s+href="([^"]+)"\s+target="_blank"\s+rel="noopener noreferrer">Book now<\/a>/;
        const match = text.match(linkRegex);
        if (match) {
            const [, url] = match;
            const textBefore = text.slice(0, match.index);
            const textAfter = text.slice(match.index + match[0].length);
            return (
                <>
                    {textBefore}
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 underline hover:text-teal-800"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Book now
                    </a>
                    {textAfter}
                </>
            );
        }
        return text;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Modal */}
            <div className="relative bg-gradient-to-b from-rose-200 via-pink-100 to-rose-50 shadow-2xl w-[450px] h-[600px] flex flex-col rounded-3xl overflow-hidden md:w-[450px] md:h-[600px] w-[95vw] h-[70vh] max-w-[90vw] max-h-[80vh]">
                {/* Chat Header */}
                <div className="p-6 flex justify-between items-start">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Therapy Site</h3>
                            <p className="text-sm text-gray-600">Therapy Assistant</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div id="messages-container" className="flex-1 overflow-y-auto p-6 space-y-4">
                    {/* Initial Bot Message with Avatar */}
                    <div className="flex justify-start items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                                </svg>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl px-4 py-3 shadow-sm max-w-xs">
                            <p className="text-gray-800 text-sm mb-2">
                                <span className="font-semibold">Greetings! I'm Therapy Assistant</span><br />
                                I'm here to provide mental health support and guidance. Talk to me about anything that's on your mind.
                            </p>
                            <p className="text-gray-600 text-sm mb-3">
                                Choose one of these popular topics or type your question below. You can also reach out for immediate support.
                            </p>

                            {/* Quick Action Buttons */}
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                <button className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-600 hover:bg-red-100 transition-colors flex items-center space-x-1">
                                    <span>🎒</span>
                                    <span>Anxiety Support</span>
                                </button>
                                <button className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-600 hover:bg-red-100 transition-colors flex items-center space-x-1">
                                    <span>📅</span>
                                    <span>Schedule Session</span>
                                </button>
                                <button className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-600 hover:bg-red-100 transition-colors flex items-center space-x-1">
                                    <span>🎯</span>
                                    <span>Coping Skills</span>
                                </button>
                                <button className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-600 hover:bg-red-100 transition-colors flex items-center space-x-1">
                                    <span>✈️</span>
                                    <span>Crisis Support</span>
                                </button>
                            </div>

                            <div className="bg-red-50 rounded-lg p-3">
                                <div className="flex items-center space-x-2 text-red-600">
                                    <span>⚡</span>
                                    <span className="font-semibold text-sm">Skill Spotlight</span>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">
                                    Do you know I can help you with breathing exercises and mindfulness techniques?
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Messages */}
                    {messages.slice(1).map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start items-start space-x-3'}`}>
                            {message.sender === 'bot' && (
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                            <div className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${message.sender === 'user'
                                ? 'bg-rose-500 text-white'
                                : 'bg-white text-gray-800'
                                }`}>
                                <p className="text-sm">{formatMessageText(message.text)}</p>
                                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-rose-200' : 'text-gray-500'
                                    }`}>
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start items-start space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 space-y-3">
                    {/* Input Field with Send Button */}
                    <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                        <button className="text-rose-400 hover:text-rose-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type your question here..."
                            className="flex-1 px-2 py-2 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                        />
                        <TrainingSettings
                            onSettingsChange={handleTrainingSettingsChange}
                            currentSettings={trainingSettings}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim()}
                            className="text-rose-500 hover:text-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors p-1"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="flex justify-center space-x-8 text-xs text-gray-500">
                        <button className="hover:text-gray-700 transition-colors">My Skills</button>
                        <button className="hover:text-gray-700 transition-colors">T&C</button>
                        <button className="hover:text-gray-700 transition-colors">Feedback</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;