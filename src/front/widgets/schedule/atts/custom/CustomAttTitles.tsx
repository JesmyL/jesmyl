import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ScheduleWidgetAppAttCustomized } from 'shared/api';
import { itIt } from 'shared/utils';

export function ScheduleWidgetCustomAttTitles({ tatt }: { tatt: ScheduleWidgetAppAttCustomized }) {
  return (
    <>
      <div className="flex gap-2">
        <LazyIcon
          icon="LeftToRightListBullet"
          className="pointer text-x7"
        />
        <span className="text-x7">Заголовки:</span>
      </div>
      <div>{tatt.titles?.filter(itIt).join(', ') || <span className="text-x7">Список пуст</span>}</div>
    </>
  );
}
