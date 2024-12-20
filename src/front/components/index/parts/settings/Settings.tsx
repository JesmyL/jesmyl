import { MyLib, mylib } from 'front/utils';
import React, { Suspense, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { itIt } from 'shared/utils';
import { AppName, appNames } from '../../../../app/App.model';
import { routingApps } from '../../../../app/routing-apps';
import { useAtomValue } from '../../../../complect/atoms';
import BrutalItem from '../../../../complect/brutal-item/BrutalItem';
import PhaseContainerConfigurer from '../../../../complect/phase-container/PhaseContainerConfigurer';
import IconButton from '../../../../complect/the-icon/IconButton';
import IconCheckbox from '../../../../complect/the-icon/IconCheckbox';
import { IconArrowDownDoubleStrokeRounded } from '../../../../complect/the-icon/icons/arrow-down-double';
import { IconArrowUpDoubleStrokeRounded } from '../../../../complect/the-icon/icons/arrow-up-double';
import { IconKeyboardStrokeRounded } from '../../../../complect/the-icon/icons/keyboard';
import { IconPaintBoardStrokeRounded } from '../../../../complect/the-icon/icons/paint-board';
import { IconRssErrorStrokeRounded } from '../../../../complect/the-icon/icons/rss-error';
import { IconSourceCodeCircleStrokeRounded } from '../../../../complect/the-icon/icons/source-code-circle';
import { IconTextStrokeRounded } from '../../../../complect/the-icon/icons/text';
import { soki } from '../../../../soki';
import { indexSimpleValIsPlayAnimations, indexSimpleValIsUseNativeKeyboard } from '../../complect/index.simpleValues';
import { indexMolecule, useAppFontFamilyAtom, useAuth } from '../../molecules';
import useConnectionState from '../../useConnectionState';
import { FontFamilySelector } from '../actions/files/complect/FontFamilySelector';
import { Visitor } from './Visitor';
import { Visits } from './Visits';

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

const visitorsDeclension = (num: number) => `${num} ${mylib.declension(num, 'челикс', 'челикса', 'челиксов')}`;
const statisticAtom = indexMolecule.select(s => s.statistic);

export default function IndexSettings() {
  const auth = useAuth();
  const statistic = useAtomValue(statisticAtom);
  const [expands, setExpands] = useState<(AppName | '')[]>([]);
  const [appFontFamily, setAppFontFamily] = useAppFontFamilyAtom();
  const connectionNode = useConnectionState('margin-gap');
  // const [isShowSecretChatsInBottom, setIsShowSecretChatsInBottom] = useAtom(isSecretChatsShowInBottomMenuAtom);

  useEffect(() => {
    soki.send({ subscribe: 'statistic' }, 'index');
    return () => {
      soki.send({ unsubscribe: 'statistic' }, 'index');
    };
  }, []);

  const settingsList = [
    auth.level === 100 && (
      <Link to="console">
        <BrutalItem
          icon={<IconSourceCodeCircleStrokeRounded />}
          title="Консоль"
        />
      </Link>
    ),
    // <BrutalItem
    //   icon={<SecretChatsIcon />}
    //   title="Секретные чаты в нижнем меню"
    //   box={
    //     <IconCheckbox
    //       checked={isShowSecretChatsInBottom}
    //       onChange={setIsShowSecretChatsInBottom}
    //     />
    //   }
    // />,
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
                {auth && (
                  <>
                    <h2>Статистика:</h2>
                    {statistic ? (
                      <>
                        <div className="margin-gap-v">
                          <div>
                            <span className="color--7">В сети</span> {visitorsDeclension(statistic.online)}
                          </div>
                          <div>
                            <span className="color--7">Авторизованых </span>
                            {statistic.authed ? visitorsDeclension(statistic.authed) : ' нет'}
                          </div>
                          <div className="flex flex-gap">
                            <span className="color--7">Посещений за день </span>
                            {statistic.visits.length ? statistic.visits.length : ' нет'}
                            {(auth.level >= 80 || expands.includes('')) && (
                              <IconButton
                                Icon={
                                  expands.includes('')
                                    ? IconArrowUpDoubleStrokeRounded
                                    : IconArrowDownDoubleStrokeRounded
                                }
                                onClick={() =>
                                  setExpands(
                                    expands.includes('') ? expands.filter(name => name !== '') : [...expands, ''],
                                  )
                                }
                              />
                            )}
                          </div>
                        </div>
                        {expands.includes('') && <Visits statistic={statistic} />}
                        {appNames.map(appName => {
                          const app = routingApps[appName];
                          if (appName === 'index' || app === undefined || app.level > auth.level) return null;
                          const visitorCount = statistic.usages[appName]?.length || 0;

                          return (
                            <div key={appName}>
                              <div className="flex flex-gap">
                                В "{app?.title}"
                                {visitorCount ? (
                                  <span className="color--7">{visitorsDeclension(visitorCount)}</span>
                                ) : (
                                  <span className="color--3">Никого</span>
                                )}
                                {((!!visitorCount && auth.level >= 80) || expands.includes(appName)) && (
                                  <IconButton
                                    Icon={
                                      expands.includes(appName)
                                        ? IconArrowUpDoubleStrokeRounded
                                        : IconArrowDownDoubleStrokeRounded
                                    }
                                    onClick={() =>
                                      setExpands(
                                        expands.includes(appName)
                                          ? expands.filter(name => name !== appName)
                                          : [...expands, appName],
                                      )
                                    }
                                  />
                                )}
                              </div>
                              <div className="margin-big-gap-l">
                                {expands.includes(appName) &&
                                  statistic.usages[appName]?.map((usage, usagei) => (
                                    <Visitor
                                      key={usagei}
                                      visitor={usage}
                                    />
                                  ))}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      'Нет данных'
                    )}
                  </>
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
