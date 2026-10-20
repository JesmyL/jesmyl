import { translateBase } from '#basis/locale';
import { isMobileDevice } from '#shared/lib/device-differences';
import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const BibleFooter = () => {
  return (
    <AppFooter appName="bible">
      {() => [
        <AppFooterItem
          key="main"
          idPostfix="main"
          to="/bible/i"
          title={translateBase(BaseLocaleKey.BibleChapter)}
          icon="File02"
        />,
        <AppFooterItem
          key="search"
          idPostfix="search"
          to="/bible/search"
          title={translateBase(BaseLocaleKey.Search)}
          icon="FileSearch"
        />,

        isMobileDevice || (
          <AppFooterItem
            key="tran"
            idPostfix="tran"
            to="/bible/tran"
            title={translateBase(BaseLocaleKey.Broadcast)}
            icon="Computer"
          />
        ),
      ]}
    </AppFooter>
  );
};
