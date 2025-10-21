import { QuestionerAdminTemplateContentProps, QuestionerType } from 'shared/model/q';
import { QuestionerAdminVariantedTemplateCardContent } from './Varianted.admin';

export const QuestionerAdminRadioTemplateCardContent = (
  props: QuestionerAdminTemplateContentProps<QuestionerType.Radio>,
) => {
  return (
    <>
      <QuestionerAdminVariantedTemplateCardContent
        {...props}
        addIcon="PlusSignCircle"
        makeVariantIconProps={answerId => ({
          icon: 'RadioButton',
          kind: props.template.correct === answerId ? 'SolidRounded' : undefined,
        })}
      />
    </>
  );
};
