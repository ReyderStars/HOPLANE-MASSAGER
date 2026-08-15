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
  const [messagesByChat, setMessagesByChat] = useState<Record<string, Message[]>>({});
  const [showSidebar, setShowSidebar] = useState(false);

  // Channel state
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  // Modal state
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/');
    }
  }, [currentUser, loading, router]);

  // Demo chats and channels initialization
useEffect(() => {
  if (userData) {
    setChats([]);
    setSelectedChat(null);
    setMessagesByChat({});
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

  setMessagesByChat((prev) => ({
    ...prev,
    [selectedChat]: [...(prev[selectedChat] || []), newMessage],
  }));
};
const handleNewChat = () => {

  setChats((prev) => [...prev, newChat]);

  setMessagesByChat((prev) => ({
    ...prev,
    [newChat.id]: [],
  }));

  setSelectedChat(newChat.id);
  setSelectedChannel(null);
};

  const handleAddContact = () => {
    // TODO: Реализовать добавление собеседника
    console.log('Add contact');
  };

const handleCreateGroup = () => {
  setShowCreateGroupModal(true);
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
    setShowCreateChannelModal(false);
  };

  const handleSelectChannel = (channelId: string) => {
    setSelectedChannel(channelId);
    setSelectedChat(null); // Deselect chat when selecting channel
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

  const displayName = selectedChannel
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
              setSelectedChat(chatId);
              setSelectedChannel(null);
              setShowSidebar(false);
            }}
            channels={channels}
            selectedChannel={selectedChannel}
            onSelectChannel={(channelId) => {
              handleSelectChannel(channelId);
              setShowSidebar(false);
            }}
            onAddContact={handleAddContact}
            onCreateGroup={handleCreateGroup}
            onCreateChannel={() => setShowCreateChannelModal(true)}
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
        {selectedChat || selectedChannel ? (
       <ChatWindow
         chatName={displayName}
         messages={selectedChat ? (messagesByChat[selectedChat] || []) : []}
         onSendMessage={handleSendMessage}
       />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <p className="text-lg font-semibold mb-4">Выберите чат для начала</p>
          </div>
        )}
      </div>

      {/* Create Channel Modal */}
      <CreateChannelModal
        isOpen={showCreateChannelModal}
        onClose={() => setShowCreateChannelModal(false)}
        onCreateChannel={handleCreateChannel}
      /> 
<CreateGroupModal
  isOpen={showCreateGroupModal}
  onClose={() => setShowCreateGroupModal(false)}
  onCreateGroup={async (name, description, imageUrl, members) => {
    const newChat = {
      id: Date.now().toString(),
      name,
    };

    setChats((prev) => [...prev, newChat]);
    setSelectedChat(newChat.id);
    setSelectedChannel(null);
    setShowCreateGroupModal(false);
  }}
/>
    </div>
  );
}
