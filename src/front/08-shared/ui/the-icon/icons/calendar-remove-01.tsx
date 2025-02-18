import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 2V4M6 2V4',
  d2: 'M11.05 22C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.4765 5.68186 21.4996 7.80438 21.5 12',
  d3: 'M3 8H21',
  d4: 'M14.5 15L18 18.5M18 18.5L21.5 22M18 18.5L21.5 15M18 18.5L14.5 22',
  d5: 'M21.5 12.7568V12.2432C21.5 10.5138 21.5 9.12764 21.4217 8H2.57828C2.5 9.12764 2.5 10.5138 2.5 12.2432V12.7568C2.5 17.1141 2.5 19.2927 3.75212 20.6464C5.00424 22 7.01949 22 11.05 22H12.95C16.9805 22 18.9958 22 20.2479 20.6464C21.5 19.2927 21.5 17.1141 21.5 12.7568Z',
  d6: 'M13.7929 14.2929C14.1834 13.9024 14.8166 13.9024 15.2071 14.2929L18 17.0858L20.7929 14.2929C21.1834 13.9024 21.8166 13.9024 22.2071 14.2929C22.5976 14.6834 22.5976 15.3166 22.2071 15.7071L19.4142 18.5L22.2071 21.2929C22.5976 21.6834 22.5976 22.3166 22.2071 22.7071C21.8166 23.0976 21.1834 23.0976 20.7929 22.7071L18 19.9142L15.2071 22.7071C14.8166 23.0976 14.1834 23.0976 13.7929 22.7071C13.4024 22.3166 13.4024 21.6834 13.7929 21.2929L16.5858 18.5L13.7929 15.7071C13.4024 15.3166 13.4024 14.6834 13.7929 14.2929Z',
  d7: 'M7 2C7 1.44772 6.55228 1 6 1C5.44772 1 5 1.44772 5 2V2.44885C5.38032 2.32821 5.78554 2.24208 6.21533 2.17961C6.46328 2.14357 6.72472 2.11476 7 2.09173V2ZM19 2.44885C18.6197 2.32821 18.2145 2.24208 17.7847 2.17961C17.5367 2.14357 17.2753 2.11476 17 2.09173V2C17 1.44772 17.4477 1 18 1C18.5523 1 19 1.44772 19 2V2.44885Z',
  d8: 'M13.0288 2H10.9712C9.02294 1.99997 7.45141 1.99994 6.21533 2.17961C4.92535 2.3671 3.8568 2.76781 3.01802 3.6746C2.18949 4.57031 1.83279 5.69272 1.66416 7.04866C1.49997 8.36894 1.49998 10.0541 1.5 12.1739V12.8261C1.49998 14.9459 1.49997 16.6311 1.66416 17.9513C1.83279 19.3073 2.18949 20.4297 3.01802 21.3254C3.81673 22.1889 4.82495 22.5945 6.03725 22.7929C7.21253 22.9853 8.68841 22.9985 10.4992 22.9999C11.0515 23.0003 11.4996 22.5529 11.5 22.0006C11.5004 21.4483 11.053 21.0003 10.5008 20.9999C8.64508 20.9984 7.34393 20.9802 6.36035 20.8192C5.4138 20.6642 4.88133 20.3945 4.48622 19.9673C4.06263 19.5094 3.79327 18.8656 3.64887 17.7045C3.50182 16.5221 3.5 14.9616 3.5 12.7568V12.2432C3.5 11.3942 3.50027 10.6407 3.509 9.96751C3.51487 9.51472 3.51781 9.28833 3.66385 9.14417C3.8099 9 4.03921 9 4.49783 9H19.5021C19.9607 9 20.19 9 20.3361 9.14415C20.4821 9.28829 20.4851 9.51469 20.491 9.9675C20.4971 10.437 20.4992 10.9465 20.4998 11.501C20.5003 12.0533 20.9485 12.5006 21.5008 12.5C22.0531 12.4994 22.5003 12.0512 22.4998 11.499C22.4977 9.58334 22.4813 8.04001 22.3041 6.81198C22.1236 5.56147 21.7617 4.51759 20.982 3.6746C20.1432 2.76781 19.0747 2.3671 17.7847 2.17961C16.5486 1.99994 14.9771 1.99997 13.0288 2Z',
  d9: 'M17.5 2V6M6.5 2V6',
  d10: 'M21 12V4H3V22H11',
  d11: 'M3 9H21',
  d12: 'M14 15L17.5 18.5M17.5 18.5L21 22M17.5 18.5L21 15M17.5 18.5L14 22',
  d13: 'M16.5 1.5V3H7.5V1.5H5.5V3H3C2.58579 3 2.25 3.33579 2.25 3.75V21.525C2.25 22.0635 2.68652 22.5 3.225 22.5H11V20.55H4.2V9.5H19.8V13.025H21.75V3.75C21.75 3.33579 21.4142 3 21 3H18.5V1.5H16.5Z',
  d14: 'M15.1288 18.293L12.3359 15.5002L13.7502 14.0859L16.543 16.8788L19.3359 14.0859L20.7502 15.5002L17.9573 18.293L20.7502 21.0859L19.3359 22.5002L16.543 19.7073L13.7502 22.5002L12.3359 21.0859L15.1288 18.293Z',
};

export const IconCalendarRemove01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-remove-01-stroke-rounded IconCalendarRemove01StrokeRounded"
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

export const IconCalendarRemove01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-remove-01-duotone-rounded IconCalendarRemove01DuotoneRounded"
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

export const IconCalendarRemove01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-remove-01-twotone-rounded IconCalendarRemove01TwotoneRounded"
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

export const IconCalendarRemove01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-remove-01-solid-rounded IconCalendarRemove01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCalendarRemove01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-remove-01-bulk-rounded IconCalendarRemove01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconCalendarRemove01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-remove-01-stroke-sharp IconCalendarRemove01StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCalendarRemove01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="calendar-remove-01-solid-sharp IconCalendarRemove01SolidSharp"
    >
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCalendarRemove01: TheIconSelfPack = {
  name: 'CalendarRemove01',
  StrokeRounded: IconCalendarRemove01StrokeRounded,
  DuotoneRounded: IconCalendarRemove01DuotoneRounded,
  TwotoneRounded: IconCalendarRemove01TwotoneRounded,
  SolidRounded: IconCalendarRemove01SolidRounded,
  BulkRounded: IconCalendarRemove01BulkRounded,
  StrokeSharp: IconCalendarRemove01StrokeSharp,
  SolidSharp: IconCalendarRemove01SolidSharp,
};