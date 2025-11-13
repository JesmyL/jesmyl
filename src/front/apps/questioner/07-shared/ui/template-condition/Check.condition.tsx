import { QuestionerType } from 'shared/model/q';
import { QuestionerConditionContentProps } from 'shared/model/q/answer';
import { QuestionerTemplateConditionOperator, QuestionerTemplateTypeConditionDict } from 'shared/model/q/condition';
import { QuestionerTemplateConditionCardVariantSelector } from './ui/VariantSelector';
import { QuestionerTemplateConditionCardOperatorSelector } from './ui/OperatorSelector';

type ConditionOperator = Exclude<QuestionerTemplateTypeConditionDict[QuestionerType.Check]['op'], nil>;

export const QuestionerTemplateConditionCheckCardContent = (props: QuestionerConditionContentProps<QuestionerType.Check>) => {
    const operatorSelectorDict: Record<RKey<ConditionOperator>, React.ReactNode> = {
        [QuestionerTemplateConditionOperator.In]: <QuestionerTemplateConditionCardVariantSelector
            {...props}
            operator={QuestionerTemplateConditionOperator.In}
        />,

        [QuestionerTemplateConditionOperator.Out]: <QuestionerTemplateConditionCardVariantSelector
            {...props}
            operator={QuestionerTemplateConditionOperator.Out}
        />,
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
