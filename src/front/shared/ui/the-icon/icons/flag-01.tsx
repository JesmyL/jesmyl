import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.0249 21C5.04385 19.2643 5.04366 17.5541 5.0366 15.9209M5.0366 15.9209C5.01301 10.4614 4.91276 5.86186 5.19475 4.04271C5.5611 1.67939 9.39301 3.82993 13.9703 5.59842L16.0328 6.48729C17.5508 7.1415 19.7187 8.30352 18.7662 9.66084C18.3738 10.22 17.56 10.8596 16.0575 11.567L5.0366 15.9209Z',
  d2: 'M13.1087 5.31643L9.89276 4.03716C7.68403 3.15855 6.57967 2.71925 5.78983 3.19461C5 3.66997 5 4.77394 5 6.98188V16L13.1087 12.7744C17.0362 11.2121 19 10.431 19 9.04544C19 7.65991 17.0362 6.87875 13.1087 5.31643Z',
  d3: 'M5 21C5.01895 19.2516 5.01876 17.5289 5.0117 15.8838',
  d4: 'M5.0366 16.0162C5.01301 10.5168 4.91276 5.88372 5.19475 4.0513C5.5611 1.67072 9.39301 3.83696 13.9703 5.61836L16.0328 6.51372C17.5508 7.17271 19.7187 8.34321 18.7662 9.71044C18.3738 10.2737 17.56 10.9179 16.0575 11.6305L5.0366 16.0162Z',
  d5: 'M17.9006 6.59675C16.8721 6.00617 15.3595 5.40452 13.4496 4.6448L10.1164 3.31887C9.05763 2.89769 8.18982 2.55246 7.48849 2.37982C6.76563 2.20187 6.05088 2.16207 5.40309 2.55195C4.73664 2.95306 4.47329 3.60696 4.35832 4.3189C4.27577 4.83011 4.25611 5.46115 4.25144 6.19584C4.25048 6.21377 4.25 6.23183 4.25 6.25V20.75C4.25 21.3023 4.69772 21.75 5.25 21.75C5.80228 21.75 6.25 21.3023 6.25 20.75V16.7169C6.25 16.5198 6.25 16.4212 6.30174 16.345C6.35348 16.2687 6.44506 16.2323 6.62823 16.1594L13.4496 13.4459C15.3595 12.6862 16.8721 12.0846 17.9006 11.494C18.9165 10.9107 19.75 10.1762 19.75 9.04537C19.75 7.91456 18.9165 7.18007 17.9006 6.59675Z',
  d6: 'M17.9006 6.59675C16.8721 6.00617 15.3595 5.40452 13.4496 4.6448L10.1164 3.31887C9.05763 2.89769 8.18982 2.55246 7.48849 2.37982C7.08704 2.281 6.6881 2.22478 6.30174 2.26111C5.9924 2.29019 5.69113 2.37859 5.40309 2.55195C4.73664 2.95306 4.47329 3.60696 4.35832 4.3189C4.27577 4.83011 4.25611 5.46115 4.25144 6.19584C4.25048 6.21377 4.25 6.23183 4.25 6.25V20.75C4.25 21.3023 4.69772 21.75 5.25 21.75C5.80228 21.75 6.25 21.3023 6.25 20.75V16.7169C6.25 16.5198 6.25 16.4212 6.30174 16.345C6.35348 16.2687 6.44506 16.2323 6.62823 16.1594L13.4496 13.4459C15.3595 12.6862 16.8721 12.0846 17.9006 11.494C18.9165 10.9107 19.75 10.1762 19.75 9.04537C19.75 7.91456 18.9165 7.18007 17.9006 6.59675Z',
  d7: 'M5.40309 2.55195C4.73664 2.95306 4.47329 3.60696 4.35832 4.3189C4.27577 4.83011 4.25611 5.46115 4.25144 6.19584C4.25048 6.21377 4.25 6.23183 4.25 6.25V20.75C4.25 21.3023 4.69772 21.75 5.25 21.75C5.80228 21.75 6.25 21.3023 6.25 20.75V16.7169C6.25 16.5198 6.25 16.4212 6.30174 16.345V2.26111C5.9924 2.29019 5.69113 2.37859 5.40309 2.55195Z',
  d8: 'M5.01465 21.0049V16.0106M5.01465 16.0106L5.04211 3.01488C5.04213 3.00769 5.0495 3.00286 5.0561 3.00572L19.0086 9.03971C19.0164 9.04309 19.0167 9.05407 19.0091 9.05786L5.01465 16.0106Z',
  d9: 'M4.45065 2.66441C4.73194 2.47948 5.08739 2.44849 5.39643 2.58194L19.3964 8.6273C19.7538 8.78165 19.9892 9.12944 19.9996 9.51866C20.01 9.90787 19.7935 10.2677 19.4448 10.441L5.99996 17.1198L6 21.5L4 21.5V3.5C4 3.16337 4.16937 2.84933 4.45065 2.66441Z',
};

export const IconFlag01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Flag01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconFlag01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Flag01 DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconFlag01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Flag01 TwotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconFlag01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Flag01 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconFlag01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Flag01 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconFlag01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Flag01 StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconFlag01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Flag01 SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFlag01: TheIconSelfPack = [
  'Flag01',
  IconFlag01StrokeRounded,
  IconFlag01DuotoneRounded,
  IconFlag01TwotoneRounded,
  IconFlag01SolidRounded,
  IconFlag01BulkRounded,
  IconFlag01StrokeSharp,
  IconFlag01SolidSharp,
];