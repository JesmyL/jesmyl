import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 20H6.47347C4.36707 20 3.31387 20 3.05177 19.3827C2.78966 18.7654 3.53439 18.0388 5.02384 16.5858L17.9249 4',
  d2: 'M11 20C11 17.3517 9.77371 15.0655 8 14',
  d3: 'M3.05177 19.382C3.31387 19.9993 4.36707 19.9993 6.47347 19.9993H9C9.97435 19.9993 10.4615 19.9993 10.7618 19.6158C11.0621 19.2324 10.9621 18.8276 10.7622 18.0181C10.3238 16.2425 9.31156 14.7872 8 13.9993L7.80177 13.875L5.02384 16.5851C3.53439 18.0381 2.78966 18.7646 3.05177 19.382Z',
  d4: 'M18.6214 4.7158C19.0167 4.33013 19.0245 3.69702 18.6389 3.30169C18.2532 2.90637 17.6201 2.89854 17.2248 3.2842L4.26746 15.9249C3.57083 16.6044 2.97047 17.19 2.58725 17.687C2.22067 18.1624 1.7663 18.9181 2.1295 19.7735C2.48727 20.6161 3.33472 20.831 3.93255 20.9135C4.56072 21.0001 5.40733 21.0001 6.39486 21L20.9982 21C21.5505 21 21.9982 20.5523 21.9982 20C21.9982 19.4477 21.5505 19 20.9982 19H11.6937C11.4667 16.9318 10.544 15.0996 9.17683 13.9296L18.6214 4.7158Z',
  d5: 'M18.6214 4.7158C19.0167 4.33013 19.0245 3.69702 18.6389 3.30169C18.2532 2.90637 17.6201 2.89854 17.2248 3.2842L4.26746 15.9249C3.57083 16.6044 2.97047 17.19 2.58725 17.687C2.22067 18.1624 1.7663 18.9181 2.1295 19.7735C2.48727 20.6161 3.33472 20.831 3.93255 20.9135C4.56072 21.0001 5.40733 21.0001 6.39486 21L20.9982 21C21.5505 21 21.9982 20.5523 21.9982 20C21.9982 19.4477 21.5505 19 20.9982 19H5.41018C4.78299 19 4.46939 19 4.39341 18.8129C4.31742 18.6257 4.54224 18.4071 4.99188 17.9699L18.6214 4.7158Z',
  d6: 'M4.99193 17.97C4.54229 18.4072 4.31747 18.6259 4.39346 18.813C4.46945 19.0001 4.78304 19.0001 5.41023 19.0001H11.6937C11.4667 16.932 10.544 15.0997 9.17688 13.9297L4.99193 17.97Z',
  d7: 'M21.0003 20H3L17.9252 4',
  d8: 'M19.4742 4.36424L10.3058 14.1778C11.4747 15.3932 12.2457 17.1067 12.4481 19.0003H21.5003V21.0003H3.50002C3.10187 21.0003 2.74166 20.7641 2.58293 20.3989C2.4242 20.0338 2.4972 19.6093 2.76878 19.3181L18.0117 3L19.4742 4.36424Z',
};

export const IconAngle01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-01-stroke-rounded IconAngle01StrokeRounded"
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

export const IconAngle01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-01-duotone-rounded IconAngle01DuotoneRounded"
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

export const IconAngle01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-01-twotone-rounded IconAngle01TwotoneRounded"
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

export const IconAngle01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-01-solid-rounded IconAngle01SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAngle01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-01-bulk-rounded IconAngle01BulkRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAngle01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-01-stroke-sharp IconAngle01StrokeSharp"
    >
      <path 
        d={d.d7} 
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

export const IconAngle01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-01-solid-sharp IconAngle01SolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAngle01: TheIconSelfPack = {
  name: 'Angle01',
  StrokeRounded: IconAngle01StrokeRounded,
  DuotoneRounded: IconAngle01DuotoneRounded,
  TwotoneRounded: IconAngle01TwotoneRounded,
  SolidRounded: IconAngle01SolidRounded,
  BulkRounded: IconAngle01BulkRounded,
  StrokeSharp: IconAngle01StrokeSharp,
  SolidSharp: IconAngle01SolidSharp,
};