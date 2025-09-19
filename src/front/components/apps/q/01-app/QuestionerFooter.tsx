import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';

export const QuestionerFooter = () => {
  return (
    <AppFooter appName="q">
      <AppFooterItem
        idPostfix="answers"
        to="/q/i"
        title="Ответы"
        icon="BubbleChat"
      />
      <AppFooterItem
        idPostfix="redactor"
        to="/q/r/"
        title="Редактор"
        icon="MessageEdit01"
      />
    </AppFooter>
  );
};
