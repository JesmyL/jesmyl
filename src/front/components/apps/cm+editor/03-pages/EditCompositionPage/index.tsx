import { useAtomValue } from '#shared/lib/atom';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { removedCompositionsAtom } from '$cm+editor/basis/lib/atoms/com';
import { cmComClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { useCcomw, useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { PageCmEditorContainer } from '$cm+editor/basis/ui/PageCmEditorContainer';
import {
  EditCompositionBusyInfo,
  StyledIsThereOtherFirstRedactorUserDetect,
} from '$cm+editor/entities/EditCompositionBusyInfo';
import { editCompositionNavs } from '$cm+editor/pages/EditCompositionPage/lib/tabs.config';
import { CmComNumber } from '$cm/col/com/complect/ComNumber';
import { ComPlayer } from '$cm/col/com/player/ComPlayer';
import { useConnectionState } from '$index/useConnectionState';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const CmEditCompositionPage = () => {
  const ccom = useEditableCcom();
  const ccomw = useCcomw();
  const removedComs = useAtomValue(removedCompositionsAtom);
  const [isOpenPlayer, setIsOpenPlayer] = useState(false);
  const connectionNode = useConnectionState('margin-gap');
  const navigate = useNavigate();
  const { tab } = useSearch({ from: '/cm/edit/coms/$comw/' });
  const TabComponent = tab && editCompositionNavs[tab].Component;

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
            <h2 className="color--ko">Песня удалена</h2>
            <TheIconButton
              icon="MapsRefresh"
              postfix="Восстановить"
              className="color--ok"
              onClick={() => cmComClientInvocatorMethods.bringBackToLife(null, ccomw)}
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
          #{<CmComNumber comw={ccom.wid} />} {ccom.initialName || ccom.name}
        </>
      }
      withoutBackSwipe
      head={
        <>
          {connectionNode}
          <TheIconButton
            icon="MusicNote03"
            kind={isOpenPlayer ? 'SolidRounded' : 'StrokeRounded'}
            className="margin-gap"
            onClick={() => setIsOpenPlayer(!isOpenPlayer)}
          />
        </>
      }
      content={
        <>
          {mylib.isNaN(ccomw) || <EditCompositionBusyInfo comw={ccomw} />}

          <div className="flex around sticky nav-panel overflow-auto no-scrollbar">
            {MyLib.entries(editCompositionNavs).map(([tab, { icon }]) => {
              return (
                <Link
                  key={tab}
                  to={'/cm/edit/coms/$comw'}
                  params={{ comw: `${ccom.wid}` }}
                  search={{ tab }}
                  className="pointer"
                >
                  {({ isActive }) =>
                    icon ? (
                      isActive ? (
                        <TheIconButton
                          icon={icon}
                          kind="StrokeRounded"
                          className="color--7"
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

          {isOpenPlayer && ccom.audio && (
            <div className="sticky com-player">
              <ComPlayer
                src={ccom.audio}
                split
              />
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
