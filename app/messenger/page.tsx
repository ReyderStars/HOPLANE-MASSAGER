'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Sidebar } from '@/components/messenger/Sidebar';
import { ChatWindow } from '@/components/messenger/ChatWindow';
import { CreateChannelModal } from '@/components/messenger/CreateChannelModal';
import { CreateGroupModal } from '@/components/messenger/CreateGroupModal';
import { SettingsModal } from '@/components/messenger/SettingsModal';

interface Chat {
  id: string;
  name: string;
}

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

interface Message {
  id: string;
  text: string;
  sender: string;
  senderUsername: string;
  timestamp: Date;
}

export default function MessengerPage() {
  const { currentUser, userData, loading } = useAuth();
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);

  // Channel state
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  // Group state
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Modal state
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/');
    }
  }, [currentUser, loading, router]);

  // Demo chats and channels initialization
  useEffect(() => {
    if (userData) {
      const demoChats: Chat[] = [
        { id: '1', name: 'Основной чат' },
        { id: '2', name: 'Тестовая беседа' },
      ];
      setChats(demoChats);
      setSelectedChat('1');
      setMessages([
        {
          id: '1',
          text: 'Привет! Добро пожаловать в HOPLANE Messenger! 🚀',
          sender: 'admin',
          senderUsername: 'Администратор',
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: '2',
          text: 'Это современный мессенджер для общения',
          sender: 'admin',
          senderUsername: 'Администратор',
          timestamp: new Date(Date.now() - 3500000),
        },
      ]);
    }
  }, [userData]);

  const handleSendMessage = async (text: string) => {
    if (!selectedChat || !userData) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: currentUser?.uid || '',
      senderUsername: userData.username,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `Новый чат ${chats.length + 1}`,
    };
    setChats([...chats, newChat]);
    setSelectedChat(newChat.id);
    setSelectedChannel(null);
    setSelectedGroup(null);
    setMessages([]);
  };

  const handleAddContact = () => {
    // TODO: Реализовать добавление собеседника
    console.log('Add contact');
  };

  const handleCreateChannel = async (
    name: string,
    description: string,
    imageUrl: string
  ) => {
    const newChannel: Channel = {
      id: Date.now().toString(),
      name,
      description,
      image: imageUrl || undefined,
    };

    setChannels([...channels, newChannel]);
    setSelectedChannel(newChannel.id);
    setSelectedChat(null);
    setSelectedGroup(null);
    setShowCreateChannelModal(false);
  };

  const handleCreateGroup = async (
    name: string,
    description: string,
    imageUrl: string
  ) => {
    const newGroup: Group = {
      id: Date.now().toString(),
      name,
      description,
      image: imageUrl || undefined,
      memberCount: 1,
    };

    setGroups([...groups, newGroup]);
    setSelectedGroup(newGroup.id);
    setSelectedChat(null);
    setSelectedChannel(null);
    setShowCreateGroupModal(false);
  };

  const handleSelectChannel = (channelId: string) => {
    setSelectedChannel(channelId);
    setSelectedChat(null);
    setSelectedGroup(null);
  };

  const handleSelectGroup = (groupId: string) => {
    setSelectedGroup(groupId);
    setSelectedChat(null);
    setSelectedChannel(null);
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    setSelectedChannel(null);
    setSelectedGroup(null);
  };

  if (loading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentUser || !userData) {
    return null;
  }

  const displayName = selectedGroup
    ? groups.find((g) => g.id === selectedGroup)?.name || 'Группа'
    : selectedChannel
    ? (channels.find((c) => c.id === selectedChannel)?.name || 'Канал')
    : (chats.find((c) => c.id === selectedChat)?.name || 'Чат');

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-dark text-2xl bg-white p-2 rounded-lg border border-gray-200"
        >
          ☰
        </button>
      </div>

      {/* Sidebar - Mobile: Overlay, Desktop: Fixed */}
      <div
        className={`fixed md:relative inset-0 md:inset-auto z-40 md:z-auto transition-transform ${
          showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-full w-80 bg-white">
          <Sidebar
            onNewChat={handleNewChat}
            selectedChat={selectedChat}
            chats={chats}
            onSelectChat={(chatId) => {
              handleSelectChat(chatId);
              setShowSidebar(false);
            }}
            channels={channels}
            selectedChannel={selectedChannel}
            onSelectChannel={(channelId) => {
              handleSelectChannel(channelId);
              setShowSidebar(false);
            }}
            groups={groups}
            selectedGroup={selectedGroup}
            onSelectGroup={(groupId) => {
              handleSelectGroup(groupId);
              setShowSidebar(false);
            }}
            onAddContact={handleAddContact}
            onCreateGroup={() => setShowCreateGroupModal(true)}
            onCreateChannel={() => setShowCreateChannelModal(true)}
            onOpenSettings={() => setShowSettingsModal(true)}
          />
        </div>
      </div>

      {/* Overlay for mobile */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col w-full md:w-auto">
        {selectedChat || selectedChannel || selectedGroup ? (
          <ChatWindow
            chatName={displayName}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <p className="text-lg font-semibold mb-4">Выберите чат, группу или канал</p>
            <button
              onClick={handleNewChat}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
            >
              ✨ Создать новый чат
            </button>
          </div>
        )}
      </div>

      {/* Create Channel Modal */}
      <CreateChannelModal
        isOpen={showCreateChannelModal}
        onClose={() => setShowCreateChannelModal(false)}
        onCreateChannel={handleCreateChannel}
      />

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
        onCreateGroup={handleCreateGroup}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </div>
  );
}
