import { FooterPlacementManager } from '#basis/lib/FooterPlacementManager';
import { useCurrentAppFooterItemPlaceContext } from '#basis/state/App.contexts';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { FileRoutesByPath, Link } from '@tanstack/react-router';
import styled from 'styled-components';
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
    <StyledLink
      id={`footer-button-${id}`}
      to={to}
      className={twMerge('pointer', isActive && 'active', className)}
    >
      <div className="icon-container">
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
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  @starting-style {
    scale: 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  scale: 1;

  transition: scale 0.5s;

  > .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    transition:
      width 0.1s,
      background-color 0.05s;
    border-radius: 30px;
    width: 24px;
    height: 30px;
  }

  &.active {
    > .icon-container {
      background-color: var(--color--2);
      width: 50px;
      color: var(--color--3);
    }
  }
`;
