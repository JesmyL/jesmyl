import {
  CmLineCommentConstructorButtonPropKey,
  CmLineCommentConstructorButtonRulePropsDict,
} from '$cm/shared/model/com-comment';
import { CmLineCommentConstructorButtonAccentKindRedactor } from './AccentKindRedactor';
import { CmLineCommentConstructorButtonTextRedactor } from './TextRedactor';

export const CmLineCommentConstructorButtonTextWithAccentRedactor = <
  Key extends CmLineCommentConstructorButtonPropKey,
>(props: {
  blockKey: Key;
  label: React.ReactNode;
  blockPropsHolder: { dict?: CmLineCommentConstructorButtonRulePropsDict };
  getDefaultPropsDict: () => CmLineCommentConstructorButtonRulePropsDict[Key];
  disabled?: boolean;
}) => {
  return (
    <div className="mt-5">
      <CmLineCommentConstructorButtonTextRedactor {...props} />
      <CmLineCommentConstructorButtonAccentKindRedactor {...props} />
    </div>
  );
};
