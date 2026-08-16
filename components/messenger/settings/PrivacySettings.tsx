'use client';

import React, { useState } from 'react';

export const PrivacySettings: React.FC = () => {
  const [onlineStatus, setOnlineStatus] = useState('everyone');
  const [readReceipts, setReadReceipts] = useState(true);
  const [lastSeen, setLastSeen] = useState('everyone');
  const [profileVisibility, setProfileVisibility] = useState('everyone');
  const [blockedUsers, setBlockedUsers] = useState<string[]>(['']);
  const [newBlockUser, setNewBlockUser] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddBlock = () => {
    if (newBlockUser.trim()) {
      setBlockedUsers([...blockedUsers.filter(u => u.trim()), newBlockUser]);
      setNewBlockUser('');
    }
  };

  const handleRemoveBlock = (user: string) => {
    setBlockedUsers(blockedUsers.filter(u => u !== user));
  };

  const handleSave = async () => {
    setLoading(true);
    setTimeout(() => {
      setSaved(true);
      setLoading(false);
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  };

  return (
    <div className="p-6 space-y-6 max-h-screen overflow-y-auto">
      {/* Online Status */}
      <div>
        <h3 className="text-lg font-bold text-dark mb-4">👤 Видимость</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              🟢 Кто видит твой онлайн статус?
            </label>
            <select
              value={onlineStatus}
              onChange={(e) => setOnlineStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="everyone">👥 Все</option>
              <option value="contacts">👥 Только контакты</option>
              <option value="nobody">🔒 Никто</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              👀 Кто видит твой статус "последний раз"?
            </label>
            <select
              value={lastSeen}
              onChange={(e) => setLastSeen(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="everyone">👥 Все</option>
              <option value="contacts">👥 Только контакты</option>
              <option value="nobody">🔒 Никто</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              📱 Кто может видеть твой профиль?
            </label>
            <select
              value={profileVisibility}
              onChange={(e) => setProfileVisibility(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="everyone">👥 Все</option>
              <option value="contacts">👥 Только контакты</option>
              <option value="nobody">🔒 Никто</option>
            </select>
          </div>
        </div>
      </div>

      {/* Read Receipts */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
          <div>
            <p className="font-medium text-dark">✓ Читаемые квитанции</p>
            <p className="text-sm text-gray-600">Люди видят когда ты прочитал сообщение</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={readReceipts}
              onChange={(e) => setReadReceipts(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </label>
        </div>
      </div>

      {/* Blocked Users */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-dark mb-4">🚫 Заблокированные пользователи</h3>

        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newBlockUser}
              onChange={(e) => setNewBlockUser(e.target.value)}
              placeholder="Введите никнейм пользователя"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onKeyDown={(e) => e.key === 'Enter' && handleAddBlock()}
            />
            <button
              onClick={handleAddBlock}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              + Добавить
            </button>
          </div>
        </div>

        {blockedUsers.filter(u => u.trim()).length > 0 ? (
          <div className="space-y-2">
            {blockedUsers.filter(u => u.trim()).map((user) => (
              <div
                key={user}
                className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <span className="text-dark">{user}</span>
                <button
                  onClick={() => handleRemoveBlock(user)}
                  className="text-red-600 hover:text-red-700 font-semibold"
                >
                  ✕ Разблокировать
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">Нет заблокированных пользователей</p>
        )}
      </div>

      {/* Success Message */}
      {saved && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm">✓ Изменения сохранены</p>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        {loading ? 'Сохранение...' : '✓ Сохранить'}
      </button>
    </div>
  );
};
