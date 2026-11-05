import { backLocaleError } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { makeTwiceKnownName } from 'back/complect/makeTwiceKnownName';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  IScheduleWidget,
  IScheduleWidgetTeamCriteria,
  IScheduleWidgetTeamGame,
  ScheduleGameCriteriaScopeProps,
  ScheduleGameScopeProps,
  ScheduleWidgetTeamGameMi,
} from 'shared/api';
import { SchGamesTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { takeNextMi } from 'shared/utils';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

export const schGamesTsjrpcBaseServer = new (class SchGames extends TsjrpcBaseServer<SchGamesTsjrpcMethods> {
  constructor() {
    const modifyGame = <Props extends { props: ScheduleGameScopeProps }>(
      modifier: (game: IScheduleWidgetTeamGame, props: Props, sch: IScheduleWidget) => PromiseOr<string | null>,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const game = sch.games?.list.find(game => game.mi === props.props.gameMi);
        if (game == null) throw backLocaleError(BackLocaleKey.GameNotFound);

        return modifier(game, props, sch);
      });

    const modifyCriteria = <Props extends { props: ScheduleGameCriteriaScopeProps }>(
      modifier: (criteria: IScheduleWidgetTeamCriteria, props: Props, sch: IScheduleWidget) => PromiseOr<string | null>,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const criteria = sch.games?.criterias[props.props.criteriai];
        if (criteria == null) throw backLocaleError(BackLocaleKey.CriteriaNotFound);

        return modifier(criteria, props, sch);
      });

    super({
      scope: 'SchGames',
      methods: {
        addGame: modifySchedule(false, async sch => {
          sch.games ??= { criterias: [], list: [] };
          sch.games.list.push({
            title: `Игра ${sch.games.list.length + 1}`,
            mi: takeNextMi(sch.games.list, ScheduleWidgetTeamGameMi.def),
            teams: [],
          });

          return backLocaleError(BackLocaleKey.SchGameAdded, { t: await scheduleTitleInBrackets(sch) });
        }),

        setTeams: modifyGame(async (game, { value }, sch) => {
          let mi = 0;

          game.teams = value.map(({ users }) => {
            return {
              mi: mi++,
              users,
              title: makeTwiceKnownName(),
            };
          });

          return backLocaleError(BackLocaleKey.SchGameTeamsFormed, { t: await scheduleTitleInBrackets(sch) });
        }),

        setTitle: modifyGame(async (game, { value, prevTitle }, sch) => {
          game.title = value;

          return backLocaleError(BackLocaleKey.SchGameRenamed, {
            t: await scheduleTitleInBrackets(sch),
            p: prevTitle,
            v: value,
          });
        }),

        addCriteria: modifySchedule(false, async sch => {
          sch.games ??= { criterias: [], list: [] };
          sch.games.criterias.push({ title: `Критерий ${sch.games.criterias.length + 1}`, sorts: {} as never });

          return backLocaleError(BackLocaleKey.SchGameCriteriaAdded, { t: await scheduleTitleInBrackets(sch) });
        }),

        setCriteriaTitle: modifyCriteria(async (criteria, { value, prevTitle }, sch) => {
          criteria.title = value;

          return backLocaleError(BackLocaleKey.SchGameCriteriaRenamed, {
            t: await scheduleTitleInBrackets(sch),
            p: prevTitle,
            v: value,
          });
        }),
        setSortedDict: modifyCriteria(async (criteria, { value, criteriaTitle }, sch) => {
          criteria.sorts = { ...criteria.sorts, ...value };

          return backLocaleError(BackLocaleKey.SchGameCriteriaSorted, {
            t: await scheduleTitleInBrackets(sch),
            c: criteriaTitle,
          });
        }),

        toggleStrikedUser: modifySchedule(false, async (sch, { userMi, userName }) => {
          sch.games ??= { criterias: [], list: [] };
          const userSet = new Set((sch.games.strikedUsers ??= []));

          if (userSet.has(userMi)) userSet.delete(userMi);
          else userSet.add(userMi);

          sch.games.strikedUsers = Array.from(userSet);

          return backLocaleError(BackLocaleKey.SchGamePlayerIncluded, {
            t: await scheduleTitleInBrackets(sch),
            u: userName,
            v: !sch.games.strikedUsers.includes(userMi),
          });
        }),
      },
    });
  }
})();
