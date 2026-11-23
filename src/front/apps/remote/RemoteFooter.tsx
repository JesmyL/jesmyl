import { translateBase } from '#basis/locale';
import { resetRemoteManualApp, setRemoteManualApp } from '#features/broadcast/remote/app-switch-intent';
import { AppFooter } from '$app/AppFooter';
import { AppFooterItem } from '$app/AppFooterItem';
import { useEffect } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

const handleItemNavigate = (to: string) => {
  if (to.startsWith('/remote/cm')) setRemoteManualApp('cm');
  else if (to.startsWith('/remote/bible')) setRemoteManualApp('bible');
};

export const RemoteFooter = ({ isOtherHidden }: { isOtherHidden?: boolean }) => {
  useEffect(() => resetRemoteManualApp, []);

  return (
    <AppFooter
      appName="remote"
      onItemNavigate={handleItemNavigate}
      isOtherHidden={isOtherHidden}
    >
      {() => [
        <AppFooterItem
          key="cm"
          idPostfix="cm"
          to="/remote/cm"
          title={translateBase(BaseLocaleKey.CmComs)}
          icon="MusicNote01"
        />,
        <AppFooterItem
          key="bible"
          idPostfix="bible"
          to="/remote/bible"
          title={translateBase(BaseLocaleKey.Bible)}
          icon="Book02"
        />,
      ]}
    </AppFooter>
  );
};
