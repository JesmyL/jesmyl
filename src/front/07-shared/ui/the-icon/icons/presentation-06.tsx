import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 17H21V8C21 5.17157 21 3.75736 20.1213 2.87868C19.2426 2 17.8284 2 15 2H9C6.17157 2 4.75736 2 3.87868 2.87868C3 3.75736 3 5.17157 3 8V17Z',
  d2: 'M2 17H22',
  d3: 'M8.5 22L8.82821 21.6717C9.40628 21.0936 9.69532 20.8045 10.0629 20.6523C10.4305 20.5 10.8392 20.5 11.6568 20.5H12.343C13.1605 20.5 13.5692 20.5 13.9368 20.6522C14.3043 20.8045 14.5933 21.0935 15.1714 21.6716L15.4998 22',
  d4: 'M12 17.5V22',
  d5: 'M12 17V22',
  d6: 'M8.5 22.125L8.82821 21.7967C9.40628 21.2186 9.69532 20.9295 10.0629 20.7773C10.4305 20.625 10.8392 20.625 11.6568 20.625H12.343C13.1605 20.625 13.5692 20.625 13.9368 20.7772C14.3043 20.9295 14.5933 21.2185 15.1714 21.7966L15.4998 22.125M12 17.625V22.125',
  d7: 'M11 21.5063V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V21.5063C13.3473 21.5156 13.4577 21.5365 13.5541 21.5764C13.6951 21.6348 13.8285 21.7432 14.4643 22.379L14.7927 22.7074C15.1832 23.0979 15.8164 23.0979 16.2069 22.7074C16.5974 22.3169 16.5974 21.6837 16.2069 21.2932L15.8785 20.9647L15.7804 20.8665C15.3012 20.3858 14.8758 19.9591 14.3194 19.7286C13.9088 19.5585 13.473 19.5145 13 19.5035V17H11L11 19.5035C10.5268 19.5145 10.091 19.5585 9.68018 19.7287C9.12373 19.9592 8.69838 20.3859 8.21912 20.8667L8.12106 20.965L7.79285 21.2932C7.40235 21.6838 7.40239 22.3169 7.79294 22.7074C8.18349 23.0979 8.81665 23.0979 9.20715 22.7073L9.53536 22.3791C10.1711 21.7432 10.3046 21.6348 10.4456 21.5764C10.542 21.5365 10.6525 21.5156 11 21.5063Z',
  d8: 'M21.75 15.999V7.6C21.75 4.48873 21.75 2.9331 20.7981 1.96655C19.8462 1 18.3141 1 15.25 1H8.75C5.68587 1 4.15381 1 3.2019 1.96655C2.25 2.9331 2.25 4.48873 2.25 7.6V15.999H2C1.44772 15.999 1 16.4467 1 16.999C1 17.5513 1.44772 17.999 2 17.999H22C22.5523 17.999 23 17.5513 23 16.999C23 16.4467 22.5523 15.999 22 15.999H21.75Z',
  d9: 'M2.25 17.5H21.75V7.6C21.75 4.48873 21.75 2.9331 20.7981 1.96655C19.8462 1 18.3141 1 15.25 1H8.75C5.68587 1 4.15381 1 3.2019 1.96655C2.25 2.9331 2.25 4.48873 2.25 7.6V17.5Z',
  d10: 'M1 17C1 16.4477 1.44772 16 2 16H22C22.5523 16 23 16.4477 23 17C23 17.5523 22.5523 18 22 18H2C1.44772 18 1 17.5523 1 17Z',
  d11: 'M12 16.5L12 21.5',
  d12: 'M8 21.5L9.5 19.5H14.5L16 21.5',
  d13: 'M3.5 16.5V2.5H20.5V16.5H3.5Z',
  d14: 'M2 16.5H22',
  d15: 'M3.5 1.75H20.5C20.6989 1.75 20.8897 1.82902 21.0303 1.96967C21.171 2.11032 21.25 2.30109 21.25 2.5V16.5C21.25 16.9142 20.9142 17.25 20.5 17.25H3.5C3.08579 17.25 2.75 16.9142 2.75 16.5V2.5C2.75 2.08579 3.08579 1.75 3.5 1.75Z',
  d16: 'M22 17.5H2V15.5H22V17.5Z',
  d17: 'M11 20.6944V22.25H13V20.6944H13.9792L15.1667 22.25L16.75 21.0833L15.2656 19.1389C15.0787 18.8941 14.7854 18.75 14.474 18.75H13V16.75H11V18.75H9.52604C9.21456 18.75 8.92126 18.8941 8.73438 19.1389L7.25 21.0833L8.83333 22.25L10.0208 20.6944H11Z',
};

export const IconPresentation06StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-06-stroke-rounded IconPresentation06StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconPresentation06DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-06-duotone-rounded IconPresentation06DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation06TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-06-twotone-rounded IconPresentation06TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
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

export const IconPresentation06SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-06-solid-rounded IconPresentation06SolidRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation06BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-06-bulk-rounded IconPresentation06BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation06StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-06-stroke-sharp IconPresentation06StrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentation06SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-06-solid-sharp IconPresentation06SolidSharp"
    >
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPresentation06: TheIconSelfPack = {
  name: 'Presentation06',
  StrokeRounded: IconPresentation06StrokeRounded,
  DuotoneRounded: IconPresentation06DuotoneRounded,
  TwotoneRounded: IconPresentation06TwotoneRounded,
  SolidRounded: IconPresentation06SolidRounded,
  BulkRounded: IconPresentation06BulkRounded,
  StrokeSharp: IconPresentation06StrokeSharp,
  SolidSharp: IconPresentation06SolidSharp,
};