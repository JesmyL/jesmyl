import { getParentNodeWithAttributeName } from '#shared/lib/getParentNodeWithClassName';
import { cmComChordHardLevelAtom, cmComFontSizeAtom } from '$cm/entities/index';
import { ChordVisibleVariant, CmCom, CmComOrderList } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { CmComCommentBlockSimpleSelector, CmComOrderWid } from 'shared/api';
import styled, { css } from 'styled-components';
import { CmComCommentConstructorLineConstructor } from './LineConstructor';
import { CmComCommentConstructorWordConstructor } from './WordConstructor';

export const CmComCommentConstructorBlockView = ({ selector, com }: { selector: CmComOrderWid; com: CmCom }) => {
  const fontSize = useAtomValue(cmComFontSizeAtom);
  const chordHardLevel = useAtomValue(cmComChordHardLevelAtom);
  const [{ linei, wordi }, setSelection] = useState<{ linei?: number; wordi?: number }>({});

  return (
    <>
      <StyledSolidOrdContainer
        className="com-orders-with-comments"
        $linei={linei}
        $wordi={wordi}
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
  );
};

const StyledSolidOrdContainer = styled.div<{
  $linei: number | nil;
  $wordi: number | nil;
  $ordSelector: CmComCommentBlockSimpleSelector;
}>`
  ${props => [
    css`
      [solid-com-order-selector]:not([solid-com-order-selector='${props.$ordSelector}']) {
        display: none;
        visibility: hidden;
      }
    `,
    props.$linei != null && [
      css`
        [solid-order-text-linei='${props.$linei}'] {
          &,
          * {
            text-decoration: underline;
          }

          ${props.$wordi != null &&
          css`
            [whole-wordi='${props.$wordi}'] {
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
