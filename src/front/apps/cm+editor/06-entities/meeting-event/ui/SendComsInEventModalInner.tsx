import { mylib } from '#shared/lib/my-lib';
import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComFaceList, CmComMoveSelectedButton, useCmComSelectedList } from '$cm/ext';
import { useAuth } from '$index/shared/state';
import { Atom } from 'atomaric';
import { emptyFunc } from 'shared/utils';
import { CmEditorMeetingEventEditProps } from '../model/model';

export const CmEditorMeetingEventSendComsModalInner = ({
  dayi,
  eventMi,
  schw,
  openAtom,
  packComws,
}: CmEditorMeetingEventEditProps & { openAtom: Atom<boolean> }) => {
  const selectedComws = useCmComSelectedList().selectedComws;
  const fio = useAuth().fio;

  if (fio == null) return;

  return (
    <>
      <ModalHeader>Отправка песен в событие</ModalHeader>
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
          disabled={mylib.isEq(selectedComws, packComws)}
          disabledReason="Этот список уже загружен"
          onSuccess={openAtom.reset}
          onSend={() =>
            cmEditComExternalsClientTsjrpcMethods.setInScheduleEvent({
              schw,
              dayi,
              eventMi,
              list: selectedComws,
              fio,
            })
          }
        />
      </ModalFooter>
    </>
  );
};
