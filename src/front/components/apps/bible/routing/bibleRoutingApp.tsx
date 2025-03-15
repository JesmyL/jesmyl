import { RoutingAppConfig } from '$app/lib/configs';
import { BibleFooter } from './BibleFooter';

export const bibleRoutingApp: RoutingAppConfig = {
  appName: 'bible',
  title: 'Библия',
  footer: <BibleFooter />,
  icon: 'Book02',
};
