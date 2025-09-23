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
          return (
            <div
              key={answerId}
              className={answerId === template.correct?.[answerIdi] ? 'text-xOK' : 'text-xKO'}
            >
              {template.variants[answerId]?.title}
            </div>
          );
        })}
      </div>
      <div className="text-x7">{template.below}</div>
    </>
  );
};
