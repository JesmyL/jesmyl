import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { mylib } from '#shared/lib/my-lib';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { TheButton } from '#shared/ui/TheButton';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { atom } from 'atomaric';
import { useState } from 'react';
import { IScheduleWidgetWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { CmMeetingEventEditsHistoryStatisticModalInner } from './EventEditsHistoryStatisticModal';

const isOpenStatisticAtom = atom(false);

export const CmMeetingEventEditsHistoryModalInner = ({ dayi, schw }: { dayi: number; schw: IScheduleWidgetWid }) => {
  const [limit, setLimit] = useState(10);
  const [historyPacks, isLoading, error, setHistoryPacks] = useInvocatedValue(
    null,
    async ({ aborter }) => {
      if (mylib.isNaN(schw) || mylib.isNaN(dayi)) return null;
      return cmEditComExternalsClientTsjrpcMethods.getScheduleEventHistory({ schw, dayi }, { aborter });
    },
    [schw, dayi],
  );

  if (mylib.isNaN(schw) || mylib.isNaN(dayi)) return null;

  if (isLoading)
    return (
      <ModalBody>
        <div className="flex center full-size margin-gap">{isLoading}</div>
      </ModalBody>
    );

  if (historyPacks == null || error)
    return (
      <ModalBody>
        <div className="flex center full-size color--ko">{error ? `${error}` : 'Ошибка'}</div>
      </ModalBody>
    );

  const itemTitleTimeOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  } as const;

  return (
    <>
      <ModalHeader className="flex justify-between">
        <span>История {historyPacks.length > limit ? `${limit}/${historyPacks.length}` : historyPacks.length}</span>
        <TheIconButton
          icon="TradeUp"
          onClick={isOpenStatisticAtom.do.toggle}
        />
      </ModalHeader>
      <ModalBody>
        {historyPacks.slice(0, limit).map(pack => {
          return (
            <div key={pack.w}>
              <h3 className="flex flex-gap full-width between">
                {new Date(pack.w).toLocaleString('ru', itemTitleTimeOptions)}

                <TheIconSendButton
                  icon="Delete02"
                  className="color--ko"
                  confirm="Удалить эту запись?"
                  onSend={async () => {
                    const packs = await cmEditComExternalsClientTsjrpcMethods.removeScheduleEventHistoryItem({
                      schw,
                      dayi,
                      writedAt: pack.w,
                    });

                    setHistoryPacks(packs);
                  }}
                />
              </h3>
              {pack.fio && (
                <div>
                  Обновил: <span className="color--7">{pack.fio}</span>
                </div>
              )}
              <ComFaceList
                list={pack.s}
                importantOnClick={emptyFunc}
              />
            </div>
          );
        })}
        {historyPacks.length > limit && (
          <div className="flex center full-width">
            <TheButton onClick={() => setLimit(lim => lim + 10)}>Показать ещё</TheButton>
          </div>
        )}
      </ModalBody>
      <Modal openAtom={isOpenStatisticAtom}>
        <CmMeetingEventEditsHistoryStatisticModalInner
          dayi={dayi}
          schw={schw}
        />
      </Modal>
    </>
  );
};
