import { memo, useCallback, useEffect, useRef } from 'react';
import { useBibleTranslationJoinAddressSetter } from '../../hooks/address/address';
import { BibleSearchZone } from '../../model';
import BibleSearchResults from './Results';
import BibleSearchInputPanel from './input-panel/InputPanel';
import { useBibleSearchZone } from './selectors';

export default memo(function BibleSearchPanel(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const setJoin = useBibleTranslationJoinAddressSetter();

  const [searchZone, setZone] = useBibleSearchZone();

  const putOnSearchZone = useCallback(
    (zone: BibleSearchZone) => {
      return () => {
        setZone(zone);
        setTimeout(() => inputRef.current?.select(), 10);
      };
    },
    [setZone],
  );

  useEffect(() => {
    if (inputRef.current)
      return hookEffectLine()
        .addEventListener(inputRef.current, 'keydown', event => {
          switch (event.code) {
            case 'Enter':
              setJoin(null);
              break;
          }
        })
        .effect();
  }, [setJoin]);

  useEffect(() => {
    return hookEffectLine()
      .addEventListener(window, 'keyup', event => {
        switch (event.code) {
          case 'F2':
            putOnSearchZone('global')();
            break;
          case 'F3':
            putOnSearchZone('inner')();
            break;
          case 'F4':
            putOnSearchZone('address')();
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
  }, [putOnSearchZone, searchZone]);

  return (
    <div className="full-width">
      <BibleSearchInputPanel
        inputRef={inputRef}
        putOnSearchZone={putOnSearchZone}
      />
      <BibleSearchResults
        inputRef={inputRef}
        innerZone="chapter"
      />
    </div>
  );
});
