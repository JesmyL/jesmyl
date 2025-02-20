import { isMobileDevice } from '#shared/lib/device-detections';
import { LazyIcon } from '#shared/ui/icon';
import { PageContainer } from '#shared/ui/PageContainer';
import { useLiveQuery } from 'dexie-react-hooks';
import { useAuth } from 'front/components/index/atoms';
import { IndexScheduleWidgetTranslations } from 'front/components/index/complect/translations/LiveTranslations';
import { indexIDB } from 'front/components/index/db/index-idb';
import { ScheduleWidgetWatchLiveTranslationButton } from 'front/widgets/schedule-widget/live-translations/WatchLiveButton';
import { Link, Route, Routes } from 'react-router-dom';
import { CmComListContext } from '../../basis/lib/com-list-contexts/context';
import { cmCompositionRoute } from '../../routing/cmRoutingApp';
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
          <PageContainer
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
