import { CmBroadcastCurrentComTrackScreen } from '$cm/widgets/broadcast';
import styled from '@emotion/styled';

export const CmPlayerBroadcast = () => {
  return (
    <StyledBroadcast className="flex justify-center">
      <CmBroadcastCurrentComTrackScreen configi={0} />
    </StyledBroadcast>
  );
};

const StyledBroadcast = styled.div`
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  justify-content: center;

  &,
  * {
    color: white;
  }
`;
