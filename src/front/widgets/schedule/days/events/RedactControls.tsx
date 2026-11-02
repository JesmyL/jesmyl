import { translateBase } from '#basis/locale';
import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ScheduleAppInform, ScheduleDayEventScopeProps } from 'shared/api';
import { Bool } from 'shared/enums';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

type Props = {
  isSecret: Bool | und;
  eventTypeTitle: string;
  eventTopic: string | und;
  noAppInform: Bool | und;
  appInform: ScheduleAppInform;
  isPastEvent: boolean;
  dayEventScopeProps: ScheduleDayEventScopeProps;
  eventTm: number;
};

export const DayEventRedactControls = ({
  isSecret,
  eventTypeTitle,
  eventTopic,
  noAppInform,
  appInform,
  isPastEvent,
  dayEventScopeProps,
  eventTm,
}: Props) => {
  const isAppInformDisabled = appInform === 0;
  const isInformOff = isAppInformDisabled || noAppInform === Bool.True || isPastEvent;

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

      <TheIconSendButton
        disabled={isAppInformDisabled || isPastEvent}
        icon={isInformOff ? 'NotificationOff01' : 'Notification01'}
        postfix={
          isInformOff
            ? translateBase(BaseLocaleKey.ScheduleEventAppInformWontBe)
            : appInform === 1
              ? translateBase(BaseLocaleKey.ScheduleInformOnlyByStart)
              : translateBase(BaseLocaleKey.ScheduleEventAppInformWillBe, { n: appInform })
        }
        onSend={() =>
          schDayEventsTsjrpcClient.setIsNeedAppInform({
            props: dayEventScopeProps,
            value: isInformOff ? Bool.False : Bool.True,
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
