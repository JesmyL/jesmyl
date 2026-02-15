import { useCmComCurrent } from '$cm/entities/com';
import { cmComCommentRedactOrdSelectorIdAtom } from '$cm/entities/com-comment';
import { updateCmComCommentConstructorRulePropsDict } from '$cm/shared/lib/updateComCommentConstructorRulePropsDict';
import { CmComCommentBlockSpecialSelector } from 'shared/api';
import { CmComTool } from '../ComTool';

export const CmComToolComComment = () => {
  const ccom = useCmComCurrent();

  return (
    <CmComTool
      title="Мои заметки"
      icon="TextAlignLeft"
      onClick={async () => {
        if (ccom == null) return;
        await updateCmComCommentConstructorRulePropsDict(ccom.wid, CmComCommentBlockSpecialSelector.Head);
        cmComCommentRedactOrdSelectorIdAtom.set(CmComCommentBlockSpecialSelector.Head);
      }}
    />
  );
};
