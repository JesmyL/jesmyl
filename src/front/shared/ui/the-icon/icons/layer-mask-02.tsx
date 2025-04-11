import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
  d2: 'M8.5 2.62964C12.2967 4.04837 15 7.7085 15 12C15 16.2916 12.2967 19.9517 8.5 21.3704',
  d3: 'M9 2.45703C4.94289 3.73129 2 7.52159 2 11.9992C2 16.2908 4.70333 19.9509 8.5 21.3696C19 16.9992 14.5 5.49923 9 2.45703Z',
  d4: 'M8.5 2.62891C12.2967 4.04764 15 7.70777 15 11.9993C15 16.2908 12.2967 19.951 8.5 21.3697',
  d5: 'M8.5 2.62988C12.2967 4.04862 15 7.70875 15 12.0003C15 16.2918 12.2967 19.9519 8.5 21.3707',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.23276 3.64869C5.73093 4.80843 3.20455 8.10918 3.20455 12C3.20455 15.8908 5.73092 19.1915 9.23273 20.3513C12.3488 18.8626 14.5001 15.6817 14.5001 12C14.5001 8.3183 12.3488 5.13744 9.23276 3.64869Z',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z',
  d8: 'M9.23232 3.64844C5.73049 4.80817 3.2041 8.10893 3.2041 11.9997C3.2041 15.8906 5.73047 19.1913 9.23228 20.351C12.3484 18.8623 14.4996 15.6814 14.4996 11.9997C14.4996 8.31805 12.3484 5.13719 9.23232 3.64844Z',
  d9: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM8.50074 3.43481C5.12698 4.81457 2.75 8.12971 2.75 12C2.75 15.8703 5.12692 19.1854 8.5006 20.5652C11.8751 19.1848 14.2508 15.8689 14.2508 12C14.2508 8.13104 11.8752 4.81517 8.50074 3.43481Z',
};

export const IconLayerMask02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LayerMask02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayerMask02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LayerMask02 DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="f o1"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayerMask02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LayerMask02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayerMask02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LayerMask02 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLayerMask02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LayerMask02 BulkRounded"
    >
      <path 
        d={d.d7}
        i-c="f o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLayerMask02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LayerMask02 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayerMask02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LayerMask02 SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLayerMask02: TheIconSelfPack = [
  'LayerMask02',
  IconLayerMask02StrokeRounded,
  IconLayerMask02DuotoneRounded,
  IconLayerMask02TwotoneRounded,
  IconLayerMask02SolidRounded,
  IconLayerMask02BulkRounded,
  IconLayerMask02StrokeSharp,
  IconLayerMask02SolidSharp,
];