import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z',
  d2: 'M18.6461 4.52795C18.2489 4.89346 18 5.41766 18 6C18 7.10457 18.8954 8 20 8C20.3793 8 20.7339 7.89441 21.0361 7.71103C21.6139 7.36038 22 6.72527 22 6C22 4.89543 21.1046 4 20 4C19.4778 4 19.0023 4.20016 18.6461 4.52795ZM18.6461 4.52795C16.8794 2.95541 14.5513 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6625 21.9833 11.3289 21.9506 11',
  d3: 'M18 6C18 7.10457 18.8954 8 20 8C20.3793 8 20.7339 7.89441 21.0361 7.71103C21.6139 7.36038 22 6.72527 22 6C22 4.89543 21.1046 4 20 4C19.4778 4 19.0023 4.20016 18.6461 4.52795C18.2489 4.89346 18 5.41766 18 6Z',
  d4: 'M18.6461 4.52795C16.8794 2.95541 14.5513 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6625 21.9833 11.3289 21.9506 11',
  d5: 'M6.25 12C6.25 8.82436 8.82436 6.25 12 6.25C15.1756 6.25 17.75 8.82436 17.75 12C17.75 15.1756 15.1756 17.75 12 17.75C8.82436 17.75 6.25 15.1756 6.25 12Z',
  d6: 'M12 3.20455C7.1424 3.20455 3.20455 7.1424 3.20455 12C3.20455 16.8576 7.1424 20.7955 12 20.7955C16.8576 20.7955 20.7955 16.8576 20.7955 12C20.7955 11.7025 20.7807 11.4087 20.752 11.1193C20.6987 10.5822 21.0908 10.1036 21.6279 10.0502C22.165 9.99691 22.6436 10.3891 22.697 10.9262C22.7321 11.2796 22.75 11.6379 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C14.4707 1.25 16.7483 2.08452 18.5638 3.48596C18.9442 3.30565 19.3698 3.20455 19.8182 3.20455C21.4374 3.20455 22.75 4.51717 22.75 6.13636C22.75 7.20069 22.1822 8.1315 21.3378 8.64398C20.8939 8.91332 20.3726 9.06818 19.8182 9.06818C18.199 9.06818 16.8864 7.75556 16.8864 6.13636C16.8864 5.6877 16.9875 5.26225 17.1678 4.88196C15.7168 3.82646 13.9319 3.20455 12 3.20455Z',
  d7: 'M18.1382 3.97606C18.6274 3.52589 19.2823 3.25 20 3.25C21.5188 3.25 22.75 4.48122 22.75 6C22.75 6.99813 22.2178 7.87124 21.4252 8.35221C21.009 8.60476 20.5203 8.75 20 8.75C18.4812 8.75 17.25 7.51878 17.25 6C17.25 5.19929 17.5932 4.47762 18.1382 3.97606Z',
  d8: 'M3.20455 12C3.20455 7.1424 7.1424 3.20455 12 3.20455C14.042 3.20455 15.9198 3.89938 17.4126 5.06666C17.5646 4.64567 17.8161 4.27244 18.1382 3.97606C18.3037 3.82377 18.4882 3.69143 18.6876 3.58297C16.8524 2.12312 14.5272 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 11.6379 22.7321 11.2796 22.697 10.9262C22.6436 10.3891 22.165 9.99691 21.6279 10.0502C21.0908 10.1036 20.6987 10.5822 20.752 11.1193C20.7807 11.4087 20.7955 11.7025 20.7955 12C20.7955 16.8576 16.8576 20.7955 12 20.7955C7.1424 20.7955 3.20455 16.8576 3.20455 12Z',
  d9: 'M12 3.20455C7.1424 3.20455 3.20455 7.1424 3.20455 12C3.20455 16.8576 7.1424 20.7955 12 20.7955C16.8576 20.7955 20.7955 16.8576 20.7955 12C20.7955 11.7025 20.7807 11.4087 20.752 11.1193L22.697 10.9262C22.7321 11.2796 22.75 11.6379 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C14.4707 1.25 16.7483 2.08452 18.5638 3.48596C18.9442 3.30565 19.3698 3.20455 19.8182 3.20455C21.4374 3.20455 22.75 4.51717 22.75 6.13636C22.75 7.20069 22.1822 8.1315 21.3378 8.64398C20.8939 8.91332 20.3726 9.06818 19.8182 9.06818C18.199 9.06818 16.8864 7.75556 16.8864 6.13636C16.8864 5.6877 16.9875 5.26225 17.1678 4.88196C15.7168 3.82646 13.9319 3.20455 12 3.20455Z',
};

export const IconOrbit01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Orbit01 StrokeRounded"
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

export const IconOrbit01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Orbit01 DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d1}
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

export const IconOrbit01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Orbit01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconOrbit01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Orbit01 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconOrbit01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Orbit01 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconOrbit01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Orbit01 StrokeSharp"
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

export const IconOrbit01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Orbit01 SolidSharp"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfOrbit01: TheIconSelfPack = [
  'Orbit01',
  IconOrbit01StrokeRounded,
  IconOrbit01DuotoneRounded,
  IconOrbit01TwotoneRounded,
  IconOrbit01SolidRounded,
  IconOrbit01BulkRounded,
  IconOrbit01StrokeSharp,
  IconOrbit01SolidSharp,
];