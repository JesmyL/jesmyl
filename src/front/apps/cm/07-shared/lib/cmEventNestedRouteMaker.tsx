import { isTouchDevice } from '#shared/lib/device-differences';
import { ScheduleDayEventPathProps } from '#widgets/schedule/ScheduleWidget.model';
import { CmBroadcastFullscreen } from '$cm/entities/broadcast';
import { CmComOpenRouteProps } from '$cm/entities/com';
import { CmMeetingEvent, useCmMeetingComwList } from '$cm/entities/meeting';
import { CmScheduleWidgetBroadcast } from '$cm/widgets/schedule-widget-broadcast';
import { FileRoutesByPath, useParams, useSearch } from '@tanstack/react-router';
import { CmComWid, ScheduleWidgetWid } from 'shared/api';
import { extractNumber } from 'shared/utils';
import { checkIsFunction, checkIsNotNil } from 'shared/utils/checkIs';
import { makeCmComNestedRoute } from './cmComNestedRouteMaker';

interface Props<Path extends keyof FileRoutesByPath> {
  path: Path;
  RouteComponent: () => React.ReactNode;
  useComwListPack?: () => CmComWid[];
}

type Search = ScheduleDayEventPathProps & CmComOpenRouteProps;

export const makeCmEventNestedRoute = <Path extends keyof FileRoutesByPath>(props: Props<Path>) => {
  const EventRouteComponent = () => {
    const { schw: paramSchw } = useParams({ from: props.path }) as SValRecord<{ schw?: ScheduleWidgetWid }>;
    const { dayi, eventMi, schw = paramSchw } = useSearch({ from: props.path }) as ScheduleDayEventPathProps;

    return (
      <>
        {checkIsNotNil(schw) && checkIsNotNil(dayi) ? (
          <CmMeetingEvent
            dayi={dayi}
            eventMi={eventMi}
            schw={extractNumber(schw)}
          />
        ) : (
          <props.RouteComponent />
        )}
      </>
    );
  };

  function useComwListPack() {
    const { dayi, eventMi, schw } = useSearch({ from: props.path }) as Search;
    return useCmMeetingComwList({ schw, dayi, eventMi }).s;
  }

  const comRoute = makeCmComNestedRoute({
    path: props.path,
    RouteComponent: EventRouteComponent,
    useComwList: props.useComwListPack ?? useComwListPack,
    isIgnoreSearch: true,
    BroadcastComponent: () => {
      const { schw: paramSchw } = useParams({ from: props.path }) as { schw?: `${ScheduleWidgetWid}` };
      const { schw = paramSchw } = useSearch({ from: props.path }) as Search;

      return isTouchDevice ? <CmBroadcastFullscreen /> : <CmScheduleWidgetBroadcast schw={extractNumber(schw!)} />;
    },
  });

  return {
    EventRouteComponent,
    ...comRoute,
    validateSearch: (search: PRecord<string, unknown>): Partial<ScheduleDayEventPathProps> & CmComOpenRouteProps => {
      return {
        ...(checkIsFunction(comRoute?.validateSearch) ? comRoute.validateSearch(search) : {}),
        schw: isNaN(+search.schw!) ? undefined : (+search.schw! as never),
        dayi: isNaN(+search.dayi!) ? undefined : (+search.dayi! as never),
        eventMi: isNaN(+search.eventMi!) ? undefined : (+search.eventMi! as never),
      };
    },
  };
};
