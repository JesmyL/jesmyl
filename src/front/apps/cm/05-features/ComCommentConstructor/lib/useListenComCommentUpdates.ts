import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { cmComCommentCurrentOpenedAltKeyAtom, useCmComCommentUpdater } from '$cm/entities/com-comment';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComWid } from 'shared/api';
import { makeCmComCommentConstructorCommentTextFromRuleProps } from './makeCommentTextFromRuleProps';

export const useCmComCommentConstructorListenChanges = (comw: CmComWid | nil) => {
  comw ??= CmComWid.def;

  const updateCommentRef = useActualRef(useCmComCommentUpdater(comw));
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[comw] ?? altCommentKeys.last;
  const propsDict = useAtomValue(cmComCommentConstructorRulePropsDictAtom);

  useEffect(() => {
    const dict = propsDict.dict;
    const selector = propsDict.selector;
    if (dict == null || selector == null) return;

    const timeout = setTimeout(async () => {
      updateCommentRef.current(
        () => makeCmComCommentConstructorCommentTextFromRuleProps(dict, propsDict.wordChordiMaxDict),
        selector,
        altCommentKey,
      );
    }, 1000);

    return () => clearTimeout(timeout);
  }, [altCommentKey, propsDict.dict, propsDict.selector, propsDict.wordChordiMaxDict, updateCommentRef]);
};
