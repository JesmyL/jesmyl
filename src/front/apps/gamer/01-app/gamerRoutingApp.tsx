import { RoutingAppConfig } from '$app/lib/configs';
import { GamerFooter } from '$gamer/entities/Footer';

export const gamerRoutingApp: RoutingAppConfig = {
  appName: 'gamer',
  title: 'Игрок',
  footer: <GamerFooter />,
  icon: 'GameController03',
};
