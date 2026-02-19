import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { useConnectionState } from '#basis/lib/useConnectionState';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useEditableCcom } from '$cm+editor/shared/lib/useEditableCom';
import { removedCompositionsAtom } from '$cm+editor/shared/state/com';
import { PageCmEditorContainer } from '$cm+editor/shared/ui/PageCmEditorContainer';
import { cmEditorComTabCompositionNavs } from '$cm+editor/widgets/com-tab';
import { CmComAudioPlayer, CmComNumber } from '$cm/ext';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { CmComWid } from 'shared/api';
import styled from 'styled-components';
import { useCmEditorCompositionTrySendAudioMarks } from '../api/useCmComEditorTrySendAudioMarks';
import {
  CmEditorCompositionBusyInfo,
  StyledCmEditorCompositionIsThereOtherFirstRedactorUserDetect,
} from './EditCompositionBusyInfo';

export const CmEditorCompositionPage = ({
  tab,
  ccomw,
}: {
  tab: keyof typeof cmEditorComTabCompositionNavs;
  ccomw: CmComWid;
}) => {
  const ccom = useEditableCcom(ccomw);
  const removedComs = useAtomValue(removedCompositionsAtom);
  const [isOpenPlayer, setIsOpenPlayer] = useState(false);
  const connectionNode = useConnectionState('m-2');
  const navigate = useNavigate();
  const checkAccess = useCheckUserAccessRightsInScope();
  const TabComponent =
    (tab &&
      cmEditorComTabCompositionNavs[tab].checkTabAccess(checkAccess) &&
      cmEditorComTabCompositionNavs[tab]?.Component) ||
    cmEditorComTabCompositionNavs.watch.Component;

  useCmEditorCompositionTrySendAudioMarks();

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          if (!ccom && (mylib.isNaN(ccomw) || removedComs[ccomw] == null)) navigate({ to: '/cm/edit/coms' });
        }, 2500),
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
            kind={isOpenPlayer ? 'SolidRounded' : undefined}
            className="m-2"
            onClick={() => setIsOpenPlayer(!isOpenPlayer)}
          />
        </>
      }
      content={
        <>
          {mylib.isNaN(ccomw) || <CmEditorCompositionBusyInfo comw={ccomw} />}

          <div className="flex justify-around gap-x-2 px-2 sticky nav-panel overflow-auto no-scrollbar">
            {MyLib.entries(cmEditorComTabCompositionNavs).map(([tab, { icon, checkTabAccess }]) => {
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
              <CmComAudioPlayer audioLinks={ccom.audio} />
            </div>
          )}
          <StyledOutlet>{TabComponent && <TabComponent ccom={ccom} />}</StyledOutlet>
        </>
      }
    />
  );
};

const StyledOutlet = styled.div``;

const StyledContainer = styled(PageCmEditorContainer)`
  &:has(${StyledCmEditorCompositionIsThereOtherFirstRedactorUserDetect}) ${StyledOutlet} {
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
