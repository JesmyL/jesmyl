import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { useCmBroadcastMinimalConfigLines, useCmBroadcastScreenComTextNavigations } from '$cm/features/broadcast';
import { useAtomValue } from 'atomaric';
import { twMerge } from 'tailwind-merge';

export const CmBroadcastSlideLine = () => {
  const { currTexti, setTexti } = useCmBroadcastScreenComTextNavigations();
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const { minimalLines } = useCmBroadcastMinimalConfigLines(currentConfigi);

  return (
    <div className="no-scrollbar snap-x snap-mandatory flex my-2 bg-x1 py-2 overflow-auto nowrap rounded-md">
      {minimalLines.map((text, texti) => {
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
                'pointer text-x3 flex p-3 h-[calc(100%-1.5em)] overflow-hidden text-[14px] text-center white-pre rounded-md',
                currTexti === texti && 'text-x7 bg-x2',
                !text.ord.isRealText() && 'italic underline',
              )}
              dangerouslySetInnerHTML={{ __html: text.lines.join('\n') }}
            />
          </div>
        );
      })}
    </div>
  );
};
