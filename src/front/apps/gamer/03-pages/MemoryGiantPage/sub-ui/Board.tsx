import { useAtomValue } from 'atomaric';
import styled, { css } from 'styled-components';
import {
  gamerMemoryGiantBoardImageisAtom,
  gamerMemoryGiantGuessedImageisAtom,
  gamerMemoryGiantShownImageisAtom,
  gamerMemoryGiantUsedImagesAtom,
} from '../state/atoms';
import { GamerMemoryGiantImageCardByMd5 } from './ImageCardByMd5';

export const GamerMemoryGiantBoard = (props: { widthHeight?: { w: number; h: number } }) => {
  const imageis = useAtomValue(gamerMemoryGiantBoardImageisAtom);
  const images = useAtomValue(gamerMemoryGiantUsedImagesAtom);
  const shownImageiSet = useAtomValue(gamerMemoryGiantShownImageisAtom);
  const guessedImageiSet = useAtomValue(gamerMemoryGiantGuessedImageisAtom);

  return (
    <StyledBoard
      $widthHeight={props.widthHeight}
      $shownImageiSet={shownImageiSet}
    >
      {imageis?.map((index, indexi) => {
        const imageMd5 = images[index];

        return (
          imageMd5 && (
            <StyledCard
              key={indexi}
              $isShown={shownImageiSet.has(indexi)}
              $isGuessed={guessedImageiSet.has(indexi)}
            >
              <StyledCardFrontSide
                imageMd5={imageMd5}
                size={`calc((100cqw + 100cqh) / (${imageis?.length ?? 0} * .7))`}
                onClick={() => gamerMemoryGiantShownImageisAtom.do.toggle(indexi)}
              />
              <StyledCardBackSide>{indexi + 1}</StyledCardBackSide>
            </StyledCard>
          )
        );
      })}
    </StyledBoard>
  );
};

const StyledCardFrontSide = styled(GamerMemoryGiantImageCardByMd5)`
  transition: opacity 0.3s;
  position: relative;
  opacity: 0;
  z-index: 2;
`;

const StyledCardBackSide = styled.div`
  transition: color 0.3s;
  position: absolute;
  background-color: black;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  z-index: 1;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1vmin white;
  font-size: 10vmin;
  border-radius: 3%;
`;

const StyledCard = styled.div<{ $isShown: boolean; $isGuessed: boolean }>`
  position: relative;
  transition:
    transform 0.3s,
    scale 0.3s 0.8s;

  ${props =>
    props.$isGuessed &&
    css`
      scale: 0.5;
    `}

  ${props =>
    props.$isShown || props.$isGuessed
      ? css`
          pointer-events: none;
          transform: rotateY(0);

          ${StyledCardFrontSide} {
            opacity: 1;
          }

          ${StyledCardBackSide} {
            color: transparent;
          }
        `
      : css`
          transform: rotateY(180deg);
          ${StyledCardBackSide} {
            color: white;
          }
        `}
`;

const StyledBoard = styled.div<{ $widthHeight: { w: number; h: number } | und; $shownImageiSet: Set<number> }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1cqmin;

  ${props =>
    props.$shownImageiSet.size > 1 &&
    css`
      pointer-events: none;
    `}

  ${props => {
    if (props.$widthHeight == null) return;
    const proportion = props.$widthHeight.h / props.$widthHeight.w;

    return css`
      width: ${proportion < 1 ? `calc(100% * ${proportion})` : '100%'};
      height: ${proportion < 1 ? '100%' : `calc(100% / ${proportion})`};
    `;
  }}
`;
