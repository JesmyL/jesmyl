import { CmComCommentConstructorPropKey, CmComCommentConstructorRulePropsDict } from 'shared/model/cm/com-comment';
import { CmComCommentConstructorAccentKindRedactor } from './AccentKindRedactor';
import { CmComCommentConstructorTextRedactor } from './TextRedactor';

export const CmComCommentConstructorTextWithAccentRedactor = <Key extends CmComCommentConstructorPropKey>(props: {
  blockKey: Key;
  label: React.ReactNode;
  blockPropsHolder: { dict?: CmComCommentConstructorRulePropsDict };
  getDefaultPropsDict: () => CmComCommentConstructorRulePropsDict[Key];
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
