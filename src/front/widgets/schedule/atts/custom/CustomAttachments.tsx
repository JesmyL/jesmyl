import { translateBase } from '#basis/locale';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { schAttachmentTypesTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { Atom, atom } from 'atomaric';
import { ScheduleWidgetAppAttCustomized } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleWidgetCustomAtt } from './CustomAtt';

let isModalOpenAtom: Atom<boolean>;

export function ScheduleWidgetCustomAttachments(props: { tatts: ScheduleWidgetAppAttCustomized[] }) {
  isModalOpenAtom ??= atom(false);

  const scheduleScopeProps = useScheduleScopePropsContext();

  return (
    <div>
      <TheIconButton
        icon="Attachment02"
        postfix={
          <>
            {translateBase(BaseLocaleKey.ScheduleAttachmentTemplates)}
            <LazyIcon icon="ArrowRight01" />
          </>
        }
        onClick={isModalOpenAtom.do.toggle}
        className="flex-max my-2"
      />

      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader>
          <div className="flex w-full between">
            {translateBase(BaseLocaleKey.ScheduleAttachmentTemplates)}
            <TheIconSendButton
              icon="PlusSign"
              confirm={translateBase(BaseLocaleKey.ScheduleAddAttachmentTemplateConfirm)}
              disabled={props.tatts.some(att => !att.title || !att.description)}
              disabledReason={translateBase(BaseLocaleKey.ScheduleTemplatesNoName)}
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
