import { TextInput } from '#shared/ui/TextInput';
import { bibleBroadcastSearchAreaConfigDict } from '$bible/shared/const';
import { bibleBroadcastKeyListenSameScopeAtom, bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';

interface Props {
  inputRef: React.RefObject<(HTMLInputElement & HTMLTextAreaElement) | null>;
  onChange: (value: string) => void;
  term: string;
}

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
        onKeyDown={event => {
          if (!event.shiftKey && event.code === 'Backspace') event.stopPropagation();
          if (event.code === 'Escape') event.currentTarget.blur();
        }}
      />
    </>
  );
};
