'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TiktokSlideV2.module.scss';

type Props = {
  index: number;
  postId: string;
  thumbnail: string;
  activeIndex: number;
  onPlay: () => void;
  onPlayNext: () => void;
};

export default function TiktokSlideV2({
  index,
  postId,
  thumbnail,
  activeIndex,
  onPlay,
  onPlayNext
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const isReadyRef = useRef(false);
  const shouldPlayRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const postToPlayer = (type: string, value: number | null = null) => {
    if (!iframeRef.current || !isReadyRef.current) return;
    iframeRef.current.contentWindow?.postMessage({
      type,
      value,
      'x-tiktok-player': true,
    }, '*');
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        typeof event.data === 'object' &&
        event.data['x-tiktok-player'] &&
        event.source === iframeRef.current?.contentWindow
      ) {
        const { type, value } = event.data;
        /*
        onStateChange value
          -1: init
          0: ended
          1: playing
          2: paused
          3: buffering
        */
        if (type !== 'onCurrentTime') {
          console.log({type}, {value});
        }

        if (type === 'onPlayerReady') {
          isReadyRef.current = true;
          postToPlayer('mute');
          if (shouldPlayRef.current) {
            setTimeout(() => {
              postToPlayer('play');
            }, 100);
          }
        }

        if (type === 'onStateChange') {
          setIsPlaying(value === 1);

          if (value === 0) {
            // 終了時
            // postToPlayer('seekTo', 0); // 再生位置を最初に戻す
            // postToPlayer('pause');
            // onPlayNext();              // 親に次のスライド再生を依頼
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onPlayNext]);

  useEffect(() => {
    if (activeIndex === index) {
      if (isReadyRef.current) {
        postToPlayer('play');
      } else {
        shouldPlayRef.current = true;
      }
    } else {
      shouldPlayRef.current = false;
      if (isReadyRef.current) {
        postToPlayer('pause');
      }
    }
  }, [activeIndex, index]);

  const handleManualPlay = () => {
    onPlay(); // ← 親が activeIndex を更新し、再生がトリガーされる
    // 一時停止からの復帰
    if (!isPlaying) {
      postToPlayer('play');
    }
  };

  return (
    <div
      className={styles.tiktokSlideV2}
      data-active={activeIndex === index}
      data-playing={isPlaying}
    >
      {!isLoaded && (
        <>
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
          <img
            fetchPriority="low"
            decoding="async"
            src={thumbnail}
            alt=''
          />
        </>
      )}

      {(activeIndex === index || isLoaded) && (
        <iframe
          ref={iframeRef}
          onLoad={() => setIsLoaded(true)}
          src={`https://www.tiktok.com/player/v1/${postId}?loop=1`}
          allow="autoplay"
        />
        // <iframe
        //   ref={iframeRef}
        //   onLoad={() => setIsLoaded(true)}
        //   src={`https://www.tiktok.com/player/v1/${postId}?progress_bar=0&play_button=0&fullscreen_button=0&loop=1&rel=0&native_context_menu=0&closed_caption=0`}
        //   allow="autoplay; fullscreen"
        // />
      )}
    </div>
  );
}