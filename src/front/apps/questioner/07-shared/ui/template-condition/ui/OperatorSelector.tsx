import { mylib } from "#shared/lib/my-lib";
import { Dropdown } from "#shared/ui/dropdown/Dropdown";
import { questionerIfConditionOperatorDescriptionDict } from "$q/shared/const/ifConditionDescriptions";
import { questionerAdminTsjrpcClient } from "$q/shared/tsjrpc/admin.tsjrpc";
import { QuestionerType } from "shared/model/q";
import { QuestionerConditionContentProps } from "shared/model/q/answer";
import { QuestionerTemplateTypeConditionDict } from "shared/model/q/condition";

export const QuestionerTemplateConditionCardOperatorSelector = <
    Type extends QuestionerType,
    ConditionOperator extends Exclude<QuestionerTemplateTypeConditionDict[Type]['op'], nil>
>(props: QuestionerConditionContentProps<QuestionerType> & {
    operatorSelectorDict: Record<RKey<ConditionOperator>, React.ReactNode>, operator: ConditionOperator,
}) => {

    return <Dropdown<ConditionOperator>
        id={props.operator}
        items={mylib.keys(props.operatorSelectorDict).map(id => ({
            id: +id as ConditionOperator, title: questionerIfConditionOperatorDescriptionDict[id as ConditionOperator]
        }))}
        onSelectId={(operator) =>
            questionerAdminTsjrpcClient.setTemplateConditionNextOperator({
                blankw: props.blank.w,
                nexti: props.nexti,
                nextNexti: props.nextNexti,
                match: { [props.template.type]: operator },
                templateId: props.templateId,
            })}
    />
};