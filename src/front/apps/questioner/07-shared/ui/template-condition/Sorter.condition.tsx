import { QuestionerType } from 'shared/model/q';
import { QuestionerConditionContentProps } from 'shared/model/q/answer';
import { QuestionerTemplateConditionOperator, QuestionerTemplateTypeConditionDict } from 'shared/model/q/condition';
import { QuestionerTemplateConditionCardOperatorSelector } from './ui/OperatorSelector';
import { QuestionerTemplateConditionCardVariantSelector } from './ui/VariantSelector';

type ConditionOperator = Exclude<QuestionerTemplateTypeConditionDict[QuestionerType.Sorter]['op'], nil>;

export const QuestionerTemplateConditionSorterCardContent = (
  props: QuestionerConditionContentProps<QuestionerType.Sorter>,
) => {
  const operatorSelectorDict: Record<RKey<ConditionOperator>, React.ReactNode> = {
    [QuestionerTemplateConditionOperator.In]: (
      <QuestionerTemplateConditionCardVariantSelector
        {...props}
        operator={QuestionerTemplateConditionOperator.In}
      />
    ),

    [QuestionerTemplateConditionOperator.Out]: (
      <QuestionerTemplateConditionCardVariantSelector
        {...props}
        operator={QuestionerTemplateConditionOperator.Out}
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
