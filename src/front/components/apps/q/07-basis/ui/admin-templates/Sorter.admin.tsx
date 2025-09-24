import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { TextInput } from '#shared/ui/TextInput';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { questionerAdminTsjrpcClient } from '$q/processes/tsjrpc/admin.tsjrpc';
import { QuestionerAdminTemplateContentProps, QuestionerType } from 'shared/model/q';

export const QuestionerAdminSorterTemplateCardContent = ({
  blank,
  onUpdate,
  template,
  templateId,
}: QuestionerAdminTemplateContentProps<QuestionerType.Sorter>) => {
  const variantKeys = template.correct ?? mylib.keys(template.variants);

  return (
    <>
      <div className="mb-10">
        <IconCheckbox
          checked={!!template.noCorrect}
          postfix="Нет определённого ответа"
          onChange={() =>
            questionerAdminTsjrpcClient.switchTemplateNoCorrectsSign({ blankw: blank.w, templateId }).then(onUpdate)
          }
        />

        <InputWithLoadingIcon
          icon="LayoutTop"
          defaultValue={template.above || ''}
          label="Верхняя ремарка"
          strongDefaultValue
          onChange={text =>
            questionerAdminTsjrpcClient.changeTemplateAboveText({ blankw: blank.w, templateId, text }).then(onUpdate)
          }
        />

        <InputWithLoadingIcon
          icon="LayoutBottom"
          defaultValue={template.below || ''}
          label="Нижняя ремарка"
          strongDefaultValue
          onChange={text =>
            questionerAdminTsjrpcClient.changeTemplateBelowText({ blankw: blank.w, templateId, text }).then(onUpdate)
          }
        />
      </div>

      <div className="text-x7">{template.above}</div>

      <div>
        {variantKeys.map((answerId, answerIdi) => {
          return (
            <div key={answerId}>
              {!answerIdi || !!template.noCorrect || (
                <Button
                  icon="ArrowDataTransferVertical"
                  onClick={() =>
                    questionerAdminTsjrpcClient
                      .changeTemplateCorrectAnswerSign({ blankw: blank.w, templateId, answerId: +answerId })
                      .then(onUpdate)
                  }
                />
              )}
              <TextInput
                defaultValue={template.variants[answerId]?.title ?? ''}
                strongDefaultValue
                multiline
                className="my-3"
                onChanged={value =>
                  questionerAdminTsjrpcClient
                    .changeTemplateAnswerVariantTitle({ blankw: blank.w, templateId, answerId, value })
                    .then(onUpdate)
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
            questionerAdminTsjrpcClient.addTemplateAnswerVariant({ blankw: blank.w, templateId }).then(onUpdate)
          }
        >
          Добавить пункт
        </Button>
      </div>
    </>
  );
};
