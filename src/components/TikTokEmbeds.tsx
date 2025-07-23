'use client';

import { useEffect } from 'react';
import styles from './TikTokEmbeds.module.scss';

interface TikTokEmbedProps {
  tiktokUrls: string[]
}

function TikTokEmbeds({ tiktokUrls }: TikTokEmbedProps) {
  useEffect(() => {
    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (window.tiktokEmbedLoad) {
        window.tiktokEmbedLoad();
      }
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {tiktokUrls.map((url) => {
        const videoId = url.split('/').pop();
        return (
          <div
            className={styles.tikTokEmbeds}
            key={videoId}
          >
            <blockquote
              className="tiktok-embed"
              cite={url}
              data-embed-from="embed_page"
              data-video-id={videoId}
            >
              <section>Loading TikTok...</section>
            </blockquote>
          </div>
        )
      })}
    </>
  )
}

export default TikTokEmbeds