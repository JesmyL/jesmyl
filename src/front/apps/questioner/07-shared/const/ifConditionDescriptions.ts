import { translateBase } from '#basis/locale';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { QuestionerTemplateConditionOperator } from 'shared/model/q/condition';

export const questionerIfConditionOperatorDescriptionDict: Record<QuestionerTemplateConditionOperator, string> = {
  get [QuestionerTemplateConditionOperator.Eq]() {
    return translateBase(BaseLocaleKey.QuestionerOperatorEquals);
  },
  get [QuestionerTemplateConditionOperator.Neq]() {
    return translateBase(BaseLocaleKey.QuestionerOperatorNotEquals);
  },
  get [QuestionerTemplateConditionOperator.In]() {
    return translateBase(BaseLocaleKey.QuestionerOperatorPresent);
  },
  get [QuestionerTemplateConditionOperator.Out]() {
    return translateBase(BaseLocaleKey.QuestionerOperatorAbsent);
  },
  get [QuestionerTemplateConditionOperator.GreatThenLength]() {
    return translateBase(BaseLocaleKey.QuestionerOperatorLengthGreater);
  },
  get [QuestionerTemplateConditionOperator.LessThenLength]() {
    return translateBase(BaseLocaleKey.QuestionerOperatorLengthLess);
  },
};
