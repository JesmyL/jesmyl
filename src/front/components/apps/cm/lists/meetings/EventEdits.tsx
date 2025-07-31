import { mylib } from '#shared/lib/my-lib';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ScheduleDayEventPathProps } from '#widgets/schedule/ScheduleWidget.model';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { useSelectedComs } from '$cm/base/useSelectedComs';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { MoveSelectedComButton } from '$cm/entities/MoveSelectedComButton';
import { useAuth } from '$index/atoms';
import { atom } from 'atomaric';
import { CmComWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { CmMeetingEventEditsHistoryModalInner } from './EventEditsHistoryModal';

const isOpenHistoryModalAtom = atom(false);
const isOpenSendModalAtom = atom(false);

export const CmMeetingEventEdits = ({
  packComws,
  dayi,
  eventMi,
  schw,
}: { packComws: CmComWid[] } & Required<ScheduleDayEventPathProps>) => {
  const auth = useAuth();
  const { selectedComs, selectedComws } = useSelectedComs();

  if (auth.fio == null || mylib.isNaN(schw) || mylib.isNaN(dayi) || mylib.isNaN(eventMi)) return null;
  const fio = auth.fio;

  return (
    <>
      {!selectedComs.length || mylib.isEq(selectedComws, packComws) || (
        <TheIconButton
          icon="Sent"
          onClick={isOpenSendModalAtom.toggle}
        />
      )}

      <TheIconButton
        icon="WorkHistory"
        onClick={isOpenHistoryModalAtom.toggle}
      />

      <Modal openAtom={isOpenHistoryModalAtom}>
        <CmMeetingEventEditsHistoryModalInner
          dayi={dayi}
          schw={schw}
        />
      </Modal>

      <Modal openAtom={isOpenSendModalAtom}>
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
              cmEditComExternalsClientTsjrpcMethods.setInScheduleEvent({
                schw,
                dayi,
                eventMi,
                list: selectedComws,
                fio,
              })
            }
            onSuccess={isOpenSendModalAtom.reset}
          />
        </ModalFooter>
      </Modal>
    </>
  );
};
