import { useEffect } from 'react';
import { addEventListenerPipe, hookEffectPipe } from '../../../../../../07-shared/lib/hookEffectPipe';
import { bibleIDB } from '../../../_db/bibleIDB';
import { useSetBibleAddressIndexes } from '../../../hooks/address/address';
import { useBibleTranslationSlideSyncContentSetter } from '../../../hooks/slide-sync';
import {
  useBibleTranslationSearchResultList,
  useBibleTranslationSearchResultSelectedSet,
  useBibleTranslationSearchResultSelectedValue,
} from '../hooks/results';
import { BibleSearchPanelInput } from './Input';

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
}

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => bibleIDB.set.searchTerm(event.target.value);

export default function BibleSearchPanelSearchTextInput({ inputRef }: Props) {
  const searchTerm = bibleIDB.useValue.searchTerm();
  const resultSelected = useBibleTranslationSearchResultSelectedValue();
  const setResultSelected = useBibleTranslationSearchResultSelectedSet();
  const syncSlide = useBibleTranslationSlideSyncContentSetter();

  const setAddress = useSetBibleAddressIndexes();
  const [resultList] = useBibleTranslationSearchResultList();

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
    <BibleSearchPanelInput
      inputRef={inputRef}
      term={searchTerm}
      onChange={onChange}
    />
  );
}
