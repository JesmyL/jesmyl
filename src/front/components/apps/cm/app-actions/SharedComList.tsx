import { Atom, useAtomValue } from '#shared/lib/atom';
import { mylib } from '#shared/lib/my-lib';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheButton } from '#shared/ui/TheButton';
import { useSelectedComs } from '$cm/base/useSelectedComs';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { useNavigate } from '@tanstack/react-router';
import { CmComWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import styled from 'styled-components';

export const CmSharedComListActionInterpretator = ({
  comListOnActionAtom,
}: {
  comListOnActionAtom: Atom<CmComWid[] | null>;
}) => {
  const comws = useAtomValue(comListOnActionAtom);
  const navigate = useNavigate();
  const { setSelectedComws, selectedComws } = useSelectedComs();
  const incomingComwsSet = new Set(comws);
  const localComwsSet = new Set(selectedComws);
  const close = (isNavigate: boolean) => {
    comListOnActionAtom.set(null);
    if (isNavigate) navigate({ to: '/cm/li/sel' });
  };

  const addComsCount = incomingComwsSet.difference(localComwsSet).size;
  const lessComsCount = localComwsSet.difference(incomingComwsSet).size;

  return (
    <>
      <FullContent openAtom={comListOnActionAtom}>
        <h3>С вами поделились списком</h3>
        <ComFaceList
          list={comws}
          importantOnClick={emptyFunc}
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

          {comws && (
            <TheButton
              disabled={lessComsCount === 0 && addComsCount === 0}
              onClick={() => {
                setSelectedComws(comws);
                close(true);
              }}
            >
              Заменить выбранные
            </TheButton>
          )}

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
