import { translateBase } from '#basis/locale';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { QuestionerAdminTemplateContentProps, QuestionerType } from 'shared/model/q';
import { QuestionerAdminVariantedTemplateCardContent } from './Varianted.admin';

export const QuestionerAdminCheckTemplateCardContent = (
  props: QuestionerAdminTemplateContentProps<QuestionerType.Check>,
) => {
  return (
    <QuestionerAdminVariantedTemplateCardContent
      {...props}
      preContent={
        <div className="flex gap-2">
          <InputWithLoadingIcon
            icon="LowSignal"
            defaultValue={'' + (props.template.min || (props.template.req ? '1' : ''))}
            strongDefaultValue
            label={translateBase(BaseLocaleKey.QuestionerMinimumPoints)}
            type="tel"
            onChanged={value =>
              questionerAdminTsjrpcClient.changeTemplateMinSign({
                blankw: props.blank.w,
                templateId: props.templateId,
                value: +value,
              })
            }
          />
          <InputWithLoadingIcon
            icon="MinusSign"
            defaultValue={'' + (props.template.max || '')}
            strongDefaultValue
            label={translateBase(BaseLocaleKey.QuestionerMaximumPoints)}
            type="tel"
            onChanged={value =>
              questionerAdminTsjrpcClient.changeTemplateMaxSign({
                blankw: props.blank.w,
                templateId: props.templateId,
                value: +value,
              })
            }
          />
        </div>
      }
      addIcon="PlusSignSquare"
      makeVariantIconProps={answerId => ({
        icon: props.template.correct?.includes(answerId) ? 'CheckmarkSquare02' : 'Square',
      })}
    />
  );
};
