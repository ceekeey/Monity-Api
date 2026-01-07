export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isAlpha = (text) => /^[a-zA-Z\s]+$/.test(text);

export const isStrongPassword = (password) => password.length >= 6;
