import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { useMemo } from 'react';
import { QuestionerType } from 'shared/model/q';
import { QuestionerUserAnswerContentProps } from 'shared/model/q/answer';
import { toRandomSorted } from 'shared/randoms';
import { objectKeys } from 'shared/utils/object.utils';

export const QuestionerUserCheckTemplateCardContent = ({
  template,
  onUpdate,
  userAnswer,
}: QuestionerUserAnswerContentProps<QuestionerType.Check>) => {
  const keys = useMemo(() => {
    const keys = objectKeys(template.variants);
    return template.rSort ? toRandomSorted(keys) : keys;
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
              checked={userAnswer?.v.includes(+answerId)}
              postfix={title}
              onClick={() => {
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
