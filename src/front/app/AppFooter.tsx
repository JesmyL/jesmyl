import { AppName } from '#basis/model/App.model';
import { CurrentAppFooterItemPlaceContext, footerItemPlaceLsPrefix } from '#basis/state/App.contexts';
import { isTouchDevice } from '#shared/lib/device-differences';
import { useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';
import styled from 'styled-components';
import { AppFooterItem } from './AppFooterItem';
import { lastVisitedRouteLsName } from './lib/consts';

export function AppFooter({ children }: { children: React.ReactNode; appName: AppName }) {
  const loc = useLocation();

  const [, appName, place] = loc.pathname.split('/', 3) as [string, AppName | und, string | und];

  useEffect(() => {
    if ((isTouchDevice && loc.pathname.includes('-!-')) || !appName || !place) return;

    const lsName = `${footerItemPlaceLsPrefix}/${appName}/${place}/`;
    const url = `${loc.pathname}${loc.searchStr.length > 1 ? loc.searchStr : ''}${loc.hash.length > 1 ? loc.hash : ''}`;

    if (url === `/${appName}/${place}`) localStorage.removeItem(lsName);
    else localStorage.setItem(lsName, url);

    localStorage.setItem(lastVisitedRouteLsName, url);
  }, [appName, loc.hash, loc.pathname, loc.searchStr, place]);

  return (
    <CurrentAppFooterItemPlaceContext value={`/${appName}/${place}/`}>
      <StyledFooter>
        {children}
        <AppFooterItem
          icon="CircleArrowRight02"
          title="Другое"
          to={`/!other/${(appName?.startsWith('!') ? place : appName) as never}`}
          idPostfix="other"
        />
      </StyledFooter>
    </CurrentAppFooterItemPlaceContext>
  );
}

const StyledFooter = styled.div.attrs({ className: 'footer-menu' })`
  display: flex;
  position: absolute;
  bottom: var(--footer-bottom);
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 10px;
  opacity: var(--footer-opacity);
  transition: var(--fullscreen-transition);
  background-color: var(--color--1);
  width: 100vw;
  height: var(--footer-height);
  overflow: hidden;
`;
