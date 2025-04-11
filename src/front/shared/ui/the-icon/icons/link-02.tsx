import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.5 14.5L14.5 9.5',
  d2: 'M16.8463 14.6095L19.4558 12C21.5147 9.94113 21.5147 6.60303 19.4558 4.54416C17.397 2.48528 14.0589 2.48528 12 4.54416L9.39045 7.1537M14.6095 16.8463L12 19.4558C9.94113 21.5147 6.60303 21.5147 4.54416 19.4558C2.48528 17.397 2.48528 14.0589 4.54416 12L7.1537 9.39045',
  d3: 'M16.8463 14.6095L19.4558 12C21.5147 9.94113 21.5147 6.60303 19.4558 4.54416C17.397 2.48528 14.0589 2.48528 12 4.54416L9.39045 7.1537L7.1537 9.39045L4.54416 12C2.48528 14.0589 2.48528 17.397 4.54416 19.4558C6.60303 21.5147 9.94113 21.5147 12 19.4558L14.6095 16.8463L16.8463 14.6095Z',
  d4: 'M15.2071 8.79289C15.5976 9.18342 15.5976 9.81658 15.2071 10.2071L10.2071 15.2071C9.81658 15.5976 9.18342 15.5976 8.79289 15.2071C8.40237 14.8166 8.40237 14.1834 8.79289 13.7929L13.7929 8.79289C14.1834 8.40237 14.8166 8.40237 15.2071 8.79289Z',
  d5: 'M11.2929 3.83705C13.7423 1.38765 17.7136 1.38765 20.163 3.83705C22.6124 6.28645 22.6124 10.2577 20.163 12.7071L17.7071 15.1629C17.3166 15.5535 16.6834 15.5535 16.2929 15.1629C15.9024 14.7724 15.9024 14.1393 16.2929 13.7487L18.7487 11.2929C20.4171 9.62454 20.4171 6.91961 18.7487 5.25126C17.0804 3.58291 14.3755 3.58291 12.7071 5.25126L10.2513 7.70711C9.86074 8.09763 9.22757 8.09763 8.83705 7.70711C8.44652 7.31658 8.44652 6.68342 8.83705 6.29289L11.2929 3.83705ZM7.70711 8.83705C8.09763 9.22757 8.09763 9.86074 7.70711 10.2513L5.25126 12.7071C3.58291 14.3755 3.58291 17.0804 5.25126 18.7487C6.91961 20.4171 9.62454 20.4171 11.2929 18.7487L13.7487 16.2929C14.1393 15.9024 14.7724 15.9024 15.1629 16.2929C15.5535 16.6834 15.5535 17.3166 15.1629 17.7071L12.7071 20.163C10.2577 22.6124 6.28645 22.6124 3.83705 20.163C1.38765 17.7136 1.38765 13.7423 3.83705 11.2929L6.29289 8.83705C6.68342 8.44652 7.31658 8.44652 7.70711 8.83705Z',
  d6: 'M15.2072 10.2071L10.2072 15.2071L8.79297 13.7928L13.793 8.79285L15.2072 10.2071Z',
  d7: 'M11.2929 3.83705C13.7423 1.38765 17.7136 1.38765 20.163 3.83705C22.6124 6.28645 22.6123 10.2577 20.163 12.7071L17.5534 15.3167L16.1392 13.9024L18.7487 11.2929C20.4171 9.62454 20.4171 6.91961 18.7487 5.25126C17.0804 3.58291 14.3755 3.58291 12.7071 5.25126L10.0976 7.86081L8.68335 6.44659L11.2929 3.83705ZM3.83705 11.2929L6.44659 8.68335L7.86081 10.0976L5.25126 12.7071C3.58291 14.3755 3.58291 17.0804 5.25126 18.7487C6.91961 20.4171 9.62454 20.4171 11.2929 18.7487L13.9024 16.1392L15.3167 17.5534L12.7071 20.163C10.2577 22.6124 6.28645 22.6123 3.83705 20.163C1.38765 17.7136 1.38765 13.7423 3.83705 11.2929Z',
};

export const IconLink02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLink02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link02 DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLink02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLink02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link02 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLink02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link02 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLink02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link02 StrokeSharp"
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

export const IconLink02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link02 SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLink02: TheIconSelfPack = [
  'Link02',
  IconLink02StrokeRounded,
  IconLink02DuotoneRounded,
  IconLink02TwotoneRounded,
  IconLink02SolidRounded,
  IconLink02BulkRounded,
  IconLink02StrokeSharp,
  IconLink02SolidSharp,
];