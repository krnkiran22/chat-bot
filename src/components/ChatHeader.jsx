import React from 'react';

const ChatHeader = ({ onClose }) => {
    return (
        <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                        />
                    </svg>
                </div>
                <div>
                    <h3 className="font-semibold">AI Therapy Assistant</h3>
                    <p className="text-xs text-indigo-200">Online now</p>
                </div>
            </div>
            <button
                onClick={onClose}
                className="text-indigo-200 hover:text-white transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default ChatHeader;