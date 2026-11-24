import { builtInColorGamuts, takeEffectiveGamutIndex } from '#basis/model/ColorGamut.model';
import { remoteGamutIndexAtom } from '#features/broadcast/remote/model';
import { indexIsDarkModeAtom } from '$index/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';

const htmlElement = document.documentElement;
const gamutClassPrefix = 'gamut-';

export const PultThemeSync = () => {
  const isDarkMode = useAtomValue(indexIsDarkModeAtom);
  const gamutIndex = useAtomValue(remoteGamutIndexAtom);

  useEffect(() => {
    if (isDarkMode) htmlElement.classList.add('dark');
    else htmlElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    builtInColorGamuts.forEach((_, gamuti) => htmlElement.classList.remove(`${gamutClassPrefix}${gamuti + 1}`));

    if (gamutIndex != null) htmlElement.classList.add(`${gamutClassPrefix}${takeEffectiveGamutIndex(gamutIndex)}`);
  }, [gamutIndex]);

  return null;
};
