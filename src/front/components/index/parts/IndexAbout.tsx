import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { propagationStopper } from 'front/complect/utils/utils';
import { jversion } from 'shared/values';
import QRCode from '../../../complect/qr-code/QRCode';
import { useIndexValues } from '../atoms';
import { indexIDB } from '../db/index-idb';

export default function IndexAbout() {
  const appVersion = indexIDB.useValue.appVersion();
  const values = useIndexValues();

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
        className={`absolute pos-bottom padding-giant-gap ${
          appVersion ? (jversion.num !== appVersion ? 'color--ko' : 'color--7') : ''
        }`}
      >
        v{jversion.num} {appVersion ? (jversion.num === appVersion ? '- Актуальная' : `(Новая - v${appVersion})`) : ''}
      </div>
    </div>
  );
}
