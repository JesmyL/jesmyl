import React, { Suspense, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { appNames } from '../../../../app/App.model';
import { routingApps } from '../../../../app/routing-apps';
import { BottomPopup } from '../../../../complect/absolute-popup/bottom-popup/BottomPopup';
import BrutalItem from '../../../../complect/brutal-item/BrutalItem';
import BrutalScreen from '../../../../complect/brutal-screen/BrutalScreen';
import { FullContent } from '../../../../complect/fullscreen-content/FullContent';
import PhaseContainerConfigurer from '../../../../complect/phase-container/PhaseContainerConfigurer';
import ScheduleWidgetAlarm from '../../../../complect/schedule-widget/alarm/Alarm';
import { scheduleWidgetListPageRoute } from '../../../../complect/schedule-widget/general/ListPageRoute';
import { IconCloudStrokeRounded } from '../../../../complect/the-icon/icons/cloud';
import { IconInformationCircleStrokeRounded } from '../../../../complect/the-icon/icons/information-circle';
import { IconRefreshStrokeRounded } from '../../../../complect/the-icon/icons/refresh';
import { IconSettings02StrokeRounded } from '../../../../complect/the-icon/icons/settings-02';
import { IconWechatStrokeRounded } from '../../../../complect/the-icon/icons/wechat';
import { checkIsThereNewSW } from '../../../../serviceWorkerRegistration';
import { useAuth, useCurrentApp } from '../../molecules';
import useConnectionState from '../../useConnectionState';
import IndexActions from '../actions/Actions';
import IndexAdvertisingPage from '../advertising/Page';
import IndexAbout from '../IndexAbout';
import { IndexTelegramInlineAuthButton } from '../login/IndexTelegramInlineAuthButton';
import IndexSettings from '../settings/Settings';
import { AppFace } from './AppFace';
import { IndexProfileInfo } from './ProfileInfo';
import { IndexSecretChates } from './secret-chat/SecretChates';
import { UserMore } from './UserMore';

const IndexAuthorization = React.lazy(() => import('../login/IndexAuthorization'));

const isNNull = (it: unknown) => it !== null;

export default function IndexMain() {
  const currentAppName = useCurrentApp();

  const [isUserMoreOpen, setIsUserMoreOpen] = useState<unknown>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<unknown>(false);

  const auth = useAuth();
  const connectionNode = useConnectionState();
  const appList = appNames
    .map(appName => {
      const config = routingApps[appName];
      if (currentAppName === appName || appName === 'index') return null;

      if (config == null || auth == null) return null!;

      return (
        <AppFace
          key={appName}
          config={config}
        />
      );
    })
    .filter(isNNull);

  return (
    <Routes>
      <Route
        index
        element={
          <>
            <PhaseContainerConfigurer
              className="relative"
              withoutBackButton
              headTitle={(currentAppName && routingApps[currentAppName]?.title) || 'Другое'}
              head={
                <div className="flex flex-gap">
                  {connectionNode}

                  <div className="margin-gap-h pointer flex flex-gap">
                    {auth.level > 0 && (
                      <IndexProfileInfo
                        auth={auth}
                        onClick={setIsUserMoreOpen}
                      />
                    )}
                    <Link to="secrets">
                      <IconWechatStrokeRounded />
                    </Link>
                  </div>
                </div>
              }
              contentClass="flex column"
              content={
                <>
                  <ScheduleWidgetAlarm isForceShow={auth.level >= 50} />
                  {!auth.nick && <IndexTelegramInlineAuthButton />}
                  <Link
                    to="settings"
                    className="full-width"
                  >
                    <BrutalItem
                      icon={<IconSettings02StrokeRounded />}
                      title="Настройки"
                    />
                  </Link>
                  <Link
                    to="advertising"
                    className="full-width"
                  >
                    <BrutalItem
                      icon={<IconCloudStrokeRounded />}
                      title="Посмотреть стороннюю рекламу"
                    />
                  </Link>
                  <BrutalItem
                    icon={<IconInformationCircleStrokeRounded />}
                    title="О приложении"
                    onClick={setIsAboutOpen}
                  />
                  {checkIsThereNewSW(reg => (
                    <BrutalItem
                      icon={<IconRefreshStrokeRounded />}
                      title="Обновить"
                      onClick={() => {
                        navigator.serviceWorker.addEventListener('controllerchange', () => {
                          window.location.reload();
                        });

                        reg?.waiting?.postMessage({ type: 'SKIP_WAITING' });
                      }}
                    />
                  ))}
                  {!appList.length || (
                    <BrutalScreen>
                      <div className="title">Другие программы</div>
                      {appList}
                    </BrutalScreen>
                  )}

                  {isUserMoreOpen && (
                    <BottomPopup onClose={setIsUserMoreOpen}>
                      <UserMore />
                    </BottomPopup>
                  )}

                  {isAboutOpen && (
                    <FullContent
                      onClose={setIsAboutOpen}
                      closable
                    >
                      <IndexAbout />
                    </FullContent>
                  )}
                </>
              }
            />

            {currentAppName && routingApps[currentAppName]?.footer}
          </>
        }
      />

      <Route
        path="actions/*"
        element={<IndexActions />}
      />

      <Route
        path="login/*"
        element={
          <Suspense>
            <IndexAuthorization />
          </Suspense>
        }
      />

      <Route
        path="settings/*"
        element={<IndexSettings />}
      />

      <Route
        path="secrets/*"
        element={<IndexSecretChates />}
      />

      <Route
        path="advertising"
        element={<IndexAdvertisingPage />}
      />

      {scheduleWidgetListPageRoute}
    </Routes>
  );
}

// (function clicker() {
//   document.querySelector('[data-testid="campaign-card-add-adunit"]')?.click();
//   setTimeout(() => {
//     document.querySelector('[data-testid="ContextRtbFooter.Create"]')?.click();
//     setTimeout(() => {
//       document.querySelector('[data-testid="ContextRtbFooter.Done"]')?.click();
//       setTimeout(clicker, 2000);
//     }, 3000);
//   }, 3000);
// })();
