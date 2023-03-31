export const __PROD__ = import.meta.env.REACT_APP_ENV === 'production';
export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
