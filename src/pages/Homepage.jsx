import React, { useState, useEffect } from 'react';
import ChatInterface from '../components/ChatInterface';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Mock doctor data
const HOSPITALS = [
    {
      name: "Perambur Wellness Hospital",
      location: "Perambur, Chennai",
      specialist: {
        name: "Dr. Kumar",
        specialization: "Neurology",
        contact: "044-2555 1234",
        bookingLink: "http://www.google.com",
        image: "https://images.unsplash.com/photo-1622253692010-333f2b7c2e7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      images: [
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      name: "Avadi Care Clinic",
      location: "Avadi, Chennai",
      specialist: {
        name: "Dr. V. Jayanthini",
        specialization: "Psychiatry",
        contact: "+91 9123456789",
        bookingLink: "http://www.google.com",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea263f6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      images: [
        "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      name: "Tambaram Therapy Center",
      location: "Tambaram, Chennai",
      specialist: {
        name: "Dr. C. Alagappan",
        specialization: "General Medicine",
        contact: "+91 9012345678",
        bookingLink: "http://www.google.com",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      images: [
        "https://images.unsplash.com/photo-1576091160397-57d8c89a7a3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1585435557343-3b078343e12d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      ]
    }
  ];

// Testimonials data
const TESTIMONIALS = [
    {
        name: "Rahul Sharma",
        role: "Patient",
        content: "The care I received at Therapy Sites was exceptional. Dr. Kumar's expertise helped me overcome my anxiety issues.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
        name: "Priya Patel",
        role: "Patient",
        content: "Couples therapy saved our marriage. The compassionate approach made us feel understood and supported.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
        name: "Arjun Mehta",
        role: "Patient",
        content: "The group therapy sessions provided a safe space to share and learn from others with similar experiences.",
        image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
];

const Homepage = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [doctors, setDoctors] = useState(HOSPITALS);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    // Prevent body scroll when chat is open
    useEffect(() => {
        if (isChatOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isChatOpen]);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                       
                            <div>
                                <h1 className="text-2xl font-serif font-bold text-gray-800">Therapy Sites</h1>
                                <span className="text-xs text-gray-500">Centres Paramédicaux</span>
                            </div>
                        </div>
                        <nav className="hidden md:flex space-x-6 items-center">
                            <a href="#about" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">About</a>
                            <a href="#services" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Services</a>
                            <a href="#testimonials" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Testimonials</a>
                            <a href="#contact" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Contact</a>
                            <a
                                href="http://www.google.com"
                                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 font-medium transition-colors shadow-md hover:shadow-lg"
                            >
                                Book Appointment
                            </a>
                        </nav>
                        <button className="md:hidden text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-16 md:py-24 bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Carousel 
                        showArrows={false} 
                        showStatus={false} 
                        showThumbs={false} 
                        infiniteLoop 
                        autoPlay 
                        interval={5000}
                        stopOnHover={false}
                        transitionTime={1000}
                        swipeable={false}
                        emulateTouch={false}
                        className="h-full"
                    >
                        {doctors.map((doctor, index) => (
                            <div key={index} className="h-full">
                                <img 
                                    src={doctor.images[0]} 
                                    alt={doctor.name} 
                                    className="w-full h-full object-cover opacity-40"
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                                Your Path to <span className="text-teal-400">Mental Wellness</span>
                            </h2>
                            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                                Connect with our expert doctors for compassionate, personalized therapy in a supportive environment.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <a
                                    href="http://www.google.com"
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    Schedule Consultation
                                </a>
                                <a
                                    href="#about"
                                    className="border-2 border-white text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-white hover:bg-opacity-10 hover:text-black  transition-colors"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>
                        <div className="hidden lg:block relative">
                            <div className="relative rounded-xl overflow-hidden shadow-2xl transform rotate-1">
                                <img
                                    src="https://images.unsplash.com/photo-1550831107-1553da8c8464?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    alt="Doctor consultation"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl">
                                <div className="flex items-center">
                                    <div className="bg-teal-100 p-2 rounded-full mr-3">
                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">Certified Professionals</p>
                                        <p className="text-xs text-gray-600">Licensed & Experienced</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="p-6">
                            <p className="text-4xl font-bold text-teal-600 mb-2">98%</p>
                            <p className="text-gray-600">Patient Satisfaction</p>
                        </div>
                        <div className="p-6">
                            <p className="text-4xl font-bold text-teal-600 mb-2">15+</p>
                            <p className="text-gray-600">Years Experience</p>
                        </div>
                        <div className="p-6">
                            <p className="text-4xl font-bold text-teal-600 mb-2">5K+</p>
                            <p className="text-gray-600">Patients Helped</p>
                        </div>
                        <div className="p-6">
                            <p className="text-4xl font-bold text-teal-600 mb-2">24/7</p>
                            <p className="text-gray-600">Emergency Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="specialists" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
            Meet Our <span className="text-teal-600">Specialists</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team of board-certified professionals is dedicated to your mental and physical well-being.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOSPITALS.map((hospital, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Hospital Images Carousel */}
              <div className="h-48">
                <Carousel 
                  showArrows={true}
                  showStatus={false}
                  showThumbs={false}
                  infiniteLoop={true}
                  autoPlay={true}
                  interval={5000}
                  stopOnHover={true}
                  swipeable={true}
                  emulateTouch={true}
                  dynamicHeight={false}
                  className="h-full"
                >
                  {hospital.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="h-48">
                      <img 
                        src={image} 
                        alt={hospital.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              
              {/* Specialist Info */}
              <div className="p-6">
                <div className="flex items-start">

                  <div className="">
                    <h3 className="text-xl font-semibold text-gray-800">{hospital.specialist.name}</h3>
                    <p className="text-teal-600 text-sm font-medium">{hospital.specialist.specialization}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {hospital.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {hospital.specialist.contact}
                  </div>
                </div>
                
                <a
                  href={hospital.specialist.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block w-full text-center bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-medium transition-colors shadow-md hover:shadow-lg"
                >
                  Book Consultation
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

            {/* Services Section */}
            <section id="services" className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">Our <span className="text-teal-600">Therapy Services</span></h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Personalized treatment plans tailored to your unique needs and goals.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Individual Therapy"
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-teal-100 p-2 rounded-lg mr-4">
                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800">Individual Therapy</h3>
                                </div>
                                <p className="text-gray-600 mb-4">One-on-one sessions for personal growth and healing in a confidential setting.</p>
                                <ul className="text-sm text-gray-500 space-y-2 mb-6">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Anxiety & Depression
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Trauma Recovery
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Life Transitions
                                    </li>
                                </ul>
                                <a href="#" className="text-teal-600 font-medium hover:text-teal-800 transition-colors flex items-center">
                                    Learn more
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1512436991641-0fd4b24cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Couples Therapy"
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-teal-100 p-2 rounded-lg mr-4">
                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800">Couples Therapy</h3>
                                </div>
                                <p className="text-gray-600 mb-4">Strengthen your relationship through improved communication and understanding.</p>
                                <ul className="text-sm text-gray-500 space-y-2 mb-6">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Communication Skills
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Conflict Resolution
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Intimacy Issues
                                    </li>
                                </ul>
                                <a href="#" className="text-teal-600 font-medium hover:text-teal-800 transition-colors flex items-center">
                                    Learn more
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1527610276295-f2e8632b4618?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Group Therapy"
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-teal-100 p-2 rounded-lg mr-4">
                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800">Group Therapy</h3>
                                </div>
                                <p className="text-gray-600 mb-4">Connect with others in a supportive environment to share experiences and grow together.</p>
                                <ul className="text-sm text-gray-500 space-y-2 mb-6">
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Support Groups
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Skills Training
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Peer Connection
                                    </li>
                                </ul>
                                <a href="#" className="text-teal-600 font-medium hover:text-teal-800 transition-colors flex items-center">
                                    Learn more
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-16 md:py-24 bg-teal-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">Patient <span className="text-teal-600">Testimonials</span></h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Hear from those who have experienced our care firsthand.
                        </p>
                    </div>
                    <div className="relative max-w-3xl mx-auto">
                        <div className="relative h-64 overflow-hidden">
                            {TESTIMONIALS.map((testimonial, index) => (
                                <div 
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ${index === activeTestimonial ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <div className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col">
                                        <div className="flex-grow">
                                            <svg className="w-8 h-8 text-teal-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>
                                            <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                                        </div>
                                        <div className="flex items-center">
                                            <img 
                                                src={testimonial.image} 
                                                alt={testimonial.name} 
                                                className="w-12 h-12 rounded-full object-cover mr-4"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-8 space-x-2">
                            {TESTIMONIALS.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-3 h-3 rounded-full ${index === activeTestimonial ? 'bg-teal-600' : 'bg-gray-300'}`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">Get In <span className="text-teal-600">Touch</span></h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Take the first step toward better mental health with our expert team. We're here to listen and help.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-teal-100 p-3 rounded-full mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Phone</p>
                                        <p className="text-gray-600">(555) 123-4567</p>
                                        <p className="text-sm text-gray-500 mt-1">24/7 emergency support available</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-teal-100 p-3 rounded-full mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Email</p>
                                        <p className="text-gray-600">contact@animacorpus.com</p>
                                        <p className="text-sm text-gray-500 mt-1">Typically respond within 24 hours</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-teal-100 p-3 rounded-full mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Office</p>
                                        <p className="text-gray-600">123 Wellness Street<br />Suite 200, Chennai, TN 600001</p>
                                        <p className="text-sm text-gray-500 mt-1">Multiple locations across the city</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">Schedule Your <span className="text-teal-600">Appointment</span></h3>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                                            placeholder="+91 1234567890"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Service <span className="text-red-500">*</span></label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors">
                                        <option>Select a service</option>
                                        <option>Individual Therapy</option>
                                        <option>Couples Therapy</option>
                                        <option>Group Therapy</option>
                                        <option>Not sure - need guidance</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                                        placeholder="Tell us about your needs..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md font-medium transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-96 bg-gray-100">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0080690943427!2d80.2915143153469!3d13.098890290787254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f446e1a3189%3A0x298d81a5f1a0a1b5!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen="" 
                    loading="lazy"
                    title="Location Map"
                ></iframe>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <img 
                                    src="https://images.unsplash.com/photo-1585435557343-3b078343e12d?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&q=80" 
                                    alt="Logo" 
                                    className="h-10 w-10 rounded-full mr-3"
                                />
                                <h3 className="text-xl font-serif font-bold">Therapy Sites</h3>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">Providing compassionate mental health services for your well-being since 2010.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#about" className="hover:text-teal-400 transition-colors">About Us</a></li>
                                <li><a href="#services" className="hover:text-teal-400 transition-colors">Our Services</a></li>
                                <li><a href="#testimonials" className="hover:text-teal-400 transition-colors">Patient Stories</a></li>
                                <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Services</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Individual Therapy</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Couples Counseling</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Group Therapy</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Teen Counseling</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Online Therapy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Office Hours</h4>
                            <div className="text-gray-400 text-sm space-y-2">
                                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p>Saturday: 10:00 AM - 4:00 PM</p>
                                <p>Sunday: Closed</p>
                                <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                                    <p className="text-teal-400 font-medium">Emergency Support</p>
                                    <p className="text-xs text-gray-400">Available 24/7 at (555) 987-6543</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
                        <p>© {new Date().getFullYear()} Therapy Sites Therapy Services. All rights reserved.</p>
                        <div className="mt-2 flex justify-center space-x-4">
                            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-teal-400 transition-colors">HIPAA Compliance</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Chat Interface Component */}
            <ChatInterface
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
            />

            {/* Floating Chatbot Icon */}
            <div className="fixed bottom-6 right-6 z-40 group">
                <button
                    className="bg-teal-600 hover:bg-teal-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
                    onClick={() => setIsChatOpen(true)}
                    aria-label="Open chat"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                    <span className="absolute -top-12 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Chat with our AI Assistant
                        <span className="absolute bottom-0 right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 transform translate-y-full"></span>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Homepage;