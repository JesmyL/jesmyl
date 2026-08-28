import { FooterPlacementManager } from '#basis/lib/FooterPlacementManager';
import { useFingersActions } from '#basis/lib/global-listeners/useFingersActions';
import { useGlobalFontFamilySetter } from '#basis/lib/global-listeners/useGlobalFontFamilySetter';
import { currentLangiAtom, translateBase } from '#basis/locale';
import { currentAppNameAtom } from '#basis/state/currentAppNameAtom';
import { hideAppFooterAtom } from '#basis/state/hideAppFooterAtom';
import { takeBaseLanguageAtom, takeDynamicLanguageAtom } from '#basis/state/locale';
import { JesmylLogo } from '#basis/ui/jesmyl-logo/JesmylLogo';
import { isFullscreenAtom, switchFullScreen } from '#shared/lib/atoms/fullscreen';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { soki } from '#shared/soki';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { schLinkAction } from '#widgets/schedule/links';
import { indexIDB } from '$index/shared/state';
import { Outlet, ParsedLocation, useLocation, useNavigate } from '@tanstack/react-router';
import { atom, useAtomValue } from 'atomaric';
import React, { useEffect, useState } from 'react';
import { langCodeDict, langCodeLoadingTitleDict } from 'shared/const/+locale';
import { extractNumber, iife } from 'shared/utils';
import { forEachObjectEntries } from 'shared/utils/object.utils';
import { toast } from 'sonner';
import { appInitialInvokes } from './app-initial-invokes';
import { AppFooter } from './AppFooter';
import { routingApps } from './lib/configs';
import { localeIsLoadingAtom } from './store/triggers';

appInitialInvokes();

const forceUpdateAtom = atom(0);

takeBaseLanguageAtom().subscribe(() => forceUpdateAtom.do.increment());
forEachObjectEntries(langCodeDict, langiStr =>
  takeDynamicLanguageAtom(extractNumber(langiStr)).subscribe(() => forceUpdateAtom.do.increment()),
);

export const AppComponent = () => {
  const num = useAtomValue(forceUpdateAtom);

  const loc = useLocation();
  const [isNeedFirstNavigate, setIsNeedFirstNavigate] = useState(true);
  const [isShowLogo, setIsShowLogo] = useState(true);
  const appName = useAtomValue(currentAppNameAtom);
  const hideAppFooter = useAtomValue(hideAppFooterAtom);
  const isFullscreen = useAtomValue(isFullscreenAtom);
  const currentLangi = useAtomValue(currentLangiAtom);

  useEffect(() => {
    const unauthListener = soki.onTokenInvalidEvent.listen(() => {
      toast(
        translateBase(it => it.authIncorrect),
        makeToastKOMoodConfig(),
      );
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
  }, []);

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
          <Outlet key={num} />
          {isFullscreen && (
            <LazyIcon
              icon="ArrowShrink02"
              className="pointer absolute top-0 right-0 z-50 m-[10px]"
              onClick={() => switchFullScreen(false)}
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

      <React.Fragment key={num}>
        {appName &&
          (routingApps[appName]?.footer ?? (
            <AppFooter
              appName={appName}
              children={() => [
                <div
                  key={0}
                  className="size-full flex justify-center items-center pb-3"
                >
                  {translateBase(it => it.selProgram)}
                </div>,
              ]}
            />
          ))}
      </React.Fragment>
      <FullContent
        openAtom={localeIsLoadingAtom}
        checkIsOpen={num => num > 0}
        containerClassName="flex justify-center items-center w-full h-full"
      >
        {langCodeLoadingTitleDict[currentLangi] ?? 'Texts is loading'}
      </FullContent>
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
    navigate({ to: FooterPlacementManager.lastVisitedRouteUrl });
  }, [loc.hash, loc.pathname.length, loc.searchStr, navigate, onSet]);

  return <></>;
};

iife(async () => {
  const schs = await indexIDB.tb.schs.toCollection().keys();
  const keys = schs.flatMap(schw => (schw === Math.trunc(+schw) ? [] : [schw]));

  await indexIDB.tb.schs.where('w').anyOf(keys).delete();
});
