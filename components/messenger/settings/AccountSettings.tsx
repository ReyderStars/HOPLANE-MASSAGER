'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export const AccountSettings: React.FC = () => {
  const { userData } = useAuth();
  const [username, setUsername] = useState(userData?.username || '');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // TODO: Сохранить в Firestore
    setTimeout(() => {
      setSaved(true);
      setLoading(false);
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-dark mb-4">Профиль</h3>

        {/* Avatar Preview */}
        <div className="mb-6 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-primary-200 flex items-center justify-center text-3xl font-bold text-primary-700">
            {username?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-dark">{userData?.username}</p>
            <p className="text-sm text-gray-600">{userData?.email}</p>
          </div>
        </div>

        {/* Nickname */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-dark mb-2">
            Никнейм
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-dark mb-2">
            Обо мне (опционально)
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Расскажи о себе..."
            maxLength={150}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">{bio.length}/150</p>
        </div>

        {/* Avatar URL */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark mb-2">
            Ссылка на аватар
          </label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {avatarUrl && (
            <div className="mt-3 flex justify-center">
              <img
                src={avatarUrl}
                alt="Avatar Preview"
                className="h-20 w-20 rounded-full object-cover border border-gray-200"
                onError={() => setAvatarUrl('')}
              />
            </div>
          )}
        </div>

        {/* Success Message */}
        {saved && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
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

      {/* Account Info */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-dark mb-4">Информация об аккаунте</h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-600 uppercase">ID</p>
            <p className="text-sm text-dark font-mono">{userData?.uid}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase">Создан</p>
            <p className="text-sm text-dark">
              {userData?.createdAt?.toLocaleDateString('ru-RU')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
