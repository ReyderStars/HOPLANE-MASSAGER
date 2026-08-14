'use client';

import React from 'react';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/lib/auth-context';

interface SidebarProps {
  onNewChat: () => void;
  selectedChat: string | null;
  chats: Array<{ id: string; name: string }>;
  onSelectChat: (chatId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewChat, selectedChat, chats, onSelectChat }) => {
  return (
    <aside className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <Logo size="sm" />
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          ✨ Новый чат
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <input
          type="text"
          placeholder="Поиск чатов..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.length > 0 ? (
          <div className="space-y-2 px-2">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selectedChat === chat.id
                    ? 'bg-primary-100 text-primary-700 font-semibold'
                    : 'hover:bg-gray-100 text-dark'
                }`}
              >
                {chat.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-center px-4">
            <p>Нет чатов. Начните новый разговор!</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Мой профиль</span>
          <button className="text-gray-500 hover:text-gray-700">⚙️</button>
        </div>
      </div>
    </aside>
  );
};
