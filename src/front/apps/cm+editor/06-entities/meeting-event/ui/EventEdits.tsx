import { mylib } from '#shared/lib/my-lib';
import { Modal } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { useCmComSelectedList } from '$cm/ext';
import { Atom, atom } from 'atomaric';
import { CmEditorMeetingEventEditProps } from '../model/model';
import { CmEditorMeetingEventEditsHistoryModalInner } from './EventEditsHistoryModal';
import { CmEditorMeetingEventSendComsModalInner } from './SendComsInEventModalInner';

let isOpenHistoryModalAtom: Atom<boolean>;
let isOpenSendModalAtom: Atom<boolean>;

export const CmEditorMeetingEventEdits = (props: CmEditorMeetingEventEditProps) => {
  isOpenHistoryModalAtom ??= atom(false);
  isOpenSendModalAtom ??= atom(false);

  const selectedComws = useCmComSelectedList().selectedComws;

  return (
    <>
      {!selectedComws.length || mylib.isEq(selectedComws, props.packComws) || (
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
          dayi={props.dayi}
          schw={props.schw}
        />
      </Modal>

      <Modal openAtom={isOpenSendModalAtom}>
        <CmEditorMeetingEventSendComsModalInner
          {...props}
          openAtom={isOpenSendModalAtom}
        />
      </Modal>
    </>
  );
};
