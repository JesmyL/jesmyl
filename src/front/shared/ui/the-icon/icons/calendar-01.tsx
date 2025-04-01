import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 2V4M6 2V4',
  d2: 'M10 17L9.99999 13.3472C9.99999 13.1555 9.86325 13 9.69458 13H9M13.6297 17L14.9842 13.3492C15.0475 13.1785 14.9128 13 14.7207 13H13',
  d3: 'M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z',
  d4: 'M6 8H18',
  d5: 'M6 1.125C6.55228 1.125 7 1.57272 7 2.125V4.125C7 4.67728 6.55228 5.125 6 5.125C5.44772 5.125 5 4.67728 5 4.125V2.125C5 1.57272 5.44772 1.125 6 1.125ZM18 1.125C18.5523 1.125 19 1.57272 19 2.125V4.125C19 4.67728 18.5523 5.125 18 5.125C17.4477 5.125 17 4.67728 17 4.125V2.125C17 1.57272 17.4477 1.125 18 1.125Z',
  d6: 'M13.0108 2.375H13.0108C14.9745 2.37498 16.5307 2.37497 17.7487 2.55201C19.0072 2.73493 20.0129 3.12006 20.7985 3.96936C21.5764 4.81035 21.9222 5.87292 22.0878 7.20451C22.25 8.50931 22.25 10.1815 22.25 12.3151V12.9349C22.25 15.0685 22.25 16.7407 22.0878 18.0455C21.9222 19.3771 21.5764 20.4397 20.7985 21.2806C20.0129 22.1299 19.0072 22.5151 17.7487 22.698C16.5307 22.875 14.9745 22.875 13.0108 22.875H10.9892C9.02555 22.875 7.46932 22.875 6.25129 22.698C4.99276 22.5151 3.98714 22.1299 3.20154 21.2806C2.42363 20.4397 2.07785 19.3771 1.91225 18.0455C1.74998 16.7407 1.74999 15.0685 1.75 12.935V12.935V12.315V12.315C1.74999 10.1815 1.74998 8.5093 1.91225 7.20451C2.07785 5.87292 2.42363 4.81035 3.20154 3.96936C3.98714 3.12006 4.99276 2.73493 6.25129 2.55201C7.46931 2.37497 9.02554 2.37498 10.9892 2.375H10.9892H10.9892H13.0108H13.0108ZM9.59998 12.125C10.3732 12.125 11 12.7518 11 13.525L11 17.125C11 17.6773 10.5523 18.125 10 18.125C9.44772 18.125 9 17.6773 9 17.125L8.99999 14.125C8.44771 14.125 8 13.6773 8 13.125C8 12.5727 8.44771 12.125 8.99999 12.125L9.59998 12.125ZM12 13.125C12 12.5727 12.4477 12.125 13 12.125H14.7207C15.518 12.125 16.2584 12.9145 15.9217 13.822L14.5672 17.4729C14.3751 17.9906 13.7996 18.2547 13.2818 18.0626C12.764 17.8704 12.5 17.295 12.6921 16.7772L13.6761 14.125H13C12.4477 14.125 12 13.6773 12 13.125ZM6 7.125C5.44772 7.125 5 7.57272 5 8.125C5 8.67729 5.44772 9.125 6 9.125H18C18.5523 9.125 19 8.67729 19 8.125C19 7.57272 18.5523 7.125 18 7.125H6Z',
  d7: 'M7 2.125C7 1.57272 6.55228 1.125 6 1.125C5.44772 1.125 5 1.57272 5 2.125V2.83669C5.38593 2.70817 5.80253 2.61723 6.25129 2.552C6.48792 2.51761 6.73733 2.4899 7 2.46757V2.125ZM19 2.83669C18.6141 2.70817 18.1975 2.61723 17.7487 2.552C17.5121 2.51761 17.2627 2.4899 17 2.46757V2.125C17 1.57272 17.4477 1.125 18 1.125C18.5523 1.125 19 1.57272 19 2.125V2.83669Z',
  d8: 'M13.0108 2.375C14.9745 2.37498 16.5307 2.37497 17.7487 2.552C19.0072 2.73493 20.0129 3.12006 20.7985 3.96936C21.5764 4.81035 21.9222 5.87292 22.0878 7.20451C22.25 8.50931 22.25 10.1815 22.25 12.3151V12.9349C22.25 15.0685 22.25 16.7407 22.0878 18.0455C21.9222 19.3771 21.5764 20.4397 20.7985 21.2806C20.0129 22.1299 19.0072 22.5151 17.7487 22.698C16.5307 22.875 14.9745 22.875 13.0108 22.875H10.9892C9.02555 22.875 7.46932 22.875 6.25129 22.698C4.99276 22.5151 3.98714 22.1299 3.20154 21.2806C2.42363 20.4397 2.07785 19.3771 1.91225 18.0455C1.74998 16.7407 1.74999 15.0685 1.75 12.935V12.315C1.74999 10.1815 1.74998 8.5093 1.91225 7.20451C2.07785 5.87292 2.42363 4.81035 3.20154 3.96936C3.98714 3.12006 4.99276 2.73493 6.25129 2.552C7.46932 2.37497 9.02554 2.37498 10.9892 2.375H10.9892H13.0108H13.0108Z',
  d9: 'M9.59998 12.125C10.3732 12.125 11 12.7518 11 13.525L11 17.125C11 17.6773 10.5523 18.125 10 18.125C9.44772 18.125 9 17.6773 9 17.125L8.99999 14.125C8.44771 14.125 8 13.6773 8 13.125C8 12.5727 8.44771 12.125 8.99999 12.125L9.59998 12.125Z',
  d10: 'M12 13.125C12 12.5727 12.4477 12.125 13 12.125H14.7207C15.518 12.125 16.2584 12.9145 15.9217 13.822L14.5672 17.4729C14.3751 17.9906 13.7996 18.2547 13.2818 18.0626C12.764 17.8704 12.5 17.295 12.6921 16.7772L13.6761 14.125H13C12.4477 14.125 12 13.6773 12 13.125Z',
  d11: 'M5 8.125C5 7.57272 5.44772 7.125 6 7.125H18C18.5523 7.125 19 7.57272 19 8.125C19 8.67728 18.5523 9.125 18 9.125H6C5.44772 9.125 5 8.67728 5 8.125Z',
  d12: 'M17.5 2V6M6.5 2V6',
  d13: 'M10 18V14H8.5M13.6297 18L15 14L12 14',
  d14: 'M21 4H3V22H21V4Z',
  d15: 'M6 9H18',
  d16: 'M7.5 3H16.5V1.5H18.5V3H21C21.4142 3 21.75 3.33579 21.75 3.75V21.75C21.75 22.1642 21.4142 22.5 21 22.5H3C2.58579 22.5 2.25 22.1642 2.25 21.75V3.75C2.25 3.33579 2.58579 3 3 3H5.5V1.5H7.5V3ZM8.5 13H10C10.4142 13 10.75 13.3358 10.75 13.75V17.75H9.25V14.5H8.5V13ZM12 13L15 13C15.2422 13 15.4695 13.1169 15.6102 13.314C15.751 13.5111 15.788 13.764 15.7095 13.9931L14.3392 17.9931L12.9201 17.5069L13.9503 14.5L12 14.5V13ZM6 9.5H18V8H6V9.5Z',
};

export const IconCalendar01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-01-stroke-rounded IconCalendar01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconCalendar01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-01-duotone-rounded IconCalendar01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconCalendar01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-01-twotone-rounded IconCalendar01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
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

export const IconCalendar01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-01-solid-rounded IconCalendar01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCalendar01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-01-bulk-rounded IconCalendar01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCalendar01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-01-stroke-sharp IconCalendar01StrokeSharp"
    >
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCalendar01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-01-solid-sharp IconCalendar01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCalendar01: TheIconSelfPack = {
  name: 'Calendar01',
  StrokeRounded: IconCalendar01StrokeRounded,
  DuotoneRounded: IconCalendar01DuotoneRounded,
  TwotoneRounded: IconCalendar01TwotoneRounded,
  SolidRounded: IconCalendar01SolidRounded,
  BulkRounded: IconCalendar01BulkRounded,
  StrokeSharp: IconCalendar01StrokeSharp,
  SolidSharp: IconCalendar01SolidSharp,
};