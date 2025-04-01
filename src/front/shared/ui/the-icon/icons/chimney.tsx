import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.5 22L14.3835 16.9755C13.7962 14.3331 13.5 11.6344 13.5 8.92749C13.5 8.41525 13.0847 8 12.5725 8H7.42749C6.91525 8 6.5 8.41525 6.5 8.92749C6.5 11.6344 6.20375 14.3331 5.61655 16.9755L4.5 22',
  d2: 'M3 22H17',
  d3: 'M17 2H13C11.3431 2 10 3.34315 10 5',
  d4: 'M20 2H21',
  d5: 'M13 5H19',
  d6: 'M12.5725 8H7.42749C6.91525 8 6.5 8.41525 6.5 8.92749C6.5 11.6344 6.20375 14.3331 5.61655 16.9755L4.5 22H15.5L14.3835 16.9755C13.7962 14.3331 13.5 11.6344 13.5 8.92749C13.5 8.41525 13.0847 8 12.5725 8Z',
  d7: 'M5.75001 8.92749C5.75001 8.00104 6.50104 7.25 7.4275 7.25H12.5725C13.499 7.25 14.25 8.00104 14.25 8.92749C14.25 11.5796 14.5403 14.2238 15.1156 16.8128L16.2321 21.8373C16.2815 22.0594 16.2274 22.2918 16.085 22.4693C15.9427 22.6467 15.7275 22.75 15.5 22.75H4.50001C4.27252 22.75 4.05732 22.6467 3.91498 22.4693C3.77263 22.2918 3.71852 22.0594 3.76787 21.8373L4.88442 16.8128C5.45975 14.2238 5.75001 11.5796 5.75001 8.92749Z',
  d8: 'M2.25 22C2.25 21.5858 2.58579 21.25 3 21.25H17C17.4142 21.25 17.75 21.5858 17.75 22C17.75 22.4142 17.4142 22.75 17 22.75H3C2.58579 22.75 2.25 22.4142 2.25 22Z',
  d9: 'M9.25 5C9.25 2.92893 10.9289 1.25 13 1.25H17C17.4142 1.25 17.75 1.58579 17.75 2C17.75 2.41421 17.4142 2.75 17 2.75H13C11.7574 2.75 10.75 3.75736 10.75 5C10.75 5.41421 10.4142 5.75 10 5.75C9.58579 5.75 9.25 5.41421 9.25 5Z',
  d10: 'M19.25 2C19.25 1.58579 19.5858 1.25 20 1.25H21C21.4142 1.25 21.75 1.58579 21.75 2C21.75 2.41421 21.4142 2.75 21 2.75H20C19.5858 2.75 19.25 2.41421 19.25 2Z',
  d11: 'M12.25 5C12.25 4.58579 12.5858 4.25 13 4.25H19C19.4142 4.25 19.75 4.58579 19.75 5C19.75 5.41421 19.4142 5.75 19 5.75H13C12.5858 5.75 12.25 5.41421 12.25 5Z',
  d12: 'M15.5 22L14.3835 16.9755C13.7962 14.3331 13.5 10.7066 13.5 7.99976H6.5C6.5 10.7066 6.20375 14.3331 5.61655 16.9755L4.5 22',
  d13: 'M14.2504 7.25V8C14.2504 10.6694 14.5439 14.2386 15.116 16.8131L16.4354 22.7502H3.56543L4.8848 16.8131C5.4569 14.2386 5.75039 10.6694 5.75039 8V7.25H14.2504Z',
  d14: 'M2.25 21.25H17.75V22.75H2.25V21.25Z',
  d15: 'M9.25 5C9.25 2.92893 10.9289 1.25 13 1.25H17.75V2.75H13C11.7574 2.75 10.75 3.75736 10.75 5V5.75H9.25V5Z',
  d16: 'M19.25 1.25H21.75V2.75H19.25V1.25Z',
  d17: 'M12.25 4.25H19.75V5.75H12.25V4.25Z',
};

export const IconChimneyStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chimney-stroke-rounded IconChimneyStrokeRounded"
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChimneyDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chimney-duotone-rounded IconChimneyDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChimneyTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chimney-twotone-rounded IconChimneyTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChimneySolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chimney-solid-rounded IconChimneySolidRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconChimneyBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chimney-bulk-rounded IconChimneyBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconChimneyStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chimney-stroke-sharp IconChimneyStrokeSharp"
    >
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChimneySolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chimney-solid-sharp IconChimneySolidSharp"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfChimney: TheIconSelfPack = {
  name: 'Chimney',
  StrokeRounded: IconChimneyStrokeRounded,
  DuotoneRounded: IconChimneyDuotoneRounded,
  TwotoneRounded: IconChimneyTwotoneRounded,
  SolidRounded: IconChimneySolidRounded,
  BulkRounded: IconChimneyBulkRounded,
  StrokeSharp: IconChimneyStrokeSharp,
  SolidSharp: IconChimneySolidSharp,
};