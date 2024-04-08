import { useEffect, useState } from 'react';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout); // 메모리 누수 방지를 위해 컴포넌트가 언마운트될 때 clearTimeout 호출
  }, [value]);

  return debouncedValue;
};

export default useDebounce;