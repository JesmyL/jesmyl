import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/useScheduleWidget';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useScheduleGameContext } from '../lib/contexts';

export const ScheduleWidgetTeamGamePrintTeamsButton = function PrintTeamsButton() {
  const rights = useScheduleWidgetRightsContext();

  const [isOpenPrint, setIsOpenPrint] = useState(false);
  const game = useScheduleGameContext();
  const [cols, setCols] = useState(Math.floor(game.teams.length / 2));

  return (
    <>
      {isOpenPrint && (
        <StyledFull onClose={setIsOpenPrint}>
          <StyledButtons className="flex full-width around">
            <TheIconButton
              icon="DashboardSquareRemove"
              disabled={cols < 2}
              onClick={() => setCols(cols - 1)}
            />
            <TheIconButton
              icon="DashboardSquareAdd"
              disabled={game.teams.length <= cols}
              onClick={() => setCols(cols + 1)}
            />
          </StyledButtons>
          {game.teams.map((team, teami) => {
            return (
              <React.Fragment key={team.mi}>
                <div className="inline-block margin-big-gap-r vertical-top">
                  <h2>{team.title}</h2>
                  {team.users.map(({ mi }) => {
                    const user = rights.schedule.ctrl.users.find(user => user.mi === mi);

                    return user && <div key={mi}>{user.fio}</div>;
                  })}
                </div>
                {(teami + 1) % cols ? null : <br />}
              </React.Fragment>
            );
          })}
        </StyledFull>
      )}
      <LazyIcon
        icon="Printer"
        onClick={event => {
          event.stopPropagation();
          setIsOpenPrint(true);
        }}
      />
    </>
  );
};

const hideOnPrintCss = css`
  @media print {
    & {
      display: none !important;
    }
  }
`;

const StyledButtons = styled.div`
  ${hideOnPrintCss}
`;

const StyledFull = styled(FullContent)`
  --current-bg: white;

  color: black;
`;
