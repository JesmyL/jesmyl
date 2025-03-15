import { mylib } from '#shared/lib/my-lib';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ScheduleDayEventPathProps } from '#widgets/schedule/ScheduleWidget.model';
import { useSelectedComs } from '$cm/base/useSelectedComs';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { cmComExternalsClientInvocatorMethods } from '$cm/editor/lib/cm-editor-invocator.methods';
import { MoveSelectedComButton } from '$cm/entities/MoveSelectedComButton';
import { useAuth } from '$index/atoms';
import { useState } from 'react';
import { CmComWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { CmMeetingEventEditsHistoryModalInner } from './EventEditsHistoryModal';

export const CmMeetingEventEdits = ({
  packComws,
  dayi,
  eventMi,
  schw,
}: { packComws: CmComWid[] } & Required<ScheduleDayEventPathProps>) => {
  const auth = useAuth();
  const { selectedComs, selectedComws } = useSelectedComs();
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState<unknown>(false);
  const [isOpenSendModal, setIsOpenSendModal] = useState<unknown>(false);

  if (auth.fio == null || mylib.isNaN(schw) || mylib.isNaN(dayi) || mylib.isNaN(eventMi)) return null;
  const fio = auth.fio;

  return (
    <>
      {!selectedComs.length || mylib.isEq(selectedComws, packComws) || (
        <TheIconButton
          icon="Sent"
          onClick={setIsOpenSendModal}
        />
      )}

      <TheIconButton
        icon="WorkHistory"
        onClick={setIsOpenHistoryModal}
      />

      {isOpenHistoryModal && (
        <Modal onClose={setIsOpenHistoryModal}>
          <CmMeetingEventEditsHistoryModalInner
            dayi={dayi}
            schw={schw}
          />
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
            <TheIconSendButton
              icon="Sent"
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
