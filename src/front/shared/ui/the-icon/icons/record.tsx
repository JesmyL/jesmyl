import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4',
  d2: 'M3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8325 3.25 20.75 7.16751 20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12Z',
  d3: 'M18.1869 5.8125C21.604 9.22959 21.604 14.7698 18.1869 18.1869C14.7698 21.604 9.22959 21.604 5.8125 18.1869L18.1869 5.8125Z',
};

export const IconRecordStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Record StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="8"
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRecordDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Record DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="8"
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="8"
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRecordTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Record TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="8"
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRecordSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Record SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconRecordBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Record BulkRounded"
    >
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconRecordStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Record StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="8"
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRecordSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Record SolidSharp"
    >
      <path 
        d={d.d2}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRecord: TheIconSelfPack = [
  'Record',
  IconRecordStrokeRounded,
  IconRecordDuotoneRounded,
  IconRecordTwotoneRounded,
  IconRecordSolidRounded,
  IconRecordBulkRounded,
  IconRecordStrokeSharp,
  IconRecordSolidSharp,
];