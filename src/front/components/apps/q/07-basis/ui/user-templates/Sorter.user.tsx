import { Badge } from '#shared/components/ui/badge';
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
  const variantKeys = useMemo(() => {
    return mylib.toRandomSorted(mylib.keys(template.variants));
  }, [template.variants]);

  const sortAnswerIds = useMemo(
    () => userAnswer?.v ?? (template.needSelect ? [] : variantKeys),
    [variantKeys, template.needSelect, userAnswer?.v],
  );

  useEffect(() => {
    if (isCantRedact || template.needSelect || !userAnswer || variantKeys.length === userAnswer.v.length) return;

    onUpdate(() => Array.from(new Set([...userAnswer.v, ...variantKeys.map(Number)])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantKeys, userAnswer, isCantRedact, template.needSelect]);

  return (
    <>
      {!isCantRedact && template.needSelect && (
        <>
          <div className="mb-3">Сначала нужно выбрать подходящие варианты для сортировки:</div>
          <div className="flex gap-3 flex-wrap">
            {variantKeys.map(answerId => {
              if (!template.variants[answerId]?.title) return;

              return (
                <Badge
                  key={answerId}
                  className={userAnswer?.v.includes(+answerId) ? '' : 'opacity-50'}
                  onClick={() => {
                    onUpdate(prev => {
                      return prev?.includes(+answerId)
                        ? prev.filter(it => it != answerId)
                        : (prev?.concat(+answerId) ?? [+answerId]);
                    });
                  }}
                >
                  {template.variants[answerId]?.title}
                </Badge>
              );
            })}
          </div>
          {!userAnswer?.v.length || <div className="my-3">А потом их отсортировать:</div>}
        </>
      )}

      <div className="text-x7">{template.above}</div>
      <div className="ml-3">
        {sortAnswerIds.map((answerId, answerIdi, answerIda) => {
          const title = template.variants[answerId]?.title;

          if (isCantRedact) return <div key={answerId}>{title}</div>;

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
                    const prevKeys = prev ?? variantKeys.map(Number);
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
                    const prevKeys = prev ?? variantKeys.map(Number);
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
