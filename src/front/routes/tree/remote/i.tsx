import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/remote/i')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Navigate
      to="/remote/cm"
      search={prev => ({ 'from-list': prev['from-list'] })}
    />
  );
}
