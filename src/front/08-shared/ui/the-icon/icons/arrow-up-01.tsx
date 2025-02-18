import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 15C18 15 13.5811 9.00001 12 9C10.4188 8.99999 6 15 6 15',
  d2: 'M12 9C10.4189 8.99999 6.00005 15 6.00005 15',
  d3: 'M18.593 15.8051C19.0376 15.4776 19.1326 14.8516 18.8051 14.4069C18.5507 14.0615 18.2963 13.7332 18.0731 13.4472C17.6276 12.8764 17.0143 12.1118 16.3479 11.3444C15.6859 10.5819 14.9518 9.79361 14.2666 9.18811C13.9251 8.88637 13.5721 8.60888 13.2279 8.4014C12.9112 8.21046 12.476 8 11.9999 8C11.5238 8 11.0885 8.21046 10.7718 8.4014C10.4276 8.60888 10.0747 8.88637 9.7332 9.18811C9.04791 9.79361 8.31387 10.5819 7.65183 11.3444C6.98548 12.1118 6.37216 12.8764 5.92664 13.4472C5.70347 13.7332 5.44902 14.0615 5.19463 14.4069C4.86712 14.8516 4.96211 15.4776 5.4068 15.8051C5.58556 15.9368 5.79362 16.0002 5.99982 16L11.9999 16L17.9999 16C18.2061 16.0002 18.4142 15.9368 18.593 15.8051Z',
  d4: 'M18.593 15.8051C19.0376 15.4776 19.1326 14.8516 18.8051 14.4069C18.5507 14.0615 18.2963 13.7332 18.0731 13.4472C17.6276 12.8764 17.0143 12.1118 16.3479 11.3444C15.6859 10.5819 14.9518 9.79361 14.2666 9.18811C13.9251 8.88637 13.5721 8.60888 13.2279 8.4014C12.9112 8.21046 12.476 8 11.9999 8C11.5238 8 11.0885 8.21046 10.7718 8.4014C10.4276 8.60888 10.0747 8.88637 9.7332 9.18811C9.16604 9.68924 8.56549 10.3155 8 10.9488L13 16L17.9999 16C18.2061 16.0002 18.4142 15.9368 18.593 15.8051Z',
  d5: 'M18 15L12 9L6 15',
  d6: 'M20 16.5H4L12 7.5L20 16.5Z',
};

export const IconArrowUp01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-01-stroke-rounded IconArrowUp01StrokeRounded"
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

export const IconArrowUp01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-01-duotone-rounded IconArrowUp01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowUp01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-01-twotone-rounded IconArrowUp01TwotoneRounded"
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

export const IconArrowUp01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-01-solid-rounded IconArrowUp01SolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowUp01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-01-bulk-rounded IconArrowUp01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconArrowUp01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-01-stroke-sharp IconArrowUp01StrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeMiterlimit="16" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowUp01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-01-solid-sharp IconArrowUp01SolidSharp"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowUp01: TheIconSelfPack = {
  name: 'ArrowUp01',
  StrokeRounded: IconArrowUp01StrokeRounded,
  DuotoneRounded: IconArrowUp01DuotoneRounded,
  TwotoneRounded: IconArrowUp01TwotoneRounded,
  SolidRounded: IconArrowUp01SolidRounded,
  BulkRounded: IconArrowUp01BulkRounded,
  StrokeSharp: IconArrowUp01StrokeSharp,
  SolidSharp: IconArrowUp01SolidSharp,
};