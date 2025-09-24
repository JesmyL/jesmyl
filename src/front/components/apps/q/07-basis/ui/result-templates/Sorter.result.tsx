import { EllipsisText } from '#shared/ui/EllipsisText';
import { QuestionerType, QuestionerUserAnswerResultContentProps } from 'shared/model/q';

export const QuestionerResultSorterTemplateCardContent = ({
  userAnswer,
  template,
}: QuestionerUserAnswerResultContentProps<QuestionerType.Sorter>) => {
  return (
    <>
      <div className="text-x7">{template.above}</div>
      <div className="ml-3">
        {userAnswer?.map((answerId, answerIdi) => {
          const correctAnswerId = template.correct?.[answerIdi];
          const isCorrect = answerId === correctAnswerId;
          const userAnswerTitle = <EllipsisText text={template.variants[answerId]?.title} />;

          return (
            <div
              key={answerId}
              className="flex gap-2 white-pre-line break-wrap"
            >
              {template.noCorrect ? (
                userAnswerTitle
              ) : (
                <>
                  <div className={isCorrect ? 'text-xOK' : 'text-xKO'}>{userAnswerTitle}</div>
                  {isCorrect || !correctAnswerId || (
                    <EllipsisText text={[' (', template.variants[correctAnswerId]?.title, ')']} />
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="text-x7">{template.below}</div>
    </>
  );
};
