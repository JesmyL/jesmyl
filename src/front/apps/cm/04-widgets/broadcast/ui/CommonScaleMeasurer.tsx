import { shadowStyle } from '#shared/ui/font-size-contain/constants';
import { CSSProperties, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { checkIsArray, checkIsNotNaN } from 'shared/utils/checkIs';
import { makeCmComTextInnerHtmlProp } from 'shared/utils/cm/com/const';
import { twMerge } from 'tailwind-merge';

interface Props {
  htmls: (string | string[])[];
  className: string;
  style: CSSProperties | und;
  subUpdates: string;
  onScale: (scale: number) => void;
}

export const CmBroadcastCommonScaleMeasurer = ({ htmls, className, style, subUpdates, onScale }: Props) => {
  const [isInit, setIsInit] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const uniqueHtmls = useMemo(() => {
    const unique = new Map<string, string | string[]>();

    for (const html of htmls) unique.set(checkIsArray(html) ? `\0${html.join('\n')}` : html, html);

    return [...unique.values()];
  }, [htmls]);

  useLayoutEffect(() => {
    if (isInit) setTimeout(setIsInit, 500, false);

    const container = containerRef.current;
    if (container === null) return;

    let minScale = Infinity;

    for (const child of container.children) {
      const scale = Math.min(
        container.clientHeight / child.clientHeight,
        container.clientWidth / child.clientWidth,
      );

      if (scale > 0 && scale < minScale && checkIsNotNaN(scale)) minScale = scale;
    }

    if (Number.isFinite(minScale)) onScale(minScale);
  }, [uniqueHtmls, subUpdates, isInit, style?.textAlign, onScale]);

  return (
    <div
      className={twMerge('absolute h-full w-full', className)}
      style={{ ...style, visibility: 'hidden', pointerEvents: 'none' }}
      ref={containerRef}
    >
      {uniqueHtmls.map((html, htmli) =>
        checkIsArray(html) ? (
          <div
            key={htmli}
            style={shadowStyle}
          >
            {html.map((line, linei) => (
              <div
                key={linei}
                className="fragmented-slide-line"
                fragmented-slide-linei={linei}
                {...makeCmComTextInnerHtmlProp(line)}
              />
            ))}
          </div>
        ) : (
          <div
            key={htmli}
            style={shadowStyle}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ),
      )}
    </div>
  );
};
