import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { useConnectionState } from '#basis/lib/useConnectionState';
import { useAppNameContext } from '#basis/state/contexts';
import { MyLib } from '#shared/lib/my-lib';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { FontFamilySelector } from '#shared/ui/configurators/selectors/FontFamilySelector';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { indexIsPlayAnimationsAtom, indexIsShowPlayerInFooterAtom, useAppFontFamily } from '$index/shared/state';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { itIt } from 'shared/utils';

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
  const [appFontFamily, setAppFontFamily] = useAppFontFamily();
  const connectionNode = useConnectionState('m-2');
  const checkAccess = useCheckUserAccessRightsInScope();

  const settingsList = [
    checkAccess('general', 'ALL') && (
      <Link
        key="consol.e"
        to="/!other/$appName/settings/console"
        params={{ appName }}
      >
        <BrutalItem
          iconNode={<LazyIcon icon="SourceCodeCircle" />}
          title="Консоль"
        />
      </Link>
    ),
    checkAccess('general', 'ALL') && (
      <Link
        key="access-rights"
        to="/!other/$appName/settings/rights"
        params={{ appName }}
      >
        <BrutalItem
          iconNode={<LazyIcon icon="UserGroup" />}
          title="Права доступа"
        />
      </Link>
    ),
    checkAccess('general', 'ALL') && (
      <Link
        key="noun-prons"
        to="/!other/$appName/settings/noun_prons"
        params={{ appName }}
      >
        <BrutalItem
          iconNode={<LazyIcon icon="TextFont" />}
          title="Сущ/прил редактор"
        />
      </Link>
    ),
    <BrutalItem
      key="show-player"
      iconNode={<LazyIcon icon="PlayListFavourite02" />}
      title="Показывать плеер"
      onClick={indexIsShowPlayerInFooterAtom.do.toggle}
      box={<IconCheckbox valueAtom={indexIsShowPlayerInFooterAtom} />}
    />,
    <BrutalItem
      key="animations"
      iconNode={<LazyIcon icon="PaintBoard" />}
      title="Анимации"
      onClick={indexIsPlayAnimationsAtom.do.toggle}
      box={<IconCheckbox valueAtom={indexIsPlayAnimationsAtom} />}
    />,
    <BrutalItem
      key="fonts"
      iconNode={<LazyIcon icon="Text" />}
      title="Шрифт"
      box={
        <FontFamilySelector
          fontFamily={appFontFamily}
          onSelect={setAppFontFamily}
        />
      }
    />,
    <BrutalItem
      key="errors"
      iconNode={<LazyIcon icon="RssError" />}
      title="Показать ошибки"
      onClick={() => {
        const container = document.getElementById('error-log-list');

        if (container == null) return;

        MyLib.entries(styles).forEach(([key, val]) => (container.style[key] = val!));

        container.onclick = () => {
          MyLib.keys(styles).forEach(key => (container.style[key] = null!));
          container.style.display = 'none';
        };
      }}
    />,
  ].filter(itIt);

  return (
    <PageContainerConfigurer
      className="index-settings"
      headTitle="Настройки"
      head={connectionNode}
      content={
        <>
          {settingsList.length ? (
            settingsList.map((button, buttoni) => {
              return <React.Fragment key={buttoni}>{button}</React.Fragment>;
            })
          ) : (
            <div className="text-center">Раздел пуст</div>
          )}
        </>
      }
    />
  );
}
