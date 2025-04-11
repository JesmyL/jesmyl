import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 6L15 6',
  d2: 'M5 12L15 12',
  d3: 'M7 18L15 18',
  d4: 'M19 3L19 21',
  d5: 'M6 6C6 5.44772 6.44772 5 7 5L15 5C15.5523 5 16 5.44772 16 6C16 6.55229 15.5523 7 15 7L7 7C6.44772 7 6 6.55228 6 6Z',
  d6: 'M4 12C4 11.4477 4.44772 11 5 11L15 11C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13L5 13C4.44772 13 4 12.5523 4 12Z',
  d7: 'M6 18C6 17.4477 6.44772 17 7 17L15 17C15.5523 17 16 17.4477 16 18C16 18.5523 15.5523 19 15 19L7 19C6.44772 19 6 18.5523 6 18Z',
  d8: 'M19 2C19.5523 2 20 2.44772 20 3L20 21C20 21.5523 19.5523 22 19 22C18.4477 22 18 21.5523 18 21L18 3C18 2.44772 18.4477 2 19 2Z',
  d9: 'M8 6L16 6',
  d10: 'M5 12L16 12',
  d11: 'M8 18L16 18',
  d12: 'M15.5 7L7.5 7L7.5 5L15.5 5L15.5 7Z',
  d13: 'M15.5 13L4.5 13L4.5 11L15.5 11L15.5 13Z',
  d14: 'M15.5 19L7.5 19L7.5 17L15.5 17L15.5 19Z',
  d15: 'M17.5 21L17.5 3L19.5 3L19.5 21L17.5 21Z',
};

export const IconRightToLeftBlockQuoteStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftBlockQuote StrokeRounded"
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
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRightToLeftBlockQuoteDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftBlockQuote DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRightToLeftBlockQuoteTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftBlockQuote TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRightToLeftBlockQuoteSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftBlockQuote SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
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

export const IconRightToLeftBlockQuoteBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftBlockQuote BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconRightToLeftBlockQuoteStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftBlockQuote StrokeSharp"
    >
      <path 
        d={d.d9}
        i-c="s sw"
      />
      <path 
        d={d.d10}
        i-c="s sw"
      />
      <path 
        d={d.d11}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRightToLeftBlockQuoteSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftBlockQuote SolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfRightToLeftBlockQuote: TheIconSelfPack = [
  'RightToLeftBlockQuote',
  IconRightToLeftBlockQuoteStrokeRounded,
  IconRightToLeftBlockQuoteDuotoneRounded,
  IconRightToLeftBlockQuoteTwotoneRounded,
  IconRightToLeftBlockQuoteSolidRounded,
  IconRightToLeftBlockQuoteBulkRounded,
  IconRightToLeftBlockQuoteStrokeSharp,
  IconRightToLeftBlockQuoteSolidSharp,
];