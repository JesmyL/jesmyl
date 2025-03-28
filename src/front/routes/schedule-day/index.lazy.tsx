import { makeScheduleRoute } from '#widgets/schedule/complect/makeScheduleRoute';
import { extractTgRouteDataFromUrl } from '#widgets/schedule/general/extractTgRouteDataFromUrl';
import { useGetScheduleOrPull } from '#widgets/schedule/general/useSetScheduleOrPull';
import { Skeleton } from '@mui/material';
import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/schedule-day/')(makeScheduleRoute((() => Route) as never, RouteComponent));

const initData = extractTgRouteDataFromUrl();

function RouteComponent() {
  const { schedule, error, isLoading } = useGetScheduleOrPull(initData?.chat_instance ?? '');

  return (
    <div className="flex items-center justify-center full-size">
      {error ? (
        <div className="text-KO">{error}</div>
      ) : isLoading || !schedule ? (
        <Skeleton
          height={300}
          width="70vw"
        />
      ) : (
        <Navigate
          to="/schedule-day"
          search={{ schw: schedule.w }}
        />
      )}
    </div>
  );
}
