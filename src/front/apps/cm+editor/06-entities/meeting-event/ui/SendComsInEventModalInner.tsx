import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComFaceList, CmComMoveSelectedButton, cmComSelectedComwsAtom } from '$cm/ext';
import { Atom, useAtomValue } from 'atomaric';
import { emptyFunc } from 'shared/utils';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { CmEditorMeetingEventEditProps } from '../model/model';

export const CmEditorMeetingEventSendComsModalInner = ({
  dayi,
  eventMi,
  schw,
  openAtom,
  comws: packComws,
}: Required<CmEditorMeetingEventEditProps> & { openAtom: Atom<boolean> }) => {
  const selectedComws = useAtomValue(cmComSelectedComwsAtom);

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
          disabled={checkIsEq(selectedComws, packComws)}
          disabledReason="Этот список уже загружен"
          onSuccess={openAtom.reset}
          onSend={() =>
            cmEditComExternalsClientTsjrpcMethods.addComwsInSchEvHistory({
              schw,
              dayi,
              eventMi,
              comws: selectedComws,
            })
          }
        />
      </ModalFooter>
    </>
  );
};
