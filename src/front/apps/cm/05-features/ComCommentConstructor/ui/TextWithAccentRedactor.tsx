import {
  CmComCommentConstructorPropKey,
  CmComCommentConstructorRuleKindByPropsType,
  CmComCommentConstructorRulePropsDict,
} from 'shared/model/cm/com-comment';
import { CmComCommentConstructorAccentKindRedactor } from './AccentKindRedactor';
import { CmComCommentConstructorTextRedactor } from './TextRedactor';

export const CmComCommentConstructorTextWithAccentRedactor = <
  Key extends CmComCommentConstructorPropKey,
  PropsType extends CmComCommentConstructorRulePropsDict[Key],
>(props: {
  blockKey: Key;
  label: React.ReactNode;
  kind: CmComCommentConstructorRuleKindByPropsType<PropsType>;
  blockPropsHolder: { dict?: CmComCommentConstructorRulePropsDict };
  getDefaultPropsDict: () => PropsType;
  disabled?: boolean;
  multiline?: boolean;
}) => {
  return (
    <div className="mt-5">
      <CmComCommentConstructorTextRedactor {...props} />
      <CmComCommentConstructorAccentKindRedactor {...props} />
    </div>
  );
};
