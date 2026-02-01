import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';

export const QuestionerFooter = () => {
  const checkAccessRights = useCheckUserAccessRightsInScope();

  return (
    <AppFooter appName="q">
      {() => [
        <AppFooterItem
          key="answers"
          idPostfix="answers"
          to="/q/i"
          title="Ответ"
          icon="BubbleChat"
        />,
        checkAccessRights('q', 'EDIT', 'U') && (
          <AppFooterItem
            key="redactor"
            idPostfix="redactor"
            to="/q/r/"
            title="Редактор"
            icon="MessageEdit01"
          />
        ),
        checkAccessRights('q', 'EDIT') && (
          <AppFooterItem
            key="answers"
            idPostfix="answers"
            to="/q/a/"
            title="Проверка"
            icon="MessageUser01"
          />
        ),
      ]}
    </AppFooter>
  );
};
