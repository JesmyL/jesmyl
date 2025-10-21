import { bibleTranslateFilter } from '$bible/shared/const/consts';
import { useBibleMyTranslates, useBibleShowTranslates } from '$bible/shared/hooks/translates';
import { bibleBookiAtom } from '$bible/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { JSX, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { BibleTranslateModulesRedactButton } from './ModulesBroadcastRedactButton';

export const BibleTranslateModulesControl = memo(function BibleModules({
  isHideEmptyBook,
}: {
  isHideEmptyBook?: boolean;
}): JSX.Element {
  const [myTranslates] = useBibleMyTranslates();
  const [showTranslates, setShowTranslates] = useBibleShowTranslates();
  const booki = useAtomValue(bibleBookiAtom);

  return (
    <div className="flex gap-2 my-2">
      {myTranslates.map(tName => {
        const isShow = showTranslates.includes(tName);
        if (isHideEmptyBook && bibleTranslateFilter[tName](booki)) return null;

        return (
          <div
            key={tName}
            className={twMerge('pointer', isShow && 'underline', showTranslates[0] === tName && 'text-x7')}
            onClick={event => {
              if (!event.ctrlKey) {
                setShowTranslates([tName]);
                return;
              }

              if (isShow) {
                if (showTranslates.length > 1) setShowTranslates(prev => prev.filter(name => name !== tName));
              } else setShowTranslates(prev => [...prev, tName]);
            }}
          >
            {tName.toUpperCase()}
          </div>
        );
      })}
      <BibleTranslateModulesRedactButton />
    </div>
  );
});
