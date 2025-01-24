import { LocalSokiAuth, SokiAppName, sokiWhenRejButTs } from 'shared/api';
import { actionBoxSetSystems, knownIconNames } from 'shared/values';

export type ExecutionMethod =
  | 'formula'
  | 'set'
  | 'set_all'
  | 'push'
  | 'concat'
  | 'toggle_existance'
  | 'toggle_by'
  | 'resort'
  | 'move_beforei'
  | 'insert_before_item_or_push'
  | 'remove'
  | 'remove_each'
  | 'delete'
  | `setOrPush:${string}`
  | 'other';

export interface ExecutionDict<Value = any, Args = ExecutionArgs<any, Value>> {
  action: string;
  method?: ExecutionMethod;
  value?: Value;
  prev?: Value;
  args?: Args;
  corrects?: unknown;
  timer?: ExecuteReplaceableField<ActionTimer>;
}

export interface ExecuteDoItProps {
  method: ExecutionMethod;
  target: any;
  penultimate: any;
  lastTrace: string | number;
  value: any;
  realArgs?: ExecutionArgs;
  auth?: LocalSokiAuth | null;
  uniqs?: string[];
}

export interface ExecuteFeedbacks {
  fixes: string[];
  replacedExecs: ExecutionReal[];
  errorMessage: string | undefined;
  rules: ExecutionReal[];
}

export type ExecutionRuleTrackBeat =
  | string
  | [string, string, any]
  | [string, string, any, string, string, any]
  | [string, string, any, string, string, any, string, string, any];
export type ExecutionTrack = ExecutionRuleTrackBeat[];
export type ExecutionTrackTail = [number, ExecutionTrack];

export type ExecutionSidesDict = Record<`/${any}`, ExecutionSide>;

export interface BasicRule {
  method: ExecutionMethod;
  value?: ((props: ExecutionArgs | null) => any) | string | number | null | any[] | {};
  args?: ExecutionArgs;
}

export type ExecuteReplaceableField<Ret, Join = Ret> =
  | Join
  | `{${string}}`
  | ((props: ExecutionArgs | null) => Ret | void);

export interface ExecutionSide extends BasicRule, Partial<ExecutionSidesDict> {
  trackTail?: ExecutionTrackTail;
}

export interface ExecutionRule extends BasicRule {
  action: string;
  title?: string;
  track?: ExecutionTrack;
  shortTitle?: string;
  level?: number;
  uniqs?: string[] | Record<string, string>;
  expected?: [] | {};
  access?: string;
  side?: ExecutionSidesDict;
  expecteds?: ExecutionExpectations;
  isSequre?: boolean;
  fixAccesses?: Record<string, ExecutionTrack>;
  writeArg?: string;
  setInEachValueItem?: ExecuterSetInEachValueItem;
}

export type ExecutionExpectations = [number, {} | []][];

export type ExecuterSetInEachValueItem = Record<string, Record<string, unknown>>;

export type ExecutionArgs<
  Value = unknown,
  Args = Record<string, any>,
  Vars = Partial<Record<string, any> & Record<'$$currentValue', any>>,
> = Partial<Args & Record<'$$vars', Vars> & Record<'value', Value>>;

export type RealAccumulatableRuleSides =
  | ExecutionSide[]
  | ((realArgs?: ExecutionArgs, auth?: LocalSokiAuth | null) => ExecutionSide[] | undefined);

export type ExecutorRuleReadRejecton =
  | boolean
  | number
  | ((...args: unknown[]) => string | null | typeof sokiWhenRejButTs | boolean);

export interface RealAccumulatableRule<
  Value = unknown,
  Args = Record<string, unknown>,
  Vars = Partial<Record<string, unknown>>,
> {
  scopeNode?: string;
  expecteds?: ExecutionExpectations;
  args?: ExecutionArgs<Value, Args, Vars>;
  track: ExecutionTrack;
  onSuccess?: ActionBoxOnFinalCallback;
  onFailure?: ActionBoxOnFinalCallback;
  sides?: RealAccumulatableRuleSides;
  accesses: string[];
  setInEachValueItem?: ExecuterSetInEachValueItem;
  setEachInParent?: ExecuterSetInEachValueItem;
  RRej?: ExecutorRuleReadRejecton;
  $$vars: Record<`$$${string}`, number>;
  canBeUnauthorized?: boolean;
}

export interface ShortRealRule<
  Value = unknown,
  Args = Record<string, unknown>,
  Vars = Partial<Record<string, unknown>>,
> {
  action: string;
  title?: string | ((args: Record<string, unknown>) => string);
  shortTitle?: string;
  level?: number;
  isSequre?: boolean;
  args?: ExecutionArgs<Value, Args, Vars>;
}

export interface ExecutionReal<Value = unknown, Args = Record<string, unknown>, Vars = Partial<Record<string, unknown>>>
  extends RealAccumulatableRule<Value, Args, Vars>,
    ShortRealRule<Value, Args, Vars> {
  method: ExecutionMethod;
  value: any | ((props: ExecuteDoItProps) => any);
  uniqs?: string[];
  fix: ExecutionRuleTrackBeat;
  fixedAccesses?: FixedAccesses;
  setSystems?: ActionBoxSetSystems[];
  setItemSystems?: ActionBoxSetSystems[];
  timer?: ExecuteReplaceableField<ActionTimer>;
  canBeUnauthorized?: boolean;
}

export type FixedAccesses = {
  track: ExecutionTrack;
  tail: Record<string, ExecutionTrack>;
}[];

export interface TrackerRet {
  parent: any;
  target: any;
  penultimate: any;
  lastTrace: any;
}

export type ExecutedAreas = Record<SokiAppName, string[]>;

export interface ExecutionResponse {
  ok: boolean;
  rejected?: [];
}

export enum ExecuteErrorType {
  Level = 'Нет прав',
  Access = 'Запрет',
  Args = 'Аргументы',
  NoRule = 'Не найдено',
  Sequre = 'Не верный пароль',
  Error = 'Ошибка',
}

export interface ExecuteError {
  type: ExecuteErrorType;
  note: string;
}

export type ActionBoxSide =
  | ExecutionSidesDict
  | ((realArgs?: ExecutionArgs, auth?: LocalSokiAuth | null) => ExecutionSidesDict | und);

export interface ActionTimer {
  startMs?: number;
  startId?: string;
  clearId?: string;
}

export type ActionBoxOnFinalCallback<Value = any, Ret = void> = (
  args: ExecutionArgs | null,
  value: Value,
  auth: LocalSokiAuth | nil,
) => Ret;

export interface ActionBox<Value = any>
  extends Partial<Record<`/${string}`, ActionBox>>,
    Partial<Record<`<${string}>`, ActionBox>> {
  level?: number;
  scopeNode?: string;
  shortTitle?: string;
  title?: string | ((args: Record<string, unknown>) => string);
  access?: string;
  uniqs?: string[];
  fixAccesses?: Record<string, ExecutionTrack>;
  onSuccess?: ActionBoxOnFinalCallback;
  onFailure?: ActionBoxOnFinalCallback;
  side?: ActionBoxSide;
  expected?: [] | {};
  setInEachValueItem?: Record<string, Record<string, unknown>>;
  setEachInParent?: Record<string, Record<string, unknown>>;
  isSequre?: boolean;
  setSystems?: ActionBoxSetSystems[];
  setItemSystems?: ActionBoxSetSystems[];
  RRej?: ExecutorRuleReadRejecton;
  C?: ActionCRUD;
  U?: ActionCRUD;
  D?: ActionCRUD;
  $$var?: `$$${string}`;

  action?: string;
  timer?: ExecuteReplaceableField<ActionTimer>;
  method?: ExecutionMethod;
  canBeUnauthorized?: boolean;
  value?: ExecuteReplaceableField<Value, {} | null>;
  args?: ExecutionArgs<string | any[]>;
}

export interface ActionCRUD {
  method?: ExecutionMethod;
  value?: ExecuteReplaceableField<any, {}>;
  args?: ExecutionArgs<string | any[]>;
  setSystems?: ActionBoxSetSystems[];
  setItemSystems?: ActionBoxSetSystems[];
  uniqs?: string[];
  RRej?: ExecutorRuleReadRejecton;
  shortTitle?: string;
  canBeUnauthorized?: boolean;
  title?: string | ((args: Record<string, unknown>) => string);
}

export type ActionBoxSetSystemsFree = keyof typeof actionBoxSetSystems;
export type ActionBoxSetSystems = ActionBoxSetSystemsFree | `${ActionBoxSetSystemsFree}:${string}`;

export type ActionBoxValue<Value> = Value extends string | number | boolean
  ? `{${string}}` | Value | (() => Value)
  : Value extends Array<infer Val>
    ? Array<ActionBoxValue<Val>>
    : Value extends {}
      ? { [Key in keyof Value]: ActionBoxValue<Value[Key]> }
      : Value;

enum NotANumber {
  nan = 'NaN',
}

declare global {
  type num = 0 | 1;
  type str = '' | '1';
  type nil = null | undefined;
  type und = undefined;
  type ArrayMapCb<T> = (box: T, boxi: number, boxa: T[]) => T;
  type ArrayCb<T> = (box: T, boxi: number, boxa: T[]) => any;
  type TimeOut = ReturnType<typeof setTimeout> | und | number;
  type intStr = `${'-' | ''}${number}`;
  type doubleStr = `${'-' | ''}${intStr}.${number}`;
  type numberStr = `${'-' | ''}${intStr}${`.${number}` | ''}`;
  type StringBySlash = `${string}/${string}`;

  type PRecord<Key extends string | number, Value> = Partial<Record<Key, Value>>;

  type OmitOwn<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
  type WithRewrites<T, P> = Pick<T, Exclude<keyof T, keyof P>> & Pick<P, keyof P>;

  type NaN = NotANumber;
  type NaNumber = number | NotANumber;

  type EventStopper<With = {}> = { stopPropagation(): void } & With;
  type CallbackStopper = (event: EventStopper) => void;

  type EventPreventer<With = {}> = { preventDefault(): void } & With;
  type CallbackPreventer = (event: EventPreventer) => void;

  type CallbackPreventerAndStopper = (event: EventPreventer & EventStopper) => void;

  type NonUndefined<T> = T extends undefined ? never : T;
  type NonNull<T> = T extends null ? never : T;
  type NonNil<T> = T extends nil ? never : T;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
  type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);
}

declare global {
  type KnownIconName = (typeof knownIconNames)[number];
  type KnownIconNameForPack = KnownIconName;
}
