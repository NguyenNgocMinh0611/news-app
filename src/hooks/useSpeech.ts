import { useState, useEffect, useRef, useCallback } from 'react';
import type { ArticleContentBlock } from '@/types/article';

interface UseSpeechReturn {
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
  speak: (content: ArticleContentBlock[], title: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

// này là chỉ lấy nội dung text để đọc và bỏ qua hình ảnh
function extractText(content: ArticleContentBlock[], title: string): string {
  const blocks = content
    .filter((block) => block.type === 'paragraph' || block.type === 'heading')
    .map((block) => block.text);
  return [title, ...blocks].join('. ');
}

export function useSpeech(): UseSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    utteranceRef.current = null;
  }, [isSupported]);

  const speak = useCallback(
    (content: ArticleContentBlock[], title: string) => {
      if (!isSupported) return;

      // Dừng đọc nếu có
      window.speechSynthesis.cancel();

      const text = extractText(content, title);
      if (!text.trim()) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 1;
      utterance.pitch = 1;

      // Tìm voice tiếng Việt nếu có
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find((v) => v.lang.startsWith('vi'));
      if (viVoice) utterance.voice = viVoice;

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        utteranceRef.current = null;
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        utteranceRef.current = null;
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setIsPaused(false);
    },
    [isSupported]
  );

  const pause = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, [isSupported]);

  const resume = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, [isSupported]);

  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  return { isSpeaking, isPaused, isSupported, speak, pause, resume, stop };
}
