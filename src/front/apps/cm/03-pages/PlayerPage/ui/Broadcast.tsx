import { useCmCom } from '$cm/entities/com';
import { ChordVisibleVariant, CmComOrderList } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import styled from 'styled-components';
import { cmPlayerBroadcastComwAtom } from '../state/atoms';

export const CmPlayerBroadcast = () => {
  const comw = useAtomValue(cmPlayerBroadcastComwAtom);
  const com = useCmCom(comw);

  return (
    <>
      <StyledBroadcast>
        {com && (
          <CmComOrderList
            com={com}
            chordVisibleVariant={ChordVisibleVariant.None}
            fontSize={-1}
          />
        )}
      </StyledBroadcast>
    </>
  );
};

const StyledBroadcast = styled.div`
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  width: 100vw;

  &,
  * {
    color: white;
  }
`;
