import { QuestionerType, QuestionerUserAnswerResultContentProps } from 'shared/model/q';

export const QuestionerResultCommentTemplateCardContent = ({
  userAnswer,
}: QuestionerUserAnswerResultContentProps<QuestionerType.Comment>) => {
  return <>{userAnswer}</>;
};
