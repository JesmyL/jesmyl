import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.5 8.5L12 12M12 12L8.5 15.5M12 12L15.5 15.5M12 12L8.5 8.5',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.20711 7.79289C8.81658 7.40237 8.18342 7.40237 7.79289 7.79289C7.40237 8.18342 7.40237 8.81658 7.79289 9.20711L10.5858 12L7.79289 14.7929C7.40237 15.1834 7.40237 15.8166 7.79289 16.2071C8.18342 16.5976 8.81658 16.5976 9.20711 16.2071L12 13.4142L14.7929 16.2071C15.1834 16.5976 15.8166 16.5976 16.2071 16.2071C16.5976 15.8166 16.5976 15.1834 16.2071 14.7929L13.4142 12L16.2071 9.20711C16.5976 8.81658 16.5976 8.18342 16.2071 7.79289C15.8166 7.40237 15.1834 7.40237 14.7929 7.79289L12 10.5858L9.20711 7.79289Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M7.79289 7.79289C8.18342 7.40237 8.81658 7.40237 9.20711 7.79289L12 10.5858L14.7929 7.79289C15.1834 7.40237 15.8166 7.40237 16.2071 7.79289C16.5976 8.18342 16.5976 8.81658 16.2071 9.20711L13.4142 12L16.2071 14.7929C16.5976 15.1834 16.5976 15.8166 16.2071 16.2071C15.8166 16.5976 15.1834 16.5976 14.7929 16.2071L12 13.4142L9.20711 16.2071C8.81658 16.5976 8.18342 16.5976 7.79289 16.2071C7.40237 15.8166 7.40237 15.1834 7.79289 14.7929L10.5858 12L7.79289 9.20711C7.40237 8.81658 7.40237 8.18342 7.79289 7.79289Z',
  d5: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM16.2072 9.20718L13.4143 12.0001L16.2072 14.793L14.793 16.2072L12.0001 13.4143L9.20718 16.2072L7.79297 14.793L10.5859 12.0001L7.79297 9.20718L9.20718 7.79297L12.0001 10.5859L14.793 7.79297L16.2072 9.20718Z',
};

export const IconMultiplicationSignCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSignCircle StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconMultiplicationSignCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSignCircle DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMultiplicationSignCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSignCircle TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconMultiplicationSignCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSignCircle SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMultiplicationSignCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSignCircle BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMultiplicationSignCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSignCircle StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconMultiplicationSignCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MultiplicationSignCircle SolidSharp"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMultiplicationSignCircle: TheIconSelfPack = [
  'MultiplicationSignCircle',
  IconMultiplicationSignCircleStrokeRounded,
  IconMultiplicationSignCircleDuotoneRounded,
  IconMultiplicationSignCircleTwotoneRounded,
  IconMultiplicationSignCircleSolidRounded,
  IconMultiplicationSignCircleBulkRounded,
  IconMultiplicationSignCircleStrokeSharp,
  IconMultiplicationSignCircleSolidSharp,
];