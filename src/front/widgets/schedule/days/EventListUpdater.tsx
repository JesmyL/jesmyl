import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { TextInput } from '#shared/ui/TextInput';
import { useEffect, useMemo, useState } from 'react';
import {
  IScheduleWidget,
  IScheduleWidgetDay,
  ScheduleScopeProps,
  ScheduleWidgetCleans,
  indexScheduleGetDayEventTimes,
} from 'shared/api';
import { emptyFunc, itNNull, retNull } from 'shared/utils';
import styled from 'styled-components';
import { schDaysTsjrpcClient, schEventTypesTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { ScheduleWidgetDayEvent } from './events/DayEvent';

interface Props {
  day: IScheduleWidgetDay;
  dayi: number;
  schedule: IScheduleWidget;
  onClose: (isOpen: false) => void;
  scheduleScopeProps: ScheduleScopeProps;
}

export const ScheduleWidgetEventListUpdater = ({ day, dayi, schedule, onClose, scheduleScopeProps }: Props) => {
  const [value, setValue] = useState('');
  const [node, setNode] = useState<React.ReactNode>(null);
  const [errorText, setErrorText] = useState('');
  const dayScopeProps = useMemo(() => ({ ...scheduleScopeProps, dayi }), [dayi, scheduleScopeProps]);

  useEffect(() => {
    setErrorText('');

    return hookEffectLine()
      .setTimeout(() => {
        let text;

        try {
          text = ScheduleWidgetCleans.text2PreparedText(value).text;
        } catch (errorText) {
          setErrorText('' + errorText);
          return;
        }

        const { dayWup, list, newTypes } = ScheduleWidgetCleans.preparedText2DayList(text, schedule);

        const theDay = {
          ...day,
          list: list.map((event, eventi) => ({ ...event, mi: event?.mi ?? -eventi, type: event?.type ?? -1 })),
        };

        const days = [...schedule.days];
        const theSchedule = { ...schedule, days };
        const times = indexScheduleGetDayEventTimes(theSchedule, theDay);

        days[dayi] = theDay;
        const isShowPeriodsNotTs = list.includes(null);

        setNode(
          <div className="margin-gap-t">
            {!newTypes.length || (
              <>
                <h2>Новые события</h2>
                {newTypes.map(({ title, tm }) => {
                  return (
                    <div key={title}>
                      {title} <span className="color--7">{tm}м.</span>
                    </div>
                  );
                })}

                <SendButton
                  title="Отправить только новые события"
                  onSend={async () => schEventTypesTsjrpcClient.putMany({ props: scheduleScopeProps, tatts: newTypes })}
                />
              </>
            )}

            {day.wup !== dayWup && (
              <SendButton
                title={`Установить время начала дня: ${ScheduleWidgetCleans.computeDayWakeUpTime(dayWup, 'string')}`}
                onSend={async () =>
                  schDaysTsjrpcClient.setBeginTime({
                    props: { ...scheduleScopeProps, dayi },
                    value: '' + dayWup,
                  })
                }
              />
            )}

            {list.map((event, eventi) => {
              if (event === null)
                return (
                  <div
                    key={eventi}
                    className="color--ko"
                  >
                    Новое событие
                  </div>
                );

              return (
                <StyledEvent
                  key={eventi}
                  schedule={theSchedule}
                  dayScopeProps={dayScopeProps}
                  bottomContent={retNull}
                  day={theDay}
                  dayi={dayi}
                  isPastDay={false}
                  event={event}
                  eventTimes={times}
                  eventi={eventi}
                  isLastEvent
                  isShowPeriodsNotTs={isShowPeriodsNotTs}
                  onClickOnTs={emptyFunc}
                  redact={false}
                  isForceCanRedact={false}
                  secretTime={0}
                  isForceExpand={!!event.dsc}
                  isForceHideRating
                />
              );
            })}

            <SendButton
              disabled={isShowPeriodsNotTs}
              title="Отправить расписание"
              onSuccess={() => onClose(false)}
              onSend={() =>
                schDaysTsjrpcClient.setEventList({
                  props: { ...scheduleScopeProps, dayi },
                  list: list.filter(itNNull),
                })
              }
            />
          </div>,
        );
      }, 300)
      .effect();
  }, [day, dayScopeProps, dayi, onClose, schedule, scheduleScopeProps, value]);

  return (
    <div className="margin-giant-gap-t">
      <TextInput
        value={value}
        onChanged={setValue}
        multiline
      />
      {errorText ? (
        <div className="color--ko margin-gap-v flex center">
          <div dangerouslySetInnerHTML={{ __html: errorText }} />
        </div>
      ) : (
        node
      )}
    </div>
  );
};

const StyledEvent = styled(ScheduleWidgetDayEvent)`
  margin-top: 5px;
`;
