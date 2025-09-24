import { mylib } from '#shared/lib/my-lib';
import { EllipsisText } from '#shared/ui/EllipsisText';
import { QuestionerAnswerId, QuestionerType, QuestionerUserAnswerResultContentProps } from 'shared/model/q';

export const QuestionerResultSorterTemplateCardContent = ({
  userAnswer,
  template,
}: QuestionerUserAnswerResultContentProps<QuestionerType.Sorter>) => {
  const variantKeys = mylib.keys(template.variants);
  let newAnswerIds: RKey<QuestionerAnswerId>[] = [];

  if (userAnswer && userAnswer.length !== variantKeys.length) {
    const variantKeySet = new Set(variantKeys);
    userAnswer.forEach(answerId => {
      variantKeySet.delete(('' + answerId) as never);
    });

    newAnswerIds = Array.from(variantKeySet);
  }

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
        {newAnswerIds.map(answerId => {
          return (
            <div
              key={answerId}
              className="flex gap-2 white-pre-line break-wrap opacity-50"
            >
              <EllipsisText text={template.variants[answerId]?.title} />
            </div>
          );
        })}
      </div>
      <div className="text-x7">{template.below}</div>
    </>
  );
};
