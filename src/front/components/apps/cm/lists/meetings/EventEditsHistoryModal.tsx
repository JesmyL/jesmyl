import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { mylib } from '#shared/lib/my-lib';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheButton } from '#shared/ui/TheButton';
import { cmComExternalsClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { useState } from 'react';
import { IScheduleWidgetWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';

export const CmMeetingEventEditsHistoryModalInner = ({ dayi, schw }: { dayi: number; schw: IScheduleWidgetWid }) => {
  const [limit, setLimit] = useState(10);
  const [historyPacks, isLoading, error, setHistoryPacks] = useInvocatedValue(
    null,
    async ({ aborter }) => {
      if (mylib.isNaN(schw) || mylib.isNaN(dayi)) return null;
      return cmComExternalsClientInvocatorMethods.getScheduleEventHistory({ aborter }, schw, dayi);
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
      <ModalHeader>
        История {historyPacks.length > limit ? `${limit}/${historyPacks.length}` : historyPacks.length}
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
                    const packs = await cmComExternalsClientInvocatorMethods.removeScheduleEventHistoryItem(
                      null,
                      schw,
                      dayi,
                      pack.w,
                    );

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
    </>
  );
};
