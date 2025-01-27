import Modal from 'front/complect/modal/Modal/Modal';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalFooter } from 'front/complect/modal/Modal/ModalFooter';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
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
import { MoveSelectedComButton } from '../selected-coms/MoveSelectedComButton';
import { useMeetingPathParts } from './useMeetingPathParts';

export const SendMySelectedsButton = ({ packComws }: { packComws: CmComWid[] }) => {
  const { selectedComs, selectedComws } = useSelectedComs();
  const { dayi, eventMi, schw } = useMeetingPathParts();
  const [historyPacks, setHistoryPacks] = useState<ScheduleComPackHistoryItem[] | null>(null);
  const [isOpenSendModal, setIsOpenSendModal] = useState<unknown>(false);

  if (mylib.isNaN(schw) || mylib.isNaN(dayi) || mylib.isNaN(eventMi)) return null;

  return (
    <>
      {!selectedComs.length || mylib.isEq(selectedComws, packComws) || (
        <IconSentStrokeRounded onClick={setIsOpenSendModal} />
      )}

      <EvaSendButton
        Icon={IconWorkHistoryStrokeRounded}
        onSend={async () => {
          const packs = await cmComExternalsClientInvocatorMethods.getScheduleEventHistory(null, schw, dayi);
          setHistoryPacks(packs);
        }}
      />

      {historyPacks && (
        <Modal onClose={() => setHistoryPacks(null)}>
          <ModalHeader>История</ModalHeader>
          <ModalBody>
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
          </ModalBody>
        </Modal>
      )}

      {isOpenSendModal && (
        <Modal onClose={setIsOpenSendModal}>
          <ModalHeader>Отправить в это событие песни:</ModalHeader>
          <ModalBody>
            <ComFaceList
              list={selectedComws}
              importantOnClick={emptyFunc}
              comDescription={(_, comi) => <MoveSelectedComButton comi={comi} />}
            />
          </ModalBody>
          <ModalFooter>
            <EvaSendButton
              Icon={IconSentStrokeRounded}
              className="margin-gap"
              prefix="Отправить"
              onSend={() =>
                cmComExternalsClientInvocatorMethods.setInScheduleEvent(null, schw, dayi, eventMi, selectedComws)
              }
              onSuccess={() => setIsOpenSendModal(false)}
            />
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};
