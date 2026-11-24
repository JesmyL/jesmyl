import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { RemoteBroadcastErrorBoundary } from '#features/broadcast/remote/ui/RemoteBroadcastErrorBoundary';
import { localeForceUpdateAtom } from '$app/store/triggers';
import { PultThemeSync } from '$remote/PultThemeSync';
import { RemoteFooter } from '$remote/RemoteFooter';
import { validateRemoteBroadcastSearch } from '$remote/model/search';
import { TheRemote } from '$remote/TheRemote';
import { createRootRoute, createRoute, createRouter, Navigate, Outlet, RouterProvider } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import React from 'react';
import { remoteBroadcastAskNameSearchParam, remoteBroadcastSecretCodeSearchParam, remoteBroadcastUserNameSearchParam } from 'shared/const/electron';
import { Toaster } from 'sonner';

const rootRoute = createRootRoute({ component: PultRoot });

const remoteRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/remote',
  validateSearch: validateRemoteBroadcastSearch,
  component: RemoteRedirect,
});

const remoteCmRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/remote/cm',
  validateSearch: validateRemoteBroadcastSearch,
  component: RemoteCm,
});

const remoteBibleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/remote/bible',
  validateSearch: validateRemoteBroadcastSearch,
  component: RemoteBible,
});

const routeTree = rootRoute.addChildren([remoteRootRoute, remoteCmRoute, remoteBibleRoute]);
const router = createRouter({ routeTree });

export const PultApp = () => (
  <RemoteBroadcastErrorBoundary>
    <AppDialogProvider title="pult">
      <PultThemeSync />
      <RouterProvider router={router} />
      <Toaster
        position="bottom-center"
        style={{ bottom: '100px' }}
      />
    </AppDialogProvider>
  </RemoteBroadcastErrorBoundary>
);

function PultRoot() {
  const num = useAtomValue(localeForceUpdateAtom);

  return (
    <React.Fragment key={num}>
      <div className="above-container">
        <div className="application-container">
          <Outlet />
        </div>
      </div>
      <RemoteFooter isOtherHidden />
    </React.Fragment>
  );
}

function RemoteRedirect() {
  return (
    <Navigate
      to="/remote/cm"
      search={prev => ({
        ...(prev[remoteBroadcastSecretCodeSearchParam] == null
          ? {}
          : { [remoteBroadcastSecretCodeSearchParam]: prev[remoteBroadcastSecretCodeSearchParam] }),
        ...(prev[remoteBroadcastUserNameSearchParam] == null
          ? {}
          : { [remoteBroadcastUserNameSearchParam]: prev[remoteBroadcastUserNameSearchParam] }),
        ...(prev[remoteBroadcastAskNameSearchParam] == null
          ? {}
          : { [remoteBroadcastAskNameSearchParam]: prev[remoteBroadcastAskNameSearchParam] }),
      })}
    />
  );
}

function RemoteCm() {
  const search = remoteCmRoute.useSearch();

  return (
    <TheRemote
      fromList={search[remoteBroadcastSecretCodeSearchParam]}
      userName={search[remoteBroadcastUserNameSearchParam]}
      askName={search[remoteBroadcastAskNameSearchParam]}
      appName="cm"
    />
  );
}

function RemoteBible() {
  const search = remoteBibleRoute.useSearch();

  return (
    <TheRemote
      fromList={search[remoteBroadcastSecretCodeSearchParam]}
      userName={search[remoteBroadcastUserNameSearchParam]}
      askName={search[remoteBroadcastAskNameSearchParam]}
      appName="bible"
    />
  );
}
