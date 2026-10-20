import { translateBase } from '#basis/locale';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

type Props = {
  disabled: boolean;
  isNeedInform: boolean;
  onSend: (value: Bool) => Promise<unknown>;
};

export const DayEventIsNeedTgInformButton = ({ disabled, isNeedInform, onSend }: Props) => {
  return (
    <TheIconSendButton
      disabled={disabled}
      icon={isNeedInform ? 'NotificationOff01' : 'Notification01'}
      postfix={
        isNeedInform
          ? translateBase(BaseLocaleKey.ScheduleTelegramInformWontBe)
          : translateBase(BaseLocaleKey.ScheduleTelegramInformWillBe)
      }
      onSend={() => onSend(isNeedInform ? 1 : 0)}
    />
  );
};
