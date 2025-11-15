import { useAppNameContext } from '#basis/state/contexts';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import { RoutingAppConfig } from '$app/lib/configs';
import { indexFavouriteAppsAtom } from '$index/shared/state';
import { Link } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';

interface Props {
  config: RoutingAppConfig;
}

export const IndexAppFace = ({ config: { appName, icon, title } }: Props) => {
  const currentAppName = useAppNameContext();

  return (
    <div className="mx-5 my-1 flex between">
      <Link
        to={`/${appName}/i` as never}
        className={twMerge('flex gap-2 pointer', currentAppName === appName ? 'text-x7!' : null)}
      >
        <LazyIcon icon={icon} />
        <span>{title}</span>
      </Link>

      <WithAtomValue atom={indexFavouriteAppsAtom}>
        {favouriteApps => (
          <IconCheckbox
            checked={favouriteApps.includes(appName)}
            onChange={() => indexFavouriteAppsAtom.do.toggle(appName)}
          />
        )}
      </WithAtomValue>
    </div>
  );
};
