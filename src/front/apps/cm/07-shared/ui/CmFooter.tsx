import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
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
          title={translateBase(it => it.cm.li.all)}
          icon="LeftToRightListBullet"
        />,

        <AppFooterItem
          key="lists"
          idPostfix="cm-lists"
          to="/cm/li/"
          title={translateBase(it => it.cm.li.li)}
          icon="Playlist01"
        />,

        isShowPlayer && (
          <AppFooterItem
            key="player"
            idPostfix="cm-player"
            to="/cm/player/"
            title={translateBase(it => it.cm.li.player)}
            icon="PlayListFavourite02"
          />
        ),

        checkAccess('cm', 'EDIT') && (
          <AppFooterItem
            key="edit"
            idPostfix="cm-edit"
            to="/cm/edit/"
            title={translateBase(it => it.cm.li.admin)}
            icon="Edit02"
          />
        ),
      ]}
    </AppFooter>
  );
};
