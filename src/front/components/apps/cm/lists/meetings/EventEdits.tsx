import TheIconSendButton from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import Modal from '#widgets/modal/Modal/Modal';
import { ModalBody } from '#widgets/modal/Modal/ModalBody';
import { ModalFooter } from '#widgets/modal/Modal/ModalFooter';
import { ModalHeader } from '#widgets/modal/Modal/ModalHeader';
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
        <LazyIcon
          icon="Sent"
          onClick={setIsOpenSendModal}
        />
      )}

      <LazyIcon
        icon="WorkHistory"
        onClick={setIsOpenHistoryModal}
      />

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
            <TheIconSendButton
              icon="Sent"
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
