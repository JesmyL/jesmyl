import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import StrongEditableField from 'front/complect/strong-control/field/StrongEditableField';
import { IconBookmark03StrokeRounded } from 'front/complect/the-icon/icons/bookmark-03';
import { IconCheckmarkSquare02StrokeRounded } from 'front/complect/the-icon/icons/checkmark-square-02';
import { IconClock01StrokeRounded } from 'front/complect/the-icon/icons/clock-01';
import { IconSquareStrokeRounded } from 'front/complect/the-icon/icons/square';
import { ScheduleDayEventScopeProps } from 'shared/api';
import { schDayEventsSokiInvocatorClient } from '../../invocators/invocators.methods';
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
      <EvaSendButton
        Icon={isSecret ? IconCheckmarkSquare02StrokeRounded : IconSquareStrokeRounded}
        confirm={
          <>
            Событие <span className="color--7">{eventTypeTitle} </span>
            {isSecret ? 'больше не скрытое' : 'сделать скрытым'}?
          </>
        }
        postfix="Скрытое событие"
        onSend={() => schDayEventsSokiInvocatorClient.toggleIsSecret(null, dayEventScopeProps)}
      />

      <DayEventIsNeedTgInformButton
        disabled={isPastEvent}
        isNeedInform={tgInform === 0 || isPastEvent}
        onSend={() =>
          schDayEventsSokiInvocatorClient.setIsNeedTgInform(null, dayEventScopeProps, tgInform === 0 ? 1 : 0)
        }
      />

      <StrongEditableField
        isRedact
        type="number"
        value={'' + eventTm}
        postfix=" мин"
        title="Продолжительность, мин"
        Icon={IconClock01StrokeRounded}
        onSend={value => schDayEventsSokiInvocatorClient.setTm(null, dayEventScopeProps, +value)}
      />
      <StrongEditableField
        isRedact
        value={eventTopic}
        title="Тема"
        Icon={IconBookmark03StrokeRounded}
        onSend={value => schDayEventsSokiInvocatorClient.setTopic(null, dayEventScopeProps, value)}
      />
    </>
  );
};
