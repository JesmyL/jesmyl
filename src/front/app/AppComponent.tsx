import { useFingersActions } from '#basis/lib/+hooks/useFingersActions';
import { useGlobalFontFamilySetter } from '#basis/lib/+hooks/useGlobalFontFamilySetter';
import { useGlobalFullscreenChanger } from '#basis/lib/+hooks/useGlobalFullscreenChanger';
import { JesmylLogo } from '#basis/ui/jesmyl-logo/JesmylLogo';
import { MyLib } from '#shared/lib/my-lib';
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { emptyArray } from 'shared/utils';
import { useCurrentApp } from '../components/index/atoms';
import { contextCreator } from '../shared/lib/contextCreator';
import { hookEffectPipe, setTimeoutPipe } from '../shared/lib/hookEffectPipe';
import { KEYBOARD_FLASH } from '../shared/ui/keyboard/KeyboardInput';
import './App.scss';
import { appInitialInvokes } from './app-initial-invokes';

const emptyDict = {};

const [SetAppRootAnchorNodesContext, useSetAppRootAnchorNodesContext] = contextCreator(
  (_nodes: SetStateAction<Record<string, React.ReactNode>>) => {},
);

export { useSetAppRootAnchorNodesContext };

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
