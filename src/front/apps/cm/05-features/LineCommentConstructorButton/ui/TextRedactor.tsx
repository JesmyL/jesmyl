import { TextInput } from '#shared/ui/TextInput';
import {
  CmLineCommentConstructorButtonPropKey,
  CmLineCommentConstructorButtonRulePropsDict,
} from '$cm/shared/model/com-comment';
import { useDebounceCallback } from 'shared/utils/useDebounceCallback';
import { cmLineCommentConstructorButtonRulePropsDictAtom } from '../state/atoms';

export const CmLineCommentConstructorButtonTextRedactor = <Key extends CmLineCommentConstructorButtonPropKey>(props: {
  blockKey: Key;
  label: React.ReactNode;
  blockPropsHolder: { dict?: CmLineCommentConstructorButtonRulePropsDict };
  getDefaultPropsDict: () => CmLineCommentConstructorButtonRulePropsDict[Key];
  disabled?: boolean;
}) => {
  const updateDebounce = useDebounceCallback();

  return (
    <TextInput
      label={props.label}
      defaultValue={props.blockPropsHolder.dict?.[props.blockKey]?.text}
      disabled={props.disabled}
      strongDefaultValue
      onInput={value =>
        updateDebounce(() => {
          cmLineCommentConstructorButtonRulePropsDictAtom.do.update(dict => {
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
