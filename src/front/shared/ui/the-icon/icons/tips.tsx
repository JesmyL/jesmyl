import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 8C20 9.93293 18.433 11.5 16.5 11.5C14.567 11.5 13 9.93293 13 8C13 6.067 14.567 4.5 16.5 4.5C18.433 4.5 20 6.067 20 8Z',
  d2: 'M14.8311 4.92276C14.3768 3.51685 13.0571 2.5 11.5 2.5C9.567 2.5 8 4.067 8 6C8 7.93293 9.567 9.5 11.5 9.5C12.1043 9.5 12.6728 9.34684 13.1689 9.07723',
  d3: 'M4 13.5H6.39482C6.68897 13.5 6.97908 13.5663 7.24217 13.6936L9.28415 14.6816C9.54724 14.8089 9.83735 14.8751 10.1315 14.8751H11.1741C12.1825 14.8751 13 15.6662 13 16.642C13 16.6814 12.973 16.7161 12.9338 16.7269L10.3929 17.4295C9.93707 17.5555 9.449 17.5116 9.025 17.3064L6.84211 16.2503M13 16L17.5928 14.5889C18.407 14.3352 19.2871 14.636 19.7971 15.3423C20.1659 15.8529 20.0157 16.5842 19.4785 16.8942L11.9629 21.2305C11.4849 21.5063 10.9209 21.5736 10.3952 21.4176L4 19.5199',
  d4: 'M6.39482 13.5H4V19.5199L10.3952 21.4176C10.9209 21.5736 11.4849 21.5063 11.9629 21.2305L19.4785 16.8942C20.0157 16.5842 20.1659 15.8529 19.7971 15.3423C19.2871 14.636 18.407 14.3352 17.5928 14.5889L12.9246 16.1378C12.7003 15.4076 12.0015 14.8751 11.1741 14.8751H10.1315C9.83735 14.8751 9.54724 14.8089 9.28415 14.6816L7.24217 13.6936C6.97908 13.5663 6.68897 13.5 6.39482 13.5Z',
  d5: 'M8 6C8 7.93293 9.567 9.5 11.5 9.5C12.1043 9.5 12.6728 9.34684 13.1689 9.07723C12.504 6.73901 14 5.33332 14.8311 4.92276C14.3768 3.51685 13.0571 2.5 11.5 2.5C9.567 2.5 8 4.067 8 6Z',
  d6: 'M14.8311 4.92276C14.3768 3.51685 13.0571 2.5 11.5 2.5C9.567 2.5 8 4.067 8 6C8 7.93293 9.567 9.5 11.5 9.5C12.1043 9.5 12.6728 9.34684 13.1689 9.07723M20 8C20 9.93293 18.433 11.5 16.5 11.5C14.567 11.5 13 9.93293 13 8C13 6.067 14.567 4.5 16.5 4.5C18.433 4.5 20 6.067 20 8Z',
  d7: 'M12.25 8C12.25 5.65278 14.1528 3.75 16.5 3.75C18.8472 3.75 20.75 5.65278 20.75 8C20.75 10.3471 18.8472 12.25 16.5 12.25C14.1528 12.25 12.25 10.3471 12.25 8Z',
  d8: 'M13.8266 15.6907L18.398 14.115C19.1981 13.8353 20.0671 14.1648 20.574 14.9523C20.8952 15.4513 20.7596 16.1621 20.302 16.4583L11.8167 21.9511C11.3436 22.2573 10.7869 22.3315 10.2681 22.1587L3.93389 20.05C3.52536 19.914 3.24976 19.5318 3.24976 19.1012V13.75C3.24976 13.1977 3.69747 12.75 4.24976 12.75H5.67131C5.96111 12.75 6.2466 12.8233 6.50506 12.9636L8.8105 14.215C9.14612 14.3972 9.51572 14.4918 9.89011 14.4918H11.0673C12.0096 14.4918 12.7679 15.2777 12.8407 16.2584V16.3919L10.1114 17.2385C9.66636 17.3766 9.18992 17.3317 8.76973 17.1083L6.43975 15.6286C6.20664 15.4805 5.89766 15.5495 5.74962 15.7826C5.60158 16.0157 5.67054 16.3247 5.90364 16.4727L8.24895 17.9622C8.25858 17.9683 8.26843 17.9741 8.27846 17.9795C8.93615 18.3365 9.69695 18.4141 10.4076 18.1936L13.2764 17.3038C13.6673 17.1826 13.9101 16.8089 13.9101 16.4134C13.9101 16.1871 13.8872 15.9663 13.8437 15.7534C13.8393 15.7319 13.8335 15.711 13.8266 15.6907Z',
  d9: 'M14.4157 2.90847C12.4114 3.72964 10.9995 5.69994 10.9995 8C10.9995 8.80159 11.171 9.56314 11.4793 10.25C9.14137 10.2391 7.24951 8.34039 7.24951 6C7.24951 3.65278 9.15229 1.75 11.4995 1.75C12.629 1.75 13.6549 2.19042 14.4157 2.90847Z',
  d10: 'M4 13.5H7L9.5 14.8751H10.5C12 14.8751 13 16.024 13 16.9998L10 17.9998L7 16.9998M12.9993 16.5L17.2103 15.0963C18.2149 14.7615 19.3064 15.2677 19.6997 16.2509L19.9993 17L10.9993 21.5L4 19.5199',
  d11: 'M12.2498 8.00049C12.2498 5.65327 14.1525 3.75049 16.4998 3.75049C18.847 3.75049 20.7498 5.65327 20.7498 8.00049C20.7498 10.3476 18.847 12.2505 16.4998 12.2505C14.1525 12.2505 12.2498 10.3476 12.2498 8.00049Z',
  d12: 'M14.416 2.90896C12.4116 3.73013 10.9998 5.70043 10.9998 8.00049C10.9998 8.80208 11.1712 9.56363 11.4795 10.2504C9.14161 10.2396 7.24976 8.34088 7.24976 6.00049C7.24976 3.65327 9.15254 1.75049 11.4998 1.75049C12.6292 1.75049 13.6552 2.1909 14.416 2.90896Z',
  d13: 'M17.6584 14.3084L13.7158 15.6912C13.7227 15.7114 13.7284 15.7324 13.7327 15.7539C13.7758 15.9667 13.7984 16.1876 13.7984 16.4139C13.7984 16.8094 13.5582 17.183 13.1714 17.3043L10.3327 18.1941C9.62944 18.4146 8.87661 18.337 8.22581 17.98L5.87586 16.4732L6.40635 15.6291L8.71193 17.1088C9.12772 17.3322 9.59918 17.3771 10.0395 17.239L12.7403 16.3924V16.2589C12.6683 15.2782 11.9179 14.4923 10.9854 14.4923H9.82059C9.45011 14.4923 9.08438 14.3977 8.75227 14.2155L6.47097 12.9641C6.21522 12.8238 5.93273 12.7505 5.64595 12.7505H3.24976V19.8227L10.1946 22.1592C10.708 22.3319 11.2589 22.2578 11.727 21.9515L20.7498 16.0984C20.0347 14.175 18.45 14.0288 17.6584 14.3084Z',
};

export const IconTipsStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tips-stroke-rounded IconTipsStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTipsDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tips-duotone-rounded IconTipsDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTipsTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tips-twotone-rounded IconTipsTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTipsSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tips-solid-rounded IconTipsSolidRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTipsBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tips-bulk-rounded IconTipsBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTipsStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tips-stroke-sharp IconTipsStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTipsSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tips-solid-sharp IconTipsSolidSharp"
    >
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTips: TheIconSelfPack = {
  name: 'Tips',
  StrokeRounded: IconTipsStrokeRounded,
  DuotoneRounded: IconTipsDuotoneRounded,
  TwotoneRounded: IconTipsTwotoneRounded,
  SolidRounded: IconTipsSolidRounded,
  BulkRounded: IconTipsBulkRounded,
  StrokeSharp: IconTipsStrokeSharp,
  SolidSharp: IconTipsSolidSharp,
};