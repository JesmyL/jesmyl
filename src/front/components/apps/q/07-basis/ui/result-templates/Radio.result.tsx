import { mylib } from '#shared/lib/my-lib';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { QuestionerType } from 'shared/model/q';
import { QuestionerResultContentProps } from 'shared/model/q/answer';

export const QuestionerResultRadioTemplateCardContent = ({
  template,
  userAnswer,
}: QuestionerResultContentProps<QuestionerType.Radio>) => {
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
                isRadio
                checked={userAnswer.v === +answerId}
                postfix={title}
                className={
                  template.correct == null
                    ? 'opacity-50'
                    : template.correct === +answerId
                      ? userAnswer.v === +answerId
                        ? 'text-xOK'
                        : ''
                      : userAnswer.v === +answerId
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
