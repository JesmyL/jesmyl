import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 3V21M15 3H10M15 3H21M10 12H7.5C5.01472 12 3 9.98528 3 7.5C3 5.01472 5.01472 3 7.5 3H10M10 12V3M10 12V21',
  d2: 'M10 12H7.5C5.01472 12 3 9.98528 3 7.5C3 5.01472 5.01472 3 7.5 3H10V12Z',
  d3: 'M10 12H7.5C5.01472 12 3 9.98528 3 7.5C3 5.01472 5.01472 3 7.5 3H10M10 12V3M10 12V21M10 3H21',
  d4: 'M15 3V21',
  d5: 'M7.5 4C5.567 4 4 5.567 4 7.5C4 9.433 5.567 11 7.5 11H9V4H7.5ZM11 4V21C11 21.5523 10.5523 22 10 22C9.44772 22 9 21.5523 9 21V13H7.5C4.46243 13 2 10.5376 2 7.5C2 4.46243 4.46243 2 7.5 2H21C21.5523 2 22 2.44772 22 3C22 3.55228 21.5523 4 21 4H16V21C16 21.5523 15.5523 22 15 22C14.4477 22 14 21.5523 14 21V4H11Z',
  d6: 'M21 2C21.5523 2 22 2.44772 22 3C22 3.55228 21.5523 4 21 4H16V21C16 21.5523 15.5523 22 15 22C14.4477 22 14 21.5523 14 21V4H11V2H21Z',
  d7: 'M10 22C10.5523 22 11 21.5523 11 21V2H7.5C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13H9V21C9 21.5523 9.44772 22 10 22ZM4 7.5C4 5.567 5.567 4 7.5 4H9V11H7.5C5.567 11 4 9.433 4 7.5Z',
  d8: 'M8 4.5C6.067 4.5 4.5 6.067 4.5 8C4.5 9.933 6.067 11.5 8 11.5H9.5V4.5H8ZM11.5 4.5V21.5H9.5V13.5H8C4.96243 13.5 2.5 11.0376 2.5 8C2.5 4.96243 4.96243 2.5 8 2.5H21.5V4.5H16.5V21.5H14.5V4.5H11.5Z',
};

export const IconParagraphStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-stroke-rounded IconParagraphStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconParagraphDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-duotone-rounded IconParagraphDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconParagraphTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-twotone-rounded IconParagraphTwotoneRounded"
    >
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconParagraphSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-solid-rounded IconParagraphSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconParagraphBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-bulk-rounded IconParagraphBulkRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconParagraphStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-stroke-sharp IconParagraphStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconParagraphSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-solid-sharp IconParagraphSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfParagraph: TheIconSelfPack = {
  name: 'Paragraph',
  StrokeRounded: IconParagraphStrokeRounded,
  DuotoneRounded: IconParagraphDuotoneRounded,
  TwotoneRounded: IconParagraphTwotoneRounded,
  SolidRounded: IconParagraphSolidRounded,
  BulkRounded: IconParagraphBulkRounded,
  StrokeSharp: IconParagraphStrokeSharp,
  SolidSharp: IconParagraphSolidSharp,
};