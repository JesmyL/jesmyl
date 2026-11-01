import { translateBase } from '#basis/locale';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheButton } from '#shared/ui/TheButton';
import { cmComSelectedComwsAtom } from '$cm/entities/com';
import { CmComFaceList } from '$cm/entities/com-face';
import { useNavigate } from '@tanstack/react-router';
import { Atom, useAtomValue } from 'atomaric';
import { CmComWid } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { emptyFunc } from 'shared/utils';

export const CmComSharedListActionInterpretator = ({
  comListOnActionAtom,
}: {
  comListOnActionAtom: Atom<CmComWid[] | null>;
}) => {
  const comws = useAtomValue(comListOnActionAtom);
  const navigate = useNavigate();
  const selectedComws = useAtomValue(cmComSelectedComwsAtom);
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
      <FullContent
        openAtom={comListOnActionAtom}
        checkIsOpen={it => it != null}
      >
        {comws => (
          <>
            <h3>{translateBase(BaseLocaleKey.CmListShared)}</h3>
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
                {translateBase(BaseLocaleKey.CmAddToSelectedList)}
              </TheButton>
              <div className="text-[0.9em] opacity-70 -mt-[0.5em]">
                {translateBase(BaseLocaleKey.CmWillAdd, { c: addComsCount })}
              </div>

              <TheButton
                disabled={lessComsCount === 0 && addComsCount === 0}
                onClick={() => {
                  cmComSelectedComwsAtom.set(comws);
                  close(true);
                }}
              >
                {translateBase(BaseLocaleKey.CmChangeSelectedList)}
              </TheButton>

              <div className="text-[0.9em] opacity-70 -mt-[0.5em]">
                {translateBase(BaseLocaleKey.CmWillLost, { c: lessComsCount })}
              </div>
            </div>
          </>
        )}
      </FullContent>
    </>
  );
};
