import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22C15.3137 22 18 19.3137 18 16C18 12.6863 15.3137 10 12 10C8.68629 10 6 12.6863 6 16C6 19.3137 8.68629 22 12 22Z',
  d2: 'M7 2V4M17 2V4',
  d3: 'M12.0001 2V7.5M12.0001 7.5C12.5 7.4925 13.1345 6.56222 14.0601 5.50277M12.0001 7.5C11.5 7.4925 11.1845 6.81248 10.0601 5.50277',
  d4: 'M11.94 2V7.5M11.94 7.5C12.4399 7.4925 13.0744 6.56222 14 5.50277M11.94 7.5C11.4399 7.4925 11.1244 6.81248 10 5.50277',
  d5: 'M5.25 16C5.25 12.2721 8.27208 9.25 12 9.25C15.7279 9.25 18.75 12.2721 18.75 16C18.75 19.7279 15.7279 22.75 12 22.75C8.27208 22.75 5.25 19.7279 5.25 16Z',
  d6: 'M7 1.25C7.41421 1.25 7.75 1.58579 7.75 2V4C7.75 4.41421 7.41421 4.75 7 4.75C6.58579 4.75 6.25 4.41421 6.25 4V2C6.25 1.58579 6.58579 1.25 7 1.25ZM17 1.25C17.4142 1.25 17.75 1.58579 17.75 2V4C17.75 4.41421 17.4142 4.75 17 4.75C16.5858 4.75 16.25 4.41421 16.25 4V2C16.25 1.58579 16.5858 1.25 17 1.25Z',
  d7: 'M11.251 4.75002H10.8417C10.6867 4.74989 10.4971 4.74974 10.3415 4.7724C10.1879 4.79479 9.77687 4.87795 9.58167 5.30372C9.38742 5.72744 9.59001 6.09241 9.672 6.22319C9.75547 6.35632 9.86051 6.47992 9.96135 6.59858L10.4625 7.18922C10.6728 7.43719 10.8771 7.67802 11.069 7.85062C11.2797 8.04003 11.5848 8.25004 12.001 8.25004C12.4172 8.25004 12.7223 8.04003 12.933 7.85062C13.1249 7.67802 13.3292 7.43719 13.5395 7.18922L14.0228 6.61957C14.1237 6.50088 14.2465 6.35634 14.33 6.22319C14.412 6.09241 14.6146 5.72743 14.4204 5.30372C14.2252 4.87795 13.8142 4.79479 13.6605 4.7724C13.505 4.74974 13.3153 4.74989 13.1603 4.75002H12.751V2C12.751 1.58579 12.4152 1.25 12.001 1.25C11.5868 1.25 11.251 1.58579 11.251 2V4.75002Z',
  d8: 'M12 21.9864C15.3137 21.9864 18 19.302 18 15.9905C18 12.6791 15.3137 9.99463 12 9.99463C8.68629 9.99463 6 12.6791 6 15.9905C6 19.302 8.68629 21.9864 12 21.9864Z',
  d9: 'M7 2V3.99863M17 2V3.99863',
  d10: 'M12.0106 1.99023L12.0101 6.83125M14.5054 4.99925L12.0101 7.49631L9.50098 4.99454',
  d11: 'M5.25 15.625C5.25 11.8971 8.27208 8.875 12 8.875C15.7279 8.875 18.75 11.8971 18.75 15.625C18.75 19.3529 15.7279 22.375 12 22.375C8.27208 22.375 5.25 19.3529 5.25 15.625Z',
  d12: 'M6 3.625V1.625H8V3.625H6ZM16 3.625V1.625H18V3.625H16Z',
  d13: 'M12.0001 8.125L15.2072 4.91789L13.793 3.50368L13.0001 4.29657V1.62485H11.0001V4.29657L10.2072 3.50368L8.79297 4.91789L12.0001 8.125Z',
};

export const IconGravityStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gravity-stroke-rounded IconGravityStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconGravityDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gravity-duotone-rounded IconGravityDuotoneRounded"
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGravityTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gravity-twotone-rounded IconGravityTwotoneRounded"
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

export const IconGravitySolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gravity-solid-rounded IconGravitySolidRounded"
    >
      <path 
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
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGravityBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gravity-bulk-rounded IconGravityBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGravityStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gravity-stroke-sharp IconGravityStrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconGravitySolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gravity-solid-sharp IconGravitySolidSharp"
    >
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const iconPackOfGravity: TheIconSelfPack = {
  name: 'Gravity',
  StrokeRounded: IconGravityStrokeRounded,
  DuotoneRounded: IconGravityDuotoneRounded,
  TwotoneRounded: IconGravityTwotoneRounded,
  SolidRounded: IconGravitySolidRounded,
  BulkRounded: IconGravityBulkRounded,
  StrokeSharp: IconGravityStrokeSharp,
  SolidSharp: IconGravitySolidSharp,
};