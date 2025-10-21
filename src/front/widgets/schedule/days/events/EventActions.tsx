import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ScheduleWidgetTopicTitle } from '#widgets/schedule/complect/TopicTitle';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { ScheduleWidgetEventType } from '#widgets/schedule/events/EventType';
import { schDaysTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { atom } from 'atomaric';
import { IScheduleWidget, IScheduleWidgetDayEvent, ScheduleDayScopeProps } from 'shared/api';

type Props = {
  event: IScheduleWidgetDayEvent;
  schedule: IScheduleWidget;
  onEventCut: () => void;
  dayScopeProps: ScheduleDayScopeProps;
};
const isOpenModalAtom = atom(false);

export function ScheduleWidgetDayEventEventActions({ schedule, event, onEventCut, dayScopeProps }: Props) {
  const rights = useScheduleWidgetRightsContext();

  return (
    <>
      <TheIconButton
        icon="Shapes"
        postfix="Редактировать шаблон события"
        className="flex-max my-2"
        onClick={isOpenModalAtom.do.toggle}
      />
      <TheIconButton
        icon="Crop"
        postfix="Вырезать событие"
        className="flex-max my-2"
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
          className="flex-max text-xKO my-2"
          onSend={() =>
            schDaysTsjrpcClient.removeEvent({
              props: dayScopeProps,
              value: {
                eventMi: event.mi,
                eventTypeTitle: rights.schedule.types[event.type].title,
              },
            })
          }
        />
      )}

      <Modal openAtom={isOpenModalAtom}>
        <ModalHeader>
          Шаблон события <span className="text-x7">{schedule.types[event.type].title}</span>
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
    </>
  );
}
