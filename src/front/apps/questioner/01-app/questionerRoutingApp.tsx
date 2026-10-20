import { translateBase } from '#basis/locale';
import { RoutingAppConfig } from '$app/lib/configs';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { QuestionerFooter } from './QuestionerFooter';

export const questionerRoutingApp: RoutingAppConfig = {
  appName: 'q',
  title: () => translateBase(BaseLocaleKey.QuestionerTitle),
  footer: <QuestionerFooter />,
  icon: 'MessageQuestion',
};
