import { useAtomSet } from 'atomaric';
import { comCommentRedactOrdwAtom } from '../../complect/comment-parser/complect';
import { ComTool } from '../ComTool';

export const ComCommentComTool = () => {
  const setIsRedact = useAtomSet(comCommentRedactOrdwAtom);

  return (
    <ComTool
      title="Мои заметки"
      icon="TextAlignLeft"
      onClick={() => setIsRedact('head')}
    />
  );
};
