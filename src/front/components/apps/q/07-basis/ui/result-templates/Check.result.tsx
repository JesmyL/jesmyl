import { mylib } from '#shared/lib/my-lib';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { QuestionerType, QuestionerUserAnswerResultContentProps } from 'shared/model/q';

export const QuestionerResultCheckTemplateCardContent = ({
  template,
  userAnswer,
}: QuestionerUserAnswerResultContentProps<QuestionerType.Check>) => {
  const keys = mylib.keys(template.variants);

  return (
    <>
      {keys.map(answerId => {
        const { title } = template.variants[answerId] ?? {};
        if (!title) return null;

        return (
          <div
            key={answerId}
            className="whitespace-pre-line my-5"
          >
            <IconCheckbox
              checked={userAnswer?.includes(+answerId)}
              postfix={title}
              className={
                template.correct == null
                  ? 'opacity-50'
                  : template.correct.includes(+answerId)
                    ? userAnswer?.includes(+answerId)
                      ? 'text-xOK'
                      : ''
                    : userAnswer?.includes(+answerId)
                      ? 'text-xKO'
                      : 'opacity-50'
              }
            />
          </div>
        );
      })}
    </>
  );
};
