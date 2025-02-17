import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.02331 5.5C4.59826 7.11238 3 9.86954 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 9.86954 19.4017 7.11238 16.9767 5.5',
  d2: 'M12 2V10',
  d3: 'M7.95964 5.18436C8.25778 5.63184 8.13597 6.23577 7.68756 6.53329C5.58339 7.92941 4.2 10.3139 4.2 13.0203C4.2 17.3192 7.69218 20.8041 12 20.8041C16.3078 20.8041 19.8 17.3192 19.8 13.0203C19.8 10.3139 18.4166 7.92941 16.3124 6.53329C15.864 6.23577 15.7422 5.63184 16.0404 5.18436C16.3385 4.73689 16.9437 4.61533 17.3921 4.91285C20.0168 6.65432 21.75 9.63513 21.75 13.0203C21.75 18.3939 17.3848 22.75 12 22.75C6.61522 22.75 2.25 18.3939 2.25 13.0203C2.25 9.63513 3.98323 6.65432 6.60789 4.91285C7.0563 4.61533 7.6615 4.73689 7.95964 5.18436Z',
  d4: 'M12 1.25C12.5523 1.25 13 1.69772 13 2.25V10.25C13 10.8023 12.5523 11.25 12 11.25C11.4477 11.25 11 10.8023 11 10.25V2.25C11 1.69772 11.4477 1.25 12 1.25Z',
  d5: 'M7.57698 6.3327C5.41886 7.76761 4 10.2183 4 13C4 17.4182 7.58172 21 12 21C16.4183 21 20 17.4182 20 13C20 10.2183 18.5811 7.76761 16.423 6.3327L17.5304 4.66724C20.2223 6.45709 22 9.52071 22 13C22 18.5228 17.5228 23 12 23C6.47715 23 2 18.5228 2 13C2 9.52071 3.77767 6.45709 6.46963 4.66724L7.57698 6.3327Z',
  d6: 'M11 10V2H13V10H11Z',
};

export const IconLogout04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-04-stroke-rounded IconLogout04StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconLogout04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-04-duotone-rounded IconLogout04DuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="13" 
        r="9" 
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
    </TheIconWrapper>
  );
};

export const IconLogout04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-04-twotone-rounded IconLogout04TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconLogout04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-04-solid-rounded IconLogout04SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLogout04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-04-bulk-rounded IconLogout04BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLogout04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-04-stroke-sharp IconLogout04StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLogout04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="logout-04-solid-sharp IconLogout04SolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfLogout04: TheIconSelfPack = {
  name: 'Logout04',
  StrokeRounded: IconLogout04StrokeRounded,
  DuotoneRounded: IconLogout04DuotoneRounded,
  TwotoneRounded: IconLogout04TwotoneRounded,
  SolidRounded: IconLogout04SolidRounded,
  BulkRounded: IconLogout04BulkRounded,
  StrokeSharp: IconLogout04StrokeSharp,
  SolidSharp: IconLogout04SolidSharp,
};