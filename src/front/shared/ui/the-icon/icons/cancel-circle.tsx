import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.7494 15L9.75 9M9.75064 15L15.75 9',
  d2: 'M22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12Z',
  d3: 'M12.75 22.75C6.81294 22.75 2 17.9371 2 12C2 6.06294 6.81294 1.25 12.75 1.25C18.6871 1.25 23.5 6.06294 23.5 12C23.5 17.9371 18.6871 22.75 12.75 22.75ZM16.4571 9.70713C16.8476 9.31662 16.8476 8.68345 16.4571 8.29292C16.0666 7.90238 15.4335 7.90236 15.0429 8.29287L12.7498 10.5858L10.4571 8.29326C10.0665 7.90275 9.43338 7.90277 9.04287 8.29331C8.65236 8.68385 8.65238 9.31701 9.04292 9.70752L11.3355 12L9.04292 14.2925C8.65238 14.683 8.65236 15.3162 9.04287 15.7067C9.43338 16.0972 10.0665 16.0972 10.4571 15.7067L12.7498 13.4142L15.0429 15.7071C15.4335 16.0976 16.0666 16.0976 16.4571 15.7071C16.8476 15.3165 16.8476 14.6834 16.4571 14.2929L14.1641 12L16.4571 9.70713Z',
  d4: 'M2 12C2 17.9371 6.81294 22.75 12.75 22.75C18.6871 22.75 23.5 17.9371 23.5 12C23.5 6.06294 18.6871 1.25 12.75 1.25C6.81294 1.25 2 6.06294 2 12Z',
  d5: 'M16.4571 8.29292C16.8476 8.68345 16.8476 9.31662 16.4571 9.70713L14.1641 12L16.4571 14.2929C16.8476 14.6834 16.8476 15.3165 16.4571 15.7071C16.0666 16.0976 15.4335 16.0976 15.0429 15.7071L12.7498 13.4142L10.4571 15.7067C10.0665 16.0972 9.43338 16.0972 9.04287 15.7067C8.65236 15.3162 8.65238 14.683 9.04292 14.2925L11.3355 12L9.04292 9.70752C8.65238 9.31701 8.65236 8.68385 9.04287 8.29331C9.43338 7.90277 10.0665 7.90275 10.4571 8.29326L12.7498 10.5858L15.0429 8.29287C15.4335 7.90236 16.0666 7.90238 16.4571 8.29292Z',
  d6: 'M16.7491 16L8.75 8M8.75085 16L16.75 8',
  d7: 'M12.75 22.75C6.81294 22.75 2 17.9371 2 12C2 6.06294 6.81294 1.25 12.75 1.25C18.6871 1.25 23.5 6.06294 23.5 12C23.5 17.9371 18.6871 22.75 12.75 22.75ZM16.043 7.29285L12.7498 10.5858L9.45714 7.29337L8.04297 8.70763L11.3355 12L8.04297 15.2923L9.45714 16.7066L12.7498 13.4141L16.043 16.7071L17.4571 15.2928L14.164 12L17.4571 8.70711L16.043 7.29285Z',
};

export const IconCancelCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircle StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconCancelCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircle DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconCancelCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircle TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconCancelCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircle SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCancelCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircle BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCancelCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircle StrokeSharp"
    >
      <path 
        d={d.d6}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconCancelCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircle SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCancelCircle: TheIconSelfPack = [
  'CancelCircle',
  IconCancelCircleStrokeRounded,
  IconCancelCircleDuotoneRounded,
  IconCancelCircleTwotoneRounded,
  IconCancelCircleSolidRounded,
  IconCancelCircleBulkRounded,
  IconCancelCircleStrokeSharp,
  IconCancelCircleSolidSharp,
];