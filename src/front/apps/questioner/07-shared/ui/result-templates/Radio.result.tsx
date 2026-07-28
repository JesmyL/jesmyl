import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { QuestionerType } from 'shared/model/q';
import { QuestionerResultContentProps } from 'shared/model/q/answer';
import { objectKeys } from 'shared/utils/object.utils';

export const QuestionerResultRadioTemplateCardContent = ({
  template,
  userAnswer,
}: QuestionerResultContentProps<QuestionerType.Radio>) => {
  if (!userAnswer) return;

  const keys = objectKeys(template.variants);
  const unknownAnswerKeySet = new Set(objectKeys(template.variants).slice(userAnswer.len));

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
