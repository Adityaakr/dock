'use client';

import { useEffect, useRef } from 'react';

/**
 * A video that starts itself when it scrolls into view and pauses when it
 * leaves, so nobody has to press play. Muted and looping, because that is the
 * only form of autoplay browsers permit; controls stay available for sound.
 *
 * Nothing downloads until the video is actually reached.
 */
export function AutoVideo({
  src,
  poster,
  caption,
  className,
}: {
  src: string;
  poster?: string;
  caption?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (el.preload !== 'auto') el.preload = 'auto';
          // Autoplay can still be refused; a rejected promise is not an error.
          void el.play().catch(() => {});
        } else if (!el.paused) {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="my-6 not-prose">
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        controls
        preload="none"
        className={className}
      >
        Your browser cannot play this video.
      </video>
      {caption ? (
        <figcaption className="mt-2 px-1 text-sm text-fd-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
