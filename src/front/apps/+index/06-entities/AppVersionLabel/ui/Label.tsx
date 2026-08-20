import { useFingersActions } from '#basis/lib/global-listeners/useFingersActions';
import { useConnectionState, useIsOnline } from '#basis/lib/useConnectionState';
import { translateBase } from '#basis/locale';
import { checkIsThereNewSWAtom, reloadSW } from '#shared/sw-register';
import { makeToastKOMoodConfig, usePrompt } from '#shared/ui/modal';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { atom, useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { randomOf } from 'shared/randoms';
import { jversion } from 'shared/values';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

const extVersionAtom = atom('', 'index:extVersion');

export const IndexAppVersionLabel = ({ className }: { className?: string }) => {
  const isThereNewSW = useAtomValue(checkIsThereNewSWAtom);
  const [isRefreshProcess, setIsRefreshProcess] = useState(false);
  const [cacheNames, setCacheNames] = useState<string[]>([]);
  const prompt = usePrompt();

  const extVersion = useAtomValue(extVersionAtom);

  const { data: appVersion, isLoading: isVersionLoading } = useQuery({
    queryKey: ['indexAppVersion'],
    queryFn: () => indexTsjrpcClientMethods.getFreshAppVersion(),
  });

  const connectionStateNode = useConnectionState();
  const isOnline = useIsOnline();

  useEffect(() => {
    (async () => {
      const cacheNames = await caches.keys();
      setCacheNames(cacheNames);
    })();
  }, []);

  useFingersActions();

  return (
    <div
      className={twMerge(
        'flex gap-2',
        appVersion ? (jversion.num !== appVersion ? 'text-xKO' : 'text-x7') : '',
        className,
      )}
    >
      v{jversion.num}
      {isVersionLoading ? (
        <TheIconLoading />
      ) : appVersion ? (
        jversion.num === appVersion ? (
          translateBase(it => it.actualVer)
        ) : (
          translateBase(it => it.newVer, { v: appVersion })
        )
      ) : (
        ''
      )}
      {!extVersion || <> [{extVersion}]</>}
      {isOnline ? (
        isRefreshProcess ? (
          <TheIconLoading />
        ) : (
          <>
            <TheIconButton
              icon="Refresh"
              className={isThereNewSW ? 'text-x7' : ''}
              withoutAnimation
              confirm={translateBase(it => it.refreshAppConfirm)}
              onClick={event => {
                event.stopPropagation();
                setIsRefreshProcess(true);

                reloadSW();
              }}
            />
            <TheIconButton
              icon="Refresh"
              withoutAnimation
              onClick={async event => {
                event.stopPropagation();
                const code = randomOf(12345, 9876543);
                const answer = await prompt(translateBase(it => it.immediateRefreshOnFinish, { c: code }));
                if (answer == null) return;

                if (+answer !== +code) {
                  toast(
                    translateBase(it => it.incCode),
                    makeToastKOMoodConfig(),
                  );
                  return;
                }

                setIsRefreshProcess(true);

                const clearCache = async () => {
                  try {
                    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
                    window.location.reload();
                  } catch (_error) {
                    //
                  }

                  setIsRefreshProcess(false);
                };

                clearCache();
                reloadSW();
              }}
            />
          </>
        )
      ) : (
        connectionStateNode
      )}
    </div>
  );
};
