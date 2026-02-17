import { cmComCommentCurrentOpenedAltKeyAtom, cmComCommentUpdater } from '$cm/entities/com-comment';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComCommentBlockSpecialSelector, CmComWid } from 'shared/api';
import { makeCmComCommentConstructorCommentTextFromRuleProps } from './makeCommentTextFromRuleProps';

export const useCmComCommentConstructorListenChanges = (comw: CmComWid | nil) => {
  comw ??= CmComWid.def;

  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[comw] ?? altCommentKeys.last;
  const propsDict = useAtomValue(cmComCommentConstructorRulePropsDictAtom);

  useEffect(() => {
    if (propsDict.comw === CmComWid.def) return;

    const dict = propsDict.dict;
    const selector = propsDict.selector;
    if (dict == null || selector == null) return;

    const timeout = setTimeout(() => {
      cmComCommentUpdater(
        propsDict.comw,
        () =>
          makeCmComCommentConstructorCommentTextFromRuleProps(
            selector === CmComCommentBlockSpecialSelector.Head,
            dict,
            propsDict.wordChordiMaxDict,
          ),
        selector,
        altCommentKey,
      );
    }, 1000);

    return () => clearTimeout(timeout);
  }, [altCommentKey, propsDict.comw, propsDict.dict, propsDict.selector, propsDict.wordChordiMaxDict]);
};
