import AppFooter from '#app/ui/AppFooter';
import AppFooterItem from '#app/ui/AppFooterItem';
import { mylib } from 'front/utils';
import { useActualCcomw } from '../../../../components/apps/cm/col/com/useCcom';
import { useAuth } from '../../../../components/index/atoms';

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
