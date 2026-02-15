import { TextInput } from '#shared/ui/TextInput';
import { CmComCommentConstructorPropKey, CmComCommentConstructorRulePropsDict } from '$cm/shared/model/com-comment';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useDebounceCallback } from 'shared/utils/useDebounceCallback';

export const CmComCommentConstructorTextRedactor = <Key extends CmComCommentConstructorPropKey>(props: {
  blockKey: Key;
  label: React.ReactNode;
  blockPropsHolder: { dict?: CmComCommentConstructorRulePropsDict };
  getDefaultPropsDict: () => CmComCommentConstructorRulePropsDict[Key];
  disabled?: boolean;
  multiline?: boolean;
}) => {
  const updateDebounce = useDebounceCallback();

  return (
    <TextInput
      label={props.label}
      defaultValue={props.blockPropsHolder.dict?.[props.blockKey]?.text}
      disabled={props.disabled}
      strongDefaultValue
      multiline={props.multiline}
      onInput={value =>
        updateDebounce(() => {
          cmComCommentConstructorRulePropsDictAtom.do.update(dict => {
            dict.dict ??= {};
            const blockDict = (dict.dict[props.blockKey] ??= props.getDefaultPropsDict());
            if (blockDict == null) return;
            blockDict.text = value;
          });
        })
      }
    />
  );
};
