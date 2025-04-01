import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 9.35714V10.5M18 9.35714C16.9878 9.35714 16.0961 8.85207 15.573 8.08517M18 9.35714C19.0122 9.35714 19.9039 8.85207 20.427 8.08517M18 3.64286C19.0123 3.64286 19.9041 4.148 20.4271 4.915M18 3.64286C16.9877 3.64286 16.0959 4.148 15.5729 4.915M18 3.64286V2.5M21.5 4.21429L20.4271 4.915M14.5004 8.78571L15.573 8.08517M14.5 4.21429L15.5729 4.915M21.4996 8.78571L20.427 8.08517M20.4271 4.915C20.7364 5.36854 20.9167 5.91364 20.9167 6.5C20.9167 7.08643 20.7363 7.63159 20.427 8.08517M15.5729 4.915C15.2636 5.36854 15.0833 5.91364 15.0833 6.5C15.0833 7.08643 15.2637 7.63159 15.573 8.08517',
  d2: 'M1.25 6C1.25 3.37665 3.37665 1.25 6 1.25C8.62335 1.25 10.75 3.37665 10.75 6C10.75 8.62335 8.62335 10.75 6 10.75C3.37665 10.75 1.25 8.62335 1.25 6Z',
  d3: 'M1.25 18C1.25 15.3766 3.37665 13.25 6 13.25C8.62335 13.25 10.75 15.3766 10.75 18C10.75 20.6234 8.62335 22.75 6 22.75C3.37665 22.75 1.25 20.6234 1.25 18Z',
  d4: 'M13.25 18C13.25 15.3766 15.3766 13.25 18 13.25C20.6234 13.25 22.75 15.3766 22.75 18C22.75 20.6234 20.6234 22.75 18 22.75C15.3766 22.75 13.25 20.6234 13.25 18Z',
  d5: 'M17.75 1.25C18.3023 1.25 18.75 1.69772 18.75 2.25V2.51987C19.3493 2.67537 19.8934 2.96738 20.345 3.36095L20.7032 3.12703C21.1656 2.82503 21.7853 2.95507 22.0872 3.41748C22.3892 3.87988 22.2592 4.49955 21.7968 4.80154L21.4629 5.01962C21.5949 5.40613 21.6667 5.82007 21.6667 6.25C21.6667 6.68001 21.5949 7.09402 21.4628 7.48058L21.7964 7.69846C22.2588 8.00045 22.3889 8.62012 22.0869 9.08252C21.7849 9.54493 21.1652 9.67496 20.7028 9.37297L20.3449 9.13919C19.8933 9.53268 19.3492 9.82465 18.75 9.98013V10.25C18.75 10.8023 18.3023 11.25 17.75 11.25C17.1977 11.25 16.75 10.8023 16.75 10.25V9.98013C16.1507 9.82465 15.6067 9.53268 15.1551 9.13919L14.7972 9.37297C14.3348 9.67496 13.7151 9.54493 13.4131 9.08252C13.1111 8.62012 13.2412 8.00045 13.7036 7.69846L14.0372 7.48058C13.9051 7.09402 13.8333 6.68001 13.8333 6.25C13.8333 5.82007 13.9051 5.40613 14.0371 5.01962L13.7032 4.80154C13.2408 4.49955 13.1107 3.87988 13.4127 3.41748C13.7147 2.95507 14.3344 2.82503 14.7968 3.12703L15.155 3.36095C15.6065 2.96738 16.1507 2.67537 16.75 2.51987V2.25C16.75 1.69772 17.1977 1.25 17.75 1.25ZM17.75 4.39286C17.0766 4.39286 16.4905 4.7277 16.1491 5.22838C15.9487 5.52221 15.8333 5.87219 15.8333 6.25C15.8333 6.62786 15.9488 6.97787 16.1492 7.27173C16.4906 7.77235 17.0767 8.10714 17.75 8.10714C18.4233 8.10714 19.0094 7.77235 19.3508 7.27173C19.5512 6.97787 19.6667 6.62786 19.6667 6.25C19.6667 5.87219 19.5512 5.52221 19.3509 5.22838C19.0095 4.7277 18.4234 4.39286 17.75 4.39286Z',
  d6: 'M18 9.71428V11.5M18 9.71428C16.8432 9.71428 15.8241 9.14608 15.2263 8.28331M18 9.71428C19.1568 9.71428 20.1759 9.14608 20.7737 8.28331M18 3.28571C19.1569 3.28571 20.1761 3.854 20.7738 4.71688M18 3.28571C16.8431 3.28571 15.8239 3.854 15.2262 4.71688M18 3.28571V1.5M22.5 3.5L20.7738 4.71688M13.5 9.5L15.2263 8.28331M13.5 3.5L15.2262 4.71688M22.5 9.5L20.7737 8.28331M20.7738 4.71688C21.1273 5.22711 21.3333 5.84035 21.3333 6.5C21.3333 7.15973 21.1272 7.77304 20.7737 8.28331M15.2262 4.71688C14.8727 5.22711 14.6667 5.84035 14.6667 6.5C14.6667 7.15973 14.8728 7.77304 15.2263 8.28331',
  d7: 'M1.25 6.25C1.25 3.48858 3.48858 1.25 6.25 1.25C9.01142 1.25 11.25 3.48858 11.25 6.25C11.25 9.01142 9.01142 11.25 6.25 11.25C3.48858 11.25 1.25 9.01142 1.25 6.25Z',
  d8: 'M12.75 17.75C12.75 14.9886 14.9886 12.75 17.75 12.75C20.5114 12.75 22.75 14.9886 22.75 17.75C22.75 20.5114 20.5114 22.75 17.75 22.75C14.9886 22.75 12.75 20.5114 12.75 17.75Z',
  d9: 'M1.25 17.75C1.25 14.9886 3.48858 12.75 6.25 12.75C9.01142 12.75 11.25 14.9886 11.25 17.75C11.25 20.5114 9.01142 22.75 6.25 22.75C3.48858 22.75 1.25 20.5114 1.25 17.75Z',
  d10: 'M16.6738 2.14864C15.9464 2.31586 15.2875 2.66173 14.7511 3.13842L13.75 2.43267L12.5976 4.06733L13.611 4.78169C13.4364 5.23865 13.3405 5.73355 13.3405 6.25C13.3405 6.76649 13.4364 7.26144 13.611 7.71844L12.5977 8.43261L13.7499 10.0674L14.7512 9.36167C15.2876 9.83832 15.9464 10.1841 16.6738 10.3514V11.25H18.6738V10.3514C19.4012 10.1841 20.06 9.83832 20.5964 9.36167L21.5977 10.0674L22.7499 8.43261L21.7366 7.71844C21.9113 7.26144 22.0072 6.76649 22.0072 6.25C22.0072 5.73355 21.9113 5.23865 21.7366 4.78169L22.75 4.06733L21.5976 2.43267L20.5965 3.13842C20.0601 2.66173 19.4013 2.31586 18.6738 2.14864V1.25H16.6738V2.14864ZM17.6738 4.03571C16.849 4.03571 16.1352 4.43984 15.722 5.03631C15.4794 5.3866 15.3405 5.80259 15.3405 6.25C15.3405 6.69747 15.4794 7.11351 15.7221 7.46382C16.1353 8.06022 16.849 8.46428 17.6738 8.46428C18.4986 8.46428 19.2123 8.06022 19.6255 7.46382C19.8682 7.11351 20.0072 6.69747 20.0072 6.25C20.0072 5.80259 19.8683 5.3866 19.6256 5.03631C19.2124 4.43984 18.4987 4.03571 17.6738 4.03571Z',
};

export const IconDashboardCircleSettingsStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-settings-stroke-rounded IconDashboardCircleSettingsStrokeRounded"
    >
      <circle 
        cx="6.25" 
        cy="6.25" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="17.75" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6.25" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconDashboardCircleSettingsDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-settings-duotone-rounded IconDashboardCircleSettingsDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="6.25" 
        cy="6.25" 
        r="4.25" 
        fill="var(--icon-fill)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="17.75" 
        cy="17.75" 
        r="4.25" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="6.25" 
        cy="6.25" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="17.75" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6.25" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconDashboardCircleSettingsTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-settings-twotone-rounded IconDashboardCircleSettingsTwotoneRounded"
    >
      <circle 
        cx="6.25" 
        cy="6.25" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="17.75" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6.25" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconDashboardCircleSettingsSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-settings-solid-rounded IconDashboardCircleSettingsSolidRounded"
    >
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardCircleSettingsBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-settings-bulk-rounded IconDashboardCircleSettingsBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardCircleSettingsStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-settings-stroke-sharp IconDashboardCircleSettingsStrokeSharp"
    >
      <circle 
        cx="6.25" 
        cy="6.25" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17.75" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6.25" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardCircleSettingsSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-settings-solid-sharp IconDashboardCircleSettingsSolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const iconPackOfDashboardCircleSettings: TheIconSelfPack = {
  name: 'DashboardCircleSettings',
  StrokeRounded: IconDashboardCircleSettingsStrokeRounded,
  DuotoneRounded: IconDashboardCircleSettingsDuotoneRounded,
  TwotoneRounded: IconDashboardCircleSettingsTwotoneRounded,
  SolidRounded: IconDashboardCircleSettingsSolidRounded,
  BulkRounded: IconDashboardCircleSettingsBulkRounded,
  StrokeSharp: IconDashboardCircleSettingsStrokeSharp,
  SolidSharp: IconDashboardCircleSettingsSolidSharp,
};