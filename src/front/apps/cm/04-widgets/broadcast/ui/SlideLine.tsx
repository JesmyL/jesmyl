import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { useCmBroadcastMinimalConfigSlides, useCmBroadcastScreenComTextNavigations } from '$cm/features/broadcast';
import { useAtomValue } from 'atomaric';
import { twMerge } from 'tailwind-merge';

export const CmBroadcastSlideLine = () => {
  const { currTexti, setTexti } = useCmBroadcastScreenComTextNavigations();
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const { minimalSlides, selfSlides, isBeats } = useCmBroadcastMinimalConfigSlides(currentConfigi);

  return (
    <div className="no-scrollbar snap-x snap-mandatory flex my-2 bg-x1 py-2 overflow-auto nowrap rounded-md">
      {minimalSlides.map((text, texti) => {
        let linesNode;

        if (isBeats || minimalSlides.length === selfSlides.length || !minimalSlides[texti]?.ord.isRealText()) {
          linesNode = <div dangerouslySetInnerHTML={{ __html: text.lines.join('\n') }} />;
        } else {
          const blocki = minimalSlides[texti].blocki;
          const fromLinei = minimalSlides[texti].fromLinei - minimalSlides[texti].preLinesCount;
          const toLinei = minimalSlides[texti].toLinei - minimalSlides[texti].preLinesCount;

          const before = selfSlides[blocki].lines.slice(0, fromLinei);
          const lines = selfSlides[blocki].lines.slice(fromLinei, toLinei);
          const after = selfSlides[blocki].lines.slice(toLinei);

          linesNode = (
            <>
              <div dangerouslySetInnerHTML={{ __html: before.join('\n') }} />
              <div
                className="bg-x7 text-x2 px-1 rounded-xs"
                dangerouslySetInnerHTML={{ __html: lines.join('\n') }}
              />
              <div dangerouslySetInnerHTML={{ __html: after.join('\n') }} />
            </>
          );
        }

        return (
          <div
            key={texti}
            id={`broadcast-window-line-${texti}`}
            onClick={() => setTexti(texti)}
            className="mx-3 snap-center"
          >
            <div>{texti + 1}</div>
            <div
              className={twMerge(
                'pointer flex flex-col text-x3 flex p-3 h-[calc(100%-1.5em)] overflow-hidden text-[14px] text-center white-pre rounded-md',
                currTexti === texti && 'text-x7 bg-x2',
                !text.ord.isRealText() && 'italic underline',
              )}
            >
              {linesNode}
            </div>
          </div>
        );
      })}
    </div>
  );
};
