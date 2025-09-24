import { mylib } from '#shared/lib/my-lib';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { useMemo } from 'react';
import { QuestionerType } from 'shared/model/q';
import { QuestionerUserAnswerContentProps } from 'shared/model/q/answer';

export const QuestionerUserRadioTemplateCardContent = ({
  template,
  onUpdate,
  userAnswer,
}: QuestionerUserAnswerContentProps<QuestionerType.Radio>) => {
  const keys = useMemo(() => {
    const keys = mylib.keys(template.variants);
    return template.rSort ? mylib.toRandomSorted(keys) : keys;
  }, [template.rSort, template.variants]);

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
              checked={userAnswer?.v === +answerId}
              postfix={title}
              onClick={async () => onUpdate(prev => (prev !== +answerId ? +answerId : undefined))}
            />
          </div>
        );
      })}
    </>
  );
};
