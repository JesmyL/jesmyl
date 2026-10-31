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

  return (
    <BrutalItem
      iconNode={<LazyIcon icon="Notification01" />}
      title={translateBase(BaseLocaleKey.PushNotifications)}
      onClick={toggle}
      box={<IconCheckbox checked={isSubscribed === Bool.True} />}
    />
  );
}
