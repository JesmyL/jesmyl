import { appNames, AppsRoutingAppConfigDict } from '#shared/model/App.model';
import BrutalItem from '#shared/ui/brutal-item/BrutalItem';
import BrutalScreen from '#shared/ui/brutal-screen/BrutalScreen';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { FullContent } from '#widgets/fullscreen-content/FullContent';
import { useState } from 'react';
import { itNNull } from 'shared/utils';
import ScheduleWidgetAlarm from '../../04-widgets/schedule/alarm/Alarm';
import PhaseContainerConfigurer from '../../07-shared/ui/phase-container/PhaseContainerConfigurer';
import { useAuth, useCurrentApp } from '../../components/index/atoms';
import IndexAbout from '../../components/index/parts/IndexAbout';
import { IndexTelegramInlineAuthButton } from '../../components/index/parts/login/IndexTelegramInlineAuthButton';
import { AppFace } from '../../components/index/parts/main/AppFace';
import { IndexProfileInfo } from '../../components/index/parts/main/ProfileInfo';
import useConnectionState from '../../components/index/useConnectionState';
import { checkIsThereNewSW } from '../../serviceWorkerRegistration';

export default function IndexOtherPage({ routingApps }: { routingApps: AppsRoutingAppConfigDict }) {
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

          <div className="margin-gap-h pointer flex flex-gap">{auth.login && <IndexProfileInfo auth={auth} />}</div>
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
  );
}
