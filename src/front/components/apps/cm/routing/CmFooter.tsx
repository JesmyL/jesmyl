import AppFooter from '#app/ui/AppFooter';
import AppFooterItem from '#app/ui/AppFooterItem';
import { mylib } from 'front/utils';
import { useAuth } from '../../../index/atoms';
import { useActualCcomw } from '../col/com/useCcom';

export const CmFooter = () => {
  const auth = useAuth();
  const actualCcomw = useActualCcomw();
  const search = mylib.isNaN(actualCcomw) ? undefined : (`?comw=${actualCcomw}` as const);

  return (
    <AppFooter>
      <AppFooterItem
        idPostfix="cm-all"
        to="i"
        title="Все"
        icon="LeftToRightListBullet"
        search={search}
      />
      <AppFooterItem
        idPostfix="cm-lists"
        to="li"
        title="Списки"
        icon="Playlist01"
      />
      {auth.level >= 50 && (
        <AppFooterItem
          idPostfix="cm-edit"
          to="edit"
          title="Редактор"
          icon="Edit02"
        />
      )}
    </AppFooter>
  );
};
