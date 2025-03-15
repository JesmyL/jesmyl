import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';
import { useAuth } from '$index/atoms';

export const CmFooter = () => {
  const auth = useAuth();

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
      {auth.level >= 50 && (
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
