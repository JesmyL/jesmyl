import { useEffect, useMemo, useState } from 'react';
import {
  indexScheduleGetDayEventTimes,
  IScheduleWidget,
  IScheduleWidgetDay,
  ScheduleScopeProps,
  ScheduleWidgetCleans,
} from 'shared/api';
import { emptyFunc, itNNull, retNull } from 'shared/utils';
import styled from 'styled-components';
import KeyboardInput from '../../keyboard/KeyboardInput';
import StrongButton from '../../strong-control/StrongButton';
import ScheduleWidgetDayEvent from './events/DayEvent';

interface Props {
  day: IScheduleWidgetDay;
  dayi: number;
  schedule: IScheduleWidget;
  dayScope: string;
  onClose: (isOpen: false) => void;
  scheduleScopeProps: ScheduleScopeProps;
}

export const ScheduleWidgetEventListUpdater = ({
  day,
  dayScope,
  dayi,
  schedule,
  onClose,
  scheduleScopeProps,
}: Props) => {
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

        const { dayWup, list, newTatts } = ScheduleWidgetCleans.preparedText2DayList(text, schedule);

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
            {!newTatts.length || (
              <>
                <h2>Новые события</h2>
                {newTatts.map(({ title, tm }) => {
                  return (
                    <div key={title}>
                      {title} <span className="color--7">{tm}м.</span>
                    </div>
                  );
                })}

                <StrongButton
                  fieldName="types"
                  cud="U"
                  title="Отправить только новые события"
                  fieldValue={newTatts}
                />
              </>
            )}

            {day.wup !== dayWup && (
              <StrongButton
                fieldName="wup"
                cud="U"
                // scope={dayScope}
                title={`Установить время начала дня: ${ScheduleWidgetCleans.computeDayWakeUpTime(dayWup, 'string')}`}
                fieldValue={dayWup}
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

            <StrongButton
              scope={dayScope}
              cud="U"
              fieldName="updateDayEventList"
              fieldValue={list.filter(itNNull)}
              disabled={isShowPeriodsNotTs}
              title="Отправить расписание"
              onSuccess={() => onClose(false)}
            />
          </div>,
        );
      }, 300)
      .effect();
  }, [day, dayScope, dayScopeProps, dayi, onClose, schedule, value]);

  return (
    <div className="margin-giant-gap-t">
      <KeyboardInput
        value={value}
        onChange={setValue}
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
