import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 2V4M6 2V4',
  d2: 'M11.05 22C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.4267 5.62803 21.4957 7.63364 21.4997 11.5V13',
  d3: 'M13 17.5L21 17.5M13 17.5C13 18.2002 14.9943 19.5085 15.5 20M13 17.5C13 16.7998 14.9943 15.4915 15.5 15',
  d4: 'M3 8H21',
  d5: 'M21.5 12.7568V12.2432C21.5 10.5138 21.5 9.12764 21.4217 8H2.57828C2.5 9.12764 2.5 10.5138 2.5 12.2432V12.7568C2.5 17.1141 2.5 19.2927 3.75212 20.6464C5.00424 22 7.01949 22 11.05 22H12.95C16.9805 22 18.9958 22 20.2479 20.6464C21.5 19.2927 21.5 17.1141 21.5 12.7568Z',
  d6: 'M21 18.5059C21.5523 18.5059 22 18.0581 22 17.5059C22 16.9536 21.5523 16.5059 21 16.5059L16.5 16.5059L16.5 15.9116C16.5001 15.736 16.5003 15.5203 16.4782 15.3439L16.4778 15.3405C16.462 15.2141 16.3902 14.638 15.8246 14.3637C15.2578 14.0887 14.7576 14.3907 14.6494 14.456L14.181 14.7951C13.8051 15.0897 13.2907 15.4954 12.8997 15.8759C12.7046 16.0657 12.5033 16.283 12.3445 16.5139C12.2033 16.7191 12 17.0693 12 17.5C12 17.9307 12.2033 18.2809 12.3445 18.4861C12.5033 18.717 12.7046 18.9343 12.8997 19.1241C13.2907 19.5046 13.8051 19.9102 14.1809 20.2049L14.6494 20.544C14.7576 20.6093 15.2578 20.9113 15.8246 20.6363C16.3902 20.362 16.462 19.7859 16.4778 19.6595L16.4782 19.6561C16.5003 19.4797 16.5001 19.264 16.5 19.0884L16.5 18.5059H21Z',
  d7: 'M13.0288 2H10.9712C9.02294 1.99997 7.45141 1.99994 6.21533 2.17961C4.92535 2.3671 3.8568 2.76781 3.01802 3.6746C2.18949 4.57031 1.83279 5.69272 1.66416 7.04866C1.49997 8.36894 1.49998 10.0541 1.5 12.1739V12.8261C1.49998 14.9459 1.49997 16.6311 1.66416 17.9513C1.83279 19.3073 2.18949 20.4297 3.01802 21.3254C3.8568 22.2322 4.92535 22.6329 6.21533 22.8204C7.45142 23.0001 9.02293 23 10.9712 23H11.05C11.6023 23 12.05 22.5523 12.05 22C12.05 21.4477 11.6023 21 11.05 21C9.00425 21 7.57858 20.9975 6.503 20.8412C5.4647 20.6903 4.89956 20.4142 4.48622 19.9673C4.06263 19.5094 3.79327 18.8656 3.64887 17.7045C3.50182 16.5221 3.5 14.9616 3.5 12.7568V12.2432C3.5 11.1847 3.50042 10.2746 3.51713 9.48363C3.52283 9.2139 3.74413 9 4.01391 9H19.986C20.2558 9 20.4771 9.21402 20.4828 9.48374C20.4955 10.0821 20.499 10.7502 20.4997 11.501V13C20.4997 13.5523 20.9475 14 21.4997 14C22.052 14 22.4997 13.5523 22.4997 13V11.499C22.4977 9.58334 22.4813 8.04001 22.3041 6.81198C22.1236 5.56147 21.7617 4.51759 20.982 3.6746C20.1432 2.76781 19.0747 2.3671 17.7847 2.17961C16.5486 1.99994 14.9771 1.99997 13.0288 2Z',
  d8: 'M7 2C7 1.44772 6.55228 1 6 1C5.44772 1 5 1.44772 5 2V2.44885C5.38032 2.32821 5.78554 2.24208 6.21533 2.17961C6.46328 2.14357 6.72472 2.11476 7 2.09173V2Z',
  d9: 'M19 2.44885C18.6197 2.32821 18.2145 2.24208 17.7847 2.17961C17.5367 2.14357 17.2753 2.11476 17 2.09173V2C17 1.44772 17.4477 1 18 1C18.5523 1 19 1.44772 19 2V2.44885Z',
  d10: 'M17.5 2V6M6.5 2V6',
  d11: 'M21 14V4H3V22H11',
  d12: 'M3 9H21',
  d13: 'M21 18L13.5899 18M16 21L13 18L16 15',
  d14: 'M17.5 1.75V5.75M6.5 1.75V5.75',
  d15: 'M16.043 15.0859L17.4573 16.5002L16.1644 17.793L21.7502 17.793V19.793L16.1644 19.793L17.4573 21.0859L16.043 22.5002L12.3359 18.793L16.043 15.0859Z',
  d16: 'M16.5 1.5V3H7.5V1.5H5.5V3H3C2.58579 3 2.25 3.33579 2.25 3.75V21.525C2.25 22.0635 2.68652 22.5 3.225 22.5H11V20.55H4.2V9.5H19.8V14.025H21.75V3.75C21.75 3.33579 21.4142 3 21 3H18.5V1.5H16.5Z',
};

export const IconCalendarCheckIn01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-check-in-01-stroke-rounded IconCalendarCheckIn01StrokeRounded"
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

export const IconCalendarCheckIn01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-check-in-01-duotone-rounded IconCalendarCheckIn01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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

export const IconCalendarCheckIn01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-check-in-01-twotone-rounded IconCalendarCheckIn01TwotoneRounded"
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCalendarCheckIn01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-check-in-01-solid-rounded IconCalendarCheckIn01SolidRounded"
    >
      <path 
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
    </TheIconWrapper>
  );
};

export const IconCalendarCheckIn01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-check-in-01-bulk-rounded IconCalendarCheckIn01BulkRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconCalendarCheckIn01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-check-in-01-stroke-sharp IconCalendarCheckIn01StrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCalendarCheckIn01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-check-in-01-solid-sharp IconCalendarCheckIn01SolidSharp"
    >
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCalendarCheckIn01: TheIconSelfPack = {
  name: 'CalendarCheckIn01',
  StrokeRounded: IconCalendarCheckIn01StrokeRounded,
  DuotoneRounded: IconCalendarCheckIn01DuotoneRounded,
  TwotoneRounded: IconCalendarCheckIn01TwotoneRounded,
  SolidRounded: IconCalendarCheckIn01SolidRounded,
  BulkRounded: IconCalendarCheckIn01BulkRounded,
  StrokeSharp: IconCalendarCheckIn01StrokeSharp,
  SolidSharp: IconCalendarCheckIn01SolidSharp,
};