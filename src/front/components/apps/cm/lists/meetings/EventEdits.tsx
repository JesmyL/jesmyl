import Modal from 'front/complect/modal/Modal/Modal';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalFooter } from 'front/complect/modal/Modal/ModalFooter';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { IconSentStrokeRounded } from 'front/complect/the-icon/icons/sent';
import { IconWorkHistoryStrokeRounded } from 'front/complect/the-icon/icons/work-history';
import { useAuth } from 'front/components/index/atoms';
import { mylib } from 'front/utils';
import { useState } from 'react';
import { CmComWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import useSelectedComs from '../../base/useSelectedComs';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { cmComExternalsClientInvocatorMethods } from '../../editor/cm-editor-invocator.methods';
import { MoveSelectedComButton } from '../selected-coms/MoveSelectedComButton';
import { CmMeetingEventEditsHistoryModal } from './EventEditsHistoryModal';
import { useMeetingPathParts } from './useMeetingPathParts';

export const CmMeetingEventEdits = ({ packComws }: { packComws: CmComWid[] }) => {
  const auth = useAuth();
  const { selectedComs, selectedComws } = useSelectedComs();
  const { dayi, eventMi, schw } = useMeetingPathParts();
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState<unknown>(false);
  const [isOpenSendModal, setIsOpenSendModal] = useState<unknown>(false);

  if (auth.fio == null || mylib.isNaN(schw) || mylib.isNaN(dayi) || mylib.isNaN(eventMi)) return null;
  const fio = auth.fio;

  return (
    <>
      {!selectedComs.length || mylib.isEq(selectedComws, packComws) || (
        <IconSentStrokeRounded onClick={setIsOpenSendModal} />
      )}

      <IconWorkHistoryStrokeRounded onClick={setIsOpenHistoryModal} />

      {isOpenHistoryModal && <CmMeetingEventEditsHistoryModal onClose={setIsOpenHistoryModal} />}

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
                cmComExternalsClientInvocatorMethods.setInScheduleEvent(null, schw, dayi, eventMi, selectedComws, fio)
              }
              onSuccess={() => setIsOpenSendModal(false)}
            />
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};
