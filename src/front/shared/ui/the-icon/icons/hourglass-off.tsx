import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 5.01953C5 8.8814 8.13401 12.0121 12 12.0121C8.13401 12.0121 5 15.1427 5 19.0046V22.0014M19 19.0046V22.0014',
  d2: 'M19 22.0015H4',
  d3: 'M2 2.02246L22 22.0011',
  d4: 'M6.5625 1.99805H20.0625M16.0405 10.9884C16.7103 10.4387 18.2094 9.32398 18.8236 6.79912C19.097 5.67517 19.027 3.59803 19.027 1.99805',
  d5: 'M5 19.1123V22.1123H19V19.1123L12 12.1123C8.13401 12.1123 5 15.2463 5 19.1123Z',
  d6: 'M5 5.1123C5 8.97829 8.13401 12.1123 12 12.1123C8.13401 12.1123 5 15.2463 5 19.1123V22.1123M19 19.1123V22.1123',
  d7: 'M19 22.1123H4',
  d8: 'M6.5 2.1123H20M15.978 11.1027C16.6478 10.553 18.1469 9.43823 18.7611 6.91337C19.0345 5.78942 18.9645 3.71228 18.9645 2.1123',
  d9: 'M2 2.1123L22 22.1123',
  d10: 'M5 5.02148C5 8.88215 8.13401 12.0118 12 12.0118C8.13401 12.0118 5 15.1415 5 19.0022V21.9981M19 19.0022V21.9981',
  d11: 'M19 21.9985H4',
  d12: 'M6.5625 2.00146H20.0625M16.0405 10.9795C16.7103 10.4305 18.2094 9.31731 18.8236 6.79592C19.097 5.67353 19.027 3.59924 19.027 2.00146',
  d13: 'M2 2.02588L22 21.9983',
  d14: 'M6 2C6 1.44772 6.44772 1 7 1H20C20.5523 1 21 1.44772 21 2C21 2.55228 20.5523 3 20 3V5C20 7.85542 18.6516 10.4034 16.5631 11.8264C16.1067 12.1374 15.4846 12.0195 15.1736 11.5631C14.8626 11.1067 14.9805 10.4846 15.4369 10.1736C16.9438 9.14684 18 7.23723 18 5V3H7C6.44772 3 6 2.55228 6 2Z',
  d15: 'M4 23.0002C3.44772 23.0002 3 22.5524 3 22.0002C3 21.4479 3.44772 21.0002 4 21.0002V19.0002C4 15.9881 5.66458 13.3649 8.12399 12.0002C5.66458 10.6354 4 8.01218 4 5.00015V2.58594L20 18.5859V22.4002C20 22.683 20 22.8244 19.9121 22.9123C19.8243 23.0002 19.6828 23.0002 19.4 23.0002H4Z',
  d16: 'M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z',
  d17: 'M2 2L22 22',
  d18: 'M21.0008 2H5.18164',
  d19: 'M18.9996 2V5C18.9996 7.91873 17.2133 10.4202 14.6742 11.4709M18.9996 19V22H2.85645M4.9996 22V19C4.9996 15.5577 7.82657 12.0057 11.9952 12.0057C8.51016 12.0057 4.9996 9.30693 4.9996 4.95383',
  d20: 'M21.3358 22.75L1.25 2.66421L2.66421 1.25L22.75 21.3358L21.3358 22.75Z',
  d21: 'M17.8125 5.175V2.25H19.75V5.175C19.75 8.11173 18.1374 10.6694 15.7549 12L15.6251 12.0893L14.1482 10.6125C16.295 9.75259 17.8125 7.64215 17.8125 5.175Z',
  d22: 'M19.75 21.75L4.25 21.75V18.825C4.25 15.8883 5.86256 13.3306 8.24512 12C5.86256 10.6694 4.25 8.11173 4.25 5.175V4.24976L6.2936 6.29336C6.74488 8.63956 8.58914 10.4858 10.9255 10.9252L19.75 19.7498V21.75Z',
  d23: 'M21 1V3H6.53577L4.53577 1H21Z',
  d24: 'M3 21H20V23H3V21Z',
};

export const IconHourglassOffStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HourglassOff StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHourglassOffDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HourglassOff DuotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="s sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sr sw"
      />
      <path 
        d={d.d8}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHourglassOffTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HourglassOff TwotoneRounded"
    >
      <path 
        d={d.d10}
        i-c="s sr sw"
      />
      <path 
        d={d.d11}
        i-c="s sr sw"
      />
      <path 
        d={d.d12}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d13}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHourglassOffSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HourglassOff SolidRounded"
    >
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="f"
      />
      <path 
        d={d.d16}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconHourglassOffBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HourglassOff BulkRounded"
    >
      <path 
        d={d.d14}
        i-c="c f fr o7"
      />
      <path 
        d={d.d15}
        i-c="f"
      />
      <path 
        d={d.d16}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconHourglassOffStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HourglassOff StrokeSharp"
    >
      <path 
        d={d.d17}
        i-c="s sj sw"
      />
      <path 
        d={d.d18}
        i-c="s sj sw"
      />
      <path 
        d={d.d19}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconHourglassOffSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HourglassOff SolidSharp"
    >
      <path 
        d={d.d20}
        i-c="f"
      />
      <path 
        d={d.d21}
        i-c="f"
      />
      <path 
        d={d.d22}
        i-c="f"
      />
      <path 
        d={d.d23}
        i-c="f"
      />
      <path 
        d={d.d24}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHourglassOff: TheIconSelfPack = [
  'HourglassOff',
  IconHourglassOffStrokeRounded,
  IconHourglassOffDuotoneRounded,
  IconHourglassOffTwotoneRounded,
  IconHourglassOffSolidRounded,
  IconHourglassOffBulkRounded,
  IconHourglassOffStrokeSharp,
  IconHourglassOffSolidSharp,
];