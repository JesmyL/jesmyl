import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 13C2 9.70017 2 8.05025 2.87868 7.02513C3.75736 6 5.17157 6 8 6H16C18.8284 6 20.2426 6 21.1213 7.02513C22 8.05025 22 9.70017 22 13C22 16.2998 22 17.9497 21.1213 18.9749C20.2426 20 18.8284 20 16 20H8C5.17157 20 3.75736 20 2.87868 18.9749C2 17.9497 2 16.2998 2 13Z',
  d2: 'M7 15H7.00898',
  d3: 'M6 20V22M18 20V22',
  d4: 'M5 6L19 2',
  d5: 'M9 11H6',
  d6: 'M2.87868 7.02513C2 8.05025 2 9.70017 2 13C2 16.2998 2 17.9497 2.87868 18.9749C3.75736 20 5.17157 20 8 20H16C18.8284 20 20.2426 20 21.1213 18.9749C22 17.9497 22 16.2998 22 13C22 9.70017 22 8.05025 21.1213 7.02513C20.2426 6 18.8284 6 16 6H8C5.17157 6 3.75736 6 2.87868 7.02513ZM15 16C16.6569 16 18 14.6569 18 13C18 11.3431 16.6569 10 15 10C13.3431 10 12 11.3431 12 13C12 14.6569 13.3431 16 15 16Z',
  d7: 'M19.9523 1.69426C20.1213 2.22005 19.8321 2.78329 19.3063 2.9523L12.1579 5.25H7.93751C7.0029 5.24998 6.18691 5.24996 5.48399 5.2944L18.6943 1.04824C19.2201 0.879237 19.7833 1.16847 19.9523 1.69426ZM5 20.6656V22C5 22.5523 5.44772 23 6 23C6.55228 23 7 22.5523 7 22V20.7481C6.24245 20.7433 5.57709 20.7262 5 20.6656ZM17 20.7481V22C17 22.5523 17.4477 23 18 23C18.5523 23 19 22.5523 19 22V20.6656C18.4229 20.7262 17.7575 20.7433 17 20.7481Z',
  d8: 'M16.0625 5.25H7.93751H7.93749C6.57648 5.24997 5.46703 5.24995 4.59197 5.3872C3.66863 5.53203 2.90375 5.84344 2.30924 6.53704C1.72902 7.21396 1.482 8.05637 1.36477 9.07369C1.24998 10.0698 1.24999 11.3427 1.25 12.9513V12.9513V13.0487V13.0487C1.24999 14.6573 1.24998 15.9303 1.36477 16.9263C1.482 17.9436 1.72902 18.786 2.30924 19.463C2.90375 20.1566 3.66863 20.468 4.59197 20.6128C5.46703 20.7501 6.57647 20.75 7.93748 20.75H16.0625C17.4235 20.75 18.533 20.7501 19.408 20.6128C20.3314 20.468 21.0963 20.1566 21.6908 19.463C22.271 18.786 22.518 17.9436 22.6352 16.9263C22.75 15.9303 22.75 14.6574 22.75 13.0488V13.0487V13.0487V12.9513V12.9513V12.9513C22.75 11.3427 22.75 10.0697 22.6352 9.07369C22.518 8.05637 22.271 7.21396 21.6908 6.53704C21.0963 5.84344 20.3314 5.53203 19.408 5.3872C18.533 5.24995 17.4235 5.24997 16.0625 5.25H16.0625ZM5 11C5 10.4477 5.44772 10 6 10H9C9.55229 10 10 10.4477 10 11C10 11.5523 9.55229 12 9 12H6C5.44772 12 5 11.5523 5 11ZM6 15C6 14.4477 6.44772 14 7 14H7.00898C7.56127 14 8.00898 14.4477 8.00898 15C8.00898 15.5523 7.56127 16 7.00898 16H7C6.44772 16 6 15.5523 6 15ZM11.5 13C11.5 11.067 13.067 9.5 15 9.5C16.933 9.5 18.5 11.067 18.5 13C18.5 14.933 16.933 16.5 15 16.5C13.067 16.5 11.5 14.933 11.5 13Z',
  d9: 'M16.0625 5.25H7.93751C6.57649 5.24997 5.46703 5.24994 4.59197 5.3872C3.66863 5.53203 2.90375 5.84344 2.30924 6.53704C1.72902 7.21396 1.482 8.05637 1.36477 9.07369C1.24998 10.0698 1.24999 11.3427 1.25 12.9513V13.0487C1.24999 14.6573 1.24998 15.9302 1.36477 16.9263C1.482 17.9436 1.72902 18.786 2.30924 19.463C2.90375 20.1566 3.66863 20.468 4.59197 20.6128C5.46703 20.7501 6.57647 20.75 7.93748 20.75H16.0625C17.4235 20.75 18.533 20.7501 19.408 20.6128C20.3314 20.468 21.0963 20.1566 21.6908 19.463C22.271 18.786 22.518 17.9436 22.6352 16.9263C22.75 15.9303 22.75 14.6574 22.75 13.0487V12.9513C22.75 11.3427 22.75 10.0697 22.6352 9.07369C22.518 8.05637 22.271 7.21396 21.6908 6.53704C21.0963 5.84344 20.3314 5.53203 19.408 5.3872C18.533 5.24994 17.4235 5.24997 16.0625 5.25Z',
  d10: 'M6 15C6 14.4477 6.44772 14 7 14H7.00898C7.56127 14 8.00898 14.4477 8.00898 15C8.00898 15.5523 7.56127 16 7.00898 16H7C6.44772 16 6 15.5523 6 15Z',
  d11: 'M5 11C5 10.4477 5.44772 10 6 10H9C9.55228 10 10 10.4477 10 11C10 11.5523 9.55228 12 9 12H6C5.44772 12 5 11.5523 5 11Z',
  d12: 'M15 9.5C13.067 9.5 11.5 11.067 11.5 13C11.5 14.933 13.067 16.5 15 16.5C16.933 16.5 18.5 14.933 18.5 13C18.5 11.067 16.933 9.5 15 9.5Z',
  d13: 'M22 6H2V20H22V6Z',
  d14: 'M10 11H5',
  d15: 'M19.2051 2.69229L10.2531 5.25H22C22.4142 5.25 22.75 5.58579 22.75 6V20C22.75 20.4142 22.4142 20.75 22 20.75H19V22.75H17V20.75H7V22.75H5V20.75H2C1.58579 20.75 1.25 20.4142 1.25 20V6C1.25 5.58579 1.58579 5.25 2 5.25H4.79297L18.793 1.25L19.2051 2.69229ZM5 11.75H10V10.25H5V11.75ZM15 10.75C13.7574 10.75 12.75 11.7574 12.75 13C12.75 14.2426 13.7574 15.25 15 15.25C16.2426 15.25 17.25 14.2426 17.25 13C17.25 11.7574 16.2426 10.75 15 10.75ZM11.25 13C11.25 10.9289 12.9289 9.25 15 9.25C17.0711 9.25 18.75 10.9289 18.75 13C18.75 15.0711 17.0711 16.75 15 16.75C12.9289 16.75 11.25 15.0711 11.25 13ZM8.00898 14H6V16H8.00898V14Z',
};

export const IconRadio02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="radio-02-stroke-rounded IconRadio02StrokeRounded"
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
      <circle 
        cx="15" 
        cy="13" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconRadio02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="radio-02-duotone-rounded IconRadio02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
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
      <circle 
        cx="15" 
        cy="13" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconRadio02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="radio-02-twotone-rounded IconRadio02TwotoneRounded"
    >
      <path 
        d={d.d1} 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="15" 
        cy="13" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconRadio02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="radio-02-solid-rounded IconRadio02SolidRounded"
    >
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

export const IconRadio02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="radio-02-bulk-rounded IconRadio02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRadio02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="radio-02-stroke-sharp IconRadio02StrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
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
      <circle 
        cx="15" 
        cy="13" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconRadio02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="radio-02-solid-sharp IconRadio02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRadio02: TheIconSelfPack = {
  name: 'Radio02',
  StrokeRounded: IconRadio02StrokeRounded,
  DuotoneRounded: IconRadio02DuotoneRounded,
  TwotoneRounded: IconRadio02TwotoneRounded,
  SolidRounded: IconRadio02SolidRounded,
  BulkRounded: IconRadio02BulkRounded,
  StrokeSharp: IconRadio02StrokeSharp,
  SolidSharp: IconRadio02SolidSharp,
};