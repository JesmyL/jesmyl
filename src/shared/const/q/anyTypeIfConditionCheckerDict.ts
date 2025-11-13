import { QuestionerBlank, QuestionerType } from "shared/model/q";
import { QuestionerUserAnswer } from "shared/model/q/answer";
import { questionerTypeIfConditionCheckerDict } from "./typeIfConditionCheckerDict";
import { QuestionerTemplateIfCondition } from "shared/model/q/condition";
import { questionerTypeDefaultIfConditionOperatorDict } from "./typeDefaultIfConditionOperator";

const _hideQuestion = true;
const _showQuestion = false;

export const questionerAnyTypeIfConditionCheckerDict = (
  ifCondition: QuestionerTemplateIfCondition | nil,
  userAnswer: QuestionerUserAnswer,
  blank: OmitOwn<QuestionerBlank, "team">,
) => {
  if (ifCondition == null || !ifCondition.next.length) return _showQuestion;
  const isAnd = !ifCondition.t;

  for (const condition of ifCondition.next) {
    const isConditionAnd = !condition.t;
    let isConditionPass = isConditionAnd;

    for (const next of condition.next) {
      const template = blank.tmp[next.tmpId];
      if (template == null) return _hideQuestion;
      const answer = userAnswer.a[next.tmpId];

      if (
        questionerTypeIfConditionCheckerDict[template.type](
          next as never, answer, next.op ?? questionerTypeDefaultIfConditionOperatorDict[template.type]
        )
      ) {

        if (isConditionAnd) {
          isConditionPass = false;
          break;
        }
      } else {
        if (!isConditionAnd) {
          isConditionPass = true;
          break;
        }
      }
    }

    if (isAnd) {
      if (!isConditionPass) return _hideQuestion;
    } else if (isConditionPass) return _showQuestion;
  }

  return !isAnd;
}