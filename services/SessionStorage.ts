'use client'
const SessionStorageService = {
  set: (key: string, value: string) => {
    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting sessionStorage item ${key}:`, error);
    }
  },

  get: (key: string): string | null => {
    try {
      return sessionStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting sessionStorage item ${key}:`, error);
      return null;
    }
  },

  remove: (key: string) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing sessionStorage item ${key}:`, error);
    }
  },

  clear: () => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);
    }
  },
};

export default SessionStorageService;