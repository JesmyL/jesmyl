import { cmEditorInitialInvokes } from '$cm+editor/processes/cm+editor-initial-invokes';
import { authIDB } from '$index/db/auth-idb';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/cm/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  return authIDB.useValue.auth().level < 50 ? (
    <div className="text-xKO flex items-center justify-center w-full h-full">Не авторизован</div>
  ) : (
    <Outlet />
  );
}

cmEditorInitialInvokes();
