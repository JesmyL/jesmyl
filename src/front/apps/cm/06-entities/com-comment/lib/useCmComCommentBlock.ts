import { cmIDB } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import {
  CmComCommentBlockSimpleSelector,
  CmComCommentBlockSpecialSelector,
  CmComWid,
  ICmComCommentBlock,
} from 'shared/api';
import { cmComCommentCurrentOpenedAltKeyAtom } from '../state/atoms';

export const useCmComCommentBlock = (comw: CmComWid) => {
  const localCommentBlock = useLiveQuery(() => cmIDB.tb.localComCommentBlocks.get(comw), [comw]);
  const commentBlock = useLiveQuery(() => cmIDB.tb.comCommentBlocks.get(comw), [comw]);

  return { localCommentBlock, commentBlock };
};

export const useCmComCommentTextBlockTaker = (
  comw: CmComWid,
  localCommentBlock: ICmComCommentBlock | nil,
  commentBlock: ICmComCommentBlock | nil,
) => {
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[comw] ?? altCommentKeys.last;

  return useCallback(
    (selector: CmComCommentBlockSimpleSelector) => {
      return altCommentKey != null
        ? (localCommentBlock?.alt?.[altCommentKey]?.[selector] ?? commentBlock?.alt?.[altCommentKey]?.[selector])
        : (localCommentBlock?.d?.[selector] ?? commentBlock?.d?.[selector]);
    },
    [altCommentKey, commentBlock?.alt, commentBlock?.d, localCommentBlock?.alt, localCommentBlock?.d],
  );
};

export const useCmComCommentKindBlockTaker = (
  comw: CmComWid,
  localCommentBlock: ICmComCommentBlock | nil,
  commentBlock: ICmComCommentBlock | nil,
) => {
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[comw] ?? altCommentKeys.last;

  return altCommentKey != null
    ? (localCommentBlock?.alt?.[altCommentKey]?.[CmComCommentBlockSpecialSelector.Kinds] ??
        commentBlock?.alt?.[altCommentKey]?.[CmComCommentBlockSpecialSelector.Kinds])
    : (localCommentBlock?.d?.[CmComCommentBlockSpecialSelector.Kinds] ??
        commentBlock?.d?.[CmComCommentBlockSpecialSelector.Kinds]);
};
