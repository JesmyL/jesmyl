import { CmComCommentConstructorPropKey, CmComCommentConstructorRulePropsDict } from '$cm/shared/model/com-comment';
import { CmComCommentConstructorTextWithAccentRedactor } from './TextWithAccentRedactor';

export const CmComCommentConstructorBlockRedactor = <
  PreKey extends CmComCommentConstructorPropKey,
  PostKey extends CmComCommentConstructorPropKey,
>({
  blockPropsHolder,
  preKey,
  postKey,
  getDefaultPropsDict,
  preLabel,
  postLabel,
  disabled,
}: {
  preKey: PreKey;
  postKey: PostKey;
  preLabel: React.ReactNode;
  postLabel: React.ReactNode;
  disabled?: boolean;
  blockPropsHolder: { dict?: CmComCommentConstructorRulePropsDict };
  getDefaultPropsDict: (place: '<' | '>') => CmComCommentConstructorRulePropsDict[PreKey & PostKey];
}) => {
  return (
    <>
      <CmComCommentConstructorTextWithAccentRedactor
        blockKey={preKey}
        label={preLabel}
        blockPropsHolder={blockPropsHolder}
        getDefaultPropsDict={() => getDefaultPropsDict('<')}
        disabled={disabled}
      />
      <CmComCommentConstructorTextWithAccentRedactor
        blockKey={postKey}
        label={postLabel}
        blockPropsHolder={blockPropsHolder}
        getDefaultPropsDict={() => getDefaultPropsDict('>')}
        disabled={disabled}
      />
    </>
  );
};
