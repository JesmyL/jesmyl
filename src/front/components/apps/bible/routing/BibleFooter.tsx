import { isMobileDevice } from '#shared/lib/device-differences';
import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';
import { bibleInitialInvokes } from './bible-initial-invokes';

export const BibleFooter = () => {
  return (
    <AppFooter appName="bible">
      <AppFooterItem
        idPostfix="main"
        to="/bible/i"
        title="Глава"
        icon="File02"
      />
      <AppFooterItem
        idPostfix="search"
        to="/bible/search"
        title="Поиск"
        icon="FileSearch"
      />
      {isMobileDevice || (
        <AppFooterItem
          idPostfix="tran"
          to="/bible/tran"
          title="Трансляция"
          icon="Computer"
        />
      )}
    </AppFooter>
  );
};

bibleInitialInvokes();
