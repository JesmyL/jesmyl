import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import { useAtomValue } from 'atomaric';
import { memo, useRef } from 'react';
import { BibleBroadcastSearchInputPanel } from '../sub-ui/InputPanel';
import { BibleBroadcastSearchResults } from './Results';

export const BibleBroadcastSearchPanel = memo(function BibleSearchPanel() {
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);

  return (
    <div className="w-full h-full flex gap-2 flex-col p-3">
      <BibleBroadcastSearchInputPanel inputRef={inputRef} />

      {listenScope !== BibleBroadcastKeyListenScope.SearchByAddress && (
        <div className="h-[calc(100%-2em)]">
          <BibleBroadcastSearchResults />
        </div>
      )}
    </div>
  );
});
