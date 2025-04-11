import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19 12C19 14.2091 17.2091 16 15 16C12.7909 16 11 14.2091 11 12C11 9.79086 12.7909 8 15 8C17.2091 8 19 9.79086 19 12Z',
  d2: 'M22 12H19M11 12H2',
  d3: 'M6 16H6.00808',
  d4: 'M14 4H10C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20L14 20C17.7712 20 19.6569 20 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4Z',
  d5: 'M10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20L10 20C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4ZM15 16C17.2091 16 19 14.2091 19 12C19 9.79086 17.2091 8 15 8C12.7909 8 11 9.79086 11 12C11 14.2091 12.7909 16 15 16Z',
  d6: 'M15 8.75C13.2051 8.75 11.75 10.2051 11.75 12C11.75 13.7949 13.2051 15.25 15 15.25C16.7949 15.25 18.25 13.7949 18.25 12C18.25 10.2051 16.7949 8.75 15 8.75Z',
  d7: 'M9.94326 3.25H14.0561H14.0561C15.8939 3.24999 17.3495 3.24997 18.4887 3.40314C19.6611 3.56076 20.6101 3.89288 21.3584 4.64124C22.1068 5.38961 22.4389 6.33856 22.5965 7.51098C22.7299 8.50295 22.7471 9.73483 22.7494 11.25H19.6908C19.3312 8.98301 17.3678 7.25 14.9997 7.25C12.6315 7.25 10.6681 8.98301 10.3086 11.25H1.25C1.25222 9.73483 1.26944 8.50295 1.40281 7.51098C1.56044 6.33856 1.89256 5.38961 2.64092 4.64124C3.38928 3.89288 4.33823 3.56076 5.51065 3.40314C6.64986 3.24997 8.1055 3.24999 9.94325 3.25H9.94326ZM19.6908 12.75H22.7494C22.7471 14.2652 22.7299 15.4971 22.5965 16.489C22.4389 17.6614 22.1068 18.6104 21.3584 19.3588C20.6101 20.1071 19.6611 20.4392 18.4887 20.5969C17.3495 20.75 15.8938 20.75 14.0561 20.75H9.94322C8.10548 20.75 6.64986 20.75 5.51065 20.5969C4.33823 20.4392 3.38928 20.1071 2.64092 19.3588C1.89256 18.6104 1.56044 17.6614 1.40281 16.489C1.26944 15.4971 1.25222 14.2652 1.25 12.75H10.3086C10.6681 15.017 12.6315 16.75 14.9997 16.75C17.3678 16.75 19.3312 15.017 19.6908 12.75ZM6 15C5.44772 15 5 15.4477 5 16C5 16.5523 5.44772 17 6 17H6.00808C6.56037 17 7.00808 16.5523 7.00808 16C7.00808 15.4477 6.56037 15 6.00808 15H6Z',
  d8: 'M14.0561 3.25H9.94326C8.10551 3.24999 6.64986 3.24997 5.51065 3.40314C4.33823 3.56076 3.38928 3.89288 2.64092 4.64124C1.89256 5.38961 1.56044 6.33856 1.40281 7.51098C1.26944 8.50295 1.25222 9.73483 1.25 11.25H10.3086C10.6681 8.98301 12.6315 7.25 14.9997 7.25C17.3678 7.25 19.3312 8.98301 19.6908 11.25H22.7494C22.7471 9.73483 22.7299 8.50295 22.5965 7.51098C22.4389 6.33856 22.1068 5.38961 21.3584 4.64124C20.6101 3.89288 19.6611 3.56076 18.4887 3.40314C17.3495 3.24997 15.8939 3.24999 14.0561 3.25Z',
  d9: 'M22.7494 12.75H19.6908C19.3312 15.017 17.3678 16.75 14.9997 16.75C12.6315 16.75 10.6681 15.017 10.3086 12.75H1.25C1.25222 14.2652 1.26944 15.4971 1.40281 16.489C1.56044 17.6614 1.89256 18.6104 2.64092 19.3588C3.38928 20.1071 4.33823 20.4392 5.51065 20.5969C6.64986 20.75 8.10548 20.75 9.94322 20.75H14.0561C15.8938 20.75 17.3495 20.75 18.4887 20.5969C19.6611 20.4392 20.6101 20.1071 21.3584 19.3588C22.1068 18.6104 22.4389 17.6614 22.5965 16.489C22.7299 15.4971 22.7471 14.2652 22.7494 12.75Z',
  d10: 'M5 16C5 15.4477 5.44772 15 6 15H6.00808C6.56037 15 7.00808 15.4477 7.00808 16C7.00808 16.5523 6.56037 17 6.00808 17H6C5.44772 17 5 16.5523 5 16Z',
  d11: 'M22 4H2V20H22V4Z',
  d12: 'M1.25 4C1.25 3.58579 1.58579 3.25 2 3.25H22C22.4142 3.25 22.75 3.58579 22.75 4V11.25H19.6911C19.3315 8.98301 17.3682 7.25 15 7.25C12.6318 7.25 10.6685 8.98301 10.3089 11.25H1.25V4ZM19.6911 12.75H22.75V20C22.75 20.4142 22.4142 20.75 22 20.75H2C1.58579 20.75 1.25 20.4142 1.25 20V12.75H10.3089C10.6685 15.017 12.6318 16.75 15 16.75C17.3682 16.75 19.3315 15.017 19.6911 12.75ZM7.00808 15H5V17H7.00808V15Z',
};

export const IconProjectorStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Projector StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconProjectorDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Projector DuotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconProjectorTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Projector TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconProjectorSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Projector SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconProjectorBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Projector BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <g    i-c="o7">
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
      </g>
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconProjectorStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Projector StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s ss sw"
      />
      <path 
        d={d.d11}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconProjectorSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Projector SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfProjector: TheIconSelfPack = [
  'Projector',
  IconProjectorStrokeRounded,
  IconProjectorDuotoneRounded,
  IconProjectorTwotoneRounded,
  IconProjectorSolidRounded,
  IconProjectorBulkRounded,
  IconProjectorStrokeSharp,
  IconProjectorSolidSharp,
];