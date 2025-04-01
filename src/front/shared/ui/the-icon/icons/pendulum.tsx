import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 3L20 3',
  d2: 'M6.5 3V16',
  d3: 'M11.5 3V16',
  d4: 'M19.5 16L17 3',
  d5: 'M3.25 18.5C3.25 16.7051 4.70507 15.25 6.5 15.25C8.29493 15.25 9.75 16.7051 9.75 18.5C9.75 20.2949 8.29493 21.75 6.5 21.75C4.70507 21.75 3.25 20.2949 3.25 18.5Z',
  d6: 'M8.25 18.5C8.25 16.7051 9.70507 15.25 11.5 15.25C13.2949 15.25 14.75 16.7051 14.75 18.5C14.75 20.2949 13.2949 21.75 11.5 21.75C9.70507 21.75 8.25 20.2949 8.25 18.5Z',
  d7: 'M16.5 18.5C16.5 16.7051 17.9551 15.25 19.75 15.25C21.5449 15.25 23 16.7051 23 18.5C23 20.2949 21.5449 21.75 19.75 21.75C17.9551 21.75 16.5 20.2949 16.5 18.5Z',
  d8: 'M18.2106 4.25019L20 4.25019C20.5523 4.25019 21 3.80247 21 3.25018C21 2.6979 20.5523 2.25019 20 2.25019L17.0203 2.25019C17.0076 2.24994 16.9947 2.24994 16.9819 2.25019L11.5013 2.25019C11.5009 2.25019 11.5004 2.25018 11.5 2.25018C11.4996 2.25018 11.4991 2.25019 11.4987 2.25019L6.50089 2.25019C6.50059 2.25018 6.5003 2.25018 6.5 2.25018C6.4997 2.25018 6.49941 2.25018 6.49911 2.25019L2 2.25018C1.44772 2.25018 1 2.6979 1 3.25018C1 3.80247 1.44772 4.25018 2 4.25018L5.5 4.25019V16.2502C5.5 16.8025 5.94772 17.2502 6.5 17.2502C7.05228 17.2502 7.5 16.8025 7.5 16.2502V4.25019L10.5 4.25019V16.2502C10.5 16.8025 10.9477 17.2502 11.5 17.2502C12.0523 17.2502 12.5 16.8025 12.5 16.2502V4.25019L16.174 4.25019L18.518 16.439C18.6223 16.9814 19.1465 17.3365 19.6888 17.2322C20.2312 17.1279 20.5863 16.6037 20.482 16.0613L18.2106 4.25019Z',
  d9: 'M18.2106 4.25L20.482 16.0612C20.5863 16.6035 20.2312 17.1277 19.6888 17.232C19.1465 17.3363 18.6223 16.9812 18.518 16.4388L16.174 4.25H18.2106Z',
  d10: 'M12.5 4.25V16.25C12.5 16.8023 12.0523 17.25 11.5 17.25C10.9477 17.25 10.5 16.8023 10.5 16.25V4.25L12.5 4.25Z',
  d11: 'M7.5 4.25V16.25C7.5 16.8023 7.05228 17.25 6.5 17.25C5.94772 17.25 5.5 16.8023 5.5 16.25V4.25H7.5Z',
  d12: 'M21 3.25018C21 3.80247 20.5523 4.25019 20 4.25019L2 4.25018C1.44772 4.25018 1 3.80247 1 3.25018C1 2.6979 1.44772 2.25018 2 2.25018L6.49911 2.25019L6.50089 2.25019L11.4987 2.25019L11.5 2.25018L11.5013 2.25019L16.9819 2.25019C16.9947 2.24994 17.0076 2.24994 17.0203 2.25019L20 2.25019C20.5523 2.25019 21 2.6979 21 3.25018Z',
  d13: 'M6.25 21.75C7.25522 21.75 8.15385 21.2936 8.75 20.5768C9.34615 21.2936 10.2448 21.75 11.25 21.75C13.0449 21.75 14.5 20.2949 14.5 18.5C14.5 17.054 13.5556 15.8285 12.25 15.4067V4.25H15.9235L17.8754 15.4498C16.6347 15.9074 15.75 17.1004 15.75 18.5C15.75 20.2949 17.2051 21.75 19 21.75C20.7949 21.75 22.25 20.2949 22.25 18.5C22.25 17.0165 21.256 15.7651 19.8978 15.3756L17.9601 4.25H19.75V2.25L1.75 2.25V4.25H5.25V15.4067C3.94437 15.8285 3 17.054 3 18.5C3 20.2949 4.45507 21.75 6.25 21.75ZM10.25 15.4067C9.65741 15.5982 9.13923 15.9552 8.75 16.4232C8.36077 15.9552 7.8426 15.5982 7.25 15.4067V4.25H10.25V15.4067Z',
};

export const IconPendulumStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pendulum-stroke-rounded IconPendulumStrokeRounded"
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
      <circle 
        cx="6.5" 
        cy="18.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="11.5" 
        cy="18.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="19.5" 
        cy="18.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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

export const IconPendulumDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pendulum-duotone-rounded IconPendulumDuotoneRounded"
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
      <circle 
        opacity="var(--icon-opacity)" 
        cx="6.5" 
        cy="18.5" 
        r="2.5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="6.5" 
        cy="18.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="11.5" 
        cy="18.5" 
        r="2.5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="11.5" 
        cy="18.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="19.5" 
        cy="18.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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

export const IconPendulumTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pendulum-twotone-rounded IconPendulumTwotoneRounded"
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
      <circle 
        cx="6.5" 
        cy="18.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="11.5" 
        cy="18.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="19.5" 
        cy="18.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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

export const IconPendulumSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pendulum-solid-rounded IconPendulumSolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconPendulumBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pendulum-bulk-rounded IconPendulumBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
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
      </g>
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPendulumStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pendulum-stroke-sharp IconPendulumStrokeSharp"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="6.5" 
        cy="18.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="11.5" 
        cy="18.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="19.5" 
        cy="18.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPendulumSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pendulum-solid-sharp IconPendulumSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPendulum: TheIconSelfPack = {
  name: 'Pendulum',
  StrokeRounded: IconPendulumStrokeRounded,
  DuotoneRounded: IconPendulumDuotoneRounded,
  TwotoneRounded: IconPendulumTwotoneRounded,
  SolidRounded: IconPendulumSolidRounded,
  BulkRounded: IconPendulumBulkRounded,
  StrokeSharp: IconPendulumStrokeSharp,
  SolidSharp: IconPendulumSolidSharp,
};