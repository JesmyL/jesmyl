import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ScheduleWidgetAppAttCustomized } from 'shared/api';
import { itIt } from 'shared/utils';

export function ScheduleWidgetCustomAttTitles({ tatt }: { tatt: ScheduleWidgetAppAttCustomized }) {
  return (
    <>
      <div className="flex flex-gap">
        <LazyIcon
          icon="LeftToRightListBullet"
          className="pointer color--7"
        />
        <span className="color--7">Заголовки:</span>
      </div>
      <div>{tatt.titles?.filter(itIt).join(', ') || <span className="color--7">Список пуст</span>}</div>
    </>
  );
}
