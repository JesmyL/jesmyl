import { mylib } from '#shared/lib/my-lib';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { useMemo } from 'react';
import { QuestionerType, QuestionerUserAnswerContentProps } from 'shared/model/q';

export const QuestionerUserCheckTemplateCardContent = ({
  template,
  onUpdate,
  userAnswer,
}: QuestionerUserAnswerContentProps<QuestionerType.Check>) => {
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
              checked={userAnswer?.includes(+answerId)}
              postfix={title}
              onClick={async () => {
                onUpdate(prev => {
                  const result = prev?.includes(+answerId)
                    ? prev.filter(id => id !== +answerId)
                    : [+answerId].concat(prev || []);

                  return result.length ? result : undefined;
                });
              }}
            />
          </div>
        );
      })}
    </>
  );
};
