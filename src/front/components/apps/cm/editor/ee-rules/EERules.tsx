import { atom, useAtom } from 'front/complect/atoms';
import { useExerExec } from 'front/complect/exer/hooks/useExer';
import { MyLib } from 'front/utils';
import { useEffect, useRef, useState } from 'react';
import TheButton from '../../../../../complect/Button';
import Dropdown from '../../../../../complect/dropdown/Dropdown';
import { DropdownItem } from '../../../../../complect/dropdown/Dropdown.model';
import IconCheckbox from '../../../../../complect/the-icon/IconCheckbox';
import { cmExer } from '../../CmExer';
import { eeStorage } from '../../base/ee-storage/EeStorage';
import { EeStorageStoreType } from '../../base/ee-storage/EeStorage.model';
import PhaseCmEditorContainer from '../phase-editor-container/PhaseCmEditorContainer';
import { EERulesListComputer } from './EERulesListComputer';
import { EERulesWord } from './EERulesWord';

const sizes = [10, 30, 50];

let listBox = { list: [] } as { list: string[] };

const eeWordsAtom = atom<EeStorageStoreType>({});
const pageSizeAtom = atom(50);
const currentPageAtom = atom(1);
const isCheckBibleAtom = atom(false);

export default function EERules() {
  const exec = useExerExec();

  const [pageSize, setPageSize] = useAtom(pageSizeAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [isCheckBible, setIsCheckBible] = useAtom(isCheckBibleAtom);
  const [editedWords, setEditedWords] = useAtom(eeWordsAtom);

  const [updates, setUpdates] = useState(0);
  const [isShowListComputer, setIsShowListComputer] = useState(false);

  const editedWordsRef = useRef<EeStorageStoreType>();
  editedWordsRef.current = editedWords;

  useEffect(() => setIsShowListComputer(false), [updates]);

  useEffect(() => {
    const words = MyLib.keys(editedWords);
    if (!words.length) return;

    cmExer.set({
      method: 'set',
      scope: 'setEERuleWordTracks',
      action: 'setEERuleWordTracks',
      value: editedWords,
      generalId: 'word-ee-setting',
      prev: {},
      args: { value: editedWords },
      onLoad: () => setEditedWords({}),
    });

    exec();
  }, [editedWords, exec, setEditedWords]);

  return (
    <PhaseCmEditorContainer
      className="e-e-rules-editor"
      headTitle="Ё-Е правила"
      content={
        <>
          <TheButton
            className="margin-gap"
            onClick={() => setIsShowListComputer(true)}
          >
            Проверить наличие неизвестных слов
          </TheButton>
          <IconCheckbox
            postfix="включать библейские слова"
            checked={isCheckBible}
            onChange={setIsCheckBible}
          />
          {isShowListComputer ? (
            <EERulesListComputer
              isCheckBible={isCheckBible}
              setUpdates={setUpdates}
              listBox={listBox}
            />
          ) : (
            <>
              {sizes.map(size => (
                <button
                  key={size}
                  className="margin-gap"
                  disabled={pageSize === size}
                  onClick={() => setPageSize(size)}
                >
                  {size}
                </button>
              ))}
              <Dropdown
                onSelect={({ id }) => setCurrentPage(id)}
                items={Array(Math.ceil(listBox.list.length / pageSize))
                  .fill(0)
                  .map((_, page): DropdownItem<number> => {
                    const words = listBox.list.slice(page * pageSize, page * pageSize + pageSize);

                    return {
                      title: words[0],
                      id: page,
                      disabled: currentPage === page,
                      color: words.some(word => eeStorage.get(word) == null) ? 'ko' : null,
                    };
                  })}
              />
              слов: {listBox.list.length}
              {listBox.list.slice(currentPage * pageSize, currentPage * pageSize + pageSize).map((word, wordi) => {
                return (
                  <EERulesWord
                    key={word}
                    word={word}
                    setEditedWords={setEditedWords}
                    editedWordsRef={editedWordsRef as never}
                  />
                );
              })}
            </>
          )}
        </>
      }
    />
  );
}
