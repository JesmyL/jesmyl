/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeRegExp } from 'regexpert';
import { checkIsUndefined } from '../checkIs';
import { objectKeys } from '../object.utils';
import { strTplArgSeparator } from './const';
import { StringTemplaterInterpolation, StringTemplaterWithTwoInterpolations } from './model';

type Vara = `$${string}`;

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
}

type TplArg = OmitConceptKeys<Concept<ConceptKey, TypeKey>, 'ELSE'>;

type AnyCondition =
  | string
  | OmitConceptKeys<Concept<ConceptKey.Condition | ConceptKey.Func | ConceptKey.Util, TypeKey>, ''>;

type OmitConceptKeys<C extends Concept<ConceptKey, TypeKey>, K extends keyof C | string> = Omit<C, K | 'k'>;

class Concept<Concept extends ConceptKey, Type extends TypeKey> {
  k?: Vara;

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
    case TypeKey.Util: {
      const cond = takeConceptValue(concept);
      return `${key}${cond.c.map(c => stringifyCondition(c)).join(strTplArgSeparator)}}}`;
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
    k: Vara,
    public c: any[],
  ) {
    super(k.slice(1), ConceptKey.Func, TypeKey.Fn);
  }
}

const FN = (vara: Vara, ...args: any[]) => new FunctionConcept(vara, args);

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

type CaseCb = (
  cond: AnyCondition,
) => (template: TemplateStringsArray, ...args: TplArg[]) => OmitConceptKeys<SwitchStructConcept, 'c' | 'cs'>;

type DefaultCb = (
  template: TemplateStringsArray,
  ...args: TplArg[]
) => OmitConceptKeys<SwitchStructConcept, 'DEFAULT' | 'CASE' | 'c' | 'cs'>;

class SwitchStructConcept extends Concept<ConceptKey.Struct, TypeKey.Switch> {
  cs: ([AnyCondition, string] | [string])[] = [];

  constructor(
    public c: AnyCondition,
    public CASE: CaseCb,
    public DEFAULT: DefaultCb,
  ) {
    super('SWITCH', ConceptKey.Struct, TypeKey.Switch);
  }
}

const SWITCH = (cond: AnyCondition): { CASE: CaseCb } => {
  const CASE =
    (cond: AnyCondition) =>
    (template: TemplateStringsArray, ...args: TplArg[]) => {
      concept.cs.push([cond, stringifyTemplate(template, args)]);
      return concept;
    };

  const DEFAULT = (template: TemplateStringsArray, ...args: TplArg[]) => {
    concept.cs.push([stringifyTemplate(template, args)]);
    delete (concept as any).CASE;
    return concept;
  };

  const concept = new SwitchStructConcept(cond, CASE, DEFAULT as never);

  return { CASE };
};

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

const STR = <const TemplateScalar extends TemplateStringsArray | Vara[]>(
  templateScalar: TemplateScalar,
  ...args: TplArg[]
): TemplateScalar extends Vara[]
  ? TemplateScalar extends [`$${infer V1}`, `$${infer V2}`]
    ? (tpl: TemplateStringsArray, ...args: TplArg[]) => StringTemplaterWithTwoInterpolations<V1, V2>
    : TemplateScalar extends [`$${infer V1}`]
      ? (tpl: TemplateStringsArray, ...args: TplArg[]) => StringTemplaterInterpolation<V1>
      : string
  : string => {
  if (isTemplateStringsArray(templateScalar)) {
    return stringifyTemplate(templateScalar as any, args) as never;
  }

  return ((template: TemplateStringsArray, ...args: TplArg[]) => {
    const result = stringifyTemplate(template, args);
    const usedKeySet = new Set(templateScalar);

    result.replace(makeRegExp('/\\$(\\w+);?/g'), (all, key) => {
      usedKeySet.delete(`$${key};`);
      usedKeySet.delete(`$${key}`);

      return all;
    });

    if (usedKeySet.size) throw `The args ${Array.from(usedKeySet).join(', ')} is not used in template`;

    return result;
  }) as never;
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

export { AND, FN, IF, isUtil, OR, STR, SWITCH, toNUM, toSTR };
