import type { Langi } from 'shared/api';
import type { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import type { DynLocaleKey } from 'shared/model/+locale/_DynLocaleKey';
import type { LocaleBase } from 'shared/model/+locale/base';
import type { LocaleDynamic } from 'shared/model/+locale/dynamic';
import { STR } from 'shared/utils/stringTemplater';
import type { VarKey } from 'shared/utils/stringTemplater/model';

type BaseLocaleVal<K extends BaseLocaleKey> = LocaleBase<Langi>[K];

type BaseSubKeys<K extends BaseLocaleKey> = BaseLocaleVal<K> extends Record<infer Key extends string, unknown>
  ? Key
  : never;

type ValidSubKey<K extends BaseLocaleKey, SK extends string | number> = `${SK}` extends BaseSubKeys<K> ? SK : never;

type BaseTplVal<K extends BaseLocaleKey, SK extends string | number> = Extract<
  [SK] extends [never] ? BaseLocaleVal<K> : BaseLocaleVal<K>[Extract<`${SK}`, keyof BaseLocaleVal<K>>],
  string
>;

type TplKey<K extends BaseLocaleKey, SK extends string | number> = [SK] extends [never] ? K : `${SK}`;

type TplArgs<Tag extends (...args: never[]) => unknown> =
  Parameters<Tag> extends [TemplateStringsArray, ...infer Args] ? Args : never;

// A record key requires its subkey; a plain key takes the optional vars array instead.
type TplRest<K extends BaseLocaleKey, SK extends string | number> = [BaseSubKeys<K>] extends [never]
  ? [vars?: readonly VarKey[]]
  : [subKey: SK & ValidSubKey<K, SK>, vars?: readonly VarKey[]];

const isVarKeys = (it: unknown): it is readonly VarKey[] => Array.isArray(it);

const makeBaseTpl = <K extends BaseLocaleKey, SK extends string | number = never>(
  key: PropertyKey,
  vars: readonly VarKey[],
) => {
  const tag = STR<BaseTplVal<K, SK>, readonly VarKey[]>(vars);

  return (tpl: TemplateStringsArray, ...args: TplArgs<typeof tag>) =>
    // The record key is built from the same const key/subkey pair that types it, so this one-entry shape is exact.
    ({ [key]: tag(tpl, ...args) }) as Record<TplKey<K, SK>, ReturnType<typeof tag>>;
};

export function baseLocaleTemplate<const K extends BaseLocaleKey>(
  key: K,
  ...rest: [BaseSubKeys<K>] extends [never] ? [vars?: readonly VarKey[]] : [subKey: ValidSubKey<K, never>]
): ReturnType<typeof makeBaseTpl<K>>;
export function baseLocaleTemplate<const K extends BaseLocaleKey, const SK extends string | number>(
  key: K,
  subKey: SK & ValidSubKey<K, SK>,
  vars?: readonly VarKey[],
): ReturnType<typeof makeBaseTpl<K, SK>>;
export function baseLocaleTemplate<const K extends BaseLocaleKey, const SK extends string | number = never>(
  key: K,
  ...rest: TplRest<K, SK>
): ReturnType<typeof makeBaseTpl<K, SK>> {
  const [first, second] = rest;
  const [subKey, vars] = isVarKeys(first) ? ([undefined, first] as const) : ([first, second] as const);

  return makeBaseTpl<K, SK>(subKey ?? key, vars ?? []);
}

export const dynamicLocaleTemplate = <const K extends DynLocaleKey>(key: K, vars?: readonly VarKey[]) => {
  const tag = STR<Extract<LocaleDynamic<Langi>[K], string>, readonly VarKey[]>(vars ?? []);

  return (tpl: TemplateStringsArray, ...args: TplArgs<typeof tag>) =>
    // The record key is built from the same const key that types it, so this one-entry shape is exact.
    ({ [key]: tag(tpl, ...args) }) as Record<K, ReturnType<typeof tag>>;
};
