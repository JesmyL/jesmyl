import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { QuestionerAdminTemplateContentProps, QuestionerAnswerId, QuestionerVariatedType } from 'shared/model/q';
import { StameskaIconKind } from 'stameska-icon/utils';

export const QuestionerAdminVariantedTemplateCardContent = ({
  blank,
  template,
  templateId,
  addIcon,
  makeVariantIconProps,
  preContent,
}: QuestionerAdminTemplateContentProps<QuestionerVariatedType> & {
  preContent?: React.ReactNode;
  addIcon: KnownStameskaIconName;
  makeVariantIconProps: (answerId: QuestionerAnswerId) => { icon: KnownStameskaIconName; kind?: StameskaIconKind };
}) => {
  const variantKeys = mylib.keys(template.variants);

  return (
    <>
      <IconCheckbox
        checked={!!template.rSort}
        postfix="Показывать варианты в случайном порядке"
        onChange={value =>
          questionerAdminTsjrpcClient.changeTemplateRandomSortSign({ blankw: blank.w, templateId, value })
        }
      />
      {preContent}

      <div className="mt-10">
        {variantKeys.map(answerId => {
          return (
            <InputWithLoadingIcon
              key={answerId}
              defaultValue={template.variants[answerId]?.title ?? ''}
              multiline
              iconNode={
                <LazyIcon
                  {...makeVariantIconProps(+answerId)}
                  onClick={() =>
                    questionerAdminTsjrpcClient.changeTemplateCorrectAnswerSign({ blankw: blank.w, templateId, answerId: +answerId })
                  }
                />
              }
              onChanged={value =>
                questionerAdminTsjrpcClient.changeTemplateAnswerVariantTitle({ blankw: blank.w, templateId, answerId, value })
              }
            />
          );
        })}
        <Button
          icon={addIcon}
          className="mt-5"
          disabled={variantKeys.some(key => !template.variants[key]?.title)}
          disabledReason="Есть варианты без названия"
          onClick={() =>
            questionerAdminTsjrpcClient.addTemplateAnswerVariant({ blankw: blank.w, templateId })
          }
        >
          Добавить вариант
        </Button>
      </div>
    </>
  );
};
