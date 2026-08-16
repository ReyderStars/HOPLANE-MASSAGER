'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MessageItem } from './MessageItem';

interface Message {
  id: string;
  text: string;
  sender: string;
  senderUsername: string;
  timestamp: Date;
  reactions?: { emoji: string; count: number; users: string[] }[];
  isEdited?: boolean;
  isPinned?: boolean;
  image?: string;
}

interface ChatWindowProps {
  chatName: string;
  messages: Message[];
  onSendMessage: (text: string, image?: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chatName,
  messages,
  onSendMessage,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState<string[]>([]);
  const [favoriteMessages, setFavoriteMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTyping = () => {
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleSend = () => {
    if (!inputValue.trim() && !selectedImage) return;

    let finalText = inputValue;
    if (isBold) finalText = `**${finalText}**`;
    if (isItalic) finalText = `*${finalText}*`;
    if (isCode) finalText = `` `${finalText}` ``;

    onSendMessage(finalText, selectedImage || undefined);
    setInputValue('');
    setSelectedImage(null);
    setIsBold(false);
    setIsItalic(false);
    setIsCode(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReact = (messageId: string, emoji: string) => {
    // Demo: просто логируем
    console.log(`Реакция ${emoji} на сообщение ${messageId}`);
  };

  const handleEditMessage = (messageId: string, newText: string) => {
    console.log(`Редактирование сообщения ${messageId}: ${newText}`);
  };

  const handleDeleteMessage = (messageId: string) => {
    console.log(`Удаление сообщения ${messageId}`);
  };

  const handlePinMessage = (messageId: string) => {
    setPinnedMessages((prev) =>
      prev.includes(messageId) ? prev.filter((id) => id !== messageId) : [...prev, messageId]
    );
  };

  const handleAddToFavorites = (messageId: string) => {
    setFavoriteMessages((prev) =>
      prev.includes(messageId) ? prev.filter((id) => id !== messageId) : [...prev, messageId]
    );
  };

  const messagesWithData = messages.map((msg) => ({
    ...msg,
    reactions: [{ emoji: '👍', count: 1, users: ['User1'] }],
    isPinned: pinnedMessages.includes(msg.id),
  }));

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
        <h2 className="text-xl font-bold text-dark">{chatName}</h2>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-dark text-xl" title="Информация">
            ℹ️
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messagesWithData.length > 0 ? (
          messagesWithData.map((message) => (
            <MessageItem
              key={message.id}
              {...message}
              onReact={handleReact}
              onEdit={handleEditMessage}
              onDelete={handleDeleteMessage}
              onPin={handlePinMessage}
              onAddToFavorites={handleAddToFavorites}
              currentUserId="current-user-id"
              isCurrentUser={message.sender === 'current-user-id'}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Начните разговор! 💬</p>
          </div>
        )}
        <div ref={messagesEndRef} />

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-2 items-center text-gray-500 text-sm">
            <span>Кто-то печатает</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        {selectedImage && (
          <div className="mb-3 relative inline-block">
            <img
              src={selectedImage}
              alt="Selected"
              className="h-20 w-20 rounded-lg object-cover border-2 border-primary-600"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-red-700"
            >
              ✕
            </button>
          </div>
        )}

        {/* Formatting Toolbar */}
        <div className="flex gap-2 mb-3 pb-3 border-b border-gray-200">
          <button
            onClick={() => setIsBold(!isBold)}
            className={`px-3 py-1 rounded text-sm font-bold transition ${
              isBold ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-dark'
            }`}
            title="Жирный текст"
          >
            Б
          </button>
          <button
            onClick={() => setIsItalic(!isItalic)}
            className={`px-3 py-1 rounded text-sm italic transition ${
              isItalic ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-dark'
            }`}
            title="Курсив"
          >
            К
          </button>
          <button
            onClick={() => setIsCode(!isCode)}
            className={`px-3 py-1 rounded text-sm font-mono transition ${
              isCode ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-dark'
            }`}
            title="Код"
          >
            {'</>'}
          </button>

          <div className="flex-1"></div>

          {/* Image Upload */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200 text-dark transition"
            title="Загрузить изображение"
          >
            🖼️
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          {/* Emoji */}
          <button
            className="px-3 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200 text-dark transition"
            title="Эмодзи"
          >
            😊
          </button>
        </div>

        {/* Input Field */}
        <div className="flex gap-3">
          <textarea
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleTyping();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Напишите сообщение... (Shift+Enter для новой строки)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none max-h-32"
            rows={2}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() && !selectedImage}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            📤
          </button>
        </div>
      </div>
    </div>
  );
};
