import { propagationStopper } from '#shared/lib/event-funcs';
import { TextInput } from '#shared/ui/TextInput';
import { bibleBroadcastSearchAreaConfigDict } from '$bible/shared/const';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleBroadcastKeyListenSameScopeAtom, bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';

interface Props {
  inputRef: React.RefObject<(HTMLInputElement & HTMLTextAreaElement) | null>;
  onChange: (value: string) => void;
  term: string;
}

const stopPropagationEventCodeSet = new Set(['Backspace', 'Space', 'Escape']);

export const BibleBroadcastSearchPanelInput = ({ inputRef, term, onChange }: Props) => {
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);

  useEffect(() => {
    if (listenScope in bibleBroadcastSearchAreaConfigDict) {
      inputRef.current?.select();
      return bibleBroadcastKeyListenSameScopeAtom.subscribe(() => inputRef.current?.select());
    } else inputRef.current?.blur();
  }, [inputRef, listenScope]);

  return (
    <>
      <TextInput
        inputRef={inputRef}
        value={term}
        onInput={onChange}
        title="Shift - для передачи контроля выше"
        onKeyDown={event => {
          if (!event.shiftKey && stopPropagationEventCodeSet.has(event.code)) {
            propagationStopper(event);
          }

          if (event.code === 'Escape') bibleBroadcastKeyListenScopeAtom.reset();
        }}
        onFocus={() => {
          if (listenScope in bibleBroadcastSearchAreaConfigDict) return;
          bibleBroadcastKeyListenScopeAtom.set(BibleBroadcastKeyListenScope.SearchInText);
        }}
      />
    </>
  );
};
