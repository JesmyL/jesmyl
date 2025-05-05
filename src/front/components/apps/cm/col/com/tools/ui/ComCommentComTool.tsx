import { useAtomSet } from 'atomaric';
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
