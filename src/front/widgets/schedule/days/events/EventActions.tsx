import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ScheduleWidgetTopicTitle } from '#widgets/schedule/complect/TopicTitle';
import { ScheduleWidgetEventType } from '#widgets/schedule/events/EventType';
import { schDaysSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/useScheduleWidget';
import { useState } from 'react';
import { IScheduleWidget, IScheduleWidgetDayEvent, ScheduleDayScopeProps } from 'shared/api';

type Props = {
  event: IScheduleWidgetDayEvent;
  schedule: IScheduleWidget;
  onEventCut: () => void;
  dayScopeProps: ScheduleDayScopeProps;
};

export function ScheduleWidgetDayEventEventActions({ schedule, event, onEventCut, dayScopeProps }: Props) {
  const [isOpenModal, setIsOpenModal] = useState<unknown>(false);
  const rights = useScheduleWidgetRightsContext();

  return (
    <>
      <TheIconButton
        icon="Shapes"
        postfix="Редактировать шаблон события"
        className="flex-max margin-gap-v"
        onClick={setIsOpenModal}
      />
      <TheIconButton
        icon="Crop"
        postfix="Вырезать событие"
        className="flex-max margin-gap-v"
        onClick={onEventCut}
      />
      {schedule.types && (
        <TheIconSendButton
          icon="Delete01"
          postfix="Удалить событие"
          confirm={
            <ScheduleWidgetTopicTitle
              prefix="Удалить событие "
              titleBox={schedule.types[event.type]}
              topicBox={event}
            />
          }
          className="flex-max color--ko margin-gap-v"
          onSend={() =>
            schDaysSokiInvocatorClient.removeEvent(
              null,
              dayScopeProps,
              event.mi,
              rights.schedule.types[event.type].title,
            )
          }
        />
      )}

      {!isOpenModal || (
        <Modal onClose={setIsOpenModal}>
          <ModalHeader>
            Шаблон события <span className="color--7">{schedule.types[event.type].title}</span>
          </ModalHeader>
          <ModalBody>
            {schedule.types[event.type] ? (
              <ScheduleWidgetEventType
                schedule={schedule}
                typeBox={schedule.types[event.type]}
                typei={event.type}
                isRedact
              />
            ) : (
              <>Шаблон не найден</>
            )}
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
