import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import { FontSizeContainProps } from './FontSizeContain.model';

const shadowStyle: CSSProperties = {
  position: 'absolute',
  color: 'transparent',
  pointerEvents: 'none',
};

export default function FontSizeContain({ className, content, html, subUpdate, style }: FontSizeContainProps) {
  const [childStyle, setChildStyle] = useState<CSSProperties | und>();
  const [isInit, setIsInit] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const shadowChildRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (isInit) setTimeout(setIsInit, 500, false);
    if (containerRef.current !== null && shadowChildRef.current !== null) {
      const scale = Math.min(
        containerRef.current.clientHeight / shadowChildRef.current.clientHeight,
        containerRef.current.clientWidth / shadowChildRef.current.clientWidth,
      );

      if (scale > 0 && Number.isFinite(scale) && !isNaN(scale))
        setChildStyle({ transform: `scale(${scale})`, transformOrigin: scale < 1 ? 'center' : undefined });
    }
  }, [content, html, subUpdate, isInit]);

  return (
    <div
      className={className + ' absolute full-height full-width'}
      ref={containerRef}
      style={style}
    >
      {html !== undefined ? (
        <>
          <WithHtml
            __html={html}
            childStyle={childStyle}
            shadowChildRef={shadowChildRef}
          />
        </>
      ) : (
        <>
          <div
            ref={shadowChildRef}
            style={shadowStyle}
            className="shadow-child"
          >
            {content}
          </div>
          <div style={childStyle}>{content}</div>
        </>
      )}
    </div>
  );
}

interface Props {
  shadowChildRef: { current: HTMLDivElement | null };
  __html: string;
  childStyle: CSSProperties | und;
}

const WithHtml = ({ shadowChildRef, __html, childStyle }: Props) => {
  return (
    <>
      <div
        ref={shadowChildRef}
        className="shadow-child"
        style={shadowStyle}
        dangerouslySetInnerHTML={{ __html }}
      />
      <div
        style={childStyle}
        dangerouslySetInnerHTML={{ __html }}
      />
    </>
  );
};
