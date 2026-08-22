import { Modal } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { WithAtom } from '#shared/ui/WithAtom';
import { cmComSelectedComwsAtom } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { CmEditorMeetingEventEditProps } from '../model/model';
import { CmEditorMeetingEventEditsHistoryModalInner } from './EventEditsHistoryModal';
import { CmEditorMeetingEventSendComsModalInner } from './SendComsInEventModalInner';

export const CmEditorMeetingEventEdits = (props: Required<CmEditorMeetingEventEditProps>) => {
  const selectedComws = useAtomValue(cmComSelectedComwsAtom);

  return (
    <>
      {!selectedComws.length || checkIsEq(selectedComws, props.comws) || (
        <WithAtom init={false}>
          {isOpenSendModalAtom => (
            <>
              <BottomPopupItem
                icon="Sent"
                title="Отправить выбранные песни"
                onClick={isOpenSendModalAtom.do.toggle}
              />
              <Modal openAtom={isOpenSendModalAtom}>
                <CmEditorMeetingEventSendComsModalInner
                  {...props}
                  openAtom={isOpenSendModalAtom}
                />
              </Modal>
            </>
          )}
        </WithAtom>
      )}

      <WithAtom init={false}>
        {isOpenHistoryModalAtom => (
          <>
            <BottomPopupItem
              title="История дня"
              icon="WorkHistory"
              onClick={isOpenHistoryModalAtom.do.toggle}
            />

            <Modal openAtom={isOpenHistoryModalAtom}>
              <CmEditorMeetingEventEditsHistoryModalInner
                dayi={props.dayi}
                schw={props.schw}
              />
            </Modal>
          </>
        )}
      </WithAtom>
    </>
  );
};
