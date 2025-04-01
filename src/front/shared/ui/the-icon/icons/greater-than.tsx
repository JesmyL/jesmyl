import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 4L15.3306 10.0405C17.5565 11.6545 17.5565 12.3455 15.3306 13.9595L7 20',
  d2: 'M7 4L15.3306 10.0405C16.4435 10.8475 17 11.4238 17 12',
  d3: 'M5.98804 3.26631C5.58278 3.8252 5.70733 4.6068 6.26622 5.01205L14.5968 11.0526C15.1361 11.4436 15.4604 11.7232 15.6432 11.9315C15.6661 11.9575 15.6849 11.9804 15.7003 12.0001C15.6849 12.0198 15.6661 12.0426 15.6432 12.0687C15.4604 12.277 15.1361 12.5565 14.5968 12.9476L6.26622 18.9881C5.70733 19.3934 5.58278 20.175 5.98804 20.7339C6.39329 21.2928 7.17489 21.4173 7.73378 21.0121L16.0644 14.9715C16.638 14.5556 17.1484 14.1435 17.522 13.7179C17.8966 13.2913 18.25 12.7189 18.25 12.0001C18.25 11.2813 17.8966 10.7089 17.5221 10.2823C17.1484 9.85665 16.638 9.44459 16.0644 9.02865L7.73378 2.98813C7.17489 2.58287 6.39329 2.70742 5.98804 3.26631Z',
  d4: 'M7 4L17 12L7 20',
  d5: 'M7.33613 2.99902L5.77439 4.9512L14.2473 11.9994L5.75 19.0477L7.31174 20.9998L18.2493 11.9994L7.33613 2.99902Z',
};

export const IconGreaterThanStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-stroke-rounded IconGreaterThanStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGreaterThanDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-duotone-rounded IconGreaterThanDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGreaterThanTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-twotone-rounded IconGreaterThanTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconGreaterThanSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-solid-rounded IconGreaterThanSolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGreaterThanBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-bulk-rounded IconGreaterThanBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGreaterThanStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-stroke-sharp IconGreaterThanStrokeSharp"
    >
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconGreaterThanSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-solid-sharp IconGreaterThanSolidSharp"
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

export const iconPackOfGreaterThan: TheIconSelfPack = {
  name: 'GreaterThan',
  StrokeRounded: IconGreaterThanStrokeRounded,
  DuotoneRounded: IconGreaterThanDuotoneRounded,
  TwotoneRounded: IconGreaterThanTwotoneRounded,
  SolidRounded: IconGreaterThanSolidRounded,
  BulkRounded: IconGreaterThanBulkRounded,
  StrokeSharp: IconGreaterThanStrokeSharp,
  SolidSharp: IconGreaterThanSolidSharp,
};