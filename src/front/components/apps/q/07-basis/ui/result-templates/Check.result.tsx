import { mylib } from '#shared/lib/my-lib';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { QuestionerType } from 'shared/model/q';
import { QuestionerResultContentProps } from 'shared/model/q/answer';

export const QuestionerResultCheckTemplateCardContent = ({
  template,
  userAnswer,
}: QuestionerResultContentProps<QuestionerType.Check>) => {
  if (!userAnswer) return;

  const keys = mylib.keys(template.variants);
  const unknownAnswerKeySet = new Set(mylib.keys(template.variants).slice(userAnswer.len));

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
            {unknownAnswerKeySet.has(answerId) ? (
              <div className="opacity-50">{title}</div>
            ) : (
              <IconCheckbox
                checked={userAnswer.v.includes(+answerId)}
                postfix={title}
                className={
                  template.correct == null
                    ? 'opacity-50'
                    : template.correct.includes(+answerId)
                      ? userAnswer.v.includes(+answerId)
                        ? 'text-xOK'
                        : ''
                      : userAnswer.v.includes(+answerId)
                        ? 'text-xKO'
                        : 'opacity-50'
                }
              />
            )}
          </div>
        );
      })}
    </>
  );
};
