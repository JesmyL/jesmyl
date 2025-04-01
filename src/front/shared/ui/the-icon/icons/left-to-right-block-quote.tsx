import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9 6L17 6',
  d2: 'M9 12L19 12',
  d3: 'M9 18L17 18',
  d4: 'M5 3L5 21',
  d5: 'M8 6C8 5.44772 8.44772 5 9 5L17 5C17.5523 5 18 5.44772 18 6C18 6.55229 17.5523 7 17 7L9 7C8.44772 7 8 6.55228 8 6Z',
  d6: 'M8 12C8 11.4477 8.44772 11 9 11L19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L9 13C8.44772 13 8 12.5523 8 12Z',
  d7: 'M8 18C8 17.4477 8.44772 17 9 17L17 17C17.5523 17 18 17.4477 18 18C18 18.5523 17.5523 19 17 19L9 19C8.44772 19 8 18.5523 8 18Z',
  d8: 'M5 2C5.55228 2 6 2.44772 6 3L6 21C6 21.5523 5.55228 22 5 22C4.44771 22 4 21.5523 4 21L4 3C4 2.44772 4.44772 2 5 2Z',
  d9: 'M8 6L16 6',
  d10: 'M8 12L19 12',
  d11: 'M8 18L16 18',
  d12: 'M16.5 7L8.5 7L8.5 5L16.5 5L16.5 7Z',
  d13: 'M19.5 13L8.5 13L8.5 11L19.5 11L19.5 13Z',
  d14: 'M16.5 19L8.5 19L8.5 17L16.5 17L16.5 19Z',
  d15: 'M4.5 21L4.5 3L6.5 3L6.5 21L4.5 21Z',
};

export const IconLeftToRightBlockQuoteStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-block-quote-stroke-rounded IconLeftToRightBlockQuoteStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightBlockQuoteDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-block-quote-duotone-rounded IconLeftToRightBlockQuoteDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightBlockQuoteTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-block-quote-twotone-rounded IconLeftToRightBlockQuoteTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconLeftToRightBlockQuoteSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-block-quote-solid-rounded IconLeftToRightBlockQuoteSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightBlockQuoteBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-block-quote-bulk-rounded IconLeftToRightBlockQuoteBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightBlockQuoteStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-block-quote-stroke-sharp IconLeftToRightBlockQuoteStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftToRightBlockQuoteSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-to-right-block-quote-solid-sharp IconLeftToRightBlockQuoteSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLeftToRightBlockQuote: TheIconSelfPack = {
  name: 'LeftToRightBlockQuote',
  StrokeRounded: IconLeftToRightBlockQuoteStrokeRounded,
  DuotoneRounded: IconLeftToRightBlockQuoteDuotoneRounded,
  TwotoneRounded: IconLeftToRightBlockQuoteTwotoneRounded,
  SolidRounded: IconLeftToRightBlockQuoteSolidRounded,
  BulkRounded: IconLeftToRightBlockQuoteBulkRounded,
  StrokeSharp: IconLeftToRightBlockQuoteStrokeSharp,
  SolidSharp: IconLeftToRightBlockQuoteSolidSharp,
};