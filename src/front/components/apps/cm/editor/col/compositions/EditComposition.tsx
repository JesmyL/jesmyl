import { hookEffectPipe, setTimeoutPipe } from 'front/complect/hookEffectPipe';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCheckIsAccessed } from '../../../../../../complect/exer/hooks/check-is-accessed';
import { useExerExec } from '../../../../../../complect/exer/hooks/useExer';
import IconButton from '../../../../../../complect/the-icon/IconButton';
import {
  IconMusicNote03SolidRounded,
  IconMusicNote03StrokeRounded,
} from '../../../../../../complect/the-icon/icons/music-note-03';
import { useAuth } from '../../../../../index/molecules';
import useConnectionState from '../../../../../index/useConnectionState';
import ComPlayer from '../../../col/com/player/ComPlayer';
import { editCompositionNavs } from '../../editorNav';
import PhaseCmEditorContainer from '../../phase-editor-container/PhaseCmEditorContainer';
import { useEditableCcom } from './useEditableCcom';

export default function EditComposition() {
  const ccom = useEditableCcom();
  const exec = useExerExec();
  const [isOpenPlayer, setIsOpenPlayer] = useState(false);
  const auth = useAuth();
  const checkIsAccessed = useCheckIsAccessed(auth);
  const connectionNode = useConnectionState('margin-gap');
  const navigate = useNavigate();

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          if (!ccom) navigate('..');
        }, 500),
      )
      .effect();
  }, [ccom, navigate]);

  if (!ccom) return null;

  return (
    <StyledContainer
      className="edit-composition"
      headTitle={`#${ccom.number} ${ccom.initialName || ccom.name}`}
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
        ccom.col.removed ? (
          <div className="flex column">
            <h2 className="error-message">Песня удалена</h2>
            <div
              className="pointer"
              onClick={() => exec(ccom.comeBack())}
            >
              Восстановить
            </div>
          </div>
        ) : (
          <>
            <div className="flex around sticky nav-panel">
              {editCompositionNavs.map(({ data: { iconPack, iconText } = {}, phase: [phase], accessLevel }) => {
                if (accessLevel != null && !checkIsAccessed(accessLevel)) return null;
                return (
                  <NavLink
                    key={phase}
                    to={phase}
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
                      ) : (
                        iconText
                      )
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
            <Outlet />
          </>
        )
      }
    />
  );
}

const StyledContainer = styled(PhaseCmEditorContainer)`
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
