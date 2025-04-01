import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.5 17.5L22 22',
  d2: 'M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z',
  d3: 'M14.5 9.5L15.4199 10.2929C15.8066 10.6262 16 10.7929 16 11C16 11.2071 15.8066 11.3738 15.4199 11.7071L14.5 12.5',
  d4: 'M7.5 9.5L6.58009 10.2929C6.19337 10.6262 6 10.7929 6 11C6 11.2071 6.19336 11.3738 6.58009 11.7071L7.5 12.5',
  d5: 'M12 8.5L10 13.5',
  d6: 'M16.5429 16.5429C16.9334 16.1524 17.5666 16.1524 17.9571 16.5429L22.4571 21.0429C22.8476 21.4334 22.8476 22.0666 22.4571 22.4571C22.0666 22.8476 21.4334 22.8476 21.0429 22.4571L16.5429 17.9571C16.1524 17.5666 16.1524 16.9334 16.5429 16.5429Z',
  d7: 'M1.25 11C1.25 5.61522 5.61522 1.25 11 1.25C16.3848 1.25 20.75 5.61522 20.75 11C20.75 16.3848 16.3848 20.75 11 20.75C5.61522 20.75 1.25 16.3848 1.25 11ZM11 3.2C6.69218 3.2 3.2 6.69218 3.2 11C3.2 15.3078 6.69218 18.8 11 18.8C15.3078 18.8 18.8 15.3078 18.8 11C18.8 6.69218 15.3078 3.2 11 3.2Z',
  d8: 'M13.7427 8.84714C13.3821 9.26547 13.4289 9.8969 13.8472 10.2575L14.7087 11L13.8472 11.7426C13.4289 12.1031 13.3821 12.7346 13.7427 13.1529C14.1032 13.5712 14.7347 13.6181 15.153 13.2575L16.0729 12.4646L16.1048 12.4371C16.2693 12.2955 16.461 12.1305 16.6039 11.9691C16.7693 11.7821 17.0001 11.4589 17.0001 11C17.0001 10.5411 16.7693 10.2179 16.6039 10.031C16.461 9.86957 16.2693 9.70453 16.1048 9.56294L16.0729 9.53545L15.153 8.74255C14.7347 8.38198 14.1032 8.4288 13.7427 8.84714Z',
  d9: 'M8.25758 8.84714C8.61816 9.26547 8.57134 9.8969 8.153 10.2575L7.29152 11L8.153 11.7426C8.57134 12.1031 8.61816 12.7346 8.25758 13.1529C7.89701 13.5712 7.26558 13.6181 6.84724 13.2575L5.92734 12.4646L5.89542 12.4371C5.73095 12.2955 5.53925 12.1305 5.39636 11.9691C5.23092 11.7821 5.00012 11.4589 5.00012 11C5.00012 10.5411 5.23092 10.2179 5.39636 10.031C5.53925 9.86957 5.73095 9.70453 5.89542 9.56294L5.92734 9.53545L6.84724 8.74255C7.26558 8.38198 7.89701 8.4288 8.25758 8.84714Z',
  d10: 'M12.3715 7.57179C12.8843 7.7769 13.1337 8.35887 12.9286 8.87166L10.9286 13.8717C10.7235 14.3844 10.1415 14.6339 9.62875 14.4287C9.11597 14.2236 8.86655 13.6417 9.07167 13.1289L11.0717 8.12888C11.2768 7.61609 11.8588 7.36668 12.3715 7.57179Z',
  d11: 'M17.1504 18.5666L21.0422 22.4584C21.4328 22.8489 22.0659 22.8489 22.4564 22.4584C22.847 22.0679 22.847 21.4347 22.4564 21.0442L18.5646 17.1523C18.1427 17.6706 17.6686 18.1447 17.1504 18.5666Z',
  d12: 'M14 9L16 11L14 13',
  d13: 'M8 9L6 11L8 13',
  d14: 'M12 8L10 14',
  d15: 'M14.8357 11.2501L13.5428 9.95718L14.9571 8.54297L17.6642 11.2501L14.9571 13.9572L13.5428 12.543L14.8357 11.2501Z',
  d16: 'M7.54292 8.54297L8.95714 9.95718L7.66424 11.2501L8.95714 12.543L7.54292 13.9572L4.83582 11.2501L7.54292 8.54297Z',
  d17: 'M9.30127 13.9336L11.3013 7.93359L13.1986 8.56605L11.1986 14.566L9.30127 13.9336Z',
  d18: 'M1.25 11.25C1.25 5.72715 5.72715 1.25 11.25 1.25C16.7728 1.25 21.25 5.72715 21.25 11.25C21.25 13.6513 20.4036 15.8549 18.9929 17.5787L22.75 21.3358L21.3358 22.75L17.5787 18.9929C15.8549 20.4036 13.6513 21.25 11.25 21.25C5.72715 21.25 1.25 16.7728 1.25 11.25ZM11.25 3.25C6.83172 3.25 3.25 6.83172 3.25 11.25C3.25 15.6683 6.83172 19.25 11.25 19.25C15.6683 19.25 19.25 15.6683 19.25 11.25C19.25 6.83172 15.6683 3.25 11.25 3.25Z',
};

export const IconInspectCodeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="inspect-code-stroke-rounded IconInspectCodeStrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconInspectCodeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="inspect-code-duotone-rounded IconInspectCodeDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconInspectCodeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="inspect-code-twotone-rounded IconInspectCodeTwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconInspectCodeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="inspect-code-solid-rounded IconInspectCodeSolidRounded"
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
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconInspectCodeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="inspect-code-bulk-rounded IconInspectCodeBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconInspectCodeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="inspect-code-stroke-sharp IconInspectCodeStrokeSharp"
    >
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconInspectCodeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="inspect-code-solid-sharp IconInspectCodeSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfInspectCode: TheIconSelfPack = {
  name: 'InspectCode',
  StrokeRounded: IconInspectCodeStrokeRounded,
  DuotoneRounded: IconInspectCodeDuotoneRounded,
  TwotoneRounded: IconInspectCodeTwotoneRounded,
  SolidRounded: IconInspectCodeSolidRounded,
  BulkRounded: IconInspectCodeBulkRounded,
  StrokeSharp: IconInspectCodeStrokeSharp,
  SolidSharp: IconInspectCodeSolidSharp,
};