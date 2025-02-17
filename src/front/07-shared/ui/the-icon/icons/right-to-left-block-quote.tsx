import { FC } from 'react';
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
      name="right-to-left-block-quote-stroke-rounded IconRightToLeftBlockQuoteStrokeRounded"
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

export const IconRightToLeftBlockQuoteDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="right-to-left-block-quote-duotone-rounded IconRightToLeftBlockQuoteDuotoneRounded"
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

export const IconRightToLeftBlockQuoteTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="right-to-left-block-quote-twotone-rounded IconRightToLeftBlockQuoteTwotoneRounded"
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

export const IconRightToLeftBlockQuoteSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="right-to-left-block-quote-solid-rounded IconRightToLeftBlockQuoteSolidRounded"
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

export const IconRightToLeftBlockQuoteBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="right-to-left-block-quote-bulk-rounded IconRightToLeftBlockQuoteBulkRounded"
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

export const IconRightToLeftBlockQuoteStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="right-to-left-block-quote-stroke-sharp IconRightToLeftBlockQuoteStrokeSharp"
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

export const IconRightToLeftBlockQuoteSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="right-to-left-block-quote-solid-sharp IconRightToLeftBlockQuoteSolidSharp"
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

export const iconPackOfRightToLeftBlockQuote: TheIconSelfPack = {
  name: 'RightToLeftBlockQuote',
  StrokeRounded: IconRightToLeftBlockQuoteStrokeRounded,
  DuotoneRounded: IconRightToLeftBlockQuoteDuotoneRounded,
  TwotoneRounded: IconRightToLeftBlockQuoteTwotoneRounded,
  SolidRounded: IconRightToLeftBlockQuoteSolidRounded,
  BulkRounded: IconRightToLeftBlockQuoteBulkRounded,
  StrokeSharp: IconRightToLeftBlockQuoteStrokeSharp,
  SolidSharp: IconRightToLeftBlockQuoteSolidSharp,
};