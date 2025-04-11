import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8.00897 9H8M16 9H15.991',
  d2: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 18C13.1046 18 14 16.8807 14 15.5C14 14.1193 13.1046 13 12 13C10.8954 13 10 14.1193 10 15.5C10 16.8807 10.8954 18 12 18Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 13.75C11.4572 13.75 10.75 14.3687 10.75 15.5C10.75 16.6313 11.4572 17.25 12 17.25C12.5428 17.25 13.25 16.6313 13.25 15.5C13.25 14.3687 12.5428 13.75 12 13.75ZM9.25 15.5C9.25 13.8699 10.3337 12.25 12 12.25C13.6663 12.25 14.75 13.8699 14.75 15.5C14.75 17.1301 13.6663 18.75 12 18.75C10.3337 18.75 9.25 17.1301 9.25 15.5ZM8 7.75C7.30964 7.75 6.75 8.30964 6.75 9C6.75 9.69036 7.30964 10.25 8 10.25H8.00897C8.69933 10.25 9.25897 9.69036 9.25897 9C9.25897 8.30964 8.69933 7.75 8.00897 7.75H8ZM15.991 7.75C15.3007 7.75 14.741 8.30964 14.741 9C14.741 9.69036 15.3007 10.25 15.991 10.25H16C16.6904 10.25 17.25 9.69036 17.25 9C17.25 8.30964 16.6904 7.75 16 7.75H15.991Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d5: 'M12 13.75C11.4572 13.75 10.75 14.3687 10.75 15.5C10.75 16.6313 11.4572 17.25 12 17.25C12.5428 17.25 13.25 16.6313 13.25 15.5C13.25 14.3687 12.5428 13.75 12 13.75ZM9.25 15.5C9.25 13.8699 10.3337 12.25 12 12.25C13.6663 12.25 14.75 13.8699 14.75 15.5C14.75 17.1301 13.6663 18.75 12 18.75C10.3337 18.75 9.25 17.1301 9.25 15.5Z',
  d6: 'M6.75 9C6.75 8.30964 7.30964 7.75 8 7.75H8.00897C8.69933 7.75 9.25897 8.30964 9.25897 9C9.25897 9.69036 8.69933 10.25 8.00897 10.25H8C7.30964 10.25 6.75 9.69036 6.75 9ZM14.741 9C14.741 8.30964 15.3007 7.75 15.991 7.75H16C16.6904 7.75 17.25 8.30964 17.25 9C17.25 9.69036 16.6904 10.25 16 10.25H15.991C15.3007 10.25 14.741 9.69036 14.741 9Z',
};

export const IconSurpriseStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Surprise StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <ellipse 
        cx="12"
        cy="15.5"
        rx="2"
        ry="2.5"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSurpriseDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Surprise DuotoneRounded"
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
      <ellipse 
        cx="12"
        cy="15.5"
        rx="2"
        ry="2.5"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSurpriseTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Surprise TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <ellipse 
        cx="12"
        cy="15.5"
        rx="2"
        ry="2.5"
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSurpriseSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Surprise SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconSurpriseBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Surprise BulkRounded"
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

export const IconSurpriseStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Surprise StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <ellipse 
        cx="12"
        cy="15.5"
        rx="2"
        ry="2.5"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSurpriseSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Surprise SolidSharp"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSurprise: TheIconSelfPack = [
  'Surprise',
  IconSurpriseStrokeRounded,
  IconSurpriseDuotoneRounded,
  IconSurpriseTwotoneRounded,
  IconSurpriseSolidRounded,
  IconSurpriseBulkRounded,
  IconSurpriseStrokeSharp,
  IconSurpriseSolidSharp,
];