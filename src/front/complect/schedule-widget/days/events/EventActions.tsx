import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { IScheduleWidget, IScheduleWidgetDayEvent } from 'shared/api';
import { IconCropStrokeRounded } from '../../../../complect/the-icon/icons/crop';
import { IconDelete01StrokeRounded } from '../../../../complect/the-icon/icons/delete-01';
import { IconShapesStrokeRounded } from '../../../../complect/the-icon/icons/shapes';
import useModal from '../../../modal/useModal';
import { StrongComponentProps } from '../../../strong-control/Strong.model';
import IconButton from '../../../the-icon/IconButton';
import ScheduleWidgetTopicTitle from '../../complect/TopicTitle';
import ScheduleWidgetEventType from '../../events/EventType';
import { schSokiInvocatorClient } from '../../invocators/invocators.methods';

export function ScheduleWidgetDayEventEventActions({
  schedule,
  event,
  onEventCut,
}: StrongComponentProps & {
  event: IScheduleWidgetDayEvent;
  schedule: IScheduleWidget;
  onEventCut: () => void;
}) {
  const [modalNode, screen] = useModal(({ header, body }) => {
    return (
      <>
        {header(
          <>
            Шаблон события <span className="color--7">{schedule.types[event.type].title}</span>
          </>,
        )}
        {body(
          schedule.types[event.type] ? (
            <ScheduleWidgetEventType
              schedule={schedule}
              selectFieldName=""
              selectScope=""
              typeBox={schedule.types[event.type]}
              typei={event.type}
              isRedact
            />
          ) : (
            <>Шаблон не найден</>
          ),
        )}
      </>
    );
  });

  return (
    <>
      {modalNode}
      <IconButton
        Icon={IconShapesStrokeRounded}
        postfix="Редактировать шаблон события"
        className="flex-max margin-gap-v"
        onClick={screen}
      />
      <IconButton
        Icon={IconCropStrokeRounded}
        postfix="Вырезать событие"
        className="flex-max margin-gap-v"
        onClick={onEventCut}
      />
      {schedule.types && (
        <EvaSendButton
          // scope={scope}
          // fieldName="list"
          // cud="D"
          Icon={IconDelete01StrokeRounded}
          postfix="Удалить событие"
          confirm={
            <ScheduleWidgetTopicTitle
              prefix="Удалить событие "
              titleBox={schedule.types[event.type]}
              topicBox={event}
            />
          }
          className="flex-max color--ko margin-gap-v"
          onSend={() => schSokiInvocatorClient.oooooooooooooooooooooooooooooooooooooo(null)}
          // mapExecArgs={args => {
          //   return { ...args, eventMi: event.mi };
          // }}
        />
      )}
    </>
  );
}
