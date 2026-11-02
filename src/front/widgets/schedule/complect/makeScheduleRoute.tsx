import { makeAppAttsStore } from '#basis/lib/appScheduleAttrsStorage';
import { ScheduleDayEventAttachmentScopeProps, ScheduleWidgetWidDef } from 'shared/api';
import { checkIsNaN } from 'shared/utils/checkIs';
import { ScheduleSingleAlarmDay } from '../alarm/SingleAlarmDay';

type ScheduleRouteSearch = Partial<
  ScheduleDayEventAttachmentScopeProps & { isOpenSingleDay: true; inviteHash: string }
>;

export const validateScheduleSearch = (search: Record<string, unknown>): ScheduleRouteSearch => {
  return {
    dayi: checkIsNaN(+search.dayi!) ? undefined : (+search.dayi! as never),
    schw: checkIsNaN(+search.schw!) ? undefined : (+search.schw! as never),
    eventMi: checkIsNaN(+search.eventMi!) ? undefined : (+search.eventMi! as never),
    attKey: `${search.attKey}`.includes(']:') ? (`${search.attKey}` as never) : undefined,
    inviteHash: typeof search.inviteHash === 'string' ? search.inviteHash : undefined,
    isOpenSingleDay: search.isOpenSingleDay ? true : undefined,
  };
};

export const makeScheduleRoute = (
  getRoute: () => {
    useSearch: () => ScheduleRouteSearch;
  },
  RouteComponent: () => React.ReactNode,
) => {
  const AttRouteComponent = () => {
    const search = getRoute().useSearch();
    const AttRoute = makeAppAttsStore()[search.attKey as never]?.ExtRoute;

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

    return <RouteComponent />;
  };

  return {
    component: AttRouteComponent,
    validateSearch: validateScheduleSearch,
  };
};
