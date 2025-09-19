import { cmComCommentRedactOrdSelectorIdAtom } from '$cm/basis/lib/store/atoms';
import { ComTool } from '../ComTool';

export const ComCommentComTool = () => {
  return (
    <ComTool
      title="Мои заметки"
      icon="TextAlignLeft"
      onClick={() => cmComCommentRedactOrdSelectorIdAtom.set('head')}
    />
  );
};
