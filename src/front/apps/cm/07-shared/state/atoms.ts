import { atom } from 'atomaric';
import { cmConstantsDefaultConfig } from 'shared/values/cm/cmConstantsDefaultConfig';

export const cmConstantsConfigAtom = atom(cmConstantsDefaultConfig, 'cm:constantsConfig');
