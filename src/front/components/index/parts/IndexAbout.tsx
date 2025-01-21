import { itIt } from 'shared/utils';
import { jversion } from 'shared/values';
import QRCode from '../../../complect/qr-code/QRCode';
import { IconDelete01StrokeRounded } from '../../../complect/the-icon/icons/delete-01';
import { IconTelegramStrokeRounded } from '../../../complect/the-icon/icons/telegram';
import { useIndexValues } from '../atoms';
import { indexIDB } from '../db/index-idb';

export default function IndexAbout() {
  const appVersion = indexIDB.useSingleValueLiveQuery('appVersion');
  const values = useIndexValues();

  return (
    <div className="flex center">
      <div
        className="flex custom-align-items column"
        onClick={event => event.stopPropagation()}
      >
        {values.chatUrl && (
          <div className="padding-giant-gap">
            <QRCode text={values.chatUrl} />
            <div className="flex center">
              <IconTelegramStrokeRounded />
              <a href={values.chatUrl}>@jesmyl space</a>
            </div>
          </div>
        )}
        <div className="padding-giant-gap">
          <QRCode text="https://t.me/danikpon" />
          <div className="flex center">
            <IconTelegramStrokeRounded />
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
        <IconDelete01StrokeRounded
          className="margin-gap pointer color--ko vertical-middle"
          onClick={event => {
            event.stopPropagation();
            const knownSourcesSet = new Set(
              Array.from(document.querySelectorAll('[href^="/static/"],[src^="/static/"]'))
                .map(elem => elem.getAttribute('href')!)
                .filter(itIt),
            );

            if (knownSourcesSet.size)
              navigator.serviceWorker.ready.then(registration => {
                registration.active?.postMessage({ knownSourcesSet });
              });
          }}
        />
      </div>
    </div>
  );
}
