import { makeTwiceKnownName } from 'back/complect/makeTwiceKnownName';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  IScheduleWidget,
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
      modifier: (game: IScheduleWidgetTeamGame, props: Props, sch: IScheduleWidget) => string | null,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const game = sch.games?.list.find(game => game.mi === props.props.gameMi);
        if (game == null) throw new Error('game not found');

        return modifier(game, props, sch);
      });

    const modifyCriteria = <Props extends { props: ScheduleGameCriteriaScopeProps }>(
      modifier: (criteria: IScheduleWidgetTeamCriteria, props: Props, sch: IScheduleWidget) => string | null,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const criteria = sch.games?.criterias[props.props.criteriai];
        if (criteria == null) throw new Error('criteria not found');

        return modifier(criteria, props, sch);
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

          return `В расписании ${scheduleTitleInBrackets(sch)} добавлена новая игра`;
        }),

        setTeams: modifyGame((game, { value }, sch) => {
          let mi = 0;

          game.teams = value.map(({ users }) => {
            return {
              mi: mi++,
              users,
              title: makeTwiceKnownName(),
            };
          });

          return `В расписании ${scheduleTitleInBrackets(sch)} сформированы команды`;
        }),

        setTitle: modifyGame((game, { value, prevTitle }, sch) => {
          game.title = value;

          return `В расписании ${scheduleTitleInBrackets(sch)} игра "${prevTitle}" переименована на "${value}"`;
        }),

        addCriteria: modifySchedule(false, sch => {
          sch.games ??= { criterias: [], list: [] };
          sch.games.criterias.push({ title: `Критерий ${sch.games.criterias.length + 1}`, sorts: {} as never });

          return `В расписании ${scheduleTitleInBrackets(sch)} добавлен новый критерий сортировки для игр`;
        }),

        setCriteriaTitle: modifyCriteria((criteria, { value, prevTitle }, sch) => {
          criteria.title = value;

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} критерий сортировки для игр ` +
            `"${prevTitle}" переименован на "${value}"`
          );
        }),
        setSortedDict: modifyCriteria((criteria, { value, criteriaTitle }, sch) => {
          criteria.sorts = { ...criteria.sorts, ...value };

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} для критерия сортировки игр ` +
            `"${criteriaTitle}" отсортированы участники`
          );
        }),

        toggleStrikedUser: modifySchedule(false, (sch, { userMi, userName }) => {
          sch.games ??= { criterias: [], list: [] };
          const userSet = new Set((sch.games.strikedUsers ??= []));

          if (userSet.has(userMi)) userSet.delete(userMi);
          else userSet.add(userMi);

          sch.games.strikedUsers = Array.from(userSet);

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} участник ${userName} ` +
            `${sch.games?.strikedUsers?.includes(userMi) ? 'исключён из списка' : 'включён в список'} игроков`
          );
        }),
      },
    });
  }
})();
