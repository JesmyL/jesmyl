import { appNames } from '#basis/model/App.model';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { BrutalScreen } from '#shared/ui/brutal-screen/BrutalScreen';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { PhaseContainerConfigurer } from '#shared/ui/phase-container/PhaseContainerConfigurer';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ScheduleWidgetAlarm } from '#widgets/schedule/alarm/Alarm';
import { scheduleWidgetListPageRoute } from '#widgets/schedule/general/ListPageRoute';
import { routingApps } from 'front/app/routing-apps';
import { checkIsThereNewSW } from 'front/serviceWorkerRegistration';
import React, { Suspense, useEffect, useState } from 'react';
import { itNNull } from 'shared/utils';
import { jversion } from 'shared/values';

import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { indexBasicsSokiInvocatorClient } from '@index/db/invocators/schedules/fresh-invocator.methods';
import { Route, Routes } from 'react-router-dom';
import { useAuth, useCurrentApp } from '../../atoms';
import { useConnectionState, useIsOnline } from '../../useConnectionState';
import { IndexActions } from '../actions/Actions';
import { IndexAbout } from '../IndexAbout';
import { IndexTelegramInlineAuthButton } from '../login/IndexTelegramInlineAuthButton';
import { IndexSettings } from '../settings/Settings';
import { AppFace } from './AppFace';
import { IndexProfileInfo } from './ProfileInfo';

const IndexAuthorization = React.lazy(() => import('../login/IndexAuthorization'));

export function IndexMain() {
  const currentAppName = useCurrentApp();

  const [newVersion, isVersionLoading] = useInvocatedValue(
    0,
    aborter => indexBasicsSokiInvocatorClient.getFreshAppVersion({ aborter }),
    [],
  );

  const [cacheNames, setCacheNames] = useState<string[]>([]);
  const [isAboutOpen, setIsAboutOpen] = useState<unknown>(false);
  const [isRefreshProcess, setIsRefreshProcess] = useState(false);
  const isOnline = useIsOnline();

  useEffect(() => {
    (async () => {
      const cacheNames = await caches.keys();
      setCacheNames(cacheNames);
    })();
  }, []);

  const auth = useAuth();
  const connectionStateNode = useConnectionState();
  const appList = appNames
    .map(appName => {
      const config = routingApps[appName];
      if (currentAppName === appName || appName === 'index') return null;

      if (config == null || auth == null) return null;

      return (
        <AppFace
          key={appName}
          config={config}
        />
      );
    })
    .filter(itNNull);

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
                  {connectionStateNode}

                  <div className="margin-gap-h pointer flex flex-gap">
                    {auth.login && <IndexProfileInfo auth={auth} />}
                  </div>
                </div>
              }
              contentClass="flex column padding-gap"
              content={
                <>
                  <ScheduleWidgetAlarm isForceShow={auth.level >= 50} />
                  {!auth.nick && <IndexTelegramInlineAuthButton />}
                  <BrutalItem
                    iconNode={<LazyIcon icon="Settings02" />}
                    title="Настройки"
                    to="settings"
                  />
                  <BrutalItem
                    to="./actions"
                    iconNode={<LazyIcon icon="ComputerSettings" />}
                    title="Взаимодействие"
                  />
                  <BrutalItem
                    iconNode={<LazyIcon icon="InformationCircle" />}
                    title="О приложении"
                    onClick={setIsAboutOpen}
                    box={
                      isOnline ? (
                        isRefreshProcess || isVersionLoading ? (
                          <TheIconLoading />
                        ) : (
                          !cacheNames.length ||
                          newVersion === jversion.num || (
                            <LazyIcon
                              icon="Refresh"
                              onClick={event => {
                                event.stopPropagation();
                                setIsRefreshProcess(true);

                                const clearCache = async () => {
                                  try {
                                    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
                                    window.location.reload();
                                  } catch (_error) {
                                    //
                                  }

                                  setIsRefreshProcess(false);
                                };

                                checkIsThereNewSW(reg => {
                                  reg?.waiting?.postMessage({ type: 'SKIP_WAITING' });
                                  setTimeout(clearCache, 1000);
                                }, clearCache);
                              }}
                            />
                          )
                        )
                      ) : (
                        connectionStateNode
                      )
                    }
                  />

                  {!appList.length || (
                    <BrutalScreen>
                      <div className="title">Другие программы</div>
                      {appList}
                    </BrutalScreen>
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

      {scheduleWidgetListPageRoute}
    </Routes>
  );
}
