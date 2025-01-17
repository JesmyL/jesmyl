import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { IScheduleWidget, ScheduleScopeProps } from 'shared/api';
import { IconNotification01StrokeRounded } from '../../../complect/the-icon/icons/notification-01';
import { IconNotificationOff01StrokeRounded } from '../../../complect/the-icon/icons/notification-off-01';
import { schSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRights } from '../useScheduleWidget';

export const ScheduleWidgetMyUserTgInform = ({
  scope,
  schedule,
  scheduleScopeProps,
}: {
  scope: string;
  schedule: IScheduleWidget;
  scheduleScopeProps: ScheduleScopeProps;
}) => {
  const rights = useScheduleWidgetRights(schedule);
  if (rights.myUser === undefined) return;
  if (rights.auth.tgId === undefined) return;

  return rights.myUser.tgInform === 0 ? (
    <EvaSendButton
      Icon={IconNotificationOff01StrokeRounded}
      postfix="Не оповещать меня о событиях в TG"
      className="margin-gap-b"
      // onSend={() => schSokiInvocatorClient.toggleIsNotifyMeInTg(null, scheduleScopeProps, 1)}
      onSend={() => schSokiInvocatorClient.oooooooooooooooooooooooooooooooooooooo(null, scheduleScopeProps, 1)}
    />
  ) : (
    <EvaSendButton
      Icon={IconNotification01StrokeRounded}
      postfix="Оповещать меня о событиях в TG"
      className="margin-gap-b"
      // onSend={() => schSokiInvocatorClient.toggleIsNotifyMeInTg(null, scheduleScopeProps, 0)}
      onSend={() => schSokiInvocatorClient.oooooooooooooooooooooooooooooooooooooo(null, scheduleScopeProps, 0)}
    />
  );
};
