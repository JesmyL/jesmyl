import { builtInColorGamuts, takeEffectiveGamutIndex } from '#basis/model/ColorGamut.model';
import { indexIDB } from '$index/shared/state';
import { useEffect } from 'react';

const htmlElement = document.documentElement;
const gamutClassPrefix = 'gamut-';

const applyColorGamut = (gamutIndex: number | nil) => {
  builtInColorGamuts.forEach((_, gamuti) => htmlElement.classList.remove(`${gamutClassPrefix}${gamuti + 1}`));

  if (gamutIndex == null) return;

  htmlElement.classList.add(`${gamutClassPrefix}${takeEffectiveGamutIndex(gamutIndex)}`);
};

export const useGlobalColorGamutSetter = () => {
  const gamutIndex = indexIDB.useValue.appColorGamutIndex();

  useEffect(() => {
    applyColorGamut(gamutIndex);
  }, [gamutIndex]);

  useEffect(() => () => applyColorGamut(null), []);
};
