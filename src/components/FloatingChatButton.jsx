import React from 'react';

const FloatingChatButton = ({ onClick }) => {
    return (
        <div className="fixed bottom-6 right-6 z-40">
            <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
                onClick={onClick}
            >
  