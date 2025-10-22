import { FooterPlacementManager } from '#basis/lib/FooterPlacementManager';
import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { routingApps } from '$app/lib/configs';
import { indexFavouriteAppsAtom } from '$index/shared/state';
import { useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { SokiAppName } from 'shared/api';
import styled from 'styled-components';

export default function AppFooterSwipeable({
  currentAppName,
  Div,
  children,
}: {
  currentAppName: SokiAppName | nil;
  Div: ReturnType<typeof styled.div>;
  children: React.ReactNode;
}) {
  const favouriteAppsSet = useAtomValue(indexFavouriteAppsAtom);
  const navigate = useNavigate();

  if (favouriteAppsSet.size < 2) return <Div>{children}</Div>;

  const favouriteApps = Array.from(favouriteAppsSet);

  const currentAppi = currentAppName == null ? -1 : favouriteApps.indexOf(currentAppName);
  let prevAppName = null;
  let nextAppName = null;

  if (currentAppi < 0) {
    prevAppName = favouriteApps[0];
    nextAppName = favouriteApps[1];
  } else {
    prevAppName = favouriteApps[currentAppi - 1] ?? favouriteApps[favouriteApps.length - 1];
    nextAppName = favouriteApps[currentAppi + 1] ?? favouriteApps[0];
  }

  const prevApp = routingApps[prevAppName];
  const nextApp = routingApps[nextAppName];

  if (prevApp == null || nextApp == null) {
    onPrevApp = () => {};
    onNextApp = () => {};

    return <Div>{children}</Div>;
  }

  onPrevApp = () => {
    navigate({
      to: FooterPlacementManager.getLastAppLink(prevAppName) ?? `/${prevAppName}/i`,
    });
  };

  onNextApp = () => {
    navigate({
      to: FooterPlacementManager.getLastAppLink(nextAppName) ?? `/${nextAppName}/i`,
    });
  };

  return (
    <div className="relative overflow-x-hidden">
      <div {...swiper}>
        <div className={prevIconClassName}>
          <LazyIcon
            icon={prevApp.icon}
            withoutAnimation
          />
        </div>
        <Div>{children}</Div>
        <div className={nextIconClassName}>
          <LazyIcon
            icon={nextApp.icon}
            withoutAnimation
          />
        </div>
      </div>
    </div>
  );
}

let onPrevApp = () => {};
let onNextApp = () => {};

const swiper = backSwipableContainerMaker(
  () => onPrevApp(),
  () => onNextApp(),
);

const prevIconClassName = 'h-[calc(var(--footer-height)-30px)] absolute top-0 flex text-x3/40 -left-10';
const nextIconClassName = 'h-[calc(var(--footer-height)-30px)] absolute top-0 flex text-x3/40 -right-10';
