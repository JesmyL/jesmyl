import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ScheduleDayEventScopeProps } from 'shared/api';
import { DayEventIsNeedTgInformButton } from './IsNeedTgInformButton';

type Props = {
  isSecret: num | und;
  eventTypeTitle: string;
  eventTopic: string | und;
  tgInform: num | und;
  isPastEvent: boolean;
  dayEventScopeProps: ScheduleDayEventScopeProps;
  eventTm: number;
};

export const DayEventRedactControls = ({
  isSecret,
  eventTypeTitle,
  eventTopic,
  tgInform,
  isPastEvent,
  dayEventScopeProps,
  eventTm,
}: Props) => {
  return (
    <>
      <TheIconSendButton
        icon={isSecret ? 'CheckmarkSquare02' : 'Square'}
        confirm={
          <>
            Событие <span className="color--7">{eventTypeTitle} </span>
            {isSecret ? 'больше не скрытое' : 'сделать скрытым'}?
          </>
        }
        postfix="Скрытое событие"
        onSend={() => schDayEventsTsjrpcClient.toggleIsSecret({ props: dayEventScopeProps, value: undefined })}
      />

      <DayEventIsNeedTgInformButton
        disabled={isPastEvent}
        isNeedInform={tgInform === 0 || isPastEvent}
        onSend={() =>
          schDayEventsTsjrpcClient.setIsNeedTgInform({
            props: dayEventScopeProps,
            value: tgInform === 0 ? 1 : 0,
          })
        }
      />

      <StrongEditableField
        isRedact
        type="tel"
        value={'' + eventTm}
        postfix=" мин"
        title="Продолжительность, мин"
        icon="Clock01"
        onSend={value => schDayEventsTsjrpcClient.setTm({ props: dayEventScopeProps, value: +value })}
      />
      <StrongEditableField
        isRedact
        value={eventTopic}
        title="Тема"
        icon="Bookmark03"
        onSend={value => schDayEventsTsjrpcClient.setTopic({ props: dayEventScopeProps, value })}
      />
    </>
  );
};
