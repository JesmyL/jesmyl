import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { TextInput } from '#shared/ui/TextInput';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import {
  CmComCommentConstructorPropKey,
  CmComCommentConstructorRuleKindByPropsType,
  CmComCommentConstructorRulePropsDict,
  CmComCommentConstructorRuleType,
} from 'shared/model/cm/com-comment';
import { useDebounceCallback } from 'shared/utils/useDebounceCallback';

export const CmComCommentConstructorTextRedactor = <
  Key extends CmComCommentConstructorPropKey,
  PropsType extends CmComCommentConstructorRulePropsDict[Key],
>(props: {
  blockKey: Key;
  type: CmComCommentConstructorRuleKindByPropsType<PropsType>;
  label: React.ReactNode;
  blockPropsHolder: { dict?: CmComCommentConstructorRulePropsDict };
  getDefaultPropsDict: () => PropsType;
  disabled?: boolean;
  multiline?: boolean;
}) => {
  const updateDebounce = useDebounceCallback();
  const text = props.blockPropsHolder.dict?.[props.blockKey]?.text;
  const constants = useAtomValue(constantsConfigAtom);
  const maxLen = {
    [CmComCommentConstructorRuleType.Head]: constants.maxComCommentHeadLen,
    [CmComCommentConstructorRuleType.Block]: constants.maxComCommentBlockLen,
    [CmComCommentConstructorRuleType.Line]: constants.maxComCommentLineLen,
    [CmComCommentConstructorRuleType.Word]: constants.maxComCommentWordLen,
    [CmComCommentConstructorRuleType.Chord]: constants.maxComCommentChordLen,
  }[props.type ?? CmComCommentConstructorRuleType.Line];

  return (
    <TextInput
      label={
        <>
          {props.label} ({text?.length ?? 0}/{maxLen})
        </>
      }
      defaultValue={text}
      disabled={props.disabled}
      strongDefaultValue
      multiline={props.multiline}
      className={text && text.length > maxLen ? 'bg-xKO! text-x3! border-xKO' : ''}
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
