import { ErrorComponent } from '#routes/ErrorComponent';
import { environment } from '#shared/environment';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { configureAtomaric } from 'atomaric';
import React, { useSyncExternalStore } from 'react';

configureAtomaric({ useSyncExternalStore, keyPathSeparator: '/' });

const AppComponent = React.lazy(() => import('$app/AppComponent').then(m => ({ default: m.AppComponent })));
const NotFoundPage = React.lazy(() =>
  import('$index/pages/NotFoundPage').then(m => ({ default: m.IndexNotFoundPage })),
);

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  if (environment.isPresentationMode) return <Outlet />;

  return <AppComponent />;
}
