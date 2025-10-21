import { mylib } from '#shared/lib/my-lib';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ScheduleDayEventPathProps } from '#widgets/schedule/ScheduleWidget.model';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComFaceList, CmComMoveSelectedButton, useCmComSelectedList } from '$cm/ext';
import { useAuth } from '$index/atoms';
import { atom } from 'atomaric';
import { CmComWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { CmEditorMeetingEventEditsHistoryModalInner } from './EventEditsHistoryModal';

const isOpenHistoryModalAtom = atom(false);
const isOpenSendModalAtom = atom(false);

export const CmEditorMeetingEventEdits = ({
  packComws,
  dayi,
  eventMi,
  schw,
}: { packComws: CmComWid[] } & Required<ScheduleDayEventPathProps>) => {
  const auth = useAuth();
  const { selectedComs, selectedComws } = useCmComSelectedList();

  if (auth.fio == null || mylib.isNaN(schw) || mylib.isNaN(dayi) || mylib.isNaN(eventMi)) return null;
  const fio = auth.fio;

  return (
    <>
      {!selectedComs.length || mylib.isEq(selectedComws, packComws) || (
        <TheIconButton
          icon="Sent"
          onClick={isOpenSendModalAtom.do.toggle}
        />
      )}

      <TheIconButton
        icon="WorkHistory"
        onClick={isOpenHistoryModalAtom.do.toggle}
      />

      <Modal openAtom={isOpenHistoryModalAtom}>
        <CmEditorMeetingEventEditsHistoryModalInner
          dayi={dayi}
          schw={schw}
        />
      </Modal>

      <Modal openAtom={isOpenSendModalAtom}>
        <ModalHeader>Отправить в это событие песни:</ModalHeader>
        <ModalBody>
          <CmComFaceList
            list={selectedComws}
            importantOnClick={emptyFunc}
            comDescription={(_, comi) => <CmComMoveSelectedButton comi={comi} />}
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
