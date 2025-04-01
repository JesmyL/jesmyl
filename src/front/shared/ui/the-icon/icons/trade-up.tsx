import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 13V8H15',
  d2: 'M20 8L15 13C14.1174 13.8826 13.6762 14.3238 13.1346 14.3726C13.045 14.3807 12.955 14.3807 12.8654 14.3726C12.3238 14.3238 11.8826 13.8826 11 13C10.1174 12.1174 9.67615 11.6762 9.13457 11.6274C9.04504 11.6193 8.95496 11.6193 8.86543 11.6274C8.32385 11.6762 7.88256 12.1174 7 13L4 16',
  d3: 'M14 8C14 7.44772 14.4477 7 15 7H20C20.5523 7 21 7.44772 21 8V13C21 13.5523 20.5523 14 20 14C19.4477 14 19 13.5523 19 13V9H15C14.4477 9 14 8.55228 14 8Z',
  d4: 'M20.7071 7.29289C21.0976 7.68342 21.0976 8.31658 20.7071 8.70711L15.6688 13.7454L15.6688 13.7454C15.2605 14.1538 14.8934 14.521 14.5576 14.7851C14.1934 15.0714 13.7659 15.3198 13.2243 15.3686C13.0751 15.382 12.9249 15.382 12.7757 15.3686C12.2341 15.3198 11.8066 15.0714 11.4424 14.7851C11.1066 14.521 10.7395 14.1538 10.3312 13.7454C9.87234 13.2866 9.55169 12.9683 9.32128 12.7871C9.06256 12.5606 8.78511 12.6927 8.67872 12.7871C8.44831 12.9683 8.16593 13.2483 7.70711 13.7071L4.70711 16.7071C4.31658 17.0976 3.68342 17.0976 3.29289 16.7071C2.90237 16.3166 2.90237 15.6834 3.29289 15.2929L6.33116 12.2546L6.33117 12.2546C6.73953 11.8462 7.10664 11.479 7.44245 11.2149C7.8066 10.9286 8.23411 10.6802 8.77572 10.6314C8.92494 10.618 9.07506 10.618 9.22428 10.6314C9.76589 10.6802 10.1934 10.9286 10.5576 11.2149C10.8934 11.479 11.2605 11.8462 11.6688 12.2546L11.6688 12.2546C12.1277 12.7134 12.4483 13.0317 12.6787 13.2129C12.7902 13.3025 13.0748 13.4279 13.3213 13.2129C13.5517 13.0317 13.8341 12.7517 14.2929 12.2929L19.2929 7.29289C19.6834 6.90237 20.3166 6.90237 20.7071 7.29289Z',
  d5: 'M19.5 8.5L13 15L9 11L4 16',
  d6: 'M13.9998 7H20.9998V14H18.9998V9H13.9998V7Z',
  d7: 'M20.9141 8.50015L12.9998 16.4144L8.99985 12.4144L4.41421 17.0003L3 15.5861L8.99985 9.58594L12.9998 13.5859L19.4998 7.08594L20.9141 8.50015Z',
};

export const IconTradeUpStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-up-stroke-rounded IconTradeUpStrokeRounded"
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

export const IconTradeUpDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-up-duotone-rounded IconTradeUpDuotoneRounded"
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

export const IconTradeUpTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-up-twotone-rounded IconTradeUpTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTradeUpSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-up-solid-rounded IconTradeUpSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTradeUpBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-up-bulk-rounded IconTradeUpBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTradeUpStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-up-stroke-sharp IconTradeUpStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconTradeUpSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-up-solid-sharp IconTradeUpSolidSharp"
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

export const iconPackOfTradeUp: TheIconSelfPack = {
  name: 'TradeUp',
  StrokeRounded: IconTradeUpStrokeRounded,
  DuotoneRounded: IconTradeUpDuotoneRounded,
  TwotoneRounded: IconTradeUpTwotoneRounded,
  SolidRounded: IconTradeUpSolidRounded,
  BulkRounded: IconTradeUpBulkRounded,
  StrokeSharp: IconTradeUpStrokeSharp,
  SolidSharp: IconTradeUpSolidSharp,
};