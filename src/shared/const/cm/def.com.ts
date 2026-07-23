import { CmComMod, CmComWidDef, IExportableCom, Langi } from 'shared/api';

export const cmDefaultCom = (w = CmComWidDef): IExportableCom => ({
  m: CmComMod.def,
  n: '',
  w,
  c: [],
  t: [],
  l: Langi.Ru,
});
