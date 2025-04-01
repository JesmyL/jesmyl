import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 13.3333C3 13.3333 4.5 14 6.5 17C6.5 17 6.78485 16.5192 7.32133 15.7526M17 6C14.7085 7.14577 12.3119 9.55181 10.3879 11.8223',
  d2: 'M8 13.3333C8 13.3333 9.5 14 11.5 17C11.5 17 17 8.5 22 6',
  d3: 'M17.3947 6.05301C17.6417 6.54698 17.4414 7.14766 16.9475 7.39465C14.963 8.3869 12.804 10.4749 10.948 12.622C10.5869 13.0398 9.95536 13.0858 9.53754 12.7246C9.11971 12.3634 9.07378 11.7319 9.43494 11.3141C11.3173 9.13647 13.6923 6.78614 16.053 5.60579C16.547 5.3588 17.1477 5.55903 17.3947 6.05301Z',
  d4: 'M1.58644 13.4274C1.81074 12.9227 2.4017 12.6954 2.90639 12.9197C2.97418 12.9506 3.14836 13.038 3.30275 13.1409C3.5167 13.2771 3.8061 13.4837 4.15518 13.7862C4.67084 14.2331 5.31435 14.8873 6.03643 15.8299C6.35173 15.6627 6.74654 15.6702 7.06348 15.8831C7.52189 16.1912 7.64381 16.8125 7.3358 17.2709C7.17596 17.5088 7.05509 17.697 6.97517 17.8241C6.93522 17.8877 6.90553 17.9359 6.88635 17.9673L6.86549 18.0018L6.86104 18.0092C6.6858 18.3049 6.37046 18.4907 6.02683 18.4999C5.68316 18.509 5.3589 18.341 5.1682 18.0549C4.21353 16.6229 3.39675 15.7755 2.84532 15.2976C2.5694 15.0584 2.3588 14.9109 2.229 14.8283C2.16404 14.7869 2.11908 14.7617 2.09603 14.7493C2.08788 14.745 2.08246 14.7422 2.07984 14.7409C1.58516 14.5119 1.36426 13.9273 1.58644 13.4274Z',
  d5: 'M22.3947 6.05301C22.6417 6.54698 22.4414 7.14766 21.9475 7.39465C19.6538 8.54146 17.1437 11.1402 15.1483 13.572C14.1666 14.7685 13.3371 15.8898 12.753 16.7121C12.4613 17.1229 12.2314 17.4581 12.0752 17.6895C11.9971 17.8052 11.9375 17.8949 11.8978 17.9551L11.8533 18.0228L11.8426 18.0392L11.8402 18.0428C11.6573 18.3255 11.3438 18.4979 11.0071 18.5002C10.6703 18.5025 10.355 18.3351 10.1682 18.0549C9.21353 16.6229 8.39675 15.7755 7.84532 15.2976C7.5694 15.0584 7.3588 14.9109 7.229 14.8283C7.16404 14.7869 7.11908 14.7617 7.09603 14.7493C7.08788 14.745 7.08246 14.7422 7.07984 14.7409C6.58516 14.5119 6.36426 13.9273 6.58644 13.4274C6.81074 12.9227 7.4017 12.6954 7.90639 12.9197C7.98688 12.9594 8.17884 13.0591 8.30275 13.1409C8.5167 13.2771 8.8061 13.4837 9.15518 13.7862C9.65726 14.2213 10.2806 14.853 10.9796 15.7561C11.0255 15.6908 11.0731 15.6234 11.1225 15.554C11.7259 14.7044 12.5839 13.5445 13.6022 12.3034C15.6068 9.86027 18.3467 6.95898 21.053 5.60579C21.547 5.3588 22.1477 5.55903 22.3947 6.05301Z',
  d6: 'M2.5 13.8333L6 17.5L7.02402 16.4272M16.5 6.5L10 13.3095',
  d7: 'M7.5 13.8333L11 17.5L21.5 6.5',
  d8: 'M17.196 6.93417L10.6967 13.5517L9.25 12.1708L15.7493 5.55322L17.196 6.93417ZM1.75 14.0755L3.19671 12.6946L5.97336 15.6034L6.27402 15.2885L7.72073 16.6694L5.97336 18.5L1.75 14.0755Z',
  d9: 'M22.2497 6.88095L10.9724 18.5L6.74902 14.0755L8.19573 12.6946L10.9724 15.6034L20.8029 5.5L22.2497 6.88095Z',
};

export const IconTickDouble01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-01-stroke-rounded IconTickDouble01StrokeRounded"
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

export const IconTickDouble01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-01-duotone-rounded IconTickDouble01DuotoneRounded"
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

export const IconTickDouble01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-01-twotone-rounded IconTickDouble01TwotoneRounded"
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

export const IconTickDouble01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-01-solid-rounded IconTickDouble01SolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconTickDouble01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-01-bulk-rounded IconTickDouble01BulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTickDouble01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-01-stroke-sharp IconTickDouble01StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTickDouble01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-double-01-solid-sharp IconTickDouble01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTickDouble01: TheIconSelfPack = {
  name: 'TickDouble01',
  StrokeRounded: IconTickDouble01StrokeRounded,
  DuotoneRounded: IconTickDouble01DuotoneRounded,
  TwotoneRounded: IconTickDouble01TwotoneRounded,
  SolidRounded: IconTickDouble01SolidRounded,
  BulkRounded: IconTickDouble01BulkRounded,
  StrokeSharp: IconTickDouble01StrokeSharp,
  SolidSharp: IconTickDouble01SolidSharp,
};