import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 3H8.42109C9.35119 3 9.81624 3 9.94012 3.28013C10.064 3.56026 9.74755 3.89632 9.11466 4.56842L5.47691 8.43158C4.84402 9.10368 4.52757 9.43974 4.65145 9.71987C4.77533 10 5.24038 10 6.17048 10H10',
  d2: 'M4 21L6.10557 16.3053C6.49585 15.4351 6.69098 15 7 15C7.30902 15 7.50415 15.4351 7.89443 16.3053L10 21',
  d3: 'M17.5 20V4M17.5 20C16.7998 20 15.4915 18.0057 15 17.5M17.5 20C18.2002 20 19.5085 18.0057 20 17.5',
  d4: 'M8.42109 3H4L4.63901 9.59148C4.64472 9.65048 4.64758 9.67998 4.68063 9.74623C4.71368 9.81248 4.71782 9.81628 4.7261 9.82388C4.91819 10 5.37369 10 6.17048 10H10L9.94159 3.4454C9.94093 3.37107 9.9406 3.3339 9.89792 3.25007C9.85524 3.16623 9.84931 3.16184 9.83746 3.15305C9.63101 3 9.18145 3 8.42109 3Z',
  d5: 'M6.10557 16.3053L4.63203 19.5908C4.34717 20.2259 4.20474 20.5435 4.35253 20.7717C4.50031 21 4.84837 21 5.54447 21H8.45553C9.15163 21 9.49969 21 9.64747 20.7717C9.79526 20.5435 9.65283 20.2259 9.36797 19.5908L7.89443 16.3053C7.50415 15.4351 7.30902 15 7 15C6.69098 15 6.49585 15.4351 6.10557 16.3053Z',
  d6: 'M8.77634 4.00002H4.5C3.94772 4.00002 3.5 3.55231 3.5 3.00002C3.5 2.44774 3.94772 2.00002 4.5 2.00002H8.92109C8.94138 2.00002 8.96167 2.00002 8.98197 2.00001C9.3935 1.9999 9.80354 1.99979 10.1227 2.04486C10.4245 2.08747 11.066 2.223 11.3547 2.87572C11.6464 3.53531 11.3053 4.10202 11.1293 4.35241C10.9445 4.61529 10.6643 4.91268 10.3848 5.2093C10.3708 5.2242 10.3567 5.2391 10.3427 5.25399L6.81523 9.00002H10.5C11.0523 9.00002 11.5 9.44774 11.5 10C11.5 10.5523 11.0523 11 10.5 11H6.67048C6.6502 11 6.62991 11 6.60962 11C6.19808 11.0001 5.78803 11.0003 5.46883 10.9552C5.16705 10.9126 4.52552 10.777 4.23688 10.1243C3.9452 9.46473 4.28629 8.89802 4.46231 8.64763C4.64712 8.38475 4.92731 8.08736 5.20678 7.79075C5.22082 7.77585 5.23486 7.76095 5.24888 7.74605L8.77634 4.00002Z',
  d7: 'M7.50025 16.7546L9.58781 21.4092C9.81382 21.9131 10.4055 22.1384 10.9095 21.9124C11.4134 21.6864 11.6387 21.0947 11.4127 20.5908L9.30711 15.896C9.2988 15.8775 9.2905 15.859 9.28221 15.8405C9.10901 15.4541 8.93822 15.073 8.76459 14.7957C8.60345 14.5383 8.21745 14 7.50025 14C6.78305 14 6.39705 14.5383 6.23591 14.7957C6.06228 15.073 5.89148 15.4541 5.71828 15.8405C5.70999 15.859 5.70169 15.8775 5.69339 15.896L3.58781 20.5908C3.36181 21.0947 3.5871 21.6864 4.09102 21.9124C4.59495 22.1384 5.18667 21.9131 5.41268 21.4092L7.50025 16.7546Z',
  d8: 'M18.2559 4C18.2559 3.44772 17.8081 3 17.2559 3C16.7036 3 16.2559 3.44772 16.2559 4L16.2559 16.5L15.6616 16.5C15.486 16.4999 15.2703 16.4997 15.0939 16.5218L15.0905 16.5222C14.9641 16.538 14.388 16.6098 14.1137 17.1754C13.8387 17.7423 14.1407 18.2424 14.206 18.3506L14.2084 18.3546C14.3006 18.5076 14.4348 18.6785 14.5451 18.8191L14.5688 18.8493C14.8635 19.2252 15.2454 19.7094 15.6259 20.1004C15.8157 20.2955 16.033 20.4967 16.2639 20.6556C16.4691 20.7968 16.8193 21 17.25 21C17.6807 21 18.0309 20.7968 18.2361 20.6556C18.467 20.4967 18.6843 20.2955 18.8741 20.1004C19.2546 19.7094 19.6365 19.2252 19.9312 18.8493L19.9549 18.8191C20.0652 18.6785 20.1994 18.5077 20.2916 18.3546L20.294 18.3506C20.3593 18.2424 20.6613 17.7422 20.3863 17.1754C20.112 16.6098 19.5359 16.538 19.4095 16.5222L19.4061 16.5218C19.2297 16.4997 19.014 16.4999 18.8384 16.5L18.2559 16.5L18.2559 4Z',
  d9: 'M17.5 4V19.5409M15 17.5L17.5 20L20 17.5',
  d10: 'M4 3H9L5 10H10',
  d11: 'M4 21L6.5 14H7.5L10 21',
  d12: 'M7.71875 4H4.44193V2H11.1651L7.16511 9H10.4419V11H3.71875L7.71875 4Z',
  d13: 'M6.23702 13.6636H8.64646L11.3835 21.3272L9.5 21.9999L7.44174 16.2368L5.38348 21.9999L3.5 21.3272L6.23702 13.6636Z',
  d14: 'M18.2929 4V17.5858L19.0858 16.7929L20.5 18.2071L17.2929 21.4142L14.0858 18.2071L15.5 16.7929L16.2929 17.5858V4H18.2929Z',
};

export const IconArrangeByLettersZAStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-by-letters-z-a-stroke-rounded IconArrangeByLettersZAStrokeRounded"
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

export const IconArrangeByLettersZADuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-by-letters-z-a-duotone-rounded IconArrangeByLettersZADuotoneRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      </g>
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

export const IconArrangeByLettersZATwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-by-letters-z-a-twotone-rounded IconArrangeByLettersZATwotoneRounded"
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

export const IconArrangeByLettersZASolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-by-letters-z-a-solid-rounded IconArrangeByLettersZASolidRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrangeByLettersZABulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-by-letters-z-a-bulk-rounded IconArrangeByLettersZABulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrangeByLettersZAStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-by-letters-z-a-stroke-sharp IconArrangeByLettersZAStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrangeByLettersZASolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-by-letters-z-a-solid-sharp IconArrangeByLettersZASolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrangeByLettersZA: TheIconSelfPack = {
  name: 'ArrangeByLettersZA',
  StrokeRounded: IconArrangeByLettersZAStrokeRounded,
  DuotoneRounded: IconArrangeByLettersZADuotoneRounded,
  TwotoneRounded: IconArrangeByLettersZATwotoneRounded,
  SolidRounded: IconArrangeByLettersZASolidRounded,
  BulkRounded: IconArrangeByLettersZABulkRounded,
  StrokeSharp: IconArrangeByLettersZAStrokeSharp,
  SolidSharp: IconArrangeByLettersZASolidSharp,
};