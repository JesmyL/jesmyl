import {
  CmLineCommentConstructorButtonPropKey,
  CmLineCommentConstructorButtonRulePropsDict,
} from '$cm/shared/model/com-comment';
import { CmLineCommentConstructorButtonTextWithAccentRedactor } from './TextWithAccentRedactor';

export const CmLineCommentConstructorButtonBlockRedactor = <
  PreKey extends CmLineCommentConstructorButtonPropKey,
  PostKey extends CmLineCommentConstructorButtonPropKey,
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
  blockPropsHolder: { dict?: CmLineCommentConstructorButtonRulePropsDict };
  getDefaultPropsDict: (place: '<' | '>') => CmLineCommentConstructorButtonRulePropsDict[PreKey & PostKey];
}) => {
  return (
    <>
      <CmLineCommentConstructorButtonTextWithAccentRedactor
        blockKey={preKey}
        label={preLabel}
        blockPropsHolder={blockPropsHolder}
        getDefaultPropsDict={() => getDefaultPropsDict('<')}
        disabled={disabled}
      />
      <CmLineCommentConstructorButtonTextWithAccentRedactor
        blockKey={postKey}
        label={postLabel}
        blockPropsHolder={blockPropsHolder}
        getDefaultPropsDict={() => getDefaultPropsDict('>')}
        disabled={disabled}
      />
    </>
  );
};
