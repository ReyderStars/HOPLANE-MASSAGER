'use client';

import React, { useState } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (name: string, description: string, imageUrl: string, members: string[]) => Promise<void>;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  onCreateGroup,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [memberInput, setMemberInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Demo members list
  const availableMembers = [
    'Администратор',
    'user1',
    'user2',
    'user3',
    'user4',
    'user5',
  ];

  const toggleMember = (member: string) => {
    setMembers((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Введите название группы');
      return;
    }

    if (name.length < 3) {
      setError('Название должно быть минимум 3 символа');
      return;
    }

    if (description.length > 500) {
      setError('Описание не должно превышать 500 символов');
      return;
    }

    if (members.length === 0) {
      setError('Выберите минимум одного участника');
      return;
    }

    setLoading(true);

    try {
      await onCreateGroup(name, description, imageUrl);
      // Reset form
      setName('');
      setDescription('');
      setImageUrl('');
      setMembers([]);
      setMemberInput('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Ошибка при создании группы');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const filteredMembers = availableMembers.filter(
    (member) =>
      member.toLowerCase().includes(memberInput.toLowerCase()) &&
      !members.includes(member)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-screen overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark">Создать группу</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-dark text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Group Name */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Название группы
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              disabled={loading}
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">{name.length}/100</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Описание (опционально)
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setDescription(e.target.value);
                }
              }}
              placeholder="Введите описание группы"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
              disabled={loading}
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">{description.length}/500</p>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Ссылка на картинку (опционально)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              disabled={loading}
            />
            {imageUrl && (
              <div className="mt-3 flex justify-center">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="h-24 w-24 rounded-lg object-cover border border-gray-200"
                  onError={() => setImageUrl('')}
                />
              </div>
            )}
          </div>

          {/* Members Selection */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Участники ({members.length})
            </label>

            {/* Search input */}
            <input
              type="text"
              value={memberInput}
              onChange={(e) => setMemberInput(e.target.value)}
              placeholder="Поиск участников..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
              disabled={loading}
            />

            {/* Selected members */}
            {members.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {members.map((member) => (
                  <div
                    key={member}
                    className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {member}
                    <button
                      type="button"
                      onClick={() => toggleMember(member)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Available members */}
            <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <button
                    key={member}
                    type="button"
                    onClick={() => toggleMember(member)}
                    className="w-full text-left p-2 hover:bg-gray-100 rounded transition text-dark"
                  >
                    ☐ {member}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  Нет доступных участников
                </p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 min-h-12 flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <>
                <LoadingSpinner />
                <span>Создание группы...</span>
              </>
            ) : (
              '✓ Создать группу'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
