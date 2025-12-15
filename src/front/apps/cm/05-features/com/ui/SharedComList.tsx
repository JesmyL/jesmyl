import { mylib } from '#shared/lib/my-lib';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheButton } from '#shared/ui/TheButton';
import { cmComSelectedComwsAtom, useCmComSelectedList } from '$cm/entities/com';
import { CmComFaceList } from '$cm/entities/com-face';
import { useNavigate } from '@tanstack/react-router';
import { Atom, useAtomValue } from 'atomaric';
import { CmComWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import styled from 'styled-components';

export const CmComSharedListActionInterpretator = ({
  comListOnActionAtom,
}: {
  comListOnActionAtom: Atom<CmComWid[] | null>;
}) => {
  const comws = useAtomValue(comListOnActionAtom);
  const navigate = useNavigate();
  const selected = useCmComSelectedList();
  const incomingComwsSet = new Set(comws);
  const localComwsSet = new Set(selected.selectedComws);
  const close = (isNavigate: boolean) => {
    comListOnActionAtom.set(null);
    if (isNavigate) navigate({ to: '/cm/li/sel' });
  };

  const addComsCount = incomingComwsSet.difference(localComwsSet).size;
  const lessComsCount = localComwsSet.difference(incomingComwsSet).size;

  return (
    <>
      <FullContent
        openAtom={comListOnActionAtom}
        checkIsOpen={it => it != null}
      >
        {comws => (
          <>
            <h3>С вами поделились списком</h3>
            <CmComFaceList
              list={comws}
              importantOnClick={emptyFunc}
            />
            <div className="flex column gap-2 m-5">
              <TheButton
                disabled={addComsCount === 0}
                onClick={() => {
                  cmComSelectedComwsAtom.set(Array.from(localComwsSet.union(incomingComwsSet)));
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
                  cmComSelectedComwsAtom.set(comws);
                  close(true);
                }}
              >
                Заменить выбранные
              </TheButton>

              <StyledButtonDescription>
                Потеряется {lessComsCount} {mylib.declension(lessComsCount, 'песня', 'песни', 'песен')}
              </StyledButtonDescription>
            </div>
          </>
        )}
      </FullContent>
    </>
  );
};

const StyledButtonDescription = styled.div`
  font-size: 0.9em;
  opacity: 0.7;
  margin-top: -0.5em;
`;
