import { useSpeech } from '@/hooks/useSpeech';
import type { ArticleContentBlock } from '@/types/article';

interface TextToSpeechProps {
  title: string;
  content: ArticleContentBlock[];
}

export default function TextToSpeech({ title, content }: TextToSpeechProps) {
  const { isSpeaking, isPaused, isSupported, speak, pause, resume, stop } = useSpeech();

  if (!isSupported) {
    return (
      <p className="text-to-speech__unsupported">
        Trình duyệt không hỗ trợ đọc giọng nói.
      </p>
    );
  }

  return (
    <div className="text-to-speech" role="group" aria-label="Đọc giọng nói">
      {!isSpeaking && (
        <button
          type="button"
          className="text-to-speech__btn"
          onClick={() => speak(content, title)}
          aria-label="Đọc bài viết"
        >
          🔊 Đọc bài
        </button>
      )}

      {isSpeaking && !isPaused && (
        <button
          type="button"
          className="text-to-speech__btn text-to-speech__btn--playing"
          onClick={pause}
          aria-label="Tạm dừng đọc"
        >
          ⏸ Tạm dừng
        </button>
      )}

      {isSpeaking && isPaused && (
        <button
          type="button"
          className="text-to-speech__btn text-to-speech__btn--playing"
          onClick={resume}
          aria-label="Tiếp tục đọc"
        >
          ▶ Tiếp tục
        </button>
      )}

      {isSpeaking && (
        <button
          type="button"
          className="text-to-speech__btn text-to-speech__btn--stop"
          onClick={stop}
          aria-label="Dừng đọc"
        >
          ✕ Dừng
        </button>
      )}
    </div>
  );
}
