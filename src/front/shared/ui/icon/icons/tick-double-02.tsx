import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 13.8333L6 17.5L7.02402 16.4272M16.5 6.5L10.437 12.8517',
  d2: 'M7.5 13.8333L11 17.5L21.5 6.5',
  d3: 'M17.1905 5.77665C17.59 6.15799 17.6047 6.79098 17.2234 7.19048L11.1604 13.5422C10.7791 13.9417 10.1461 13.9564 9.74656 13.575C9.34706 13.1937 9.33234 12.5607 9.71368 12.1612L15.7766 5.80953C16.158 5.41003 16.791 5.39531 17.1905 5.77665ZM1.80953 13.11C2.20902 12.7286 2.84202 12.7434 3.22336 13.1429L6.0325 16.0858C6.40428 15.8826 6.87963 15.9321 7.20249 16.2403C7.60199 16.6216 7.61671 17.2546 7.23537 17.6541L6.72336 18.1905C6.53466 18.3882 6.27328 18.5 6 18.5C5.72672 18.5 5.46534 18.3882 5.27665 18.1905L1.77665 14.5238C1.39531 14.1243 1.41003 13.4913 1.80953 13.11Z',
  d4: 'M22.1905 5.77665C22.59 6.15799 22.6047 6.79098 22.2234 7.19048L11.7234 18.1905C11.5347 18.3882 11.2733 18.5 11 18.5C10.7267 18.5 10.4653 18.3882 10.2766 18.1905L6.77665 14.5238C6.39531 14.1243 6.41003 13.4913 6.80953 13.11C7.20902 12.7286 7.84202 12.7434 8.22336 13.1429L11 16.0517L20.7766 5.80953C21.158 5.41003 21.791 5.39531 22.1905 5.77665Z',
  d5: 'M2.5 13.8333L6 17.5L7.02402 16.4272M16.5 6.5L10 13.3095',
  d6: 'M17.196 6.93417L10.6967 13.5517L9.25 12.1708L15.7493 5.55322L17.196 6.93417ZM1.75 14.0755L3.19671 12.6946L5.97336 15.6034L6.27402 15.2885L7.72073 16.6694L5.97336 18.5L1.75 14.0755Z',
  d7: 'M22.2497 6.88095L10.9724 18.5L6.74902 14.0755L8.19573 12.6946L10.9724 15.6034L20.8029 5.5L22.2497 6.88095Z',
};

export const IconTickDouble02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-02-stroke-rounded IconTickDouble02StrokeRounded"
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

export const IconTickDouble02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-02-duotone-rounded IconTickDouble02DuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTickDouble02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-02-twotone-rounded IconTickDouble02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTickDouble02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-02-solid-rounded IconTickDouble02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTickDouble02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-02-bulk-rounded IconTickDouble02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTickDouble02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-02-stroke-sharp IconTickDouble02StrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTickDouble02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-02-solid-sharp IconTickDouble02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTickDouble02: TheIconSelfPack = {
  name: 'TickDouble02',
  StrokeRounded: IconTickDouble02StrokeRounded,
  DuotoneRounded: IconTickDouble02DuotoneRounded,
  TwotoneRounded: IconTickDouble02TwotoneRounded,
  SolidRounded: IconTickDouble02SolidRounded,
  BulkRounded: IconTickDouble02BulkRounded,
  StrokeSharp: IconTickDouble02StrokeSharp,
  SolidSharp: IconTickDouble02SolidSharp,
};