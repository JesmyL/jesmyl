import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 5.7V18.3C4 19.7912 5.3432 21 7.00012 21C8.65705 21 10.0002 19.7912 10.0002 18.3L10.0008 14.0117L14.5421 19.8484C15.4924 21.0699 17.3631 21.3668 18.7204 20.5115C20.0777 19.6562 20.4075 17.9726 19.4572 16.7511L15.7606 12L19.4572 7.24889C20.4075 6.02739 20.0777 4.34382 18.7204 3.48852C17.3631 2.63322 15.4924 2.93008 14.5421 4.15157L10.0008 9.98832L10.0002 5.7C10.0002 4.20883 8.65705 3 7.00012 3C5.3432 3 4 4.20883 4 5.7Z',
  d2: 'M10.0008 14.0117L10.0002 18.3C10.0002 19.7912 8.65705 21 7.00012 21C5.3432 21 4 19.7912 4 18.3V5.7C4 4.20883 5.3432 3 7.00012 3C8.65705 3 10.0002 4.20883 10.0002 5.7L10.0008 9.98832',
  d3: 'M3.25 5.7C3.25 3.72221 5.0053 2.25 7.00012 2.25C8.99495 2.25 10.7502 3.72222 10.7502 5.7V7.80375L13.9501 3.69102C15.1506 2.14808 17.4556 1.80496 19.1203 2.854C20.8275 3.92985 21.2898 6.11482 20.0491 7.70944L16.7109 12L20.0491 16.2906C21.2898 17.8852 20.8275 20.0702 19.1203 21.146C17.4556 22.195 15.1506 21.8519 13.9501 20.309L10.7502 16.1962V18.3C10.7502 20.2778 8.99495 21.75 7.00012 21.75C5.0053 21.75 3.25 20.2778 3.25 18.3V5.7Z',
  d4: 'M3.25 5.7C3.25 3.72221 5.0053 2.25 7.00012 2.25C8.99495 2.25 10.7502 3.72222 10.7502 5.7V18.3C10.7502 20.2778 8.99495 21.75 7.00012 21.75C5.0053 21.75 3.25 20.2778 3.25 18.3V5.7Z',
  d5: 'M4.00159 20.99V3.00999C4.00159 3.00447 4.00606 3 4.01158 3H10.0344C10.04 3 10.0445 3.00459 10.0444 3.01018L9.9078 10.0172C9.90762 10.0266 9.91922 10.031 9.92535 10.024L16.0126 3.00758C16.0162 3.0034 16.0226 3.00296 16.0267 3.0066L19.9949 6.47053C19.999 6.47409 19.9995 6.48025 19.996 6.48442L15.4698 11.9431L19.9962 17.4705C19.9995 17.4746 19.9991 17.4807 19.9951 17.4842L16.0497 20.9932C16.0455 20.997 16.0391 20.9965 16.0354 20.9923L10.0622 14.0448C10.0561 14.0378 10.0446 14.042 10.0446 14.0513V20.99C10.0446 20.9955 10.0401 21 10.0346 21H4.01158C4.00606 21 4.00159 20.9955 4.00159 20.99Z',
  d6: 'M15.5 12L20 6.5L16 3L10.0008 9.98832L10.0002 3H4V21H10.0002L10.0008 14.0117L16 21L20 17.5L15.5 12Z',
};

export const IconKickstarter01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Kickstarter01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconKickstarter01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Kickstarter01 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconKickstarter01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Kickstarter01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconKickstarter01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Kickstarter01 SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconKickstarter01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Kickstarter01 BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconKickstarter01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Kickstarter01 StrokeSharp"
    >
      <path 
        d={d.d5}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconKickstarter01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Kickstarter01 SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfKickstarter01: TheIconSelfPack = [
  'Kickstarter01',
  IconKickstarter01StrokeRounded,
  IconKickstarter01DuotoneRounded,
  IconKickstarter01TwotoneRounded,
  IconKickstarter01SolidRounded,
  IconKickstarter01BulkRounded,
  IconKickstarter01StrokeSharp,
  IconKickstarter01SolidSharp,
];