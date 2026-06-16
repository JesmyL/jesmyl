import { CmBroadcastShowChordedSlideMode } from '#shared/model/cm/Cm.model';
import { useCmBroadcastSlidesContext } from '$cm/features/broadcast';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { takeTextBlockWithoutSquareBracketsContent } from 'shared/utils/cm/com/takeTextBlockIncorrects';
import { twMerge } from 'tailwind-merge';

export const CmBroadcastSlideLine = () => {
  const { slidei: currentSlidei, setSlidei, slides } = useCmBroadcastSlidesContext();
  const showChordedSlideMode = useAtomValue(cmShowChordedSlideModeAtom);

  return (
    <div className="no-scrollbar snap-x snap-mandatory flex my-2 bg-x1 py-2 overflow-auto nowrap rounded-md">
      {slides.map((slide, slidei) => {
        if (!slide || (showChordedSlideMode === CmBroadcastShowChordedSlideMode.Hide && slide.ord.isChBlock())) return;

        return (
          <div
            key={slidei}
            id={`broadcast-window-slidei-${slidei}`}
            onClick={() => setSlidei(slidei)}
            className="mx-3 snap-center"
          >
            <div>{slidei + 1}</div>
            <div
              className={twMerge(
                'pointer flex flex-col text-x3 flex p-3 h-[calc(100%-1.5em)] overflow-hidden text-[14px] text-center white-pre rounded-md',
                currentSlidei === slidei && 'text-x7 bg-x2',
                slide.ord.isChBlock() &&
                  (showChordedSlideMode === CmBroadcastShowChordedSlideMode.Blind
                    ? 'italic opacity-50'
                    : showChordedSlideMode === CmBroadcastShowChordedSlideMode.Pass
                      ? 'italic line-through text-xKO'
                      : 'italic underline'),
              )}
            >
              <div
                dangerouslySetInnerHTML={{ __html: takeTextBlockWithoutSquareBracketsContent(slide.lines.join('\n')) }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
