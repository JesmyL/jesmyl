import { appAttsStore } from '#basis/lib/appScheduleAttrsStorage';
import { mylib } from '#shared/lib/my-lib';
import { JSX } from 'react';
import { IScheduleWidgetWid, ScheduleDayEventAttachmentScopeProps } from 'shared/api';
import { ScheduleWidgetPage } from '../pages/ScheduleWidgetPage';
import { ScheduleCurrentSchwContext } from './lib/contexts';

export const makeScheduleRoute = (
  getRoute: () => {
    useSearch: () => Partial<ScheduleDayEventAttachmentScopeProps>;
  },
  RouteComponent: () => JSX.Element,
) => {
  const AttRouteComponent = () => {
    const search = getRoute().useSearch();
    const AttRoute = appAttsStore[search.attKey as never]?.ExtRoute;

    if (search.dayi != null && search.attKey != null && search.eventMi != null)
      if (AttRoute)
        return (
          <AttRoute
            attKey={search.attKey}
            dayi={search.dayi}
            eventMi={search.eventMi}
            schw={search.schw ?? IScheduleWidgetWid.def}
          />
        );

    if (search.schw != null)
      return (
        <ScheduleCurrentSchwContext.Provider value={search.schw}>
          <ScheduleWidgetPage />
        </ScheduleCurrentSchwContext.Provider>
      );

    return <RouteComponent />;
  };

  return {
    component: AttRouteComponent,
    validateSearch: (search: Record<string, unknown>): Partial<ScheduleDayEventAttachmentScopeProps> => {
      return {
        dayi: mylib.isNaN(+search.dayi!) ? undefined : +search.dayi!,
        schw: mylib.isNaN(+search.schw!) ? undefined : +search.schw!,
        eventMi: mylib.isNaN(+search.eventMi!) ? undefined : +search.eventMi!,
        attKey: `${search.attKey}`.includes(']:') ? (`${search.attKey}` as never) : undefined,
      };
    },
  };
};
