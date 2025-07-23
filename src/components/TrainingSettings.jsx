import React, { useState } from 'react';

const TrainingSettings = ({ onSettingsChange, currentSettings }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
        trainingMode: 'therapy',
        customContext: '',
        temperature: 0.7,
        maxTokens: 500,
        ...currentSettings
    });

    const trainingModes = [
        { value: 'therapy', label: 'Therapy Assistant', icon: '🧠' },
        { value: 'web3', label: 'Web3 Expert', icon: '⛓️' },
        { value: 'general', label: 'General Assistant', icon: '🤖' }
    ];

    const handleSettingChange = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        onSettingsChange(newSettings);
    };

    return (
        <div className="relative">
            {/* Settings Toggle Button */}
           
            {/* Settings Panel */}
            {isOpen && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-2xl shadow-2xl p-4 w-80 border border-rose-200 z-50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-800">AI Training Settings</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Training Mode Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Training Mode</label>
                        <div className="space-y-2">
                            {trainingModes.map((mode) => (
                                <label key={mode.value} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="trainingMode"
                                        value={mode.value}
                                        checked={settings.trainingMode === mode.value}
                                        onChange={(e) => handleSettingChange('trainingMode', e.target.value)}
                                        className="text-rose-500 focus:ring-rose-500"
                                    />
                                    <span className="text-lg">{mode.icon}</span>
                                    <span className="text-sm text-gray-700">{mode.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Custom Context */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Custom Context</label>
                        <textarea
                            value={settings.customContext}
                            onChange={(e) => handleSettingChange('customContext', e.target.value)}
                            placeholder="Add specific context or instructions for the AI..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                            rows="3"
                        />
                    </div>

                    {/* Temperature Setting */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Creativity Level: {settings.temperature}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={settings.temperature}
                            onChange={(e) => handleSettingChange('temperature', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Focused</span>
                            <span>Creative</span>
                        </div>
                    </div>

                    {/* Max Tokens */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Response Length</label>
                        <select
                            value={settings.maxTokens}
                            onChange={(e) => handleSettingChange('maxTokens', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        >
                            <option value={250}>Short (250 tokens)</option>
                            <option value={500}>Medium (500 tokens)</option>
                            <option value={1000}>Long (1000 tokens)</option>
                            <option value={2000}>Very Long (2000 tokens)</option>
                        </select>
                    </div>

                    {/* Current Mode Indicator */}
                    <div className="bg-rose-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">
                                {trainingModes.find(m => m.value === settings.trainingMode)?.icon}
                            </span>
                            <div>
                                <p className="text-sm font-medium text-rose-800">
                                    Current Mode: {trainingModes.find(m => m.value === settings.trainingMode)?.label}
                                </p>
                                <p className="text-xs text-rose-600">
                                    AI responses will be optimized for this context
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainingSettings;