import { useAppNameContext } from '#basis/lib/contexts';
import { appNames } from '#basis/model/App.model';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { BrutalScreen } from '#shared/ui/brutal-screen/BrutalScreen';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ScheduleWidgetAlarm } from '#widgets/schedule/alarm/Alarm';
import { routingApps } from '$app/lib/configs';
import { useAuth } from '$index/atoms';
import { IndexAbout } from '$index/parts/IndexAbout';
import { IndexTelegramInlineAuthButton } from '$index/parts/auth/IndexTelegramInlineAuthButton';
import { AppFace } from '$index/parts/main/AppFace';
import { IndexProfileInfo } from '$index/parts/main/ProfileInfo';
import { useConnectionState } from '$index/useConnectionState';
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
        <AppFace
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
        <div className="flex flex-gap">
          {connectionStateNode}

          <div className="margin-gap-h pointer flex flex-gap">{auth.login && <IndexProfileInfo auth={auth} />}</div>
        </div>
      }
      contentClass="flex column padding-gap"
      content={
        <>
          <ScheduleWidgetAlarm isForceShow={auth.level >= 50} />
          {!auth.nick && <IndexTelegramInlineAuthButton />}
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
            onClick={isAboutOpenAtom.toggle}
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
