'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/lib/auth-context';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { AddMenu } from './AddMenu';
import { ChannelList } from './ChannelList';
import { GroupList } from './GroupList';

interface Channel {
  id: string;
  name: string;
  image?: string;
  description?: string;
}

interface Group {
  id: string;
  name: string;
  image?: string;
  description?: string;
  memberCount?: number;
}

interface SidebarProps {
  onNewChat: () => void;
  selectedChat: string | null;
  chats: Array<{ id: string; name: string }>;
  onSelectChat: (chatId: string) => void;
  channels: Channel[];
  selectedChannel: string | null;
  onSelectChannel: (channelId: string) => void;
  groups: Group[];
  selectedGroup: string | null;
  onSelectGroup: (groupId: string) => void;
  onAddContact: () => void;
  onCreateGroup: () => void;
  onCreateChannel: () => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onNewChat,
  selectedChat,
  chats,
  onSelectChat,
  channels,
  selectedChannel,
  onSelectChannel,
  groups,
  selectedGroup,
  onSelectGroup,
  onAddContact,
  onCreateGroup,
  onCreateChannel,
  onOpenSettings,
}) => {
  const { userData } = useAuth();
  const router = useRouter();
  const [showAddMenu, setShowAddMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <aside className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header with Logo and Settings */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            {/* Add Contact/Group/Channel Button */}
            <div className="relative">
              <button
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="text-gray-500 hover:text-primary-600 text-2xl transition relative"
                title="Добавить собеседника, группу или канал"
              >
                👤
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  +
                </span>
              </button>
              <AddMenu
                isOpen={showAddMenu}
                onClose={() => setShowAddMenu(false)}
                onAddContact={() => {
                  onAddContact();
                  setShowAddMenu(false);
                }}
                onCreateGroup={() => {
                  onCreateGroup();
                  setShowAddMenu(false);
                }}
                onCreateChannel={() => {
                  onCreateChannel();
                  setShowAddMenu(false);
                }}
              />
            </div>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              className="text-gray-500 hover:text-dark text-2xl transition"
              title="Открыть настройки"
            >
              ⚙️
            </button>
          </div>
        </div>
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
                onClick={() => {
                  onSelectChat(chat.id);
                }}
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
          <div className="flex items-center justify-center h-1/2 text-gray-500 text-center px-4">
            <p>Нет чатов. Начните новый разговор!</p>
          </div>
        )}
      </div>

      {/* Groups List */}
      <GroupList
        groups={groups}
        selectedGroup={selectedGroup}
        onSelectGroup={onSelectGroup}
      />

      {/* Channel List */}
      <ChannelList
        channels={channels}
        selectedChannel={selectedChannel}
        onSelectChannel={onSelectChannel}
      />
    </aside>
  );
};
