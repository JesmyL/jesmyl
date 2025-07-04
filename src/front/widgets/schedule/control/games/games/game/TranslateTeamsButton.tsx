import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { ScheduleWidgetMarkdownTranslation } from '#widgets/schedule/live-translations/markdown/Translation';
import { atom } from 'atomaric';
import { useMemo, useState } from 'react';
import { useScheduleGameContext } from '../lib/contexts';

const isOpenFullContentAtom = atom(false);

export const ScheduleWidgetTeamGameTranslateTeamsButton = function TranslateTeamsButton() {
  const rights = useScheduleWidgetRightsContext();

  const game = useScheduleGameContext();
  const [cols, setCols] = useState(Math.floor(game.teams.length / 2));

  const grid: string = useMemo(() => {
    let grid = `| |\n| :-: |\n| <h1>Игра <span className="color--7">${game.title}</span></h1> |\n\n`;
    const scheduleUsers = rights.schedule.ctrl.users;
    let limit = 1000000;

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
          if (--limit < 0) break addUsers;
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
      <LazyIcon
        icon="TvSmart"
        onClick={event => {
          event.stopPropagation();
          isOpenFullContentAtom.set(true);
        }}
      />

      <FullContent openAtom={isOpenFullContentAtom}>
        <div className="flex full-width around">
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
        </div>
        <ScheduleWidgetMarkdownTranslation md={grid} />
      </FullContent>
    </>
  );
};
