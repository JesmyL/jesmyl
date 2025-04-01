import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 21C9.20998 16.2487 13.9412 9.9475 21 14.6734',
  d2: 'M21 12.5C21 16.9783 21 19.2175 19.6088 20.6088C18.2175 22 15.9783 22 11.5 22C7.02166 22 4.78249 22 3.39124 20.6088C2 19.2175 2 16.9783 2 12.5C2 8.02166 2 5.78249 3.39124 4.39124C4.78249 3 7.02166 3 11.5 3',
  d3: 'M22 9L18.5 5.5M18.5 5.5L15 2M18.5 5.5L22 2M18.5 5.5L15 9',
  d4: 'M3.39124 4.39124C2 5.78249 2 8.02166 2 12.5C2 16.9783 2 19.2175 3.39124 20.6088L4.58365 21.3991C4.84455 21.0865 5.10737 20.7684 5.37249 20.4476L5.37254 20.4475C9.52909 15.4169 14.2504 9.7027 20.9974 14.0538C21 13.568 21 13.051 21 12.5C21 8.02166 21 5.78249 19.6088 4.39124C18.2175 3 15.9783 3 11.5 3C7.02166 3 4.78249 3 3.39124 4.39124Z',
  d5: 'M11.4255 2L11.5 2C12.0523 2 12.5 2.44772 12.5 3C12.5 3.55229 12.0523 4 11.5 4C9.23256 4 7.63258 4.00212 6.42121 4.16499C5.2386 4.32399 4.5772 4.6195 4.09835 5.09835C3.6195 5.5772 3.32399 6.2386 3.16499 7.42121C3.00212 8.63258 3 10.2326 3 12.5C3 14.7674 3.00212 16.3674 3.16499 17.5788C3.32399 18.7614 3.6195 19.4228 4.09835 19.9017C4.5772 20.3805 5.2386 20.676 6.42121 20.835C7.63258 20.9979 9.23256 21 11.5 21C13.7674 21 15.3674 20.9979 16.5788 20.835C17.7614 20.676 18.4228 20.3805 18.9017 19.9017C19.3805 19.4228 19.676 18.7614 19.835 17.5788C19.9979 16.3674 20 14.7674 20 12.5C20 11.9477 20.4477 11.5 21 11.5C21.5523 11.5 22 11.9477 22 12.5V12.5744C22 14.7504 22 16.4851 21.8172 17.8453C21.6284 19.2497 21.2283 20.4035 20.3159 21.3159C19.4035 22.2283 18.2497 22.6284 16.8453 22.8172C15.4851 23 13.7504 23 11.5744 23H11.4256C9.24959 23 7.51485 23 6.15471 22.8172C4.75033 22.6284 3.59653 22.2283 2.68414 21.3159C1.77175 20.4035 1.37164 19.2497 1.18282 17.8453C0.999958 16.4852 0.999977 14.7504 1 12.5745V12.4255C0.999977 10.2496 0.999958 8.51485 1.18282 7.15471C1.37164 5.75033 1.77175 4.59653 2.68414 3.68414C3.59653 2.77175 4.75033 2.37164 6.15471 2.18282C7.51485 1.99996 9.24957 1.99998 11.4255 2Z',
  d6: 'M21.5557 13.8424C19.6584 12.5721 17.8487 11.9996 16.1132 12C14.3823 12.0004 12.8191 12.5709 11.4109 13.4286C9.01393 14.8887 6.91538 17.291 5.06472 19.4095C4.79347 19.72 4.52755 20.0244 4.26679 20.3189L3 21.5L4.21825 22.3312C5.08286 22.6901 6.09417 22.8472 7.25652 22.9237C8.41435 23 9.80924 23 11.4682 22.9999H11.5738C13.7498 23 15.4845 23 16.8447 22.8171C18.2491 22.6283 19.4029 22.2282 20.3152 21.3158L20.3301 21.301C21.0127 20.6184 21.5561 20.075 21.7996 19.0246C21.9998 18.1614 21.9996 16.926 21.9994 14.8838L21.9994 14.1395L21.5557 13.8424Z',
  d7: 'M14.2929 1.29289C14.6834 0.902369 15.3166 0.902369 15.7071 1.29289L18.5 4.08579L21.2929 1.29289C21.6834 0.902369 22.3166 0.902369 22.7071 1.29289C23.0976 1.68342 23.0976 2.31658 22.7071 2.70711L19.9142 5.5L22.7071 8.29289C23.0976 8.68342 23.0976 9.31658 22.7071 9.70711C22.3166 10.0976 21.6834 10.0976 21.2929 9.70711L18.5 6.91421L15.7071 9.70711C15.3166 10.0976 14.6834 10.0976 14.2929 9.70711C13.9024 9.31658 13.9024 8.68342 14.2929 8.29289L17.0858 5.5L14.2929 2.70711C13.9024 2.31658 13.9024 1.68342 14.2929 1.29289Z',
  d8: 'M20 12V22H2V4H12',
  d9: 'M4 22L14 13L20 17',
  d10: 'M3 3.00024C2.44772 3.00024 2 3.44796 2 4.00024V22.0002C2 22.5525 2.44772 23.0002 3 23.0002H21C21.5523 23.0002 22 22.5525 22 22.0002V11.0002H20V15.1316L14.9397 11.7581L4 20.7087V5.00024H12V3.00024H3Z',
  d11: 'M17.793 6.62132L20.5859 9.41421L22.0002 8L19.2073 5.20711L22.0002 2.41421L20.5859 1L17.793 3.79289L15.0002 1L13.5859 2.41421L16.3788 5.20711L13.5859 8L15.0002 9.41421L17.793 6.62132Z',
};

export const IconImageDelete01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-delete-01-stroke-rounded IconImageDelete01StrokeRounded"
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconImageDelete01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-delete-01-duotone-rounded IconImageDelete01DuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconImageDelete01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-delete-01-twotone-rounded IconImageDelete01TwotoneRounded"
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
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconImageDelete01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-delete-01-solid-rounded IconImageDelete01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconImageDelete01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-delete-01-bulk-rounded IconImageDelete01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
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

export const IconImageDelete01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-delete-01-stroke-sharp IconImageDelete01StrokeSharp"
    >
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconImageDelete01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-delete-01-solid-sharp IconImageDelete01SolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfImageDelete01: TheIconSelfPack = {
  name: 'ImageDelete01',
  StrokeRounded: IconImageDelete01StrokeRounded,
  DuotoneRounded: IconImageDelete01DuotoneRounded,
  TwotoneRounded: IconImageDelete01TwotoneRounded,
  SolidRounded: IconImageDelete01SolidRounded,
  BulkRounded: IconImageDelete01BulkRounded,
  StrokeSharp: IconImageDelete01StrokeSharp,
  SolidSharp: IconImageDelete01SolidSharp,
};