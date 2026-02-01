import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';

export const GamerFooter = () => {
  return (
    <AppFooter appName="gamer">
      {() => [
        <AppFooterItem
          idPostfix="main"
          key="main"
          to="/gamer/i/"
          title="Игры"
          icon="GameController03"
        />,
      ]}
    </AppFooter>
  );
};
