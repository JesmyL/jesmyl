import { ScheduleManagePage } from '#widgets/schedule/pages/ScheduleManagePage';
import { indexIDB } from '$index/shared/state';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';

export const Route = createLazyFileRoute('/schedule-manage/$schw/')({ component: RouteComponent });

function RouteComponent() {
  const { schw } = Route.useParams();
  const schedule = useLiveQuery(() => indexIDB.db.schs.get(+schw), [schw]);

  if (schedule == null) return null;

  return <ScheduleManagePage schedule={schedule} />;
}
