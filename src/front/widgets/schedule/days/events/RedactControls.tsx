import { translateBase } from '#basis/locale';
import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ScheduleDayEventScopeProps } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { DayEventIsNeedTgInformButton } from './IsNeedTgInformButton';

type Props = {
  isSecret: Bool | und;
  eventTypeTitle: string;
  eventTopic: string | und;
  tgInform: Bool | und;
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
          isSecret
            ? translateBase(BaseLocaleKey.ScheduleEventUnhide, { t: eventTypeTitle })
            : translateBase(BaseLocaleKey.ScheduleEventMakeHidden, { t: eventTypeTitle })
        }
        postfix={translateBase(BaseLocaleKey.ScheduleHiddenEvent)}
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
        postfix={translateBase(BaseLocaleKey.MinuteShort)}
        title={translateBase(BaseLocaleKey.DurationMinutes)}
        icon="Clock01"
        onSend={value => schDayEventsTsjrpcClient.setTm({ props: dayEventScopeProps, value: +value })}
      />
      <StrongEditableField
        isRedact
        value={eventTopic}
        title={translateBase(BaseLocaleKey.ScheduleTopic)}
        icon="Bookmark03"
        onSend={value => schDayEventsTsjrpcClient.setTopic({ props: dayEventScopeProps, value })}
      />
    </>
  );
};
