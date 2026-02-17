import { Button } from '#shared/components';
import { getParentNodeWithAttributeName } from '#shared/lib/getParentNodeWithClassName';
import { mylib } from '#shared/lib/my-lib';
import { cmComCommentCurrentOpenedAltKeyAtom, useCmComCommentBlockCss } from '$cm/entities/com-comment';
import { CmComCommentAlternativeSelector } from '$cm/entities/ComCommentAlternativeSelector';
import { CmComCommentSavedLocalMarker } from '$cm/entities/ComCommentSavedLocalMarker';
import { CmComCommentTools } from '$cm/entities/ComCommentTools';
import { cmComChordHardLevelAtom, cmComFontSizeAtom } from '$cm/entities/index';
import { ChordVisibleVariant, CmCom, CmComOrderList } from '$cm/ext';
import { updateCmComCommentConstructorRulePropsDict } from '$cm/shared/lib/updateComCommentConstructorRulePropsDict';
import { cmIsShowMyCommentsAtom } from '$cm/shared/state';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { Atom, useAtomValue } from 'atomaric';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CmComCommentBlockSimpleSelector } from 'shared/api';
import { itNUnd, retNull } from 'shared/utils';
import styled, { css } from 'styled-components';
import { CmComCommentConstructorLineConstructor } from './LineConstructor';
import { CmComCommentConstructorTextWithAccentRedactor } from './TextWithAccentRedactor';
import { CmComCommentConstructorWordConstructor } from './WordConstructor';

type Selection = Partial<{ linei: number; wordi: number }>;

export const CmComCommentConstructorTextRulesConstructor = ({
  com,
  ordSelector: selector,
  isRedactAsTextAtom,
}: {
  com: CmCom;
  ordSelector: CmComCommentBlockSimpleSelector;
  isRedactAsTextAtom: Atom<boolean>;
}) => {
  const fontSize = useAtomValue(cmComFontSizeAtom);
  const chordHardLevel = useAtomValue(cmComChordHardLevelAtom);
  const propsDict = useAtomValue(cmComCommentConstructorRulePropsDictAtom);
  const solidOrdContainerRef = useRef<HTMLDivElement>(null);
  const isShowComments = useAtomValue(cmIsShowMyCommentsAtom);

  const [selection, setSelection] = useState<Selection>({});
  const { linei, wordi } = selection;

  const { commentCssStr } = useCmComCommentBlockCss(
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
        <Button
          icon="TextFirstlineRight"
          onClick={isRedactAsTextAtom.do.toggle}
        />
        <CmComCommentTools com={com} />
      </div>

      <CmComCommentSavedLocalMarker
        comw={com.wid}
        ordSelectorId={selector}
      />
      {!isShowComments ? (
        <div className="w-full h-full flex justify-center text-xKO">Комментарии скрыты</div>
      ) : (
        <>
          <style>{commentCssStr}</style>

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

          <StyledSolidOrdContainer
            ref={solidOrdContainerRef}
            $sel={selection}
            className="com-orders-with-comments"
            $ordSelector={selector}
            onClick={event => {
              const linei = getParentNodeWithAttributeName(event, 'solid-order-text-linei').attr;

              if (linei == null) return;

              const wordi = getParentNodeWithAttributeName(event, 'whole-wordi').attr;

              setSelection(prev => {
                const newPrev = { ...prev };

                if (prev.linei != null) {
                  if (wordi == null) return prev;

                  if (newPrev.wordi === +wordi || newPrev.linei !== +linei) delete newPrev.wordi;
                  else newPrev.wordi = +wordi;

                  newPrev.linei = +linei;
                } else newPrev.linei = +linei;

                return newPrev;
              });
            }}
          >
            <CmComOrderList
              chordHardLevel={chordHardLevel}
              chordVisibleVariant={ChordVisibleVariant.Maximal}
              com={com}
              isMiniAnchor={false}
              fontSize={fontSize}
            />
          </StyledSolidOrdContainer>

          {linei != null && (
            <>
              <CmComCommentConstructorLineConstructor linei={linei} />

              {wordi != null && (
                <CmComCommentConstructorWordConstructor
                  linei={linei}
                  wordi={wordi}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

const StyledSolidOrdContainer = styled.div<{
  $sel: Selection;
  $ordSelector: CmComCommentBlockSimpleSelector;
}>`
  ${props => [
    css`
      [solid-com-order-selector]:not([solid-com-order-selector='${props.$ordSelector}']) {
        display: none;
        visibility: hidden;
      }
    `,
    props.$sel.linei != null && [
      css`
        [solid-order-text-linei='${props.$sel.linei}'] {
          &,
          * {
            text-decoration: underline;
          }

          ${props.$sel.wordi != null &&
          css`
            [whole-wordi='${props.$sel.wordi}'] {
              &,
              * {
                text-decoration-style: wavy;
                text-decoration-color: var(--color-x7);
              }
            }
          `}
        }
      `,
    ],
  ]}
`;
