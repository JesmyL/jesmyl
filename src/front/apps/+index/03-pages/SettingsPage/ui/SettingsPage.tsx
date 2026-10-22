import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { useConnectionState } from '#basis/lib/useConnectionState';
import { translateBase } from '#basis/locale';
import { useAppNameContext } from '#basis/state/contexts';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { authIDB, indexIDB, indexIsPlayAnimationsAtom, indexIsShowPlayerInFooterAtom } from '$index/shared/state';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { itIt } from 'shared/utils';
import { forEachObjectEntries, objectKeys } from 'shared/utils/object.utils';
import { MyFilesFontFamilySelector } from 'x/my-files';
import { IndexSettingsBindEmail } from './BindEmail';
import { IndexSettingsColorGamut } from './ColorGamutSettings';

const styles = {
  position: 'absolute',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  background: 'black',
  zIndex: '1000000',
  overflowY: 'auto',
  height: '100dvh',
  display: null,
};

export function IndexSettingsPage() {
  const appName = useAppNameContext();
  const [fontFamilyFileId, setFontFamilyFileId] = indexIDB.use.appFontFamilyId();
  const connectionNode = useConnectionState('m-2');
  const checkAccess = useCheckUserAccessRightsInScope();
  const token = authIDB.useValue.token();

  const settingsList = [
    checkAccess('general', 'ALL') && [
      <Link
        key="consol.e"
        to="/!other/$appName/settings/console"
        params={{ appName }}
      >
        <BrutalItem
          iconNode={<LazyIcon icon="SourceCodeCircle" />}
          title={translateBase(BaseLocaleKey.IndexConsole)}
        />
      </Link>,

      <Link
        key="access-rights"
        to="/!other/$appName/settings/rights"
        params={{ appName }}
      >
        <BrutalItem
          iconNode={<LazyIcon icon="UserGroup" />}
          title={translateBase(BaseLocaleKey.AccessRights)}
        />
      </Link>,

      <Link
        key="noun-prons"
        to="/!other/$appName/settings/noun_prons"
        params={{ appName }}
      >
        <BrutalItem
          iconNode={<LazyIcon icon="TextFont" />}
          title={translateBase(BaseLocaleKey.IndexNounPronounRedact)}
        />
      </Link>,

      <Link
        key="const"
        to="/!other/$appName/settings/constant"
        params={{ appName }}
      >
        <BrutalItem
          iconNode={
            <LazyIcon
              icon="RightToLeftListTriangle"
              kind="TwotoneRounded"
            />
          }
          title={translateBase(BaseLocaleKey.Constants)}
          idPostfix="constants"
        />
      </Link>,
    ],
    <BrutalItem
      key="show-player"
      iconNode={<LazyIcon icon="PlayListFavourite02" />}
      title={translateBase(BaseLocaleKey.CmShowPlayer)}
      onClick={indexIsShowPlayerInFooterAtom.do.toggle}
      box={<IconCheckbox valueAtom={indexIsShowPlayerInFooterAtom} />}
    />,
    <BrutalItem
      key="animations"
      iconNode={<LazyIcon icon="PaintBoard" />}
      title={translateBase(BaseLocaleKey.Animations)}
      onClick={indexIsPlayAnimationsAtom.do.toggle}
      box={<IconCheckbox valueAtom={indexIsPlayAnimationsAtom} />}
    />,
    <BrutalItem
      key="fonts"
      iconNode={<LazyIcon icon="Text" />}
      title={translateBase(BaseLocaleKey.Font)}
      box={
        <MyFilesFontFamilySelector
          fileId={fontFamilyFileId}
          onSelect={setFontFamilyFileId}
        />
      }
    />,
    <IndexSettingsColorGamut key="color-gamut" />,
    <BrutalItem
      key="errors"
      iconNode={<LazyIcon icon="RssError" />}
      title={translateBase(BaseLocaleKey.ShowErrors)}
      onClick={() => {
        const container = document.getElementById('error-log-list');

        if (container == null) return;

        forEachObjectEntries(styles, (key, val) => (container.style[key] = val!));

        container.onclick = () => {
          objectKeys(styles).forEach(key => (container.style[key] = null!));
          container.style.display = 'none';
        };
      }}
    />,
    !token || <IndexSettingsBindEmail key="bind-email" />,
  ]
    .flat()
    .filter(itIt);

  return (
    <PageContainerConfigurer
      className="index-settings"
      headTitle={translateBase(BaseLocaleKey.Settings)}
      head={connectionNode}
      content={
        <>
          {settingsList.length ? (
            settingsList.map((button, buttoni) => {
              return <React.Fragment key={buttoni}>{button}</React.Fragment>;
            })
          ) : (
            <div className="text-center">{translateBase(BaseLocaleKey.ChapterEmpty)}</div>
          )}
        </>
      }
    />
  );
}
