import { mylib } from '#shared/lib/my-lib';
import { useEffect, useState } from 'react';
import { itIt, makeRegExp } from 'shared/utils';
import { SendableField } from './SendableField';

type TakeDateComponent = 'NO' | 'year' | 'month' | 'day';
type TakeTimeComponent = 'hour' | 'min' | 'sec' | 'ms';
type TakeTimeDiapason = 'NO' | `${TakeTimeComponent}-${TakeTimeComponent}`;

const takeInPeriod = (num: string | null, finish: string, start?: number) => {
  if (num === null) return ' '.padEnd(finish.length + 1, '0');
  const numFinish = +num.slice(0, finish.length);

  return numFinish > +finish
    ? ` ${finish.padStart(finish.length, '0')}`
    : start !== undefined && numFinish < start
      ? ` ${('' + start).padStart(finish.length, '0')}`
      : ` ${('' + numFinish).padStart(finish.length, '0')}`;
};

export const SendableDateTimeInput = (props: {
  fieldKey?: string;
  value: string;
  icon?: TheIconKnownName;
  title?: string;
  className?: string;
  takeDate: TakeDateComponent;
  takeTime: TakeTimeDiapason;
  onSend: (isChanged: boolean, stringValue: string) => Promise<unknown>;
  onComponentsChange?: (timeDelta: number, timeString: string, dateString: string, date: Date) => void;
}) => {
  const [initTs, setInitTs] = useState<number | null>(null);
  const [currentTs, setCurrentTs] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState(props.value);
  const [timeImagine, setTimeImagine] = useState('');

  useEffect(() => {
    const digits = inputValue.split(makeRegExp('/\\D+/')).reverse().filter(itIt);
    const date = new Date();

    let dateString = '';
    let timeString = '';
    let timeDelta = 0;

    let pointer = -1;
    const takeNextDigit = () => (digits[++pointer] ? digits[pointer] : null);

    if (props.takeTime !== 'NO') {
      const tkHours = props.takeTime.indexOf('hour');
      const tkMin = props.takeTime.indexOf('min');
      const tkSec = props.takeTime.indexOf('sec');
      const tkMs = props.takeTime.indexOf('ms');

      if ((tkHours === 0 || tkMin === 0 || tkSec === 0 || tkMs > -1) && tkMs > -1) {
        const txt = takeInPeriod(takeNextDigit(), '999');
        timeDelta += +txt.trim();
        date.setMilliseconds(+txt.trim());
        timeString = txt + timeString;
      }

      if ((tkHours === 0 || tkMin === 0 || tkSec > -1) && (tkMs > 0 || tkSec > -1)) {
        const txt = takeInPeriod(takeNextDigit(), '59');
        timeDelta += +txt.trim() * mylib.howMs.inSec;
        date.setSeconds(+txt.trim());
        timeString = txt + timeString;
      }

      if ((tkHours === 0 || tkMin > -1) && (tkMs > 0 || tkSec > 0 || tkMin > -1)) {
        const txt = takeInPeriod(takeNextDigit(), '59');
        timeDelta += +txt.trim() * mylib.howMs.inMin;
        date.setMinutes(+txt.trim());
        timeString = txt + timeString;
      }

      if (tkHours > -1 && (tkMs > 0 || tkSec > 0 || tkMin > 0 || tkHours > -1)) {
        const txt = takeInPeriod(takeNextDigit(), '23');
        timeDelta += +txt.trim() * mylib.howMs.inHour;
        date.setHours(+txt.trim());
        timeString = txt + timeString;
      }
      timeString = timeString.trim().replace(makeRegExp('/ (\\d{3})/'), '.$1').replace(makeRegExp('/ /g'), ':');
    } else date.setHours(0, 0, 0, 0);

    if (props.takeDate !== 'NO') {
      const isTakeMonth = props.takeDate === 'month';
      const isTakeDay = props.takeDate === 'day';

      const txt = takeInPeriod(takeNextDigit(), '4000', 1970);
      date.setFullYear(+txt.trim());
      dateString = txt + dateString;

      if (isTakeDay || isTakeMonth) {
        const txt = takeInPeriod(takeNextDigit(), '12', 1);
        date.setDate(1);
        date.setMonth(+txt.trim() - 1);
        dateString = txt + dateString;
      }
      if (isTakeDay) {
        const txt = takeInPeriod(takeNextDigit(), '31', 1);
        date.setDate(+txt.trim());
        dateString = txt + dateString;
      }
      dateString = dateString.trim().replace(makeRegExp('/ /g'), '.');
    }

    setTimeImagine(`${dateString}${timeString && dateString ? ', ' : ''}${timeString}`);

    props.onComponentsChange?.(timeDelta, timeString, dateString, date);
    setCurrentTs(date.getTime());
    if (initTs === null) setInitTs(date.getTime());
  }, [inputValue, props.takeDate, props, props.takeTime, initTs]);

  return (
    <>
      <SendableField
        {...props}
        isRedact
        description={timeImagine}
        placeholder="Нецифра - разделитель"
        onChange={setInputValue}
        onSend={() => props.onSend(initTs !== currentTs, timeImagine)}
      />
    </>
  );
};
