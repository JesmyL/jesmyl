import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.19351 11.3965L12.192 3.31186C12.6611 2.67957 13.5405 3.07311 13.5405 3.91536V10.1729C13.5405 10.6775 13.8853 11.0865 14.3107 11.0865H17.2283C17.891 11.0865 18.2443 12.0134 17.8065 12.6035L11.808 20.6881C11.3389 21.3204 10.4595 20.9269 10.4595 20.0846V13.8271C10.4595 13.3225 10.1147 12.9135 9.68931 12.9135H6.77173C6.10895 12.9135 5.75566 11.9866 6.19351 11.3965Z',
  d2: 'M9.68931 12.9135H6.77173C6.10895 12.9135 5.75566 11.9866 6.19351 11.3965L12.192 3.31186C12.6611 2.67957 13.5405 3.07311 13.5405 3.91536V10.1729C13.5405 10.6775 13.8853 11.0865 14.3107 11.0865',
  d3: 'M9.68945 12.9135C10.1148 12.9135 10.4597 13.3225 10.4597 13.827V20.0846C10.4597 20.9268 11.339 21.3204 11.8081 20.6881L17.8066 12.6035C18.2445 12.0133 17.8912 11.0864 17.2284 11.0864H14.3108',
  d4: 'M13.3483 2.37613C13.9203 2.6321 14.2902 3.22532 14.2902 3.91539V10.173C14.2902 10.2566 14.3191 10.3116 14.3392 10.3355L14.3401 10.3365H17.228C17.9557 10.3365 18.4372 10.8489 18.6307 11.3566C18.8254 11.8674 18.8005 12.5222 18.4086 13.0504L12.4101 21.1351C11.9661 21.7335 11.2512 21.8924 10.6512 21.6239C10.0793 21.368 9.70932 20.7747 9.70932 20.0847V13.8271C9.70932 13.7435 9.68044 13.6884 9.66033 13.6646L9.65947 13.6636H6.77151C6.04386 13.6636 5.56235 13.1511 5.36884 12.6435C5.17416 12.1327 5.19905 11.4778 5.59097 10.9496L11.5895 2.865C12.0335 2.26658 12.7484 2.10762 13.3483 2.37613Z',
  d5: 'M14.3389 10.3354L14.3398 10.3365H17.2278C17.9554 10.3365 18.4369 10.8489 18.6304 11.3566C18.8251 11.8673 18.8002 12.5222 18.4083 13.0504L12.4098 21.135C11.9658 21.7334 11.2509 21.8924 10.651 21.6239C10.079 21.3679 9.70903 20.7747 9.70903 20.0846V13.827C9.70903 13.7434 9.68015 13.6884 9.66004 13.6645L14.3389 10.3354Z',
  d6: 'M13.3483 2.37613C13.9203 2.6321 14.2902 3.22532 14.2902 3.91539V10.173C14.2902 10.2566 14.3191 10.3116 14.3392 10.3355L9.66033 13.6646L9.65947 13.6636H6.77151C6.04386 13.6636 5.56235 13.1511 5.36884 12.6435C5.17416 12.1327 5.19905 11.4778 5.59097 10.9496L11.5895 2.865C12.0335 2.26658 12.7484 2.10762 13.3483 2.37613Z',
  d7: 'M6 12.9998L13.4998 2.99976V10.9999H17.9999L10.5 20.9998V12.9998H6Z',
  d8: 'M13.737 2.28829C14.0433 2.39038 14.2499 2.67698 14.2499 2.9998V10.25H17.9999C18.2839 10.25 18.5436 10.4105 18.6707 10.6645C18.7977 10.9186 18.7703 11.2227 18.5999 11.45L11.1 21.4498C10.9063 21.7081 10.5691 21.8134 10.2628 21.7113C9.95658 21.6092 9.75 21.3226 9.75 20.9998V13.7498H6C5.71593 13.7498 5.45623 13.5893 5.32919 13.3352C5.20214 13.0811 5.22956 12.7771 5.4 12.5498L12.8998 2.54981C13.0935 2.29155 13.4308 2.18621 13.737 2.28829Z',
};

export const IconEnergyStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Energy StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEnergyDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Energy DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEnergyTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Energy TwotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEnergySolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Energy SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconEnergyBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Energy BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconEnergyStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Energy StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEnergySolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Energy SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfEnergy: TheIconSelfPack = [
  'Energy',
  IconEnergyStrokeRounded,
  IconEnergyDuotoneRounded,
  IconEnergyTwotoneRounded,
  IconEnergySolidRounded,
  IconEnergyBulkRounded,
  IconEnergyStrokeSharp,
  IconEnergySolidSharp,
];