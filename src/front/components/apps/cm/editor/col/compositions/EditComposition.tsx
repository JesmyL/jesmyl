import { useAtomValue } from 'front/complect/atoms';
import { hookEffectPipe, setTimeoutPipe } from 'front/complect/hookEffectPipe';
import { mylib } from 'front/utils';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import IconButton from '../../../../../../complect/the-icon/IconButton';
import { IconMapsRefreshStrokeRounded } from '../../../../../../complect/the-icon/icons/maps-refresh';
import {
  IconMusicNote03SolidRounded,
  IconMusicNote03StrokeRounded,
} from '../../../../../../complect/the-icon/icons/music-note-03';
import useConnectionState from '../../../../../index/useConnectionState';
import { CmComNumber } from '../../../col/com/complect/ComNumber';
import ComPlayer from '../../../col/com/player/ComPlayer';
import { cmComClientInvocatorMethods } from '../../cm-editor-invocator.methods';
import { editCompositionNavs } from '../../editorNav';
import PhaseCmEditorContainer from '../../phase-editor-container/PhaseCmEditorContainer';
import { removedCompositionsAtom } from './atoms';
import EditCompositionBusyInfo, { StyledIsThereOtherFirstRedactorUserDetect } from './EditCompositionBusyInfo';
import { useCcomw, useEditableCcom } from './useEditableCcom';

export default function EditComposition() {
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
      <PhaseCmEditorContainer
        className="edit-composition"
        headTitle={removedComs[ccomw]}
        content={
          <div className="flex column">
            <h2 className="color--ko">Песня удалена</h2>
            <IconButton
              Icon={IconMapsRefreshStrokeRounded}
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
      head={
        <>
          {connectionNode}
          <IconButton
            Icon={isOpenPlayer ? IconMusicNote03SolidRounded : IconMusicNote03StrokeRounded}
            className="margin-gap"
            onClick={() => setIsOpenPlayer(!isOpenPlayer)}
          />
        </>
      }
      content={
        <>
          {mylib.isNaN(ccomw) || <EditCompositionBusyInfo comw={ccomw} />}

          <div className="flex around sticky nav-panel">
            {editCompositionNavs.map(({ iconPack, path }) => {
              return (
                <NavLink
                  key={path}
                  to={path}
                  className="pointer"
                  end
                >
                  {({ isActive }) =>
                    iconPack ? (
                      isActive ? (
                        <iconPack.StrokeRounded className="color--7" />
                      ) : (
                        <iconPack.BulkRounded />
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
}

const StyledOutlet = styled.div``;

const StyledContainer = styled(PhaseCmEditorContainer)`
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
