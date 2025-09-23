import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { useEffect, useMemo } from 'react';
import { QuestionerType, QuestionerUserAnswerContentProps } from 'shared/model/q';

export const QuestionerUserSorterTemplateCardContent = ({
  onUpdate,
  userAnswer,
  template,
}: QuestionerUserAnswerContentProps<QuestionerType.Sorter>) => {
  const keys = useMemo(() => {
    return mylib.toRandomSorted(mylib.keys(template.variants));
  }, [template.variants]);

  useEffect(() => {
    if (!userAnswer || keys.length === userAnswer.length) return;

    onUpdate(() => {
      const newAnswer = [...userAnswer];
      const prevSet = new Set(userAnswer);

      keys.forEach(answerId => {
        if (prevSet.has(+answerId)) return;
        newAnswer.push(+answerId);
      });

      return newAnswer;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys.length, userAnswer]);

  return (
    <>
      <div className="text-x7">{template.above}</div>
      <div className="ml-3">
        {(userAnswer ?? keys).map((answerId, answerIdi) => {
          const variant = template.variants[answerId];

          return (
            <div key={answerId}>
              {!answerIdi || (
                <div className="my-3">
                  <Button
                    icon="ArrowDataTransferVertical"
                    onClick={() =>
                      onUpdate(prev => {
                        const prevKeys = prev ?? keys.map(Number);
                        const answeri = prevKeys.indexOf(+answerId);

                        return mylib.withInsertedBeforei(prevKeys, answeri - 1, answeri);
                      })
                    }
                  />
                </div>
              )}
              <div>{variant?.title}</div>
            </div>
          );
        })}
      </div>
      <div className="text-x7">{template.below}</div>
    </>
  );
};
