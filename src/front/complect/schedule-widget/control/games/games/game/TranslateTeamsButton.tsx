import { useMemo, useState } from 'react';
import { FullContent } from '../../../../../fullscreen-content/FullContent';
import IconButton from '../../../../../the-icon/IconButton';
import { IconDashboardSquareAddStrokeRounded } from '../../../../../the-icon/icons/dashboard-square-add';
import { IconDashboardSquareRemoveStrokeRounded } from '../../../../../the-icon/icons/dashboard-square-remove';
import { IconTvSmartStrokeRounded } from '../../../../../the-icon/icons/tv-smart';
import { ScheduleWidgetMarkdownTranslation } from '../../../../live-translations/markdown/Translation';
import { useScheduleWidgetRightsContext } from '../../../../useScheduleWidget';
import { useSchWGameContext } from '../Games';

export const ScheduleWidgetTeamGameTranslateTeamsButton = function TranslateTeamsButton() {
  const rights = useScheduleWidgetRightsContext();

  const [isOpenFull, setIsOpenFull] = useState(false);
  const game = useSchWGameContext();
  const [cols, setCols] = useState(Math.floor(game.teams.length / 2));

  const grid: string = useMemo(() => {
    let grid = `| |\n| :-: |\n| <h1>Игра <span className="color--7">${game.title}</span></h1> |\n\n`;
    const scheduleUsers = rights.schedule.ctrl.users;

    for (let rowi = 0; rowi < game.teams.length; rowi += cols) {
      if (rowi === 0) {
        for (let coli = 0; coli < cols; coli++) {
          grid += `${coli === 0 ? '|' : ''}  |`;
        }
        grid += '\n';

        for (let coli = 0; coli < cols; coli++) {
          grid += `${coli === 0 ? '|' : ''} :-: |`;
        }
        grid += '\n';
      }

      for (let coli = 0; coli < cols; coli++) {
        const title = game.teams[rowi + coli]?.title;

        grid += `${coli === 0 ? '|' : ''}${title ? ` <h2>${title}</h2>` : ''} |`;
      }

      grid += '\n';

      let useri = 0;

      addUsers: while (true) {
        let noUsersCount = cols;

        for (let coli = 0; coli < cols; coli++) {
          const teamUser = game.teams[rowi + coli]?.users[useri];
          const leftBorder = coli === 0 ? '|' : '';

          if (teamUser === undefined) {
            if (--noUsersCount <= 0) break addUsers;

            grid += `${leftBorder}  |`;
            continue;
          }

          const user = scheduleUsers.find(user => user.mi === teamUser.mi);

          if (user == null) continue;

          grid += `${leftBorder} ${user?.fio ?? ''} |`;
        }

        useri++;
        grid += '\n';
      }

      if (cols > 1) grid += '\n';
    }

    return grid;
  }, [cols, game.teams, game.title, rights.schedule.ctrl.users]);

  return (
    <>
      {isOpenFull && (
        <FullContent onClose={setIsOpenFull}>
          <div className="flex full-width around">
            <IconButton
              Icon={IconDashboardSquareRemoveStrokeRounded}
              disabled={cols < 2}
              onClick={() => setCols(cols - 1)}
            />
            <IconButton
              Icon={IconDashboardSquareAddStrokeRounded}
              disabled={game.teams.length <= cols}
              onClick={() => setCols(cols + 1)}
            />
          </div>
          <ScheduleWidgetMarkdownTranslation md={grid} />
        </FullContent>
      )}
      <IconTvSmartStrokeRounded
        onClick={event => {
          event.stopPropagation();
          setIsOpenFull(true);
        }}
      />
    </>
  );
};
