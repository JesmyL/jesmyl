import { getParentNodeWithAttributeName } from '#shared/lib/getParentNodeWithClassName';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { cmComChordHardLevelAtom, cmComFontSizeAtom } from '$cm/entities/index';
import { CmComOrderList } from '$cm/ext';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { CmComOrderWid } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { checkIsNil, checkIsNotNil } from 'shared/utils/checkIs';
import { useCmComCommentConstructorCurrentInnerKindContext } from '../state/CurrentInnerKind';
import { CmComCommentConstructorLineConstructor } from './LineConstructor';
import { CmComCommentConstructorLostProps } from './LostProps';
import { CmComCommentConstructorWordConstructor } from './WordConstructor';

export const CmComCommentConstructorBlockView = ({ ordw: ordwSelector, com }: { ordw: CmComOrderWid; com: CmCom }) => {
  const fontSize = useAtomValue(cmComFontSizeAtom);
  const chordHardLevel = useAtomValue(cmComChordHardLevelAtom);
  const selectorPrefix = useCmComCommentConstructorCurrentInnerKindContext();

  const [{ linei, wordi, ordw, solidLinei }, setSelection] = useState<{
    ordw?: CmComOrderWid;
    linei?: number;
    wordi?: number;
    solidLinei?: number;
  }>({});

  const variativeLinei = selectorPrefix ? solidLinei : linei;

  return (
    <>
      <StyledSolidOrdContainer
        className="com-orders-with-comments weight-add"
        $linei={linei}
        $wordi={wordi}
        $ordw={ordw}
        onClick={event => {
          const ordw = getParentNodeWithAttributeName(event, 'ord-selector').attr;
          const linei = getParentNodeWithAttributeName(event, 'ord-linei').attr;
          const solidLinei = getParentNodeWithAttributeName(event, 'solid-ord-linei').attr;
          const wordi = getParentNodeWithAttributeName(event, 'line-wordi').attr;

          if (checkIsNil(linei) || checkIsNil(ordw) || checkIsNil(solidLinei) || checkIsNil(wordi)) return;

          setSelection({ linei: +linei, solidLinei: +solidLinei, wordi: +wordi, ordw: +ordw as CmComOrderWid });
        }}
      >
        <CmComOrderList
          chordHardLevel={chordHardLevel}
          chordVisibleVariant={ChordVisibleVariant.Maximal}
          com={com}
          isMiniAnchor={false}
          fontSize={fontSize}
          asOrderNode={({ ord, node }) => ord.wid === ordwSelector && node}
        />
      </StyledSolidOrdContainer>

      <CmComCommentConstructorLostProps
        com={com}
        ordw={ordwSelector}
      />

      {checkIsNotNil(variativeLinei) && checkIsNotNil(ordw) && checkIsNotNil(solidLinei) && (
        <>
          <CmComCommentConstructorLineConstructor
            linei={variativeLinei}
            solidLinei={solidLinei}
            ordw={ordw}
          />

          {checkIsNotNil(wordi) && (
            <CmComCommentConstructorWordConstructor
              linei={variativeLinei}
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
}>`
  ${props =>
    props.$linei != null &&
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
    `}
`;
