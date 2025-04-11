import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8.00897 9H8M16 9H15.991',
  d2: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM14 18C15.1046 18 16 17.1046 16 16C16 14.8954 15.1046 14 14 14C12.8954 14 12 14.8954 12 16C12 17.1046 12.8954 18 14 18Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM14 14.75C13.3096 14.75 12.75 15.3096 12.75 16C12.75 16.6904 13.3096 17.25 14 17.25C14.6904 17.25 15.25 16.6904 15.25 16C15.25 15.3096 14.6904 14.75 14 14.75ZM11.25 16C11.25 14.4812 12.4812 13.25 14 13.25C15.5188 13.25 16.75 14.4812 16.75 16C16.75 17.5188 15.5188 18.75 14 18.75C12.4812 18.75 11.25 17.5188 11.25 16ZM8 7.75C7.30964 7.75 6.75 8.30964 6.75 9C6.75 9.69036 7.30964 10.25 8 10.25H8.00897C8.69933 10.25 9.25897 9.69036 9.25897 9C9.25897 8.30964 8.69933 7.75 8.00897 7.75H8ZM15.991 7.75C15.3007 7.75 14.741 8.30964 14.741 9C14.741 9.69036 15.3007 10.25 15.991 10.25H16C16.6904 10.25 17.25 9.69036 17.25 9C17.25 8.30964 16.6904 7.75 16 7.75H15.991Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d5: 'M14 14.75C13.3096 14.75 12.75 15.3096 12.75 16C12.75 16.6904 13.3096 17.25 14 17.25C14.6904 17.25 15.25 16.6904 15.25 16C15.25 15.3096 14.6904 14.75 14 14.75ZM11.25 16C11.25 14.4812 12.4812 13.25 14 13.25C15.5188 13.25 16.75 14.4812 16.75 16C16.75 17.5188 15.5188 18.75 14 18.75C12.4812 18.75 11.25 17.5188 11.25 16Z',
  d6: 'M6.75 9C6.75 8.30964 7.30964 7.75 8 7.75H8.00897C8.69933 7.75 9.25897 8.30964 9.25897 9C9.25897 9.69036 8.69933 10.25 8.00897 10.25H8C7.30964 10.25 6.75 9.69036 6.75 9ZM14.741 9C14.741 8.30964 15.3007 7.75 15.991 7.75H16C16.6904 7.75 17.25 8.30964 17.25 9C17.25 9.69036 16.6904 10.25 16 10.25H15.991C15.3007 10.25 14.741 9.69036 14.741 9Z',
};

export const IconSingRightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SingRight StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <circle 
        cx="14"
        cy="16"
        r="2"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSingRightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SingRight DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <circle 
        cx="14"
        cy="16"
        r="2"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSingRightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SingRight TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <circle 
        cx="14"
        cy="16"
        r="2"
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSingRightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SingRight SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconSingRightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SingRight BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconSingRightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SingRight StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <circle 
        cx="14"
        cy="16"
        r="2"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSingRightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SingRight SolidSharp"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSingRight: TheIconSelfPack = [
  'SingRight',
  IconSingRightStrokeRounded,
  IconSingRightDuotoneRounded,
  IconSingRightTwotoneRounded,
  IconSingRightSolidRounded,
  IconSingRightBulkRounded,
  IconSingRightStrokeSharp,
  IconSingRightSolidSharp,
];