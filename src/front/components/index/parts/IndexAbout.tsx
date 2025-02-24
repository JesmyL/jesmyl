import { propagationStopper } from '#shared/lib/event-funcs';

import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { QRCode } from '#shared/ui/qr-code/QRCode';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { indexBasicsSokiInvocatorClient } from '@index/db/invocators/schedules/fresh-invocator.methods';
import { jversion } from 'shared/values';

export function IndexAbout() {
  const [appVersion, isVersionLoading] = useInvocatedValue(
    0,
    aborter => indexBasicsSokiInvocatorClient.getFreshAppVersion({ aborter }),
    [],
  );
  const [values] = useInvocatedValue({}, aborter => indexBasicsSokiInvocatorClient.getIndexValues({ aborter }), []);

  return (
    <div className="flex center">
      <div
        className="flex custom-align-items column"
        onClick={propagationStopper}
      >
        {values.chatUrl && (
          <div className="padding-giant-gap">
            <QRCode text={values.chatUrl} />
            <div className="flex center flex-gap">
              <LazyIcon icon="Telegram" />
              <a href={values.chatUrl}>@jesmyl space</a>
            </div>
          </div>
        )}
        <div className="padding-giant-gap">
          <QRCode text="https://t.me/danikpon" />
          <div className="flex center flex-gap">
            <LazyIcon icon="Telegram" />
            <a href="https://t.me/danikpon">дизайн (3</a>
          </div>
        </div>
      </div>
      <div
        className={`absolute pos-bottom flex flex-gap padding-giant-gap ${
          appVersion ? (jversion.num !== appVersion ? 'color--ko' : 'color--7') : ''
        }`}
      >
        v{jversion.num}
        {isVersionLoading ? (
          <TheIconLoading />
        ) : appVersion ? (
          jversion.num === appVersion ? (
            '- Актуальная'
          ) : (
            `(Новая - v${appVersion})`
          )
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
