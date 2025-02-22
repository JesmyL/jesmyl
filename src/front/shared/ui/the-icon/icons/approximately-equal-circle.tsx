import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 9.28466C8.66667 7.2854 10.3333 7.87052 12 9.33333C13.6667 10.7961 15.3333 11.3813 17 9.382M7 14.618C8.66667 12.6187 10.3333 13.2039 12 14.6667C13.6667 16.1295 15.3333 16.7146 17 14.7153',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.76813 9.92518C8.45522 9.10097 8.99032 8.96696 9.40538 9.00642C9.91599 9.05497 10.5497 9.39113 11.3404 10.0851C12.2164 10.8539 13.2493 11.5417 14.4054 11.6517C15.657 11.7706 16.7886 11.1976 17.7681 10.0225C18.1218 9.59831 18.0646 8.96773 17.6403 8.61409C17.2161 8.26045 16.5856 8.31766 16.2319 8.74187C15.5448 9.56608 15.0097 9.70009 14.5947 9.66063C14.0841 9.61209 13.4504 9.27592 12.6597 8.58195C11.7837 7.81311 10.7507 7.12531 9.59467 7.0154C8.34307 6.89641 7.21149 7.46948 6.23192 8.64453C5.87828 9.06875 5.93549 9.69932 6.3597 10.053C6.78392 10.4066 7.41449 10.3494 7.76813 9.92518ZM7.76813 15.2585C8.45522 14.4343 8.99032 14.3003 9.40538 14.3398C9.91599 14.3883 10.5497 14.7245 11.3404 15.4184C12.2164 16.1873 13.2493 16.8751 14.4054 16.985C15.657 17.104 16.7886 16.5309 17.7681 15.3559C18.1218 14.9316 18.0646 14.3011 17.6403 13.9474C17.2161 13.5938 16.5856 13.651 16.2319 14.0752C15.5448 14.8994 15.0097 15.0334 14.5947 14.994C14.0841 14.9454 13.4504 14.6093 12.6597 13.9153C11.7837 13.1464 10.7507 12.4586 9.59467 12.3487C8.34307 12.2297 7.21149 12.8028 6.23192 13.9779C5.87828 14.4021 5.93549 15.0327 6.3597 15.3863C6.78392 15.7399 7.41449 15.6827 7.76813 15.2585Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M9.40538 9.00642C8.99032 8.96696 8.45522 9.10097 7.76813 9.92518C7.41449 10.3494 6.78392 10.4066 6.3597 10.053C5.93549 9.69932 5.87828 9.06875 6.23192 8.64453C7.21149 7.46948 8.34307 6.89641 9.59467 7.0154C10.7507 7.12531 11.7837 7.81311 12.6597 8.58195C13.4504 9.27592 14.0841 9.61209 14.5947 9.66063C15.0097 9.70009 15.5448 9.56608 16.2319 8.74187C16.5856 8.31766 17.2161 8.26045 17.6403 8.61409C18.0646 8.96773 18.1218 9.59831 17.7681 10.0225C16.7886 11.1976 15.657 11.7706 14.4054 11.6517C13.2493 11.5417 12.2164 10.8539 11.3404 10.0851C10.5497 9.39113 9.91599 9.05497 9.40538 9.00642ZM9.40538 14.3398C8.99032 14.3003 8.45522 14.4343 7.76813 15.2585C7.41449 15.6827 6.78392 15.7399 6.3597 15.3863C5.93549 15.0327 5.87828 14.4021 6.23192 13.9779C7.21149 12.8028 8.34307 12.2297 9.59467 12.3487C10.7507 12.4586 11.7837 13.1464 12.6597 13.9153C13.4504 14.6093 14.0841 14.9454 14.5947 14.994C15.0097 15.0334 15.5448 14.8994 16.2319 14.0752C16.5856 13.651 17.2161 13.5938 17.6403 13.9474C18.0646 14.3011 18.1218 14.9316 17.7681 15.3559C16.7886 16.5309 15.657 17.104 14.4054 16.985C13.2493 16.8751 12.2164 16.1873 11.3404 15.4184C10.5497 14.7245 9.91599 14.3883 9.40538 14.3398Z',
  d5: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.76863 9.92518C8.45573 9.10097 8.99082 8.96696 9.40589 9.00642C9.91649 9.05497 10.5502 9.39113 11.3409 10.0851C12.2169 10.8539 13.2498 11.5417 14.4059 11.6517C15.6575 11.7706 16.7891 11.1976 17.7686 10.0225L16.2324 8.74187C15.5453 9.56608 15.0102 9.70009 14.5952 9.66063C14.0846 9.61209 13.4509 9.27592 12.6602 8.58195C11.7842 7.81311 10.7512 7.12531 9.59517 7.0154C8.34357 6.89641 7.212 7.46948 6.23242 8.64453L7.76863 9.92518ZM7.76863 15.2585C8.45573 14.4343 8.99082 14.3003 9.40589 14.3398C9.91649 14.3883 10.5502 14.7245 11.3409 15.4184C12.2169 16.1873 13.2498 16.8751 14.4059 16.985C15.6575 17.104 16.7891 16.5309 17.7686 15.3559L16.2324 14.0752C15.5453 14.8994 15.0102 15.0334 14.5952 14.994C14.0846 14.9454 13.4509 14.6093 12.6602 13.9153C11.7842 13.1464 10.7512 12.4586 9.59517 12.3487C8.34357 12.2297 7.212 12.8028 6.23242 13.9779L7.76863 15.2585Z',
};

export const IconApproximatelyEqualCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="approximately-equal-circle-stroke-rounded IconApproximatelyEqualCircleStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconApproximatelyEqualCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="approximately-equal-circle-duotone-rounded IconApproximatelyEqualCircleDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
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

export const IconApproximatelyEqualCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="approximately-equal-circle-twotone-rounded IconApproximatelyEqualCircleTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconApproximatelyEqualCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="approximately-equal-circle-solid-rounded IconApproximatelyEqualCircleSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconApproximatelyEqualCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="approximately-equal-circle-bulk-rounded IconApproximatelyEqualCircleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconApproximatelyEqualCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="approximately-equal-circle-stroke-sharp IconApproximatelyEqualCircleStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconApproximatelyEqualCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="approximately-equal-circle-solid-sharp IconApproximatelyEqualCircleSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfApproximatelyEqualCircle: TheIconSelfPack = {
  name: 'ApproximatelyEqualCircle',
  StrokeRounded: IconApproximatelyEqualCircleStrokeRounded,
  DuotoneRounded: IconApproximatelyEqualCircleDuotoneRounded,
  TwotoneRounded: IconApproximatelyEqualCircleTwotoneRounded,
  SolidRounded: IconApproximatelyEqualCircleSolidRounded,
  BulkRounded: IconApproximatelyEqualCircleBulkRounded,
  StrokeSharp: IconApproximatelyEqualCircleStrokeSharp,
  SolidSharp: IconApproximatelyEqualCircleSolidSharp,
};