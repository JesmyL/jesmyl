import { cmComCommentRedactOrdSelectorIdAtom } from '$cm/entities/com-comment';
import { CmComTool } from '../ComTool';

export const CmComToolComComment = () => {
  return (
    <CmComTool
      title="Мои заметки"
      icon="TextAlignLeft"
      onClick={() => cmComCommentRedactOrdSelectorIdAtom.set('head')}
    />
  );
};
