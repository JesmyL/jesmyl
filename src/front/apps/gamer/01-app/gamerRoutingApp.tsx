import { translateBase } from '#basis/locale';
import { RoutingAppConfig } from '$app/lib/configs';
import { GamerFooter } from '$gamer/entities/Footer';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const gamerRoutingApp: RoutingAppConfig = {
  appName: 'gamer',
  title: () => translateBase(BaseLocaleKey.GamerTitle),
  footer: <GamerFooter />,
  icon: 'GameController03',
};
