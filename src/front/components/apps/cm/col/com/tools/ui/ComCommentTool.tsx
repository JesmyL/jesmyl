import { useAtomSet } from '#shared/lib/atoms';
import { isComCommentRedactAtom } from '../../complect/comment-parser/complect';
import { ComTool } from '../ComTool';

export const ComCommentTool = () => {
  const setIsRedact = useAtomSet(isComCommentRedactAtom);

  return (
    <ComTool
      title="Мои заметки"
      icon="TextAlignLeft"
      onClick={() => setIsRedact(true)}
    />
  );
};
