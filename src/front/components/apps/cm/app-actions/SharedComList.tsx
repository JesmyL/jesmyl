import { mylib } from '#shared/lib/my-lib';
import { TheButton } from '#shared/ui/Button';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { useNavigate } from 'react-router-dom';
import { CmComWid } from 'shared/api';
import styled from 'styled-components';
import { useSelectedComs } from '../basis/lib/hooks/useSelectedComs';
import { ComFaceList } from '../col/com/face/list/ComFaceList';

export const CmSharedComListActionInterpretator = ({
  comws,
  onClose,
}: {
  comws: CmComWid[];
  onClose: (comws: null) => void;
}) => {
  const navigate = useNavigate();
  const { setSelectedComws, selectedComws } = useSelectedComs();
  const incomingComwsSet = new Set(comws);
  const localComwsSet = new Set(selectedComws);
  const close = (isNavigate: boolean) => {
    onClose(null);
    if (isNavigate) navigate('/cm/li/selected');
  };

  const addComsCount = incomingComwsSet.difference(localComwsSet).size;
  const lessComsCount = localComwsSet.difference(incomingComwsSet).size;

  return (
    <>
      <FullContent onClose={close}>
        <h3>С вами поделились списком</h3>
        <ComFaceList
          list={comws}
          importantOnClick={() => {}}
        />
        <div className="flex column flex-gap margin-big-gap">
          <TheButton
            disabled={addComsCount === 0}
            onClick={() => {
              setSelectedComws(Array.from(localComwsSet.union(incomingComwsSet)));
              close(true);
            }}
          >
            Добавить к выбранным
          </TheButton>
          <StyledButtonDescription>
            Добавится {addComsCount} {mylib.declension(addComsCount, 'песня', 'песни', 'песен')}
          </StyledButtonDescription>

          <TheButton
            disabled={lessComsCount === 0 && addComsCount === 0}
            onClick={() => {
              setSelectedComws(comws);
              close(true);
            }}
          >
            Заменить выбранные
          </TheButton>

          <StyledButtonDescription>
            Потеряется {lessComsCount} {mylib.declension(lessComsCount, 'песня', 'песни', 'песен')}
          </StyledButtonDescription>
        </div>
      </FullContent>
    </>
  );
};

const StyledButtonDescription = styled.div`
  font-size: 0.9em;
  opacity: 0.7;
  margin-top: -0.5em;
`;
