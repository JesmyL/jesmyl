import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 12L4 12',
  d2: 'M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7',
  d3: 'M20 11.9998H4M20 11.9998C20 13.3174 15.0001 17 15.0001 17M20 11.9998C20 10.6822 15.0001 7 15.0001 7',
  d4: 'M21 12C21 12.5523 20.5523 13 20 13L3.99998 13C3.4477 13 2.99998 12.5523 2.99998 12C2.99998 11.4477 3.4477 11 3.99998 11L20 11C20.5523 11 21 11.4477 21 12Z',
  d5: 'M18.9721 12C18.8788 11.8452 18.6832 11.5671 18.4694 11.3251C18.0436 10.8432 17.4569 10.2928 16.8444 9.76105C16.2369 9.23357 15.6264 8.74365 15.166 8.38437C14.9364 8.20515 14.5401 7.90576 14.4069 7.80521C13.9623 7.47768 13.8673 6.85173 14.1948 6.40706C14.5223 5.96236 15.1483 5.86736 15.593 6.19487L15.5967 6.19767C15.7411 6.30672 16.1597 6.62291 16.3965 6.80767C16.8736 7.18002 17.5131 7.69303 18.1556 8.25084C18.7931 8.80434 19.4564 9.4216 19.9681 10.0008C20.223 10.2892 20.4614 10.5918 20.6416 10.8906C20.8052 11.162 21 11.5568 21 12C21 12.4431 20.8052 12.838 20.6416 13.1094C20.4614 13.4082 20.223 13.7108 19.9681 13.9992C19.4564 14.5784 18.7931 15.1957 18.1556 15.7492C17.5131 16.307 16.8736 16.82 16.3965 17.1923C16.1597 17.3771 15.7414 17.6931 15.597 17.8021L15.593 17.8051C15.1483 18.1326 14.5223 18.0376 14.1948 17.5929C13.8673 17.1483 13.9623 16.5223 14.4069 16.1948C14.5401 16.0942 14.9364 15.7948 15.166 15.6156C15.6264 15.2564 16.2369 14.7664 16.8444 14.2389C17.4569 13.7072 18.0436 13.1568 18.4694 12.6749C18.6832 12.4329 18.8788 12.1548 18.9721 12Z',
  d6: 'M4 12L19.5715 12M15.0001 17L20 12L15 7',
  d7: 'M14.5267 18L13.1187 16.5858L16.6882 13.0006L3.5 13.0006L3.5 11.0006L16.6886 11.0006L13.1186 7.41422L14.5266 6L20.5 12.0003L14.5267 18Z',
};

export const IconArrowRight02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-02-stroke-rounded IconArrowRight02StrokeRounded"
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

export const IconArrowRight02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-02-duotone-rounded IconArrowRight02DuotoneRounded"
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

export const IconArrowRight02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-02-twotone-rounded IconArrowRight02TwotoneRounded"
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

export const IconArrowRight02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-02-solid-rounded IconArrowRight02SolidRounded"
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

export const IconArrowRight02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-02-bulk-rounded IconArrowRight02BulkRounded"
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

export const IconArrowRight02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-02-stroke-sharp IconArrowRight02StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowRight02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-right-02-solid-sharp IconArrowRight02SolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowRight02: TheIconSelfPack = {
  name: 'ArrowRight02',
  StrokeRounded: IconArrowRight02StrokeRounded,
  DuotoneRounded: IconArrowRight02DuotoneRounded,
  TwotoneRounded: IconArrowRight02TwotoneRounded,
  SolidRounded: IconArrowRight02SolidRounded,
  BulkRounded: IconArrowRight02BulkRounded,
  StrokeSharp: IconArrowRight02StrokeSharp,
  SolidSharp: IconArrowRight02SolidSharp,
};