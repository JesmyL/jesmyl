import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 15C7 13.5949 7.70031 13 9 13H15C16.2997 13 17 13.5949 17 15C17 16.4051 16.2997 17 15 17H9C7.70031 17 7 16.4051 7 15Z',
  d2: 'M8.00897 9L8 9M16 9L15.991 9',
  d3: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9 13C7.70031 13 7 13.5949 7 15C7 16.4051 7.70031 17 9 17H15C16.2997 17 17 16.4051 17 15C17 13.5949 16.2997 13 15 13H9Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM7 15C7 13.5949 7.70031 13 9 13H15C16.2997 13 17 13.5949 17 15C17 16.4051 16.2997 17 15 17H9C7.70031 17 7 16.4051 7 15ZM8 7.75C7.30964 7.75 6.75 8.30964 6.75 9C6.75 9.69036 7.30964 10.25 8 10.25H8.00897C8.69933 10.25 9.25897 9.69036 9.25897 9C9.25897 8.30964 8.69933 7.75 8.00897 7.75H8ZM15.991 7.75C15.3007 7.75 14.741 8.30964 14.741 9C14.741 9.69036 15.3007 10.25 15.991 10.25H16C16.6904 10.25 17.25 9.69036 17.25 9C17.25 8.30964 16.6904 7.75 16 7.75H15.991Z',
  d5: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d6: 'M6.75 9C6.75 8.30964 7.30964 7.75 8 7.75L8.00897 7.75C8.69933 7.75 9.25897 8.30964 9.25897 9C9.25897 9.69036 8.69933 10.25 8.00897 10.25L8 10.25C7.30964 10.25 6.75 9.69036 6.75 9ZM14.741 9C14.741 8.30964 15.3007 7.75 15.991 7.75L16 7.75C16.6904 7.75 17.25 8.30964 17.25 9C17.25 9.69036 16.6904 10.25 16 10.25L15.991 10.25C15.3007 10.25 14.741 9.69036 14.741 9Z',
  d7: 'M14 13H10C8.89543 13 8 13.8954 8 15C8 16.1046 8.89543 17 10 17H14C15.1046 17 16 16.1046 16 15C16 13.8954 15.1046 13 14 13Z',
  d8: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM6.75 9C6.75 8.30964 7.30964 7.75 8 7.75H8.00897C8.69933 7.75 9.25897 8.30964 9.25897 9C9.25897 9.69036 8.69933 10.25 8.00897 10.25H8C7.30964 10.25 6.75 9.69036 6.75 9ZM14.741 9C14.741 8.30964 15.3007 7.75 15.991 7.75H16C16.6904 7.75 17.25 8.30964 17.25 9C17.25 9.69036 16.6904 10.25 16 10.25H15.991C15.3007 10.25 14.741 9.69036 14.741 9ZM8 15C8 13.8954 8.89543 13 10 13H14C15.1046 13 16 13.8954 16 15C16 16.1046 15.1046 17 14 17H10C8.89543 17 8 16.1046 8 15Z',
};

export const IconGrimacingStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grimacing StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGrimacingDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grimacing DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGrimacingTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grimacing TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGrimacingSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grimacing SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconGrimacingBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grimacing BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconGrimacingStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grimacing StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGrimacingSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Grimacing SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGrimacing: TheIconSelfPack = [
  'Grimacing',
  IconGrimacingStrokeRounded,
  IconGrimacingDuotoneRounded,
  IconGrimacingTwotoneRounded,
  IconGrimacingSolidRounded,
  IconGrimacingBulkRounded,
  IconGrimacingStrokeSharp,
  IconGrimacingSolidSharp,
];