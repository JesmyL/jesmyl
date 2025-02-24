import { addAbortControlledPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheButton } from '#shared/ui/TheButton';
import { ComFaceList } from '@cm/col/com/face/list/ComFaceList';
import { cmComExternalsClientInvocatorMethods } from '@cm/editor/cm-editor-invocator.methods';
import { useEffect, useState } from 'react';
import { ScheduleComPackHistoryItem } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { useMeetingPathParts } from './useMeetingPathParts';

export const CmMeetingEventEditsHistoryModalInner = () => {
  const { dayi, schw } = useMeetingPathParts();
  const [historyPacks, setHistoryPacks] = useState<ScheduleComPackHistoryItem[] | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (mylib.isNaN(schw) || mylib.isNaN(dayi)) return;

    return hookEffectPipe()
      .pipe(
        addAbortControlledPipe(async aborter => {
          try {
            const packs = await cmComExternalsClientInvocatorMethods.getScheduleEventHistory({ aborter }, schw, dayi);

            setHistoryPacks(packs);
          } catch (error) {
            if (aborter.signal.aborted) return;
            setError('' + error);
          }

          setIsLoading(false);
        }),
      )
      .effect();
  }, [dayi, schw]);

  if (mylib.isNaN(schw) || mylib.isNaN(dayi)) return null;

  if (isLoading)
    return (
      <ModalBody>
        <div className="flex center full-size">
          <TheIconLoading />
        </div>
      </ModalBody>
    );

  if (historyPacks == null || error)
    return (
      <ModalBody>
        <div className="flex center full-size color--ko">{error || 'Ошибка'}</div>
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
