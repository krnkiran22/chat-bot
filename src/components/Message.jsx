import React, { useMemo } from 'react';
import { User, Bot } from 'lucide-react';

function Message({ message, isLast }) {
  const formattedText = useMemo(() => {
    // Match <a href="URL" target="_blank" rel="noopener noreferrer">Book now</a>
    const linkRegex = /<a\s+href="([^"]+)"\s+target="_blank"\s+rel="noopener noreferrer">Book now<\/a>/;
    const match = message.text.match(linkRegex);
    if (match) {
      const [, url] = match;
      const textBefore = message.text.slice(0, match.index);
      const textAfter = message.text.slice(match.index + match[0].length);
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
    return message.text;
  }, [message.text]);

  return (
    <div
      className={`group relative flex items-start gap-4 px-4 py-6 sm:px-6 lg:px-8 ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow ${
          message.role === 'user'
            ? 'order-2 bg-white'
            : 'order-1 bg-rose-500 text-white'
        }`}
      >
        {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div
        className={`space-y-2 text-sm ${message.role === 'user' ? 'order-1' : 'order-2'}`}
      >
        <div
          className={`inline-block rounded-lg px-3 py-2 ${
            message.role === 'user'
              ? 'bg-rose-500 text-white'
              : 'bg-white text-gray-800'
          }`}
        >
          <div className="text-sm whitespace-pre-wrap">{formattedText}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;