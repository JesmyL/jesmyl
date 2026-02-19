import { Button } from '#shared/components';
import { mylib } from '#shared/lib/my-lib';
import { Modal } from '#shared/ui/modal';
import { WithAtom } from '#shared/ui/WithAtom';
import { cmComCommentCurrentOpenedAltKeyAtom, useCmComCommentBlockCss } from '$cm/entities/com-comment';
import { CmComCommentAlternativeSelector } from '$cm/entities/ComCommentAlternativeSelector';
import { CmComCommentSavedLocalMarker } from '$cm/entities/ComCommentSavedLocalMarker';
import { CmComCommentTools } from '$cm/entities/ComCommentTools';
import { CmCom } from '$cm/ext';
import { CmComCommentModalInner } from '$cm/features/com-comment';
import { updateCmComCommentConstructorRulePropsDict } from '$cm/shared/lib/updateComCommentConstructorRulePropsDict';
import { cmIsShowMyCommentsAtom } from '$cm/shared/state';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { useEffect, useMemo } from 'react';
import { CmComCommentBlockSimpleSelector, CmComCommentBlockSpecialSelector } from 'shared/api';
import { itNUnd, retNull } from 'shared/utils';
import { CmComCommentConstructorBlockView } from './BlockView';
import { CmComCommentConstructorTextWithAccentRedactor } from './TextWithAccentRedactor';

export const CmComCommentConstructorTextRulesConstructor = ({
  com,
  selector,
}: {
  com: CmCom;
  selector: CmComCommentBlockSimpleSelector;
}) => {
  const propsDict = useAtomValue(cmComCommentConstructorRulePropsDictAtom);
  const isShowComments = useAtomValue(cmIsShowMyCommentsAtom);

  const { commentCssNode } = useCmComCommentBlockCss(
    com,
    false,
    useMemo(
      () => ({
        selector,
        propsList: mylib.values(propsDict.dict!).filter(itNUnd),
      }),
      [selector, propsDict.dict],
    ),
  );

  useEffect(() => {
    return cmComCommentCurrentOpenedAltKeyAtom.subscribe(() => {
      updateCmComCommentConstructorRulePropsDict(com.wid, selector);
    });
  }, [com.wid, selector]);

  return (
    <>
      <div className="flex gap-3">
        <CmComCommentAlternativeSelector comw={com.wid} />

        <WithAtom init={false}>
          {openAtom => (
            <>
              <Modal
                key="com-comment"
                openAtom={openAtom}
              >
                <CmComCommentModalInner com={com} />
              </Modal>
              <Button
                icon="TextFirstlineRight"
                onClick={openAtom.do.toggle}
              />
            </>
          )}
        </WithAtom>
        <CmComCommentTools com={com} />
      </div>

      <CmComCommentSavedLocalMarker
        comw={com.wid}
        selector={selector}
      />
      {!isShowComments ? (
        <div className="w-full h-full flex justify-center text-xKO">Комментарии скрыты</div>
      ) : (
        <>
          {commentCssNode}

          {Array.from(
            {
              length: Math.min(
                3,
                +!!propsDict.dict?.b0?.text + +!!propsDict.dict?.b1?.text + +!!propsDict.dict?.b2?.text + 1,
              ),
            },
            retNull,
          ).map((_, blocki) => {
            return (
              <CmComCommentConstructorTextWithAccentRedactor
                key={blocki}
                blockKey={`b${blocki}`}
                label={`Коммент №${blocki + 1}`}
                blockPropsHolder={propsDict}
                multiline
                getDefaultPropsDict={() => ({
                  blocki,
                  kind: 0,
                  rate: blocki,
                  text: '',
                })}
              />
            );
          })}

          {selector !== CmComCommentBlockSpecialSelector.Head && (
            <CmComCommentConstructorBlockView
              com={com}
              selector={selector}
            />
          )}
        </>
      )}
    </>
  );
};
