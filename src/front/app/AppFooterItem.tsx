import { footerItemPlaceLsPrefix, useCurrentAppFooterItemPlaceContext } from '#basis/lib/App.contexts';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { FileRoutesByPath, Link } from '@tanstack/react-router';
import styled from 'styled-components';

interface Props {
  to: keyof FileRoutesByPath;
  idPostfix: string;
  icon: TheIconKnownName;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export function AppFooterItem({ to, icon, title, className, children, idPostfix: id }: Props) {
  const place = useCurrentAppFooterItemPlaceContext();
  const isActive = to === place || `${to}/` === place;

  if (!isActive && place) {
    to = (localStorage.getItem(footerItemPlaceLsPrefix + to) ??
      localStorage.getItem(footerItemPlaceLsPrefix + `${to}/`) ??
      to) as never;
  }

  return (
    <StyledLink
      id={`footer-button-${id}`}
      to={to}
      className={'pointer' + (isActive ? ' active' : '') + (className ? ' ' + className : '')}
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
