/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeRegExp } from 'regexpert';
import { checkIsUndefined } from '../checkIs';
import { objectKeys } from '../object.utils';
import { strTplArgSeparator } from './const';
import { StringTemplaterGenKey, StringTemplaterInterpolation, StringTemplaterVals, VarKey } from './model';

const enum ConceptKey {
  Condition = 30,
  Func,
  Struct,
  Util,
}

const enum TypeKey {
  And,
  Or,
  Fn,
  IfElse,
  Switch,
  Util,
  Generate,
}

type TplArg = OmitConceptKeys<Concept<ConceptKey, Exclude<TypeKey, TypeKey.Generate>>, 'ELSE'>;

type AnyCondition =
  | string
  | number
  | boolean
  | OmitConceptKeys<Concept<ConceptKey.Condition | ConceptKey.Func | ConceptKey.Util, TypeKey>, ''>;

type OmitConceptKeys<C extends Concept<ConceptKey, TypeKey>, K extends keyof C | string> = Omit<C, K | 'k'>;

declare const switchMeta: unique symbol;
declare const switchErrMeta: unique symbol;

type SwitchPhantom<Key extends string, Cases> = <Vals extends object>(
  vals: Key extends keyof Vals
    ? [Cases] extends [Vals[Key & keyof Vals]]
      ? Vals
      : { readonly [switchErrMeta]: { key: Key; cases: Cases; allowed: Vals[Key & keyof Vals] } }
    : { readonly [switchErrMeta]: { key: Key } },
) => void;

class Concept<Concept extends ConceptKey, Type extends TypeKey> {
  k?: VarKey;

  constructor(
    key: string,
    private concept: Concept,
    public t: Type,
  ) {
    this.k = `$${key}`;
  }
}

type ConceptValueMap = {
  [TypeKey.IfElse]: IfElseStructConcept;
  [TypeKey.Switch]: SwitchStructConcept;
  [TypeKey.Generate]: GenerateStructConcept<string>;

  [TypeKey.And]: AndConditionConcept;
  [TypeKey.Or]: OrConditionConcept;

  [TypeKey.Fn]: FunctionConcept;
  [TypeKey.Util]: UtilConcept;
};

type AnyConcept = {
  [K in TypeKey]: Concept<ConceptKey, K>;
}[TypeKey];

const takeConceptValue = <const C extends Concept<ConceptKey, TypeKey>>(
  concept: C,
): ConceptValueMap[NonNullable<Required<C>['t']>] => {
  return concept as never;
};

const stringifyCondition = (cond: AnyCondition) => (cond instanceof Concept ? stringifyConcept(cond) : cond);

const stringifyConcept: (concept: AnyConcept) => string = concept => {
  if (!(concept instanceof Concept) || !concept.k) return '???';
  const key = `${concept.k.trim()}{{` as const;

  switch (concept.t) {
    case TypeKey.IfElse: {
      const ifElse = takeConceptValue(concept);
      return `${key}${stringifyCondition(ifElse.c)}}{${ifElse.th}}${ifElse.e ? `{${ifElse.e}}` : ''}}`;
    }
    case TypeKey.Or:
    case TypeKey.And:
    case TypeKey.Fn:
    case TypeKey.Generate:
    case TypeKey.Util: {
      const cond = takeConceptValue(concept);
      return `${key}${cond.c.map(stringifyCondition).join(strTplArgSeparator)}}}`;
    }
    case TypeKey.Switch: {
      const cond = takeConceptValue(concept);
      const conditionSet = new Set();
      const start = `${key}${cond.c}}{`;

      return `${start}${cond.cs
        .map(([cond, str]) => {
          if (checkIsUndefined(str)) return cond;

          const value = stringifyCondition(cond);
          if (conditionSet.has(value)) throw `Duplicate case ${value} in ${start}...`;
          conditionSet.add(value);

          return [value, str];
        })
        .flat()
        .join(strTplArgSeparator)}}}`;
    }
  }

  return '';
};

const stringifyTemplate = (tpl: TemplateStringsArray, args: TplArg[]) => {
  return tpl.map((str, stri) => `${str}${args[stri] ? stringifyConcept(args[stri] as never) : ''}`).join('');
};

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

class AndConditionConcept extends Concept<ConceptKey.Condition, TypeKey.And> {
  c: AnyCondition[] = [];

  constructor(public AND: (cond: AnyCondition) => OmitConceptKeys<AndConditionConcept, 'c'>) {
    super('AND', ConceptKey.Condition, TypeKey.And);
  }
}

class OrConditionConcept extends Concept<ConceptKey.Condition, TypeKey.Or> {
  c: AnyCondition[] = [];

  constructor(public OR: (cond: AnyCondition) => OmitConceptKeys<OrConditionConcept, 'c'>) {
    super('OR', ConceptKey.Condition, TypeKey.Or);
  }
}

const makeCondition = <Key extends 'AND' | 'OR'>(key: Key) => {
  const Constructor = key === 'AND' ? AndConditionConcept : OrConditionConcept;
  type C = Key extends 'AND' ? AndConditionConcept : OrConditionConcept;

  return (cond: AnyCondition): { [K in Key]: (cond: AnyCondition) => C } => {
    const next = (cond: AnyCondition) => {
      concept.c.push(cond);

      return concept;
    };

    const concept: ConceptValueMap[TypeKey.And | TypeKey.Or] = new Constructor(next as never);
    concept.c.push(cond);

    return { [key]: next } as never;
  };
};

const AND = makeCondition('AND');
const OR = makeCondition('OR');

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

class FunctionConcept extends Concept<ConceptKey.Func, TypeKey.Fn> {
  constructor(
    k: VarKey,
    public c: any[],
  ) {
    super(k.slice(1), ConceptKey.Func, TypeKey.Fn);
  }
}

const FN = (vara: VarKey, ...args: any[]) => new FunctionConcept(vara, args);

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

class IfElseStructConcept extends Concept<ConceptKey.Struct, TypeKey.IfElse> {
  th = '';
  e = '';

  constructor(
    public c: AnyCondition,
    public ELSE: (
      template: TemplateStringsArray,
      ...args: TplArg[]
    ) => OmitConceptKeys<IfElseStructConcept, 'ELSE' | 'c' | 'e' | 'th'>,
  ) {
    super('IF', ConceptKey.Struct, TypeKey.IfElse);
  }
}

const IF = (
  cond: AnyCondition,
): {
  THEN: (template: TemplateStringsArray, ...args: TplArg[]) => OmitConceptKeys<IfElseStructConcept, 'c' | 'e' | 'th'>;
  ELSE: IfElseStructConcept['ELSE'];
} => {
  const ELSE = (template: TemplateStringsArray, ...args: TplArg[]) => {
    concept.e = stringifyTemplate(template, args);
    delete (concept as any).ELSE;
    return concept;
  };

  const concept = new IfElseStructConcept(cond, ELSE);

  return {
    ELSE,
    THEN: (template, ...args) => {
      concept.th = stringifyTemplate(template, args);
      return concept;
    },
  };
};

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

type CaseCb<Key extends string, Cases> = <const Cond extends AnyCondition>(
  cond: Cond,
) => (template: TemplateStringsArray, ...args: TplArg[]) => OmitConceptKeys<
  SwitchStructConcept<Key, Cases | Cond>,
  'c' | 'cs'
>;

type DefaultCb<Key extends string, Cases> = (
  template: TemplateStringsArray,
  ...args: TplArg[]
) => OmitConceptKeys<SwitchStructConcept<Key, Cases>, 'DEFAULT' | 'CASE' | 'c' | 'cs'>;

class SwitchStructConcept<Key extends string = string, Cases = never> extends Concept<
  ConceptKey.Struct,
  TypeKey.Switch
> {
  cs: ([AnyCondition, string] | [string])[] = [];
  declare readonly [switchMeta]?: SwitchPhantom<Key, Cases>;

  constructor(
    public c: AnyCondition,
    public CASE: CaseCb<Key, Cases>,
    public DEFAULT: DefaultCb<Key, Cases>,
  ) {
    super('SWITCH', ConceptKey.Struct, TypeKey.Switch);
  }
}

const SWITCH = <Key extends string>(cond: `$${Key}`) => {
  const CASE: CaseCb<Key, never> =
    cond =>
    (template, ...args) => {
      concept.cs.push([cond as AnyCondition, stringifyTemplate(template, args)]);
      return concept;
    };

  const DEFAULT: DefaultCb<Key, never> = (template, ...args) => {
    concept.cs.push([stringifyTemplate(template, args)]);
    delete (concept as any).CASE;
    return concept;
  };

  const concept = new SwitchStructConcept<Key, never>(cond, CASE, DEFAULT);

  return { CASE };
};

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

type NextCb<Key extends string> = (
  key: Key,
) => (template: TemplateStringsArray, ...args: TplArg[]) => OmitConceptKeys<GenerateStructConcept<Key>, 'c'>;

export class GenerateStructConcept<Key extends string> extends Concept<ConceptKey.Struct, TypeKey.Generate> {
  c: (string | number)[] = [];

  constructor(public NEXT: NextCb<Key>) {
    super('GENERATE', ConceptKey.Struct, TypeKey.Generate);
  }

  toString<const VarKeys extends [VarKey] | [VarKey, VarKey]>(vars: VarKeys) {
    const result = `${this.k}{{${this.c.join('}{')}}}` as Interpolation<Key, VarKeys>;

    checkVarUsage(result, vars);

    return result;
  }
}

type CorrectKey<Key extends string> = Key extends `$${string}` ? '<ERROR: $-started Key>' : Key;

const GENERATE = <GenKey extends string = string>() => {
  type Key = CorrectKey<GenKey>;

  const NEXT: NextCb<Key> =
    key =>
    (template, ...args) => {
      concept.c.push(key, stringifyTemplate(template, args));
      return concept;
    };

  const concept = new GenerateStructConcept<Key>(NEXT);

  return { NEXT };
};

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

type VarName<Var extends VarKey> = Var extends `$${infer Name}` ? Name : never;

type ValsOfVars<Vars extends readonly VarKey[]> = { [Key in VarName<Vars[number]>]: string | number | boolean };

type Interpolation<GenKey extends string, T extends readonly VarKey[]> = T extends readonly [VarKey, ...VarKey[]]
  ? StringTemplaterInterpolation<ValsOfVars<T>, GenKey>
  : string;

declare const noValsMeta: unique symbol;

type NoVals = { readonly [noValsMeta]: never };

type StrTplArg<Vals extends object> = [Vals] extends [NoVals]
  ? TplArg
  : TplArg & { readonly [switchMeta]?: (vals: Vals) => void };

type StrInterpolation<
  Vals extends object,
  TemplateScalar extends readonly VarKey[],
  GenKey extends string = string,
> = [
  Vals,
] extends [NoVals]
  ? Interpolation<string, TemplateScalar>
  : StringTemplaterInterpolation<Vals, GenKey>;

type ObjectVals<Vals> = [Vals] extends [never]
  ? NoVals
  : [Vals] extends [infer ObjVals extends object]
    ? ObjVals
    : NoVals;

type StrVals<Interp extends string | NoVals> = ObjectVals<StringTemplaterVals<Interp>>;

const STR = <
  const Interp extends string | NoVals = NoVals,
  const TemplateScalar extends TemplateStringsArray | readonly VarKey[] = VarKey[],
>(
  templateScalar: TemplateScalar,
  ...args: TplArg[]
): TemplateScalar extends readonly VarKey[]
  ? (
      tpl: TemplateStringsArray,
      ...args: StrTplArg<StrVals<Interp>>[]
    ) => StrInterpolation<StrVals<Interp>, TemplateScalar, StringTemplaterGenKey<Interp>>
  : string => {
  if (isTemplateStringsArray(templateScalar)) {
    return stringifyTemplate(templateScalar, args) as never;
  }

  return ((template: TemplateStringsArray, ...args: TplArg[]) => {
    const result = stringifyTemplate(template, args);

    checkVarUsage(result, templateScalar);

    return result;
  }) as never;
};

const checkVarUsage = (resultStr: string, vars: readonly string[]) => {
  const usedKeySet = new Set(vars);

  resultStr.replace(makeRegExp('/\\$(\\w+);?/g'), (all, key) => {
    usedKeySet.delete(`$${key};`);
    usedKeySet.delete(`$${key}`);

    return all;
  });

  if (usedKeySet.size) throw `The args ${Array.from(usedKeySet).join(', ')} is not used in template`;
};

const isTemplateStringsArray = (arr: any): arr is TemplateStringsArray => {
  return Array.isArray(arr) && 'raw' in arr;
};

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

class UtilConcept extends Concept<ConceptKey.Util, TypeKey.Util> {
  constructor(
    k: string,
    public c: (number | string)[],
  ) {
    super(k, ConceptKey.Util, TypeKey.Util);
  }
}

type OneArgUtilConceptCb = (arg: number | string) => OmitConceptKeys<UtilConcept, 'c'>;
type TwoArgsUtilConceptCb = (arg1: number | string, arg2: number | string) => OmitConceptKeys<UtilConcept, 'c'>;

const toSTR: OneArgUtilConceptCb = arg => new UtilConcept('toSTR', [arg]);
const toNUM: OneArgUtilConceptCb = arg => new UtilConcept('toNUM', [arg]);

const makeUtils = <T extends Record<string, 0>>(obj: T) => {
  const dict = {} as Record<keyof T, TwoArgsUtilConceptCb>;
  objectKeys(obj).forEach(key => (dict[key] = (arg1, arg2) => new UtilConcept(`is${key}`, [arg1, arg2])));
  return dict;
};

const isUtil = makeUtils({
  GT: 0,
  GTE: 0,
  LT: 0,
  LTE: 0,
  EQ: 0,
  NEQ: 0,
});

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

export { AND, FN, GENERATE, IF, isUtil, OR, STR, SWITCH, toNUM, toSTR };
