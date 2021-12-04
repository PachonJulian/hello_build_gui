import { useEffect, useState } from 'react';


const useLocalStorage=(key,initialValue)=>{

    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        if (stored) {
          return JSON.parse(stored);
        }
        if (typeof initialValue === 'function') {
          return initialValue();
        }
        return initialValue;
      });
    
      useEffect(() => {
        if (value) {
          localStorage.setItem(key, JSON.stringify(value));
        }
      }, [key, value]);
      return [value, setValue];
}

export default useLocalStorage;