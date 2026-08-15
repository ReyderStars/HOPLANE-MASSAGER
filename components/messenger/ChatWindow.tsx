'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

interface Message {
  id: string;
  text: string;
  sender: string;
  senderUsername: string;
  timestamp: Date;
}

interface ChatWindowProps {
  chatName: string;
  messages: Message[];
  onSendMessage: (text: string) => Promise<void>;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chatName, messages, onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setLoading(true);
    try {
      await onSendMessage(messageText);
      setMessageText('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-dark">{chatName}</h2>
          <p className="text-sm text-gray-600">Online</p>
        </div>
        <button className="text-gray-500 hover:text-gray-700">⋮</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === userData?.uid ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === userData?.uid
                    ? 'bg-primary-600 text-white rounded-br-none'
                    : 'bg-white text-dark border border-gray-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm font-semibold mb-1">{message.senderUsername}</p>
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === userData?.uid
                    ? 'text-primary-100'
                    : 'text-gray-500'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-center">
            <p>Нет сообщений. Начните разговор!</p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Напишите сообщение..."
            disabled={loading}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            disabled={loading || !messageText.trim()}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            {loading ? '...' : '➤'}
          </button>
        </form>
      </div>
    </div>
  );
};
