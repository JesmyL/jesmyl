import { useIndexValuesQuery } from '#basis/api/useIndexValuesQuery';
import { propagationStopper } from '#shared/lib/event-funcs';
import { QRCode } from '#shared/ui/qr-code/QRCode';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { IndexAppVersionLabel } from '$index/entities/AppVersionLabel/ui/Label';

export function IndexAbout() {
  const { data: values = {} } = useIndexValuesQuery();

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
            <a href="https://t.me/danikpon">Design (3</a>
          </div>
        </div>
      </div>
      <IndexAppVersionLabel className="absolute bottom-0 p-10" />
    </div>
  );
}
