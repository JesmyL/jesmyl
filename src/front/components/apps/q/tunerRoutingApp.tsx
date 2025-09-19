import { RoutingAppConfig } from '$app/lib/configs';
import { QuestionerFooter } from './01-app/QuestionerFooter';

export const questionerRoutingApp: RoutingAppConfig = {
  appName: 'q',
  title: 'Вопросник',
  footer: <QuestionerFooter />,
  icon: 'MessageQuestion',
};
