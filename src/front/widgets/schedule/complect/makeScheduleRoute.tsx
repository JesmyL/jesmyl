import { appAttsStore } from '#basis/lib/appScheduleAttrsStorage';
import { ScheduleDayEventAttachmentScopeProps, ScheduleWidgetWidDef } from 'shared/api';
import { checkIsNaN } from 'shared/utils/checkIs';
import { ScheduleSingleAlarmDay } from '../alarm/SingleAlarmDay';
import { ScheduleWidgetPage } from '../pages/ScheduleWidgetPage';
import { ScheduleCurrentSchwContext } from './lib/contexts';

export const makeScheduleRoute = (
  getRoute: () => {
    useSearch: () => Partial<ScheduleDayEventAttachmentScopeProps & { isOpenSingleDay: true }>;
  },
  RouteComponent: () => React.ReactNode,
) => {
  const AttRouteComponent = () => {
    const search = getRoute().useSearch();
    const AttRoute = appAttsStore[search.attKey as never]?.ExtRoute;

    if (search.isOpenSingleDay && search.schw != null) {
      return (
        <ScheduleSingleAlarmDay
          dayi={search.dayi}
          schw={search.schw}
        />
      );
    }

    if (search.dayi != null && search.attKey != null && search.eventMi != null)
      if (AttRoute)
        return (
          <AttRoute
            attKey={search.attKey}
            dayi={search.dayi}
            eventMi={search.eventMi}
            schw={search.schw ?? ScheduleWidgetWidDef}
          />
        );

    if (search.schw != null)
      return (
        <ScheduleCurrentSchwContext value={search.schw}>
          <ScheduleWidgetPage />
        </ScheduleCurrentSchwContext>
      );

    return <RouteComponent />;
  };

  return {
    component: AttRouteComponent,
    validateSearch: (
      search: Record<string, unknown>,
    ): Partial<ScheduleDayEventAttachmentScopeProps & { isOpenSingleDay: true }> => {
      return {
        dayi: checkIsNaN(+search.dayi!) ? undefined : (+search.dayi! as never),
        schw: checkIsNaN(+search.schw!) ? undefined : (+search.schw! as never),
        eventMi: checkIsNaN(+search.eventMi!) ? undefined : (+search.eventMi! as never),
        attKey: `${search.attKey}`.includes(']:') ? (`${search.attKey}` as never) : undefined,
        isOpenSingleDay: search.isOpenSingleDay ? true : undefined,
      };
    },
  };
};
