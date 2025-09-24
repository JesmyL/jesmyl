import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { useEffect, useMemo } from 'react';
import { QuestionerType, QuestionerUserAnswerContentProps } from 'shared/model/q';
import { twMerge } from 'tailwind-merge';

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
        {(userAnswer ?? keys).map((answerId, answerIdi, answerIda) => {
          const variant = template.variants[answerId];

          return (
            <div
              key={answerId}
              className="flex gap-y-1 my-5 @container"
            >
              <Button
                icon="SquareArrowMoveRightUp"
                className={twMerge('self-start -mt-4 -mr-2', !answerIdi && 'opacity-0 pointers-none')}
                onClick={() =>
                  onUpdate(prev => {
                    const prevKeys = prev ?? keys.map(Number);
                    const answeri = prevKeys.indexOf(+answerId);

                    return mylib.withInsertedBeforei(prevKeys, answeri - 1, answeri);
                  })
                }
              />

              <div className="white-pre-line bg-x3/10 p-3 rounded-md">{variant?.title}</div>

              <Button
                icon="SquareArrowMoveDownLeft"
                className={twMerge(
                  'self-end -mb-4 -ml-2',
                  answerIdi === answerIda.length - 1 && 'opacity-0 pointers-none',
                )}
                onClick={() =>
                  onUpdate(prev => {
                    const prevKeys = prev ?? keys.map(Number);
                    const answeri = prevKeys.indexOf(+answerId);

                    return mylib.withInsertedBeforei(prevKeys, answeri + 2, answeri);
                  })
                }
              />
            </div>
          );
        })}
      </div>
      <div className="text-x7">{template.below}</div>
    </>
  );
};
