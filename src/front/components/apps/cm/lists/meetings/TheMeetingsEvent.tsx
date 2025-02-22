import { isMobileDevice } from '#shared/lib/device-differences';
import { PhaseContainerConfigurer } from '#shared/ui/phase-container/PhaseContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ScheduleWidgetWatchLiveTranslationButton } from '#widgets/schedule/live-translations/WatchLiveButton';
import { CmComListContext } from '@cm/base/translations/context';
import { cmCompositionRoute } from '@cm/routing/cmRoutingApp';
import { useAuth } from '@index/atoms';
import { IndexScheduleWidgetTranslations } from '@index/complect/translations/LiveTranslations';
import { indexIDB } from '@index/db/index-idb';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link, Route, Routes } from 'react-router-dom';
import { CmMeetingEventEdits } from './EventEdits';
import { useMeetingComFaceList } from './useMeetingComFaceList';
import { useMeetingPathParts } from './useMeetingPathParts';

export function TheMeetingsEvent() {
  const scopeProps = useMeetingPathParts();
  const { comFaceListNode, coms, packComws } = useMeetingComFaceList(
    scopeProps.schw,
    scopeProps.dayi,
    scopeProps.eventMi,
  );
  const schedule = useLiveQuery(() => indexIDB.db.schs.get(scopeProps.schw), [scopeProps.schw]);
  const auth = useAuth();

  if (schedule == null) return;

  const typei = schedule.days[scopeProps.dayi].list.find(event => event.mi === scopeProps.eventMi)?.type ?? -1;

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseContainerConfigurer
            className="meeting-container"
            headTitle={`${schedule.title} - ${schedule.types[typei]?.title ?? ''}`}
            head={
              <div className="flex flex-gap margin-gap-h">
                {isMobileDevice ? (
                  <ScheduleWidgetWatchLiveTranslationButton schw={schedule.w} />
                ) : auth.level ? (
                  <Link to="tran">
                    <LazyIcon
                      icon="Computer"
                      className="margin-gap-v"
                    />
                  </Link>
                ) : null}
                {auth.level < 50 || <CmMeetingEventEdits packComws={packComws} />}
              </div>
            }
            content={comFaceListNode}
          />
        }
      />

      {cmCompositionRoute(children => (
        <CmComListContext.Provider value={{ list: coms }}>{children}</CmComListContext.Provider>
      ))}

      <Route
        path="tran/*"
        element={<IndexScheduleWidgetTranslations />}
      />
    </Routes>
  );
}
