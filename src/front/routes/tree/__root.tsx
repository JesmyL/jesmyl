import { currentAppNameAtom } from '#basis/state/currentAppNameAtom';
import { Button } from '#shared/components';
import { environment } from '#shared/environment';
import { IndexAppVersionLabel } from '$index/entities/AppVersionLabel/ui/Label';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import React from 'react';
import { toast } from 'sonner';

const AppComponent = React.lazy(() => import('$app/AppComponent').then(m => ({ default: m.AppComponent })));

export const Route = createRootRoute({
  component: () => (environment.isPresentationMode ? <Outlet /> : <AppComponent />),
  errorComponent: ErrorComponent,
});

function ErrorComponent({ error }: { error: Error }) {
  const appName = useAtomValue(currentAppNameAtom);

  return (
    <div className="flex justify-center flex-col ites-center w-full h-full gap-3 text-center">
      <div>
        <b className="flex items-center gap-3 w-full justify-center">
          Упс... Что-то пошло не по плану...
          <Link to={`/!other/${appName && appName !== 'index' ? appName : 'cm'}` as never}>
            <Button icon="Home03" />
          </Link>
          <Button
            icon="MessageQuestion"
            onClick={() => {
              toast(`${error.message}\n\n${error.stack}`);
              console.info(error);
            }}
          />
        </b>
        <div>Можно принудительно обновить версию приложения</div>
      </div>
      <div className="flex gap-3 h-10">
        <IndexAppVersionLabel />
      </div>
    </div>
  );
}
