import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { BibleSearchInnerZone, BibleSearchZone } from '$bible/shared/model/base';
import { useAtomValue } from 'atomaric';
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
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const searchZone = useAtomValue(bibleBroadcastSearchZoneAtom);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(window, 'keydown', event => {
          switch (event.code) {
            case 'F2':
              setSearchZone(BibleSearchZone.Global, inputRef);
              break;
            case 'F3':
              setSearchZone(BibleSearchZone.Inner, inputRef);
              break;
            case 'F4':
              setSearchZone(BibleSearchZone.Address, inputRef);
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
    <div className="w-full h-full flex gap-2 flex-col p-3">
      <BibleBroadcastSearchInputPanel
        inputRef={inputRef}
        setSearchZone={setSearchZone}
      />

      {searchZone !== BibleSearchZone.Address && (
        <div className="h-[calc(100%-2em)]">
          <BibleBroadcastSearchResults
            inputRef={inputRef}
            innerZone={BibleSearchInnerZone.Chapter}
          />
        </div>
      )}
    </div>
  );
});
