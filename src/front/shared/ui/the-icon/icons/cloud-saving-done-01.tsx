import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.5 18C19.9853 18 22 15.9853 22 13.5C22 11.0147 19.9853 9 17.5 9C17.4925 9 17.485 9.00002 17.4776 9.00005M17.4776 9.00005C17.4924 8.83536 17.5 8.66856 17.5 8.5C17.5 5.46243 15.0376 3 12 3C9.12324 3 6.76233 5.20862 6.52042 8.0227M17.4776 9.00005C17.4131 9.71494 17.2119 10.3904 16.9003 11M6.52042 8.0227C3.98398 8.26407 2 10.4003 2 13C2 15.419 3.71776 17.4367 6 17.9M6.52042 8.0227C6.67826 8.00768 6.83823 8 7 8C8.12582 8 9.16474 8.37209 10.0005 9',
  d2: 'M9 19C9 19 10 19 11 21C11 21 14.1765 16 17 15',
  d3: 'M17.5 8.5C17.5 5.46243 15.0376 3 12 3C9.12324 3 6.76233 5.20862 6.52042 8.0227C3.98398 8.26407 2 10.4003 2 13C2 15.7614 4.23858 18 7 18H17.5C19.9853 18 22 15.9853 22 13.5C22 11.0147 19.9853 9 17.5 9L17.4776 9.00005C17.4924 8.83536 17.5 8.66856 17.5 8.5Z',
  d4: 'M17.9429 14.9159C18.1272 15.4365 17.8547 16.008 17.3341 16.1924C16.8005 16.3814 16.184 16.7883 15.5309 17.361C14.8882 17.9246 14.2631 18.6016 13.7093 19.2654C13.1575 19.9269 12.6887 20.5606 12.3577 21.0296C12.1925 21.2636 11.9323 21.6539 11.8443 21.786C11.651 22.0901 11.309 22.2669 10.9491 22.2485C10.5892 22.23 10.267 22.0194 10.1058 21.697C9.66513 20.8156 9.26981 20.4647 9.07054 20.3318C8.98622 20.2756 8.92926 20.2531 8.90662 20.2455C8.39824 20.1983 8.00024 19.7705 8.00024 19.2498C8.00024 18.6975 8.44796 18.2498 9.00024 18.2498C9.14087 18.2498 9.34363 18.29 9.44684 18.3195C9.65471 18.3789 9.90554 18.4848 10.1799 18.6677C10.4542 18.8506 10.7419 19.1034 11.0306 19.4492C11.3458 19.0185 11.7342 18.5108 12.1735 17.9842C12.7668 17.273 13.4652 16.5124 14.2122 15.8573C14.9489 15.2113 15.7883 14.6182 16.6664 14.3072C17.187 14.1228 17.7585 14.3953 17.9429 14.9159Z',
  d5: 'M5.85349 6.86356C3.22712 7.39545 1.25049 9.71602 1.25049 12.499C1.25049 15.5779 3.67036 18.0916 6.71193 18.2419C7.09948 17.3631 7.97835 16.7497 9.00049 16.7497C9.33234 16.7497 9.68314 16.8269 9.85917 16.8771C10.1533 16.9612 10.4728 17.0927 10.8035 17.2883C10.8748 17.2007 10.9477 17.1123 11.022 17.0232C11.6449 16.2765 12.3982 15.4532 13.2234 14.7295C14.023 14.0283 15.0295 13.2956 16.1659 12.8931C17.4674 12.4322 18.8961 13.1136 19.3571 14.4151C19.818 15.7166 19.1366 17.1453 17.8351 17.6063C17.6061 17.6874 17.2565 17.886 16.8051 18.249H17.5005C20.4 18.249 22.7505 15.8985 22.7505 12.999C22.7505 10.3531 20.7931 8.16436 18.2474 7.80176C18.1432 4.44126 15.3863 1.74902 12.0005 1.74902C8.93634 1.74902 6.3878 3.95359 5.85349 6.86356Z',
  d6: 'M7 18C4.23858 18 2 15.7614 2 13C2 10.4003 3.98398 8.26407 6.52042 8.0227M17.4776 9.00005C17.485 9.00002 17.4925 9 17.5 9C19.9853 9 22 11.0147 22 13.5C22 15.8163 20.25 17.7238 18 17.9725M17.4776 9.00005C17.4924 8.83536 17.5 8.66856 17.5 8.5C17.5 5.46243 15.0376 3 12 3C9.12324 3 6.76233 5.20862 6.52042 8.0227M17.4776 9.00005C17.3753 10.1345 16.9286 11.1696 16.2428 12M6.52042 8.0227C6.67826 8.00768 6.83823 8 7 8C8.12582 8 9.16474 8.37209 10.0005 9',
  d7: 'M9 19L11 21L17 15',
  d8: 'M17.7072 16.0431L11.0001 22.7502L8.29297 20.0431L9.70718 18.6289L11.0001 19.9218L16.293 14.6289L17.7072 16.0431Z',
  d9: 'M5.853 7.36454C3.22664 7.89643 1.25 10.217 1.25 13C1.25 16.1756 3.82436 18.75 7 18.75H7.46522L9.70741 16.5078L11.0003 17.8007L16.2932 12.5078L19.8287 16.0433L17.1221 18.75H17.5C20.3995 18.75 22.75 16.3995 22.75 13.5C22.75 10.8541 20.7927 8.66534 18.2469 8.30273C18.1428 4.94224 15.3858 2.25 12 2.25C8.93585 2.25 6.38731 4.45456 5.853 7.36454Z',
};

export const IconCloudSavingDone01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-saving-done-01-stroke-rounded IconCloudSavingDone01StrokeRounded"
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

export const IconCloudSavingDone01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-saving-done-01-duotone-rounded IconCloudSavingDone01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCloudSavingDone01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-saving-done-01-twotone-rounded IconCloudSavingDone01TwotoneRounded"
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

export const IconCloudSavingDone01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-saving-done-01-solid-rounded IconCloudSavingDone01SolidRounded"
    >
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

export const IconCloudSavingDone01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-saving-done-01-bulk-rounded IconCloudSavingDone01BulkRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCloudSavingDone01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-saving-done-01-stroke-sharp IconCloudSavingDone01StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCloudSavingDone01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-saving-done-01-solid-sharp IconCloudSavingDone01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCloudSavingDone01: TheIconSelfPack = {
  name: 'CloudSavingDone01',
  StrokeRounded: IconCloudSavingDone01StrokeRounded,
  DuotoneRounded: IconCloudSavingDone01DuotoneRounded,
  TwotoneRounded: IconCloudSavingDone01TwotoneRounded,
  SolidRounded: IconCloudSavingDone01SolidRounded,
  BulkRounded: IconCloudSavingDone01BulkRounded,
  StrokeSharp: IconCloudSavingDone01StrokeSharp,
  SolidSharp: IconCloudSavingDone01SolidSharp,
};