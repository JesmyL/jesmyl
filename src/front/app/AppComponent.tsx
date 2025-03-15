import { useFingersActions } from '#basis/lib/global-listeners/useFingersActions';
import { useGlobalFontFamilySetter } from '#basis/lib/global-listeners/useGlobalFontFamilySetter';
import { useGlobalFullscreenChanger } from '#basis/lib/global-listeners/useGlobalFullscreenChanger';
import { JesmylLogo } from '#basis/ui/jesmyl-logo/JesmylLogo';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { KEYBOARD_FLASH } from '#shared/ui/keyboard/KeyboardInputFlash';
import { useToast } from '#shared/ui/modal/useToast';
import { schLinkAction } from '#widgets/schedule/links';
import { Outlet, ParsedLocation, useLocation, useNavigate } from '@tanstack/react-router';
import { soki } from 'front/soki';
import { useEffect, useMemo, useState } from 'react';
import { emptyArray } from 'shared/utils';
import { appInitialInvokes } from './app-initial-invokes';
import { lastVisitedRouteLsName } from './lib/consts';

export const AppComponent = () => {
  const loc = useLocation();
  const [isNeedFirstNavigate, setIsNeedFirstNavigate] = useState(true);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [isShowLogo, setIsShowLogo] = useState(true);
  const toast = useToast();

  useEffect(
    () => soki.onTokenInvalidEvent.listen(() => toast('Авторизация не действительна', { mood: 'ko' })),
    [toast],
  );

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

  const keyboardProps = useMemo(() => {
    return { onFocus: () => setKeyboardOpen(true), onBlur: () => setKeyboardOpen(false) };
  }, []);

  return (
    <>
      <div className={`above-container ${keyboardOpen ? 'keyboard-open' : ''}`}>
        {isShowLogo && (
          <div className="jesmyl-smile-box flex center absolute full-width full-height z-index:5">
            <JesmylLogo className="no-fade-in-effect" />
          </div>
        )}
        <div className={`application-container ${isFullscreen ? ' fullscreen-mode' : ''}`}>
          {fullscreenIcon}

          <Outlet />
        </div>
        <KEYBOARD_FLASH {...keyboardProps} />
      </div>
      {isNeedFirstNavigate && (
        <FirstNaver
          onSet={setIsNeedFirstNavigate}
          loc={loc as never}
        />
      )}
    </>
  );
};

appInitialInvokes();

const FirstNaver = ({ onSet, loc }: { onSet: (is: false) => void; loc: ParsedLocation<object> }) => {
  const navigate = useNavigate();
  const onHrefData = LinkAppActionFabric.useOnHrefData();
  schLinkAction.register();

  useEffect(() => {
    onHrefData(window.location.href);
  }, [onHrefData]);

  useEffect(() => {
    onSet(false);
    if (loc.pathname.length > 1) return;
    navigate({ to: localStorage.getItem(lastVisitedRouteLsName) || '/cm/i' });
  }, [loc.pathname.length, navigate, onSet]);

  return <></>;
};
