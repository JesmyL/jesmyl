import useSelectedComs from '#basis/lib/hooks/cm/useSelectedComs';
import { FullScreenContent } from '#shared/ui/fullscreen-content';
import TheButton from 'front/08-shared/ui/TheButton';
import { ComFaceList } from 'front/components/apps/cm/col/com/face/list/ComFaceList';
import { mylib } from 'front/utils';
import { useNavigate } from 'react-router-dom';
import { CmComWid } from 'shared/api';
import styled from 'styled-components';

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
      <FullScreenContent onClose={close}>
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
      </FullScreenContent>
    </>
  );
};

const StyledButtonDescription = styled.div`
  font-size: 0.9em;
  opacity: 0.7;
  margin-top: -0.5em;
`;
