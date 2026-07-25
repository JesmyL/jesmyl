import { translateBase } from '#basis/locale';
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
          title={translateBase(it => it.bible.chapter)}
          icon="File02"
        />,
        <AppFooterItem
          key="search"
          idPostfix="search"
          to="/bible/search"
          title={translateBase(it => it.search)}
          icon="FileSearch"
        />,

        isMobileDevice || (
          <AppFooterItem
            key="tran"
            idPostfix="tran"
            to="/bible/tran"
            title={translateBase(it => it.broadcast)}
            icon="Computer"
          />
        ),
      ]}
    </AppFooter>
  );
};
