import { useAtomValue } from 'atomaric';
import styled, { css } from 'styled-components';
import {
  gamerMemoryGiantBoardImageisAtom,
  gamerMemoryGiantGuessedImageisAtom,
  gamerMemoryGiantShowAllImagesAtom,
  gamerMemoryGiantShownImageisAtom,
  gamerMemoryGiantUsedImagesAtom,
} from '../state/atoms';
import { GamerMemoryGiantImageCardByMd5 } from './ImageCardByMd5';

export const GamerMemoryGiantBoard = () => {
  const imageis = useAtomValue(gamerMemoryGiantBoardImageisAtom);
  const images = useAtomValue(gamerMemoryGiantUsedImagesAtom);
  const shownImageiSet = useAtomValue(gamerMemoryGiantShownImageisAtom);
  const guessedImageiSet = useAtomValue(gamerMemoryGiantGuessedImageisAtom);
  const isShowAll = useAtomValue(gamerMemoryGiantShowAllImagesAtom);

  return (
    <StyledBoard $shownImageiSet={shownImageiSet}>
      {imageis?.map((index, indexi) => {
        const imageMd5 = images[index];

        return (
          imageMd5 && (
            <StyledCard
              key={indexi}
              $isShown={isShowAll || shownImageiSet.has(indexi)}
              $isGuessed={guessedImageiSet.has(indexi)}
            >
              <StyledCardFrontSide
                imageMd5={imageMd5}
                size={`calc((100cqw + 100cqh) / (${imageis.length - imageis.length / 5.5} * .7))`}
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
          /* pointer-events: none; */
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

const StyledBoard = styled.div<{ $shownImageiSet: Set<number> }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1cqmin;

  ${props =>
    props.$shownImageiSet.size > 1 &&
    css`
      pointer-events: none;
    `}
`;
