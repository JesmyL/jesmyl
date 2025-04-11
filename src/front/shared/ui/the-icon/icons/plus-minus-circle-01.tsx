import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 7.5V13.8636M15.5 10.6818H8.5M15.5 16.5H8.5',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V9.18182H8.5C7.94772 9.18182 7.5 9.62953 7.5 10.1818C7.5 10.7341 7.94772 11.1818 8.5 11.1818H11V13.3636C11 13.9159 11.4477 14.3636 12 14.3636C12.5523 14.3636 13 13.9159 13 13.3636V11.1818H15.5C16.0523 11.1818 16.5 10.7341 16.5 10.1818C16.5 9.62953 16.0523 9.18182 15.5 9.18182H13V7ZM8.5 16C7.94772 16 7.5 16.4477 7.5 17C7.5 17.5523 7.94772 18 8.5 18H15.5C16.0523 18 16.5 17.5523 16.5 17C16.5 16.4477 16.0523 16 15.5 16H8.5Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M12 6C12.5523 6 13 6.44772 13 7V9.18182H15.5C16.0523 9.18182 16.5 9.62953 16.5 10.1818C16.5 10.7341 16.0523 11.1818 15.5 11.1818H13V13.3636C13 13.9159 12.5523 14.3636 12 14.3636C11.4477 14.3636 11 13.9159 11 13.3636V11.1818H8.5C7.94772 11.1818 7.5 10.7341 7.5 10.1818C7.5 9.62953 7.94772 9.18182 8.5 9.18182H11V7C11 6.44772 11.4477 6 12 6ZM7.5 17C7.5 16.4477 7.94772 16 8.5 16H15.5C16.0523 16 16.5 16.4477 16.5 17C16.5 17.5523 16.0523 18 15.5 18H8.5C7.94772 18 7.5 17.5523 7.5 17Z',
  d5: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM11 7V9.18182H8.5V11.1818H11V13.3636H13V11.1818H15.5V9.18182H13V7H11ZM15.5 17V15H8.5V17H15.5Z',
};

export const IconPlusMinusCircle01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinusCircle01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlusMinusCircle01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinusCircle01 DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlusMinusCircle01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinusCircle01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlusMinusCircle01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinusCircle01 SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconPlusMinusCircle01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinusCircle01 BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconPlusMinusCircle01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinusCircle01 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlusMinusCircle01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusMinusCircle01 SolidSharp"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPlusMinusCircle01: TheIconSelfPack = [
  'PlusMinusCircle01',
  IconPlusMinusCircle01StrokeRounded,
  IconPlusMinusCircle01DuotoneRounded,
  IconPlusMinusCircle01TwotoneRounded,
  IconPlusMinusCircle01SolidRounded,
  IconPlusMinusCircle01BulkRounded,
  IconPlusMinusCircle01StrokeSharp,
  IconPlusMinusCircle01SolidSharp,
];