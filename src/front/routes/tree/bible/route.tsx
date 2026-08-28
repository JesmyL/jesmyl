import { BibleApp } from '$bible/app/BibleApp';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bible')({
  component: RouteComponent,
});

function RouteComponent() {
  return <BibleApp />;
}
