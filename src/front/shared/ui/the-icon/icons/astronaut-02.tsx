import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 13C3.34315 13 2 11.6569 2 10C2 8.34315 2 7 5 7',
  d2: 'M19 13C20.6569 13 22 11.6569 22 10C22 8.34315 22 7 19 7',
  d3: 'M20.5 7V3',
  d4: 'M18 21C18.5523 21 19 20.5523 19 20C19 18.3431 17.6569 17 16 17H8C6.34315 17 5 18.3431 5 20C5 20.5523 5.44772 21 6 21H18Z',
  d5: 'M2 10C2 11.6569 3.34315 13 5 13V7C2 7 2 8.34315 2 10Z',
  d6: 'M19 13C20.6569 13 22 11.6569 22 10C22 8.34315 22 7 19 7V13Z',
  d7: 'M19 13C20.6569 13 22 11.6569 22 10C22 8.34315 22 7 19 7M20.5 7V3',
  d8: 'M12 4.1875C8.78984 4.1875 6.1875 6.78984 6.1875 10C6.1875 13.2102 8.78984 15.8125 12 15.8125C15.2102 15.8125 17.8125 13.2102 17.8125 10C17.8125 6.78984 15.2102 4.1875 12 4.1875ZM4.25 10C4.25 5.71979 7.71979 2.25 12 2.25C16.2802 2.25 19.75 5.71979 19.75 10C19.75 14.2802 16.2802 17.75 12 17.75C7.71979 17.75 4.25 14.2802 4.25 10Z',
  d9: 'M1.75791 7.45242C2.34948 6.596 3.42905 6.25 5 6.25C5.41422 6.25 5.75 6.58579 5.75 7V13C5.75 13.4142 5.41422 13.75 5 13.75C2.92893 13.75 1.25 12.0711 1.25 10L1.25 9.97439V9.97436C1.24998 9.57882 1.24995 9.14281 1.30319 8.73514C1.35847 8.31189 1.47735 7.85858 1.75791 7.45242Z',
  d10: 'M18.25 7C18.25 6.58579 18.5858 6.25 19 6.25C20.571 6.25 21.6505 6.596 22.2421 7.45242C22.5226 7.85858 22.6415 8.31189 22.6968 8.73514C22.7501 9.14282 22.75 9.57884 22.75 9.97438V9.97438L22.75 10C22.75 12.0711 21.0711 13.75 19 13.75C18.5858 13.75 18.25 13.4142 18.25 13V7Z',
  d11: 'M20.5 2.25C21.0523 2.25 21.5 2.69772 21.5 3.25V7.25C21.5 7.80228 21.0523 8.25 20.5 8.25C19.9477 8.25 19.5 7.80228 19.5 7.25V3.25C19.5 2.69772 19.9477 2.25 20.5 2.25Z',
  d12: 'M4.25 20C4.25 17.9289 5.92893 16.25 8 16.25H16C18.0711 16.25 19.75 17.9289 19.75 20C19.75 20.9665 18.9665 21.75 18 21.75H6C5.0335 21.75 4.25 20.9665 4.25 20Z',
  d13: 'M5.20102 6.27724C4.59477 7.38211 4.25 8.65079 4.25 10C4.25 11.3492 4.59477 12.6179 5.20102 13.7228C5.13705 13.7405 5.06963 13.75 5 13.75C2.92894 13.75 1.25 12.0711 1.25 10L1.25 9.97439C1.24998 9.57885 1.24995 9.14281 1.30319 8.73514C1.35847 8.31189 1.47736 7.85858 1.75791 7.45242C2.34948 6.596 3.42905 6.25 5 6.25C5.06963 6.25 5.13705 6.25949 5.20102 6.27724Z',
  d14: 'M7.46797 16.2875C5.64888 16.5458 4.25 18.1095 4.25 20C4.25 20.9665 5.03351 21.75 6 21.75H18C18.9665 21.75 19.75 20.9665 19.75 20C19.75 18.1095 18.3511 16.5458 16.532 16.2875C15.2576 17.2077 13.6921 17.75 12 17.75C10.3079 17.75 8.74245 17.2077 7.46797 16.2875Z',
  d15: 'M18.799 13.7228C18.863 13.7405 18.9304 13.75 19 13.75C21.0711 13.75 22.75 12.0711 22.75 10V9.97438C22.75 9.57884 22.7501 9.14282 22.6968 8.73514C22.6415 8.31189 22.5226 7.85858 22.2421 7.45242C21.6505 6.596 20.571 6.25 19 6.25C18.9304 6.25 18.863 6.25949 18.799 6.27725C19.4052 7.38211 19.75 8.65079 19.75 10C19.75 11.3492 19.4052 12.6179 18.799 13.7228Z',
  d16: 'M21.5 3.25C21.5 2.69772 21.0523 2.25 20.5 2.25C19.9477 2.25 19.5 2.69772 19.5 3.25V6.26299C20.3211 6.30678 20.9876 6.46525 21.5 6.76749V3.25Z',
  d17: 'M18.5 7L19.0001 7.00002C20.6569 7.00007 22 8.3432 22 10C22 11.6569 20.6569 13 19 13H18.5',
  d18: 'M5.50195 13L5.00185 13C3.34504 12.9999 2.00195 11.6568 2.00195 9.99999C2.00195 8.34314 3.3451 7 5.00195 7L5.50195 7',
  d19: 'M20.5 7V2.5',
  d20: 'M15 17H9C8.07003 17 7.60504 17 7.22354 17.1022C6.18827 17.3796 5.37962 18.1883 5.10222 19.2235C5 19.605 5 20.07 5 21H19C19 20.07 19 19.605 18.8978 19.2235C18.6204 18.1883 17.8117 17.3796 16.7765 17.1022C16.395 17 15.93 17 15 17Z',
  d21: 'M17.959 7.29191C17.959 6.71648 18.4255 6.25 19.0009 6.25C21.0719 6.25007 22.7508 7.92898 22.7508 9.99999C22.7508 12.071 21.0719 13.75 19.0008 13.75C18.4255 13.75 17.959 13.2836 17.959 12.7082V7.29191Z',
  d22: 'M1.25195 9.99999C1.25195 7.92893 2.93088 6.25 5.00195 6.25C5.59527 6.25 6.07626 6.73099 6.07626 7.32431V12.6756C6.07626 13.269 5.59521 13.75 5.00182 13.75C2.93081 13.7499 1.25195 12.071 1.25195 9.99999Z',
  d23: 'M21.5 2.5V8H19.5V2.5H21.5Z',
  d24: 'M8.88425 16.25H15.1158C15.9338 16.2498 16.492 16.2496 16.9706 16.3778C18.2647 16.7246 19.2755 17.7354 19.6223 19.0295C19.7505 19.5081 19.7503 20.1821 19.75 21C19.75 21.4143 19.4143 21.75 19 21.75H5.00005C4.58584 21.75 4.25005 21.4143 4.25005 21C4.24978 20.1821 4.24957 19.5081 4.37783 19.0295C4.72458 17.7354 5.73538 16.7246 7.02948 16.3778C7.50814 16.2496 8.06629 16.2498 8.88425 16.25Z',
};

export const IconAstronaut02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="astronaut-02-stroke-rounded IconAstronaut02StrokeRounded"
    >
      <circle 
        cx="12" 
        cy="10" 
        r="7" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <ellipse 
        cx="12" 
        cy="10" 
        rx="4" 
        ry="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></ellipse>
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

export const IconAstronaut02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="astronaut-02-duotone-rounded IconAstronaut02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      </g>
      <circle 
        cx="12" 
        cy="10" 
        r="7" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <ellipse 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="10" 
        rx="4" 
        ry="3" 
        fill="var(--icon-fill)"></ellipse>
      <ellipse 
        cx="12" 
        cy="10" 
        rx="4" 
        ry="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></ellipse>
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

export const IconAstronaut02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="astronaut-02-twotone-rounded IconAstronaut02TwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="10" 
        r="7" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <ellipse 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="10" 
        rx="4" 
        ry="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></ellipse>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
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
    </TheIconWrapper>
  );
};

export const IconAstronaut02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="astronaut-02-solid-rounded IconAstronaut02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <ellipse 
        cx="12" 
        cy="10" 
        rx="4" 
        ry="3" 
        fill="var(--icon-fill)"></ellipse>
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconAstronaut02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="astronaut-02-bulk-rounded IconAstronaut02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <ellipse 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="10" 
        rx="4" 
        ry="3" 
        fill="var(--icon-fill)"></ellipse>
      <g 
        opacity="var(--icon-opacity)">
      <path 
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
      </g>
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAstronaut02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="astronaut-02-stroke-sharp IconAstronaut02StrokeSharp"
    >
      <circle 
        cx="12" 
        cy="10" 
        r="7" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <ellipse 
        cx="12" 
        cy="10" 
        rx="4" 
        ry="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAstronaut02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="astronaut-02-solid-sharp IconAstronaut02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <ellipse 
        cx="12" 
        cy="10" 
        rx="4" 
        ry="3" 
        fill="var(--icon-fill)"></ellipse>
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
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
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAstronaut02: TheIconSelfPack = {
  name: 'Astronaut02',
  StrokeRounded: IconAstronaut02StrokeRounded,
  DuotoneRounded: IconAstronaut02DuotoneRounded,
  TwotoneRounded: IconAstronaut02TwotoneRounded,
  SolidRounded: IconAstronaut02SolidRounded,
  BulkRounded: IconAstronaut02BulkRounded,
  StrokeSharp: IconAstronaut02StrokeSharp,
  SolidSharp: IconAstronaut02SolidSharp,
};