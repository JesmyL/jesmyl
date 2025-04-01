import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 17C18.2998 17 19.9497 17 20.9749 15.9749C22 14.9497 22 13.2998 22 10C22 6.70017 22 5.05025 20.9749 4.02513C19.9497 3 18.2998 3 15 3C11.7002 3 10.0503 3 9.02513 4.02513C8 5.05025 8 6.70017 8 10C8 13.2998 8 14.9497 9.02513 15.9749C10.0503 17 11.7002 17 15 17Z',
  d2: 'M2 14.4201L3.11013 13.0744C3.70104 12.3581 3.99649 12 4.36364 12L4.36364 13C4.36364 16.7712 4.36364 18.6569 5.53521 19.8284C6.70678 21 8.5924 21 12.3636 21L13 21',
  d3: 'M8 10C8 13.2998 8 14.9497 9.02513 15.9749C10.0503 17 11.7002 17 15 17C18.2998 17 19.9497 17 20.9749 15.9749C22 14.9497 22 13.2998 22 10C22 6.70017 22 5.05025 20.9749 4.02513C19.9497 3 18.2998 3 15 3C11.7002 3 10.0503 3 9.02513 4.02513C8 5.05025 8 6.70017 8 10Z',
  d4: 'M14.9433 2.25C13.3407 2.24998 12.0617 2.24997 11.0586 2.38483C10.0224 2.52415 9.16896 2.81966 8.49382 3.4948C7.81868 4.16994 7.52317 5.02335 7.38385 6.05961C7.24899 7.0627 7.249 8.34166 7.24902 9.94426V10.0557C7.249 11.6583 7.24899 12.9373 7.38385 13.9404C7.52317 14.9767 7.81868 15.8301 8.49382 16.5052C9.16896 17.1803 10.0224 17.4759 11.0586 17.6152C12.0617 17.75 13.3407 17.75 14.9433 17.75H15.0548C16.6574 17.75 17.9363 17.75 18.9394 17.6152C19.9757 17.4759 20.8291 17.1803 21.5042 16.5052C22.1794 15.8301 22.4749 14.9767 22.6142 13.9404C22.7491 12.9373 22.749 11.6583 22.749 10.0557V10.0557V9.94426V9.94425C22.749 8.34166 22.7491 7.0627 22.6142 6.05961C22.4749 5.02335 22.1794 4.16994 21.5042 3.4948C20.8291 2.81966 19.9757 2.52415 18.9394 2.38483C17.9363 2.24997 16.6574 2.24998 15.0548 2.25H15.0548H14.9433H14.9433Z',
  d5: 'M5.61364 11.75C5.61364 11.1977 5.16592 10.75 4.61364 10.75C4.05917 10.75 3.6586 11.0377 3.3918 11.2845C3.14767 11.5103 2.88862 11.8244 2.62436 12.1449C2.61249 12.1593 2.60062 12.1737 2.58874 12.1881L1.47861 13.5338C1.12716 13.9598 1.18761 14.5901 1.61364 14.9415C2.03967 15.293 2.66994 15.2325 3.02139 14.8065L3.61582 14.0859C3.62271 15.3399 3.65121 16.3962 3.769 17.2723C3.93036 18.4725 4.27555 19.483 5.0781 20.2855C5.88066 21.0881 6.89116 21.4333 8.0913 21.5946C9.24726 21.75 10.717 21.75 12.5405 21.75H13.25C13.8023 21.75 14.25 21.3023 14.25 20.75C14.25 20.1977 13.8023 19.75 13.25 19.75H12.6136C10.6998 19.75 9.36493 19.7479 8.3578 19.6125C7.37943 19.4809 6.86133 19.2403 6.49232 18.8713C6.1233 18.5023 5.8827 17.9842 5.75117 17.0058C5.61576 15.9987 5.61364 14.6639 5.61364 12.75V11.75Z',
  d6: 'M9 16.5001H22V3.50012H9V16.5001Z',
  d7: 'M2 13.5L5 10.5001V20.5H14',
  d8: 'M9 17.25C8.58579 17.25 8.25 16.9142 8.25 16.5L8.25 3.5C8.25 3.08579 8.58579 2.75 9 2.75L22 2.75C22.4142 2.75 22.75 3.08579 22.75 3.5L22.75 16.5C22.75 16.9142 22.4142 17.25 22 17.25L9 17.25Z',
  d9: 'M1.25 12.6643L4.54291 9.54302C4.82891 9.25704 5.25903 9.17149 5.6327 9.32628C6.00636 9.48106 6.25 9.84569 6.25 10.2502L6.25 19.25H14.25V21.25H5.25C4.69771 21.25 4.25 20.8023 4.25 20.25V12.6643L2.66417 14.0785L1.25 12.6643Z',
};

export const IconRotateBottomRightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rotate-bottom-right-stroke-rounded IconRotateBottomRightStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconRotateBottomRightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rotate-bottom-right-duotone-rounded IconRotateBottomRightDuotoneRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconRotateBottomRightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rotate-bottom-right-twotone-rounded IconRotateBottomRightTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconRotateBottomRightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rotate-bottom-right-solid-rounded IconRotateBottomRightSolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRotateBottomRightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rotate-bottom-right-bulk-rounded IconRotateBottomRightBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRotateBottomRightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rotate-bottom-right-stroke-sharp IconRotateBottomRightStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconRotateBottomRightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rotate-bottom-right-solid-sharp IconRotateBottomRightSolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRotateBottomRight: TheIconSelfPack = {
  name: 'RotateBottomRight',
  StrokeRounded: IconRotateBottomRightStrokeRounded,
  DuotoneRounded: IconRotateBottomRightDuotoneRounded,
  TwotoneRounded: IconRotateBottomRightTwotoneRounded,
  SolidRounded: IconRotateBottomRightSolidRounded,
  BulkRounded: IconRotateBottomRightBulkRounded,
  StrokeSharp: IconRotateBottomRightStrokeSharp,
  SolidSharp: IconRotateBottomRightSolidSharp,
};