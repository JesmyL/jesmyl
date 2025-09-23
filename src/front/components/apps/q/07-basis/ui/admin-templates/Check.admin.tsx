import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { questionerAdminTsjrpcClient } from '$q/processes/tsjrpc/admin.tsjrpc';
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
            label="Минимум пунктов (1)"
            type="tel"
            onChange={value =>
              questionerAdminTsjrpcClient
                .changeTemplateMinSign({ blankw: props.blank.w, templateId: props.templateId, value: +value })
                .then(props.onUpdate)
            }
          />
          <InputWithLoadingIcon
            icon="MinusSign"
            defaultValue={'' + (props.template.max || '')}
            strongDefaultValue
            label="Максимум пунктов"
            type="tel"
            onChange={value =>
              questionerAdminTsjrpcClient
                .changeTemplateMaxSign({ blankw: props.blank.w, templateId: props.templateId, value: +value })
                .then(props.onUpdate)
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
