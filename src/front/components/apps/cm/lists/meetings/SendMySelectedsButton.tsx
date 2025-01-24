import Modal from 'front/complect/modal/Modal/Modal';
import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { IconSentStrokeRounded } from 'front/complect/the-icon/icons/sent';
import { IconWorkHistoryStrokeRounded } from 'front/complect/the-icon/icons/work-history';
import { mylib } from 'front/utils';
import { useState } from 'react';
import { CmComWid, ScheduleComPackHistoryItem } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import useSelectedComs from '../../base/useSelectedComs';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { cmComExternalsClientInvocatorMethods } from '../../editor/cm-editor-invocator.methods';
import { useMeetingPathParts } from './useMeetingPathParts';

export const SendMySelectedsButton = ({ packComws }: { packComws: CmComWid[] }) => {
  const { selectedComs, selectedComws } = useSelectedComs();
  const { dayi, eventMi, schw } = useMeetingPathParts();
  const [historyPacks, setHistoryPacks] = useState<ScheduleComPackHistoryItem[] | null>(null);

  if (mylib.isNaN(schw) || mylib.isNaN(dayi) || mylib.isNaN(eventMi)) return null;

  return (
    <>
      {!selectedComs.length || mylib.isEq(selectedComws, packComws) || (
        <EvaSendButton
          Icon={IconSentStrokeRounded}
          className="margin-gap"
          confirm={
            <>
              <div className="margin-big-gap-b">Отправить в это событие песни:</div>
              {selectedComs.map(com => {
                return <div key={com.wid}>{com.name}</div>;
              })}
            </>
          }
          onSend={() =>
            cmComExternalsClientInvocatorMethods.setInScheduleEvent(null, schw, dayi, eventMi, selectedComws)
          }
        />
      )}

      <EvaSendButton
        Icon={IconWorkHistoryStrokeRounded}
        className="margin-gap"
        onSend={async () => {
          const packs = await cmComExternalsClientInvocatorMethods.getScheduleEventHistory(null, schw, dayi);
          setHistoryPacks(packs);
        }}
      />

      {historyPacks && (
        <Modal onClose={() => setHistoryPacks(null)}>
          {historyPacks.map(pack => {
            return (
              <div key={pack.w}>
                <h3>{new Date(pack.w).toLocaleString('ru')}</h3>
                <ComFaceList
                  list={pack.s}
                  importantOnClick={emptyFunc}
                />
              </div>
            );
          })}
        </Modal>
      )}
    </>
  );
};
