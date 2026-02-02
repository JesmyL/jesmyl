import { isMobileDevice } from '#shared/lib/device-differences';
import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';

export const BibleFooter = () => {
  return (
    <AppFooter appName="bible">
      {() => [
        <AppFooterItem
          key="main"
          idPostfix="main"
          to="/bible/i"
          title="Глава"
          icon="File02"
        />,
        <AppFooterItem
          key="search"
          idPostfix="search"
          to="/bible/search"
          title="Поиск"
          icon="FileSearch"
        />,

        isMobileDevice || (
          <AppFooterItem
            key="tran"
            idPostfix="tran"
            to="/bible/tran"
            title="Трансляция"
            icon="Computer"
          />
        ),
      ]}
    </AppFooter>
  );
};
