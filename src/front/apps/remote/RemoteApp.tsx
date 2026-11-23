import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { Outlet } from '@tanstack/react-router';

export const RemoteApp = () => {
  useCurrentAppSetter('remote');

  return <Outlet />;
};
