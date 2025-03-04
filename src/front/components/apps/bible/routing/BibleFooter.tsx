import AppFooter from '../../../../app/AppFooter';
import AppFooterItem from '../../../../app/AppFooterItem';

export const BibleFooter = () => {
  return (
    <AppFooter>
      <AppFooterItem
        idPostfix="main"
        to="i"
        title="Глава"
        icon="File02"
      />
      <AppFooterItem
        idPostfix="search"
        to="search"
        title="Поиск"
        icon="FileSearch"
      />
      <AppFooterItem
        idPostfix="tran"
        to="tran"
        title="Трансляция"
        icon="Computer"
      />
    </AppFooter>
  );
};
