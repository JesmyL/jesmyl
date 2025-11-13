import { QuestionerAnswerId, QuestionerTemplateId, QuestionerType } from "./enums";

export const enum QuestionerTemplateConditionType {
    And = 0,
    Or = 1,
}

export type QuestionerTemplateConditionNext<Type extends QuestionerType> = {
    tmpId: QuestionerTemplateId,
    op?: QuestionerTemplateConditionOperator,
} & Partial<QuestionerTemplateTypeConditionDict[Type]>;

export type QuestionerTemplateIfCondition = {
    t?: QuestionerTemplateConditionType,
    next: QuestionerTemplateCondition[],
}

export type QuestionerTemplateCondition = {
    t?: QuestionerTemplateConditionType,
    next: QuestionerTemplateConditionNext<QuestionerType>[],
};


///////////////////////////////////////

export const enum QuestionerTemplateConditionOperator {
    Eq = 86,
    Neq = 78,
    In = 21,
    Out = 90,
    GreatThenLength = 61,
    LessThenLength = 13,

};

export type QuestionerTemplateTypeConditionDict = {
    [QuestionerType.Check]: Implement<
        { op: QuestionerTemplateConditionOperator.In, val: QuestionerAnswerId }
        | { op: QuestionerTemplateConditionOperator.Out, val: QuestionerAnswerId }
    >,
    [QuestionerType.Radio]: Implement<
        { op: QuestionerTemplateConditionOperator.Eq, val: QuestionerAnswerId }
        | { op: QuestionerTemplateConditionOperator.Neq, val: QuestionerAnswerId }
    >,
    [QuestionerType.Comment]: Implement<
        { op: QuestionerTemplateConditionOperator.GreatThenLength, val: number }
        | { op: QuestionerTemplateConditionOperator.LessThenLength, val: number }
    >,
    [QuestionerType.Sorter]: Implement<
        { op: QuestionerTemplateConditionOperator.In, val: QuestionerAnswerId }
        | { op: QuestionerTemplateConditionOperator.Out, val: QuestionerAnswerId }
    >,
    [QuestionerType.TextInclude]: Implement<
        { op: QuestionerTemplateConditionOperator.In, val: QuestionerAnswerId }
        | { op: QuestionerTemplateConditionOperator.Out, val: QuestionerAnswerId }
    >,
};


type Implement<T extends { op: QuestionerTemplateConditionOperator | nil, val: unknown }> = { [K in keyof T]: T[K] | nil };