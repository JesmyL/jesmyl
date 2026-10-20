import { translateBase } from '#basis/locale';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ScheduleWidgetTopicTitle } from '#widgets/schedule/complect/TopicTitle';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { ScheduleWidgetEventType } from '#widgets/schedule/events/EventType';
import { schDaysTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { Atom, atom } from 'atomaric';
import { IScheduleWidget, IScheduleWidgetDayEvent, ScheduleDayScopeProps } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

type Props = {
  event: IScheduleWidgetDayEvent;
  schedule: IScheduleWidget;
  onEventCut: () => void;
  dayScopeProps: ScheduleDayScopeProps;
};

let isOpenModalAtom: Atom<boolean>;

export function ScheduleWidgetDayEventEventActions({ schedule, event, onEventCut, dayScopeProps }: Props) {
  isOpenModalAtom ??= atom(false);

  const rights = useScheduleWidgetRightsContext();

  return (
    <>
      <TheIconButton
        icon="Shapes"
        postfix={translateBase(BaseLocaleKey.ScheduleRedactEventTemplate)}
        className="flex-max my-2"
        onClick={isOpenModalAtom.do.toggle}
      />
      <TheIconButton
        icon="Crop"
        postfix={translateBase(BaseLocaleKey.ScheduleCutEvent)}
        className="flex-max my-2"
        onClick={onEventCut}
      />
      {schedule.types && (
        <TheIconSendButton
          icon="Delete01"
          postfix={translateBase(BaseLocaleKey.ScheduleRemoveEvent)}
          confirm={
            <ScheduleWidgetTopicTitle
              prefix={translateBase(BaseLocaleKey.ScheduleRemoveEvent) + ' '}
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
          {translateBase(BaseLocaleKey.ScheduleEventTemplate, { t: schedule.types[event.type].title })}
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
            <>{translateBase(BaseLocaleKey.ScheduleTemplateNotFound)}</>
          )}
        </ModalBody>
      </Modal>
    </>
  );
}
