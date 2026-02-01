import { FooterPlacementManager } from '#basis/lib/FooterPlacementManager';
import { AppName } from '#basis/model/App.model';
import { CurrentAppFooterItemPlaceContext } from '#basis/state/App.contexts';
import { isTouchDevice } from '#shared/lib/device-differences';
import { mylib } from '#shared/lib/my-lib';
import { useLocation } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import React, { useEffect } from 'react';
import { makeRegExp } from 'regexpert';
import styled, { css } from 'styled-components';
import { AppFooterItem } from './AppFooterItem';
import { currentAppPhaseAtom } from './store/atoms';

const AppFooterSwipeable = React.lazy(() => import('#features/app-footer-swipeable'));

export function AppFooter({ children }: { children: () => React.ReactNode[]; appName: AppName }) {
  const loc = useLocation();
  const currentAppPhase = useAtomValue(currentAppPhaseAtom);

  const [, appName, place] = (currentAppPhase || loc.pathname).split(makeRegExp('/[/?#&]/'), 3) as [
    '',
    AppName | '!other' | und,
    string | und,
  ];

  useEffect(() => {
    if ((isTouchDevice && loc.pathname.includes('-!-')) || !appName || !place) return;

    const url = `${loc.pathname}${loc.searchStr.length > 1 ? loc.searchStr : ''}${loc.hash.length > 1 ? loc.hash : ''}`;

    FooterPlacementManager.onPlaceUrlChange(appName, place, url);
  }, [appName, loc.hash, loc.pathname, loc.searchStr, place]);

  const childList = children().filter(it => !mylib.isBool(it) && !mylib.isNil(it));

  return (
    <CurrentAppFooterItemPlaceContext value={`/${appName}/${place}/`}>
      <StyledFooter>
        <AppFooterSwipeable
          Div={StyledFooterTrack}
          currentAppName={appName === '!other' ? (place as never) : appName}
        >
          {childList}
          <StyledActiveBackground
            $childsCount={childList.length}
            className={`pointers-none absolute z-5 top-(--py) rounded-full aspect-1/1 h-(--item-s) bg-x2`}
          />
        </AppFooterSwipeable>

        <StyledFooterTrack className="other-track min-w-20">
          <AppFooterItem
            icon="CircleArrowRight02"
            title="Иное"
            to={`/!other/${(appName === '!other' ? place : appName) as never}`}
            idPostfix="other"
          />
        </StyledFooterTrack>
      </StyledFooter>
    </CurrentAppFooterItemPlaceContext>
  );
}

const StyledFooterTrack = styled.div.attrs({
  className:
    'relative flex custom-align-items justify-around bg-x1 rounded-[50px] p-(--py) h-(--track-h) @container overflow-hidden',
})``;

const StyledActiveBackground = styled.div<{ $childsCount: number }>`
  transition: right 0.1s;

  ${props => css`
    --kf: ${props.$childsCount + 1};

    right: calc(
      100cqw - (((50cqw / ${props.$childsCount}) + (var(--item-s) / 2)) + (100cqw / ${props.$childsCount}) * var(--kf))
    );

    ${StyledFooterTrack}:not(:has(.footer-item.active)) & {
      --kf: ${props.$childsCount};
    }
  `};
`;

const StyledFooter = styled.div.attrs({
  className:
    'footer-menu grid absolute bottom-[var(--footer-bottom)] pt-[10px] opacity-[var(--footer-opacity)] transition-[var(--fullscreen-transition)] w-[100vw] h-[var(--footer-height)] gap-[2vw] px-[2vw]',
})`
  --py: calc(var(--spacing) * 1);
  --track-h: calc(var(--spacing) * 15 + var(--py));
  --item-s: calc(var(--track-h) - var(--py) * 2);

  ${[1, 2, 3, 4, 5, 6, 7].map(
    num => css`
      &:has(${StyledFooterTrack} > :nth-child(${num})) {
        grid-template-columns: ${num}fr 80px;
      }

      &:has(:not(.other-track) .footer-item.active:nth-child(${num})) ${StyledActiveBackground} {
        --kf: ${num - 1};
      }
    `,
  )}

  .footer-item.active {
    transition: background-color, border-radius;
    transition-delay: 0.1s;
  }
`;
