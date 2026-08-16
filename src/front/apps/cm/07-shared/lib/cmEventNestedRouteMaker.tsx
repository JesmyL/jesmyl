import { isTouchDevice } from '#shared/lib/device-differences';
import { ScheduleDayEventPathProps } from '#widgets/schedule/ScheduleWidget.model';
import { CmBroadcastFullscreen } from '$cm/entities/broadcast';
import { CmComOpenRouteProps } from '$cm/entities/com';
import {
  CmMeetingEvent,
  CmMeetingLinkToEvent,
  CmMeetingToEventLinkRender,
  useCmMeetingComwList,
} from '$cm/entities/meeting';
import { CmScheduleWidgetBroadcast } from '$cm/widgets/schedule-widget-broadcast';
import { FileRoutesByPath, Link, useParams, useSearch } from '@tanstack/react-router';
import { CmComWid, ScheduleWidgetWid } from 'shared/api';
import { extractNumber } from 'shared/utils';
import { checkIsFunction } from 'shared/utils/checkIs';
import { makeCmComNestedRoute } from './cmComNestedRouteMaker';

interface Props<Path extends keyof FileRoutesByPath> {
  path: Path;
  RouteComponent: () => React.ReactNode;
  useComListPack?: () => CmComWid[];
}

type Search = ScheduleDayEventPathProps & CmComOpenRouteProps;

export const makeCmEventNestedRoute = <Path extends keyof FileRoutesByPath>(props: Props<Path>) => {
  const EventRouteComponent = () => {
    const { schw: paramSchw } = useParams({ from: props.path }) as { schw?: ScheduleWidgetWid };
    const { dayi, eventMi, schw = paramSchw } = useSearch({ from: props.path }) as ScheduleDayEventPathProps;

    return (
      <>
        {schw != null && dayi != null && eventMi != null ? (
          <CmMeetingEvent
            dayi={dayi}
            eventMi={eventMi}
            schw={extractNumber(schw)}
          />
        ) : (
          <CmMeetingLinkToEvent value={linkToEventRenderer}>
            <props.RouteComponent />
          </CmMeetingLinkToEvent>
        )}
      </>
    );
  };

  const linkToEventRenderer: CmMeetingToEventLinkRender = ({ children, search }) => {
    return (
      <Link
        to="."
        search={prev => ({ ...(prev as object), ...(search as object) })}
      >
        {children}
      </Link>
    );
  };

  function useComListPack() {
    const { dayi, eventMi, schw } = useSearch({ from: props.path }) as Search;
    return useCmMeetingComwList({ schw, dayi, eventMi }).s;
  }

  const comRoute = makeCmComNestedRoute({
    path: props.path,
    RouteComponent: EventRouteComponent,
    useComwList: props.useComListPack ?? useComListPack,
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
    validateSearch: (search: PRecord<string, unknown>): ScheduleDayEventPathProps & CmComOpenRouteProps => {
      return {
        ...(checkIsFunction(comRoute?.validateSearch) ? comRoute.validateSearch(search) : {}),
        schw: isNaN(+search.schw!) ? undefined : (+search.schw! as never),
        dayi: isNaN(+search.dayi!) ? undefined : (+search.dayi! as never),
        eventMi: isNaN(+search.eventMi!) ? undefined : (+search.eventMi! as never),
      };
    },
  };
};
