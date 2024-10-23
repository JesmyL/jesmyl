import { SetStateAction, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { contextCreator } from '../complect/contextCreator';
import { useFingersActions } from '../complect/global-listeners/useFingersActions';
import { useGlobalFontFamilySetter } from '../complect/global-listeners/useGlobalFontFamilySetter';
import { useGlobalFullscreenChanger } from '../complect/global-listeners/useGlobalFullscreenChanger';
import { hookEffectPipe, setTimeoutPipe } from '../complect/hookEffectPipe';
import JesmylLogo from '../complect/jesmyl-logo/JesmylLogo';
import { KEYBOARD_FLASH } from '../complect/keyboard/KeyboardInput';
import { MyLib } from '../complect/my-lib/MyLib';
import { useCurrentApp } from '../components/index/molecules';
import { IndexAdvertisingReminder } from '../components/index/parts/advertising/Reminder';
import { useIsReadyRouter } from '../components/router/atoms';
import './App.scss';

const emptyArr: [] = [];
const emptyDict = {};

const [SetAppRootAnchorNodesContext, useSetAppRootAnchorNodesContext] = contextCreator(
  (_nodes: SetStateAction<Record<string, React.ReactNode>>) => {},
);

export { useSetAppRootAnchorNodesContext };

export default function AppComponent() {
  const currentApp = useCurrentApp();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [isShowLogo, setIsShowLogo] = useState(true);
  const [, setIsReady] = useIsReadyRouter();
  const [rootAnchorNodes, setRootAnchorNodes] = useState<Record<string, React.ReactNode>>(emptyDict);

  useFingersActions();
  useGlobalFontFamilySetter();

  const [isFullscreen, fullscreenIcon] = useGlobalFullscreenChanger();

  useEffect(() => {
    return hookEffectPipe()
      .pipe(setTimeoutPipe(setIsShowLogo, 1200, false), setTimeoutPipe(setIsReady, 100, true))
      .effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, emptyArr);

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
          <IndexAdvertisingReminder />
        </div>
        <KEYBOARD_FLASH {...keyboardProps} />
      </div>
    </SetAppRootAnchorNodesContext.Provider>
  );
}
