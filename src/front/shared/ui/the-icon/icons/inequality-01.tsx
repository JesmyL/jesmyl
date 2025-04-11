import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 20H21',
  d2: 'M21 16H6.83782C4.45713 16 3.26678 16 3.03483 15.3728C2.80288 14.7455 3.73716 14.0531 5.60572 12.6682L17.3015 4',
  d3: 'M1.75 20C1.75 19.3096 2.30964 18.75 3 18.75H21C21.6904 18.75 22.25 19.3096 22.25 20C22.25 20.6904 21.6904 21.25 21 21.25H3C2.30964 21.25 1.75 20.6904 1.75 20Z',
  d4: 'M18.3059 3.25578C18.717 3.81042 18.6006 4.59327 18.046 5.00433L6.35023 13.6726C5.76143 14.1089 5.30242 14.4504 4.95132 14.7303C5.42853 14.749 6.04269 14.7501 6.83804 14.7501H21.0002C21.6906 14.7501 22.2502 15.3097 22.2502 16.0001C22.2502 16.6904 21.6906 17.2501 21.0002 17.2501L6.74906 17.2501C5.63473 17.2501 4.67767 17.2502 3.97497 17.1619C3.61191 17.1163 3.20876 17.0361 2.84575 16.8596C2.44925 16.6668 2.05825 16.3354 1.86264 15.8064C1.66413 15.2696 1.74992 14.7533 1.94993 14.338C2.12881 13.9666 2.40541 13.6566 2.66288 13.4071C3.16109 12.9242 3.91651 12.3644 4.78676 11.7195C4.81163 11.7011 4.83659 11.6826 4.86164 11.664L16.5574 2.99583C17.112 2.58476 17.8949 2.70115 18.3059 3.25578Z',
  d5: 'M21.0001 16H3L17.3015 4',
  d6: 'M21.5 21.25H2.57514V18.75H21.5V21.25Z',
  d7: 'M7.16582 14.5005L18.8326 4.66514L17.2321 2.75L2.94481 14.7929C2.54386 15.1307 2.39613 15.6842 2.57514 16.178C2.75415 16.6718 3.22167 17.0005 3.74508 17.0005H21.5V14.5005H7.16582Z',
};

export const IconInequality01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Inequality01 StrokeRounded"
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

export const IconInequality01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Inequality01 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconInequality01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Inequality01 TwotoneRounded"
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

export const IconInequality01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Inequality01 SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconInequality01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Inequality01 BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconInequality01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Inequality01 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconInequality01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Inequality01 SolidSharp"
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

export const iconPackOfInequality01: TheIconSelfPack = [
  'Inequality01',
  IconInequality01StrokeRounded,
  IconInequality01DuotoneRounded,
  IconInequality01TwotoneRounded,
  IconInequality01SolidRounded,
  IconInequality01BulkRounded,
  IconInequality01StrokeSharp,
  IconInequality01SolidSharp,
];