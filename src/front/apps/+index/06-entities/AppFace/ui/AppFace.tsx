import { useAppNameContext } from '#basis/state/contexts';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { RoutingAppConfig } from '$app/lib/configs';
import { indexFavouriteAppsAtom } from '$index/shared/state';
import { Link } from '@tanstack/react-router';
import { SokiAppName } from 'shared/api';
import { twMerge } from 'tailwind-merge';

interface Props {
  config: RoutingAppConfig;
  favouriteApps: SokiAppName[];
}

export const IndexAppFace = ({ config: { appName, icon, title }, favouriteApps }: Props) => {
  const currentAppName = useAppNameContext();

  return (
    <div className="mx-5 my-1 flex between">
      <Link
        to={`/${appName}/i` as never}
        className={twMerge('flex gap-2 pointer', currentAppName === appName && 'text-x7!')}
      >
        <LazyIcon icon={icon} />
        <span>{title}</span>
      </Link>

      <IconCheckbox
        checked={favouriteApps.includes(appName)}
        onChange={() => document.startViewTransition(() => indexFavouriteAppsAtom.do.toggle(appName))}
      />
    </div>
  );
};
