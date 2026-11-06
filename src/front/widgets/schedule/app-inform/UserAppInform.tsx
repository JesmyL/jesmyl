import { applicationLangi, translateBase } from '#basis/locale';
import { DropdownMenu } from '#shared/components';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { howMillisecondsInDay, howMillisecondsInHour } from 'shared/const/ms';
import { Bool } from 'shared/enums';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { makeDateLabel } from 'shared/utils/makeDateLabel';
import { toast } from 'sonner';
import { useScheduleWidgetRightsContext } from '../contexts';
import { usePushSubscription } from './usePushSubscription';

const muteDurations = [
  [BaseLocaleKey.ScheduleInformMute1Hour, howMillisecondsInHour],
  [BaseLocaleKey.ScheduleInformMute4Hours, howMillisecondsInHour * 4],
  [BaseLocaleKey.ScheduleInformMute8Hours, howMillisecondsInHour * 8],
  [BaseLocaleKey.ScheduleInformMute1Day, howMillisecondsInDay],
  [BaseLocaleKey.ScheduleInformMute7Days, howMillisecondsInDay * 7],
] as const;

const toastApplied = (action: Promise<boolean>, message: string) =>
  void action.then(isApplied => {
    if (isApplied) toast(message);
  });

export const ScheduleWidgetMyUserAppInform = () => {
  const rights = useScheduleWidgetRightsContext();
  const { isSubscribed, mutedUntil, isSilent, toggle, setMutedUntil, toggleSilent } = usePushSubscription();

  if (!rights.myUser || isSubscribed === null) return null;

  const isMuted = isSubscribed === Bool.True && mutedUntil != null && mutedUntil > Date.now();
  const willReceiveInform =
    isSubscribed === Bool.True && !isMuted && rights.isCanRead && rights.schedule.appInform !== 0;

  const title = isMuted
    ? translateBase(BaseLocaleKey.ScheduleInformUntil, { d: makeDateLabel(mutedUntil, applicationLangi) })
    : translateBase(BaseLocaleKey.ScheduleInformMe, { v: !willReceiveInform });

  const applyMuteUntil = (until: number) =>
    toastApplied(
      setMutedUntil(until),
      translateBase(BaseLocaleKey.ScheduleInformUntil, { d: makeDateLabel(until, applicationLangi) }),
    );

  const clearMute = () => toastApplied(setMutedUntil(null), translateBase(BaseLocaleKey.ScheduleInformResume));

  const switchSound = () =>
    toastApplied(
      toggleSilent(),
      translateBase(BaseLocaleKey.ScheduleInformSoundOn, { v: isSilent }),
    );

  const switchNotifications = () =>
    toastApplied(
      toggle(),
      translateBase(BaseLocaleKey.ScheduleInformOn, {
        v: isSubscribed === Bool.True ? Bool.False : Bool.True,
      }),
    );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="pointer flex">
        <TheIconButton
          className="my-2"
          icon={willReceiveInform ? 'Notification01' : 'NotificationOff01'}
          postfix={title}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {isSubscribed === Bool.True ? (
          <>
            {isMuted ? (
              <DropdownMenu.Item onClick={clearMute}>
                <LazyIcon icon="Notification01" />
                {translateBase(BaseLocaleKey.ScheduleInformResume)}
              </DropdownMenu.Item>
            ) : (
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>
                  <LazyIcon icon="Clock01" />
                  {translateBase(BaseLocaleKey.ScheduleInformMuteFor)}
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  {muteDurations.map(([localeKey, milliseconds]) => (
                    <DropdownMenu.Item
                      key={localeKey}
                      onClick={() => applyMuteUntil(Date.now() + milliseconds)}
                    >
                      <LazyIcon icon="Clock01" />
                      {translateBase(localeKey)}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            )}
            <DropdownMenu.Item onClick={switchSound}>
              <LazyIcon icon={isSilent === Bool.True ? 'VolumeHigh' : 'VolumeOff'} />
              {translateBase(BaseLocaleKey.ScheduleInformSoundOn, { v: isSilent })}
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={switchNotifications}>
              <LazyIcon icon="NotificationOff01" />
              {translateBase(BaseLocaleKey.ScheduleInformOn, { v: Bool.False })}
            </DropdownMenu.Item>
          </>
        ) : (
          <DropdownMenu.Item onClick={switchNotifications}>
            <LazyIcon icon="Notification01" />
            {translateBase(BaseLocaleKey.ScheduleInformOn, { v: Bool.True })}
          </DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
