import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: RouteComponent });

function RouteComponent() {
  // root navigation is handled by FirstNaver ($app/AppComponent); a Navigate here races it
  return null;
}
