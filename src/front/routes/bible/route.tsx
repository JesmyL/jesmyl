import { BibleFooter } from '$bible/app/BibleFooter';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/bible')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <BibleFooter />
    </>
  );
}
