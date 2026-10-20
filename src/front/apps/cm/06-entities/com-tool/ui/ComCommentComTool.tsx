import { translateBase } from '#basis/locale';
import { useCmComCurrent } from '$cm/entities/com';
import { cmComCommentRedactOrdSelectorIdAtom } from '$cm/entities/com-comment';
import { updateCmComCommentConstructorRulePropsDict } from '$cm/shared/lib/updateComCommentConstructorRulePropsDict';
import { CmComCommentBlockSpecialSelector, MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmComTool } from '../ComTool';

export const CmComToolComComment = () => {
  const ccom = useCmComCurrent();

  return (
    <CmComTool
      title={translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.ComComment])}
      icon="TextAlignLeft"
      onClick={async () => {
        if (ccom == null) return;
        await updateCmComCommentConstructorRulePropsDict(ccom.wid, CmComCommentBlockSpecialSelector.Head);
        cmComCommentRedactOrdSelectorIdAtom.set(CmComCommentBlockSpecialSelector.Head);
      }}
    />
  );
};
