import { TheIconSendButton } from '#shared/ui/sendable/TheIconSendButton';

type Props = {
  disabled: boolean;
  isNeedInform: boolean;
  onSend: (value: num) => Promise<unknown>;
};

export const DayEventIsNeedTgInformButton = ({ disabled, isNeedInform, onSend }: Props) => {
  return (
    <TheIconSendButton
      disabled={disabled}
      icon={isNeedInform ? 'NotificationOff01' : 'Notification01'}
      postfix={isNeedInform ? 'TG-Напоминания не будет' : 'TG-Напоминание будет'}
      onSend={() => onSend(isNeedInform ? 1 : 0)}
    />
  );
};
