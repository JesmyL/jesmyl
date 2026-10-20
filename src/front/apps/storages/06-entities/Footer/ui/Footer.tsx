import { translateBase } from '#basis/locale';
import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const StoragesFooter = () => {
  return (
    <AppFooter appName="storages">
      {() => [
        <AppFooterItem
          key="main"
          idPostfix="main"
          to="/storages/i/"
          title={translateBase(BaseLocaleKey.StoragesTitle)}
          icon="Database"
        />,
      ]}
    </AppFooter>
  );
};
