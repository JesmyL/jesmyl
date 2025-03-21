import { useBibleBooki } from '$bible/translations/lists/atoms';
import { JSX, memo } from 'react';
import { translateFilter } from '../07-basis/lib/const/consts';
import { useBibleMyTranslates, useBibleShowTranslates } from '../07-basis/lib/hooks/translates';
import { BibleModulesTranslationsRedactButton } from './ModulesTranslationsRedactButton';

export const BibleModulesTranslationsControl = memo(function BibleModules({
  isHideEmptyBook,
}: {
  isHideEmptyBook?: boolean;
}): JSX.Element {
  const [myTranslates] = useBibleMyTranslates();
  const [showTranslates, setShowTranslates] = useBibleShowTranslates();
  const [booki] = useBibleBooki();

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
