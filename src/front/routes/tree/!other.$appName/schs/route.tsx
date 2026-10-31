import { validateScheduleSearch } from '#widgets/schedule/complect/makeScheduleRoute';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/!other/$appName/schs')({
  component: Outlet,
  validateSearch: validateScheduleSearch,
});
