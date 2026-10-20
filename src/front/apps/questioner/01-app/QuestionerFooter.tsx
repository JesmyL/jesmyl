import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const QuestionerFooter = () => {
  const checkAccessRights = useCheckUserAccessRightsInScope();

  return (
    <AppFooter appName="q">
      {() => [
        <AppFooterItem
          key="answers"
          idPostfix="answers"
          to="/q/i"
          title={translateBase(BaseLocaleKey.QuestionerAnswer)}
          icon="BubbleChat"
        />,
        checkAccessRights('q', 'EDIT', 'U') && (
          <AppFooterItem
            key="redactor"
            idPostfix="redactor"
            to="/q/r/"
            title={translateBase(BaseLocaleKey.QuestionerEditor)}
            icon="MessageEdit01"
          />
        ),
        checkAccessRights('q', 'EDIT') && (
          <AppFooterItem
            key="answers"
            idPostfix="answers"
            to="/q/a/"
            title={translateBase(BaseLocaleKey.QuestionerReview)}
            icon="MessageUser01"
          />
        ),
      ]}
    </AppFooter>
  );
};
