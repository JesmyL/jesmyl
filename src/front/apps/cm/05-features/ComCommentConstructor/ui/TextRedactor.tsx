import { mylib } from '#shared/lib/my-lib';
import { TextInput } from '#shared/ui/TextInput';
import { cmConstantsConfigAtom } from '$cm/ext';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import {
  CmComCommentConstructorPropKey,
  CmComCommentConstructorRuleKind,
  CmComCommentConstructorRuleKindByPropsType,
  CmComCommentConstructorRulePropsDict,
} from 'shared/model/cm/com-comment';
import { useDebounceCallback } from 'shared/utils/useDebounceCallback';

export const CmComCommentConstructorTextRedactor = <
  Key extends CmComCommentConstructorPropKey,
  PropsType extends CmComCommentConstructorRulePropsDict[Key],
>(props: {
  blockKey: Key;
  kind: CmComCommentConstructorRuleKindByPropsType<PropsType>;
  label: React.ReactNode;
  blockPropsHolder: { dict?: CmComCommentConstructorRulePropsDict };
  getDefaultPropsDict: () => PropsType;
  disabled?: boolean;
  multiline?: boolean;
}) => {
  const updateDebounce = useDebounceCallback();
  const text = props.blockPropsHolder.dict?.[props.blockKey]?.text;
  const constants = useAtomValue(cmConstantsConfigAtom);
  const maxLen = {
    [CmComCommentConstructorRuleKind.Head]: constants.maxComCommentHeadLen,
    [CmComCommentConstructorRuleKind.Block]: constants.maxComCommentBlockLen,
    [CmComCommentConstructorRuleKind.Line]: constants.maxComCommentLineLen,
    [CmComCommentConstructorRuleKind.Word]: constants.maxComCommentWordLen,
    [CmComCommentConstructorRuleKind.Chord]: constants.maxComCommentChordLen,
  }[props.kind ?? CmComCommentConstructorRuleKind.Line];

  return (
    <TextInput
      label={
        <>
          {props.label} (до {maxLen} {mylib.declension(maxLen, 'символа', 'символов', 'символов')})
        </>
      }
      defaultValue={text}
      disabled={props.disabled}
      strongDefaultValue
      multiline={props.multiline}
      className={text && text.length > maxLen ? 'bg-xKO! text-x3! border-xKO' : undefined}
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
