import { createFileRoute, Outlet } from '@tanstack/react-router';
import { TheTunerFooter } from 'front/components/apps/tuner/TheTunerFooter';

export const Route = createFileRoute('/tuner')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <TheTunerFooter />
    </>
  );
}
