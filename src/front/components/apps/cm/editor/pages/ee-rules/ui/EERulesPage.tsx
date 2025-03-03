import { atom, useAtom, useAtomSet, useAtomValue } from '#shared/lib/atoms';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem } from '#shared/ui/dropdown/Dropdown.model';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { IconButton } from '#shared/ui/the-icon/IconButton';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheButton } from '#shared/ui/TheButton';
import { cmIDB } from '@cm/_db/cm-idb';
import { useEffect, useState } from 'react';
import { EeStorePack } from 'shared/api';
import { cmEditorClientInvocatorMethods } from '../../../lib/cm-editor-invocator.methods';
import { PageCmEditorContainer } from '../../../ui/PhaseCmEditorContainer';
import { EERulesListComputer } from './EERulesListComputer';
import { EERulesWord } from './EERulesWord';
import { EERulesWordSearchModalInner } from './EERulesWordSearchModalInner';

const sizes = [10, 30, 50, 100];

const listBox = { list: [] } as { list: string[] };

const eeWordsAtom = atom<EeStorePack>({});
const pageSizeAtom = atom(50);
const currentPageAtom = atom(0);
const isCheckBibleAtom = atom(false);

export const EERulesPage = () => {
  const [pageSize, setPageSize] = useAtom(pageSizeAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [isCheckBible, setIsCheckBible] = useAtom(isCheckBibleAtom);
  const setEditedWords = useAtomSet(eeWordsAtom);
  const setIgnoredWordsSet = cmIDB.useSet.ignoredEESet();
  const eeStoreRef = useActualRef(cmIDB.useValue.eeStore());
  const [isOpenSearchWord, setIsOpenSearchWord] = useState(false);

  const [updates, setUpdates] = useState(0);
  const [isShowListComputer, setIsShowListComputer] = useState(false);

  const editedWordsRef = useActualRef(useAtomValue(eeWordsAtom));
  const ignoredWordsSetRef = useActualRef(cmIDB.useValue.ignoredEESet());

  useEffect(() => setIsShowListComputer(false), [updates]);

  const words = mylib.keys(editedWordsRef.current);

  return (
    <PageCmEditorContainer
      className="e-e-rules-editor"
      headTitle="Ё-Е правила"
      head={
        <TheIconSendButton
          icon="Sent"
          disabled={!words.length}
          className="margin-gap"
          confirm={
            `Отправить ${words.length} ${mylib.declension(words.length, 'слово', 'слова', 'слов')}: ` +
            `${words.join(', ')}`
          }
          onSend={() => cmEditorClientInvocatorMethods.setEEWords(null, editedWordsRef.current)}
          onSuccess={() => setEditedWords({})}
        />
      }
      content={
        <>
          <div className="flex flex-gap">
            <TheButton
              className="margin-gap"
              onClick={() => setIsShowListComputer(true)}
            >
              Проверить наличие неизвестных слов
            </TheButton>
            <IconButton
              icon="SearchVisual"
              onClick={() => setIsOpenSearchWord(true)}
            />
          </div>
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
              eeStoreRef={eeStoreRef}
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
                      color: words.some(word => eeStoreRef.current[word] == null) ? 'ko' : null,
                    };
                  })}
              />
              слов: {listBox.list.length}
              {listBox.list.slice(currentPage * pageSize, currentPage * pageSize + pageSize).map(word => {
                return (
                  <EERulesWord
                    key={word}
                    word={word}
                    setEditedWords={setEditedWords}
                    ignoredWordsSetRef={ignoredWordsSetRef}
                    eeStoreRef={eeStoreRef}
                    editedWordsRef={editedWordsRef as never}
                    setIgnoredWordsSet={setIgnoredWordsSet}
                  />
                );
              })}
            </>
          )}

          {isOpenSearchWord && (
            <Modal onClose={setIsOpenSearchWord}>
              <EERulesWordSearchModalInner
                setEditedWords={setEditedWords}
                eeStoreRef={eeStoreRef}
                ignoredWordsSetRef={ignoredWordsSetRef}
                editedWordsRef={editedWordsRef as never}
                setIgnoredWordsSet={setIgnoredWordsSet}
              />
            </Modal>
          )}
        </>
      }
    />
  );
};
