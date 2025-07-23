'use client';

import { useEffect, useRef, useState } from 'react';
import CarouselTikTokItem from './CarouselTikTokItem';
import styles from './CarouselTiktok.module.scss';

interface CarouselTiktokProps {
  postIds: string[];
}

function CarouselTiktok({ postIds }: CarouselTiktokProps) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!hasPlayedRef.current && entry.isIntersecting) {
        console.log('play');
        setActiveIndex(0);
        hasPlayedRef.current = true;
        observer.disconnect();
      }
    }, {
      threshold: 0.5, // 50%以上見えたら対象（必要に応じて調整）
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.carouselTiktok}>
      <div ref={containerRef} className={styles.list}>
        {postIds.map((post_id, i) => (
          <CarouselTikTokItem
            key={post_id}
            post_id={post_id}
            index={i}
            activeIndex={activeIndex}
            onPlay={(index) => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default CarouselTiktok