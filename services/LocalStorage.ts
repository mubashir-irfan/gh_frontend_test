'use client'

const setterFunction = async (key: string, value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('[Iqraa][LocalStorageManager] Window is not defined'));
    } else if (!value) {
      return null;
    } else {
      localStorage.setItem(key, value);
      resolve();
    }
  });
};

const setKeyValuePair = setterFunction.bind(this);

const LocalStorageService = {
  get: (key: string): string | null => (typeof window !== 'undefined' ? localStorage.getItem(key) : null),

  set: async (key: string, value: string): Promise<void> => setKeyValuePair(key, value),

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage item ${key}:`, error);
    }
  },


  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing local storage:`, error);
    }
  },
};

export default LocalStorageService;
