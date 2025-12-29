import { cmComCommentRedactOrdSelectorIdAtom } from '$cm/entities/com-comment';
import { CmComCommentBlockSpecialSelector } from 'shared/api';
import { CmComTool } from '../ComTool';

export const CmComToolComComment = () => {
  return (
    <CmComTool
      title="Мои заметки"
      icon="TextAlignLeft"
      onClick={() => cmComCommentRedactOrdSelectorIdAtom.set(CmComCommentBlockSpecialSelector.Head)}
    />
  );
};
