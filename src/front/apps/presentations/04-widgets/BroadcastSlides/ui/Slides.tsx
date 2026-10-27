import { translateBase } from '#basis/locale';
import { Button } from '#shared/components';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { publishPresentationSlide } from '$presentations/shared/lib/presentation-broadcast';
import { presentationsCurrentSlidAtom, presentationsCurrentSlidesAtom } from '$presentations/shared/state/broadcast.atoms';
import { useAtomValue } from 'atomaric';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { twJoin } from 'tailwind-merge';

export const PresentationsBroadcastSlides = () => {
  const slides = useAtomValue(presentationsCurrentSlidesAtom);
  const currentSlid = useAtomValue(presentationsCurrentSlidAtom);

  if (!slides) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
        <LazyIcon
          icon="Presentation01"
          className="size-8 text-x4"
        />
        <span className="text-xs text-x4">{translateBase(BaseLocaleKey.EmptyList)}</span>
      </div>
    );
  }

  const currentSlidei = slides.findIndex(slide => slide.slid === currentSlid);
  const showSlide = (slid: number) => {
    void publishPresentationSlide(slides, slid);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-2 border-b px-2 py-1.5">
        <Button
          icon="ArrowLeft01"
          size="sm"
          disabled={currentSlidei <= 0}
          onClick={() => showSlide(slides[currentSlidei - 1].slid)}
        />
        <span className="flex-1 text-center font-mono text-[0.65rem] tracking-[0.2em] text-x4 uppercase">
          {translateBase(BaseLocaleKey.Slide)}: {currentSlidei < 0 ? '--' : currentSlidei + 1} / {slides.length}
        </span>
        <Button
          icon="ArrowRight01"
          size="sm"
          disabled={currentSlidei >= slides.length - 1}
          onClick={() => showSlide(slides[currentSlidei + 1].slid)}
        />
      </div>

      <div className="grid flex-1 content-start gap-2 overflow-auto p-2 [grid-template-columns:repeat(auto-fill,minmax(120px,1fr))]">
        {slides.map(slide => (
          <button
            key={slide.slid}
            className={twJoin(
              'pointer flex min-h-20 flex-col gap-1 rounded-lg border p-2 text-left transition-colors',
              slide.slid === currentSlid
                ? 'border-x7 bg-x7/15 text-x3'
                : 'border-x2 bg-x1 text-x4 hover:border-x7/60',
            )}
            onClick={() => showSlide(slide.slid)}
          >
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-x7">
              {`${slide.slid}`.padStart(2, '0')}
            </span>
            <span className="ellipsis text-xs leading-tight font-semibold">
              {slide.title || translateBase(BaseLocaleKey.Slide)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
