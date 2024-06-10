import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 10V8C2 7.05719 2 6.58579 2.29289 6.29289C2.58579 6 3.05719 6 4 6H7C10.7712 6 12.6569 6 13.8284 7.17157C15 8.34315 15 10.2288 15 14V16C15 16.9428 15 17.4142 14.7071 17.7071C14.4142 18 13.9428 18 13 18H10C6.22876 18 4.34315 18 3.17157 16.8284C2 15.6569 2 13.7712 2 10Z',
  d2: 'M17.8995 9.07049L18.5997 8.39526C20.0495 6.99707 20.7744 6.29798 21.3872 6.55106C22 6.80414 22 7.80262 22 9.79956V14.2004C22 16.1974 22 17.1959 21.3872 17.4489C20.7744 17.702 20.0495 17.0029 18.5997 15.6047L17.8995 14.9295C17.0122 14.0738 17 14.0453 17 12.8231V11.1769C17 9.95473 17.0122 9.92624 17.8995 9.07049Z',
  d3: 'M3.95526 5.25L4.00001 5.25001L7.05642 5.25001C8.89418 5.24999 10.3498 5.24998 11.489 5.40314C12.6615 5.56077 13.6104 5.89289 14.3588 6.64125C15.1071 7.38961 15.4392 8.33856 15.5969 9.51098C15.75 10.6502 15.75 12.1058 15.75 13.9436L15.75 16.0448V16.0448C15.7501 16.4776 15.7501 16.8744 15.7067 17.1972C15.6589 17.5527 15.5465 17.9284 15.2374 18.2374C14.9284 18.5465 14.5527 18.6589 14.1972 18.7067C13.8744 18.7501 13.4776 18.7501 13.0448 18.75H13.0448L9.9436 18.75C8.10583 18.75 6.6502 18.75 5.51098 18.5969C4.33856 18.4392 3.38961 18.1071 2.64125 17.3588C1.89289 16.6104 1.56077 15.6615 1.40314 14.489C1.24998 13.3498 1.24999 11.8942 1.25001 10.0564L1.25001 8.00001L1.25 7.95526C1.24995 7.52244 1.24991 7.12561 1.29331 6.8028C1.3411 6.44732 1.45355 6.07159 1.76257 5.76257C2.07159 5.45355 2.44732 5.3411 2.8028 5.29331C3.12561 5.24991 3.52244 5.24995 3.95526 5.25Z',
  d4: 'M18.2395 8.6716L19.0096 7.90414C20.6044 6.31497 21.4018 5.52038 22.0759 5.80804C22.75 6.09569 22.75 7.23054 22.75 9.50025V14.5023C22.75 16.772 22.75 17.9068 22.0759 18.1945C21.4018 18.4821 20.6044 17.6876 19.0096 16.0984L18.2395 15.3309C17.2634 14.3583 17.25 14.3259 17.25 12.9367V11.0658C17.25 9.67662 17.2634 9.64424 18.2395 8.6716Z',
  d5: 'M1.99786 14V6H10.9923C13.2001 6 14.9899 7.79086 14.9899 10V18H5.9954C3.78762 18 1.99786 16.2091 1.99786 14Z',
  d6: 'M21.9867 7.01435L17.4759 9.9695V14.0004L21.9866 16.9909C21.9933 16.9953 22.0022 16.9906 22.0022 16.9826V7.02271C22.0022 7.01476 21.9933 7.00999 21.9867 7.01435Z',
  d7: 'M2 14V6L11.8301 6C14.0392 6 15.8301 7.79086 15.8301 10V18H6C3.79086 18 2 16.2091 2 14Z',
  d8: 'M17.5 10L22 7V17L17.5 14V10Z',
};

export const IconZoomStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="zoom-stroke-rounded IconZoomStrokeRounded"
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

export const IconZoomDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="zoom-duotone-rounded IconZoomDuotoneRounded"
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

export const IconZoomTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="zoom-twotone-rounded IconZoomTwotoneRounded"
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

export const IconZoomSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="zoom-solid-rounded IconZoomSolidRounded"
    >
      <path 
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

export const IconZoomBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="zoom-bulk-rounded IconZoomBulkRounded"
    >
      <path 
        d={d.d3} 
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

export const IconZoomStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="zoom-stroke-sharp IconZoomStrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconZoomSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="zoom-solid-sharp IconZoomSolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfZoom: TheIconSelfPack = {
  name: 'Zoom',
  StrokeRounded: IconZoomStrokeRounded,
  DuotoneRounded: IconZoomDuotoneRounded,
  TwotoneRounded: IconZoomTwotoneRounded,
  SolidRounded: IconZoomSolidRounded,
  BulkRounded: IconZoomBulkRounded,
  StrokeSharp: IconZoomStrokeSharp,
  SolidSharp: IconZoomSolidSharp,
};