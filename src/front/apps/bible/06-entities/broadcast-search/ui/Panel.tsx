import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { BibleSearchZone } from '$bible/shared/model/base';
import { JSX, memo, useEffect, useRef } from 'react';
import { bibleBroadcastSearchZoneAtom } from '../state/atoms';
import { BibleBroadcastSearchInputPanel } from '../sub-ui/InputPanel';
import { BibleBroadcastSearchResults } from './Results';

const setSearchZone = (zone: BibleSearchZone, inputRef: React.RefObject<HTMLInputElement | null>) => {
  bibleBroadcastSearchZoneAtom.set(zone);
  const select = () => inputRef.current?.select();
  setTimeout(select, 10);
  setTimeout(select, 50);
  setTimeout(select, 100);
};

export const BibleBroadcastSearchPanel = memo(function BibleSearchPanel(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(window, 'keydown', event => {
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
        }),
      )
      .effect();
  }, []);

  return (
    <div className="w-full">
      <BibleBroadcastSearchInputPanel
        inputRef={inputRef}
        setSearchZone={setSearchZone}
      />
      <BibleBroadcastSearchResults
        inputRef={inputRef}
        innerZone="chapter"
      />
    </div>
  );
});
