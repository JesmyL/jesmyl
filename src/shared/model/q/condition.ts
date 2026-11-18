import { QuestionerAnswerId, QuestionerTemplateId, QuestionerType } from './enums';

export const enum QuestionerTemplateConditionType {
  /** Все вложенные условия должны выполняться (логическое И) */
  And = 0,
  /** Достаточно выполнения любого вложенного условия (логическое ИЛИ) */
  Or = 1,
}

export type QuestionerTemplateConditionNext<Type extends QuestionerType> = {
  tmpId: QuestionerTemplateId;
  op?: QuestionerTemplateConditionOperator;
} & Partial<QuestionerTemplateTypeConditionDict[Type]>;

export type QuestionerTemplateIfCondition = {
  t?: QuestionerTemplateConditionType;
  next: QuestionerTemplateCondition[];
};

export type QuestionerTemplateCondition = {
  t?: QuestionerTemplateConditionType;
  next: QuestionerTemplateConditionNext<QuestionerType>[];
};

///////////////////////////////////////

export const enum QuestionerTemplateConditionOperator {
  /** Ответ равен выбранному варианту */
  Eq = 86,
  /** Ответ не равен выбранному варианту */
  Neq = 78,
  /** Выбранный вариант входит в ответ */
  In = 21,
  /** Выбранный вариант не входит в ответ */
  Out = 90,
  /** Длина текстового ответа больше указанного значения */
  GreatThenLength = 61,
  /** Длина текстового ответа меньше указанного значения */
  LessThenLength = 13,
}

export type QuestionerTemplateTypeConditionDict = {
  [QuestionerType.Check]: Implement<
    | { op: QuestionerTemplateConditionOperator.In; val: QuestionerAnswerId }
    | { op: QuestionerTemplateConditionOperator.Out; val: QuestionerAnswerId }
  >;
  [QuestionerType.Radio]: Implement<
    | { op: QuestionerTemplateConditionOperator.Eq; val: QuestionerAnswerId }
    | { op: QuestionerTemplateConditionOperator.Neq; val: QuestionerAnswerId }
  >;
  [QuestionerType.Comment]: Implement<
    | { op: QuestionerTemplateConditionOperator.GreatThenLength; val: number }
    | { op: QuestionerTemplateConditionOperator.LessThenLength; val: number }
  >;
  [QuestionerType.Sorter]: Implement<
    | { op: QuestionerTemplateConditionOperator.In; val: QuestionerAnswerId }
    | { op: QuestionerTemplateConditionOperator.Out; val: QuestionerAnswerId }
  >;
  [QuestionerType.TextInclude]: Implement<
    | { op: QuestionerTemplateConditionOperator.In; val: QuestionerAnswerId }
    | { op: QuestionerTemplateConditionOperator.Out; val: QuestionerAnswerId }
  >;
};

type Implement<T extends { op: QuestionerTemplateConditionOperator | nil; val: unknown }> = {
  [K in keyof T]: T[K] | nil;
};
