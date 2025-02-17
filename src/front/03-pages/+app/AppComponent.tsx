import { appInitialInvokes } from '#processes/invokes/app-initial-invokes';
import JesmylLogo from '#shared/ui/jesmyl-logo/JesmylLogo';
import { KEYBOARD_FLASH } from '#shared/ui/keyboard/KeyboardInput';
import { SetAppRootAnchorNodesContext } from '#widgets/fullscreen-content/app-root-anchor-nodes-context';
import { MyLib } from 'front/utils';
import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { emptyArray } from 'shared/utils';
import { useFingersActions } from '../../07-shared/lib/global-listeners/useFingersActions';
import { useGlobalFontFamilySetter } from '../../07-shared/lib/global-listeners/useGlobalFontFamilySetter';
import { useGlobalFullscreenChanger } from '../../07-shared/lib/global-listeners/useGlobalFullscreenChanger';
import { hookEffectPipe, setTimeoutPipe } from '../../07-shared/lib/hookEffectPipe';
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
    <SetAppRootAnchorNodesContext.Provider value={setRootAnchorNodes}>
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
    </SetAppRootAnchorNodesContext.Provider>
  );
}

appInitialInvokes();
