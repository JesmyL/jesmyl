import Modal from 'front/complect/modal/Modal/Modal';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { useState } from 'react';
import { ScheduleWidgetAppAttCustomized } from 'shared/api';
import { IconArrowRight01StrokeRounded } from '../../../../complect/the-icon/icons/arrow-right-01';
import { IconAttachment02StrokeRounded } from '../../../../complect/the-icon/icons/attachment-02';
import { IconPlusSignStrokeRounded } from '../../../../complect/the-icon/icons/plus-sign';
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
        Icon={IconAttachment02StrokeRounded}
        postfix={
          <>
            Шаблоны вложений
            <IconArrowRight01StrokeRounded />
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
              <EvaSendButton
                Icon={IconPlusSignStrokeRounded}
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
