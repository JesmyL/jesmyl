import { translateBase } from '#basis/locale';
import { useAppNameContext } from '#basis/state/contexts';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
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

export const usePushSubscription = () => {
  const appName = useAppNameContext();
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState<Bool | null>(null);
  const [mutedUntil, setMutedUntilState] = useState<number | nil>(null);
  const [isSilent, setIsSilentState] = useState<Bool>(Bool.False);

  useEffect(() => {
    let isMounted = true;

    void takePushRegistration()
      .then(async registration => {
        if (registration === null) return;

        const subscription = await registration.pushManager.getSubscription();
        const settings = await indexTsjrpcClientMethods.getPushSettings().catch(() => null);
        if (!isMounted) return;

        setIsSubscribed(subscription ? Bool.True : Bool.False);

        if (settings) {
          setMutedUntilState(settings.mutedUntil);
          setIsSilentState(settings.isSilent);
        }
      })
      .catch(() => {
        if (isMounted) setIsSubscribed(Bool.False);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const showPushPermissionDeniedToast = () =>
    toast(translateBase(BaseLocaleKey.SchedulePushPermissionDenied), {
      ...makeToastKOMoodConfig(),
      action: {
        label: translateBase(BaseLocaleKey.Settings),
        onClick: () => void navigate({ to: '/!other/$appName/settings', params: { appName } }),
      },
    });

  /** Resolves to whether notifications ended up enabled; every undecided/denied case reports itself. */
  const enable = async () => {
    if ((await takeNotificationPermission()) === 'denied') {
      showPushPermissionDeniedToast();
      return false;
    }

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

    if (subscription === null) {
      showPushPermissionDeniedToast();
      return false;
    }

    const { endpoint, keys } = subscription.toJSON();

    if (!endpoint || !keys?.p256dh || !keys.auth)
      throw translateBase(BaseLocaleKey.SchedulePushSubscribeError);

    await indexTsjrpcClientMethods.subscribePush({
      subscription: { endpoint, keys: { p256dh: keys.p256dh, auth: keys.auth } },
    });
    setIsSubscribed(Bool.True);

    return true;
  };

  const disable = async () => {
    const registration = await takePushRegistration();
    const subscription = await registration?.pushManager.getSubscription();

    if (!subscription) {
      setIsSubscribed(Bool.False);
      return true;
    }

    const { endpoint } = subscription;

    await subscription.unsubscribe();
    await indexTsjrpcClientMethods.unsubscribePush({ endpoint });
    setIsSubscribed(Bool.False);

    return true;
  };

  const toggle = async () => {
    try {
      return await (isSubscribed === Bool.True ? disable() : enable());
    } catch (error) {
      toast('' + error, makeToastKOMoodConfig());
      return false;
    }
  };

  /** Resolves to whether the settings were applied; a failure is reported by its own toast. */
  const applySettings = async (nextMutedUntil: number | nil, nextIsSilent: Bool) => {
    if (isSubscribed !== Bool.True) return false;

    try {
      await indexTsjrpcClientMethods.updatePushSettings({ mutedUntil: nextMutedUntil, isSilent: nextIsSilent });
    } catch (error) {
      toast('' + error, makeToastKOMoodConfig());
      return false;
    }

    setMutedUntilState(nextMutedUntil);
    setIsSilentState(nextIsSilent);

    return true;
  };

  const setMutedUntil = (nextMutedUntil: number | nil) => applySettings(nextMutedUntil, isSilent);
  const toggleSilent = () => applySettings(mutedUntil, isSilent === Bool.True ? Bool.False : Bool.True);

  return { isSubscribed, mutedUntil, isSilent, toggle, setMutedUntil, toggleSilent };
};
