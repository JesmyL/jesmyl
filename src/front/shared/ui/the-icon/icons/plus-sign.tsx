import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 4V20M20 12H4',
  d2: 'M20 12H4',
  d3: 'M12 4V20',
  d4: 'M12 2.75C12.6904 2.75 13.25 3.30964 13.25 4V10.75H20C20.6904 10.75 21.25 11.3096 21.25 12C21.25 12.6904 20.6904 13.25 20 13.25H13.25V20C13.25 20.6904 12.6904 21.25 12 21.25C11.3096 21.25 10.75 20.6904 10.75 20V13.25H4C3.30964 13.25 2.75 12.6904 2.75 12C2.75 11.3096 3.30964 10.75 4 10.75H10.75V4C10.75 3.30964 11.3096 2.75 12 2.75Z',
  d5: 'M12 2.75C12.6904 2.75 13.25 3.30964 13.25 4V20C13.25 20.6904 12.6904 21.25 12 21.25C11.3096 21.25 10.75 20.6904 10.75 20V4C10.75 3.30964 11.3096 2.75 12 2.75Z',
  d6: 'M4 10.75H20C20.6904 10.75 21.25 11.3096 21.25 12C21.25 12.6904 20.6904 13.25 20 13.25H4C3.30964 13.25 2.75 12.6904 2.75 12C2.75 11.3096 3.30964 10.75 4 10.75Z',
  d7: 'M10.75 10.75V4H13.25V10.75H20V13.25H13.25V20H10.75V13.25H4V10.75H10.75Z',
};

export const IconPlusSignStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSign StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlusSignDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSign DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlusSignTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSign TwotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlusSignSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSign SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconPlusSignBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSign BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconPlusSignStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSign StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlusSignSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlusSign SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPlusSign: TheIconSelfPack = [
  'PlusSign',
  IconPlusSignStrokeRounded,
  IconPlusSignDuotoneRounded,
  IconPlusSignTwotoneRounded,
  IconPlusSignSolidRounded,
  IconPlusSignBulkRounded,
  IconPlusSignStrokeSharp,
  IconPlusSignSolidSharp,
];