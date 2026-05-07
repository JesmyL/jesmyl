import { cmComCommentLocalCommentsUpdater } from '$cm/entities/com-comment';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComWid } from 'shared/api';
import { makeCmComCommentConstructorCommentOrdSelector2TextsDictFromRuleProps } from 'shared/utils/cm/com/makeCommentTextFromRuleProps';

export const useCmComCommentConstructorListenChanges = () => {
  const propsDict = useAtomValue(cmComCommentConstructorRulePropsDictAtom);

  useEffect(() => {
    if (propsDict.comw === CmComWid.def) return;

    const dict = propsDict.dict;
    const selector = propsDict.selector;
    if (dict == null || selector == null) return;

    const timeout = setTimeout(() => {
      const ordSelector2TextsDict = makeCmComCommentConstructorCommentOrdSelector2TextsDictFromRuleProps(
        dict,
        propsDict.wordChordiMaxDict,
      );

      cmComCommentLocalCommentsUpdater(propsDict.comw, propsDict.commentAlti, ordSelector2TextsDict);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [propsDict]);
};
