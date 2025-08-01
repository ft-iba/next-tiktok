'use client';

import React, { useEffect, useRef, useState } from 'react';
import TiktokSlide from './TiktokSlide';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

// const slideWidth = 325 + 20;

const videos = [
  { username: 'mynavi_corporate', postId: '7525697034704194823' },
  { username: 'mynavi_corporate', postId: '7525696863836622088' },
  { username: 'mynavi_corporate', postId: '7525696374466301192' },
  { username: 'mynavi_corporate', postId: '7522812685919079700' },
];

export default function App() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [thumbnails, setThumbnails] = useState<{ [postId: string]: string }>({});
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    (async () => {
      const results = await Promise.all(
        videos.map(async ({ username, postId }) => {
          const res = await fetch(`https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${username}/video/${postId}`);
          const json = await res.json();
          return { postId, thumbnail: json.thumbnail_url };
        })
      );
      const thumbs: { [postId: string]: string } = {};
      results.forEach(({ postId, thumbnail }) => {
        thumbs[postId] = thumbnail;
      });
      setThumbnails(thumbs);
    })();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && activeIndex === -1) {
        setActiveIndex(0);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, [activeIndex]);

  // useEffect(() => {
  //   if (galleryRef.current && slideRefs.current[activeIndex]) {
  //     const x = -activeIndex * slideWidth;
  //     gsap.to(galleryRef.current, { x, duration: 0.5, ease: 'power3.out' });
  //   }
  // }, [activeIndex]);

  const handlePlay = (index: number) => {
    console.log('handlePlay', index);
    setActiveIndex(index);
  }

  const handlePlayNext = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  }

  const handlePlayPrev = () => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }

  return (
    <div style={{
      overflowX: 'auto',
      paddingTop: '2rem',
      paddingBottom: '2rem',
      maxWidth: '100vw',
      width: '100%'
    }}>
      {/* <div style={{ marginBottom: 10 }}>
        <button onClick={handlePlayPrev}>← Prev</button>
        <button onClick={handlePlayNext}>Next →</button>
      </div> */}

      <div
        className="tiktok-gallery"
        ref={galleryRef}
        style={{
          display: 'flex',
          gap: '1rem',
          paddingLeft: '2rem',
          willChange: 'transform',
        }}
      >
        {videos.map(({ postId }, i) => (
          <div
            key={postId}
            ref={(el) => { slideRefs.current[i] = el; }}
          >
            <TiktokSlide
              index={i}
              postId={postId}
              thumbnail={thumbnails[postId]}
              activeIndex={activeIndex}
              onPlay={() => handlePlay(i)}
              onPlayNext={handlePlayNext}
            />
          </div>
        ))}
      </div>
    </div>
  );
}