export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUsername = (username: string): string | null => {
  if (!username) return 'Никнейм обязателен';
  if (username.length < 3) return 'Никнейм должен быть минимум 3 символа';
  if (username.length > 20) return 'Никнейм не должен превышать 20 символов';
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return 'Никнейм может содержать только буквы, цифры, подчеркивания и дефисы';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Пароль обязателен';
  if (password.length < 8) return 'Пароль должен быть минимум 8 символов';
  return null;
};

export const validatePasswordMatch = (password: string, confirmPassword: string): string | null => {
  if (password !== confirmPassword) return 'Пароли не совпадают';
  return null;
};
