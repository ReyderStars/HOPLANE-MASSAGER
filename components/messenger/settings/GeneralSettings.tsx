'use client';

import React, { useState } from 'react';

export const GeneralSettings: React.FC = () => {
  const [language, setLanguage] = useState('ru');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [soundNotifications, setSoundNotifications] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [desktopNotif, setDesktopNotif] = useState(true);
  const [autoDownload, setAutoDownload] = useState(true);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

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
      <div>
        <h3 className="text-lg font-bold text-dark mb-4">🌍 Язык и внешний вид</h3>

        {/* Language */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark mb-2">
            Язык
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="ru">🇷🇺 Русский</option>
            <option value="en">🇬🇧 English</option>
            <option value="uk">🇺🇦 Українська</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="fr">🇫🇷 Français</option>
          </select>
        </div>

        {/* Theme */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark mb-2">
            Тема
          </label>
          <div className="space-y-2">
            {[
              { value: 'light', label: '☀️ Светлая' },
              { value: 'dark', label: '🌙 Тёмная' },
              { value: 'auto', label: '🔄 Автоматически' },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value={option.value}
                  checked={theme === option.value}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-dark">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-dark mb-4">🔔 Уведомления</h3>

        <div className="space-y-4">
          {/* Desktop Notifications */}
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
            <div>
              <p className="font-medium text-dark">Уведомления рабочего стола</p>
              <p className="text-sm text-gray-600">Получай push уведомления</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={desktopNotif}
                onChange={(e) => setDesktopNotif(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          {/* Sound Notifications */}
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
            <div>
              <p className="font-medium text-dark">🔊 Звуковые уведомления</p>
              <p className="text-sm text-gray-600">Проигрывай звук при сообщении</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={soundNotifications}
                onChange={(e) => setSoundNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          {/* Vibration */}
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
            <div>
              <p className="font-medium text-dark">📳 Вибрация</p>
              <p className="text-sm text-gray-600">Вибрируй при новом сообщении</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={vibration}
                onChange={(e) => setVibration(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-dark mb-4">📱 Медиа</h3>

        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
          <div>
            <p className="font-medium text-dark">🖼️ Автозагрузка изображений</p>
            <p className="text-sm text-gray-600">Загружай фото автоматически</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoDownload}
              onChange={(e) => setAutoDownload(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </label>
        </div>
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
