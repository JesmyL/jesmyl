import { getParentNodeWithAttributeName } from '#shared/lib/getParentNodeWithClassName';
import { cmComChordHardLevelAtom, cmComFontSizeAtom } from '$cm/entities/index';
import { ChordVisibleVariant, CmCom, CmComOrderList } from '$cm/ext';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { CmComCommentBlockSimpleSelector, CmComOrderWid } from 'shared/api';
import { CmComCommentConstructorLineConstructor } from './LineConstructor';
import { CmComCommentConstructorWordConstructor } from './WordConstructor';

export const CmComCommentConstructorBlockView = ({ selector, com }: { selector: CmComOrderWid; com: CmCom }) => {
  const fontSize = useAtomValue(cmComFontSizeAtom);
  const chordHardLevel = useAtomValue(cmComChordHardLevelAtom);
  const [{ linei, wordi, ordw, solidLinei }, setSelection] = useState<{
    ordw?: CmComOrderWid;
    linei?: number;
    wordi?: number;
    solidLinei?: number;
  }>({});

  return (
    <>
      <StyledSolidOrdContainer
        className="com-orders-with-comments"
        $linei={linei}
        $wordi={wordi}
        $ordw={ordw}
        $ordSelector={selector}
        onClick={event => {
          const ordw = getParentNodeWithAttributeName(event, 'ord-selector').attr;
          const linei = getParentNodeWithAttributeName(event, 'ord-linei').attr;
          const solidLinei = getParentNodeWithAttributeName(event, 'solid-ord-linei').attr;
          const wordi = getParentNodeWithAttributeName(event, 'line-wordi').attr;

          if (linei == null || ordw == null || solidLinei == null || wordi == null) return;

          setSelection({ linei: +linei, solidLinei: +solidLinei, wordi: +wordi, ordw: +ordw });
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

      {linei != null && ordw != null && solidLinei != null && (
        <>
          <CmComCommentConstructorLineConstructor
            linei={linei}
            solidLinei={solidLinei}
            ordw={ordw}
          />

          {wordi != null && (
            <CmComCommentConstructorWordConstructor
              linei={linei}
              wordi={wordi}
              ordw={ordw}
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
  $ordw: number | nil;
  $ordSelector: CmComCommentBlockSimpleSelector;
}>`
  ${props => [
    css`
      [solid-ord-selector]:not([solid-ord-selector='${props.$ordSelector}']) {
        display: none;
        visibility: hidden;
      }
    `,
    props.$linei != null && [
      css`
        [ord-selector='${props.$ordw}'] [ord-linei='${props.$linei}'] {
          &,
          * {
            text-decoration: underline;
          }

          ${props.$wordi != null &&
          css`
            [line-wordi='${props.$wordi}'] {
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
