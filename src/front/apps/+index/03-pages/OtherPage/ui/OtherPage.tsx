import { useConnectionState } from '#basis/lib/useConnectionState';
import { appNames } from '#basis/model/App.model';
import { useAppNameContext } from '#basis/state/contexts';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { BrutalScreen } from '#shared/ui/brutal-screen/BrutalScreen';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ScheduleWidgetAlarm } from '#widgets/schedule/alarm/Alarm';
import { routingApps } from '$app/lib/configs';
import { IndexAppFace } from '$index/entities/AppFace/ui/AppFace';
import { IndexAuthorizeTelegramInlineAuthButton } from '$index/entities/Authorize/ui/IndexTelegramInlineAuthButton';
import { IndexProfileInfo } from '$index/entities/ProfileInfo/ui/ProfileInfo';
import { useAuth } from '$index/shared/state';
import { IndexAbout } from '$index/widgets/About/ui/IndexAbout';
import { Link } from '@tanstack/react-router';
import { atom } from 'atomaric';
import { itNNull } from 'shared/utils';

const isAboutOpenAtom = atom(false);

export const IndexOtherPage = () => {
  const currentAppName = useAppNameContext();
  const linkParams = { appName: currentAppName };

  const auth = useAuth();
  const connectionStateNode = useConnectionState();
  const appList = appNames
    .map(appName => {
      const config = routingApps[appName];
      if (currentAppName === appName || appName === 'index') return null;

      if (config == null || auth == null) return null;

      return (
        <IndexAppFace
          key={appName}
          config={config}
        />
      );
    })
    .filter(itNNull);

  return (
    <PageContainerConfigurer
      className="relative"
      withoutBackButton
      headTitle={routingApps[currentAppName]?.title || 'Другое'}
      head={
        <div className="flex gap-2">
          {connectionStateNode}

          <div className="mx-2 pointer flex gap-2">{auth.login && <IndexProfileInfo auth={auth} />}</div>
        </div>
      }
      contentClass="flex column p-2"
      content={
        <>
          <ScheduleWidgetAlarm isForceShow={auth.level >= 50} />
          {!auth.nick && <IndexAuthorizeTelegramInlineAuthButton />}
          <Link
            to="/!other/$appName/settings"
            params={linkParams}
            className="w-full"
          >
            <BrutalItem
              iconNode={<LazyIcon icon="Settings02" />}
              title="Настройки"
              idPostfix="settings"
            />
          </Link>
          <Link
            to="/!other/$appName/actions"
            params={linkParams}
            className="w-full"
          >
            <BrutalItem
              idPostfix="actions"
              iconNode={<LazyIcon icon="ComputerSettings" />}
              title="Взаимодействие"
            />
          </Link>
          <BrutalItem
            iconNode={<LazyIcon icon="InformationCircle" />}
            title="О приложении"
            onClick={isAboutOpenAtom.do.toggle}
          />

          {!appList.length || (
            <BrutalScreen>
              <div className="title">Другие программы</div>
              {appList}
            </BrutalScreen>
          )}

          <FullContent
            closable
            openAtom={isAboutOpenAtom}
          >
            <IndexAbout />
          </FullContent>
        </>
      }
    />
  );
};
