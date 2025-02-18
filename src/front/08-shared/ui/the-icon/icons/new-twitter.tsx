import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516',
  d2: 'M8 3H3L10.5484 13.4516L16 21H21L13.4516 10.5484L8 3Z',
  d3: 'M3 21L10.5484 13.4516M21 3L13.4516 10.5484',
  d4: 'M2.3569 2.78113C2.52359 2.45513 2.85886 2.25 3.225 2.25H8.1C8.41308 2.25 8.70711 2.40034 8.89041 2.65415L13.5354 9.08571L20.0856 2.53557C20.4663 2.15481 21.0837 2.15481 21.4644 2.53557C21.8452 2.91633 21.8452 3.53367 21.4644 3.91443L14.6919 10.687L21.5654 20.2041C21.7798 20.501 21.8098 20.8929 21.6431 21.2189C21.4764 21.5449 21.1411 21.75 20.775 21.75H15.9C15.5869 21.75 15.2929 21.5997 15.1096 21.3459L10.4646 14.9143L3.91443 21.4644C3.53367 21.8452 2.91634 21.8452 2.53557 21.4644C2.15481 21.0837 2.15481 20.4663 2.53557 20.0856L9.30811 13.313L2.43459 3.79585C2.22022 3.49903 2.19021 3.10713 2.3569 2.78113Z',
  d5: 'M2.3569 2.78113C2.52359 2.45513 2.85886 2.25 3.225 2.25H8.1C8.41308 2.25 8.70711 2.40034 8.89041 2.65415L21.5654 20.2041C21.7798 20.501 21.8098 20.8929 21.6431 21.2189C21.4764 21.5449 21.1411 21.75 20.775 21.75H15.9C15.5869 21.75 15.2929 21.5997 15.1096 21.3459L2.43459 3.79585C2.22022 3.49903 2.19021 3.10713 2.3569 2.78113Z',
  d6: 'M2.53557 20.0856L20.0856 2.53557C20.4663 2.15481 21.0837 2.15481 21.4644 2.53557C21.8452 2.91633 21.8452 3.53367 21.4644 3.91443L3.91443 21.4644C3.53367 21.8452 2.91634 21.8452 2.53557 21.4644C2.15481 21.0837 2.15481 20.4663 2.53557 20.0856Z',
  d7: 'M1.75006 2.25H8.16673L22.2501 21.75H15.8334L1.75006 2.25Z',
  d8: 'M22.2497 2.24951L4.45448 21.7495H1.74969L19.5449 2.24951H22.2497Z',
};

export const IconNewTwitterStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-stroke-rounded IconNewTwitterStrokeRounded"
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

export const IconNewTwitterDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-duotone-rounded IconNewTwitterDuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconNewTwitterTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-twotone-rounded IconNewTwitterTwotoneRounded"
    >
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
    </TheIconWrapper>
  );
};

export const IconNewTwitterSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-solid-rounded IconNewTwitterSolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNewTwitterBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-bulk-rounded IconNewTwitterBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNewTwitterStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-stroke-sharp IconNewTwitterStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconNewTwitterSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-solid-sharp IconNewTwitterSolidSharp"
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

export const iconPackOfNewTwitter: TheIconSelfPack = {
  name: 'NewTwitter',
  StrokeRounded: IconNewTwitterStrokeRounded,
  DuotoneRounded: IconNewTwitterDuotoneRounded,
  TwotoneRounded: IconNewTwitterTwotoneRounded,
  SolidRounded: IconNewTwitterSolidRounded,
  BulkRounded: IconNewTwitterBulkRounded,
  StrokeSharp: IconNewTwitterStrokeSharp,
  SolidSharp: IconNewTwitterSolidSharp,
};