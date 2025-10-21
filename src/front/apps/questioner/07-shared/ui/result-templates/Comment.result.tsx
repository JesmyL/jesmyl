import { QuestionerType } from 'shared/model/q';
import { QuestionerResultContentProps } from 'shared/model/q/answer';

export const QuestionerResultCommentTemplateCardContent = ({
  userAnswer,
}: QuestionerResultContentProps<QuestionerType.Comment>) => {
  return <>{userAnswer?.v}</>;
};
