import { translateBase } from '#basis/locale';
import { useCurrentAppSetter } from '#basis/lib/useCurrentAppSetter';
import { getAppNameFromString } from '#basis/model/App.model';
import { Button } from '#shared/components';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { Link, useLocation } from '@tanstack/react-router';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const IndexNotFoundPage = () => {
  const appName = getAppNameFromString(useLocation().pathname.split('/')[1]) ?? 'cm';
  useCurrentAppSetter(appName);

  return (
    <PageContainerConfigurer
      className=""
      withoutBackButton
      headTitle={translateBase(BaseLocaleKey.NotFound)}
      contentClass="p-2 text-xKO flex full-size center column gap-6"
      content={
        <>
          <span className="text-7xl font-bold tracking-[0.35em] opacity-30">404</span>
          <Link
            to="/!other/$appName"
            params={{ appName }}
          >
            <Button icon="Home03" />
          </Link>
        </>
      }
    />
  );
};
