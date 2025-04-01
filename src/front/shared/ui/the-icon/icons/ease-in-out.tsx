import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 4C11.0535 4 12.9465 20 3 20',
  d2: 'M3 20C7.97325 20 9.98662 16 12 12',
  d3: 'M9.3467 18.1762C7.81113 19.8493 5.80885 21 3 21C2.44772 21 2 20.5523 2 20C2 19.4477 2.44772 19 3 19C5.1644 19 6.65543 18.1507 7.87321 16.8238C9.13806 15.4457 10.0847 13.581 11.1068 11.5504L11.1416 11.4813C12.1231 9.53112 13.1822 7.42671 14.6533 5.82383C16.1889 4.1507 18.1912 3 21 3C21.5523 3 22 3.44772 22 4C22 4.55228 21.5523 5 21 5C18.8356 5 17.3446 5.8493 16.1268 7.17617C14.8619 8.55433 13.9153 10.419 12.8932 12.4496L12.8584 12.5187C11.8769 14.4689 10.8178 16.5733 9.3467 18.1762Z',
  d4: 'M12.4496 11.107C12.9429 11.3553 13.1415 11.9565 12.8932 12.4498L12.8584 12.5189C11.8769 14.4691 10.8178 16.5735 9.3467 18.1764C7.81113 19.8495 5.80885 21.0002 3 21.0002C2.44772 21.0002 2 20.5525 2 20.0002C2 19.4479 2.44772 19.0002 3 19.0002C5.1644 19.0002 6.65543 18.1509 7.87321 16.824C9.13806 15.4459 10.0847 13.5812 11.1068 11.5506C11.3551 11.0573 11.9563 10.8587 12.4496 11.107Z',
  d5: 'M9.3467 18.1762C7.81113 19.8493 5.80885 21 3 21V19C5.1644 19 6.65543 18.1507 7.87321 16.8238C9.13806 15.4457 10.0847 13.581 11.1068 11.5504L11.1416 11.4813C12.1231 9.53112 13.1822 7.42671 14.6533 5.82383C16.1889 4.1507 18.1912 3 21 3V5C18.8356 5 17.3446 5.8493 16.1268 7.17617C14.8619 8.55433 13.9153 10.419 12.8932 12.4496L12.8584 12.5187C11.8769 14.4689 10.8178 16.5733 9.3467 18.1762Z',
};

export const IconEaseInOutStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-out-stroke-rounded IconEaseInOutStrokeRounded"
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

export const IconEaseInOutDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-out-duotone-rounded IconEaseInOutDuotoneRounded"
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

export const IconEaseInOutTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-out-twotone-rounded IconEaseInOutTwotoneRounded"
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

export const IconEaseInOutSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-out-solid-rounded IconEaseInOutSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconEaseInOutBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-out-bulk-rounded IconEaseInOutBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconEaseInOutStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-out-stroke-sharp IconEaseInOutStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEaseInOutSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-out-solid-sharp IconEaseInOutSolidSharp"
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

export const iconPackOfEaseInOut: TheIconSelfPack = {
  name: 'EaseInOut',
  StrokeRounded: IconEaseInOutStrokeRounded,
  DuotoneRounded: IconEaseInOutDuotoneRounded,
  TwotoneRounded: IconEaseInOutTwotoneRounded,
  SolidRounded: IconEaseInOutSolidRounded,
  BulkRounded: IconEaseInOutBulkRounded,
  StrokeSharp: IconEaseInOutStrokeSharp,
  SolidSharp: IconEaseInOutSolidSharp,
};