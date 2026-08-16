'use client';

import React from 'react';

interface AddMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: () => void;
  onCreateGroup: () => void;
  onCreateChannel: () => void;
}

export const AddMenu: React.FC<AddMenuProps> = ({
  isOpen,
  onClose,
  onAddContact,
  onCreateGroup,
  onCreateChannel,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-30"
        onClick={onClose}
      ></div>

      {/* Menu Dropdown */}
      <div className="absolute top-14 left-6 bg-white border border-gray-200 rounded-lg shadow-lg z-40 w-56 overflow-hidden animate-slide-up">
        <button
          onClick={() => {
            onAddContact();
            onClose();
          }}
          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100 text-dark font-medium"
        >
          👤 Добавить собеседника
        </button>

        <button
          onClick={() => {
            onCreateGroup();
            onClose();
          }}
          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100 text-dark font-medium"
        >
          👥 Создать группу
        </button>

        <button
          onClick={() => {
            onCreateChannel();
            onClose();
          }}
          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition text-dark font-medium"
        >
          📢 Создать канал
        </button>
      </div>
    </>
  );
};
