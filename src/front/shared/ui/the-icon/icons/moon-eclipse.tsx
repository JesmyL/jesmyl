import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10 2.2002C14.5645 3.12674 18 7.16224 18 12.0002C18 16.8381 14.5645 20.8736 10 21.8001',
  d2: 'M18 12.0004C18 7.2031 14.622 3.19482 10.1148 2.22441L9.93397 2.21094C5.40243 3.16282 2 7.1827 2 11.9973C2 16.7933 5.37626 20.8007 9.88165 21.7725H10.1326C10.1861 21.7608 10.2394 21.7488 10.2925 21.7363C14.7105 20.7 18 16.7344 18 12.0004Z',
  d3: 'M10 2.19922C14.5645 3.12576 18 7.16127 18 11.9992C18 16.8371 14.5645 20.8726 10 21.7991',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM20.7948 12C20.7948 7.14245 16.857 3.20459 11.9994 3.20459C15.0794 4.90887 17.2369 8.23023 17.2369 11.9995C17.2369 15.7987 15.1183 19.103 11.998 20.7955C16.8556 20.7955 20.7948 16.8576 20.7948 12Z',
  d5: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d6: 'M20.7948 11.9986C20.7948 7.14098 16.857 3.20312 11.9994 3.20312C15.0794 4.90741 17.2369 8.22877 17.2369 11.9981C17.2369 15.7972 15.1183 19.1015 11.998 20.794C16.8556 20.794 20.7948 16.8562 20.7948 11.9986Z',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM20.7955 11.9996C20.7955 16.8572 16.8576 20.795 12 20.795C15.1165 19.1014 17 15.7961 17 11.9997C17 8.2031 15.1168 4.89763 12 3.2041C16.8576 3.2041 20.7955 7.14196 20.7955 11.9996Z',
};

export const IconMoonEclipseStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoonEclipse StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoonEclipseDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoonEclipse DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoonEclipseTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoonEclipse TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoonEclipseSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoonEclipse SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMoonEclipseBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoonEclipse BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMoonEclipseStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoonEclipse StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoonEclipseSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoonEclipse SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMoonEclipse: TheIconSelfPack = [
  'MoonEclipse',
  IconMoonEclipseStrokeRounded,
  IconMoonEclipseDuotoneRounded,
  IconMoonEclipseTwotoneRounded,
  IconMoonEclipseSolidRounded,
  IconMoonEclipseBulkRounded,
  IconMoonEclipseStrokeSharp,
  IconMoonEclipseSolidSharp,
];