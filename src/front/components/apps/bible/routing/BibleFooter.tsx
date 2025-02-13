import AppFooter from '../../../../app/AppFooter';
import AppFooterItem from '../../../../app/AppFooterItem';
import { iconPackOfComputer } from '../../../../complect/the-icon/icons/computer';
import { iconPackOfFile02 } from '../../../../complect/the-icon/icons/file-02';
import { iconPackOfFileSearch } from '../../../../complect/the-icon/icons/file-search';

export const BibleFooter = () => {
  return (
    <AppFooter>
      <AppFooterItem
        idPostfix="main"
        to="i"
        title="Глава"
        iconPack={iconPackOfFile02}
      />
      <AppFooterItem
        idPostfix="search"
        to="search"
        title="Поиск"
        iconPack={iconPackOfFileSearch}
      />
      <AppFooterItem
        idPostfix="tran"
        to="tran"
        title="Трансляция"
        iconPack={iconPackOfComputer}
      />
    </AppFooter>
  );
};
