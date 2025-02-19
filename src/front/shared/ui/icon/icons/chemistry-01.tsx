import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 9L11 9M20 9L17 9',
  d2: 'M17 4V14.7857C17 16.5609 15.6569 18 14 18C12.3431 18 11 16.5609 11 14.7857V4',
  d3: 'M5 3V13C5 16.7712 5 18.6569 6.17157 19.8284C7.34315 21 9.22876 21 13 21H21',
  d4: 'M10 4L18 4',
  d5: 'M17 14.7857V4H11V14.7857C11 16.5609 12.3431 18 14 18C15.6569 18 17 16.5609 17 14.7857Z',
  d6: 'M5.00019 2C5.55248 2 6.00019 2.44772 6.00019 3V8L11 8C11.5523 8 12 8.44772 12 9C12 9.55229 11.5523 10 11 10H6.00019V13C6.00019 14.9139 6.00232 16.2487 6.13772 17.2558C6.26926 18.2342 6.50985 18.7523 6.87887 19.1213C7.24789 19.4903 7.76598 19.7309 8.74435 19.8625C9.75149 19.9979 11.0863 20 13.0002 20H21.0002C21.5525 20 22.0002 20.4477 22.0002 21C22.0002 21.5523 21.5525 22 21.0002 22H12.9271C11.1036 22 9.63382 22 8.47786 21.8446C7.27771 21.6833 6.26721 21.3381 5.46466 20.5355C4.6621 19.733 4.31691 18.7225 4.15556 17.5223C4.00014 16.3664 4.00016 14.8966 4.00019 13.0732L4.00019 10H3C2.44772 10 2 9.55228 2 9C2 8.44772 2.44772 8 3 8H4.00019V3C4.00019 2.44772 4.44791 2 5.00019 2ZM16 9C16 8.44772 16.4477 8 17 8H20C20.5523 8 21 8.44772 21 9C21 9.55229 20.5523 10 20 10H17C16.4477 10 16 9.55229 16 9Z',
  d7: 'M10 3C9.44772 3 9 3.44772 9 4C9 4.55229 9.44772 5 10 5H10.25V14.7857C10.25 16.9256 11.881 18.75 14 18.75C16.119 18.75 17.75 16.9256 17.75 14.7857V5H18C18.5523 5 19 4.55228 19 4C19 3.44772 18.5523 3 18 3H10Z',
  d8: 'M6.00019 3C6.00019 2.44772 5.55248 2 5.00019 2C4.44791 2 4.00019 2.44772 4.00019 3V8H3C2.44772 8 2 8.44772 2 9C2 9.55228 2.44772 10 3 10H4.00019L4.00019 13.0732C4.00016 14.8966 4.00014 16.3664 4.15556 17.5223C4.31691 18.7225 4.6621 19.733 5.46466 20.5355C6.26721 21.3381 7.27771 21.6833 8.47786 21.8446C9.63382 22 11.1036 22 12.9271 22H21.0002C21.5525 22 22.0002 21.5523 22.0002 21C22.0002 20.4477 21.5525 20 21.0002 20H13.0002C11.0863 20 9.75149 19.9979 8.74435 19.8625C7.76598 19.7309 7.24789 19.4903 6.87887 19.1213C6.50985 18.7523 6.26926 18.2342 6.13772 17.2558C6.00232 16.2487 6.00019 14.9139 6.00019 13V10H10.25V8L6.00019 8V3Z',
  d9: 'M17.75 10V8H20C20.5523 8 21 8.44772 21 9C21 9.55229 20.5523 10 20 10H17.75Z',
  d10: 'M10 3C9.44772 3 9 3.44772 9 4C9 4.55229 9.44772 5 10 5L18 5C18.5523 5 19 4.55228 19 4C19 3.44772 18.5523 3 18 3H10Z',
  d11: 'M2 9L11 9M22 9L17 9',
  d12: 'M5 3V21H22',
  d13: 'M9 4L19 4',
  d14: 'M22 9.5L17 9.5L17 7.5L22 7.5L22 9.5ZM11 9.5L2 9.5L2 7.5L11 7.5L11 9.5Z',
  d15: 'M4 20.5V2.5H6V19.5H22V21.5H5C4.44772 21.5 4 21.0523 4 20.5Z',
  d16: 'M17.75 4.5L19 4.5V2.5H9V4.5L10.25 4.5V14.2857C10.25 16.4256 11.881 18.25 14 18.25C16.119 18.25 17.75 16.4256 17.75 14.2857V4.5Z',
};

export const IconChemistry01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chemistry-01-stroke-rounded IconChemistry01StrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChemistry01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chemistry-01-duotone-rounded IconChemistry01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChemistry01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chemistry-01-twotone-rounded IconChemistry01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChemistry01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chemistry-01-solid-rounded IconChemistry01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChemistry01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chemistry-01-bulk-rounded IconChemistry01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChemistry01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chemistry-01-stroke-sharp IconChemistry01StrokeSharp"
    >
      <path 
        d={d.d11} 
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
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconChemistry01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chemistry-01-solid-sharp IconChemistry01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfChemistry01: TheIconSelfPack = {
  name: 'Chemistry01',
  StrokeRounded: IconChemistry01StrokeRounded,
  DuotoneRounded: IconChemistry01DuotoneRounded,
  TwotoneRounded: IconChemistry01TwotoneRounded,
  SolidRounded: IconChemistry01SolidRounded,
  BulkRounded: IconChemistry01BulkRounded,
  StrokeSharp: IconChemistry01StrokeSharp,
  SolidSharp: IconChemistry01SolidSharp,
};