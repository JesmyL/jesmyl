import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { removedCompositionsAtom } from '$cm+editor/basis/lib/atoms/com';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { useCcomw, useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { PageCmEditorContainer } from '$cm+editor/basis/ui/PageCmEditorContainer';
import {
  EditCompositionBusyInfo,
  StyledIsThereOtherFirstRedactorUserDetect,
} from '$cm+editor/entities/EditCompositionBusyInfo';
import { editCompositionNavs } from '$cm+editor/pages/EditCompositionPage/lib/tabs.config';
import { CmComNumber } from '$cm/col/com/complect/ComNumber';
import { ComPlayer } from '$cm/col/com/player/ComPlayer';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { useConnectionState } from '$index/useConnectionState';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const CmEditCompositionPage = () => {
  const ccom = useEditableCcom();
  const ccomw = useCcomw();
  const removedComs = useAtomValue(removedCompositionsAtom);
  const [isOpenPlayer, setIsOpenPlayer] = useState(false);
  const connectionNode = useConnectionState('m-2');
  const navigate = useNavigate();
  const { tab }: { tab: keyof typeof editCompositionNavs } = useParams({ from: '/cm/edit/coms/$comw/$tab' });
  const checkAccess = useCheckUserAccessRightsInScope();
  const TabComponent =
    (tab && editCompositionNavs[tab].checkTabAccess(checkAccess) && editCompositionNavs[tab]?.Component) ||
    editCompositionNavs.watch.Component;

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          if (!ccom && (mylib.isNaN(ccomw) || removedComs[ccomw] == null)) navigate({ to: '..' });
        }, 500),
      )
      .effect();
  }, [ccom, ccomw, navigate, removedComs]);

  if (!ccom) {
    if (mylib.isNaN(ccomw) || removedComs[ccomw] == null) return null;

    return (
      <PageCmEditorContainer
        className="edit-composition"
        headTitle={removedComs[ccomw]}
        content={
          <div className="flex column">
            <h2 className="text-xKO">Песня удалена</h2>
            <TheIconButton
              icon="MapsRefresh"
              postfix="Восстановить"
              className="text-xOK"
              onClick={() => cmEditComClientTsjrpcMethods.bringBackToLife({ comw: ccomw })}
            />
          </div>
        }
      />
    );
  }

  return (
    <StyledContainer
      className="edit-composition"
      headTitle={
        <>
          #{<CmComNumber comw={ccom.wid} />} {ccom.name}
        </>
      }
      withoutBackSwipe
      backButtonPath="/cm/edit/coms/"
      head={
        <>
          {connectionNode}
          <TheIconButton
            icon="MusicNote03"
            kind={isOpenPlayer ? 'SolidRounded' : 'StrokeRounded'}
            className="m-2"
            onClick={() => setIsOpenPlayer(!isOpenPlayer)}
          />
        </>
      }
      content={
        <>
          {mylib.isNaN(ccomw) || <EditCompositionBusyInfo comw={ccomw} />}

          <div className="flex justify-around gap-x-2 px-2 sticky nav-panel overflow-auto no-scrollbar">
            {MyLib.entries(editCompositionNavs).map(([tab, { icon, checkTabAccess }]) => {
              if (!checkTabAccess(checkAccess)) return null;

              return (
                <Link
                  key={tab}
                  to={'/cm/edit/coms/$comw/$tab'}
                  params={{ comw: `${ccom.wid}`, tab }}
                  className="pointer"
                >
                  {({ isActive }) =>
                    icon ? (
                      isActive ? (
                        <TheIconButton
                          icon={icon}
                          kind="StrokeRounded"
                          className="text-x7"
                        />
                      ) : (
                        <TheIconButton
                          icon={icon}
                          kind="BulkRounded"
                        />
                      )
                    ) : null
                  }
                </Link>
              );
            })}
          </div>

          {isOpenPlayer && !!ccom.audio?.length && (
            <div className="sticky com-player">
              <ComPlayer audioLinks={ccom.audio} />
            </div>
          )}
          <StyledOutlet>{TabComponent && <TabComponent />}</StyledOutlet>
        </>
      }
    />
  );
};

const StyledOutlet = styled.div``;

const StyledContainer = styled(PageCmEditorContainer)`
  &:has(${StyledIsThereOtherFirstRedactorUserDetect}) ${StyledOutlet} {
    opacity: 0.3;
  }

  .cat-list-title {
    background-color: var(--color--2);
  }

  .nav-panel {
    top: -8px;
    background: var(--color--1);
  }

  .com-player {
    top: 28px;
  }
`;
