import { useEffect } from 'react';

type useKeydownProps = {
  key: string;
  callback: () => void;
  condition: boolean;
};

function useKeydown({ key, callback, condition }: useKeydownProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };

    if (condition) {
      document.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [key, callback, condition]);
}

export { useKeydown };
