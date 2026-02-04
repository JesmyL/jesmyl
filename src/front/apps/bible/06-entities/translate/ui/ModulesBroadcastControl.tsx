import { bibleTranslateFilter } from '$bible/shared/const/consts';
import { bibleBookiAtom, bibleMyTranslatesAtom, bibleShowTranslatesAtom } from '$bible/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { JSX, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { BibleTranslateModulesRedactButton } from './ModulesBroadcastRedactButton';

export const BibleTranslateModulesControl = memo(function BibleModules({
  isHideEmptyBook,
}: {
  isHideEmptyBook?: boolean;
}): JSX.Element {
  const myTranslates = useAtomValue(bibleMyTranslatesAtom);
  const showTranslates = useAtomValue(bibleShowTranslatesAtom);
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
                bibleShowTranslatesAtom.set([tName]);
                return;
              }

              if (isShow) {
                if (showTranslates.length > 1) bibleShowTranslatesAtom.set(prev => prev.filter(name => name !== tName));
              } else bibleShowTranslatesAtom.set(prev => [...prev, tName]);
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
