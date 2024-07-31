import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { iconPackOfCircleArrowRight02 } from '../complect/the-icon/icons/circle-arrow-right-02';
import { AppName } from './App.model';
import AppFooterItem, {
  CurrentAppFooterItemAppNameContext,
  CurrentAppFooterItemPlaceContext,
  footerItemPlaceLsPrefix,
} from './AppFooterItem';

export const lastVisitedRouteLsName = 'nav-last-visited-route';

export default function AppFooter({ children }: { children: React.ReactNode }) {
  const loc = useLocation();

  const [, appName, place] = loc.pathname.split('/', 3) as [string, AppName | und, string | und];

  useEffect(() => {
    if (appName && place) {
      const lsName = footerItemPlaceLsPrefix + appName + '/' + place;
      const url = `${loc.pathname}${loc.search.length > 1 ? loc.search : ''}${loc.hash.length > 1 ? loc.hash : ''}`;

      if (url === `/${appName}/${place}`) localStorage.removeItem(lsName);
      else localStorage.setItem(lsName, url);

      localStorage.setItem(lastVisitedRouteLsName, url);
    }
  }, [appName, loc.hash, loc.pathname, loc.search, place]);

  return (
    <CurrentAppFooterItemAppNameContext.Provider value={appName}>
      <CurrentAppFooterItemPlaceContext.Provider value={place}>
        <StyledFooter>
          {children}

          <AppFooterItem
            iconPack={iconPackOfCircleArrowRight02}
            title="Другое"
            to="!other"
          />
        </StyledFooter>
      </CurrentAppFooterItemPlaceContext.Provider>
    </CurrentAppFooterItemAppNameContext.Provider>
  );
}

const StyledFooter = styled.div`
  display: flex;
  position: absolute;
  bottom: var(--footer-bottom);
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 10px;
  opacity: var(--footer-opacity);
  z-index: 200;
  transition: var(--fullscreen-transition);
  background-color: var(--color--1);
  width: 100vw;
  height: var(--footer-height);
  overflow: hidden;
`;
