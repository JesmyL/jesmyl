import { translateBase } from '#basis/locale';
import { useAppNameContext } from '#basis/state/contexts';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { useAuth } from '$index/shared/state';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useNavigate } from '@tanstack/react-router';
import { makeRegExp } from 'regexpert';
import { useEffect, useState } from 'react';
import { Bool } from 'shared/enums';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { checkIsObject } from 'shared/utils/checkIs';
import { toast } from 'sonner';

const vapidBase64SymbolsReg = makeRegExp('/[-_]/g');

const toApplicationServerKey = (vapidPublicKey: string) => {
  const padding = '='.repeat((4 - (vapidPublicKey.length % 4)) % 4);
  const base64 = (vapidPublicKey + padding).replace(vapidBase64SymbolsReg, symbol => (symbol === '-' ? '+' : '/'));

  return Uint8Array.from(atob(base64), symbol => symbol.charCodeAt(0));
};

const takePushRegistration = async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) return null;

  return await navigator.serviceWorker.ready;
};

/** Some browsers (legacy Safari, WebView shells) only call the permission callback and return `undefined`. */
const requestNotificationPermission = () =>
  new Promise<NotificationPermission>(resolve => {
    const requestResult: unknown = Notification.requestPermission(resolve);

    if (requestResult instanceof Promise)
      void requestResult.then(resolve, () => resolve(Notification.permission));
    else setTimeout(resolve, 0, Notification.permission);
  });

/** The awaited/current permission drives the branch; a request is made only while the permission is still undecided. */
const takeNotificationPermission = async (): Promise<NotificationPermission> => {
  const currentPermission = Notification.permission;

  if (currentPermission !== 'default') return currentPermission;

  return await requestNotificationPermission();
};

const checkIsPermissionDeniedError = (error: unknown) =>
  checkIsObject(error) && (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError');

export function ScheduleWidgetAppInformButton() {
  const appName = useAppNameContext();
  const navigate = useNavigate();
  const auth = useAuth();
  const [isSubscribed, setIsSubscribed] = useState<Bool | null>(null);

  useEffect(() => {
    let isMounted = true;

    void takePushRegistration()
      .then(async registration => {
        if (registration === null) return;

        const subscription = await registration.pushManager.getSubscription();
        if (isMounted) setIsSubscribed(subscription ? Bool.True : Bool.False);
      })
      .catch(() => {
        if (isMounted) setIsSubscribed(Bool.False);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!auth.login || isSubscribed === null) return null;

  const showPushPermissionDeniedToast = () =>
    toast(translateBase(BaseLocaleKey.SchedulePushPermissionDenied), {
      ...makeToastKOMoodConfig(),
      action: {
        label: translateBase(BaseLocaleKey.Settings),
        onClick: () => void navigate({ to: '/!other/$appName/settings', params: { appName } }),
      },
    });

  const enable = async () => {
    if ((await takeNotificationPermission()) === 'denied') return showPushPermissionDeniedToast();

    const registration = await takePushRegistration();
    if (registration === null) throw translateBase(BaseLocaleKey.SchedulePushSubscribeError);

    const vapidPublicKey = await indexTsjrpcClientMethods.getPushVapidPublicKey();
    const existingSubscription = await registration.pushManager.getSubscription();

    if (existingSubscription) await existingSubscription.unsubscribe();

    /** A still-undecided permission after the request is left to the subscribe prompt — it must not be reported as a denial. */
    const subscription = await registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: toApplicationServerKey(vapidPublicKey),
      })
      .catch((error: unknown) => {
        if (checkIsPermissionDeniedError(error)) return null;

        throw translateBase(BaseLocaleKey.SchedulePushSubscribeError);
      });

    if (subscription === null) return showPushPermissionDeniedToast();

    const { endpoint, keys } = subscription.toJSON();

    if (!endpoint || !keys?.p256dh || !keys.auth)
      throw translateBase(BaseLocaleKey.SchedulePushSubscribeError);

    await indexTsjrpcClientMethods.subscribePush({
      subscription: { endpoint, keys: { p256dh: keys.p256dh, auth: keys.auth } },
    });
    setIsSubscribed(Bool.True);
  };

  const disable = async () => {
    const registration = await takePushRegistration();
    const subscription = await registration?.pushManager.getSubscription();

    if (!subscription) {
      setIsSubscribed(Bool.False);
      return;
    }

    const { endpoint } = subscription;

    await subscription.unsubscribe();
    await indexTsjrpcClientMethods.unsubscribePush({ endpoint });
    setIsSubscribed(Bool.False);
  };

  const isOn = isSubscribed === Bool.True;
  const toggle = () =>
    void (isOn ? disable() : enable()).catch(error => toast(error, makeToastKOMoodConfig()));

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
