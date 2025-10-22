import { FooterPlacementManager } from '#basis/lib/FooterPlacementManager';
import { AppName } from '#basis/model/App.model';
import { CurrentAppFooterItemPlaceContext } from '#basis/state/App.contexts';
import { isTouchDevice } from '#shared/lib/device-differences';
import { useLocation } from '@tanstack/react-router';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { AppFooterItem } from './AppFooterItem';

const AppFooterSwipeable = React.lazy(() => import('#features/app-footer-swipeable'));

export function AppFooter({ children }: { children: React.ReactNode; appName: AppName }) {
  const loc = useLocation();

  const [, appName, place] = loc.pathname.split('/', 3) as [string, AppName | und, string | und];

  useEffect(() => {
    if ((isTouchDevice && loc.pathname.includes('-!-')) || !appName || !place) return;

    const url = `${loc.pathname}${loc.searchStr.length > 1 ? loc.searchStr : ''}${loc.hash.length > 1 ? loc.hash : ''}`;

    FooterPlacementManager.onPlaceUrlChange(appName, place, url);
  }, [appName, loc.hash, loc.pathname, loc.searchStr, place]);

  return (
    <CurrentAppFooterItemPlaceContext value={`/${appName}/${place}/`}>
      <StyledFooter>
        <AppFooterSwipeable
          Div={StyledAppFooter}
          currentAppName={appName}
        >
          {children}
        </AppFooterSwipeable>

        <div className="flex justify-center custom-align-items">
          <AppFooterItem
            icon="CircleArrowRight02"
            title="Другое"
            to={`/!other/${(appName?.startsWith('!') ? place : appName) as never}`}
            idPostfix="other"
          />
        </div>
      </StyledFooter>
    </CurrentAppFooterItemPlaceContext>
  );
}

const StyledAppFooter = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

const StyledFooter = styled.div.attrs({ className: 'footer-menu' })`
  display: grid;

  position: absolute;
  bottom: var(--footer-bottom);
  padding-top: 10px;
  opacity: var(--footer-opacity);
  transition: var(--fullscreen-transition);
  background-color: var(--color--1);
  width: 100vw;
  height: var(--footer-height);
  overflow: hidden;

  ${[1, 2, 3, 4, 5, 6, 7].map(
    num => css`
      &:has(${StyledAppFooter} > :nth-child(${num})) {
        grid-template-columns: ${num}fr 1fr;
      }
    `,
  )}
`;
