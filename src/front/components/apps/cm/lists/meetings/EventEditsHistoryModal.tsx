import TheButton from 'front/complect/Button';
import Modal from 'front/complect/modal/Modal/Modal';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
import TheIconSendButton from 'front/complect/sends/the-icon-send-button/TheIconSendButton';
import { TheIconLoading } from 'front/complect/the-icon/IconLoading';
import { mylib } from 'front/utils';
import { useEffect, useState } from 'react';
import { ScheduleComPackHistoryItem } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { cmComExternalsClientInvocatorMethods } from '../../editor/cm-editor-invocator.methods';
import { useMeetingPathParts } from './useMeetingPathParts';

export const CmMeetingEventEditsHistoryModal = ({ onClose }: { onClose: (isOpen: false) => void }) => {
  const { dayi, schw } = useMeetingPathParts();
  const [historyPacks, setHistoryPacks] = useState<ScheduleComPackHistoryItem[] | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (mylib.isNaN(schw) || mylib.isNaN(dayi)) return;
    (async () => {
      try {
        const packs = await cmComExternalsClientInvocatorMethods.getScheduleEventHistory(null, schw, dayi);
        setHistoryPacks(packs);
      } catch (error) {
        setError('' + error);
      }

      setIsLoading(false);
    })();
  }, [dayi, schw]);

  if (mylib.isNaN(schw) || mylib.isNaN(dayi)) return null;

  if (isLoading)
    return (
      <Modal onClose={onClose}>
        <div className="flex center full-size">
          <TheIconLoading />
        </div>
      </Modal>
    );

  if (historyPacks == null || error)
    return (
      <Modal onClose={onClose}>
        <div className="flex center full-size color--ko">{error || 'Ошибка'}</div>
      </Modal>
    );

  const itemTitleTimeOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  } as const;

  return (
    <Modal onClose={onClose}>
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
    </Modal>
  );
};
