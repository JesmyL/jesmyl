import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 12L20 12',
  d2: 'M8.99996 17C8.99996 17 4.00001 13.3176 4 12C3.99999 10.6824 9 7 9 7',
  d3: 'M4 11.9998H20M4 11.9998C4.00001 13.3174 8.9998 17 8.9998 17M4 11.9998C3.99999 10.6822 8.99984 7 8.99984 7',
  d4: 'M3 12C3 11.4477 3.44772 11 4 11L20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13L4 13C3.44772 13 3 12.5523 3 12Z',
  d5: 'M5.02786 12C5.12116 12.1548 5.31675 12.4329 5.53062 12.6749C5.95637 13.1568 6.5431 13.7072 7.1556 14.2389C7.76313 14.7664 8.3736 15.2564 8.83397 15.6156C9.06363 15.7948 9.45995 16.0942 9.59308 16.1948C10.0377 16.5223 10.1327 17.1483 9.8052 17.5929C9.47769 18.0376 8.85169 18.1326 8.40699 17.8051L8.40328 17.8023C8.2589 17.6933 7.84028 17.3771 7.60352 17.1923C7.1264 16.82 6.48686 16.307 5.84439 15.7492C5.20689 15.1957 4.54362 14.5784 4.03187 13.9992C3.777 13.7108 3.53856 13.4082 3.35842 13.1094C3.19484 12.838 3.00002 12.4432 3 12C3.00002 11.5569 3.19484 11.162 3.35842 10.8906C3.53856 10.5918 3.777 10.2892 4.03186 10.0008C4.54362 9.4216 5.20689 8.80434 5.84439 8.25084C6.48686 7.69303 7.1264 7.18002 7.60352 6.80767C7.84028 6.62291 8.25863 6.30693 8.40301 6.19788L8.40699 6.19487C8.85169 5.86736 9.47769 5.96236 9.8052 6.40706C10.1327 6.85173 10.0377 7.47768 9.59308 7.80521C9.45995 7.90576 9.06363 8.20515 8.83397 8.38437C8.3736 8.74365 7.76313 9.23357 7.1556 9.76105C6.5431 10.2928 5.95637 10.8432 5.53062 11.3251C5.31675 11.5671 5.12116 11.8452 5.02786 12Z',
  d6: 'M20 12L4.44345 12M8.99996 17L4 12L9 7',
  d7: 'M9.47326 18L10.8813 16.5858L7.31184 13.0006L20.5 13.0006V11.0006L7.3114 11.0006L10.8814 7.41422L9.47338 6L3.5 12.0003L9.47326 18Z',
};

export const IconArrowLeft02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-02-stroke-rounded IconArrowLeft02StrokeRounded"
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

export const IconArrowLeft02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-02-duotone-rounded IconArrowLeft02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-02-twotone-rounded IconArrowLeft02TwotoneRounded"
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

export const IconArrowLeft02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-02-solid-rounded IconArrowLeft02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-02-bulk-rounded IconArrowLeft02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-02-stroke-sharp IconArrowLeft02StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowLeft02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-left-02-solid-sharp IconArrowLeft02SolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowLeft02: TheIconSelfPack = {
  name: 'ArrowLeft02',
  StrokeRounded: IconArrowLeft02StrokeRounded,
  DuotoneRounded: IconArrowLeft02DuotoneRounded,
  TwotoneRounded: IconArrowLeft02TwotoneRounded,
  SolidRounded: IconArrowLeft02SolidRounded,
  BulkRounded: IconArrowLeft02BulkRounded,
  StrokeSharp: IconArrowLeft02StrokeSharp,
  SolidSharp: IconArrowLeft02SolidSharp,
};