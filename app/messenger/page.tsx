'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Sidebar } from '@/components/messenger/Sidebar';
import { ChatWindow } from '@/components/messenger/ChatWindow';

interface Chat {
  id: string;
  name: string;
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

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/');
    }
  }, [currentUser, loading, router]);

  // Demo chats initialization
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
    setMessages([]);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
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

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Mobile: Sidebar Toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button className="text-dark text-2xl">☰</button>
      </div>

      {/* Sidebar */}
      <div className="hidden md:flex md:w-80 bg-white border-r border-gray-200">
        <Sidebar
          onNewChat={handleNewChat}
          selectedChat={selectedChat}
          chats={chats}
          onSelectChat={setSelectedChat}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <ChatWindow
            chatName={chats.find((c) => c.id === selectedChat)?.name || 'Чат'}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <p className="text-lg font-semibold mb-4">Выберите чат для начала</p>
            <button
              onClick={handleNewChat}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
            >
              ✨ Создать новый чат
            </button>
          </div>
        )}
      </div>

      {/* User Menu */}
      <div className="absolute top-4 right-4 md:bottom-4 md:right-4 md:top-auto">
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-dark">{userData.username}</p>
            <p className="text-xs text-gray-600">{userData.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition-all text-sm"
          >
            Выход
          </button>
        </div>
      </div>
    </div>
  );
}
