import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 13C19.8856 13 20.8284 13 21.4142 13.5858C22 14.1716 22 15.1144 22 17V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16L2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2L7 2C8.88562 2 9.82843 2 10.4142 2.58579C11 3.17157 11 4.11438 11 6',
  d2: 'M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z',
  d3: 'M18 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16V6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2H7C8.88562 2 9.82843 2 10.4142 2.58579C11 3.17157 11 4.11438 11 6V9.17071C9.83481 9.58254 9 10.6938 9 12C9 13.6569 10.3431 15 12 15C13.3062 15 14.4175 14.1652 14.8293 13H18C19.8856 13 20.8284 13 21.4142 13.5858C22 14.1716 22 15.1144 22 17V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22Z',
  d4: 'M9.29448 1.32992C9.92228 1.41432 10.4891 1.59999 10.9445 2.05546C11.4 2.51093 11.5857 3.07773 11.6701 3.70552C11.7501 4.3003 11.75 5.04954 11.75 5.94801V6.56009C11.75 6.98037 11.75 7.19051 11.6472 7.32495C11.5445 7.45939 11.3019 7.52532 10.8168 7.65717C8.90553 8.17666 7.5 9.92419 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.0758 16.5 15.8233 15.0945 16.3428 13.1832C16.4747 12.6981 16.5406 12.4556 16.6751 12.3528C16.8095 12.25 17.0196 12.25 17.4399 12.25L18.052 12.25C18.9505 12.25 19.6997 12.2499 20.2945 12.3299C20.9223 12.4143 21.4891 12.6 21.9445 13.0555C22.4 13.5109 22.5857 14.0777 22.6701 14.7055C22.7501 15.3003 22.75 16.0495 22.75 16.948V18.052C22.75 18.9505 22.7501 19.6997 22.6701 20.2945C22.5857 20.9223 22.4 21.4891 21.9445 21.9445C21.4891 22.4 20.9223 22.5857 20.2945 22.6701C19.6997 22.7501 18.9505 22.75 18.052 22.75H7.94513C6.57754 22.75 5.47522 22.75 4.60825 22.6335C3.70815 22.5125 2.95027 22.2536 2.34835 21.6517C1.74644 21.0497 1.48754 20.2919 1.36653 19.3918C1.24997 18.5248 1.24998 17.4225 1.25 16.0549L1.25 5.94794C1.24997 5.04949 1.24995 4.30029 1.32992 3.70553C1.41432 3.07773 1.59999 2.51093 2.05546 2.05546C2.51093 1.59999 3.07773 1.41432 3.70552 1.32992C4.30029 1.24995 5.04955 1.24997 5.94801 1.25H7.05206C7.95052 1.24997 8.69972 1.24995 9.29448 1.32992Z',
  d5: 'M18 13H22V22H2V2L11 2V6',
  d6: 'M2 1.25C1.80109 1.25 1.61032 1.32902 1.46967 1.46967C1.32902 1.61032 1.25 1.80109 1.25 2V22C1.25 22.4142 1.58579 22.75 2 22.75H22C22.4142 22.75 22.75 22.4142 22.75 22V13C22.75 12.5858 22.4142 12.25 22 12.25H16.4932C16.3635 14.619 14.4014 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.59861 9.381 7.63655 11.75 7.50683V2C11.75 1.58579 11.4142 1.25 11 1.25H2Z',
};

export const IconStrokeOutsideStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-outside-stroke-rounded IconStrokeOutsideStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconStrokeOutsideDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-outside-duotone-rounded IconStrokeOutsideDuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconStrokeOutsideTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-outside-twotone-rounded IconStrokeOutsideTwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconStrokeOutsideSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-outside-solid-rounded IconStrokeOutsideSolidRounded"
    >
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconStrokeOutsideBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-outside-bulk-rounded IconStrokeOutsideBulkRounded"
    >
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconStrokeOutsideStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-outside-stroke-sharp IconStrokeOutsideStrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconStrokeOutsideSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stroke-outside-solid-sharp IconStrokeOutsideSolidSharp"
    >
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfStrokeOutside: TheIconSelfPack = {
  name: 'StrokeOutside',
  StrokeRounded: IconStrokeOutsideStrokeRounded,
  DuotoneRounded: IconStrokeOutsideDuotoneRounded,
  TwotoneRounded: IconStrokeOutsideTwotoneRounded,
  SolidRounded: IconStrokeOutsideSolidRounded,
  BulkRounded: IconStrokeOutsideBulkRounded,
  StrokeSharp: IconStrokeOutsideStrokeSharp,
  SolidSharp: IconStrokeOutsideSolidSharp,
};