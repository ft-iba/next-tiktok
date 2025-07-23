'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './CarouselTikTokItem.module.scss';

interface CarouselTikTokItemProps {
  post_id: string;
  index: number;
  activeIndex: number;
  onPlay: (index: number) => void;
}

const CarouselTikTokItem = ({
  post_id,
  index,
  activeIndex,
  onPlay
}: CarouselTikTokItemProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isReadyRef = useRef<boolean>(false);
  const shouldPlayRef = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // TikTok からのメッセージ受信
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        typeof event.data === 'object' &&
        event.data['x-tiktok-player'] &&
        event.source === iframeRef.current?.contentWindow // 自身のiframeに限定
      ) {
        const { type, value } = event.data;
        if (type === 'onPlayerReady') {
          isReadyRef.current = true;
          postToPlayer('mute');

          // 再生予約があれば実行
          if (shouldPlayRef.current) {
            postToPlayer('play');
          }
        }

        if (type === 'onStateChange') {
          // 1 = playing, 2 = paused, 0 = ended
          setIsPlaying(value === 1);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // プレーヤーに postMessage を送る
  const postToPlayer = (type: string, value: null | number = null) => {
    if (!iframeRef.current || !isReadyRef.current) return;
    iframeRef.current.contentWindow?.postMessage({
      type,
      value,
      'x-tiktok-player': true
    }, '*');
  };

  // activeIndex の変化に応じて再生・停止
  useEffect(() => {
    if (activeIndex === index) {
      if (isReadyRef.current) {
        postToPlayer('play');
      } else {
        shouldPlayRef.current = true; // ← 再生予約
      }
    } else {
      shouldPlayRef.current = false; // ← 他が再生されたら予約をキャンセル
      if (isReadyRef.current) {
        postToPlayer('pause');
      }
    }
  }, [activeIndex, index]);

  const handleManualPlay = () => {
    onPlay(index); // ← 親が activeIndex を更新し、再生がトリガーされる
    // 一時停止からの復帰
    if (!isPlaying) {
      postToPlayer('play');
    }
  };

  return (
    <div
      className={styles.carouselTikTokItem}
      data-active={activeIndex === index}
      data-playing={isPlaying}
    >
      <iframe
        ref={iframeRef}
        src={`https://www.tiktok.com/player/v1/${post_id}?controls=0&progress_bar=0&play_button=0&volume_control=0&fullscreen_button=0&timestamp=0&loop=1&rel=0&native_context_menu=0&closed_caption=0`}
        width={325}
        height={575}
        allow="autoplay; fullscreen"
        title={`TikTok player for ${post_id}`}
      />
      <div className={styles.actions}>
        <button
          onClick={handleManualPlay}
          className={styles.actionsButton}
          data-type="play"
          type="button"
        >
          <span className="sr-only">Play</span>
        </button>
        <button
          onClick={() => postToPlayer('pause')}
          className={styles.actionsButton}
          data-type="pause"
          type="button"
        >
          <span className="sr-only">Pause</span>
        </button>
      </div>
    </div>
  );
};

export default CarouselTikTokItem;