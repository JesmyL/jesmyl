import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.5 16L5 20M17.5 16L19 20',
  d2: 'M21 4H3L3.21498 9.15955C3.3499 12.3977 3.41736 14.0167 4.28607 15.0084C5.15478 16 6.50569 16 9.2075 16H14.7925C17.4943 16 18.8452 16 19.7139 15.0084C20.5826 14.0167 20.6501 12.3977 20.785 9.15955L21 4Z',
  d3: 'M12 16V4',
  d4: 'M22 4H2',
  d5: 'M8.99981 10L9.00879 10',
  d6: 'M14.9998 10L15.0088 10',
  d7: 'M3 4L3.21498 9.15955C3.3499 12.3977 3.41736 14.0167 4.28607 15.0084C5.15478 16 6.50568 16 9.20749 16H9.2075H12V4H3Z',
  d8: 'M6.85139 15.0639C7.36851 15.2579 7.63052 15.8343 7.4366 16.3514L5.9366 20.3514C5.74268 20.8685 5.16627 21.1305 4.64915 20.9366C4.13203 20.7427 3.87002 20.1663 4.06394 19.6491L5.56394 15.6491C5.75786 15.132 6.33427 14.87 6.85139 15.0639ZM17.1491 15.0639C17.6663 14.87 18.2427 15.132 18.4366 15.6491L19.9366 19.6491C20.1305 20.1663 19.8685 20.7427 19.3514 20.9366C18.8343 21.1305 18.2579 20.8685 18.0639 20.3514L16.5639 16.3514C16.37 15.8343 16.632 15.2579 17.1491 15.0639Z',
  d9: 'M1 4C1 3.44772 1.44772 3 2 3H22C22.5523 3 23 3.44772 23 4C23 4.55228 22.5523 5 22 5H2C1.44772 5 1 4.55228 1 4Z',
  d10: 'M10.65 3.25C10.9328 3.25 11.0743 3.25 11.1621 3.33786C11.25 3.42573 11.25 3.56715 11.25 3.85L11.25 16.15C11.25 16.4328 11.25 16.5743 11.1621 16.6621C11.0743 16.75 10.9328 16.75 10.65 16.75H9.14538H9.14535C7.84737 16.75 6.78486 16.7501 5.94225 16.6168C5.04981 16.4758 4.3088 16.1725 3.72193 15.5026C3.15088 14.8507 2.88541 14.0331 2.73393 13.0394C2.58538 12.0651 2.53338 10.8169 2.46757 9.23718L2.25065 4.03122C2.24214 3.82707 2.3173 3.62828 2.45874 3.48082C2.60019 3.33336 2.79567 3.25 3 3.25L10.65 3.25ZM12.75 3.85C12.75 3.56715 12.75 3.42573 12.8379 3.33786C12.9257 3.25 13.0672 3.25 13.35 3.25H21C21.2043 3.25 21.3998 3.33336 21.5413 3.48082C21.6827 3.62828 21.7579 3.82707 21.7493 4.03122L21.5324 9.23723V9.23728C21.4666 10.8169 21.4146 12.0651 21.2661 13.0394C21.1146 14.0331 20.8491 14.8507 20.2781 15.5026C19.6912 16.1725 18.9502 16.4758 18.0577 16.6168C17.2151 16.7501 16.1527 16.75 14.8547 16.75H14.8547H13.35C13.0672 16.75 12.9257 16.75 12.8379 16.6621C12.75 16.5743 12.75 16.4328 12.75 16.15L12.75 3.85ZM8 10C8 9.44771 8.44772 9 9 9H9.00898C9.56127 9 10.009 9.44771 10.009 10C10.009 10.5523 9.56127 11 9.00898 11H9C8.44772 11 8 10.5523 8 10ZM15 9C14.4477 9 14 9.44771 14 10C14 10.5523 14.4477 11 15 11H15.009C15.5613 11 16.009 10.5523 16.009 10C16.009 9.44771 15.5613 9 15.009 9H15Z',
  d11: 'M12.75 3.85C12.75 3.56716 12.75 3.42574 12.8379 3.33787C12.9257 3.25 13.0672 3.25 13.35 3.25H21C21.2043 3.25 21.3998 3.33337 21.5413 3.48083C21.6827 3.62829 21.7579 3.82707 21.7493 4.03122L21.5324 9.23723C21.4666 10.8169 21.4146 12.0651 21.2661 13.0394C21.1146 14.0331 20.8491 14.8507 20.2781 15.5026C19.6912 16.1725 18.9502 16.4758 18.0577 16.6168C17.2151 16.7501 16.1527 16.75 14.8547 16.75H13.35C13.0672 16.75 12.9257 16.75 12.8379 16.6621C12.75 16.5743 12.75 16.4328 12.75 16.15L12.75 3.85Z',
  d12: 'M10.65 3.25C10.9328 3.25 11.0743 3.25 11.1621 3.33787C11.25 3.42574 11.25 3.56716 11.25 3.85L11.25 16.15C11.25 16.4328 11.25 16.5743 11.1621 16.6621C11.0743 16.75 10.9328 16.75 10.65 16.75H9.14538C7.84738 16.75 6.78487 16.7501 5.94225 16.6168C5.04981 16.4758 4.3088 16.1725 3.72193 15.5026C3.15088 14.8507 2.88541 14.0331 2.73393 13.0394C2.58538 12.0651 2.53338 10.8169 2.46757 9.23719L2.25065 4.03122C2.24214 3.82707 2.3173 3.62829 2.45874 3.48083C2.60019 3.33337 2.79567 3.25 3 3.25H10.65Z',
  d13: 'M9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11H9.00898C9.56127 11 10.009 10.5523 10.009 10C10.009 9.44772 9.56127 9 9.00898 9H9ZM15 9C14.4477 9 14 9.44772 14 10C14 10.5523 14.4477 11 15 11H15.009C15.5613 11 16.009 10.5523 16.009 10C16.009 9.44772 15.5613 9 15.009 9H15Z',
  d14: 'M7.29423 16.7311L5.9366 20.3514C5.74268 20.8685 5.16627 21.1306 4.64915 20.9366C4.13203 20.7427 3.87002 20.1663 4.06394 19.6492L5.25801 16.465C5.4752 16.5299 5.7033 16.5793 5.94225 16.6171C6.34269 16.6804 6.79279 16.7136 7.29423 16.7311Z',
  d15: 'M16.7063 16.7311C17.2075 16.7136 17.6574 16.6804 18.0577 16.6171C18.2969 16.5793 18.5251 16.5299 18.7425 16.4648L19.9366 19.6492C20.1305 20.1663 19.8685 20.7427 19.3514 20.9366C18.8343 21.1306 18.2579 20.8685 18.0639 20.3514L16.7063 16.7311Z',
  d16: 'M7.5 16L6 20M16.5 16L18 20',
  d17: 'M5 16L4 4H20L19 16H5Z',
  d18: 'M9.00977 9L9.01074 11',
  d19: 'M15.0004 11L15 9',
  d20: 'M6.02008 17.2498L5.06445 19.7981L6.93711 20.5003L8.15608 17.2498H11.25L11.25 5.49976H12.75L12.75 17.2498H15.8455L17.0645 20.5003L18.9371 19.7981L17.9815 17.2498L19 17.2498C19.3901 17.2498 19.715 16.9508 19.7474 16.562L20.6693 5.49976H22V3.49976L2 3.49976L2 5.49976H3.33074L4.25259 16.562C4.28499 16.9508 4.60994 17.2498 5 17.2498H6.02008ZM8.26074 11.5005L8.25977 9.50049L9.75977 9.49976L9.76074 11.4998L8.26074 11.5005ZM15.7504 11.4998L15.75 9.49976L14.25 9.50004L14.2504 11.5L15.7504 11.4998Z',
};

export const IconCabinet02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cabinet-02-stroke-rounded IconCabinet02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCabinet02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cabinet-02-duotone-rounded IconCabinet02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCabinet02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cabinet-02-twotone-rounded IconCabinet02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCabinet02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cabinet-02-solid-rounded IconCabinet02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCabinet02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cabinet-02-bulk-rounded IconCabinet02BulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCabinet02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cabinet-02-stroke-sharp IconCabinet02StrokeSharp"
    >
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCabinet02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cabinet-02-solid-sharp IconCabinet02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCabinet02: TheIconSelfPack = {
  name: 'Cabinet02',
  StrokeRounded: IconCabinet02StrokeRounded,
  DuotoneRounded: IconCabinet02DuotoneRounded,
  TwotoneRounded: IconCabinet02TwotoneRounded,
  SolidRounded: IconCabinet02SolidRounded,
  BulkRounded: IconCabinet02BulkRounded,
  StrokeSharp: IconCabinet02StrokeSharp,
  SolidSharp: IconCabinet02SolidSharp,
};