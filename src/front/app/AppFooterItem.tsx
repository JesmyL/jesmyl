import { FooterPlacementManager } from '#basis/lib/FooterPlacementManager';
import { useCurrentAppFooterItemPlaceContext } from '#basis/state/App.contexts';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { FileRoutesByPath, useNavigate } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';
import { currentAppPhaseAtom } from './store/atoms';

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
  const navigate = useNavigate();
  const isActive = to === place || `${to}/` === place;

  if (!isActive && place) to = FooterPlacementManager.makePlaceLink(to);

  let isWasActionFired = false;

  const onAction = () => {
    if (isWasActionFired) {
      isWasActionFired = false;
      return;
    }

    isWasActionFired = true;
    currentAppPhaseAtom.set(to);

    const nav = () => {
      currentAppPhaseAtom.set('');
      navigate({ to: to as never });
    };

    if (isActive) nav();
    else setTimeout(nav, 200);
  };

  return (
    <div
      onTouchStart={isActive ? undefined : onAction}
      onClick={onAction}
      id={`footer-button-${id}`}
      className={twMerge(
        'relative z-10 footer-item pointer px-3 py-1 min-w-17 h-(--item-s) flex flex-col',
        isActive && 'active bg-x2 rounded-full',
        className,
      )}
    >
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
      <div className="title">{title}</div>
      {children}
    </div>
  );
}
