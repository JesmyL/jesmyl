import { cmConstantsConfigAtom, cmIDB } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import { CmComCommentBlockSelector, CmComWid } from 'shared/api';
import { cmComCommentCurrentOpenedAltKeyAtom } from '../state/atoms';

export const useCmComCommentBlock = (comw: CmComWid) => {
  const { maxComCommentAlternativesCount } = useAtomValue(cmConstantsConfigAtom);
  const localCommentBlock = useLiveQuery(() => cmIDB.tb.localComCommentBlocks.get(comw), [comw]);
  const commentBlock = useLiveQuery(() => cmIDB.tb.comCommentBlocks.get(comw), [comw]);
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[comw] ?? altCommentKeys.last;

  return {
    localCommentBlock,
    maxComCommentAlternativesCount,
    takeCommentTexts: useCallback(
      (selector: CmComCommentBlockSelector) => {
        return altCommentKey != null
          ? (localCommentBlock?.alt?.[altCommentKey]?.[selector] ?? commentBlock?.alt?.[altCommentKey]?.[selector])
          : (localCommentBlock?.d?.[selector] ?? commentBlock?.d?.[selector]);
      },
      [altCommentKey, commentBlock?.alt, commentBlock?.d, localCommentBlock?.alt, localCommentBlock?.d],
    ),
  };
};
