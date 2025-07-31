import { useAppNameContext } from '#basis/lib/contexts';
import { MyLib } from '#shared/lib/my-lib';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { FontFamilySelector } from '#shared/ui/configurators/selectors/FontFamilySelector';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAppFontFamily, useAuth } from '$index/atoms';
import { indexIsPlayAnimationsAtom, indexIsUseNativeKeyboardAtom } from '$index/complect/index.atoms';
import { useConnectionState } from '$index/useConnectionState';
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
  const auth = useAuth();
  const appName = useAppNameContext();
  const [appFontFamily, setAppFontFamily] = useAppFontFamily();
  const connectionNode = useConnectionState('margin-gap');

  const settingsList = [
    auth.level === 100 && (
      <Link
        to="/!other/$appName/settings/console"
        params={{ appName }}
      >
        <BrutalItem
          iconNode={<LazyIcon icon="SourceCodeCircle" />}
          title="Консоль"
        />
      </Link>
    ),
    <BrutalItem
      iconNode={<LazyIcon icon="Keyboard" />}
      title="Фирменная клавиатура"
      onClick={indexIsUseNativeKeyboardAtom.toggle}
      box={
        <IconCheckbox
          valueAtom={indexIsUseNativeKeyboardAtom}
          negativeValue
        />
      }
    />,
    <BrutalItem
      iconNode={<LazyIcon icon="PaintBoard" />}
      title="Анимации"
      onClick={indexIsPlayAnimationsAtom.toggle}
      box={<IconCheckbox valueAtom={indexIsPlayAnimationsAtom} />}
    />,
    <BrutalItem
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
