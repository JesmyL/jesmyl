import { translateBase } from '#basis/locale';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { cmComAudioPlayerUpdateCurrentTime, useCmComAudioPlayerCurrentTime } from '$cm/entities/com-audio-player';
import { useCmComAudioMarkSlides } from '$cm/shared/lib/useCmComAudioMarkSlides';
import { cmComIsFreshAudioMarksLoadingAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CmAudioSrc } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { TextCase } from 'shared/model/common';
import { makeCmComTextInnerHtmlProp } from 'shared/utils/cm/com/const';
import { twMerge } from 'tailwind-merge';

/** Player text slides prefer the second newliner variant, falling back to the first. */
const PLAYER_NAME_SPACEI_VARIANTS = [1, 0];
/** Half-height edges let the first and last slides reach the viewport center; they are not slides themselves. */
const SLIDE_SPACER_ATTR = 'data-slide-spacer';
const HALF_HEIGHT_SPACER_CLASS = 'h-1/2';
const ACTIVE_SLIDE_CLASS = 'text-[var(--color--7)] opacity-100 scale-100';
const INACTIVE_SLIDE_CLASS = 'text-[var(--color--3)] opacity-35 scale-[0.94]';

interface Props {
  com: CmCom;
  src: CmAudioSrc;
  className?: string;
}

const isSlideNode = (child: Element | nil): child is HTMLElement =>
  child instanceof HTMLElement && !child.hasAttribute(SLIDE_SPACER_ATTR);

const getSlideNodes = (container: HTMLDivElement) => Array.from(container.children).filter(isSlideNode);

const scrollSlideToCenter = (container: HTMLDivElement, slidei: number) => {
  const slide = getSlideNodes(container)[slidei];
  if (!slide) return;

  container.scrollTo({
    top: slide.offsetTop - (container.clientHeight - slide.clientHeight) / 2,
    behavior: 'smooth',
  });
};

export const CmPlayerTextSlides = ({ com, src, className }: Props) => {
  const { audioSlides } = useCmComAudioMarkSlides(com, src, TextCase.AsIs, PLAYER_NAME_SPACEI_VARIANTS);
  const isFreshMarksLoading = useAtomValue(cmComIsFreshAudioMarksLoadingAtom);
  const currentTime = useCmComAudioPlayerCurrentTime();
  /** Optimistic highlight set at seek time; the playback-derived index reconciles it on the next update. */
  const [seeki, setSeeki] = useState<nil | number>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeiRef = useRef(-1);

  const timeActivei = useMemo(() => {
    for (let slidei = audioSlides.length - 1; slidei >= 0; slidei--) {
      if (audioSlides[slidei].time <= currentTime) return slidei;
    }

    return 0;
  }, [audioSlides, currentTime]);

  /** The seeked slide shows immediately; the playback-derived index takes over as soon as it moves. */
  const activei = seeki ?? timeActivei;

  useEffect(() => {
    setSeeki(null);
  }, [timeActivei]);

  useEffect(() => {
    if (activeiRef.current === activei) return;

    activeiRef.current = activei;
    const container = containerRef.current;
    if (container) scrollSlideToCenter(container, activei);
  }, [activei]);

  const onSlideClick = (slidei: number) => {
    const slide = audioSlides[slidei];
    if (!slide) return;

    setSeeki(slidei);
    cmComAudioPlayerUpdateCurrentTime(slide.time);
  };

  return (
    <div
      className={twMerge(
        'fixed inset-x-0 top-[calc(var(--header-height)+var(--cm-player-height,0px))] bottom-[calc(var(--footer-height)+var(--footer-bottom))] z-0 pointer-events-none',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-1 h-12 rounded-t-3xl bg-[linear-gradient(180deg,var(--color--5),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-12 rounded-b-3xl bg-[linear-gradient(0deg,var(--color--5),transparent)]" />

      {!isFreshMarksLoading || (
        <div className="pointer-events-none absolute inset-x-0 top-[1.1rem] z-2 flex justify-center">
          <TheIconLoading
            isLoading
            className="opacity-70 text-[1.35rem] text-[var(--color--7)]"
          />
        </div>
      )}

      <div
        ref={containerRef}
        className="pointer-events-auto relative h-full overflow-y-auto overscroll-contain rounded-3xl px-[1.2rem] py-[2.4rem] text-[1.15rem] leading-[1.55] bg-[var(--color--5)] supports-[background:color-mix(in_srgb,red,blue)]:bg-[color-mix(in_srgb,var(--color--5)_93%,transparent)] backdrop-blur-md"
        st-no-scrollbar=""
      >
        {audioSlides.length ? (
          <>
            <div
              className={HALF_HEIGHT_SPACER_CLASS}
              {...{ [SLIDE_SPACER_ATTR]: '' }}
            />
            {audioSlides.map((slide, slidei) => (
              <div
                key={slidei}
                onClick={() => onSlideClick(slidei)}
                className={twMerge(
                  'white-pre pointer py-[0.7rem] text-center [transition:color_.45s,opacity_.45s,transform_.45s]',
                  slidei === activei ? ACTIVE_SLIDE_CLASS : INACTIVE_SLIDE_CLASS,
                  slide.isChorded && 'italic',
                )}
                {...makeCmComTextInnerHtmlProp(slide.text)}
              />
            ))}
            <div
              className={HALF_HEIGHT_SPACER_CLASS}
              {...{ [SLIDE_SPACER_ATTR]: '' }}
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-[0.95rem] opacity-60">
            {translateBase(BaseLocaleKey.CmMarksNotSet)}
          </div>
        )}
      </div>
    </div>
  );
};
