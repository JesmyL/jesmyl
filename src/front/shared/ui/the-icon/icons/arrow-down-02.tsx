import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 20L12 4',
  d2: 'M17 15C17 15 13.3176 20 12 20C10.6824 20 7 15 7 15',
  d3: 'M12 20V4M12 20C13.3176 20 17 15.0001 17 15.0001M12 20C10.6824 20 7 15.0001 7 15.0001',
  d4: 'M12 21C12.5523 21 13 20.5523 13 20L13 3.99998C13 3.4477 12.5523 2.99998 12 2.99998C11.4477 2.99998 11 3.4477 11 3.99998L11 20C11 20.5523 11.4477 21 12 21Z',
  d5: 'M12 18.9721C11.8452 18.8788 11.5671 18.6832 11.3251 18.4694C10.8432 18.0436 10.2928 17.4569 9.76105 16.8444C9.23357 16.2369 8.74365 15.6264 8.38437 15.166C8.20515 14.9364 7.90576 14.5401 7.80521 14.4069C7.47768 13.9623 6.85173 13.8673 6.40706 14.1948C5.96236 14.5223 5.86736 15.1483 6.19487 15.593L6.19767 15.5967C6.30672 15.7411 6.62291 16.1597 6.80767 16.3965C7.18002 16.8736 7.69303 17.5131 8.25084 18.1556C8.80434 18.7931 9.4216 19.4564 10.0008 19.9681C10.2892 20.223 10.5918 20.4614 10.8906 20.6416C11.162 20.8052 11.5568 21 12 21C12.4431 21 12.838 20.8052 13.1094 20.6416C13.4082 20.4614 13.7108 20.223 13.9992 19.9681C14.5784 19.4564 15.1957 18.7931 15.7492 18.1556C16.307 17.5131 16.82 16.8736 17.1923 16.3965C17.3771 16.1597 17.6931 15.7414 17.8021 15.597L17.8051 15.593C18.1326 15.1483 18.0376 14.5223 17.5929 14.1948C17.1483 13.8673 16.5223 13.9623 16.1948 14.4069C16.0942 14.5401 15.7948 14.9364 15.6156 15.166C15.2564 15.6264 14.7664 16.2369 14.2389 16.8444C13.7072 17.4569 13.1568 18.0436 12.6749 18.4694C12.4329 18.6832 12.1548 18.8788 12 18.9721Z',
  d6: 'M12 4L12 19.6008M17 15.0001L12 20L7 15',
  d7: 'M18 14.5267L16.5858 13.1187L13.0006 16.6882L13.0006 3.5H11.0006L11.0006 16.6886L7.41422 13.1186L6 14.5266L12.0003 20.5L18 14.5267Z',
};

export const IconArrowDown02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-02-stroke-rounded IconArrowDown02StrokeRounded"
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

export const IconArrowDown02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-02-duotone-rounded IconArrowDown02DuotoneRounded"
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

export const IconArrowDown02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-02-twotone-rounded IconArrowDown02TwotoneRounded"
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

export const IconArrowDown02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-02-solid-rounded IconArrowDown02SolidRounded"
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

export const IconArrowDown02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-02-bulk-rounded IconArrowDown02BulkRounded"
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

export const IconArrowDown02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-02-stroke-sharp IconArrowDown02StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDown02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-02-solid-sharp IconArrowDown02SolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowDown02: TheIconSelfPack = {
  name: 'ArrowDown02',
  StrokeRounded: IconArrowDown02StrokeRounded,
  DuotoneRounded: IconArrowDown02DuotoneRounded,
  TwotoneRounded: IconArrowDown02TwotoneRounded,
  SolidRounded: IconArrowDown02SolidRounded,
  BulkRounded: IconArrowDown02BulkRounded,
  StrokeSharp: IconArrowDown02StrokeSharp,
  SolidSharp: IconArrowDown02SolidSharp,
};