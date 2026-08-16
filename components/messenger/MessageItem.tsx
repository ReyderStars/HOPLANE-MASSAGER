'use client';

import React, { useState } from 'react';

interface MessageItemProps {
  id: string;
  text: string;
  sender: string;
  senderUsername: string;
  timestamp: Date;
  reactions: { emoji: string; count: number; users: string[] }[];
  isEdited?: boolean;
  isPinned?: boolean;
  image?: string;
  onReact: (messageId: string, emoji: string) => void;
  onEdit: (messageId: string, newText: string) => void;
  onDelete: (messageId: string) => void;
  onPin: (messageId: string) => void;
  onAddToFavorites: (messageId: string) => void;
  currentUserId: string;
  isCurrentUser: boolean;
}

const QUICK_REACTIONS = ['👍', '❤️', '😂', '🔥', '😮', '😢'];

export const MessageItem: React.FC<MessageItemProps> = ({
  id,
  text,
  sender,
  senderUsername,
  timestamp,
  reactions,
  isEdited,
  isPinned,
  image,
  onReact,
  onEdit,
  onDelete,
  onPin,
  onAddToFavorites,
  currentUserId,
  isCurrentUser,
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSaveEdit = () => {
    if (editText.trim() !== text) {
      onEdit(id, editText.trim());
    }
    setIsEditing(false);
  };

  const timeString = timestamp.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`flex gap-3 mb-3 group animate-fade-in ${
        isCurrentUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary-700`}
      >
        {senderUsername[0]?.toUpperCase()}
      </div>

      {/* Message Content */}
      <div className={`flex-1 flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        {/* Username and Time */}
        <div className={`flex items-center gap-2 mb-1 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-xs font-semibold text-dark">{senderUsername}</span>
          <span className="text-xs text-gray-500">{timeString}</span>
          {isEdited && <span className="text-xs text-gray-400">(ред.)</span>}
        </div>

        {/* Pinned Badge */}
        {isPinned && (
          <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded mb-1 flex items-center gap-1">
            📌 Закреплено
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`px-4 py-2 rounded-lg max-w-xs ${
            isCurrentUser
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-dark'
          } relative group/bubble`}
        >
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-dark"
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="text-xs bg-primary-700 hover:bg-primary-800 text-white px-2 py-1 rounded"
                >
                  ✓ Сохранить
                </button>
                <button
                  onClick={() => {
                    setEditText(text);
                    setIsEditing(false);
                  }}
                  className="text-xs bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
                >
                  ✕ Отмена
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="whitespace-pre-wrap break-words">{text}</p>
              {image && (
                <img
                  src={image}
                  alt="Message image"
                  className="mt-2 rounded max-w-sm max-h-48 object-cover"
                />
              )}
            </>
          )}

          {/* Context Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="absolute -right-8 top-0 opacity-0 group-hover/bubble:opacity-100 transition text-gray-500 hover:text-dark"
          >
            ⋯
          </button>
        </div>

        {/* Context Menu */}
        {showMenu && (
          <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 min-w-max">
            <button
              onClick={() => {
                onReact(id, '👍');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-dark"
            >
              👍 Реагировать
            </button>
            {isCurrentUser && (
              <>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-dark"
                >
                  ✏️ Редактировать
                </button>
              </>
            )}
            <button
              onClick={() => {
                onPin(id);
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-dark"
            >
              📌 {isPinned ? 'Открепить' : 'Закрепить'}
            </button>
            <button
              onClick={() => {
                onAddToFavorites(id);
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-dark"
            >
              ⭐ В избранное
            </button>
            {isCurrentUser && (
              <button
                onClick={() => {
                  onDelete(id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-red-100 text-sm text-red-700"
              >
                🗑️ Удалить
              </button>
            )}
          </div>
        )}

        {/* Reactions */}
        {reactions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {reactions.map((reaction, idx) => (
              <button
                key={idx}
                onClick={() => onReact(id, reaction.emoji)}
                title={reaction.users.join(', ')}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition"
              >
                {reaction.emoji} {reaction.count}
              </button>
            ))}
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition"
            >
              +
            </button>
          </div>
        )}

        {/* Quick Reactions */}
        {showReactions && (
          <div className="mt-2 flex gap-1 bg-white border border-gray-200 rounded-lg p-2">
            {QUICK_REACTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  onReact(id, emoji);
                  setShowReactions(false);
                }}
                className="text-lg hover:scale-125 transition"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
