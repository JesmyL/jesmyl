import { mylib } from '#shared/lib/my-lib';
import { makeTwiceKnownName } from 'back/complect/makeTwiceKnownName';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import {
  IScheduleWidgetTeamCriteria,
  IScheduleWidgetTeamGame,
  IScheduleWidgetTeamGameMi,
  ScheduleGameCriteriaScopeProps,
  ScheduleGameScopeProps,
} from 'shared/api';
import { SchGamesSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general-invocators.base';

class SchGamesSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchGamesSokiInvocatorMethods> {
  constructor() {
    super(
      'SchGamesSokiInvocatorBaseServer',
      {
        addGame: () => props =>
          modifySchedule(false, props, sch => {
            sch.games ??= { criterias: [], list: [] };
            sch.games.list.push({
              title: `Игра ${sch.games.list.length + 1}`,
              mi: mylib.takeNextMi(sch.games.list, IScheduleWidgetTeamGameMi.def),
              teams: [],
            });
          }),

        setTeams: () =>
          this.modifyGame((game, teams) => {
            let mi = 0;

            game.teams = teams.map(({ users }) => {
              return {
                mi: mi++,
                users,
                title: makeTwiceKnownName(),
              };
            });
          }),

        setTitle: () => this.modifyGame((game, value) => (game.title = value)),

        addCriteria: () => props =>
          modifySchedule(false, props, sch => {
            sch.games ??= { criterias: [], list: [] };
            sch.games.criterias.push({ title: `Критерий ${sch.games.criterias.length + 1}`, sorts: {} as never });
          }),

        setCriteriaTitle: () => this.modifyCriteria((criteria, value) => (criteria.title = value)),
        setSortedDict: () =>
          this.modifyCriteria((criteria, value) => (criteria.sorts = { ...criteria.sorts, ...value })),

        toggleStrikedUser: () => (props, userMi) =>
          modifySchedule(false, props, sch => {
            sch.games ??= { criterias: [], list: [] };
            const userSet = new Set((sch.games.strikedUsers ??= []));

            if (userSet.has(userMi)) userSet.delete(userMi);
            else userSet.add(userMi);

            sch.games.strikedUsers = Array.from(userSet);
          }),
      },
      {
        addCriteria: sch => `В расписании ${scheduleTitleInBrackets(sch)} добавлен новый критерий сортировки для игр`,
        addGame: sch => `В расписании ${scheduleTitleInBrackets(sch)} добавлена новая игра`,
        setTeams: sch => `В расписании ${scheduleTitleInBrackets(sch)} сформированы команды`,
        setTitle: (sch, _, value, prevTitle) =>
          `В расписании ${scheduleTitleInBrackets(sch)} игра "${prevTitle}" переименована на "${value}"`,
        setCriteriaTitle: (sch, _, value, prevTitle) =>
          `В расписании ${scheduleTitleInBrackets(sch)} критерий сортировки для игр ` +
          `"${prevTitle}" переименован на "${value}"`,
        setSortedDict: (sch, _, __, criteriaTitle) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для критерия сортировки игр ` +
          `"${criteriaTitle}" отсортированы участники`,
        toggleStrikedUser: (sch, _, userMi, userName) =>
          `В расписании ${scheduleTitleInBrackets(sch)} участник ${userName} ` +
          `${sch.games?.strikedUsers?.includes(userMi) ? 'исключён из списка' : 'включён в список'} игроков`,
      },
    );
  }

  private modifyGame =
    <Value>(modifier: (game: IScheduleWidgetTeamGame, value: Value) => void) =>
    (props: ScheduleGameScopeProps, value: Value) =>
      modifySchedule(false, props, sch => {
        const game = sch.games?.list.find(game => game.mi === props.gameMi);
        if (game == null) throw new Error('game not found');
        modifier(game, value);
      });

  private modifyCriteria =
    <Value>(modifier: (criteria: IScheduleWidgetTeamCriteria, value: Value) => void) =>
    (props: ScheduleGameCriteriaScopeProps, value: Value) =>
      modifySchedule(false, props, sch => {
        const criteria = sch.games?.criterias[props.criteriai];
        if (criteria == null) throw new Error('criteria not found');
        modifier(criteria, value);
      });
}

export const schGamesSokiInvocatorBaseServer = new SchGamesSokiInvocatorBaseServer();
