import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { IScheduleWidget, ScheduleScopeProps } from 'shared/api';
import { IconNotification01StrokeRounded } from '../../../complect/the-icon/icons/notification-01';
import { IconNotificationOff01StrokeRounded } from '../../../complect/the-icon/icons/notification-off-01';
import { schGeneralSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRights } from '../useScheduleWidget';

export const ScheduleWidgetMyUserTgInform = ({
  schedule,
  scheduleScopeProps,
}: {
  schedule: IScheduleWidget;
  scheduleScopeProps: ScheduleScopeProps;
}) => {
  const rights = useScheduleWidgetRights(schedule);
  if (rights.myUser === undefined || rights.auth.tgId === undefined) return;

  return rights.myUser.tgInform === 0 ? (
    <EvaSendButton
      Icon={IconNotificationOff01StrokeRounded}
      postfix="Не оповещать меня о событиях в TG"
      className="margin-gap-b"
      onSend={() => schGeneralSokiInvocatorClient.setIsTgInformMe(null, scheduleScopeProps, 1)}
    />
  ) : (
    <EvaSendButton
      Icon={IconNotification01StrokeRounded}
      postfix="Оповещать меня о событиях в TG"
      className="margin-gap-b"
      onSend={() => schGeneralSokiInvocatorClient.setIsTgInformMe(null, scheduleScopeProps, 0)}
    />
  );
};
