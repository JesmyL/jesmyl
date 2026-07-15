import { CmComLangi, CmComMod, CmComWidDef, IExportableCom } from 'shared/api';

export const cmDefaultCom = (w = CmComWidDef): IExportableCom => ({
  m: CmComMod.def,
  n: '',
  w,
  c: [],
  t: [],
  l: CmComLangi.Ru,
});
