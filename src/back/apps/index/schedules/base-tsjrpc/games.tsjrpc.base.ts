import { makeTwiceKnownName } from 'back/complect/makeTwiceKnownName';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  IScheduleWidgetTeamCriteria,
  IScheduleWidgetTeamGame,
  IScheduleWidgetTeamGameMi,
  ScheduleGameCriteriaScopeProps,
  ScheduleGameScopeProps,
} from 'shared/api';
import { SchGamesTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { smylib } from 'shared/utils';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

export const schGamesTsjrpcBaseServer = new (class SchGames extends TsjrpcBaseServer<SchGamesTsjrpcMethods> {
  constructor() {
    const modifyGame = <Props extends { props: ScheduleGameScopeProps }>(
      modifier: (game: IScheduleWidgetTeamGame, props: Props) => void,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const game = sch.games?.list.find(game => game.mi === props.props.gameMi);
        if (game == null) throw new Error('game not found');
        modifier(game, props);
      });

    const modifyCriteria = <Props extends { props: ScheduleGameCriteriaScopeProps }>(
      modifier: (criteria: IScheduleWidgetTeamCriteria, props: Props) => void,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const criteria = sch.games?.criterias[props.props.criteriai];
        if (criteria == null) throw new Error('criteria not found');
        modifier(criteria, props);
      });

    super({
      scope: 'SchGames',
      methods: {
        addGame: modifySchedule(false, sch => {
          sch.games ??= { criterias: [], list: [] };
          sch.games.list.push({
            title: `Игра ${sch.games.list.length + 1}`,
            mi: smylib.takeNextMi(sch.games.list, IScheduleWidgetTeamGameMi.def),
            teams: [],
          });
        }),

        setTeams: modifyGame((game, { value }) => {
          let mi = 0;

          game.teams = value.map(({ users }) => {
            return {
              mi: mi++,
              users,
              title: makeTwiceKnownName(),
            };
          });
        }),

        setTitle: modifyGame((game, { value }) => (game.title = value)),

        addCriteria: modifySchedule(false, sch => {
          sch.games ??= { criterias: [], list: [] };
          sch.games.criterias.push({ title: `Критерий ${sch.games.criterias.length + 1}`, sorts: {} as never });
        }),

        setCriteriaTitle: modifyCriteria((criteria, { value }) => (criteria.title = value)),
        setSortedDict: modifyCriteria((criteria, { value }) => (criteria.sorts = { ...criteria.sorts, ...value })),

        toggleStrikedUser: modifySchedule(false, (sch, { userMi }) => {
          sch.games ??= { criterias: [], list: [] };
          const userSet = new Set((sch.games.strikedUsers ??= []));

          if (userSet.has(userMi)) userSet.delete(userMi);
          else userSet.add(userMi);

          sch.games.strikedUsers = Array.from(userSet);
        }),
      },
      onEachFeedback: {
        addCriteria: (_, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} добавлен новый критерий сортировки для игр`,
        addGame: (_, sch) => `В расписании ${scheduleTitleInBrackets(sch)} добавлена новая игра`,
        setTeams: (_, sch) => `В расписании ${scheduleTitleInBrackets(sch)} сформированы команды`,
        setTitle: ({ value, prevTitle }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} игра "${prevTitle}" переименована на "${value}"`,
        setCriteriaTitle: ({ value, prevTitle }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} критерий сортировки для игр ` +
          `"${prevTitle}" переименован на "${value}"`,
        setSortedDict: ({ criteriaTitle }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для критерия сортировки игр ` +
          `"${criteriaTitle}" отсортированы участники`,
        toggleStrikedUser: ({ userMi, userName }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} участник ${userName} ` +
          `${sch.games?.strikedUsers?.includes(userMi) ? 'исключён из списка' : 'включён в список'} игроков`,
      },
    });
  }
})();
