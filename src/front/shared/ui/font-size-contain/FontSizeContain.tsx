import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import { checkIsArray, checkIsNotNaN } from 'shared/utils/checkIs';
import { twMerge } from 'tailwind-merge';
import { shadowStyle } from './constants';
import { FontSizeContainProps } from './FontSizeContain.model';

export function FontSizeContain({ className, content, html, subUpdates, style, maxScale }: FontSizeContainProps) {
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
      const limitedScale = maxScale !== undefined ? Math.min(scale, maxScale) : scale;

      if (limitedScale > 0 && Number.isFinite(limitedScale) && checkIsNotNaN(limitedScale))
        setChildStyle({
          transform: `scale(${limitedScale})`,
          transformOrigin: style?.textAlign === 'left' ? 'left' : style?.textAlign === 'right' ? 'right' : 'center',
        });
    }
  }, [content, html, subUpdates, isInit, style?.textAlign, maxScale]);

  return (
    <div
      className={twMerge('absolute h-full w-full', className)}
      ref={containerRef}
      style={style}
    >
      {html !== undefined ? (
        <>
          <WithHtml
            __html={checkIsArray(html) ? html.join('\n') : html}
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
