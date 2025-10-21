import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useSetBibleAddressIndexes } from '$bible/shared/hooks';
import { useBibleBroadcastSlideSyncContentSetter } from '$bible/shared/hooks/slide-sync';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import {
  useBibleBroadcastSearchResultSelectedSet,
  useBibleBroadcastSearchResultSelectedValue,
  useBibleBroadcastSearchSearchResultList,
} from '../lib/results';
import { bibleBroadcastSearchTermAtom } from '../state/atoms';
import { BibleBroadcastSearchPanelInput } from './Input';

interface Props {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => bibleBroadcastSearchTermAtom.set(event.target.value);

export const BibleBroadcastSearchPanelSearchTextInput = ({ inputRef }: Props) => {
  const searchTerm = useAtomValue(bibleBroadcastSearchTermAtom);
  const resultSelected = useBibleBroadcastSearchResultSelectedValue();
  const setResultSelected = useBibleBroadcastSearchResultSelectedSet();
  const syncSlide = useBibleBroadcastSlideSyncContentSetter();

  const setAddress = useSetBibleAddressIndexes();
  const [resultList] = useBibleBroadcastSearchSearchResultList();

  useEffect(() => {
    if (resultSelected === null || resultList[resultSelected] === undefined) return;

    setAddress(...resultList[resultSelected]);
  }, [resultList, resultSelected, setAddress]);

  useEffect(() => {
    if (inputRef.current === null) return;
    const inputNode = inputRef.current;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(inputRef.current, 'keydown', event => {
          switch (event.code) {
            case 'Enter':
              inputNode.blur();
              syncSlide();
              setResultSelected(null);

              return;
            case 'ArrowUp':
              if (resultSelected !== null && resultSelected > 0) setResultSelected(resultSelected - 1);
              break;
            case 'ArrowDown':
              if (resultSelected === null || resultSelected < resultList.length - 1)
                setResultSelected((resultSelected ?? -1) + 1);
              break;
            default:
              return;
          }

          event.stopPropagation();
          event.preventDefault();
        }),
      )
      .effect();
  }, [inputRef, resultList.length, resultSelected, setResultSelected, syncSlide]);

  return (
    <BibleBroadcastSearchPanelInput
      inputRef={inputRef}
      term={searchTerm}
      onChange={onChange}
    />
  );
};
