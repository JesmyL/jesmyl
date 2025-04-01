import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.508 2.99023C7.02518 2.99023 4.78379 2.99023 3.39116 4.38232C1.99854 5.77441 1.99854 8.01494 1.99854 12.496C1.99854 16.977 1.99854 19.2176 3.39116 20.6097C4.78379 22.0018 7.02518 22.0018 11.508 22.0018C15.9907 22.0018 18.2321 22.0018 19.6248 20.6097C21.0174 19.2176 21.0174 16.977 21.0174 12.496V11.9957',
  d2: 'M4.99854 20.9897C9.20852 16.2384 13.9397 9.93721 20.9985 14.6631',
  d3: 'M17.9958 1.99829V10.0064M22.0014 5.97728L13.9902 5.99217',
  d4: 'M3.39085 4.39319C2 5.78444 2 8.02361 2 12.502C2 16.9803 2 19.2195 3.39085 20.6108L4.58293 21.4011C4.84376 21.0885 5.1065 20.7704 5.37155 20.4496C9.52694 15.419 14.247 9.70465 20.9921 14.0558C20.9947 13.57 20.9947 13.053 20.9947 12.502C20.9947 8.02361 20.9947 5.78444 19.6039 4.39319C18.213 3.00195 15.9744 3.00195 11.4973 3.00195C7.02026 3.00195 4.78171 3.00195 3.39085 4.39319Z',
  d5: 'M11.4973 3.00195C7.02026 3.00195 4.78171 3.00195 3.39085 4.39319C2 5.78444 2 8.02361 2 12.502C2 16.9803 2 19.2195 3.39085 20.6108C4.78171 22.002 7.02026 22.002 11.4973 22.002C15.9744 22.002 18.213 22.002 19.6039 20.6108C20.9947 19.2195 20.9947 16.9803 20.9947 12.502V12.002',
  d6: 'M4.99902 21.0019C9.20783 16.2506 13.9377 9.94941 20.9946 14.6753',
  d7: 'M17.9957 1.99805V10.0062M22.0002 5.97704L13.9912 5.99193',
  d8: 'M11.4979 3C7.02056 3 4.78188 3 3.39094 4.39124C2 5.78249 2 8.02166 2 12.5C2 16.9783 2 19.2175 3.39094 20.6088C4.78188 22 7.02056 22 11.4979 22C15.9753 22 18.214 22 19.605 20.6088C20.9959 19.2175 20.9959 16.9783 20.9959 12.5V12',
  d9: 'M4.99902 21C9.20809 16.2487 13.9383 9.94746 20.9955 14.6734',
  d10: 'M17.9969 1.99609V10.0042M22.0016 5.97508L13.9922 5.98997',
  d11: 'M18 1C18.5523 1 19 1.44772 19 2V5H22C22.5523 5 23 5.44772 23 6C23 6.55228 22.5523 7 22 7H19V10C19 10.5523 18.5523 11 18 11C17.4477 11 17 10.5523 17 10V7H14C13.4477 7 13 6.55228 13 6C13 5.44772 13.4477 5 14 5H17V2C17 1.44772 17.4477 1 18 1Z',
  d12: 'M11.4255 2L11.5 2C12.0523 2 12.5 2.44772 12.5 3C12.5 3.55229 12.0523 4 11.5 4C9.23256 4 7.63258 4.00212 6.42121 4.16499C5.2386 4.32399 4.5772 4.6195 4.09835 5.09835C3.6195 5.5772 3.32399 6.2386 3.16499 7.42121C3.00212 8.63258 3 10.2326 3 12.5C3 14.7674 3.00212 16.3674 3.16499 17.5788C3.32399 18.7614 3.6195 19.4228 4.09835 19.9017C4.5772 20.3805 5.2386 20.676 6.42121 20.835C7.63258 20.9979 9.23256 21 11.5 21C13.7674 21 15.3674 20.9979 16.5788 20.835C17.7614 20.676 18.4228 20.3805 18.9017 19.9017C19.3805 19.4228 19.676 18.7614 19.835 17.5788C19.9979 16.3674 20 14.7674 20 12.5V12C20 11.4477 20.4477 11 21 11C21.5523 11 22 11.4477 22 12V12.5744C22 14.7504 22 16.4851 21.8172 17.8453C21.6284 19.2497 21.2283 20.4035 20.3159 21.3159C19.4035 22.2283 18.2497 22.6284 16.8453 22.8172C15.4851 23 13.7504 23 11.5744 23H11.4256C9.24959 23 7.51485 23 6.15471 22.8172C4.75033 22.6284 3.59653 22.2283 2.68414 21.3159C1.77175 20.4035 1.37164 19.2497 1.18282 17.8453C0.999958 16.4852 0.999977 14.7504 1 12.5745V12.4255C0.999977 10.2496 0.999958 8.51485 1.18282 7.15471C1.37164 5.75033 1.77175 4.59653 2.68414 3.68414C3.59653 2.77175 4.75033 2.37164 6.15471 2.18282C7.51485 1.99996 9.24957 1.99998 11.4255 2Z',
  d13: 'M21.0969 13.3733C19.2456 12.2361 17.4791 11.7751 15.7898 11.8618C14.1096 11.9479 12.5946 12.5711 11.2304 13.4547C8.96229 14.9238 6.95638 17.2305 5.17963 19.2736C4.86286 19.6379 4.55337 19.9938 4.25098 20.335L4.23721 20.3506L3 21.4983L4.27858 22.3541C5.13876 22.6993 6.14335 22.8508 7.29714 22.9247C8.44668 22.9982 9.82874 22.9982 11.4693 22.9982H11.5739C13.7499 22.9983 15.4846 22.9983 16.8447 22.8154C18.2491 22.6266 19.4029 22.2265 20.3153 21.3141C21.7783 19.8511 21.9619 18.0095 21.9987 15.0105V14.9983C21.9987 14.3541 21.6725 13.7268 21.0969 13.3733Z',
  d14: 'M22 6H18M18 6H14M18 6V2M18 6V10',
  d15: 'M20 12V22H2V4H12',
  d16: 'M4 22L14 13L20 17',
  d17: 'M17.5 4.5V1.5H19.5V4.5H22.5V6.5H19.5V9.5H17.5V6.5H14.5V4.5H17.5Z',
  d18: 'M2.5 2.5C1.94772 2.5 1.5 2.94772 1.5 3.5V21.5C1.5 22.0523 1.94772 22.5 2.5 22.5H20.5C21.0523 22.5 21.5 22.0523 21.5 21.5V11.5H19.5V14.6314L14.4397 11.2578L3.5 20.2085V4.5H12.5V2.5H2.5Z',
};

export const IconImageAdd01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-add-01-stroke-rounded IconImageAdd01StrokeRounded"
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

export const IconImageAdd01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-add-01-duotone-rounded IconImageAdd01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconImageAdd01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-add-01-twotone-rounded IconImageAdd01TwotoneRounded"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconImageAdd01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-add-01-solid-rounded IconImageAdd01SolidRounded"
    >
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
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconImageAdd01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-add-01-bulk-rounded IconImageAdd01BulkRounded"
    >
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconImageAdd01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-add-01-stroke-sharp IconImageAdd01StrokeSharp"
    >
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconImageAdd01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="image-add-01-solid-sharp IconImageAdd01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfImageAdd01: TheIconSelfPack = {
  name: 'ImageAdd01',
  StrokeRounded: IconImageAdd01StrokeRounded,
  DuotoneRounded: IconImageAdd01DuotoneRounded,
  TwotoneRounded: IconImageAdd01TwotoneRounded,
  SolidRounded: IconImageAdd01SolidRounded,
  BulkRounded: IconImageAdd01BulkRounded,
  StrokeSharp: IconImageAdd01StrokeSharp,
  SolidSharp: IconImageAdd01SolidSharp,
};