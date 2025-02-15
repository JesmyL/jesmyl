import Modal from 'front/complect/modal/Modal/Modal';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
import TheIconSendButton from 'front/complect/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { useState } from 'react';
import { ScheduleWidgetAppAttCustomized } from 'shared/api';
import IconButton from '../../../the-icon/IconButton';
import { useScheduleScopePropsContext } from '../../complect/scope-contexts/scope-props-contexts';
import { schAttachmentTypesSokiInvocatorClient } from '../../invocators/invocators.methods';
import ScheduleWidgetCustomAtt from './CustomAtt';

export default function ScheduleWidgetCustomAttachments(props: { tatts: ScheduleWidgetAppAttCustomized[] }) {
  const [isModalOpen, setIsModalOpen] = useState<unknown>(false);
  const scheduleScopeProps = useScheduleScopePropsContext();

  return (
    <div>
      <IconButton
        icon="Attachment02"
        postfix={
          <>
            Шаблоны вложений
            <LazyIcon icon="ArrowRight01" />
          </>
        }
        onClick={setIsModalOpen}
        className="flex-max margin-gap-v"
      />

      {!isModalOpen || (
        <Modal onClose={setIsModalOpen}>
          <ModalHeader>
            <div className="flex full-width between">
              Шаблоны вложений
              <TheIconSendButton
                icon="PlusSign"
                confirm="Создать шаблон вложения?"
                disabled={props.tatts.some(att => !att.title || !att.description)}
                disabledReason="Есть шаблоны вложений без названия или описания"
                onSend={() => schAttachmentTypesSokiInvocatorClient.create(null, scheduleScopeProps)}
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
      )}
    </div>
  );
}
