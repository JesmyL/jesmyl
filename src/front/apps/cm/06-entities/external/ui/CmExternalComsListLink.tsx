import { translateBase } from '#basis/locale';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Link } from '@tanstack/react-router';
import { ScheduleWidgetWid } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export function CmExternalComsListLink({ schw }: { schw: ScheduleWidgetWid }) {
  return (
    <Link
      to="/cm/li/events"
      search={{ schw }}
      className="pointer hide-on-print shrink-0 flex items-center gap-1 text-xs nowrap hover:text-x3"
      onClick={event => event.stopPropagation()}
    >
      <LazyIcon icon="Playlist02" />
      {translateBase(BaseLocaleKey.CmComsList)}
    </Link>
  );
}
