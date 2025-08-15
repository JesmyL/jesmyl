import { extractTgRouteDataFromUrl } from '#widgets/schedule/general/extractTgRouteDataFromUrl';
import { useGetScheduleOrPull } from '#widgets/schedule/general/useSetScheduleOrPull';
import { Skeleton } from '@mui/material';
import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { ScheduleWidgetCleans } from 'shared/api';

export const Route = createLazyFileRoute('/schedule-day/')({
  component: RouteComponent,
});

const initData = extractTgRouteDataFromUrl();

function RouteComponent() {
  const { schedule, error, isLoading } = useGetScheduleOrPull(initData?.chat_instance ?? '');

  if (schedule != null) {
    const dayi = ScheduleWidgetCleans.getCurrentDayiOrNull(schedule);

    if (dayi === null)
      return (
        <Navigate
          to="/schedule-day/$schw"
          params={{ schw: '' + schedule.w }}
        />
      );
  }

  return (
    <div className="flex items-center justify-center full-size">
      {error ? (
        <div className="text-KO">{error}</div>
      ) : (
        (isLoading || !schedule) && (
          <Skeleton
            height={300}
            width="70vw"
          />
        )
      )}
    </div>
  );
}
