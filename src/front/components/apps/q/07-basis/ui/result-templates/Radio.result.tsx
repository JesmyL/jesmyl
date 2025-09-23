import { mylib } from '#shared/lib/my-lib';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { QuestionerType, QuestionerUserAnswerResultContentProps } from 'shared/model/q';

export const QuestionerResultRadioTemplateCardContent = ({
  template,
  userAnswer,
}: QuestionerUserAnswerResultContentProps<QuestionerType.Radio>) => {
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
              isRadio
              checked={userAnswer === +answerId}
              postfix={title}
              className={
                template.correct == null
                  ? 'opacity-50'
                  : template.correct === +answerId
                    ? userAnswer === +answerId
                      ? 'text-xOK'
                      : ''
                    : userAnswer === +answerId
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
