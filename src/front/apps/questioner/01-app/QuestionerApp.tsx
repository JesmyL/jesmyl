import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { questionerIDB } from '$q/shared/state/qIdb';
import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { Outlet } from '@tanstack/react-router';

export const QuestionerApp = () => {
  useCurrentAppSetter('q');

  return <Outlet />;
};


(async () => {
  questionerAdminTsjrpcClient.requestFreshes({
    lastModfiedAt: await questionerIDB.get.lastModifiedAt()
  })
})();