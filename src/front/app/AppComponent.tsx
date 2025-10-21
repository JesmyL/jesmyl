import { currentAppNameAtom } from '#basis/lib/atoms/currentAppNameAtom';
import { hideAppFooterAtom } from '#basis/lib/atoms/hideAppFooterAtom';
import { useFingersActions } from '#basis/lib/global-listeners/useFingersActions';
import { useGlobalFontFamilySetter } from '#basis/lib/global-listeners/useGlobalFontFamilySetter';
import { JesmylLogo } from '#basis/ui/jesmyl-logo/JesmylLogo';
import { isFullscreenAtom } from '#shared/lib/atoms/fullscreen';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { soki } from '#shared/soki';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { schLinkAction } from '#widgets/schedule/links';
import { Outlet, ParsedLocation, useLocation, useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { emptyArray } from 'shared/utils';
import { toast } from 'sonner';
import { appInitialInvokes } from './app-initial-invokes';
import { AppFooter } from './AppFooter';
import { routingApps } from './lib/configs';
import { lastVisitedRouteLsName } from './lib/consts';

appInitialInvokes();

export const AppComponent = () => {
  const loc = useLocation();
  const [isNeedFirstNavigate, setIsNeedFirstNavigate] = useState(true);
  const [isShowLogo, setIsShowLogo] = useState(true);
  const appName = useAtomValue(currentAppNameAtom);
  const hideAppFooter = useAtomValue(hideAppFooterAtom);
  const isFullscreen = useAtomValue(isFullscreenAtom);

  useEffect(() => {
    const unauthListener = soki.onTokenInvalidEvent.listen(() => {
      toast('Авторизация не действительна', makeToastKOMoodConfig());
    });

    const errorMessageListener = soki.onInvokeErrorMessageEvent.listen(errorMessage => {
      toast(errorMessage, makeToastKOMoodConfig());
    });

    return () => {
      unauthListener();
      errorMessageListener();
    };
  }, []);

  useFingersActions();
  useGlobalFontFamilySetter();

  useEffect(() => soki.pushCurrentUrl(), [loc.href]);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(setTimeoutPipe(setIsShowLogo, 1200, false))
      .effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, emptyArray);

  return (
    <>
      <div
        className="above-container"
        st-hide-footer-menu={hideAppFooter ? '' : undefined}
      >
        {isShowLogo && (
          <div className="jesmyl-smile-box flex center absolute w-full h-full z-5">
            <JesmylLogo className="no-fade-in-effect" />
          </div>
        )}
        <div
          className="application-container"
          st-fullscreen={isFullscreen ? '' : undefined}
        >
          <Outlet />
          {isFullscreen && (
            <LazyIcon
              icon="ArrowShrink02"
              className="pointer absolute top-0 right-0 z-50 m-[10px]"
              onClick={() => isFullscreenAtom.set(false)}
            />
          )}
        </div>
      </div>
      {isNeedFirstNavigate && (
        <FirstNaver
          onSet={setIsNeedFirstNavigate}
          loc={loc as never}
        />
      )}

      {appName &&
        (routingApps[appName]?.footer ?? (
          <AppFooter
            appName={appName}
            children={<div className="size-full flex justify-center items-center pb-3">Выберите программу</div>}
          />
        ))}
    </>
  );
};

const FirstNaver = ({ onSet, loc }: { onSet: (is: false) => void; loc: ParsedLocation<object> }) => {
  const navigate = useNavigate();
  const onHrefData = LinkAppActionFabric.useOnHrefData();
  schLinkAction.register();

  useEffect(() => {
    onHrefData(window.location.href);
  }, [onHrefData]);

  useEffect(() => {
    onSet(false);
    if (loc.pathname.length > 1 || loc.searchStr || loc.hash) return;
    navigate({ to: localStorage.getItem(lastVisitedRouteLsName) || '/cm/i' });
  }, [loc.hash, loc.pathname.length, loc.searchStr, navigate, onSet]);

  return <></>;
};
