import { IndexAppVersionLabel } from '$index/entities/AppVersionLabel/ui/Label';
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import React from 'react';

const AppComponent = React.lazy(() => import('$app/AppComponent').then(m => ({ default: m.AppComponent })));

export const Route = createRootRoute({
  component: Component,
  errorComponent: () => (
    <div className="flex justify-center flex-col ites-center w-full h-full gap-3 text-center">
      <div>
        <b>Упс... Что-то пошло не по плану...</b>
        <div>Можно принудительно обновить версию приложения</div>
      </div>
      <div className="flex gap-3 h-10">
        <IndexAppVersionLabel />
      </div>
    </div>
  ),
});

function Component() {
  const loc = useLocation();

  return loc.href.startsWith('/presentation') ? <Outlet /> : <AppComponent />;
}
