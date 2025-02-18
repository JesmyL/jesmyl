import useConnectionState from '#basis/lib/hooks/+app/useConnectionState';
import { appNames, AppsRoutingAppConfigDict } from '#basis/model/App.model';
import { AppFace } from '#entities/AppFace';
import { AppProfileInfo } from '#entities/AppProfileInfo';
import { IndexTelegramInlineAuthButton } from '#entities/IndexTelegramInlineAuthButton';
import BrutalItem from '#shared/ui/brutal-item/BrutalItem';
import BrutalScreen from '#shared/ui/brutal-screen/BrutalScreen';
import { FullScreenContent } from '#shared/ui/fullscreen-content';
import PhaseContainerConfigurer from '#shared/ui/phase-container/PhaseContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ScheduleWidgetAlarm } from '#widgets/schedule/alarm/Alarm';
import { useAuth, useCurrentApp } from 'front/components/index/atoms';
import IndexAbout from 'front/components/index/parts/IndexAbout';
import { checkIsThereNewSW } from 'front/serviceWorkerRegistration';
import { useState } from 'react';
import { itNNull } from 'shared/utils';

export const IndexOtherPage = ({ routingApps }: { routingApps: AppsRoutingAppConfigDict }) => {
  const currentAppName = useCurrentApp();

  const [isAboutOpen, setIsAboutOpen] = useState<unknown>(false);

  const auth = useAuth();
  const connectionNode = useConnectionState();
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
    <PhaseContainerConfigurer
      className="relative"
      withoutBackButton
      headTitle={(currentAppName && routingApps[currentAppName]?.title) || 'Другое'}
      head={
        <div className="flex flex-gap">
          {connectionNode}

          <div className="margin-gap-h pointer flex flex-gap">{auth.login && <AppProfileInfo auth={auth} />}</div>
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
          />
          {checkIsThereNewSW(reg => (
            <BrutalItem
              iconNode={<LazyIcon icon="Refresh" />}
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

          {isAboutOpen && (
            <FullScreenContent
              onClose={setIsAboutOpen}
              closable
            >
              <IndexAbout />
            </FullScreenContent>
          )}
        </>
      }
    />
  );
};
