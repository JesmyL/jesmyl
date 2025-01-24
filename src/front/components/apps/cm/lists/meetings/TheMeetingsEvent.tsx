import { useLiveQuery } from 'dexie-react-hooks';
import { IconComputerStrokeRounded } from 'front/complect/the-icon/icons/computer';
import { useAuth } from 'front/components/index/atoms';
import { IndexScheduleWidgetTranslations } from 'front/components/index/complect/translations/LiveTranslations';
import { indexIDB } from 'front/components/index/db/index-idb';
import { Link, Route, Routes } from 'react-router-dom';
import PhaseContainerConfigurer from '../../../../../complect/phase-container/PhaseContainerConfigurer';
import { CmComListContext } from '../../base/translations/context';
import { cmCompositionRoute } from '../../routing/cmRoutingApp';
import { SendMySelectedsButton } from './SendMySelectedsButton';
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
  const typei = schedule?.days[scopeProps.dayi].list.find(event => event.mi === scopeProps.eventMi)?.type ?? -1;
  const auth = useAuth();

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseContainerConfigurer
            className="meeting-container"
            headTitle={schedule ? `${schedule.title} - ${schedule.types[typei]?.title ?? ''}` : 'Событие'}
            head={
              <>
                <Link to="tran">
                  <IconComputerStrokeRounded className="margin-gap-v" />
                </Link>
                {auth.level < 50 || <SendMySelectedsButton packComws={packComws} />}
              </>
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
