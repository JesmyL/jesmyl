import { FooterPlacementManager } from '#basis/lib/FooterPlacementManager';
import { useCurrentAppFooterItemPlaceContext } from '#basis/state/App.contexts';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { FileRoutesByPath } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';

interface Props {
  to: keyof FileRoutesByPath;
  idPostfix: string;
  icon: KnownStameskaIconName;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export function AppFooterItem({ to, icon, title, className, children, idPostfix }: Props) {
  const place = useCurrentAppFooterItemPlaceContext();
  const isActive = to === place || `${to}/` === place;
  const linkTo = !isActive && place ? FooterPlacementManager.makePlaceLink(to) : to;

  return (
    <div
      id={`footer-button-${idPostfix}`}
      link-to={linkTo}
      className={twMerge(
        'footer-item relative z-10 pointer px-3 py-1 min-w-17 h-(--item-s) flex flex-col text-sm',
        isActive && 'active bg-x2 rounded-full',
        className,
      )}
    >
      <LazyIcon
        icon={icon}
        kind={isActive ? 'TwotoneRounded' : 'BulkRounded'}
      />
      <div className="title">{title}</div>
      {children}
    </div>
  );
}
