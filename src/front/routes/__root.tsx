import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import React from 'react';

const AppComponent = React.lazy(() => import('$app/AppComponent').then(m => ({ default: m.AppComponent })));

export const Route = createRootRoute({
  component: Component,
});

function Component() {
  const loc = useLocation();

  return loc.href.startsWith('/presentation') ? <Outlet /> : <AppComponent />;
}
