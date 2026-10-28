import type { Langi } from 'shared/api';
import type { DynLocaleKey } from 'shared/model/+locale/_DynLocaleKey';
import type { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import type { LocaleBase, UsedBaseLocaleKey } from 'shared/model/+locale/base';
import type { LocaleDynamic } from 'shared/model/+locale/dynamic';
import type { LocaleCmEditor } from 'shared/model/+locale/editor';
import { STR } from 'shared/utils/stringTemplater';
import type { VarKey } from 'shared/utils/stringTemplater/model';

type TplArgs<Tag extends (...args: never[]) => unknown> =
  Parameters<Tag> extends [TemplateStringsArray, ...infer Args] ? Args : never;

type TplRest<SubKeys, SK extends string | number> = [SubKeys] extends [never]
  ? [vars?: readonly VarKey[]]
  : [subKey: SK & TplValidSubKey<SubKeys, SK>, vars?: readonly VarKey[]];

type TplValidSubKey<SubKeys, SK extends string | number> = `${SK}` extends SubKeys ? SK : never;

type TplKey<K, SK extends string | number> = [SK] extends [never] ? K : `${SK}`;

const isVarKeys = (it: unknown): it is readonly VarKey[] => Array.isArray(it);

const makeTpl = <Val extends string, Key extends PropertyKey>(key: PropertyKey, vars: readonly VarKey[]) => {
  const tag = STR<Val, readonly VarKey[]>(vars);

  return (tpl: TemplateStringsArray, ...args: TplArgs<typeof tag>) =>
    // The record key is built from the same const key/subkey pair that types it, so this one-entry shape is exact.
    ({ [key]: tag(tpl, ...args) }) as Record<Key, ReturnType<typeof tag>>;
};

type BaseLocaleVal<K extends UsedBaseLocaleKey> = LocaleBase<Langi>[K];
type BaseSubKeys<K extends UsedBaseLocaleKey> = BaseLocaleVal<K> extends Record<infer Key extends string, unknown>
  ? Key
  : never;
type BaseTplVal<K extends UsedBaseLocaleKey, SK extends string | number> = Extract<
  [SK] extends [never] ? BaseLocaleVal<K> : BaseLocaleVal<K>[Extract<`${SK}`, keyof BaseLocaleVal<K>>],
  string
>;

const makeBaseTpl = <K extends UsedBaseLocaleKey, SK extends string | number = never>(key: PropertyKey, vars: readonly VarKey[]) =>
  makeTpl<BaseTplVal<K, SK>, TplKey<K, SK>>(key, vars);

export function baseLocaleTemplate<const K extends UsedBaseLocaleKey>(
  key: K,
  ...rest: [BaseSubKeys<K>] extends [never] ? [vars?: readonly VarKey[]] : [subKey: TplValidSubKey<BaseSubKeys<K>, never>]
): ReturnType<typeof makeBaseTpl<K>>;
export function baseLocaleTemplate<const K extends UsedBaseLocaleKey, const SK extends string | number>(
  key: K,
  subKey: SK & TplValidSubKey<BaseSubKeys<K>, SK>,
  vars?: readonly VarKey[],
): ReturnType<typeof makeBaseTpl<K, SK>>;
export function baseLocaleTemplate<const K extends UsedBaseLocaleKey, const SK extends string | number = never>(
  key: K,
  ...rest: TplRest<BaseSubKeys<K>, SK>
): ReturnType<typeof makeBaseTpl<K, SK>> {
  const [first, second] = rest;
  const [subKey, vars] = isVarKeys(first) ? ([undefined, first] as const) : ([first, second] as const);

  return makeBaseTpl<K, SK>(subKey ?? key, vars ?? []);
}

type EditorLocaleVal<K extends EditorLocaleKey> = LocaleCmEditor[K];
type EditorSubKeys<K extends EditorLocaleKey> = EditorLocaleVal<K> extends Record<infer Key extends string, unknown>
  ? Key
  : never;
type EditorTplVal<K extends EditorLocaleKey, SK extends string | number> = Extract<
  [SK] extends [never] ? EditorLocaleVal<K> : EditorLocaleVal<K>[Extract<`${SK}`, keyof EditorLocaleVal<K>>],
  string
>;

const makeEditorTpl = <K extends EditorLocaleKey, SK extends string | number = never>(
  key: PropertyKey,
  vars: readonly VarKey[],
) => makeTpl<EditorTplVal<K, SK>, TplKey<K, SK>>(key, vars);

export function editorLocaleTemplate<const K extends EditorLocaleKey>(
  key: K,
  ...rest: [EditorSubKeys<K>] extends [never]
    ? [vars?: readonly VarKey[]]
    : [subKey: TplValidSubKey<EditorSubKeys<K>, never>]
): ReturnType<typeof makeEditorTpl<K>>;
export function editorLocaleTemplate<const K extends EditorLocaleKey, const SK extends string | number>(
  key: K,
  subKey: SK & TplValidSubKey<EditorSubKeys<K>, SK>,
  vars?: readonly VarKey[],
): ReturnType<typeof makeEditorTpl<K, SK>>;
export function editorLocaleTemplate<const K extends EditorLocaleKey, const SK extends string | number = never>(
  key: K,
  ...rest: TplRest<EditorSubKeys<K>, SK>
): ReturnType<typeof makeEditorTpl<K, SK>> {
  const [first, second] = rest;
  const [subKey, vars] = isVarKeys(first) ? ([undefined, first] as const) : ([first, second] as const);

  return makeEditorTpl<K, SK>(subKey ?? key, vars ?? []);
}

export const dynamicLocaleTemplate = <const K extends DynLocaleKey>(key: K, vars?: readonly VarKey[]) => {
  const tag = STR<Extract<LocaleDynamic<Langi>[K], string>, readonly VarKey[]>(vars ?? []);

  return (tpl: TemplateStringsArray, ...args: TplArgs<typeof tag>) =>
    // The record key is built from the same const key that types it, so this one-entry shape is exact.
    ({ [key]: tag(tpl, ...args) }) as Record<K, ReturnType<typeof tag>>;
};
