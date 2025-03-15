import { CmApp } from '$cm/01-app/CmApp';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cm')({ component: RouteComponent });

function RouteComponent() {
  return <CmApp />;
}
