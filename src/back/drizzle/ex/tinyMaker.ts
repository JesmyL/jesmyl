/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { checkIsNil, checkIsNotUndefined, checkIsNull } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';

export const tinyMakerGenerator = <
  const VectorKey extends keyof Tiny,
  const Id extends Tiny extends { id: infer Id extends number } ? Id : string,
  VectorValue extends Tiny[VectorKey] & (number | string),
  Tiny extends Record<VectorKey, VectorValue>,
  ResetKey extends string,
  Part extends Omit<Partial<Tiny>, VectorKey | 'id'> & Record<VectorKey, VectorValue> & { id: Id },
  Selector extends { id: Id } | { [K in VectorKey]: VectorValue },
>(
  _tinyType: Tiny,
  vectorKey: VectorKey,
  textOnThrow: string,
  takeTinyDb: (
    mkSimpleWhere: (table: PgTableWithColumns<any>) => ReturnType<typeof eq>,
    sel: Selector,
  ) => Promise<Part | nil>,
  mapFinalTiny: (tiny: Part, vectorKey: VectorValue, id: Id) => PromiseOr<Tiny>,
  checkIsReset?: (resetKey: ResetKey) => boolean,
) => {
  type IdSel = `:${Id}`;
  const dict: PRecord<VectorValue | IdSel, { t: Tiny; f: VectorValue; s: IdSel } | nil> = {};

  const _id = 'id';
  const mkSel = (selector: Selector) => {
    if (_id in selector ? checkIsNil(selector.id) : checkIsNil(selector[vectorKey as never]))
      throw `Incorrect selector { ${objectKeys(selector)}: ${_id in selector ? selector.id : selector[vectorKey as never]} }`;
    return _id in selector ? (`:${selector.id}` as const) : selector[vectorKey as never];
  };

  const resetTiny = (selector: Selector, resetKey?: ResetKey) => {
    if (checkIsNil(checkIsReset) || checkIsNil(resetKey) || checkIsReset(resetKey)) {
      const val = dict[mkSel(selector)];
      if (val) {
        delete dict[val.f];
        delete dict[val.s];
      }
    }
  };

  const takeTiny = async <IsThrowIfNotFound extends boolean = true>(
    selector: Selector,
    isThrowIfNotFound?: IsThrowIfNotFound,
  ): Promise<IsThrowIfNotFound extends true ? Tiny : Tiny | nil> => {
    const sel = mkSel(selector) as `:${Id}`;

    if (checkIsNotUndefined(dict[sel])) {
      if (checkIsNull(dict[sel]) && isThrowIfNotFound !== false) throw textOnThrow;

      return dict[sel]?.t as never;
    }

    const tiny = await takeTinyDb(
      table => (_id in selector ? eq(table.id, selector.id) : eq(table[vectorKey], selector[vectorKey as never])),
      selector,
    );

    let t: Tiny | null = null;

    if (tiny) {
      const idSel = `:${tiny.id}` as const;
      t = await mapFinalTiny(tiny, tiny[vectorKey], tiny.id);

      dict[idSel] = dict[tiny[vectorKey]] = { t, s: idSel, f: tiny[vectorKey] };
    } else {
      if (isThrowIfNotFound) throw textOnThrow;

      t = dict[sel] = null;
    }

    return t as never;
  };

  return [takeTiny, resetTiny] as const;
};
