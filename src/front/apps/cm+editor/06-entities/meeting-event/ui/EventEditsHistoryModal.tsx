import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { languageSystemCode } from '#basis/locale';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { TheButton } from '#shared/ui/TheButton';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComFaceList } from '$cm/ext';
import { Atom, atom } from 'atomaric';
import { useState } from 'react';
import { ScheduleWidgetDayi, ScheduleWidgetWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { checkIsNaN } from 'shared/utils/checkIs';
import { makeDateLabel } from 'shared/utils/makeDateLabel';
import { CmEditorMeetingEventEditsHistoryStatisticModalInner } from './EventEditsHistoryStatisticModal';

let isOpenStatisticAtom: Atom<boolean>;

export const CmEditorMeetingEventEditsHistoryModalInner = ({
  dayi,
  schw,
}: {
  dayi: ScheduleWidgetDayi;
  schw: ScheduleWidgetWid;
}) => {
  isOpenStatisticAtom ??= atom(false);

  const [limit, setLimit] = useState(10);
  const [historyPacks, isLoading, error, setHistoryPacks] = useInvocatedValue(
    null,
    async ({ aborter }) => {
      if (checkIsNaN(schw) || checkIsNaN(dayi)) return null;
      return cmEditComExternalsClientTsjrpcMethods.getSchEvHistory({ schw, dayi }, { aborter });
    },
    [schw, dayi],
  );

  if (checkIsNaN(schw) || checkIsNaN(dayi)) return null;

  if (isLoading)
    return (
      <ModalBody>
        <div className="flex center full-size m-2">{isLoading}</div>
      </ModalBody>
    );

  if (historyPacks == null || error)
    return (
      <ModalBody>
        <div className="flex center full-size text-xKO">{error ? `${error}` : 'Ошибка'}</div>
      </ModalBody>
    );

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
              <h3 className="flex gap-2 w-full between">
                {makeDateLabel(pack.w, languageSystemCode)}

                <TheIconSendButton
                  icon="Delete02"
                  className="text-xKO"
                  confirm="Удалить эту запись?"
                  onSend={async () => {
                    const { w } = await cmEditComExternalsClientTsjrpcMethods.removeSchEvHistoryItem({
                      schw,
                      dayi,
                      writedAt: pack.w,
                    });

                    setHistoryPacks(historyPacks.filter(it => it.w !== w));
                  }}
                />
              </h3>
              {pack.fio && (
                <div>
                  Обновил: <span className="text-x7">{pack.fio}</span>
                </div>
              )}
              <CmComFaceList
                list={pack.s}
                importantOnClick={emptyFunc}
              />
            </div>
          );
        })}
        {historyPacks.length > limit && (
          <div className="flex center w-full">
            <TheButton onClick={() => setLimit(lim => lim + 10)}>Показать ещё</TheButton>
          </div>
        )}
      </ModalBody>
      <Modal openAtom={isOpenStatisticAtom}>
        <CmEditorMeetingEventEditsHistoryStatisticModalInner
          dayi={dayi}
          schw={schw}
        />
      </Modal>
    </>
  );
};
