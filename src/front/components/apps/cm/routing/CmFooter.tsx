import { mylib } from '#shared/lib/my-lib';
import { AppFooter } from 'front/app/AppFooter';
import { AppFooterItem } from 'front/app/AppFooterItem';
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
