import { currentAppNameAtom } from '#basis/lib/atoms/currentAppNameAtom';
import { useFingersActions } from '#basis/lib/global-listeners/useFingersActions';
import { useGlobalFontFamilySetter } from '#basis/lib/global-listeners/useGlobalFontFamilySetter';
import { useGlobalFullscreenChanger } from '#basis/lib/global-listeners/useGlobalFullscreenChanger';
import { JesmylLogo } from '#basis/ui/jesmyl-logo/JesmylLogo';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { useToast } from '#shared/ui/modal/useToast';
import { schLinkAction } from '#widgets/schedule/links';
import { Outlet, ParsedLocation, useLocation, useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { soki } from 'front/soki';
import { useEffect, useState } from 'react';
import { emptyArray } from 'shared/utils';
import { routingApps } from './lib/configs';
import { lastVisitedRouteLsName } from './lib/consts';

export const AppComponent = () => {
  const loc = useLocation();
  const [isNeedFirstNavigate, setIsNeedFirstNavigate] = useState(true);
  const [isShowLogo, setIsShowLogo] = useState(true);
  const toast = useToast();
  const appName = useAtomValue(currentAppNameAtom);

  useEffect(() => {
    const unauthListener = soki.onTokenInvalidEvent.listen(() => {
      toast('Авторизация не действительна', { mood: 'ko' });
    });

    const errorMessageListener = soki.onInvokeErrorMessageEvent.listen(errorMessage => {
      toast(errorMessage, { mood: 'ko' });
    });

    return () => {
      unauthListener();
      errorMessageListener();
    };
  }, [toast]);

  useFingersActions();
  useGlobalFontFamilySetter();

  useEffect(() => soki.pushCurrentUrl(), [loc.href]);

  const [isFullscreen, fullscreenIcon] = useGlobalFullscreenChanger();

  useEffect(() => {
    return hookEffectPipe()
      .pipe(setTimeoutPipe(setIsShowLogo, 1200, false))
      .effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, emptyArray);

  return (
    <>
      <div className={`above-container`}>
        {isShowLogo && (
          <div className="jesmyl-smile-box flex center absolute full-width full-height z-index:5">
            <JesmylLogo className="no-fade-in-effect" />
          </div>
        )}
        <div className={`application-container ${isFullscreen ? ' fullscreen-mode' : ''}`}>
          <Outlet />
          {fullscreenIcon}
        </div>
      </div>
      {isNeedFirstNavigate && (
        <FirstNaver
          onSet={setIsNeedFirstNavigate}
          loc={loc as never}
        />
      )}

      {appName && routingApps[appName]?.footer}
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
