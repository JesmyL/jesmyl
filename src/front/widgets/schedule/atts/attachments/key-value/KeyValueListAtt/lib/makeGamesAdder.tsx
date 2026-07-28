import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ScheduleWidgetRights } from '#widgets/schedule/useScheduleWidget';
import { makeRegExp } from 'regexpert';
import {
  customAttUseRights,
  CustomAttUseRights,
  CustomAttUseTaleId,
  IScheduleWidgetTeamGame,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleWidgetAppAttCustomizableValueItem,
  ScheduleWidgetAppAttCustomized,
} from 'shared/api';
import { itIt } from 'shared/utils';
import { checkIsArray, checkIsNumber, checkIsString } from 'shared/utils/checkIs';
import { textToUpperCase } from 'shared/utils/string.utils';

export const scheduleWidgetKeyValueListAttMakeGamesAdder = (
  att: ScheduleWidgetAppAttCustomized,
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps,
  rights: ScheduleWidgetRights,
  exclusiveGames: IScheduleWidgetTeamGame[] | und,
) => {
  const subItems: (item: ScheduleWidgetAppAttCustomizableValueItem) => React.ReactNode = ([key, value, itemMi]) => {
    if (!checkIsNumber(key) || !checkIsArray(value) || rights.schedule.games == null) return;
    const gameMi = key - CustomAttUseTaleId.Games;

    const game = rights.schedule.games.list.find(game => game.mi === gameMi);
    if (game == null) return;

    return (
      <>
        {game.teams.map(team => {
          if (value.some(val => (checkIsString(val) ? makeRegExp(`/${team.title}/i`).test(val) : false))) return null;

          return (
            <div key={team.mi}>
              <TheIconSendButton
                icon="PlusSign"
                prefix={team.title}
                onSend={() => {
                  return schDayEventsTsjrpcClient.addKeyValueAttachmentListItem({
                    props: dayEventAttScopeProps,
                    itemMi,
                    value:
                      `####${textToUpperCase(team.title)}\n\n+ ` +
                      team.users
                        .map(({ mi }) => rights.schedule.ctrl.users.find(user => user.mi === mi)?.fio ?? '')
                        .filter(itIt)
                        .join('\n+ '),
                  });
                }}
              />
            </div>
          );
        })}
      </>
    );
  };

  const games = exclusiveGames
    ?.map(game => {
      return (
        <div
          key={game.mi}
          className="flex gap-2 my-2"
        >
          {customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.CheckGames) ? (
            <>
              <LazyIcon icon="CheckmarkSquare02" />
              <LazyIcon icon="Basketball01" />
              {game.title}
              <TheIconSendButton
                icon="PlusSign"
                onSend={() =>
                  schDayEventsTsjrpcClient.putKeyValueAttachment({
                    props: dayEventAttScopeProps,
                    key: false,
                    value: game.mi + CustomAttUseTaleId.Games,
                  })
                }
              />
            </>
          ) : (
            <>
              <LazyIcon icon="Basketball01" />
              {game.title}
              <TheIconSendButton
                icon="PlusSign"
                onSend={() =>
                  schDayEventsTsjrpcClient.putKeyValueAttachment({
                    props: dayEventAttScopeProps,
                    key: game.mi + CustomAttUseTaleId.Games,
                    value: [],
                  })
                }
              />
            </>
          )}
        </div>
      );
    })
    .filter(itIt);

  return { games, subItems };
};
