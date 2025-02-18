import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M11 7.5H17M8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5Z',
  d3: 'M11 12H17M8 12C8 12.2761 7.77614 12.5 7.5 12.5C7.22386 12.5 7 12.2761 7 12C7 11.7239 7.22386 11.5 7.5 11.5C7.77614 11.5 8 11.7239 8 12Z',
  d4: 'M11 16.5H17M8 16.5C8 16.7761 7.77614 17 7.5 17C7.22386 17 7 16.7761 7 16.5C7 16.2239 7.22386 16 7.5 16C7.77614 16 8 16.2239 8 16.5Z',
  d5: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM7.5 6.25C6.80964 6.25 6.25 6.80964 6.25 7.5C6.25 8.19036 6.80964 8.75 7.5 8.75C8.19036 8.75 8.75 8.19036 8.75 7.5C8.75 6.80964 8.19036 6.25 7.5 6.25ZM11 6.75C10.5858 6.75 10.25 7.08579 10.25 7.5C10.25 7.91421 10.5858 8.25 11 8.25H17C17.4142 8.25 17.75 7.91421 17.75 7.5C17.75 7.08579 17.4142 6.75 17 6.75L11 6.75ZM6.25 12C6.25 11.3096 6.80964 10.75 7.5 10.75C8.19036 10.75 8.75 11.3096 8.75 12C8.75 12.6904 8.19036 13.25 7.5 13.25C6.80964 13.25 6.25 12.6904 6.25 12ZM10.25 12C10.25 11.5858 10.5858 11.25 11 11.25L17 11.25C17.4142 11.25 17.75 11.5858 17.75 12C17.75 12.4142 17.4142 12.75 17 12.75L11 12.75C10.5858 12.75 10.25 12.4142 10.25 12ZM7.5 15.25C6.80964 15.25 6.25 15.8096 6.25 16.5C6.25 17.1904 6.80964 17.75 7.5 17.75C8.19036 17.75 8.75 17.1904 8.75 16.5C8.75 15.8096 8.19036 15.25 7.5 15.25ZM11 15.75C10.5858 15.75 10.25 16.0858 10.25 16.5C10.25 16.9142 10.5858 17.25 11 17.25L17 17.25C17.4142 17.25 17.75 16.9142 17.75 16.5C17.75 16.0858 17.4142 15.75 17 15.75L11 15.75Z',
  d6: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d7: 'M6.25 7.5C6.25 6.80964 6.80964 6.25 7.5 6.25C8.19036 6.25 8.75 6.80964 8.75 7.5C8.75 8.19036 8.19036 8.75 7.5 8.75C6.80964 8.75 6.25 8.19036 6.25 7.5Z',
  d8: 'M10.25 7.5C10.25 7.08579 10.5858 6.75 11 6.75H17C17.4142 6.75 17.75 7.08579 17.75 7.5C17.75 7.91421 17.4142 8.25 17 8.25H11C10.5858 8.25 10.25 7.91421 10.25 7.5Z',
  d9: 'M6.25 12C6.25 11.3096 6.80964 10.75 7.5 10.75C8.19036 10.75 8.75 11.3096 8.75 12C8.75 12.6904 8.19036 13.25 7.5 13.25C6.80964 13.25 6.25 12.6904 6.25 12Z',
  d10: 'M10.25 12C10.25 11.5858 10.5858 11.25 11 11.25H17C17.4142 11.25 17.75 11.5858 17.75 12C17.75 12.4142 17.4142 12.75 17 12.75H11C10.5858 12.75 10.25 12.4142 10.25 12Z',
  d11: 'M6.25 16.5C6.25 15.8096 6.80964 15.25 7.5 15.25C8.19036 15.25 8.75 15.8096 8.75 16.5C8.75 17.1904 8.19036 17.75 7.5 17.75C6.80964 17.75 6.25 17.1904 6.25 16.5Z',
  d12: 'M10.25 16.5C10.25 16.0858 10.5858 15.75 11 15.75H17C17.4142 15.75 17.75 16.0858 17.75 16.5C17.75 16.9142 17.4142 17.25 17 17.25H11C10.5858 17.25 10.25 16.9142 10.25 16.5Z',
  d13: 'M21 3V21H3V3H21Z',
  d14: 'M11 7.5H17M7 7H8V8H7V7Z',
  d15: 'M11 12H17M7 11.5H8V12.5H7V11.5Z',
  d16: 'M11 16.5H17M7 16H8V17H7V16Z',
  d17: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3L2.25 21C2.25 21.4142 2.58579 21.75 3 21.75L21 21.75C21.4142 21.75 21.75 21.4142 21.75 21L21.75 3C21.75 2.58579 21.4142 2.25 21 2.25L3 2.25ZM9.125 6.25L6.625 6.25L6.625 8.75L9.125 8.75L9.125 6.25ZM11.375 8.25H17.375V6.75L11.375 6.75V8.25ZM6.625 10.75H9.125L9.125 13.25H6.625L6.625 10.75ZM17.375 12.75L11.375 12.75V11.25L17.375 11.25V12.75ZM9.125 15.25H6.625V17.75H9.125V15.25ZM11.375 17.25L17.375 17.25V15.75L11.375 15.75V17.25Z',
};

export const IconAppleReminderStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apple-reminder-stroke-rounded IconAppleReminderStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAppleReminderDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apple-reminder-duotone-rounded IconAppleReminderDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAppleReminderTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apple-reminder-twotone-rounded IconAppleReminderTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAppleReminderSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apple-reminder-solid-rounded IconAppleReminderSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAppleReminderBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apple-reminder-bulk-rounded IconAppleReminderBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAppleReminderStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apple-reminder-stroke-sharp IconAppleReminderStrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconAppleReminderSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apple-reminder-solid-sharp IconAppleReminderSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAppleReminder: TheIconSelfPack = {
  name: 'AppleReminder',
  StrokeRounded: IconAppleReminderStrokeRounded,
  DuotoneRounded: IconAppleReminderDuotoneRounded,
  TwotoneRounded: IconAppleReminderTwotoneRounded,
  SolidRounded: IconAppleReminderSolidRounded,
  BulkRounded: IconAppleReminderBulkRounded,
  StrokeSharp: IconAppleReminderStrokeSharp,
  SolidSharp: IconAppleReminderSolidSharp,
};