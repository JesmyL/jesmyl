import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import { PresentationSlide, PresentationSlideItem } from 'shared/api/tsjrpc.electtron/presentations';
import { PresentationBroadcastConfig } from 'shared/model/presentations';
import { broadcastNextLiveDataAtom } from '../atoms';
import { presentationBroadcastDefaultConfig } from '../complect/defaults';

const StyledTextHtml = styled.div`
  font-size: 0;

  p,
  ul,
  ol {
    margin: 0;
  }

  ul,
  ol {
    padding-left: 40px;
  }

  a {
    color: inherit;
  }
`;

const useElementSize = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      setSize(prev => (prev.width === rect.width && prev.height === rect.height ? prev : { width: rect.width, height: rect.height }));
    };

    if (typeof ResizeObserver === 'undefined') {
      update();
      return;
    }

    const observer = new ResizeObserver(update);
    observer.observe(node);
    update();

    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
};

const takeTextStyle = (item: Extract<PresentationSlideItem, { kind: 'text' }>): CSSProperties => ({
  position: 'absolute',
  left: item.box.left,
  top: item.box.top,
  width: item.box.width,
  height: item.box.height,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: item.align,
  boxSizing: 'border-box',
  overflow: 'visible',
  ...item.boxCss,
  ...(item.inset && {
    padding: `${item.inset.top}px ${item.inset.right}px ${item.inset.bottom}px ${item.inset.left}px`,
  }),
  ...(item.rotate && { transform: `rotate(${item.rotate}deg)` }),
  ...(item.vertical && { writingMode: 'vertical-rl' }),
});

const renderSlideItem = (item: PresentationSlideItem, itemi: number) => {
  if (item.kind === 'shape') {
    return (
      <div
        key={itemi}
        style={{
          position: 'absolute',
          left: item.box.left,
          top: item.box.top,
          width: item.box.width,
          height: item.box.height,
          ...item.css,
          ...(item.rotate && { transform: `rotate(${item.rotate}deg)` }),
        }}
      />
    );
  }

  if (item.kind === 'image') {
    const transform = [
      item.rotate ? `rotate(${item.rotate}deg)` : '',
      item.flipH ? 'scaleX(-1)' : '',
      item.flipV ? 'scaleY(-1)' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        key={itemi}
        style={{
          position: 'absolute',
          left: item.box.left,
          top: item.box.top,
          width: item.box.width,
          height: item.box.height,
        }}
      >
        <img
          src={item.src}
          alt=""
          draggable={false}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            ...(transform && { transform }),
          }}
        />
      </div>
    );
  }

  return (
    <div
      key={itemi}
      style={takeTextStyle(item)}
    >
      <StyledTextHtml
        style={{ width: '100%', fontSize: item.baseFont, whiteSpace: item.nowrap ? 'pre' : 'pre-wrap' }}
        dangerouslySetInnerHTML={{ __html: item.contentHtml }}
      />
    </div>
  );
};

export const PresentationSlideCanvas = ({
  slide,
  config = presentationBroadcastDefaultConfig,
}: {
  slide: PresentationSlide;
  config?: PresentationBroadcastConfig;
}) => {
  const [ref, viewport] = useElementSize();
  const scale = Math.min(viewport.width / slide.width, viewport.height / slide.height);
  const isMeasured = scale > 0 && Number.isFinite(scale);
  const bg = slide.bg;

  const canvasStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: slide.width,
    height: slide.height,
    transformOrigin: '0 0',
    overflow: 'hidden',
    backgroundColor: bg?.color ?? '#FFFFFF',
    ...(bg?.gradient && { backgroundImage: bg.gradient }),
    ...(bg?.image && {
      backgroundImage: `url("${bg.image}")`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
    }),
    ...(isMeasured && { transform: `scale(${scale})` }),
  };

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: config.bgColor }}
    >
      {isMeasured && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            margin: 'auto',
            width: slide.width * scale,
            height: slide.height * scale,
            overflow: 'hidden',
          }}
        >
          <div style={canvasStyle}>{slide.items.map(renderSlideItem)}</div>
        </div>
      )}
    </div>
  );
};

export const PresentationBroadcastSlide = ({ config = presentationBroadcastDefaultConfig, ...slide }: PresentationSlide & { config?: PresentationBroadcastConfig }) => (
  <div className="relative h-full w-full overflow-hidden bg-black">
    <PresentationSlideCanvas
      slide={slide}
      config={config}
    />
  </div>
);

export const PresentationBroadcastScreen = () => {
  const presentations = useAtomValue(broadcastNextLiveDataAtom).data.presentations;
  const slide = presentations && (presentations.slides.find(slide => slide.slid === presentations.slid) ?? presentations.slides[0]);

  if (!presentations || !slide) return <div className="h-full w-full bg-black" />;

  return (
    <PresentationBroadcastSlide
      {...slide}
      config={presentations.config}
    />
  );
};
