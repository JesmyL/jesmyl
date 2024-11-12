import { mylib } from 'front/utils';
import { useEffect, useState } from 'react';
import { IScheduleWidgetExportableTeam, IScheduleWidgetUserMi } from 'shared/api';
import Dropdown from '../../../../../dropdown/Dropdown';
import KeyboardInput from '../../../../../keyboard/KeyboardInput';
import StrongButton from '../../../../../strong-control/StrongButton';
import { IconCheckmarkCircle02StrokeRounded } from '../../../../../the-icon/icons/checkmark-circle-02';
import { IconCircleStrokeRounded } from '../../../../../the-icon/icons/circle';
import { useScheduleWidgetRightsContext } from '../../../../useScheduleWidget';
import ScheduleWidgetRemovableUserFace from '../../RemovableUserFace';
import { useSchWGameContext, useSchWGameScopeContext } from '../Games';

const arrayMapper = () => [];
const retriesLine = [40, 100, 200, 300, 600, 1000, 2000, 5000, 20000, 100000];
const defStrikedUsers: IScheduleWidgetUserMi[] = [];

export default function ScheduleWidgetTeamGameSetTeamsScreen() {
  const rights = useScheduleWidgetRightsContext();
  const gameScope = useSchWGameScopeContext();
  const game = useSchWGameContext();

  const criterias = rights.schedule.games?.criterias;
  const schUsers = rights.schedule.ctrl.users;
  const [teamsCountStr, setTeamsCount] = useState('4');
  const [criteriai, setCriteriai] = useState(0);
  const [teams, setTeams] = useState<IScheduleWidgetExportableTeam[]>([]);
  const [diapason, setDiapason] = useState(0);
  const [retries, setRetries] = useState(retriesLine[1]);
  const [isRecompute, setIsRecompute] = useState(false);

  const strikedUsers = rights.schedule.games?.strikedUsers ?? defStrikedUsers;

  useEffect(() => {
    const teamsCount = +teamsCountStr;
    const criteria = criterias?.[criteriai].sorts;

    const users = rights.schedule.ctrl.users;

    if (teamsCount === 0 || teamsCount > users.length - 1 || criteria == null) return;

    setIsRecompute(true);

    return hookEffectLine()
      .setTimeout(() => {
        const sortedUsers = rights.schedule.ctrl.users
          .filter(user => criteria[user.mi] !== undefined && !strikedUsers.includes(user.mi))
          .sort((a, b) => criteria[a.mi] - criteria[b.mi])
          .map(user => user.mi);

        let teamsNumbers: IScheduleWidgetUserMi[][] = Array.from({ length: teamsCount }, () => []);
        const mapToPower = (team: IScheduleWidgetUserMi[]) =>
          team.reduce((sum, userMi) => sum + criteria[userMi] + 1, 0);

        const diffMap = new Map<number, number[][]>();
        const arrayImage = { length: teamsCount };

        const setInDiffMap = () => {
          const teams: number[][] = Array.from(arrayImage, arrayMapper);
          const randomUsers = mylib.toRandomSorted(sortedUsers);

          for (let i = 0; i < randomUsers.length; i++) {
            teams[i % teamsCount].push(randomUsers[i]);
          }

          const teamPowers = teams.map(mapToPower);
          diffMap.set(Math.max(...teamPowers) - Math.min(...teamPowers), teams);
        };

        for (let i = 0; i < retries; i++) setInDiffMap();

        const min = Math.min(...Array.from(diffMap.keys()));

        teamsNumbers = diffMap.get(min)!;
        setDiapason(min);

        const teams: { users: { mi: IScheduleWidgetUserMi; p: number }[] }[] = teamsNumbers.map(team => ({
          users: team.map(mi => ({ mi, p: criteria[mi] })),
        }));

        setTeams(teams);
        setIsRecompute(false);
      }, 700)
      .effect();
  }, [criteriai, criterias, retries, rights.schedule.ctrl.users, strikedUsers, teamsCountStr]);

  return (
    <>
      <h3>
        Составляем новые команды для игры <span className="color--7">{game.title}</span>
      </h3>
      {criterias && (
        <div className="margin-gap-v margin-giant-gap-b">
          Критерий сортировки
          <Dropdown
            id={criteriai}
            items={criterias.map(({ title }, id) => ({ id, title }))}
            onSelectId={setCriteriai}
          />
        </div>
      )}
      <div className="margin-giant-gap-b">
        Количество команд
        <KeyboardInput
          value={teamsCountStr}
          type="number"
          onChange={setTeamsCount}
        />
      </div>
      <div className="flex between full-width margin-gap-b">
        Точность сортировки
        {retriesLine.map(rate => {
          return (
            <div
              key={rate}
              className="pointer"
              onClick={() => setRetries(rate)}
            >
              {retries === rate ? <IconCheckmarkCircle02StrokeRounded /> : <IconCircleStrokeRounded />}
            </div>
          );
        })}
      </div>

      <div className="margin-big-gap">
        {strikedUsers.map(mi => {
          const user = schUsers.find(user => user.mi === mi);

          return (
            user && (
              <ScheduleWidgetRemovableUserFace
                key={user.mi}
                user={user}
                isStriked
              />
            )
          );
        })}
      </div>

      <h3>Команды</h3>
      {isRecompute ? (
        <div className="margin-giant-gap-v">Перераспределяю...</div>
      ) : (
        <>
          <h4>Разбег между командами - {diapason}</h4>

          {teams.map((team, teami) => {
            return (
              <div
                key={teami}
                className="margin-giant-gap-v"
              >
                <h3>Команда {teami + 1}</h3>
                {team.users.map(({ mi }) => {
                  const user = schUsers.find(user => user.mi === mi);

                  return (
                    user && (
                      <ScheduleWidgetRemovableUserFace
                        key={user.mi}
                        user={user}
                      />
                    )
                  );
                })}
              </div>
            );
          })}
          <StrongButton
            scope={gameScope}
            title="Отправить"
            disabled={!criterias?.length || !teams.length}
            confirm="Отправить список команд?"
            fieldName="teams"
            fieldValue={teams}
          />
        </>
      )}
    </>
  );
}
