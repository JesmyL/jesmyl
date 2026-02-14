import { Button } from '#shared/components';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import {
  cmComCommentTextRulesDetector,
  useCmComCommentBlock,
  useCmComCommentTextBlockTaker,
} from '$cm/entities/com-comment';
import { CmCom } from '$cm/ext';
import {
  CmLineCommentConstructorButtonPropKey,
  CmLineCommentConstructorButtonPropsDictWordRulePropsKey,
  CmLineCommentConstructorButtonRulePropsDict,
} from '$cm/shared/model/com-comment';
import { CmComOrderSelector } from 'shared/api';
import { cmLineCommentConstructorButtonRulePropsDictAtom } from '../state/atoms';
import { CmLineCommentConstructorButtonTextRulesConstructor } from './Constructor';

export const CmLineCommentConstructorButton = ({
  ordSelector,
  com,
}: {
  ordSelector: CmComOrderSelector;
  com: CmCom;
}) => {
  const { localCommentBlock, commentBlock } = useCmComCommentBlock(com.wid);
  const commentTexts = useCmComCommentTextBlockTaker(com.wid, localCommentBlock, commentBlock)(ordSelector);

  return (
    <>
      <Button
        icon="Edit01"
        onClick={() => {
          const propsDict: CmLineCommentConstructorButtonRulePropsDict = {};
          const wordChordiMaxDict: PRecord<CmLineCommentConstructorButtonPropsDictWordRulePropsKey, number> = {};

          if (commentTexts)
            cmComCommentTextRulesDetector(commentTexts, props => {
              let key: CmLineCommentConstructorButtonPropKey;

              if ('blocki' in props) key = `[${props.blocki}]`;
              else if ('chordi' in props) {
                const wordKey = `${props.linei}:${props.wordi}` as const;

                wordChordiMaxDict[wordKey] ??= 0;
                wordChordiMaxDict[wordKey]++;

                key = `${wordKey}/${props.chordi}${props.place}`;
              } else if ('wordi' in props) key = `${props.linei}:${props.wordi}${props.place}`;
              else key = `${props.linei}`;

              if (!(key in propsDict)) propsDict[key] = props as never;
            });

          cmLineCommentConstructorButtonRulePropsDictAtom.set({ dict: propsDict, wordChordiMaxDict });
        }}
      />

      <FullContent
        openAtom={cmLineCommentConstructorButtonRulePropsDictAtom}
        checkIsOpen={it => it.dict != null}
      >
        <CmLineCommentConstructorButtonTextRulesConstructor
          com={com}
          ordSelector={ordSelector}
        />
      </FullContent>
    </>
  );
};
