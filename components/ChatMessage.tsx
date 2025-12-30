
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  // Basic markdown-like formatter for bold and lists
  const formatText = (text: string) => {
    // Remove apparent hashtags (#) but keep the text following them
    // This handles both markdown headers and social-style hashtags
    const cleanedText = text.replace(/#/g, '');

    return cleanedText.split('\n').map((line, i) => {
      // Bold text
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // List items
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <div key={i} className="flex gap-2 mb-1">
            <span className="text-yellow-500">•</span>
            <span dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^[-*]\s/, '') }} />
          </div>
        );
      }
      
      // Numbered lists
      if (/^\d+\./.test(line.trim())) {
        return (
          <div key={i} className="flex gap-2 mb-1">
            <span className="font-bold text-yellow-600">{line.match(/^\d+/)?.[0]}.</span>
            <span dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^\d+\.\s/, '') }} />
          </div>
        );
      }

      return <p key={i} className="mb-2 last:mb-0" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  return (
    <div className={`flex w-full mb-4 ${isModel ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
        isModel 
          ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-none' 
          : 'bg-yellow-400 text-gray-900 font-medium rounded-tr-none'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          {isModel ? (
            <span className="text-[10px] uppercase tracking-wider font-bold text-yellow-600 flex items-center gap-1">
              <i className="fa-solid fa-robot"></i> MeliExpert IA
            </span>
          ) : (
            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-600 flex items-center gap-1">
              <i className="fa-solid fa-user"></i> Você
            </span>
          )}
        </div>
        <div className="text-sm sm:text-base leading-relaxed">
          {formatText(message.text)}
        </div>
        <div className={`text-[10px] mt-1 ${isModel ? 'text-gray-400' : 'text-gray-700'} text-right`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
