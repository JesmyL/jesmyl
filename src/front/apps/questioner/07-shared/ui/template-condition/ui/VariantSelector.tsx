import { mylib } from "#shared/lib/my-lib"
import { Dropdown } from "#shared/ui/dropdown/Dropdown"
import { questionerAdminTsjrpcClient } from "$q/shared/tsjrpc/admin.tsjrpc"
import { QuestionerType } from "shared/model/q"
import { QuestionerConditionContentProps } from "shared/model/q/answer"
import { QuestionerTemplateTypeConditionDict } from "shared/model/q/condition"

export const QuestionerTemplateConditionCardVariantSelector = <Type extends QuestionerType.Check | QuestionerType.Sorter | QuestionerType.Radio>(props: QuestionerConditionContentProps<Type> & { operator: Exclude<QuestionerTemplateTypeConditionDict[Type]['op'], nil> }) => {
    return <Dropdown
        id={props.ifCondition?.val}
        items={mylib.keys(props.template.variants).map(answerId => ({
            id: +answerId,
            title: props.template.variants[answerId]?.title
        }))}
        onSelectId={(id) =>
            questionerAdminTsjrpcClient.setTemplateConditionNextValue({
                blankw: props.blank.w,
                nexti: props.nexti,
                nextNexti: props.nextNexti,
                match: { [props.template.type]: { [props.operator]: id } },
                templateId: props.templateId,
            })
        }
    />
}