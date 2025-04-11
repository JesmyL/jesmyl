import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 12H22',
  d2: 'M12 22L12 2',
  d3: 'M21 8C18.2386 8 16 5.76142 16 3',
  d4: 'M3 16C5.76142 16 8 18.2386 8 21',
  d5: 'M2 12H22M12 22L12 2',
  d6: 'M12 1C12.5523 1 13 1.44772 13 2V11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V13H2C1.44772 13 1 12.5523 1 12C1 11.4477 1.44772 11 2 11H11V2C11 1.44772 11.4477 1 12 1Z',
  d7: 'M22 8C22 8.55228 21.5523 9 21 9C17.6863 9 15 6.31371 15 3C15 2.44771 15.4477 2 16 2C16.5523 2 17 2.44772 17 3C17 5.20914 18.7909 7 21 7C21.5523 7 22 7.44772 22 8Z',
  d8: 'M2 16C2 15.4477 2.44772 15 3 15C6.31371 15 9 17.6863 9 21C9 21.5523 8.55228 22 8 22C7.44772 22 7 21.5523 7 21C7 18.7909 5.20914 17 3 17C2.44772 17 2 16.5523 2 16Z',
  d9: 'M22 13H2V11H22V13Z',
  d10: 'M13 2L13 22L11 22L11 2L13 2Z',
  d11: 'M17 3C17 5.20914 18.7909 7 21 7L21 9C17.6863 9 15 6.31371 15 3L17 3Z',
  d12: 'M7 21C7 18.7909 5.20914 17 3 17L3 15C6.31371 15 9 17.6863 9 21L7 21Z',
};

export const IconHyperboleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hyperbole StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHyperboleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hyperbole DuotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHyperboleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hyperbole TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHyperboleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hyperbole SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconHyperboleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hyperbole BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconHyperboleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hyperbole StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconHyperboleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hyperbole SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHyperbole: TheIconSelfPack = [
  'Hyperbole',
  IconHyperboleStrokeRounded,
  IconHyperboleDuotoneRounded,
  IconHyperboleTwotoneRounded,
  IconHyperboleSolidRounded,
  IconHyperboleBulkRounded,
  IconHyperboleStrokeSharp,
  IconHyperboleSolidSharp,
];