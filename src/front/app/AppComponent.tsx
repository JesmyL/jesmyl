import { SetAppRootAnchorNodesContext } from '#basis/lib/App.contexts';
import { useFingersActions } from '#basis/lib/global-listeners/useFingersActions';
import { useGlobalFontFamilySetter } from '#basis/lib/global-listeners/useGlobalFontFamilySetter';
import { useGlobalFullscreenChanger } from '#basis/lib/global-listeners/useGlobalFullscreenChanger';
import { JesmylLogo } from '#basis/ui/jesmyl-logo/JesmylLogo';
import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { KEYBOARD_FLASH } from '#shared/ui/keyboard/KeyboardInputFlash';
import { useCurrentApp } from '@index/atoms';
import React, { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { emptyArray } from 'shared/utils';
import { appInitialInvokes } from './app-initial-invokes';

export default function AppComponent() {
  const currentApp = useCurrentApp();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [isShowLogo, setIsShowLogo] = useState(true);
  const [rootAnchorNodes, setRootAnchorNodes] = useState<Map<string, React.ReactNode>>(new Map());

  useFingersActions();
  useGlobalFontFamilySetter();

  const [isFullscreen, fullscreenIcon] = useGlobalFullscreenChanger();

  useEffect(() => {
    return hookEffectPipe()
      .pipe(setTimeoutPipe(setIsShowLogo, 1200, false))
      .effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, emptyArray);

  const keyboardProps = useMemo(() => {
    return {
      onFocus: () => setKeyboardOpen(true),
      onBlur: () => setKeyboardOpen(false),
    };
  }, []);

  return (
    <SetAppRootAnchorNodesContext.Provider value={setRootAnchorNodes}>
      {Array.from(rootAnchorNodes.entries()).map(([key, node]) => (
        <React.Fragment key={key}>{node}</React.Fragment>
      ))}
      <div className={`above-container ${keyboardOpen ? 'keyboard-open' : ''}`}>
        {isShowLogo && (
          <div className="jesmyl-smile-box flex center absolute full-width full-height z-index:5">
            <JesmylLogo className="no-fade-in-effect" />
          </div>
        )}
        <div className={`application-container app_${currentApp}${isFullscreen ? ' fullscreen-mode' : ''}`}>
          {fullscreenIcon}
          <Outlet />
        </div>
        <KEYBOARD_FLASH {...keyboardProps} />
      </div>
    </SetAppRootAnchorNodesContext.Provider>
  );
}

appInitialInvokes();
