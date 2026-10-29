import { translateBase } from '#basis/locale';
import { useAppNameContext } from '#basis/state/contexts';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { Link } from '@tanstack/react-router';
import { useMemo } from 'react';
import { IScheduleWidget, ScheduleScopeProps } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleWidgetControlContent } from '../control/Control';
import { ScheduleWidgetContextWrapper } from '../general/ContextWrapper';

export function ScheduleManagePage({ schedule }: { schedule: IScheduleWidget }) {
  const appName = useAppNameContext();
  const scheduleScopeProps: ScheduleScopeProps = useMemo(() => ({ schw: schedule.w }), [schedule.w]);

  return (
    <ScheduleWidgetContextWrapper
      schedule={schedule}
      scheduleScopeProps={scheduleScopeProps}
    >
      <PageContainerConfigurer
        className="ScheduleWidgetPage"
        headTitle={translateBase(BaseLocaleKey.Control)}
        backButtonRender={(linkRef, children) => (
          <Link
            ref={linkRef}
            to="/!other/$appName/schs"
            params={{ appName }}
            search={{ schw: schedule.w }}
          >
            {children}
          </Link>
        )}
        content={
          <div className="mx-2 my-3">
            <ScheduleWidgetControlContent />
          </div>
        }
      />
    </ScheduleWidgetContextWrapper>
  );
}
