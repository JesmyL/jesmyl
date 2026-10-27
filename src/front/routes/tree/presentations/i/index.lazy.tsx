import { PresentationsApp } from '$presentations/app/PresentationsApp';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/presentations/i/')({ component: RouteComponent });

function RouteComponent() {
  return <PresentationsApp />;
}
