import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10 10L5 22M14 10L19 22',
  d2: 'M12 4L12 2',
  d3: 'M3 13C4.99073 16.0242 8.27968 18 12 18C15.7203 18 19.0093 16.0242 21 13',
  d4: 'M12 17V19',
  d5: 'M3 13C4.99073 16.0242 8.27968 18 12 18C15.7203 18 19.0093 16.0242 21 13M12 17V19',
  d6: 'M10.3849 9.07718C10.8947 9.2896 11.1358 9.87507 10.9233 10.3849L5.92334 22.3849C5.71092 22.8947 5.12545 23.1358 4.61565 22.9233C4.10584 22.7109 3.86477 22.1254 4.07718 21.6156L9.07718 9.61565C9.2896 9.10584 9.87507 8.86477 10.3849 9.07718ZM13.6156 9.07718C14.1254 8.86477 14.7109 9.10584 14.9233 9.61565L19.9233 21.6156C20.1358 22.1254 19.8947 22.7109 19.3849 22.9233C18.8751 23.1358 18.2896 22.8947 18.0772 22.3849L13.0772 10.3849C12.8648 9.87507 13.1058 9.2896 13.6156 9.07718Z',
  d7: 'M12 1C12.5523 1 13 1.44772 13 2L13 4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4L11 2C11 1.44772 11.4477 1 12 1Z',
  d8: 'M8.25 7C8.25 4.92893 9.92893 3.25 12 3.25C14.0711 3.25 15.75 4.92893 15.75 7C15.75 9.07107 14.0711 10.75 12 10.75C9.92893 10.75 8.25 9.07107 8.25 7Z',
  d9: 'M2.45028 12.1648C2.91159 11.8612 3.53172 11.989 3.83539 12.4503C5.65982 15.2219 8.64882 17.0001 12.0001 17.0001C15.3514 17.0001 18.3404 15.2219 20.1648 12.4503C20.4685 11.989 21.0886 11.8612 21.5499 12.1648C22.0113 12.4685 22.1391 13.0886 21.8354 13.5499C19.6783 16.8268 16.0895 19.0001 12.0001 19.0001C7.91077 19.0001 4.32188 16.8268 2.16484 13.5499C1.86117 13.0886 1.98897 12.4685 2.45028 12.1648Z',
  d10: 'M12 16C12.5523 16 13 16.4477 13 17V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V17C11 16.4477 11.4477 16 12 16Z',
  d11: 'M12 5L12 2',
  d12: 'M12 16V20',
  d13: 'M4.07617 21.4808L9.07617 9.36523L10.9223 10.1345L5.92233 22.25L4.07617 21.4808ZM18.0762 22.25L13.0762 10.1345L14.9223 9.36523L19.9223 21.4808L18.0762 22.25Z',
  d14: 'M12.999 1.75L12.999 4.75L10.999 4.75L10.999 1.75L12.999 1.75Z',
  d15: 'M8.24902 7.75C8.24902 5.67893 9.92796 4 11.999 4C14.0701 4 15.749 5.67893 15.749 7.75C15.749 9.82107 14.0701 11.5 11.999 11.5C9.92796 11.5 8.24902 9.82107 8.24902 7.75Z',
  d16: 'M3.69853 12.2002C5.55352 14.9718 8.59258 16.75 12 16.75C15.4074 16.75 18.4465 14.9718 20.3015 12.2002L22 13.2999C19.8068 16.5767 16.1578 18.75 12 18.75C7.84217 18.75 4.19317 16.5767 2 13.2999L3.69853 12.2002Z',
  d17: 'M10.999 19.75V15.75H12.999V19.75H10.999Z',
};

export const IconCompass01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-01-stroke-rounded IconCompass01StrokeRounded"
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
      <circle 
        cx="12" 
        cy="7" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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

export const IconCompass01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-01-duotone-rounded IconCompass01DuotoneRounded"
    >
      <circle 
        opacity="0.5" 
        cx="12" 
        cy="7" 
        r="3" 
        fill="var(--icon-fill)"></circle>
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
      <circle 
        cx="12" 
        cy="7" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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

export const IconCompass01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-01-twotone-rounded IconCompass01TwotoneRounded"
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
      <circle 
        cx="12" 
        cy="7" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCompass01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-01-solid-rounded IconCompass01SolidRounded"
    >
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

export const IconCompass01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-01-bulk-rounded IconCompass01BulkRounded"
    >
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

export const IconCompass01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-01-stroke-sharp IconCompass01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="8" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d3} 
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
    </TheIconWrapper>
  );
};

export const IconCompass01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-01-solid-sharp IconCompass01SolidSharp"
    >
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCompass01: TheIconSelfPack = {
  name: 'Compass01',
  StrokeRounded: IconCompass01StrokeRounded,
  DuotoneRounded: IconCompass01DuotoneRounded,
  TwotoneRounded: IconCompass01TwotoneRounded,
  SolidRounded: IconCompass01SolidRounded,
  BulkRounded: IconCompass01BulkRounded,
  StrokeSharp: IconCompass01StrokeSharp,
  SolidSharp: IconCompass01SolidSharp,
};