import { QuestionerType } from "shared/model/q";
import { QuestionerTemplateConditionOperator, QuestionerTemplateTypeConditionDict } from "shared/model/q/condition";

export const questionerTypeDefaultIfConditionOperatorDict: { [T in QuestionerType]: Exclude<QuestionerTemplateTypeConditionDict[T]['op'], nil> } = {
    [QuestionerType.Check]: QuestionerTemplateConditionOperator.In,
    [QuestionerType.Radio]: QuestionerTemplateConditionOperator.Eq,
    [QuestionerType.Comment]: QuestionerTemplateConditionOperator.GreatThenLength,
    [QuestionerType.Sorter]: QuestionerTemplateConditionOperator.In,
    [QuestionerType.TextInclude]: QuestionerTemplateConditionOperator.In,
};