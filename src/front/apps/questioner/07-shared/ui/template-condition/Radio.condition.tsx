import { QuestionerType } from 'shared/model/q';
import { QuestionerConditionContentProps } from 'shared/model/q/answer';
import { QuestionerTemplateConditionOperator, QuestionerTemplateTypeConditionDict } from 'shared/model/q/condition';
import { QuestionerTemplateConditionCardOperatorSelector } from './ui/OperatorSelector';
import { QuestionerTemplateConditionCardVariantSelector } from './ui/VariantSelector';

type ConditionOperator = Exclude<QuestionerTemplateTypeConditionDict[QuestionerType.Radio]['op'], nil>;

export const QuestionerTemplateConditionRadioCardContent = (
  props: QuestionerConditionContentProps<QuestionerType.Radio>,
) => {
  const operatorSelectorDict: Record<RKey<ConditionOperator>, React.ReactNode> = {
    [QuestionerTemplateConditionOperator.Eq]: (
      <QuestionerTemplateConditionCardVariantSelector
        {...props}
        operator={QuestionerTemplateConditionOperator.Eq}
      />
    ),

    [QuestionerTemplateConditionOperator.Neq]: (
      <QuestionerTemplateConditionCardVariantSelector
        {...props}
        operator={QuestionerTemplateConditionOperator.Neq}
      />
    ),
  };

  return (
    <>
      <QuestionerTemplateConditionCardOperatorSelector
        {...props}
        operatorSelectorDict={operatorSelectorDict}
      />

      {operatorSelectorDict[props.operator]}
    </>
  );
};
