'use client';
import { useRef, useState, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';

export function useScramble(text: string) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number>(0);
  const iterRef  = useRef(0);

  const scramble = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    iterRef.current = 0;
    const len   = text.length;
    const total = len * 1.5;

    const tick = () => {
      iterRef.current++;
      const progress = iterRef.current / total;
      const resolved  = Math.floor(progress * len);

      setDisplay(
        text.split('').map((ch, i) =>
          i < resolved
            ? ch
            : ch === ' '
            ? ' '
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
      );

      if (iterRef.current < total) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [text]);

  const reset = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    setDisplay(text);
  }, [text]);

  return { display, scramble, reset };
}

/* Standalone component */
export default function TextScramble({
  text,
  className = '',
  style = {},
  as: Tag = 'span',
}: {
  text:       string;
  className?: string;
  style?:     React.CSSProperties;
  as?:        keyof JSX.IntrinsicElements;
}) {
  const { display, scramble, reset } = useScramble(text);
  const El = Tag as React.ElementType;

  return (
    <El
      className={className}
      style={{ ...style, display: 'inline-block', fontVariantNumeric: 'tabular-nums' }}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {display}
    </El>
  );
}
