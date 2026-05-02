import {
  CmComCommentConstructorPropKey,
  CmComCommentConstructorRuleKindByPropsType,
  CmComCommentConstructorRulePropsDict,
} from 'shared/model/cm/com-comment';
import { CmComCommentConstructorTextWithAccentRedactor } from './TextWithAccentRedactor';

export const CmComCommentConstructorBlockRedactor = <
  PreKey extends CmComCommentConstructorPropKey,
  PostKey extends CmComCommentConstructorPropKey,
  PropsType extends CmComCommentConstructorRulePropsDict[PreKey & PostKey],
>({
  preKey,
  postKey,
  getDefaultPropsDict,
  preLabel,
  postLabel,
  ...props
}: {
  preKey: PreKey;
  postKey: PostKey;
  preLabel: React.ReactNode;
  postLabel: React.ReactNode;
  disabled?: boolean;
  kind: CmComCommentConstructorRuleKindByPropsType<PropsType>;
  blockPropsHolder: { dict?: CmComCommentConstructorRulePropsDict };
  getDefaultPropsDict: (place: '<' | '>') => PropsType;
}) => {
  return (
    <>
      <CmComCommentConstructorTextWithAccentRedactor
        {...props}
        blockKey={preKey}
        label={preLabel}
        getDefaultPropsDict={() => getDefaultPropsDict('<')}
      />
      <CmComCommentConstructorTextWithAccentRedactor
        {...props}
        blockKey={postKey}
        label={postLabel}
        getDefaultPropsDict={() => getDefaultPropsDict('>')}
      />
    </>
  );
};
