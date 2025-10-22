import { Badge } from '#shared/components/ui/badge';
import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem } from '#shared/ui/dropdown/Dropdown.model';
import { Modal } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmEditorEERulesWord, CmEditorEERulesWordSearchModalInner } from '$cm+editor/features/e-e-rules';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmEditorIDB } from '$cm+editor/shared/state/cmEditorIDB';
import { PageCmEditorContainer } from '$cm+editor/shared/ui/PageCmEditorContainer';
import { atom, useAtom, useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { EeStorePack } from 'shared/api';
import { CmEditorEERulesListComputer } from './EERulesListComputer';

const sizes = [10, 30, 50, 100];

const listBox = { list: [] } as { list: string[] };

const eeEditedWordsAtom = atom<EeStorePack>({});
const pageSizeAtom = atom(50);
const currentPageAtom = atom(0);
const isCheckBibleAtom = atom(false);
const isOpenSearchWordAtom = atom(false);

export const CmEditorEERulesPage = () => {
  const [pageSize, setPageSize] = useAtom(pageSizeAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [isCheckBible, setIsCheckBible] = useAtom(isCheckBibleAtom);
  const eeStoreRef = useActualRef(cmEditorIDB.useValue.eeStore());

  const [updates, setUpdates] = useState(0);
  const [isShowListComputer, setIsShowListComputer] = useState(false);

  const editedWordsRef = useActualRef(useAtomValue(eeEditedWordsAtom));
  const ignoredWordsSetRef = useActualRef(cmEditorIDB.useValue.ignoredEESet());

  useEffect(() => setIsShowListComputer(false), [updates]);

  const editedWords = mylib.keys(editedWordsRef.current);
  const eeStoreKeys = mylib.keys(eeStoreRef.current);

  return (
    <PageCmEditorContainer
      className="e-e-rules-editor"
      headTitle="Ё-Е правила"
      head={
        <TheIconSendButton
          icon="Sent"
          disabled={!editedWords.length}
          className="m-2"
          confirm={
            `Отправить ${editedWords.length} ${mylib.declension(editedWords.length, 'слово', 'слова', 'слов')}: ` +
            `${editedWords.join(', ')}`
          }
          onSend={() => cmEditorClientTsjrpcMethods.setEEWords({ words: editedWordsRef.current })}
          onSuccess={() => eeEditedWordsAtom.set({})}
        />
      }
      content={
        <>
          <div className="flex gap-2">
            <Button
              className="m-2"
              onClick={() => setIsShowListComputer(true)}
            >
              Проверить
            </Button>
            <TheIconButton
              icon="SearchVisual"
              onClick={isOpenSearchWordAtom.do.toggle}
            />
          </div>
          <IconCheckbox
            postfix="включать библейские слова"
            checked={isCheckBible}
            onChange={setIsCheckBible}
          />
          {isShowListComputer ? (
            <CmEditorEERulesListComputer
              isCheckBible={isCheckBible}
              setUpdates={setUpdates}
              listBox={listBox}
              eeStoreRef={eeStoreRef}
            />
          ) : (
            !listBox.list.length || (
              <>
                <ButtonGroup.Root className="my-3">
                  {sizes.map(size => (
                    <Button
                      key={size}
                      disabled={pageSize === size}
                      onClick={() => setPageSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </ButtonGroup.Root>
                <Badge className="mr-2 mb-2">
                  Слов: {eeStoreKeys.length} / {listBox.list.length} (
                  {((eeStoreKeys.length / listBox.list.length) * 100).toFixed(3)}
                  %)
                </Badge>
                <Dropdown
                  onSelect={({ id }) => setCurrentPage(id)}
                  items={Array(Math.ceil(listBox.list.length / pageSize))
                    .fill(0)
                    .map((_, page): DropdownItem<number> => {
                      const words = listBox.list.slice(page * pageSize, page * pageSize + pageSize);

                      return {
                        title: (
                          <span
                            className={words.some(word => eeStoreRef.current[word] == null) ? undefined : 'text-xOK'}
                          >
                            {words[0]}
                          </span>
                        ),
                        id: page,
                        disabled: currentPage === page,
                      };
                    })}
                />
                {listBox.list.slice(currentPage * pageSize, currentPage * pageSize + pageSize).map(word => {
                  return (
                    <CmEditorEERulesWord
                      key={word}
                      word={word}
                      setEditedWords={eeEditedWordsAtom.set}
                      ignoredWordsSetRef={ignoredWordsSetRef}
                      eeStoreRef={eeStoreRef}
                      editedWordsRef={editedWordsRef}
                    />
                  );
                })}
              </>
            )
          )}

          <Modal openAtom={isOpenSearchWordAtom}>
            <CmEditorEERulesWordSearchModalInner
              setEditedWords={eeEditedWordsAtom.set}
              eeStoreRef={eeStoreRef}
              ignoredWordsSetRef={ignoredWordsSetRef}
              editedWordsRef={editedWordsRef}
            />
          </Modal>
        </>
      }
    />
  );
};
