import { Bool } from 'shared/enums';
import { CmCatKind, CmCatWid, CmComWid, IExportableCat } from 'shared/api';
import { checkIsArray, checkIsNumber, checkIsObject, checkIsString } from 'shared/utils/checkIs';
import { objectValues } from 'shared/utils/object.utils';

const legacyKindCodes: Record<string, CmCatKind> = {
  dict: CmCatKind.dict,
  list: CmCatKind.list,
};

const kindCodes = new Set<number>(objectValues(legacyKindCodes));

const takeKindCode = (value: unknown) => {
  if (checkIsNumber(value)) return kindCodes.has(value) ? (value as CmCatKind) : null;

  return checkIsString(value) && Object.hasOwn(legacyKindCodes, value) ? legacyKindCodes[value] : null;
};

const takeComws = (value: unknown) =>
  checkIsArray(value) && value.every(checkIsNumber) ? (value as CmComWid[]) : null;

const takeComNumDict = (value: unknown) =>
  checkIsObject(value) && objectValues(value).every(checkIsNumber) ? (value as PRecord<CmComWid, number>) : null;

/** Legacy файловые/IDB-категории хранили текстовый `k`; в БД/IDB v3 — числовой код. */
export const parseLegacyICat = (raw: unknown): (IExportableCat & { m: number }) | nil => {
  if (!checkIsObject(raw)) return null;

  const k = takeKindCode(raw.k);
  const n = checkIsString(raw.n) ? raw.n.trim() : '';
  /** `m` в pull-артефактах отсутствует — при импорте его выставляет БД. */
  const m = raw.m ?? Date.now();

  if (k == null || !n || !checkIsNumber(raw.w) || !checkIsNumber(m)) return null;

  const cat: IExportableCat & { m: number } = {
    w: raw.w as CmCatWid,
    m,
    n,
    k,
  };

  const s = takeComws(raw.s);
  const d = takeComNumDict(raw.d);

  if (s) cat.s = s;
  if (d) cat.d = d;
  if (raw.isRemoved === Bool.True) cat.isRemoved = Bool.True;

  return cat;
};
