import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { useEffect, useMemo } from 'react';
import { QuestionerType } from 'shared/model/q';
import { QuestionerUserAnswerContentProps } from 'shared/model/q/answer';
import { twMerge } from 'tailwind-merge';

export const QuestionerUserSorterTemplateCardContent = ({
  onUpdate,
  userAnswer,
  template,
  isCantRedact,
}: QuestionerUserAnswerContentProps<QuestionerType.Sorter>) => {
  const keys = useMemo(() => {
    return mylib.toRandomSorted(mylib.keys(template.variants));
  }, [template.variants]);

  useEffect(() => {
    if (isCantRedact || !userAnswer || keys.length === userAnswer.v.length) return;

    onUpdate(() => Array.from(new Set([...userAnswer.v, ...keys.map(Number)])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys.length, userAnswer, isCantRedact]);

  return (
    <>
      <div className="text-x7">{template.above}</div>
      <div className="ml-3">
        {(userAnswer?.v ?? keys).map((answerId, answerIdi, answerIda) => {
          const title = template.variants[answerId]?.title;

          if (isCantRedact) return <div>{title}</div>;

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

              <div className="white-pre-line bg-x3/10 p-3 rounded-md">{title}</div>

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
