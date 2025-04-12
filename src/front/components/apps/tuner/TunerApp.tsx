import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { Outlet } from '@tanstack/react-router';

export const TunerApp = () => {
  useCurrentAppSetter('tuner');

  return <Outlet />;
};
