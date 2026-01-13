import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { useCmBroadcastMinimalConfigLines, useCmBroadcastScreenComTextNavigations } from '$cm/features/broadcast';
import { useAtomValue } from 'atomaric';
import { twMerge } from 'tailwind-merge';

export const CmBroadcastSlideLine = () => {
  const { currTexti, setTexti } = useCmBroadcastScreenComTextNavigations();
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const { minimalLines, selfLines } = useCmBroadcastMinimalConfigLines(currentConfigi);

  return (
    <div className="no-scrollbar snap-x snap-mandatory flex my-2 bg-x1 py-2 overflow-auto nowrap rounded-md">
      {minimalLines.map((text, texti) => {
        let linesNode;

        if (minimalLines.length === selfLines.length) {
          linesNode = <div dangerouslySetInnerHTML={{ __html: text.lines.join('\n') }} />;
        } else {
          const blocki = minimalLines[texti].blocki;
          const fromLinei = minimalLines[texti].fromLinei - minimalLines[texti].preLinesCount;
          const toLinei = minimalLines[texti].toLinei - minimalLines[texti].preLinesCount;

          const before = selfLines[blocki].lines.slice(0, fromLinei);
          const lines = selfLines[blocki].lines.slice(fromLinei, toLinei);
          const after = selfLines[blocki].lines.slice(toLinei);

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
