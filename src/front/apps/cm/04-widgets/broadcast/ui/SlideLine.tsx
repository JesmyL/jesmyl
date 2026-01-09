import { useCmBroadcastCurrentComTexts, useCmBroadcastScreenComTextNavigations } from '$cm/features/broadcast';
import { twMerge } from 'tailwind-merge';
import { useCmBroadcastCurrentScreenConfig } from '../hooks/configs';

export const CmBroadcastSlideLine = () => {
  const { currTexti, setTexti } = useCmBroadcastScreenComTextNavigations();
  const currentConfig = useCmBroadcastCurrentScreenConfig();
  const texts = useCmBroadcastCurrentComTexts(currentConfig?.pushKind);

  if (!texts) return;

  return (
    <div className="no-scrollbar snap-x snap-mandatory flex my-2 bg-x1 py-2 overflow-auto nowrap rounded-md">
      {texts.map((text, texti) => {
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
              )}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
        );
      })}
    </div>
  );
};
