import { Skeleton } from '#shared/components/ui/skeleton';
import { extractTgRouteDataFromUrl } from '#widgets/schedule/general/extractTgRouteDataFromUrl';
import { useGetScheduleOrPull } from '#widgets/schedule/general/useSetScheduleOrPull';
import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/schedule-day/')({
  component: RouteComponent,
});

const initData = extractTgRouteDataFromUrl();

function RouteComponent() {
  const { schedule, error, isLoading } = useGetScheduleOrPull(initData?.chat_instance ?? '');

  return (
    <div className="flex items-center justify-center full-size">
      {error ? (
        <div className="text-KO">{error}</div>
      ) : isLoading || !schedule ? (
        <Skeleton className="h-[300px] w-[70vw]" />
      ) : (
        <Navigate
          to="/!other/$appName/schs"
          params={{ appName: 'cm' }}
          search={{ isOpenSingleDay: true, schw: schedule.w }}
        />
      )}
    </div>
  );
}
