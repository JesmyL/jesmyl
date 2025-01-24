import { useLiveQuery } from 'dexie-react-hooks';
import { useAuth } from 'front/components/index/atoms';
import { indexIDB } from 'front/components/index/db/index-idb';
import { Route, Routes } from 'react-router-dom';
import PhaseContainerConfigurer from '../../../../../complect/phase-container/PhaseContainerConfigurer';
import { cmIDB } from '../../_db/cm-idb';
import { CmComListContext } from '../../base/translations/context';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { useComs } from '../../cols/useCols';
import { cmCompositionRoute } from '../../routing/cmRoutingApp';
import { SendMySelectedsButton } from './SendMySelectedsButton';
import { useMeetingPathParts } from './useMeetingPathParts';

export default function TheMeetingsEvent() {
  const { dayi, eventMi, schw } = useMeetingPathParts();
  const schedule = useLiveQuery(() => indexIDB.db.schs.get(schw), [schw]);
  const typei = schedule?.days[dayi].list.find(event => event.mi === eventMi)?.type ?? -1;
  const pack = useLiveQuery(() => cmIDB.db.scheduleComPacks.get({ schw }), [schw]);
  const packComws = pack?.pack?.[dayi as never]?.[eventMi as never] ?? [];
  const coms = useComs(packComws);
  const auth = useAuth();

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseContainerConfigurer
            className="meeting-container"
            headTitle={schedule ? `${schedule.title} - ${schedule.types[typei]?.title ?? ''}` : 'Событие'}
            head={auth.level < 50 || <SendMySelectedsButton packComws={packComws} />}
            content={<ComFaceList list={coms} />}
          />
        }
      />

      {cmCompositionRoute(children => (
        <CmComListContext.Provider value={{ list: coms }}>{children}</CmComListContext.Provider>
      ))}
    </Routes>
  );
}
