import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { schAttachmentTypesSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
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
        onClick={isModalOpenAtom.toggle}
        className="flex-max margin-gap-v"
      />

      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader>
          <div className="flex full-width between">
            Шаблоны вложений
            <TheIconSendButton
              icon="PlusSign"
              confirm="Создать шаблон вложения?"
              disabled={props.tatts.some(att => !att.title || !att.description)}
              disabledReason="Есть шаблоны вложений без названия или описания"
              onSend={() => schAttachmentTypesSokiInvocatorClient.create({ props: scheduleScopeProps })}
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
