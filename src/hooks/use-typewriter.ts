
'use client';

import { useState, useEffect, useRef } from 'react';

export const useTypewriter = (text: string, isStreaming = false, speed = 10) => {
  const [displayedText, setDisplayedText] = useState('');
  const index = useRef(0);

  useEffect(() => {
    if (isStreaming) {
      const intervalId = setInterval(() => {
        if (index.current < text.length) {
          setDisplayedText((prev) => prev + text[index.current]);
          index.current += 1;
        } else {
          clearInterval(intervalId);
        }
      }, speed);

      return () => clearInterval(intervalId);
    } else {
      setDisplayedText(text);
      index.current = text.length; // Ensure index is up to date
    }
  }, [text, speed, isStreaming]);

  return displayedText;
};

    
