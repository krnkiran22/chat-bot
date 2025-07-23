import React from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, isTyping }) => {
    return (
        <div id="messages-container" className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
                <Message key={message.id} message={message} />
            ))}

            {isTyping && <TypingIndicator />}
        </div>
    );
};

export default MessageList;