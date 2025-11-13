import { mylib } from '#shared/lib/my-lib';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { QuestionerType } from 'shared/model/q';
import { QuestionerConditionContentProps } from 'shared/model/q/answer';

export const QuestionerTemplateConditionTextIncludeCardContent = ({
    template: template,
    ifCondition,
}: QuestionerConditionContentProps<QuestionerType.TextInclude>) => {



    return (
        <>TextInclude</>
    );
};
