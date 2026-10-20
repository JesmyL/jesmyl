import { translateBase } from '#basis/locale';
import { RoutingAppConfig } from '$app/lib/configs';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { BibleFooter } from './BibleFooter';

export const bibleRoutingApp: RoutingAppConfig = {
  appName: 'bible',
  title: () => translateBase(BaseLocaleKey.Bible),
  footer: <BibleFooter />,
  icon: 'Book02',
};
