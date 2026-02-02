import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';
import { indexIsShowPlayerInFooterAtom } from '$index/shared/state';
import { useAtomValue } from 'atomaric';

export const CmFooter = () => {
  const isShowPlayer = useAtomValue(indexIsShowPlayerInFooterAtom);
  const checkAccess = useCheckUserAccessRightsInScope();

  return (
    <AppFooter appName="cm">
      {() => [
        <AppFooterItem
          key="all"
          idPostfix="cm-all"
          to="/cm/i/"
          title="Все"
          icon="LeftToRightListBullet"
        />,

        <AppFooterItem
          key="lists"
          idPostfix="cm-lists"
          to="/cm/li/"
          title="Списки"
          icon="Playlist01"
        />,

        isShowPlayer && (
          <AppFooterItem
            key="player"
            idPostfix="cm-player"
            to="/cm/player/"
            title="Плеер"
            icon="PlayListFavourite02"
          />
        ),

        checkAccess('cm', 'EDIT') && (
          <AppFooterItem
            key="edit"
            idPostfix="cm-edit"
            to="/cm/edit/"
            title="Админ"
            icon="Edit02"
          />
        ),
      ]}
    </AppFooter>
  );
};
