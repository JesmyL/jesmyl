import { QuestionerTemplateId, QuestionerType } from 'shared/model/q';
import { QuestionerUserAnswer } from 'shared/model/q/answer';
import { QuestionerTemplateConditionNext, QuestionerTemplateConditionOperator } from 'shared/model/q/condition';
import { checkIsArray, checkIsString } from 'shared/utils/checkIs';

const _hideQuestion = true;
const _showQuestion = false;

type Checker<Type extends QuestionerType> = (
  next: QuestionerTemplateConditionNext<Type>,
  userAnswer: QuestionerUserAnswer['a'][QuestionerTemplateId] | nil,
  operator: QuestionerTemplateConditionOperator,
) => boolean;

const inOutChecker =
  <Type extends QuestionerType>(): Checker<Type> =>
  (next, answer, operator) => {
    if (next.val == null || answer == null || !checkIsArray(answer.v)) {
      return operator === QuestionerTemplateConditionOperator.In;
    }

    return answer.v.includes(next.val)
      ? operator === QuestionerTemplateConditionOperator.Out
      : operator === QuestionerTemplateConditionOperator.In;
  };

export const questionerTypeIfConditionCheckerDict: { [T in QuestionerType]: Checker<T> } = {
  [QuestionerType.Check]: inOutChecker(),

  [QuestionerType.Radio]: (next, answer, operator) => {
    if (next.val == null || answer == null) {
      return operator === QuestionerTemplateConditionOperator.Eq;
    }

    return answer.v === next.val
      ? operator === QuestionerTemplateConditionOperator.Neq
      : operator === QuestionerTemplateConditionOperator.Eq;
  },

  [QuestionerType.Comment]: (next, answer, operator) => {
    if (next.val == null || answer == null || !checkIsString(answer.v)) {
      return operator === QuestionerTemplateConditionOperator.LessThenLength;
    }

    return answer.v.length > next.val
      ? operator === QuestionerTemplateConditionOperator.LessThenLength
      : answer.v.length < next.val
        ? operator === QuestionerTemplateConditionOperator.GreatThenLength
        : _hideQuestion;
  },

  [QuestionerType.Sorter]: inOutChecker(),

  [QuestionerType.TextInclude]: inOutChecker(),
};
