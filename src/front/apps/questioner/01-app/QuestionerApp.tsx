import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { Outlet } from '@tanstack/react-router';

export const QuestionerApp = () => {
  useCurrentAppSetter('q');

  return <Outlet />;
};
