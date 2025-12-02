import { GamerMemoryGiantImage } from '$gamer/shared/model/memory-giant';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';

export const GamerMemoryGiantImageCard = ({
  image,
  size,
  ...attrs
}: {
  image: GamerMemoryGiantImage;
  size?: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <StyledContainer
      $size={size}
      {...attrs}
    >
      <StyledCard $imageSrc={image.src} />
    </StyledContainer>
  );
};

const StyledCard = styled.div<{ $imageSrc: string }>`
  background-image: url(${props => `'${props.$imageSrc}'`});
`;

const StyledContainer = styled.div<{ $size?: string }>`
  --padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${props => props.$size ?? '300px'};
  aspect-ratio: 1/1;
  border: var(--color-x3) 2px solid;
  border-radius: 3%;

  padding: 10px;

  ${StyledCard} {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    width: calc(100% - var(--padding));
    height: calc(100% - var(--padding));
  }
`;
