import { mylib } from '#shared/lib/my-lib';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { ScheduleDayEventPathProps } from '#widgets/schedule/ScheduleWidget.model';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComFaceList, CmComMoveSelectedButton, useCmComSelectedList } from '$cm/ext';
import { useAuth } from '$index/shared/state';
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
  const fio = auth.fio;
  const selectedComws = useCmComSelectedList().selectedComws;

  if (fio == null || mylib.isNaN(schw) || mylib.isNaN(dayi) || mylib.isNaN(eventMi)) return null;

  return (
    <>
      {!selectedComws.length || mylib.isEq(selectedComws, packComws) || (
        <BottomPopupItem
          icon="Sent"
          title="Отправить выбранные песни"
          onClick={isOpenSendModalAtom.do.toggle}
        />
      )}

      <BottomPopupItem
        title="История"
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
          <List />
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

const List = () => {
  const selectedComs = useCmComSelectedList().selectedComs;

  return (
    <CmComFaceList
      list={selectedComs}
      importantOnClick={emptyFunc}
      comDescription={(_, comi) => <CmComMoveSelectedButton comi={comi} />}
    />
  );
};
