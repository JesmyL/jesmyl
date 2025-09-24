import { QuestionerType } from 'shared/model/q';
import { QuestionerUserAnswerResultContentProps } from 'shared/model/q/answer';

export const QuestionerResultCommentTemplateCardContent = ({
  userAnswer,
}: QuestionerUserAnswerResultContentProps<QuestionerType.Comment>) => {
  return <>{userAnswer?.v}</>;
};
