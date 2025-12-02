import { mylib } from '#shared/lib/my-lib';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { useState } from 'react';
import { Matcher } from 'react-day-picker';
import { twMerge } from 'tailwind-merge';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';

export const DatePicker = (props: {
  initValue: string | number | Date | nil;
  onSelect?: (date: Date | und) => Promise<unknown> | nil;
  placeholder?: React.ReactNode;
  disabled?: Matcher[];
  dateTitle?: React.ReactNode;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(() => {
    if (!props.initValue) return;
    const date = new Date(props.initValue);
    if (mylib.isNaN(date.getTime())) return;

    return date;
  });

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className={twMerge('w-48 justify-between font-normal', props.className)}
        >
          {date
            ? (props.dateTitle ?? date.toLocaleDateString('ru', { month: 'long', day: 'numeric', year: '2-digit' }))
            : (props.placeholder ?? 'Дата')}
          <TheIconLoading
            icon="ArrowDown01"
            isLoading={isLoading}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="label"
          className="h-[330px]"
          defaultMonth={date}
          disabled={props.disabled}
          formatters={{
            formatWeekdayName: weekdate => weekdate.toLocaleDateString('ru', { weekday: 'short' }),
          }}
          components={{
            MonthCaption: props => (
              <>{props.calendarMonth.date.toLocaleDateString('ru', { month: 'long', year: 'numeric' })}</>
            ),
          }}
          onSelect={async date => {
            setDate(date);
            setOpen(false);

            if (props.onSelect != null) {
              setIsLoading(true);
              await props.onSelect(date);
            }

            setIsLoading(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
