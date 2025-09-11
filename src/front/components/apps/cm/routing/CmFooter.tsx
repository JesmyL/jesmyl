import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';
import { indexIsShowPlayerInFooterAtom, useAuth } from '$index/atoms';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { useAtomValue } from 'atomaric';

export const CmFooter = () => {
  const auth = useAuth();
  const isShowPlayer = useAtomValue(indexIsShowPlayerInFooterAtom);
  const checkAccess = useCheckUserAccessRightsInScope();

  return (
    <AppFooter appName="cm">
      <AppFooterItem
        idPostfix="cm-all"
        to="/cm/i/"
        title="Все"
        icon="LeftToRightListBullet"
      />
      <AppFooterItem
        idPostfix="cm-lists"
        to="/cm/li/"
        title="Списки"
        icon="Playlist01"
      />
      {isShowPlayer && auth.level >= 3 && (
        <AppFooterItem
          idPostfix="cm-player"
          to="/cm/player/"
          title="Плеер"
          icon="PlayListFavourite02"
        />
      )}

      {checkAccess('cm', 'EDIT') && (
        <AppFooterItem
          idPostfix="cm-edit"
          to="/cm/edit/"
          title="Редактор"
          icon="Edit02"
        />
      )}
    </AppFooter>
  );
};
