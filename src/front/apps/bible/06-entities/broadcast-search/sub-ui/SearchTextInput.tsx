import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useBibleBroadcastSlideSyncContentSetter } from '$bible/shared/hooks/slide-sync';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { bibleBroadcastSearchTermAtom } from '../state/atoms';
import { BibleBroadcastSearchPanelInput } from './Input';

interface Props {
  inputRef: React.RefObject<(HTMLInputElement & HTMLTextAreaElement) | null>;
}

export const BibleBroadcastSearchPanelSearchTextInput = ({ inputRef }: Props) => {
  const searchTerm = useAtomValue(bibleBroadcastSearchTermAtom);
  const syncSlide = useBibleBroadcastSlideSyncContentSetter();

  useEffect(() => {
    if (!inputRef.current) return;
    const inputNode = inputRef.current;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(inputRef.current, 'keydown', event => {
          switch (event.code) {
            case 'ArrowDown':
            case 'ArrowUp':
              event.preventDefault();
          }
        }),
      )
      .effect(
        ThrowEvent.listenKeyDown('Enter', () => {
          inputNode.blur();
          syncSlide();
        }),
      );
  }, [inputRef, syncSlide]);

  return (
    <BibleBroadcastSearchPanelInput
      inputRef={inputRef}
      term={searchTerm}
      onChange={bibleBroadcastSearchTermAtom.set}
    />
  );
};
