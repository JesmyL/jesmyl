import { isTouchDevice } from '#shared/lib/device-differences';
import { mylib } from '#shared/lib/my-lib';
import { ScheduleDayEventPathProps } from '#widgets/schedule/ScheduleWidget.model';
import { TheMeetingsEvent } from '$cm/lists/meetings/TheMeetingsEvent';
import { useMeetingComFaceList } from '$cm/lists/meetings/useMeetingComFaceList';
import { TranslationFullscreen } from '$cm/translation/complect/fullscreen/TranslationFullscreen';
import { IndexScheduleWidgetTranslations } from '$index/complect/translations/LiveTranslations';
import { FileRoutesByPath, Link, useParams, useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import { IScheduleWidgetWid } from 'shared/api';
import { CmComOpenRouteProps } from '../model/com';
import { CmMeetingToEventLinkRender } from '../model/meetings';
import { makeCmComNestedRoute } from './cmComNestedRouteMaker';
import { CmComListContextValue } from './contexts/current-com-list';
import { CmMeetingLinkToEvent } from './contexts/meeting';

interface Props<Path extends keyof FileRoutesByPath> {
  path: Path;
  RouteComponent: () => React.ReactNode;
  useComListPack?: () => CmComListContextValue;
}

type Search = ScheduleDayEventPathProps & CmComOpenRouteProps;

export const makeCmEventNestedRoute = <Path extends keyof FileRoutesByPath>(props: Props<Path>) => {
  const EventRouteComponent = () => {
    const { schw: paramSchw } = useParams({ from: props.path }) as { schw?: IScheduleWidgetWid };
    const { dayi, eventMi, schw = paramSchw } = useSearch({ from: props.path }) as ScheduleDayEventPathProps;

    return (
      <>
        {schw != null && dayi != null && eventMi != null ? (
          <TheMeetingsEvent
            dayi={dayi}
            eventMi={eventMi}
            schw={+schw}
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

  function useComListPack(): CmComListContextValue {
    const { dayi, eventMi, schw } = useSearch({ from: props.path }) as Search;
    const { coms } = useMeetingComFaceList({ schw, dayi, eventMi });

    return useMemo(() => ({ list: coms, pageTitlePostfix: '' }), [coms]);
  }

  const comRoute = makeCmComNestedRoute({
    path: props.path,
    RouteComponent: EventRouteComponent,
    useComListPack: props.useComListPack ?? useComListPack,
    TranslationComponent: () => {
      const { schw: paramSchw } = useParams({ from: props.path }) as { schw?: `${IScheduleWidgetWid}` };
      const { schw = paramSchw } = useSearch({ from: props.path }) as Search;

      return isTouchDevice ? <TranslationFullscreen /> : <IndexScheduleWidgetTranslations schw={+schw!} />;
    },
  });

  return {
    EventRouteComponent,
    ...comRoute,
    validateSearch: (search: PRecord<string, unknown>): ScheduleDayEventPathProps & CmComOpenRouteProps => {
      return {
        ...(mylib.isFunc(comRoute?.validateSearch) ? comRoute.validateSearch(search) : {}),
        schw: isNaN(+search.schw!) ? undefined : +search.schw!,
        dayi: isNaN(+search.dayi!) ? undefined : +search.dayi!,
        eventMi: isNaN(+search.eventMi!) ? undefined : +search.eventMi!,
      };
    },
  };
};
