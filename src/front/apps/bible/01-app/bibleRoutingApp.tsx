import { translateBase } from '#basis/locale';
import { RoutingAppConfig } from '$app/lib/configs';
import { BibleFooter } from './BibleFooter';

export const bibleRoutingApp: RoutingAppConfig = {
  appName: 'bible',
  title: translateBase(it => it.bible.t),
  footer: <BibleFooter />,
  icon: 'Book02',
};
