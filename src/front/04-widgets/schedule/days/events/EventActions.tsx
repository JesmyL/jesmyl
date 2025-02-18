import { schDaysSokiInvocatorClient } from '#basis/lib/invocators/schedules/invocators.methods';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import TheIconSendButton from 'front/08-shared/ui/sends/the-icon-send-button/TheIconSendButton';
import IconButton from 'front/08-shared/ui/the-icon/IconButton';
import { useState } from 'react';
import { IScheduleWidget, IScheduleWidgetDayEvent, ScheduleDayScopeProps } from 'shared/api';
import ScheduleWidgetTopicTitle from '../../complect/TopicTitle';
import ScheduleWidgetEventType from '../../events/EventType';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';

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
      <IconButton
        icon="Shapes"
        postfix="Редактировать шаблон события"
        className="flex-max margin-gap-v"
        onClick={setIsOpenModal}
      />
      <IconButton
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
