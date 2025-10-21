import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { schAttachmentTypesTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { atom } from 'atomaric';
import { ScheduleWidgetAppAttCustomized } from 'shared/api';
import { ScheduleWidgetCustomAtt } from './CustomAtt';

const isModalOpenAtom = atom(false);

export function ScheduleWidgetCustomAttachments(props: { tatts: ScheduleWidgetAppAttCustomized[] }) {
  const scheduleScopeProps = useScheduleScopePropsContext();

  return (
    <div>
      <TheIconButton
        icon="Attachment02"
        postfix={
          <>
            Шаблоны вложений
            <LazyIcon icon="ArrowRight01" />
          </>
        }
        onClick={isModalOpenAtom.do.toggle}
        className="flex-max my-2"
      />

      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader>
          <div className="flex w-full between">
            Шаблоны вложений
            <TheIconSendButton
              icon="PlusSign"
              confirm="Создать шаблон вложения?"
              disabled={props.tatts.some(att => !att.title || !att.description)}
              disabledReason="Есть шаблоны вложений без названия или описания"
              onSend={() => schAttachmentTypesTsjrpcClient.create({ props: scheduleScopeProps })}
            />
          </div>
        </ModalHeader>
        <ModalBody>
          {props.tatts.map(tatt => {
            return (
              <ScheduleWidgetCustomAtt
                key={tatt.mi}
                tatt={tatt}
              />
            );
          })}
        </ModalBody>
      </Modal>
    </div>
  );
}
