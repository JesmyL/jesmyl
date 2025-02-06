import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { IconNotification01StrokeRounded } from 'front/complect/the-icon/icons/notification-01';
import { IconNotificationOff01StrokeRounded } from 'front/complect/the-icon/icons/notification-off-01';

type Props = {
  disabled: boolean;
  isNeedInform: boolean;
  onSend: (value: num) => Promise<unknown>;
};

export const DayEventIsNeedTgInformButton = ({ disabled, isNeedInform, onSend }: Props) => {
  return (
    <EvaSendButton
      disabled={disabled}
      Icon={isNeedInform ? IconNotificationOff01StrokeRounded : IconNotification01StrokeRounded}
      postfix={isNeedInform ? 'TG-Напоминания не будет' : 'TG-Напоминание будет'}
      onSend={() => onSend(isNeedInform ? 1 : 0)}
    />
  );
};
