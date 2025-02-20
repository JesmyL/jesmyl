import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { bibleIDB } from '@bible/shared/lib/bibleIDB';
import { useSetBibleAddressIndexes } from '@bible/shared/translations/hooks/address';
import { useBibleTranslationSlideSyncContentSetter } from '@bible/shared/translations/hooks/slide-sync';
import { BibleSearchPanelInput } from '@bible/shared/translations/ui/Input';
import { useEffect } from 'react';
import {
  useBibleTranslationSearchResultList,
  useBibleTranslationSearchResultSelectedSet,
  useBibleTranslationSearchResultSelectedValue,
} from '../hooks/results';

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
}

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => bibleIDB.set.searchTerm(event.target.value);

export const BibleSearchPanelSearchTextInput = ({ inputRef }: Props) => {
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
};
