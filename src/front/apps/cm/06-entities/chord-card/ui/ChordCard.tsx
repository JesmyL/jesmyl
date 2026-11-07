import { translateBase } from '#basis/locale';
import { JSX, TouchEventHandler, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ChordTrack } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { chordNameToTracks } from 'shared/utils/cm/com/chordTrack';
import { twMerge } from 'tailwind-merge';
import '../style/ChordCard.scss';
import { CmChordCardTracked } from './ChordCardTracked';

type CarouselSize = { width: number; height: number; offsets: number[] };

const swipeThresholdRatio = 0.2;

export const CmChordCard = ({
  chordName,
  resource,
  customContent,
  ...props
}: {
  chordName: string;
  resource?: Record<string, ChordTrack>;
  customContent?: (card: JSX.Element | null) => JSX.Element;
  bottomPadding?: number;
}) => {
  const tracks = useMemo(() => {
    if (resource) return null;

    try {
      return chordNameToTracks(chordName);
    } catch {
      return [];
    }
  }, [chordName, resource]);

  const variantsCount = tracks?.length ?? 0;
  // Карусель открывается на среднем варианте; при малом их числе старт с первого, чтобы не «перепрыгивать» на последний.
  const defaultVariantIndex = variantsCount < 3 ? 0 : 2;

  const [selected, setSelected] = useState({ chordName, index: defaultVariantIndex });
  const cursor = selected.chordName === chordName ? selected.index : defaultVariantIndex;
  const variantIndex = variantsCount ? ((cursor % variantsCount) + variantsCount) % variantsCount : 0;
  const track = resource ? resource[chordName] : tracks?.[variantIndex];

  const [size, setSize] = useState<nil | CarouselSize>(null);
  const [isResizeAnimated, setIsResizeAnimated] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<HTMLDivElement[]>([]);
  const swipeStartRef = useRef<nil | { pageX: number; pageY: number }>(null);
  const isSwipedRef = useRef(false);

  useLayoutEffect(() => {
    const trackNode = trackRef.current;
    const cells = cellRefs.current.slice(0, variantsCount);
    const activeCell = cells[variantIndex];
    if (!trackNode || !activeCell) return;

    const measure = () => {
      const trackLeft = trackNode.getBoundingClientRect().left;
      const offsets = cells.map(cell => cell.getBoundingClientRect().left - trackLeft);
      const { width, height } = activeCell.getBoundingClientRect();
      if (!width || !height) return;

      setSize(prev =>
        prev &&
        prev.width === width &&
        prev.height === height &&
        prev.offsets.length === offsets.length &&
        prev.offsets.every((offset, index) => offset === offsets[index])
          ? prev
          : { width, height, offsets },
      );
    };

    // Контейнер портала попадает в документ позже, поэтому первый замер даёт нули —
    // ResizeObserver повторяет замер, когда ячейка получает реальные размеры.
    const observer = new ResizeObserver(measure);
    observer.observe(activeCell);
    measure();

    return () => observer.disconnect();
  }, [tracks, variantsCount, variantIndex]);

  useLayoutEffect(() => {
    if (!size || isResizeAnimated) return;

    // Анимация ширины/высоты включается после первого кадра с готовым размером,
    // иначе карусель «раскрывалась» бы из нуля при монтировании.
    const frame = requestAnimationFrame(() => setIsResizeAnimated(true));
    return () => cancelAnimationFrame(frame);
  }, [size, isResizeAnimated]);

  if (!track) return customContent ? customContent(null) : null;

  const card = <CmChordCardTracked {...props} track={track} />;

  if (!tracks || variantsCount < 2) return customContent ? customContent(card) : card;

  const offset = size?.offsets[variantIndex] ?? 0;

  const onTouchStart: TouchEventHandler<HTMLDivElement> = event => {
    if (event.touches.length !== 1) return;

    const touch = event.touches[0];
    swipeStartRef.current = { pageX: touch.pageX, pageY: touch.pageY };
    isSwipedRef.current = false;
    event.stopPropagation();
  };

  const onTouchMove: TouchEventHandler<HTMLDivElement> = event => {
    if (event.touches.length === 1) event.stopPropagation();
  };

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = event => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start) return;

    event.stopPropagation();

    const touch = event.changedTouches[0];
    const deltaX = touch.pageX - start.pageX;
    const deltaY = touch.pageY - start.pageY;

    if (Math.abs(deltaX) < event.currentTarget.clientWidth * swipeThresholdRatio) return;
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;

    isSwipedRef.current = true;
    setSelected({ chordName, index: cursor + (deltaX < 0 ? 1 : -1) });
  };

  const selectVariant = (index: number) => {
    if (isSwipedRef.current) {
      isSwipedRef.current = false;
      return;
    }

    setSelected({ chordName, index });
  };

  const carousel = (
    <div className="inline-flex flex-col items-center gap-1">
      <div
        className={twMerge(
          'relative touch-pan-y overflow-hidden',
          isResizeAnimated && '[transition:width_.26s_ease,height_.26s_ease]',
        )}
        style={{
          width: size?.width ?? 0,
          height: size?.height ?? 0,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          className="relative flex items-start [transition:transform_.26s_ease]"
          style={{ transform: `translateX(${-offset}px)` }}
        >
          {tracks.map((variantTrack, index) => (
            <div
              key={index}
              ref={node => {
                if (node) cellRefs.current[index] = node;
              }}
              className="flex shrink-0"
              aria-hidden={index !== variantIndex}
            >
              <CmChordCardTracked
                {...props}
                track={variantTrack}
              />
            </div>
          ))}
        </div>
        <div
          className="pointer absolute inset-y-0 left-0 w-[40%]"
          aria-hidden
          onClick={() => selectVariant(cursor - 1)}
        />
        <div
          className="pointer absolute inset-y-0 right-0 w-[40%]"
          aria-hidden
          onClick={() => selectVariant(cursor + 1)}
        />
      </div>
      <div className="flex items-center">
        {tracks.map((_, index) => (
          <button
            key={index}
            type="button"
            className={twMerge(
              'pointer h-4 p-1 border-0 rounded-full bg-clip-content transition-[width,background-color] duration-[260ms]',
              index === variantIndex
                ? 'w-8 bg-[var(--color--7)]'
                : 'w-4 bg-[color-mix(in_srgb,var(--color--3)_22%,transparent)]',
            )}
            aria-label={`${translateBase(BaseLocaleKey.Slide)} ${index + 1}`}
            aria-current={index === variantIndex}
            onClick={() => selectVariant(index)}
          />
        ))}
      </div>
    </div>
  );

  return customContent ? customContent(carousel) : carousel;
};
