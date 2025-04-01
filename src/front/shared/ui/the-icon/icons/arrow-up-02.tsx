import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 4L12 20',
  d2: 'M17 8.99996C17 8.99996 13.3176 4.00001 12 4C10.6824 3.99999 7 9 7 9',
  d3: 'M12.0002 4V20M12.0002 4C13.3178 4.00001 17 8.99996 17 8.99996M12.0002 4C10.6826 3.99999 7 9 7 9',
  d4: 'M12 3C12.5523 3 13 3.44772 13 4L13 20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20L11 4C11 3.44772 11.4477 3 12 3Z',
  d5: 'M12 5.02786C11.8452 5.12116 11.5671 5.31675 11.3251 5.53062C10.8432 5.95637 10.2928 6.5431 9.76105 7.1556C9.23357 7.76313 8.74365 8.3736 8.38437 8.83397C8.20515 9.06363 7.90576 9.45995 7.80521 9.59308C7.47768 10.0377 6.85173 10.1327 6.40706 9.8052C5.96236 9.47769 5.86736 8.85169 6.19487 8.40699L6.19767 8.40328C6.30672 8.2589 6.62291 7.84028 6.80767 7.60352C7.18002 7.1264 7.69303 6.48686 8.25084 5.84439C8.80434 5.20689 9.4216 4.54362 10.0008 4.03187C10.2892 3.777 10.5918 3.53856 10.8906 3.35842C11.162 3.19484 11.5568 3.00002 12 3C12.4431 3.00002 12.838 3.19484 13.1094 3.35842C13.4082 3.53856 13.7108 3.777 13.9992 4.03187C14.5784 4.54362 15.1957 5.20689 15.7492 5.84439C16.307 6.48686 16.82 7.1264 17.1923 7.60352C17.3771 7.84028 17.6931 8.25863 17.8021 8.40301L17.8051 8.40699C18.1326 8.85169 18.0376 9.47769 17.5929 9.8052C17.1483 10.1327 16.5223 10.0377 16.1948 9.59308C16.0942 9.45995 15.7948 9.06363 15.6156 8.83397C15.2564 8.3736 14.7664 7.76313 14.2389 7.1556C13.7072 6.5431 13.1568 5.95637 12.6749 5.53062C12.4329 5.31675 12.1548 5.12116 12 5.02786Z',
  d6: 'M12.0002 20L12 4.44178M17 8.99996L12 4L7 9',
  d7: 'M18 9.47326L16.5858 10.8813L13.0006 7.31184L13.0006 20.5H11.0006L11.0006 7.3114L7.41422 10.8814L6 9.47338L12.0003 3.5L18 9.47326Z',
};

export const IconArrowUp02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-02-stroke-rounded IconArrowUp02StrokeRounded"
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

export const IconArrowUp02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-02-duotone-rounded IconArrowUp02DuotoneRounded"
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

export const IconArrowUp02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-02-twotone-rounded IconArrowUp02TwotoneRounded"
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

export const IconArrowUp02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-02-solid-rounded IconArrowUp02SolidRounded"
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

export const IconArrowUp02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-02-bulk-rounded IconArrowUp02BulkRounded"
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

export const IconArrowUp02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-02-stroke-sharp IconArrowUp02StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowUp02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-02-solid-sharp IconArrowUp02SolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowUp02: TheIconSelfPack = {
  name: 'ArrowUp02',
  StrokeRounded: IconArrowUp02StrokeRounded,
  DuotoneRounded: IconArrowUp02DuotoneRounded,
  TwotoneRounded: IconArrowUp02TwotoneRounded,
  SolidRounded: IconArrowUp02SolidRounded,
  BulkRounded: IconArrowUp02BulkRounded,
  StrokeSharp: IconArrowUp02StrokeSharp,
  SolidSharp: IconArrowUp02SolidSharp,
};