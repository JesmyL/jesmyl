import { QuestionerType } from 'shared/model/q';
import { QuestionerConditionContentProps } from 'shared/model/q/answer';
import { QuestionerTemplateConditionCardOperatorSelector } from './ui/OperatorSelector';
import { QuestionerTemplateConditionOperator, QuestionerTemplateTypeConditionDict } from 'shared/model/q/condition';
import { TextInput } from '#shared/ui/TextInput';
import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';

type ConditionOperator = Exclude<QuestionerTemplateTypeConditionDict[QuestionerType.Comment]['op'], nil>;

export const QuestionerTemplateConditionCommentCardContent = (props: QuestionerConditionContentProps<QuestionerType.Comment>) => {
  const operatorSelectorDict: Record<RKey<ConditionOperator>, React.ReactNode> = {
    [QuestionerTemplateConditionOperator.GreatThenLength]: null,
    [QuestionerTemplateConditionOperator.LessThenLength]: null,
  };


  return (
    <>
      <QuestionerTemplateConditionCardOperatorSelector {...props} operatorSelectorDict={operatorSelectorDict} />

      <TextInput
        type='tel'
        defaultValue={props.ifCondition?.val ? '' + props.ifCondition.val : ''}
        strongDefaultValue
        className='max-w-[5em]'
        onChanged={(value) =>
          questionerAdminTsjrpcClient.setTemplateConditionNextValue({
            blankw: props.blank.w,
            nexti: props.nexti,
            nextNexti: props.nextNexti,
            match: { [props.template.type]: { [props.operator]: +value } },
            templateId: props.templateId,
          })
        }
      />
    </>
  );
};
