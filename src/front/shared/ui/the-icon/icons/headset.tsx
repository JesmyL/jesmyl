import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 12C15 10.8954 15.8954 10 17 10C19.2091 10 21 11.7909 21 14C21 16.2091 19.2091 18 17 18C15.8954 18 15 17.1046 15 16V12Z',
  d2: 'M9 12C9 10.8954 8.10457 10 7 10C4.79086 10 3 11.7909 3 14C3 16.2091 4.79086 18 7 18C8.10457 18 9 17.1046 9 16V12Z',
  d3: 'M3 14V11C3 6.02944 7.02944 2 12 2C16.9706 2 21 6.02944 21 11V15.8462C21 17.8545 21 18.8586 20.6476 19.6417C20.2465 20.5329 19.5329 21.2465 18.6417 21.6476C17.8586 22 16.8545 22 14.8462 22H12',
  d4: 'M3 14V11C3 6.02944 7.02944 2 12 2C16.9706 2 21 6.02944 21 11V14',
  d5: 'M4.86682 9.47658C4.48934 9.65491 4.3006 9.74407 4.20271 9.66357C4.10483 9.58306 4.15078 9.40094 4.24269 9.03669C5.11795 5.56763 8.25912 3 12 3C15.7409 3 18.8821 5.56764 19.7573 9.03669C19.8492 9.40094 19.8952 9.58306 19.7973 9.66357C19.6994 9.74407 19.5107 9.65491 19.1332 9.47658C18.4862 9.17093 17.763 9 17 9C15.3431 9 14 10.3431 14 12V16C14 17.6569 15.3431 19 17 19C19.7614 19 22 16.7614 22 14V11C22 5.47715 17.5228 1 12 1C6.47715 1 2 5.47715 2 11V14C2 16.7614 4.23858 19 7 19C8.65685 19 10 17.6569 10 16V12C10 10.3431 8.65685 9 7 9C6.23695 9 5.51383 9.17093 4.86682 9.47658Z',
  d6: 'M21 13C21.5523 13 22 13.4477 22 14V15.8845C22 16.8561 22 17.6399 21.9533 18.2766C21.9052 18.9317 21.8037 19.5095 21.5595 20.0521C21.0581 21.1661 20.1661 22.0581 19.0521 22.5595C18.5095 22.8037 17.9317 22.9052 17.2766 22.9533C16.6399 23 15.8561 23 14.8845 23H12C11.4477 23 11 22.5523 11 22C11 21.4477 11.4477 21 12 21H14.8462C15.8651 21 16.5753 20.9994 17.1302 20.9586C17.6751 20.9186 17.9908 20.8439 18.2312 20.7357C18.8997 20.4349 19.4349 19.8997 19.7357 19.2312C19.8439 18.9908 19.9186 18.6751 19.9586 18.1302C19.9994 17.5753 20 16.8651 20 15.8462V14C20 13.4477 20.4477 13 21 13Z',
  d7: 'M15 10V18H17C19.2091 18 21 16.2091 21 14C21 11.7909 19.2091 10 17 10H15Z',
  d8: 'M9 10V18H7C4.79086 18 3 16.2091 3 14C3 11.7909 4.79086 10 7 10H9Z',
  d9: 'M3 14V11C3 6.02944 7.02944 2 12 2C16.9706 2 21 6.02944 21 11V22H12',
  d10: 'M4.26277 10.0262C4.75108 6.1789 8.029 3.20455 12 3.20455C15.971 3.20455 19.2489 6.1789 19.7372 10.0262C18.9635 9.53724 18.0193 9.25 17 9.25H15.25V17.75H17C18.047 17.75 19.0149 17.4469 19.8 16.9335V20.7955H12V22.75H20.775C21.3135 22.75 21.75 22.3125 21.75 21.7727V11.0227C21.75 5.6254 17.3848 1.25 12 1.25C6.61522 1.25 2.25 5.6254 2.25 11.0227V13.9545H2.27685C2.53037 16.088 4.54827 17.75 7 17.75H8.75V9.25H7C5.98074 9.25 5.03646 9.53724 4.26277 10.0262Z',
};

export const IconHeadsetStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Headset StrokeRounded"
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
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHeadsetDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Headset DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="f o7"
      />
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
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHeadsetTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Headset TwotoneRounded"
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
        i-c="o1 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHeadsetSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Headset SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconHeadsetBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Headset BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconHeadsetStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Headset StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sj sw"
      />
      <path 
        d={d.d8}
        i-c="s sj sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconHeadsetSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Headset SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHeadset: TheIconSelfPack = [
  'Headset',
  IconHeadsetStrokeRounded,
  IconHeadsetDuotoneRounded,
  IconHeadsetTwotoneRounded,
  IconHeadsetSolidRounded,
  IconHeadsetBulkRounded,
  IconHeadsetStrokeSharp,
  IconHeadsetSolidSharp,
];