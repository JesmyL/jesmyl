import { FooterPlacementManager } from '#basis/lib/FooterPlacementManager';
import { backSwipableContainerMaker } from '#shared/lib/backSwipableContainerMaker';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { routingApps } from '$app/lib/configs';
import { indexFavouriteAppsAtom } from '$index/shared/state';
import { useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { SokiAppName } from 'shared/api';
import styled from 'styled-components';

type Props = {
  currentAppName: SokiAppName | nil;
  Div: ReturnType<typeof styled.div>;
  children: React.ReactNode;
};

export default function AppFooterSwipeable(props: Props) {
  const favouriteApps = useAtomValue(indexFavouriteAppsAtom);
  const navigate = useNavigate();

  if (favouriteApps.length < 2) return <props.Div>{props.children}</props.Div>;

  const currentAppi = props.currentAppName == null ? -1 : favouriteApps.indexOf(props.currentAppName);
  let prevAppName = null;
  let nextAppName = null;

  if (currentAppi < 0 || props.currentAppName == null) {
    prevAppName = favouriteApps[0];
    nextAppName = favouriteApps[favouriteApps.length - 1];
  } else if (favouriteApps.length === 2) {
    prevAppName = favouriteApps[+!currentAppi];
    nextAppName = favouriteApps[+!currentAppi];
  } else {
    const appNameCarousel = favouriteApps.concat(favouriteApps);

    prevAppName =
      appNameCarousel[currentAppi - 1] ?? appNameCarousel[appNameCarousel.lastIndexOf(props.currentAppName) - 1];

    nextAppName = appNameCarousel[currentAppi + 1];
  }

  const prevApp = routingApps[prevAppName];
  const nextApp = routingApps[nextAppName];

  if (prevApp == null || nextApp == null) {
    onPrevApp = () => {};
    onNextApp = () => {};

    return <props.Div>{props.children}</props.Div>;
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
        <props.Div>{props.children}</props.Div>
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
