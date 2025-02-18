import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 2.4578C14.053 2.16035 13.0452 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.9548 21.8396 9.94704 21.5422 9',
  d2: 'M8.5 9.5L12 13L21.0002 3',
  d3: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
  d4: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 9.94317 22.1724 8.02126 21.1704 6.38765C20.9949 6.1015 20.9072 5.95843 20.7574 5.94471C20.6077 5.931 20.4909 6.0607 20.2575 6.32012L12.7433 14.669C12.5598 14.8729 12.3005 14.9925 12.0263 14.9997C11.752 15.0069 11.4869 14.9011 11.2929 14.7071L7.79289 11.2071C7.40237 10.8166 7.40237 10.1834 7.79289 9.7929C8.18342 9.40238 8.81658 9.40238 9.20711 9.7929L11.5146 12.1004C11.7245 12.3103 11.8294 12.4152 11.9582 12.4118C12.0871 12.4084 12.1864 12.2981 12.3849 12.0776L19.0502 4.67182C19.236 4.46545 19.3288 4.36227 19.3208 4.2363C19.3128 4.11034 19.2115 4.02317 19.0089 3.84882C17.1269 2.22909 14.6778 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12Z',
  d5: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12Z',
  d6: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C14.6463 1.25 17.0692 2.20617 18.9422 3.79186L11.9618 11.5476L9.20711 8.79289L7.79289 10.2071L12.0382 14.4524L20.345 5.22281C21.8487 7.07208 22.75 9.43078 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75Z',
};

export const IconCheckmarkCircle04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="checkmark-circle-04-stroke-rounded IconCheckmarkCircle04StrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCheckmarkCircle04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="checkmark-circle-04-duotone-rounded IconCheckmarkCircle04DuotoneRounded"
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

export const IconCheckmarkCircle04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="checkmark-circle-04-twotone-rounded IconCheckmarkCircle04TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconCheckmarkCircle04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="checkmark-circle-04-solid-rounded IconCheckmarkCircle04SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCheckmarkCircle04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="checkmark-circle-04-bulk-rounded IconCheckmarkCircle04BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
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

export const IconCheckmarkCircle04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="checkmark-circle-04-stroke-sharp IconCheckmarkCircle04StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCheckmarkCircle04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="checkmark-circle-04-solid-sharp IconCheckmarkCircle04SolidSharp"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCheckmarkCircle04: TheIconSelfPack = {
  name: 'CheckmarkCircle04',
  StrokeRounded: IconCheckmarkCircle04StrokeRounded,
  DuotoneRounded: IconCheckmarkCircle04DuotoneRounded,
  TwotoneRounded: IconCheckmarkCircle04TwotoneRounded,
  SolidRounded: IconCheckmarkCircle04SolidRounded,
  BulkRounded: IconCheckmarkCircle04BulkRounded,
  StrokeSharp: IconCheckmarkCircle04StrokeSharp,
  SolidSharp: IconCheckmarkCircle04SolidSharp,
};