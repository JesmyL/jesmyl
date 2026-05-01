import { MyLib } from '#shared/lib/my-lib';
import { cmComCommentUpdater } from '$cm/entities/com-comment';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComCommentBlockSimpleSelector, CmComCommentBlockSpecialSelector, CmComWid } from 'shared/api';
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
        selector === CmComCommentBlockSpecialSelector.Head,
        dict,
        propsDict.wordChordiMaxDict,
      );

      cmComCommentUpdater(
        propsDict.comw,
        propsDict.altCommentKey,
        MyLib.entries(ordSelector2TextsDict).reduce<
          PRecord<CmComCommentBlockSimpleSelector, (prevBlocks: string[]) => string[]>
        >((acc, [ordwStr, lines]) => {
          if (!lines) return acc;
          acc[ordwStr] = () => lines;
          return acc;
        }, {}),
      );
    }, 1000);

    return () => clearTimeout(timeout);
  }, [propsDict]);
};
