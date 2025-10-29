import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';

export const StoragesFooter = () => {
  return (
    <AppFooter appName="storages">
      <AppFooterItem
        idPostfix="main"
        to="/storages/i/"
        title="Склад"
        icon="Database"
      />
    </AppFooter>
  );
};
