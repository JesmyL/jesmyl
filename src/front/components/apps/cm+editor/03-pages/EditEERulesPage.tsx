import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem } from '#shared/ui/dropdown/Dropdown.model';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { TheButton } from '#shared/ui/TheButton';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { cmEditorIDB } from '$cm+editor/basis/lib/cmEditorIDB';
import { PageCmEditorContainer } from '$cm+editor/basis/ui/PageCmEditorContainer';
import { EERulesListComputer } from '$cm+editor/entities/EERulesListComputer';
import { EERulesWord } from '$cm+editor/entities/EERulesWord';
import { EERulesWordSearchModalInner } from '$cm+editor/widgets/EERulesWordSearchModalInner';
import { atom, useAtom, useAtomSet, useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { EeStorePack } from 'shared/api';

const sizes = [10, 30, 50, 100];

const listBox = { list: [] } as { list: string[] };

const eeEditedWordsAtom = atom<EeStorePack>({});
const pageSizeAtom = atom(50);
const currentPageAtom = atom(0);
const isCheckBibleAtom = atom(false);
const isOpenSearchWordAtom = atom(false);

export const EditEERulesPage = () => {
  const [pageSize, setPageSize] = useAtom(pageSizeAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [isCheckBible, setIsCheckBible] = useAtom(isCheckBibleAtom);
  const setEditedWords = useAtomSet(eeEditedWordsAtom);
  const setIgnoredWordsSet = cmEditorIDB.useSet.ignoredEESet();
  const eeStoreRef = useActualRef(cmEditorIDB.useValue.eeStore());
  // const [isOpenSearchWord, setIsOpenSearchWord] = useState(false);

  const [updates, setUpdates] = useState(0);
  const [isShowListComputer, setIsShowListComputer] = useState(false);

  const editedWordsRef = useActualRef(useAtomValue(eeEditedWordsAtom));
  const ignoredWordsSetRef = useActualRef(cmEditorIDB.useValue.ignoredEESet());

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
          onSend={() => cmEditorClientTsjrpcMethods.setEEWords({ words: editedWordsRef.current })}
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
            <TheIconButton
              icon="SearchVisual"
              onClick={isOpenSearchWordAtom.toggle}
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

          <Modal openAtom={isOpenSearchWordAtom}>
            <EERulesWordSearchModalInner
              setEditedWords={setEditedWords}
              eeStoreRef={eeStoreRef}
              ignoredWordsSetRef={ignoredWordsSetRef}
              editedWordsRef={editedWordsRef as never}
              setIgnoredWordsSet={setIgnoredWordsSet}
            />
          </Modal>
        </>
      }
    />
  );
};
