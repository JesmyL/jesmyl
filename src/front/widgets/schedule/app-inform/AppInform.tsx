import { translateBase } from '#basis/locale';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAuth } from '$index/shared/state';
import { Bool } from 'shared/enums';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { usePushSubscription } from './usePushSubscription';

export function ScheduleWidgetAppInformButton() {
  const auth = useAuth();
  const { isSubscribed, toggle } = usePushSubscription();

  if (!auth.login || isSubscribed === null) return null;

  const isOn = isSubscribed === Bool.True;

  return (
    <BrutalItem
      iconNode={<LazyIcon icon={isOn ? 'NotificationOff01' : 'Notification01'} />}
      title={translateBase(
        isOn ? BaseLocaleKey.ScheduleDontInformMeApp : BaseLocaleKey.ScheduleInformMeApp,
      )}
      onClick={toggle}
      box={<IconCheckbox checked={isOn} />}
    />
  );
}
