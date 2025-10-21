import { RoutingAppConfig } from '$app/lib/configs';
import { QuestionerFooter } from './QuestionerFooter';

export const questionerRoutingApp: RoutingAppConfig = {
  appName: 'q',
  title: 'Опросник',
  footer: <QuestionerFooter />,
  icon: 'MessageQuestion',
};
