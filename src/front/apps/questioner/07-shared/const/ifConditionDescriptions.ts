import { QuestionerTemplateConditionOperator } from "shared/model/q/condition";

export const questionerIfConditionOperatorDescriptionDict: Record<QuestionerTemplateConditionOperator, string> = {
    [QuestionerTemplateConditionOperator.Eq]: 'равно',
    [QuestionerTemplateConditionOperator.Neq]: 'не равно',
    [QuestionerTemplateConditionOperator.In]: 'присутствует',
    [QuestionerTemplateConditionOperator.Out]: 'отсутствует',
    [QuestionerTemplateConditionOperator.GreatThenLength]: 'длина контента больше',
    [QuestionerTemplateConditionOperator.LessThenLength]: 'длина контента меньше',
};