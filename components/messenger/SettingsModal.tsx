'use client';

import React, { useState } from 'react';
import { AccountSettings } from './settings/AccountSettings';
import { GeneralSettings } from './settings/GeneralSettings';
import { PrivacySettings } from './settings/PrivacySettings';
import { SecuritySettings } from './settings/SecuritySettings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'account' | 'general' | 'privacy' | 'security';

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('account');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-screen overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 flex items-center justify-between bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-dark">⚙️ Настройки</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-dark text-2xl transition"
          >
            ✕
          </button>
        </div>

        {/* Tabs and Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Tabs Sidebar */}
          <div className="w-48 border-r border-gray-200 bg-gray-50 overflow-y-auto hidden md:flex flex-col">
            <nav className="space-y-1 p-4">
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'account'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-dark hover:bg-gray-100'
                }`}
              >
                🎯 Аккаунт
              </button>
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'general'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-dark hover:bg-gray-100'
                }`}
              >
                ⚙️ Общие
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'privacy'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-dark hover:bg-gray-100'
                }`}
              >
                🔒 Приватность
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'security'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-dark hover:bg-gray-100'
                }`}
              >
                🛡️ Безопасность
              </button>
            </nav>
          </div>

          {/* Mobile Tabs */}
          <div className="md:hidden w-full border-b border-gray-200 bg-gray-50 flex overflow-x-auto sticky top-0">
            <button
              onClick={() => setActiveTab('account')}
              className={`flex-1 px-4 py-3 font-medium text-center transition-all text-sm ${
                activeTab === 'account'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-dark'
              }`}
            >
              🎯
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`flex-1 px-4 py-3 font-medium text-center transition-all text-sm ${
                activeTab === 'general'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-dark'
              }`}
            >
              ⚙️
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 px-4 py-3 font-medium text-center transition-all text-sm ${
                activeTab === 'privacy'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-dark'
              }`}
            >
              🔒
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 px-4 py-3 font-medium text-center transition-all text-sm ${
                activeTab === 'security'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-dark'
              }`}
            >
              🛡️
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'account' && <AccountSettings />}
            {activeTab === 'general' && <GeneralSettings />}
            {activeTab === 'privacy' && <PrivacySettings />}
            {activeTab === 'security' && <SecuritySettings />}
          </div>
        </div>
      </div>
    </div>
  );
};
