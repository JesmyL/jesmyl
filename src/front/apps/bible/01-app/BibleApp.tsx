import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { Outlet } from '@tanstack/react-router';

export const BibleApp = () => {
  useCurrentAppSetter('bible');

  return <Outlet />;
};
