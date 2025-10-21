import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { RoutingAppConfig } from '$app/lib/configs';
import { Link } from '@tanstack/react-router';

interface Props {
  config: RoutingAppConfig;
}

export const IndexAppFace = ({ config: { appName, icon, title } }: Props) => {
  return (
    <div className="mx-5 my-1 flex between">
      <Link
        to={`/${appName}/i` as never}
        className="flex gap-2 pointer"
      >
        <LazyIcon icon={icon} />
        <span>{title}</span>
      </Link>
    </div>
  );
};
