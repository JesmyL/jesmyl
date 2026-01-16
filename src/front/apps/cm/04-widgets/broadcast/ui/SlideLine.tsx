import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { useCmBroadcastMinimalConfigSlides, useCmBroadcastScreenComTextNavigations } from '$cm/features/broadcast';
import { useAtomValue } from 'atomaric';
import { twMerge } from 'tailwind-merge';

export const CmBroadcastSlideLine = () => {
  const { currentSlidei, setSlidei } = useCmBroadcastScreenComTextNavigations();
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const { minimalSlides } = useCmBroadcastMinimalConfigSlides(currentConfigi);

  return (
    <div className="no-scrollbar snap-x snap-mandatory flex my-2 bg-x1 py-2 overflow-auto nowrap rounded-md">
      {minimalSlides.map((slide, slidei) => {
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
                !slide.ord.isRealText() && 'italic underline',
              )}
            >
              <div dangerouslySetInnerHTML={{ __html: slide.lines.join('\n') }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
