import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 3H21',
  d2: 'M5 17.5V3',
  d3: 'M12 17.5L12 10.5',
  d4: 'M15.5 7L15.5 3',
  d5: 'M19 17L19 10.5',
  d6: 'M19 17C18.2864 17 17.903 17.1994 17.6169 17.8964C17.2445 18.8038 16.7909 20.1496 17.1056 20.7031C17.2744 21 17.6601 21 18.4315 21H19.5685C20.3399 21 20.7256 21 20.8944 20.7031C21.2091 20.1496 20.7555 18.8038 20.3831 17.8964C20.1105 17.2323 19.7423 17 19 17Z',
  d7: 'M15.5 14C17.433 14 19 12.433 19 10.5C19 8.567 17.433 7 15.5 7C13.567 7 12 8.567 12 10.5C12 12.433 13.567 14 15.5 14Z',
  d8: 'M8.5 21C10.433 21 12 19.433 12 17.5C12 15.567 10.433 14 8.5 14C6.567 14 5 15.567 5 17.5C5 19.433 6.567 21 8.5 21Z',
  d9: 'M12 17.5V10.5',
  d10: 'M15.5 7V3',
  d11: 'M19 17V10.5M19 17C18.2864 17 17.903 17.1994 17.6169 17.8964C17.2445 18.8038 16.7909 20.1496 17.1056 20.7031C17.2744 21 17.6601 21 18.4315 21H19.5685C20.3399 21 20.7256 21 20.8944 20.7031C21.2091 20.1496 20.7555 18.8038 20.3831 17.8964C20.1105 17.2323 19.7423 17 19 17Z',
  d12: 'M17.621 16.3371C18.0728 16.0568 18.5666 16 19 16C19.4625 16 19.9612 16.0697 20.4094 16.3586C20.8651 16.6523 21.1299 17.0822 21.3082 17.5168C21.5025 17.9901 21.7321 18.6105 21.8705 19.2061C21.9395 19.5033 21.9936 19.8263 21.9995 20.1399C22.005 20.4362 21.9707 20.8334 21.7637 21.1974C21.4741 21.7068 20.9989 21.8839 20.6284 21.9482C20.3271 22.0004 19.9603 22.0002 19.6282 22H18.3718C18.0397 22.0002 17.6729 22.0004 17.3717 21.9482C17.0011 21.8839 16.5259 21.7068 16.2363 21.1974C16.0294 20.8334 15.995 20.4362 16.0005 20.1399C16.0064 19.8263 16.0605 19.5033 16.1296 19.2061C16.268 18.6105 16.4975 17.9901 16.6918 17.5167C16.8798 17.0588 17.1564 16.6253 17.621 16.3371Z',
  d13: 'M11 10.5C11 8.01472 13.0147 6 15.5 6C17.9853 6 20 8.01472 20 10.5C20 12.9853 17.9853 15 15.5 15C13.0147 15 11 12.9853 11 10.5Z',
  d14: 'M4 17.5C4 15.0147 6.01472 13 8.5 13C10.9853 13 13 15.0147 13 17.5C13 19.9853 10.9853 22 8.5 22C6.01472 22 4 19.9853 4 17.5Z',
  d15: 'M2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3C22 3.55228 21.5523 4 21 4H16.5V7C16.5 7.55228 16.0523 8 15.5 8C14.9477 8 14.5 7.55228 14.5 7V4H6V17.5C6 18.0523 5.55228 18.5 5 18.5C4.44772 18.5 4 18.0523 4 17.5V4H3C2.44772 4 2 3.55228 2 3ZM12 9.49999C12.5523 9.49999 13 9.94771 13 10.5V17.5C13 18.0523 12.5523 18.5 12 18.5C11.4477 18.5 11 18.0523 11 17.5V10.5C11 9.94771 11.4477 9.49999 12 9.49999ZM19 9.49999C19.5523 9.49999 20 9.94771 20 10.5V17C20 17.5523 19.5523 18 19 18C18.4477 18 18 17.5523 18 17V10.5C18 9.94771 18.4477 9.49999 19 9.49999Z',
  d16: 'M2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3C22 3.55228 21.5523 4 21 4H16.5V6.11155C16.1784 6.03858 15.8437 6.00005 15.5 6.00005C15.1563 6.00005 14.8216 6.03858 14.5 6.11155V4H6V13.7578C4.79401 14.5651 4 15.9398 4 17.5V4H3C2.44772 4 2 3.55228 2 3Z',
  d17: 'M20 10.5C20 12.0603 19.206 13.435 18 14.2423V16.1535C18.339 16.03 18.6854 16 19 16C19.3255 16 19.6689 16.0346 20 16.1557V10.5Z',
  d18: 'M13 14.2423V17.5C13 15.9398 12.206 14.5651 11 13.7578V10.5C11 12.0603 11.794 13.435 13 14.2423Z',
  d19: 'M2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3C22 3.55228 21.5523 4 21 4H3C2.44772 4 2 3.55228 2 3Z',
  d20: 'M17 21H21L20 17H18L17 21Z',
  d21: 'M21 4H2V2H21V4Z',
  d22: 'M6 3V17.5H4V3H6Z',
  d23: 'M13 10.5L13 17.5L11 17.5L11 10.5L13 10.5Z',
  d24: 'M16.5 3L16.5 7L14.5 7L14.5 3L16.5 3Z',
  d25: 'M20 10.5L20 17L18 17L18 10.5L20 10.5Z',
  d26: 'M17.4146 16.5H20.5857L22.0005 22H16.0005L17.4146 16.5Z',
};

export const IconPulleyStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pulley-stroke-rounded IconPulleyStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="15.5" 
        cy="10.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="8.5" 
        cy="17.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPulleyDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pulley-duotone-rounded IconPulleyDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        opacity="var(--icon-opacity)" 
        cx="15.5" 
        cy="10.5" 
        r="3.5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="15.5" 
        cy="10.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="8.5" 
        cy="17.5" 
        r="3.5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="8.5" 
        cy="17.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPulleyTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pulley-twotone-rounded IconPulleyTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPulleySolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pulley-solid-rounded IconPulleySolidRounded"
    >
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconPulleyBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pulley-bulk-rounded IconPulleyBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPulleyStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pulley-stroke-sharp IconPulleyStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="15.5" 
        cy="10.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="8.5" 
        cy="17.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPulleySolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pulley-solid-sharp IconPulleySolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPulley: TheIconSelfPack = {
  name: 'Pulley',
  StrokeRounded: IconPulleyStrokeRounded,
  DuotoneRounded: IconPulleyDuotoneRounded,
  TwotoneRounded: IconPulleyTwotoneRounded,
  SolidRounded: IconPulleySolidRounded,
  BulkRounded: IconPulleyBulkRounded,
  StrokeSharp: IconPulleyStrokeSharp,
  SolidSharp: IconPulleySolidSharp,
};