import { useAtomValue } from '#shared/lib/atoms';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { IconButton } from '#shared/ui/the-icon/IconButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { CmComNumber } from '@cm/col/com/complect/ComNumber';
import { ComPlayer } from '@cm/col/com/player/ComPlayer';
import { cmComClientInvocatorMethods } from '@cm/editor/lib/cm-editor-invocator.methods';
import { editCompositionNavs } from '@cm/editor/pages/compositions/lib/editorNav';
import { PageCmEditorContainer } from '@cm/editor/ui/PhaseCmEditorContainer';
import { useConnectionState } from '@index/useConnectionState';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { removedCompositionsAtom } from '../lib/atoms';
import { useCcomw, useEditableCcom } from '../lib/useEditableCom';
import { EditCompositionBusyInfo, StyledIsThereOtherFirstRedactorUserDetect } from './EditCompositionBusyInfo';

export const EditComposition = () => {
  const ccom = useEditableCcom();
  const ccomw = useCcomw();
  const removedComs = useAtomValue(removedCompositionsAtom);
  const [isOpenPlayer, setIsOpenPlayer] = useState(false);
  const connectionNode = useConnectionState('margin-gap');
  const navigate = useNavigate();

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          if (!ccom && (mylib.isNaN(ccomw) || removedComs[ccomw] == null)) navigate('..');
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
            <IconButton
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
      rememberProps={['comw']}
      withoutBackSwipe
      head={
        <>
          {connectionNode}
          <LazyIcon
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

          <div className="flex around sticky nav-panel">
            {editCompositionNavs.map(({ path, icon }) => {
              return (
                <NavLink
                  key={path}
                  to={path}
                  className="pointer"
                  end
                >
                  {({ isActive }) =>
                    icon ? (
                      isActive ? (
                        <LazyIcon
                          icon={icon}
                          kind="StrokeRounded"
                          className="color--7"
                        />
                      ) : (
                        <LazyIcon
                          icon={icon}
                          kind="BulkRounded"
                        />
                      )
                    ) : null
                  }
                </NavLink>
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
          <StyledOutlet>
            <Outlet />
          </StyledOutlet>
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
    padding-top: 5px;
  }

  .com-player {
    top: 28px;
  }
`;
