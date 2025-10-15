import { useIndexValuesQuery } from '#basis/api/useIndexValuesQuery';
import { propagationStopper } from '#shared/lib/event-funcs';
import { QRCode } from '#shared/ui/qr-code/QRCode';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { indexTsjrpcClientMethods } from '$index/tsjrpc.methods';
import { useConnectionState, useIsOnline } from '$index/useConnectionState';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { jversion } from 'shared/values';

// eslint-disable-next-line front-import-aliases/check
import { checkIsThereNewSWAtom, reloadSW } from 'front/sw-register';

export function IndexAbout() {
  const [cacheNames, setCacheNames] = useState<string[]>([]);
  const connectionStateNode = useConnectionState();
  const [isRefreshProcess, setIsRefreshProcess] = useState(false);
  const isOnline = useIsOnline();
  const isThereNewSW = useAtomValue(checkIsThereNewSWAtom);
  const { data: values = {} } = useIndexValuesQuery();

  const { data: appVersion, isLoading: isVersionLoading } = useQuery({
    queryKey: ['indexAppVersion'],
    queryFn: () => indexTsjrpcClientMethods.getFreshAppVersion(),
  });

  useEffect(() => {
    (async () => {
      const cacheNames = await caches.keys();
      setCacheNames(cacheNames);
    })();
  }, []);

  return (
    <div className="flex center">
      <div
        className="flex custom-align-items column"
        onClick={propagationStopper}
      >
        {values.chatUrl && (
          <div className="p-10">
            <QRCode text={values.chatUrl} />
            <div className="flex center gap-2">
              <LazyIcon icon="Telegram" />
              <a href={values.chatUrl}>@jesmyl space</a>
            </div>
          </div>
        )}
        <div className="p-10">
          <QRCode text="https://t.me/danikpon" />
          <div className="flex center gap-2">
            <LazyIcon icon="Telegram" />
            <a href="https://t.me/danikpon">дизайн (3</a>
          </div>
        </div>
      </div>
      <div
        className={`absolute bottom-0 flex gap-2 p-10 ${
          appVersion ? (jversion.num !== appVersion ? 'text-xKO' : 'text-x7') : ''
        }`}
      >
        v{jversion.num}
        {isVersionLoading ? (
          <TheIconLoading />
        ) : appVersion ? (
          jversion.num === appVersion ? (
            ' - Актуальная'
          ) : (
            ` (Новая - v${appVersion})`
          )
        ) : (
          ''
        )}
        {isOnline ? (
          isRefreshProcess ? (
            <TheIconLoading />
          ) : (
            <>
              <TheIconButton
                icon="Refresh"
                className={isThereNewSW ? 'text-x7' : ''}
                withoutAnimation
                confirm="Убедитесь в наличии интернет-соединения! Обновить приложение?"
                onClick={event => {
                  event.stopPropagation();
                  setIsRefreshProcess(true);

                  reloadSW();
                }}
              />
              <TheIconButton
                icon="Refresh"
                withoutAnimation
                confirm="Это действие требует немедленного обновления сразу после своего завершения. Убедитесь, пожалуйста, что у вас есть интернет-соединение, ибо, в противном случае, возникнет проблема"
                onClick={event => {
                  event.stopPropagation();
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
    </div>
  );
}
