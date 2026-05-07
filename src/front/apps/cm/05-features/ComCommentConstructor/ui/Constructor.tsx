import { Button } from '#shared/components';
import { mylib } from '#shared/lib/my-lib';
import { cmComCommentCurrentComw2OpenAltiDictAtom, useCmComCommentBlockCss } from '$cm/entities/com-comment';
import { CmComCommentAlternativeSelector } from '$cm/entities/ComCommentAlternativeSelector';
import { CmComCommentSavedLocalMarker } from '$cm/entities/ComCommentSavedLocalMarker';
import { CmComCommentTools } from '$cm/entities/ComCommentTools';
import { CmCom } from '$cm/ext';
import { updateCmComCommentConstructorRulePropsDict } from '$cm/shared/lib/updateComCommentConstructorRulePropsDict';
import { cmIsShowMyCommentsAtom } from '$cm/shared/state';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { useEffect, useMemo, useState } from 'react';
import { CmComCommentBlockSimpleSelector, CmComCommentBlockSpecialSelector } from 'shared/api';
import { CmComCommentConstructorRuleType } from 'shared/model/cm/com-comment';
import { itNIt, itNUnd, retNull } from 'shared/utils';
import { CmComCommentConstructorCurrentInnerKindContext } from '../state/CurrentInnerKind';
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
  const simpleSelectorPrefix = `s${selector}` as const;
  const [isRedactKinds, setIsRedactKinds] = useState(false);

  const { commentCssNode } = useCmComCommentBlockCss(
    com,
    false,
    useMemo(() => mylib.values(propsDict.dict).filter(itNUnd), [propsDict.dict]),
  );

  useEffect(
    () =>
      cmComCommentCurrentComw2OpenAltiDictAtom.subscribe(() => {
        updateCmComCommentConstructorRulePropsDict(com.wid, selector);
      }),
    [com.wid, selector],
  );

  let ordBlocksNode = null;
  let blocksRedactorNode = null;
  const isHead = selector === CmComCommentBlockSpecialSelector.Head;

  if (!isHead) {
    const { ord } = com.getOrderBySelector(selector);
    const ordKind = ord?.me.kind;
    const selectorPrefix = ordKind?.key && isRedactKinds ? (`k${ordKind.key}` as const) : null;
    const variativeSelectorPrefix = selectorPrefix ?? simpleSelectorPrefix;

    if (isRedactKinds)
      blocksRedactorNode = (
        <>
          {!ordKind || (
            <CmComCommentConstructorTextWithAccentRedactor
              blockKey={`${variativeSelectorPrefix}b0`}
              label={<span className="text-x7">Для каждого блока "{ordKind.top.title[0]}"</span>}
              blockPropsHolder={propsDict}
              multiline
              type={CmComCommentConstructorRuleType.Block}
              getDefaultPropsDict={() => ({
                pre: variativeSelectorPrefix,
                sel: selector,
                blocki: 0,
                type: 0,
                rate: 0,
                text: '',
              })}
            />
          )}
        </>
      );

    ordBlocksNode = (
      <>
        <CmComCommentConstructorCurrentInnerKindContext value={selectorPrefix}>
          <CmComCommentConstructorBlockView
            com={com}
            ordw={selector}
          />
        </CmComCommentConstructorCurrentInnerKindContext>
      </>
    );
  }

  return (
    <>
      <div className="flex gap-3">
        <CmComCommentAlternativeSelector comw={com.wid} />

        {isHead || (
          <Button
            icon="TextFirstlineRight"
            onClick={() => setIsRedactKinds(itNIt)}
            className={isRedactKinds ? 'text-x7' : undefined}
          />
        )}
        <CmComCommentTools />
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

          {blocksRedactorNode ??
            Array.from(
              {
                length: Math.min(
                  3,
                  +!!propsDict.dict?.[`${simpleSelectorPrefix}b0`]?.text +
                    +!!propsDict.dict?.[`${simpleSelectorPrefix}b1`]?.text +
                    +!!propsDict.dict?.[`${simpleSelectorPrefix}b2`]?.text +
                    1,
                ),
              },
              retNull,
            ).map((_, blocki) => {
              return (
                <CmComCommentConstructorTextWithAccentRedactor
                  key={blocki}
                  blockKey={`${simpleSelectorPrefix}b${blocki}`}
                  label={`Коммент №${blocki + 1}`}
                  blockPropsHolder={propsDict}
                  multiline
                  type={
                    selector === CmComCommentBlockSpecialSelector.Head
                      ? CmComCommentConstructorRuleType.Head
                      : CmComCommentConstructorRuleType.Block
                  }
                  getDefaultPropsDict={() => ({
                    pre: simpleSelectorPrefix,
                    sel: selector,
                    blocki,
                    type: 0,
                    rate: blocki,
                    text: '',
                  })}
                />
              );
            })}

          {ordBlocksNode}
        </>
      )}
    </>
  );
};
