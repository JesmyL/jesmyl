import { translateEditorBase } from '#basis/locale';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { cmEditorIDB } from '$cm+editor/shared/state/cmEditorIDB';
import { sharedEeWordsAtom } from '$cm+editor/shared/state/eeWords';
import { PageCmEditorContainer } from '$cm+editor/shared/ui/PageCmEditorContainer';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { objectKeys } from 'shared/utils/object.utils';
import { useEeWordsTotal } from '$cm+editor/shared/lib/useEeWordsSlice';
import { CmEditorEERulesPageContent } from './EERulesPageContent';
import { CmEditorEERulesPageHead } from './EERulesPageHead';
import {
  cmEditorEERulesCurrentPageAtom,
  cmEditorEERulesEditedWordsAtom,
  cmEditorEERulesInitAtoms,
  cmEditorEERulesIsCheckBibleAtom,
  cmEditorEERulesPageSizeAtom,
} from './EERulesPageState';

export const CmEditorEERulesPage = () => {
  cmEditorEERulesInitAtoms();

  const pageSize = useAtomValue(cmEditorEERulesPageSizeAtom);
  const currentPage = useAtomValue(cmEditorEERulesCurrentPageAtom);
  const isCheckBible = useAtomValue(cmEditorEERulesIsCheckBibleAtom);
  const sharedWords = useAtomValue(sharedEeWordsAtom);
  const total = useEeWordsTotal();

  const [updates, setUpdates] = useState(0);
  const [isShowListComputer, setIsShowListComputer] = useState(false);

  const editedWordsRef = useActualRef(useAtomValue(cmEditorEERulesEditedWordsAtom));
  const ignoredWordsSetRef = useActualRef(cmEditorIDB.useValue.ignoredEESet());

  useEffect(() => setIsShowListComputer(false), [updates]);

  const editedWords = objectKeys(editedWordsRef.current);

  return (
    <PageCmEditorContainer
      className="e-e-rules-editor"
      headTitle={translateEditorBase(EditorLocaleKey.CmEditorYoYeRules)}
      head={
        <CmEditorEERulesPageHead
          editedWords={editedWords}
          editedWordsRef={editedWordsRef}
          onSuccess={() => cmEditorEERulesEditedWordsAtom.set({})}
        />
      }
      content={
        <CmEditorEERulesPageContent
          isShowListComputer={isShowListComputer}
          setIsShowListComputer={setIsShowListComputer}
          isCheckBible={isCheckBible}
          pageSize={pageSize}
          currentPage={currentPage}
          total={total}
          editedWordsRef={editedWordsRef}
          ignoredWordsSetRef={ignoredWordsSetRef}
          sharedWords={sharedWords}
          setUpdates={setUpdates}
        />
      }
    />
  );
};
