import { translateEditorBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { Modal } from '#shared/ui/modal';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmEditorEERulesWordSearchModalInner } from '$cm+editor/features/e-e-rules';
import { EeStorePack } from 'shared/api';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { CmEditorEERulesListComputer } from './EERulesListComputer';
import { CmEditorEERulesPageList } from './EERulesPageList';
import {
  cmEditorEERulesCurrentPageAtom,
  cmEditorEERulesListBox,
  cmEditorEERulesEditedWordsAtom,
  cmEditorEERulesIsCheckBibleAtom,
  cmEditorEERulesIsOpenSearchWordAtom,
  cmEditorEERulesPageSizeAtom,
} from './EERulesPageState';

type Props = {
  isShowListComputer: boolean;
  setIsShowListComputer: (is: boolean) => void;
  isCheckBible: boolean;
  pageSize: number;
  currentPage: number;
  total: number;
  editedWordsRef: { current: EeStorePack };
  ignoredWordsSetRef: { current: Set<string> };
  sharedWords: EeStorePack;
  setUpdates: React.Dispatch<React.SetStateAction<number>>;
};

export const CmEditorEERulesPageContent = ({
  isShowListComputer,
  setIsShowListComputer,
  isCheckBible,
  pageSize,
  currentPage,
  total,
  editedWordsRef,
  ignoredWordsSetRef,
  sharedWords,
  setUpdates,
}: Props) => (
  <>
    <div className="flex gap-2">
      <Button
        className="m-2"
        onClick={() => setIsShowListComputer(true)}
      >
        {translateEditorBase(EditorLocaleKey.CmEditorCheck)}
      </Button>
      <TheIconButton
        icon="SearchVisual"
        onClick={cmEditorEERulesIsOpenSearchWordAtom.do.toggle}
      />
    </div>
    <IconCheckbox
      postfix={translateEditorBase(EditorLocaleKey.CmEditorIncludeBibleWords)}
      checked={isCheckBible}
      onChange={cmEditorEERulesIsCheckBibleAtom.set}
    />
    {isShowListComputer ? (
      <CmEditorEERulesListComputer
        isCheckBible={isCheckBible}
        setUpdates={setUpdates}
        listBox={cmEditorEERulesListBox}
      />
    ) : (
      !cmEditorEERulesListBox.list.length || (
        <CmEditorEERulesPageList
          list={cmEditorEERulesListBox.list}
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          setPage={cmEditorEERulesCurrentPageAtom.set}
          setPageSize={cmEditorEERulesPageSizeAtom.set}
          editedWordsRef={editedWordsRef}
          setEditedWords={cmEditorEERulesEditedWordsAtom.set}
          ignoredWordsSetRef={ignoredWordsSetRef}
          sharedWords={sharedWords}
        />
      )
    )}

    <Modal openAtom={cmEditorEERulesIsOpenSearchWordAtom}>
      <CmEditorEERulesWordSearchModalInner
        setEditedWords={cmEditorEERulesEditedWordsAtom.set}
        ignoredWordsSetRef={ignoredWordsSetRef}
        editedWordsRef={editedWordsRef}
      />
    </Modal>
  </>
);
