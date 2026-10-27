import { translateBase } from '#basis/locale';
import { PresentationBroadcastSlide } from '#features/broadcast/ui/PresentationScreen';
import { Button } from '#shared/components';
import { HorizontalDirection } from '#shared/model/Direction';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { switchPresentationSlideByDirection } from '$presentations/shared/lib/presentation-broadcast';
import { presentationsCurrentSlidAtom, presentationsCurrentSlidesAtom } from '$presentations/shared/state/broadcast.atoms';
import { useAtomValue } from 'atomaric';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const PresentationsBroadcastPreview = () => {
  const slides = useAtomValue(presentationsCurrentSlidesAtom);
  const slid = useAtomValue(presentationsCurrentSlidAtom);
  const slidei = slides ? slides.findIndex(slide => slide.slid === slid) : -1;

  if (!slides || slidei < 0) {
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

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <PresentationBroadcastSlide {...slides[slidei]} />

      <div className="absolute inset-x-0 bottom-1 flex items-center justify-center gap-1">
        <Button
          icon="ArrowLeft01"
          size="sx"
          variant="secondary"
          disabled={slidei <= 0}
          onClick={() => {
            switchPresentationSlideByDirection(HorizontalDirection.RightToLeft);
          }}
        />
        <span className="rounded bg-black/60 px-1.5 py-0.5 font-mono text-[0.6rem] tracking-[0.2em] text-white/70">
          {slidei + 1} / {slides.length}
        </span>
        <Button
          icon="ArrowRight01"
          size="sx"
          variant="secondary"
          disabled={slidei >= slides.length - 1}
          onClick={() => {
            switchPresentationSlideByDirection(HorizontalDirection.LeftToRight);
          }}
        />
      </div>
    </div>
  );
};
