import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { RoutingAppConfig } from '$app/lib/configs';
import { Link } from '@tanstack/react-router';

interface Props {
  config: RoutingAppConfig;
}

export const AppFace = ({ config: { appName, icon, title } }: Props) => {
  return (
    <div className="margin-big-gap-h margin-sm-gap-v flex between">
      <Link
        to={`/${appName}/i` as never}
        className="flex flex-gap pointer"
      >
        <LazyIcon icon={icon} />
        <span>{title}</span>
      </Link>
    </div>
  );
};
