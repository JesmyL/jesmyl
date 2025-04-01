import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.8606 5.39176C22.2875 6.49635 21.6888 7.2526 20.5301 7.99754C19.5951 8.5986 18.4039 9.24975 17.1417 10.363C15.9044 11.4543 14.6968 12.7687 13.6237 14.0625C12.5549 15.351 11.6465 16.586 11.0046 17.5005C10.5898 18.0914 10.011 18.9729 10.011 18.9729C9.60281 19.6187 8.86895 20.0096 8.08206 19.9998C7.295 19.99 6.57208 19.5812 6.18156 18.9251C5.18328 17.248 4.41296 16.5857 4.05891 16.3478C3.11158 15.7112 2 15.6171 2 14.1335C2 12.9554 2.99489 12.0003 4.22216 12.0003C5.08862 12.0323 5.89398 12.373 6.60756 12.8526C7.06369 13.1591 7.54689 13.5645 8.04948 14.0981C8.63934 13.2936 9.35016 12.3653 10.147 11.4047C11.3042 10.0097 12.6701 8.51309 14.1349 7.22116C15.5748 5.95115 17.2396 4.76235 19.0042 4.13381C20.1549 3.72397 21.4337 4.28718 21.8606 5.39176Z',
  d2: 'M6.18189 19C5.18354 17.3145 4.41315 16.6489 4.05907 16.4098C3.11166 15.77 2 15.6753 2 14.1844C2 13.0003 2.99497 12.0404 4.22233 12.0404C5.08886 12.0726 5.89429 12.415 6.60792 12.897C7.06409 13.205 7.54732 13.6125 8.04996 14.1488C8.63987 13.3402 9.35074 12.4073 10.1476 11.4419C11.3049 10.0398 12.6709 8.53573 14.1358 7.23732C15.5759 5.96093 17.2408 4.76617 19.0056 4.13448C20.1563 3.72259 21.4352 4.28862 21.8622 5.39874C21.9439 5.61119 21.988 5.81082 21.9979 6',
  d3: 'M21.8606 5.39176C22.2875 6.49635 21.6888 7.2526 20.5301 7.99754C19.5951 8.5986 18.4039 9.24975 17.1417 10.363C14.7896 12.4375 12.8015 14.9404 11.0046 17.5005C10.6645 17.9851 10.3283 18.473 10.011 18.9729C9.60281 19.6187 8.86895 20.0096 8.08206 19.9998C7.295 19.99 6.57208 19.5812 6.18156 18.9251C4.95203 16.8595 4.07719 16.3386 3.87929 16.2416C2.81482 16.0833 2 15.1998 2 14.1335C2 12.9554 2.99489 12.0003 4.22216 12.0003C5.08887 12.0323 5.89341 12.3727 6.60756 12.8526C7.06369 13.1591 7.54689 13.5645 8.04948 14.0981C9.85756 11.6319 11.8372 9.24764 14.1349 7.22116C15.5748 5.95115 17.2396 4.76235 19.0042 4.13381C20.1549 3.72397 21.4337 4.28718 21.8606 5.39176Z',
  d4: 'M10.0127 18.9699L10.011 18.9726C9.60281 19.6185 8.86895 20.0093 8.08206 19.9995C7.295 19.9897 6.57208 19.5809 6.18156 18.9248C4.95203 16.8593 4.07719 16.3383 3.87929 16.2413C2.81482 16.083 2 15.1995 2 14.1333C2 12.9551 2.99489 12 4.22216 12C4.52527 12.0112 4.81135 12.0428 5.19105 12.1588C5.60806 12.2861 6.08693 12.5024 6.60756 12.8523C8.77554 14.3092 10.8261 17.7561 10.8261 17.7561C10.5486 18.1563 10.2758 18.56 10.0127 18.9699Z',
  d5: 'M20.53 7.99754C21.6888 7.2526 22.2874 6.49635 21.8605 5.39176C21.4336 4.28718 20.1548 3.72397 19.0042 4.13381C17.2395 4.76235 15.5747 5.95115 14.1348 7.22116C12.67 8.51309 11.3041 10.0097 10.1469 11.4047C8.59449 13.2762 7.15677 15.2552 5.85279 17.3108C5.68347 17.5777 5.59881 17.7112 5.59937 17.8574C5.59993 18.0037 5.69119 18.1452 5.87373 18.4281C5.97363 18.583 6.07628 18.7484 6.18147 18.9251C6.57199 19.5812 7.29491 19.99 8.08197 19.9998C8.85217 20.0094 9.59818 19.6231 10.0126 18.9702C10.3319 18.4728 10.665 17.9843 11.0045 17.5005C11.6464 16.586 12.5548 15.351 13.6236 14.0625C14.6967 12.7687 15.9043 11.4543 17.1416 10.363C18.4038 9.24975 19.595 8.5986 20.53 7.99754Z',
  d6: 'M9.01027 13.499L5.00759 10.0082C5.00347 10.0046 4.99721 10.005 4.99356 10.009L2.00256 13.3377C1.99893 13.3418 1.99919 13.348 2.00315 13.3517L9.07829 19.9991C9.08218 20.0028 9.08827 20.0027 9.09211 19.999L21.997 7.51429C22.001 7.51042 22.001 7.50403 21.9971 7.50007L18.5337 4.00053C18.5297 3.99658 18.5234 3.99657 18.5195 4.00049L9.01027 13.499Z',
  d7: 'M9 13.5L18.5 4L22 7.5L9.05883 20L2 13.353L5 10L9 13.5Z',
};

export const IconTick04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-04-stroke-rounded IconTick04StrokeRounded"
    >
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

export const IconTick04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-04-duotone-rounded IconTick04DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
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

export const IconTick04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-04-twotone-rounded IconTick04TwotoneRounded"
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

export const IconTick04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-04-solid-rounded IconTick04SolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTick04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-04-bulk-rounded IconTick04BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconTick04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-04-stroke-sharp IconTick04StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTick04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tick-04-solid-sharp IconTick04SolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTick04: TheIconSelfPack = {
  name: 'Tick04',
  StrokeRounded: IconTick04StrokeRounded,
  DuotoneRounded: IconTick04DuotoneRounded,
  TwotoneRounded: IconTick04TwotoneRounded,
  SolidRounded: IconTick04SolidRounded,
  BulkRounded: IconTick04BulkRounded,
  StrokeSharp: IconTick04StrokeSharp,
  SolidSharp: IconTick04SolidSharp,
};