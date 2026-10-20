import { translateBase } from '#basis/locale';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { IScheduleWidget, ScheduleScopeProps } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { schGeneralTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
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
    <TheIconSendButton
      icon="NotificationOff01"
      postfix={translateBase(BaseLocaleKey.ScheduleDontInformMeTelegram)}
      className="mb-2"
      onSend={() => schGeneralTsjrpcClient.setIsTgInformMe({ props: scheduleScopeProps, type: 1 })}
    />
  ) : (
    <TheIconSendButton
      icon="Notification01"
      postfix={translateBase(BaseLocaleKey.ScheduleInformMeTelegram)}
      className="mb-2"
      onSend={() => schGeneralTsjrpcClient.setIsTgInformMe({ props: scheduleScopeProps, type: 0 })}
    />
  );
};
