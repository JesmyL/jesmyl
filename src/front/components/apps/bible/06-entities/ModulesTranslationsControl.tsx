import { translateFilter } from '$bible/basis/lib/const/consts';
import { useBibleMyTranslates, useBibleShowTranslates } from '$bible/basis/lib/hooks/translates';
import { bibleBookiAtom } from '$bible/basis/lib/store/atoms';
import { useAtomValue } from 'atomaric';
import { JSX, memo } from 'react';
import { BibleModulesTranslationsRedactButton } from './ModulesTranslationsRedactButton';

export const BibleModulesTranslationsControl = memo(function BibleModules({
  isHideEmptyBook,
}: {
  isHideEmptyBook?: boolean;
}): JSX.Element {
  const [myTranslates] = useBibleMyTranslates();
  const [showTranslates, setShowTranslates] = useBibleShowTranslates();
  const booki = useAtomValue(bibleBookiAtom);

  return (
    <div className="flex flex-gap margin-gap-v">
      {myTranslates.map(tName => {
        const isShow = showTranslates.includes(tName);
        if (isHideEmptyBook && translateFilter[tName](booki)) return null;

        return (
          <div
            key={tName}
            className={'pointer' + (isShow ? ' text-underline' : '') + (showTranslates[0] === tName ? ' color--7' : '')}
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
            {tName}
          </div>
        );
      })}
      <BibleModulesTranslationsRedactButton />
    </div>
  );
});
