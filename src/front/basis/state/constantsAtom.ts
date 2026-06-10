import { cmSecureAtomLevel } from '#shared/const/values';
import { atom } from 'atomaric';
import { ConstantsConfig } from 'shared/api';
import { constantsDefaultConfig } from 'shared/const/cm/constants.def';

export const constantsConfigAtom = atom(constantsDefaultConfig, {
  storageKey: 'app:constantsConfig',
  securifyKeyLevel: cmSecureAtomLevel,
  securifyValueLevel: cmSecureAtomLevel,
});

/** @deprecated */
const cmConstantsConfigAtom = atom((): ConstantsConfig | nil => null, {
  storageKey: 'cm:constantsConfig',
  securifyKeyLevel: cmSecureAtomLevel,
  securifyValueLevel: cmSecureAtomLevel,
});

const cmVal = cmConstantsConfigAtom.get();
if (cmVal) constantsConfigAtom.set(cmVal);
cmConstantsConfigAtom.reset();
