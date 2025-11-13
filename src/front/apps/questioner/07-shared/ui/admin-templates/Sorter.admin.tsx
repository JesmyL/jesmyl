import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { useMemo } from 'react';
import { QuestionerAdminTemplateContentProps, QuestionerAnswerId, QuestionerType } from 'shared/model/q';

export const QuestionerAdminSorterTemplateCardContent = ({
  blank,
  template,
  templateId,
}: QuestionerAdminTemplateContentProps<QuestionerType.Sorter>) => {
  const variantKeys = useMemo(
    () =>
      Array.from(
        new Set([...(template.correct ?? []), ...mylib.keys(template.variants).map(it => +it as QuestionerAnswerId)]),
      ),
    [template.correct, template.variants],
  );

  return (
    <>
      <div className="mb-10">
        <IconCheckbox
          checked={!!template.noCorrect}
          postfix="Нет правильного порядка"
          onChange={() =>
            questionerAdminTsjrpcClient.switchTemplateNoCorrectsSign({ blankw: blank.w, templateId })
          }
        />
        <IconCheckbox
          checked={!!template.needSelect}
          disabled={!!template.noCorrect}
          postfix="Нужно выбрать подходящие варианты"
          onChange={() =>
            questionerAdminTsjrpcClient.switchTemplateNeedSelectSign({ blankw: blank.w, templateId })
          }
        />

        <InputWithLoadingIcon
          icon="LayoutTop"
          defaultValue={template.above || ''}
          label="Верхняя ремарка"
          strongDefaultValue
          onChanged={text =>
            questionerAdminTsjrpcClient.changeTemplateAboveText({ blankw: blank.w, templateId, text })
          }
        />

        <InputWithLoadingIcon
          icon="LayoutBottom"
          defaultValue={template.below || ''}
          label="Нижняя ремарка"
          strongDefaultValue
          onChanged={text =>
            questionerAdminTsjrpcClient.changeTemplateBelowText({ blankw: blank.w, templateId, text })
          }
        />
      </div>

      <div>Отмеченные варианты являются правильными</div>

      <div className="text-x7">{template.above}</div>

      <div>
        {variantKeys.map((answerId, answerIdi) => {
          const isInCorrect = template.correct?.includes(+answerId);

          return (
            <div key={answerId}>
              {!isInCorrect || !answerIdi || !!template.noCorrect || (
                <Button
                  icon="ArrowDataTransferVertical"
                  onClick={() =>
                    questionerAdminTsjrpcClient.changeTemplateCorrectAnswerIndex({ blankw: blank.w, templateId, answerId: +answerId })
                  }
                />
              )}
              <InputWithLoadingIcon
                defaultValue={template.variants[answerId]?.title ?? ''}
                strongDefaultValue
                multiline
                className="my-3"
                iconNode={
                  !!template.noCorrect ||
                  !template.needSelect || (
                    <LazyIcon
                      icon={isInCorrect ? 'CheckmarkSquare02' : 'Square'}
                      onClick={() =>
                        questionerAdminTsjrpcClient
                          .changeTemplateCorrectAnswerSign({ blankw: blank.w, templateId, answerId: +answerId })
                      }
                    />
                  )
                }
                onChanged={value =>
                  questionerAdminTsjrpcClient.changeTemplateAnswerVariantTitle({ blankw: blank.w, templateId, answerId, value })
                }
              />
            </div>
          );
        })}
        <div className="text-x7">{template.below}</div>
        <Button
          icon="NodeAdd"
          className="mt-5"
          disabled={variantKeys.some(key => !template.variants[key]?.title)}
          disabledReason="Есть пункты без названия"
          onClick={() =>
            questionerAdminTsjrpcClient.addTemplateAnswerVariant({ blankw: blank.w, templateId })
          }
        >
          Добавить пункт
        </Button>
      </div>
    </>
  );
};
