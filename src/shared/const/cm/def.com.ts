import { CmComLangi, CmComMod, CmComWid, IExportableCom } from 'shared/api';

export const cmDefaultCom = (w = CmComWid.def): IExportableCom => ({
  m: CmComMod.def,
  n: '',
  w,
  c: [],
  t: [],
  l: CmComLangi.Ru,
});
