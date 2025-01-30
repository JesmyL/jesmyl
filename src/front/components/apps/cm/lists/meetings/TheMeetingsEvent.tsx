import { useLiveQuery } from 'dexie-react-hooks';
import { isMobileDevice } from 'front/complect/device-differences';
import { ScheduleWidgetWatchLiveTranslationButton } from 'front/complect/schedule-widget/live-translations/WatchLiveButton';
import { IconComputerStrokeRounded } from 'front/complect/the-icon/icons/computer';
import { useAuth } from 'front/components/index/atoms';
import { IndexScheduleWidgetTranslations } from 'front/components/index/complect/translations/LiveTranslations';
import { indexIDB } from 'front/components/index/db/index-idb';
import { Link, Route, Routes } from 'react-router-dom';
import PhaseContainerConfigurer from '../../../../../complect/phase-container/PhaseContainerConfigurer';
import { CmComListContext } from '../../base/translations/context';
import { cmCompositionRoute } from '../../routing/cmRoutingApp';
import { CmMeetingEventEdits } from './EventEdits';
import useMeetingComFaceList from './useMeetingComFaceList';
import { useMeetingPathParts } from './useMeetingPathParts';

export default function TheMeetingsEvent() {
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
                ) : (
                  <Link to="tran">
                    <IconComputerStrokeRounded className="margin-gap-v" />
                  </Link>
                )}
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
