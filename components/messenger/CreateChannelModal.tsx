'use client';

import React, { useState } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChannel: (name: string, description: string, imageUrl: string) => Promise<void>;
}

export const CreateChannelModal: React.FC<CreateChannelModalProps> = ({
  isOpen,
  onClose,
  onCreateChannel,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Введите название канала');
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

    setLoading(true);

    try {
      await onCreateChannel(name, description, imageUrl);
      // Reset form
      setName('');
      setDescription('');
      setImageUrl('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Ошибка при создании канала');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-screen overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark">Создать канал</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-dark text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Channel Name */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Название канала
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
              placeholder="Введите описание канала"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
              disabled={loading}
              rows={4}
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
                <span>Создание канала...</span>
              </>
            ) : (
              '✓ Создать канал'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
