import { FooterPlacementManager } from '#basis/lib/FooterPlacementManager';
import { AppName } from '#basis/model/App.model';
import { CurrentAppFooterItemPlaceContext } from '#basis/state/App.contexts';
import { isTouchDevice } from '#shared/lib/device-differences';
import { getParentNodeWithClassName } from '#shared/lib/getParentNodeWithClassName';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import React, { FC, useEffect, useRef } from 'react';
import { makeRegExp } from 'regexpert';
import { twMerge } from 'tailwind-merge';
import { AppFooterItem } from './AppFooterItem';
import { currentAppPhaseAtom } from './store/atoms';

const AppFooterSwipeable = React.lazy(() => import('#features/app-footer-swipeable'));

export function AppFooter({ children }: { children: () => React.ReactNode[]; appName: AppName }) {
  const loc = useLocation();
  const currentAppPhase = useAtomValue(currentAppPhaseAtom);
  const navigate = useNavigate();
  const footerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (footerRef.current === null) return;

    const onAction = (event: { target: unknown }) => {
      const { node } = getParentNodeWithClassName(event, 'footer-item');

      const to = node?.getAttribute('link-to');
      if (node == null || to == null) return;
      const isActive = node.classList.contains('active');

      currentAppPhaseAtom.set(to);

      const nav = () => {
        currentAppPhaseAtom.set('');
        navigate({ to });
      };

      if (isActive) nav();
      else setTimeout(nav, 100);
    };

    return hookEffectPipe()
      .pipe(addEventListenerPipe(footerRef.current, isTouchDevice ? 'touchstart' : 'mousedown', onAction))
      .effect();
  }, [navigate]);

  return (
    <CurrentAppFooterItemPlaceContext value={`/${appName}/${place}/`}>
      <StyledFooter
        ref={footerRef}
        className="footer-menu grid absolute bottom-(--footer-bottom) pt-[10px] opacity-(--footer-opacity) transition-(--fullscreen-transition) w-[100vw] h-(--footer-height) gap-[2vw] px-[2vw]"
        $childsCount={childList.length}
      >
        <AppFooterSwipeable
          Div={FooterTrack}
          currentAppName={appName === '!other' ? (place as never) : appName}
        >
          {childList}
          <StyledActiveBackground
            className={`pointers-none absolute z-5 top-(--py) rounded-full aspect-1/1 h-(--item-s) bg-x2 ${currentAppPhase ? '' : ' invisible'}`}
          />
        </AppFooterSwipeable>

        <FooterTrack className="other-track min-w-20">
          <AppFooterItem
            icon="CircleArrowRight02"
            title="Иное"
            to={`/!other/${(appName === '!other' ? place : appName) as never}`}
            idPostfix="other"
          />
        </FooterTrack>
      </StyledFooter>
    </CurrentAppFooterItemPlaceContext>
  );
}

const StyledFooterTrack = styled.div``;

const FooterTrack: FC<{ className?: string; children?: React.ReactNode }> = props => (
  <StyledFooterTrack
    {...props}
    className={twMerge(
      'relative flex custom-align-items justify-around bg-x1 rounded-[50px] p-(--py) h-(--track-h) @container overflow-hidden',
      props.className,
    )}
  />
);

const StyledActiveBackground = styled.div`
  transition: transform 0.1s linear;
  right: var(--py);

  --kf: var(--childs-count);

  transform: translate(
    calc((-1 * (var(--plate-size) / 2 - var(--item-s) / 2)) - (var(--plate-size) * (var(--childs-count) - var(--kf)))),
    0
  );

  ${StyledFooterTrack}:not(:has(.footer-item.active)) & {
    --kf: calc(var(--childs-count) + 1);
  }
`;

const StyledFooter = styled('div', { shouldForwardProp: prop => !prop.startsWith('$') })<{ $childsCount: number }>`
  --py: calc(var(--spacing) * 1);
  --track-h: calc(var(--spacing) * 14 + var(--py));
  --item-s: calc(var(--track-h) - var(--py) * 2);
  --plate-size: calc(100cqw / var(--childs-count));

  ${props => css`
    --childs-count: ${props.$childsCount};
    grid-template-columns: 1fr 80px;
  `}

  ${[1, 2, 3, 4].map(
    num => css`
      &:has(:not(.other-track) .footer-item.active:nth-of-type(${num})) ${StyledActiveBackground} {
        --kf: ${num};
      }
    `,
  )}

  .footer-item.active {
    transition: background-color, border-radius;
    transition-delay: 0.1s;
  }
`;
