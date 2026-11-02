import { indexIDB, indexIsDarkModeAtom } from '$index/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';

const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const themeColorVarName = '--color-x2';

export const useGlobalThemeColorSetter = () => {
  const isDarkMode = useAtomValue(indexIsDarkModeAtom);
  const gamutIndex = indexIDB.useValue.appColorGamutIndex();

  useEffect(() => {
    const themeColor =
      getComputedStyle(document.documentElement).getPropertyValue(themeColorVarName).trim() ||
      (isDarkMode ? '#000' : '#fff');

    themeColorMeta?.setAttribute('content', themeColor);
  }, [isDarkMode, gamutIndex]);
};
