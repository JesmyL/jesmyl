import { useAtomSet } from '#shared/lib/atom';
import { isComCommentRedactAtom } from '../../complect/comment-parser/complect';
import { ComTool } from '../ComTool';

export const ComCommentComTool = () => {
  const setIsRedact = useAtomSet(isComCommentRedactAtom);

  return (
    <ComTool
      title="Мои заметки"
      icon="TextAlignLeft"
      onClick={() => setIsRedact(true)}
    />
  );
};
