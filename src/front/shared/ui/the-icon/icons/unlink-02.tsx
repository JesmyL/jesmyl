import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16.8463 14.6095L19.4558 12C21.5147 9.94113 21.5147 6.60303 19.4558 4.54416C17.397 2.48528 14.0589 2.48528 12 4.54416L9.39045 7.1537M14.6095 16.8463L12 19.4558C9.94113 21.5147 6.60303 21.5147 4.54416 19.4558C2.48528 17.397 2.48528 14.0589 4.54416 12L7.1537 9.39045',
  d2: 'M22 17H19.9211M17 22L17 19.9211',
  d3: 'M2 7H4.07889M7 2L7 4.07889',
  d4: 'M16.8463 14.6095L19.4558 12C21.5147 9.94113 21.5147 6.60303 19.4558 4.54416C17.397 2.48528 14.0589 2.48528 12 4.54416L9.39045 7.1537L7.1537 9.39045L4.54416 12C2.48528 14.0589 2.48528 17.397 4.54416 19.4558C6.60303 21.5147 9.94113 21.5147 12 19.4558L14.6095 16.8463L16.8463 14.6095Z',
  d5: 'M11.2929 3.83705C13.7423 1.38765 17.7136 1.38765 20.163 3.83705C22.6124 6.28645 22.6124 10.2577 20.163 12.7071L17.7071 15.1629C17.3166 15.5535 16.6834 15.5535 16.2929 15.1629C15.9024 14.7724 15.9024 14.1393 16.2929 13.7487L18.7487 11.2929C20.4171 9.62454 20.4171 6.91961 18.7487 5.25126C17.0804 3.58291 14.3755 3.58291 12.7071 5.25126L10.2513 7.70711C9.86074 8.09763 9.22757 8.09763 8.83705 7.70711C8.44652 7.31658 8.44652 6.68342 8.83705 6.29289L11.2929 3.83705ZM7.70711 8.83705C8.09763 9.22757 8.09763 9.86074 7.70711 10.2513L5.25126 12.7071C3.58291 14.3755 3.58291 17.0804 5.25126 18.7487C6.91961 20.4171 9.62454 20.4171 11.2929 18.7487L13.7487 16.2929C14.1393 15.9024 14.7724 15.9024 15.1629 16.2929C15.5535 16.6834 15.5535 17.3166 15.1629 17.7071L12.7071 20.163C10.2577 22.6124 6.28645 22.6124 3.83705 20.163C1.38765 17.7136 1.38765 13.7423 3.83705 11.2929L6.29289 8.83705C6.68342 8.44652 7.31658 8.44652 7.70711 8.83705Z',
  d6: 'M18.9211 17C18.9211 16.4477 19.3688 16 19.9211 16H22C22.5523 16 23 16.4477 23 17C23 17.5523 22.5523 18 22 18H19.9211C19.3688 18 18.9211 17.5523 18.9211 17ZM17 18.9211C17.5523 18.9211 18 19.3688 18 19.9211L18 22C18 22.5523 17.5523 23 17 23C16.4477 23 16 22.5523 16 22L16 19.9211C16 19.3688 16.4477 18.9211 17 18.9211Z',
  d7: 'M7 1C7.55228 1 8 1.44772 8 2L8 4.07889C8 4.63117 7.55229 5.07889 7 5.07889C6.44772 5.07889 6 4.63118 6 4.07889L6 2C6 1.44772 6.44771 1 7 1ZM1 7C1 6.44772 1.44772 6 2 6H4.07889C4.63117 6 5.07889 6.44772 5.07889 7C5.07889 7.55228 4.63117 8 4.07889 8H2C1.44772 8 1 7.55228 1 7Z',
  d8: 'M22 17H19M17 22V19',
  d9: 'M2 7H5M7 2V5',
  d10: 'M11.2929 3.83705C13.7423 1.38765 17.7136 1.38765 20.163 3.83705C22.6124 6.28645 22.6123 10.2577 20.163 12.7071L17.5534 15.3167L16.1392 13.9024L18.7487 11.2929C20.4171 9.62454 20.4171 6.91961 18.7487 5.25126C17.0804 3.58291 14.3755 3.58291 12.7071 5.25126L10.0976 7.86081L8.68335 6.44659L11.2929 3.83705ZM3.83705 11.2929L6.44659 8.68335L7.86081 10.0976L5.25126 12.7071C3.58291 14.3755 3.58291 17.0804 5.25126 18.7487C6.91961 20.4171 9.62454 20.4171 11.2929 18.7487L13.9024 16.1392L15.3167 17.5534L12.7071 20.163C10.2577 22.6124 6.28645 22.6123 3.83705 20.163C1.38765 17.7136 1.38765 13.7423 3.83705 11.2929Z',
  d11: 'M19 16H22V18H19V16ZM18 19V22H16V19H18Z',
  d12: 'M6 5V2H8V5H6ZM5 8H2V6H5V8Z',
};

export const IconUnlink02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unlink-02-stroke-rounded IconUnlink02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconUnlink02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unlink-02-duotone-rounded IconUnlink02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconUnlink02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unlink-02-twotone-rounded IconUnlink02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconUnlink02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unlink-02-solid-rounded IconUnlink02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
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

export const IconUnlink02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unlink-02-bulk-rounded IconUnlink02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconUnlink02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unlink-02-stroke-sharp IconUnlink02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUnlink02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="unlink-02-solid-sharp IconUnlink02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUnlink02: TheIconSelfPack = {
  name: 'Unlink02',
  StrokeRounded: IconUnlink02StrokeRounded,
  DuotoneRounded: IconUnlink02DuotoneRounded,
  TwotoneRounded: IconUnlink02TwotoneRounded,
  SolidRounded: IconUnlink02SolidRounded,
  BulkRounded: IconUnlink02BulkRounded,
  StrokeSharp: IconUnlink02StrokeSharp,
  SolidSharp: IconUnlink02SolidSharp,
};