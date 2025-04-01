import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { IScheduleWidget, ScheduleScopeProps } from 'shared/api';
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
    <TheIconSendButton
      icon="NotificationOff01"
      postfix="Не оповещать меня о событиях в TG"
      className="margin-gap-b"
      onSend={() => schGeneralSokiInvocatorClient.setIsTgInformMe({ props: scheduleScopeProps, type: 1 })}
    />
  ) : (
    <TheIconSendButton
      icon="Notification01"
      postfix="Оповещать меня о событиях в TG"
      className="margin-gap-b"
      onSend={() => schGeneralSokiInvocatorClient.setIsTgInformMe({ props: scheduleScopeProps, type: 0 })}
    />
  );
};
