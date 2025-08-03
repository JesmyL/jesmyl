import { useAtomSet } from 'atomaric';
import { comCommentRedactOrdSelectorIdAtom } from '../../complect/comment-parser/complect';
import { ComTool } from '../ComTool';

export const ComCommentComTool = () => {
  const setIsRedact = useAtomSet(comCommentRedactOrdSelectorIdAtom);

  return (
    <ComTool
      title="Мои заметки"
      icon="TextAlignLeft"
      onClick={() => setIsRedact('head')}
    />
  );
};
