import { Button } from '#shared/components';
import { getParentNodeWithAttributeName } from '#shared/lib/getParentNodeWithClassName';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { mylib } from '#shared/lib/my-lib';
import {
  cmComCommentCurrentOpenedAltKeyAtom,
  useCmComCommentBlockCss,
  useCmComCommentUpdater,
} from '$cm/entities/com-comment';
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
import { CmComCommentBlockSimpleSelector, CmComOrderWid } from 'shared/api';
import { itNUnd, retNull } from 'shared/utils';
import styled, { css } from 'styled-components';
import { makeCmComCommentConstructorCommentTextFromRuleProps } from '../lib/makeCommentTextFromRuleProps';
import { CmComCommentConstructorLineConstructor } from './LineConstructor';
import { CmComCommentConstructorTextWithAccentRedactor } from './TextWithAccentRedactor';
import { CmComCommentConstructorWordConstructor } from './WordConstructor';

type Selection = Partial<{ linei: number; wordi: number }>;

export const CmComCommentConstructorTextRulesConstructor = ({
  com,
  ordSelector,
  isRedactAsTextAtom,
}: {
  com: CmCom;
  ordSelector: CmComOrderWid;
  isRedactAsTextAtom: Atom<boolean>;
}) => {
  const fontSize = useAtomValue(cmComFontSizeAtom);
  const chordHardLevel = useAtomValue(cmComChordHardLevelAtom);
  const propsDict = useAtomValue(cmComCommentConstructorRulePropsDictAtom);
  const solidOrdContainerRef = useRef<HTMLDivElement>(null);
  const updateCommentRef = useActualRef(useCmComCommentUpdater(com.wid));
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[com.wid] ?? altCommentKeys.last;
  const isShowComments = useAtomValue(cmIsShowMyCommentsAtom);

  const [selection, setSelection] = useState<Selection>({});
  const { linei, wordi } = selection;

  const { commentCssStr } = useCmComCommentBlockCss(
    com,
    false,
    useMemo(
      () => ({
        ordw: ordSelector,
        propsList: mylib.values(propsDict.dict!).filter(itNUnd),
      }),
      [ordSelector, propsDict.dict],
    ),
  );

  useEffect(() => {
    const dict = propsDict.dict;
    if (dict == null) return;

    const timeout = setTimeout(async () => {
      updateCommentRef.current(
        () => makeCmComCommentConstructorCommentTextFromRuleProps(dict, propsDict.wordChordiMaxDict),
        ordSelector,
        altCommentKey,
      );
    }, 1000);

    return () => clearTimeout(timeout);
  }, [altCommentKey, com.wid, ordSelector, propsDict.dict, propsDict.wordChordiMaxDict, updateCommentRef]);

  useEffect(() => {
    return cmComCommentCurrentOpenedAltKeyAtom.subscribe(() => {
      updateCmComCommentConstructorRulePropsDict(com.wid, ordSelector);
    });
  }, [com.wid, ordSelector]);

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
        ordSelectorId={ordSelector}
      />
      {!isShowComments ? (
        <div className="w-full h-full flex justify-center text-xKO">Комментарии скрыты</div>
      ) : (
        <>
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
            $ordSelector={ordSelector}
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
            <style>{commentCssStr}</style>

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
