import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 19L18 19',
  d2: 'M13.5 19L10.5 19',
  d3: 'M6 19H3',
  d4: 'M15.5 5L7.5 13M15.5 13L7.5 5',
  d5: 'M3 18C2.44772 18 2 18.4477 2 19C2 19.5523 2.44772 20 3 20H6C6.55229 20 7 19.5523 7 19C7 18.4477 6.55229 18 6 18H3Z',
  d6: 'M9.5 19C9.5 18.4477 9.94772 18 10.5 18H13.5C14.0523 18 14.5 18.4477 14.5 19C14.5 19.5523 14.0523 20 13.5 20L10.5 20C9.94772 20 9.5 19.5523 9.5 19Z',
  d7: 'M17 19C17 18.4477 17.4477 18 18 18H21C21.5523 18 22 18.4477 22 19C22 19.5523 21.5523 20 21 20L18 20C17.4477 20 17 19.5523 17 19Z',
  d8: 'M6.79289 4.29289C7.18342 3.90237 7.81658 3.90237 8.20711 4.29289L11.5 7.58579L14.7929 4.29289C15.1834 3.90237 15.8166 3.90237 16.2071 4.29289C16.5976 4.68342 16.5976 5.31658 16.2071 5.70711L12.9142 9L16.2071 12.2929C16.5976 12.6834 16.5976 13.3166 16.2071 13.7071C15.8166 14.0976 15.1834 14.0976 14.7929 13.7071L11.5 10.4142L8.20711 13.7071C7.81658 14.0976 7.18342 14.0976 6.79289 13.7071C6.40237 13.3166 6.40237 12.6834 6.79289 12.2929L10.0858 9L6.79289 5.70711C6.40237 5.31658 6.40237 4.68342 6.79289 4.29289Z',
  d9: 'M17 17.4995L21 17.4995L21 19.4995L17 19.4995L17 17.4995Z',
  d10: 'M10 17.4995L14 17.4995L14 19.4995L10 19.4995L10 17.4995Z',
  d11: 'M3 17.4995H7V19.4995H3V17.4995Z',
  d12: 'M12.9143 9.20711L16.2072 12.5L14.793 13.9142L11.5001 10.6213L8.20718 13.9142L6.79297 12.5L10.0859 9.20711L6.79297 5.91421L8.20718 4.5L11.5001 7.79289L14.793 4.5L16.2072 5.91421L12.9143 9.20711Z',
};

export const IconSignalNo02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SignalNo02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSignalNo02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SignalNo02 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSignalNo02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SignalNo02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSignalNo02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SignalNo02 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconSignalNo02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SignalNo02 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconSignalNo02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SignalNo02 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconSignalNo02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SignalNo02 SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSignalNo02: TheIconSelfPack = [
  'SignalNo02',
  IconSignalNo02StrokeRounded,
  IconSignalNo02DuotoneRounded,
  IconSignalNo02TwotoneRounded,
  IconSignalNo02SolidRounded,
  IconSignalNo02BulkRounded,
  IconSignalNo02StrokeSharp,
  IconSignalNo02SolidSharp,
];