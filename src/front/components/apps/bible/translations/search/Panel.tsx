import { memo, useEffect, useRef } from 'react';
import { bibleIDB } from '../../_db/bibleIDB';
import { BibleSearchZone } from '../../model';
import BibleSearchResults from './Results';
import BibleSearchInputPanel from './input-panel/InputPanel';

const setSearchZone = (zone: BibleSearchZone, inputRef: React.RefObject<HTMLInputElement>) => {
  bibleIDB.set.searchZone(zone);
  const select = () => inputRef.current?.select();
  setTimeout(select, 10);
  setTimeout(select, 50);
  setTimeout(select, 100);
};

export default memo(function BibleSearchPanel(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return hookEffectLine()
      .addEventListener(window, 'keydown', event => {
        switch (event.code) {
          case 'F2':
            setSearchZone('global', inputRef);
            break;
          case 'F3':
            setSearchZone('inner', inputRef);
            break;
          case 'F4':
            setSearchZone('address', inputRef);
            break;
          case 'Enter':
          case 'Escape':
            break;
          default:
            return;
        }

        event.preventDefault();
      })
      .effect();
  }, []);

  return (
    <div className="full-width">
      <BibleSearchInputPanel
        inputRef={inputRef}
        setSearchZone={setSearchZone}
      />
      <BibleSearchResults
        inputRef={inputRef}
        innerZone="chapter"
      />
    </div>
  );
});
