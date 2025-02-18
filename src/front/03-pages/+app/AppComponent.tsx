import { indexInitialInvokes } from '#processes/initial-invokes/index-initial-invokes';
import { AppRootAnchorNodesContext } from '#shared/ui/fullscreen-content/nodes-context';
import { useFingersActions } from 'front/08-shared/lib/global-listeners/useFingersActions';
import { useGlobalFontFamilySetter } from 'front/08-shared/lib/global-listeners/useGlobalFontFamilySetter';
import { useGlobalFullscreenChanger } from 'front/08-shared/lib/global-listeners/useGlobalFullscreenChanger';
import { hookEffectPipe, setTimeoutPipe } from 'front/08-shared/lib/hookEffectPipe';
import JesmylLogo from 'front/08-shared/ui/jesmyl-logo/JesmylLogo';
import { KEYBOARD_FLASH } from 'front/08-shared/ui/keyboard/KeyboardInput';
import { MyLib } from 'front/utils';
import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { emptyArray } from 'shared/utils';
import { useCurrentApp } from '../../components/index/atoms';

const emptyDict = {};

export default function AppComponent() {
  const currentApp = useCurrentApp();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [isShowLogo, setIsShowLogo] = useState(true);
  const [rootAnchorNodes, setRootAnchorNodes] = useState<Record<string, React.ReactNode>>(emptyDict);

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
    <AppRootAnchorNodesContext.Provider value={setRootAnchorNodes}>
      {MyLib.values(rootAnchorNodes)}
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
    </AppRootAnchorNodesContext.Provider>
  );
}

indexInitialInvokes();
