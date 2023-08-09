const createStorage = (PREFIX: string, isSessionStorage = false) => {
  const storage = isSessionStorage ? window.localStorage : window.sessionStorage;

  function save(key: string, value: any, prefix = PREFIX): string | null {
    try {
      const savedValue = JSON.stringify(value);
      storage.setItem(`${prefix}${key}`, savedValue);
      return savedValue;
    } catch (e) {
      console.error('Error in storage.save', e);
      return null;
    }
  }

  function load<T>(key: string, parse = true, prefix = PREFIX): T | null {
    try {
      const value = storage.getItem(`${prefix}${key}`);
      return value && parse ? JSON.parse(value) : value;
    } catch (e) {
      console.error('Error in storage.load', e);
      return null;
    }
  }

  function clear(key: string, prefix = PREFIX): void {
    try {
      return storage.removeItem(`${prefix}${key}`);
    } catch (e) {
      console.error('Error in storage.clear', e);
    }
  }

  return {
    save,
    load,
    clear
  };
};

export const storage = createStorage('article-');
export const temporaryStorage = createStorage('temp-article-', true);
