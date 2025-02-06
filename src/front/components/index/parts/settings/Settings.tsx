import { MyLib } from 'front/utils';
import React, { Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { itIt } from 'shared/utils';
import BrutalItem from '../../../../complect/brutal-item/BrutalItem';
import { FontFamilySelector } from '../../../../complect/configurators/selectors/FontFamilySelector';
import PhaseContainerConfigurer from '../../../../complect/phase-container/PhaseContainerConfigurer';
import IconCheckbox from '../../../../complect/the-icon/IconCheckbox';
import { IconKeyboardStrokeRounded } from '../../../../complect/the-icon/icons/keyboard';
import { IconPaintBoardStrokeRounded } from '../../../../complect/the-icon/icons/paint-board';
import { IconRssErrorStrokeRounded } from '../../../../complect/the-icon/icons/rss-error';
import { IconSourceCodeCircleStrokeRounded } from '../../../../complect/the-icon/icons/source-code-circle';
import { IconTextStrokeRounded } from '../../../../complect/the-icon/icons/text';
import { useAppFontFamily, useAuth } from '../../atoms';
import { indexSimpleValIsPlayAnimations, indexSimpleValIsUseNativeKeyboard } from '../../complect/index.simpleValues';
import useConnectionState from '../../useConnectionState';

const IndexConsole = React.lazy(() => import('./Console'));

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

export default function IndexSettings() {
  const auth = useAuth();
  const [appFontFamily, setAppFontFamily] = useAppFontFamily();
  const connectionNode = useConnectionState('margin-gap');

  const settingsList = [
    auth.level === 100 && (
      <Link to="console">
        <BrutalItem
          icon={<IconSourceCodeCircleStrokeRounded />}
          title="Консоль"
        />
      </Link>
    ),
    <BrutalItem
      icon={<IconKeyboardStrokeRounded />}
      title="Фирменная клавиатура"
      onClick={indexSimpleValIsUseNativeKeyboard.switch}
      box={
        <IconCheckbox
          simpleValuer={indexSimpleValIsUseNativeKeyboard}
          negativeValue
        />
      }
    />,
    <BrutalItem
      icon={<IconPaintBoardStrokeRounded />}
      title="Анимации"
      onClick={indexSimpleValIsPlayAnimations.switch}
      box={<IconCheckbox simpleValuer={indexSimpleValIsPlayAnimations} />}
    />,
    <BrutalItem
      icon={<IconTextStrokeRounded />}
      title="Шрифт"
      box={
        <FontFamilySelector
          fontFamily={appFontFamily}
          onSelect={setAppFontFamily}
        />
      }
    />,
    <BrutalItem
      icon={<IconRssErrorStrokeRounded />}
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
    <Routes>
      <Route
        index
        element={
          <PhaseContainerConfigurer
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
        }
      />

      <Route
        path="console"
        element={
          <Suspense>
            <IndexConsole />
          </Suspense>
        }
      />
    </Routes>
  );
}
