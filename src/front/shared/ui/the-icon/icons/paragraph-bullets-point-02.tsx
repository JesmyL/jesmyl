import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 4H21',
  d2: 'M15 15H21',
  d3: 'M15 9H21',
  d4: 'M15 20H21',
  d5: 'M13.75 4C13.75 3.44772 14.1977 3 14.75 3H20.75C21.3023 3 21.75 3.44772 21.75 4C21.75 4.55228 21.3023 5 20.75 5H14.75C14.1977 5 13.75 4.55228 13.75 4ZM13.75 9C13.75 8.44772 14.1977 8 14.75 8H20.75C21.3023 8 21.75 8.44772 21.75 9C21.75 9.55228 21.3023 10 20.75 10H14.75C14.1977 10 13.75 9.55228 13.75 9ZM13.75 15C13.75 14.4477 14.1977 14 14.75 14H20.75C21.3023 14 21.75 14.4477 21.75 15C21.75 15.5523 21.3023 16 20.75 16H14.75C14.1977 16 13.75 15.5523 13.75 15ZM13.75 20C13.75 19.4477 14.1977 19 14.75 19H20.75C21.3023 19 21.75 19.4477 21.75 20C21.75 20.5523 21.3023 21 20.75 21H14.75C14.1977 21 13.75 20.5523 13.75 20Z',
  d6: 'M2.25 6.5C2.25 4.15279 4.15279 2.25 6.5 2.25C8.84721 2.25 10.75 4.15279 10.75 6.5C10.75 8.84721 8.84721 10.75 6.5 10.75C4.15279 10.75 2.25 8.84721 2.25 6.5Z',
  d7: 'M2.25 17.5C2.25 15.1528 4.15279 13.25 6.5 13.25C8.84721 13.25 10.75 15.1528 10.75 17.5C10.75 19.8472 8.84721 21.75 6.5 21.75C4.15279 21.75 2.25 19.8472 2.25 17.5Z',
  d8: 'M14 4L21 4',
  d9: 'M14 15L21 15',
  d10: 'M14 9L21 9',
  d11: 'M14 20H21',
  d12: 'M21 5L14 5V3L21 3V5Z',
  d13: 'M21 16L14 16V14L21 14V16Z',
  d14: 'M21 10L14 10V8L21 8V10Z',
  d15: 'M21 21H14V19H21V21Z',
  d16: 'M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5Z',
  d17: 'M10 17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14C8.433 14 10 15.567 10 17.5Z',
};

export const IconParagraphBulletsPoint02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ParagraphBulletsPoint02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <circle 
        cx="6.5"
        cy="6.5"
        r="3.5"
        i-c="s sj sr sw"
      />
      <circle 
        cx="6.5"
        cy="17.5"
        r="3.5"
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconParagraphBulletsPoint02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ParagraphBulletsPoint02 DuotoneRounded"
    >
      <circle 
        cx="6.5"
        cy="6.5"
        r="3.5"
        i-c="f o7"
      />
      <circle 
        cx="6.5"
        cy="17.5"
        r="3.5"
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <circle 
        cx="6.5"
        cy="6.5"
        r="3.5"
        i-c="s sj sr sw"
      />
      <circle 
        cx="6.5"
        cy="17.5"
        r="3.5"
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconParagraphBulletsPoint02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ParagraphBulletsPoint02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <circle 
        cx="6.5"
        cy="6.5"
        r="3.5"
        i-c="s sj sr sw"
      />
      <circle 
        cx="6.5"
        cy="17.5"
        r="3.5"
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconParagraphBulletsPoint02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ParagraphBulletsPoint02 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconParagraphBulletsPoint02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ParagraphBulletsPoint02 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d7}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconParagraphBulletsPoint02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ParagraphBulletsPoint02 StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s sj sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
      <path 
        d={d.d11}
        i-c="s sj sw"
      />
      <circle 
        cx="6.5"
        cy="6.5"
        r="3.5"
        i-c="s sj sw"
      />
      <circle 
        cx="6.5"
        cy="17.5"
        r="3.5"
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconParagraphBulletsPoint02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ParagraphBulletsPoint02 SolidSharp"
    >
      <path 
        d={d.d12}
        i-c="c f fr"
      />
      <path 
        d={d.d13}
        i-c="c f fr"
      />
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
      <path 
        d={d.d16}
        i-c="f"
      />
      <path 
        d={d.d17}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfParagraphBulletsPoint02: TheIconSelfPack = [
  'ParagraphBulletsPoint02',
  IconParagraphBulletsPoint02StrokeRounded,
  IconParagraphBulletsPoint02DuotoneRounded,
  IconParagraphBulletsPoint02TwotoneRounded,
  IconParagraphBulletsPoint02SolidRounded,
  IconParagraphBulletsPoint02BulkRounded,
  IconParagraphBulletsPoint02StrokeSharp,
  IconParagraphBulletsPoint02SolidSharp,
];