# 🚀 HOPLANE Messenger

Современный мессенджер нового поколения, разработанный с использованием Next.js, Firebase и Tailwind CSS.

## 🎨 Особенности

- ✨ Современный минималистичный дизайн (оранжево-бело-чёрная палитра)
- 🔐 Безопасная аутентификация через Firebase Authentication
- 💬 Система обмена сообщениями в реальном времени
- 📱 Полностью адаптивный дизайн (мобильные, планшеты, ПК)
- 🎯 TypeScript для типобезопасности
- 🚀 Оптимизирован для Vercel

## 🛠️ Технологический стек

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication (Email/Password)
- **Database**: Firestore
- **Hosting**: Vercel

## 📋 Требования

- Node.js 18+ и npm/yarn
- Firebase проект (бесплатно на firebase.google.com)

## 🚀 Установка и запуск

### 1. Клонирование репозитория

```bash
git clone <your-repo-url>
cd hoplane
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка Firebase

1. Перейди на [Firebase Console](https://console.firebase.google.com)
2. Создай новый проект (или используй существующий)
3. Включи **Authentication** и выбери **Email/Password**
4. Создай **Firestore Database** (режим: Start in production)
5. Скопируй конфиг проекта

### 4. Конфигурация переменных окружения

Скопируй `.env.local.example` в `.env.local`:

```bash
cp .env.local.example .env.local
```

Отредактируй `.env.local` и вставь значения из Firebase Console:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Локальный запуск

```bash
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000) в браузере.

## 🌐 Развёртывание на Vercel

### 1. Загрузи проект на GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Подключение к Vercel

1. Перейди на [vercel.com](https://vercel.com)
2. Нажми "New Project"
3. Выбери твой GitHub репозиторий
4. Добавь Environment Variables (скопируй из `.env.local`):
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

5. Нажми "Deploy" ✨

## 📁 Структура проекта

```
hoplane/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Auth страница
│   ├── globals.css          # Глобальные стили
│   └── messenger/
│       └── page.tsx         # Страница мессенджера
├── components/
│   ├── auth/
│   │   ├── AuthCard.tsx     # Карточка авторизации
│   │   ├── RegisterForm.tsx # Форма регистрации
│   │   └── LoginForm.tsx    # Форма входа
│   ├── messenger/
│   │   ├── Sidebar.tsx      # Боковая панель
│   │   ├── ChatWindow.tsx   # Окно чата
│   │   └── ChatList.tsx     # Список чатов
│   └── common/
│       ├── Logo.tsx         # Логотип
│       ├── LoadingSpinner.tsx
│       └── BackgroundElements.tsx
├── lib/
│   ├── firebase.ts          # Firebase конфиг
│   ├── auth-context.tsx     # Auth контекст
│   ├── validators.ts        # Валидаторы
│   └── types.ts             # TypeScript типы
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🔐 Функции безопасности

- ✅ Firebase Authentication для безопасного входа/регистрации
- ✅ Firestore Security Rules для защиты данных
- ✅ Валидация на клиент-сайде и сервер-сайде
- ✅ Уникальные имена пользователей
- ✅ Шифрованные пароли (Firebase Hash)

## 🎨 Дизайн

- **Цветовая палитра**: Оранжевый (#f97316), Белый, Чёрный
- **Шрифт**: System UI (Apple-like)
- **Стиль**: Минимализм + Modern Startup aesthetic
- **Анимации**: Плавные CSS переходы

## 📱 Responsive Design

- ✅ iPhone (320px+)
- ✅ iPad (768px+)
- ✅ Desktop (1024px+)
- ✅ 4K дисплеи (2560px+)

## 🚀 Оптимизация для Vercel

- Next.js Image Optimization
- CSS Minification
- JavaScript bundling
- Automatic code splitting

## 🐛 Решение проблем

### Ошибка "Cannot find module 'firebase'"

```bash
npm install firebase
```

### Ошибка Firebase конфигурации

Убедись, что переменные окружения установлены корректно в `.env.local`:

```bash
# Проверь наличие файла
ls -la .env.local
```

### Ошибка сборки на Vercel

1. Проверь переменные окружения в Vercel Dashboard
2. Убедись, что все зависимости установлены
3. Проверь консоль Vercel для детальных ошибок

## 📝 Лицензия

HOPLANE © 2024. Все права защищены.

## 👨‍💻 Разработка

Для локальной разработки:

```bash
npm run dev      # Запуск dev сервера
npm run build    # Сборка проекта
npm run start    # Запуск production версии
npm run lint     # Проверка кода
```

## 🤝 Поддержка

Для вопросов и поддержки создай Issue в GitHub репозитории.

---

**Готово к использованию на Vercel!** 🚀

Просто загрузи код на GitHub, подключи к Vercel и наслаждайся!
