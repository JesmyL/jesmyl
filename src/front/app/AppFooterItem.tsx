import { FooterPlacementManager } from '#basis/lib/FooterPlacementManager';
import { useCurrentAppFooterItemPlaceContext } from '#basis/state/App.contexts';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { FileRoutesByPath, Link } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';

interface Props {
  to: keyof FileRoutesByPath;
  idPostfix: string;
  icon: KnownStameskaIconName;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export function AppFooterItem({ to, icon, title, className, children, idPostfix: id }: Props) {
  const place = useCurrentAppFooterItemPlaceContext();
  const isActive = to === place || `${to}/` === place;

  if (!isActive && place) to = FooterPlacementManager.makePlaceLink(to);

  return (
    <Link
      id={`footer-button-${id}`}
      to={to as never}
      className={twMerge(
        'pointer flex flex-col items-center w-[25%] scale-100 transition-[scale] duration-500 starting:scale-0',
        isActive && '[&>.icon-container]:bg-x2 [&>.icon-container]:w-[50px] [&>.icon-container]:text-x3',
        className,
      )}
    >
      <div className="icon-container flex justify-center items-center transition-[width,background] duration-100 rounded-[30px] w-[24px] h-[30px]">
        {isActive ? (
          <LazyIcon
            icon={icon}
            kind="TwotoneRounded"
          />
        ) : (
          <LazyIcon
            icon={icon}
            kind="BulkRounded"
          />
        )}
      </div>
      <div className="title">{title}</div>
      {children}
    </Link>
  );
}
