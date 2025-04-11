import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8.12901 11.5977L12.128 6.20791C12.4408 5.78638 13.027 6.04874 13.027 6.61024V10.782C13.027 11.1183 13.2569 11.391 13.5405 11.391H15.4855C15.9274 11.391 16.1629 12.0089 15.871 12.4023L11.872 17.7921C11.5592 18.2136 10.973 17.9513 10.973 17.3898V13.218C10.973 12.8817 10.7431 12.609 10.4595 12.609H8.51449C8.07264 12.609 7.83711 11.9911 8.12901 11.5977Z',
  d2: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.128 6.20791L8.12901 11.5977C7.83711 11.9911 8.07264 12.609 8.51449 12.609H10.4595C10.7431 12.609 10.973 12.8817 10.973 13.218V17.3898C10.973 17.9513 11.5592 18.2136 11.872 17.7921L15.871 12.4023C16.1629 12.0089 15.9274 11.391 15.4855 11.391H13.5405C13.2569 11.391 13.027 11.1183 13.027 10.782V6.61024C13.027 6.04874 12.4408 5.78638 12.128 6.20791Z',
  d3: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM13.7768 6.61028C13.7768 6.06058 13.4801 5.57035 13.0009 5.35591C12.4938 5.12895 11.8913 5.26801 11.5255 5.76105L7.52647 11.1508C7.20753 11.5807 7.18968 12.1091 7.34555 12.518C7.50024 12.9239 7.89708 13.3591 8.51426 13.3591H10.2228V17.3898C10.2228 17.9395 10.5195 18.4297 10.9986 18.6442C11.5057 18.8711 12.1083 18.7321 12.4741 18.239L16.4731 12.8493C16.792 12.4194 16.8099 11.891 16.654 11.482C16.4993 11.0762 16.1025 10.641 15.4853 10.641H13.7768V6.61028Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d5: 'M13.0009 5.35591C13.4801 5.57035 13.7768 6.06058 13.7768 6.61028V10.641H15.4853C16.1025 10.641 16.4993 11.0762 16.654 11.482C16.8099 11.891 16.792 12.4194 16.4731 12.8493L12.4741 18.239C12.1083 18.7321 11.5057 18.8711 10.9986 18.6442C10.5195 18.4297 10.2228 17.9395 10.2228 17.3898V13.3591H8.51426C7.89708 13.3591 7.50024 12.9239 7.34555 12.518C7.18968 12.1091 7.20753 11.5807 7.52647 11.1508L11.5255 5.76105C11.8913 5.26801 12.4938 5.12895 13.0009 5.35591Z',
  d6: 'M8 12.4999L12.9999 5.99988V11.4999H15.9999L10.9999 17.9999V12.4999H8Z',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM13.7499 6.00005C13.7499 5.6789 13.5454 5.3934 13.2414 5.28999C12.9374 5.18658 12.6012 5.28822 12.4054 5.54277L7.40553 12.0428C7.23133 12.2692 7.20093 12.575 7.32715 12.8314C7.45337 13.0877 7.71428 13.25 8.00001 13.25H10.2499V18C10.2499 18.3212 10.4544 18.6067 10.7584 18.7101C11.0624 18.8135 11.3986 18.7119 11.5944 18.4573L16.5944 11.9573C16.7686 11.7309 16.799 11.4251 16.6728 11.1687C16.5465 10.9124 16.2856 10.75 15.9999 10.75H13.7499V6.00005Z',
};

export const IconEnergyEllipseStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EnergyEllipse StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEnergyEllipseDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EnergyEllipse DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="c f fr o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEnergyEllipseTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EnergyEllipse TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEnergyEllipseSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EnergyEllipse SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconEnergyEllipseBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EnergyEllipse BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconEnergyEllipseStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EnergyEllipse StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEnergyEllipseSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EnergyEllipse SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfEnergyEllipse: TheIconSelfPack = [
  'EnergyEllipse',
  IconEnergyEllipseStrokeRounded,
  IconEnergyEllipseDuotoneRounded,
  IconEnergyEllipseTwotoneRounded,
  IconEnergyEllipseSolidRounded,
  IconEnergyEllipseBulkRounded,
  IconEnergyEllipseStrokeSharp,
  IconEnergyEllipseSolidSharp,
];