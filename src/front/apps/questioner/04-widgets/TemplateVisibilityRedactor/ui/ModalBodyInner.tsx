import { Button } from "#shared/components/ui/button"
import { Card } from "#shared/components/ui/card"
import { mylib } from "#shared/lib/my-lib"
import { Dropdown } from "#shared/ui/dropdown/Dropdown"
import { questionerCardContents } from "$q/shared/const/cardContents"
import { questionerTemplateDescriptions } from "$q/shared/const/templateDescriptions"
import { questionerAdminTsjrpcClient } from "$q/shared/tsjrpc/admin.tsjrpc"
import { questionerTypeDefaultIfConditionOperatorDict } from "shared/const/q/typeDefaultIfConditionOperator"
import { QuestionerBlank, QuestionerBlankWid, QuestionerTemplate, QuestionerTemplateId } from "shared/model/q"
import { QuestionerTemplateConditionType } from "shared/model/q/condition"

export const QuestionerTemplateVisibilityRedactorModalBodyInner = ({ template, blankw, templateId, blank }: { blank: QuestionerBlank, template: QuestionerTemplate, blankw: QuestionerBlankWid, templateId: QuestionerTemplateId }) => {


    return <>
        <Dropdown
            id={template?.if?.t ?? QuestionerTemplateConditionType.And}
            items={[
                { id: QuestionerTemplateConditionType.And, title: 'Виден при всех условиях' },
                { id: QuestionerTemplateConditionType.Or, title: 'Виден хотя бы при одном из условий' }
            ]}
            onSelectId={(id) =>
                questionerAdminTsjrpcClient
                    .setTemplateConditionOperator({ blankw, templateId, operator: id })}
        />

        {template.if?.next.map((condition, conditioni) => {
            return <Card.Root key={conditioni} className="my-5">
                <Card.Content>
                    <Card.Header>
                        <div className="flex justify-between gap-3 flex-wrap">
                            <Button icon="Delete01" className="text-xKO"
                                onClick={() => questionerAdminTsjrpcClient.removeTemplateCondition({ blankw, nexti: conditioni, templateId, })}
                            />
                            <Button
                                disabled={condition.next.length === 1}
                                onClick={() =>
                                    questionerAdminTsjrpcClient
                                        .setTemplateConditionOperator({
                                            blankw,
                                            templateId,
                                            nexti: conditioni,
                                            operator: template?.if?.next[conditioni].t
                                                ? QuestionerTemplateConditionType.And
                                                : QuestionerTemplateConditionType.Or
                                        })}
                            >{template?.if?.next[conditioni].t ? 'ИЛИ' : 'И'}</Button>
                        </div>
                    </Card.Header>

                    <div className="w-full bg-x3/30 h-[1px] my-2" />

                    {condition.next?.map((nextItem, nextNexti) => {
                        const nextTemplate = blank.tmp[nextItem.tmpId];

                        return <div key={nextNexti}>
                            <div className="flex gap-3 flex-wrap">
                                <Dropdown
                                    id={nextItem.tmpId}
                                    items={mylib.keys(blank.tmp).map(id => {
                                        if (+id === +templateId || !blank.tmp[id]) return null;
                                        return ({ id: +id, title: blank.tmp[id].title ?? questionerTemplateDescriptions[blank.tmp[id].type].title })
                                    })}
                                    onSelectId={conditionTemplateId => questionerAdminTsjrpcClient.setTemplateConditionNextTemplateId({
                                        blankw,
                                        templateId,
                                        conditionTemplateId,
                                        nexti: conditioni,
                                        nextNexti: nextNexti,
                                    })}
                                />

                                {nextTemplate && questionerCardContents(nextTemplate.type).conditionConfigureRender({
                                    ifCondition: template.if?.next[conditioni].next[nextNexti] as never,
                                    operator: template.if?.next[conditioni]?.next[nextNexti]?.op ?? questionerTypeDefaultIfConditionOperatorDict[nextTemplate.type],
                                    template: nextTemplate,
                                    blank,
                                    nexti: conditioni,
                                    nextNexti,
                                    templateId,
                                })}
                                {condition.next.length === 1 || <Button icon="Delete02" className="text-xKO"
                                    onClick={() => questionerAdminTsjrpcClient.removeTemplateCondition({ blankw, nexti: conditioni, templateId, nextNexti })} />}
                            </div>
                            <div className="w-full bg-x3/30 h-[1px] my-2" />
                        </div>
                    })}

                    <Card.Footer className="flex flex-wrap gap-3 mt-5">
                        <Button icon="PlusSign"
                            onClick={() => questionerAdminTsjrpcClient.addTemplateConditionNextNext({
                                blankw, templateId, nexti: conditioni
                            })}
                        >Подусловие</Button>
                    </Card.Footer>
                </Card.Content>
            </Card.Root>
        })}

        <Button
            icon="PlusSign"
            className="mt-5"
            disabled={mylib.keys(blank.tmp).length < 2}
            disabledReason='Других вопросов нет'
            onClick={() => questionerAdminTsjrpcClient.addTemplateConditionNext({ blankw, templateId })}
        >Добавить условие</Button>
    </>
}