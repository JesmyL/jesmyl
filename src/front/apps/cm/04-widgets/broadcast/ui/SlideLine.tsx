import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { CmCom } from '$cm/ext';
import { useCmBroadcastMinimalConfigSlides, useCmBroadcastScreenComTextNavigations } from '$cm/features/broadcast';
import { CmBroadcastShowChordedSlideMode } from '$cm/shared/model';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { twMerge } from 'tailwind-merge';

export const CmBroadcastSlideLine = () => {
  const { currentSlidei, setSlidei } = useCmBroadcastScreenComTextNavigations();
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const { minimalSlides, isFragments } = useCmBroadcastMinimalConfigSlides(currentConfigi);
  const showChordedSlideMode = useAtomValue(cmShowChordedSlideModeAtom);

  return (
    <div className="no-scrollbar snap-x snap-mandatory flex my-2 bg-x1 py-2 overflow-auto nowrap rounded-md">
      {minimalSlides.map((slide, slidei) => {
        if (showChordedSlideMode === CmBroadcastShowChordedSlideMode.Hide && !slide.ord.isRealText()) return;

        return (
          <div
            key={slidei}
            id={`broadcast-window-line-${slidei}`}
            onClick={() => setSlidei(slidei)}
            className="mx-3 snap-center"
          >
            <div>{slidei + 1}</div>
            <div
              className={twMerge(
                'pointer flex flex-col text-x3 flex p-3 h-[calc(100%-1.5em)] overflow-hidden text-[14px] text-center white-pre rounded-md',
                currentSlidei === slidei && 'text-x7 bg-x2',
                !slide.ord.isRealText() &&
                  (showChordedSlideMode === CmBroadcastShowChordedSlideMode.Blind
                    ? 'italic opacity-50'
                    : showChordedSlideMode === CmBroadcastShowChordedSlideMode.Pass
                      ? 'italic line-through text-xKO'
                      : 'italic underline'),
              )}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: CmCom.makeLinesWithoutNlMarker(slide.lines, !isFragments).join('\n'),
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
