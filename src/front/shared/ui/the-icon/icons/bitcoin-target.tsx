import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12Z',
  d2: 'M12 2V5',
  d3: 'M22 12L19 12',
  d4: 'M12 19L12 22',
  d5: 'M5 12H2',
  d6: 'M10.4375 14.6667L10.4375 9.33333M12 9.33333V8M12 16V14.6667M10.4375 12H13.5625M13.5625 12C14.0803 12 14.5 12.4477 14.5 13V13.6667C14.5 14.219 14.0803 14.6667 13.5625 14.6667H9.5M13.5625 12C14.0803 12 14.5 11.5523 14.5 11V10.3333C14.5 9.78105 14.0803 9.33333 13.5625 9.33333H9.5',
  d7: 'M12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12C19.5 16.1421 16.1421 19.5 12 19.5ZM2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12Z',
  d8: 'M12 1C12.5523 1 13 1.44772 13 2V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V2C11 1.44772 11.4477 1 12 1Z',
  d9: 'M23 12C23 12.5523 22.5523 13 22 13L19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11L22 11C22.5523 11 23 11.4477 23 12Z',
  d10: 'M12 18C12.5523 18 13 18.4477 13 19L13 22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22L11 19C11 18.4477 11.4477 18 12 18Z',
  d11: 'M6 12C6 12.5523 5.55228 13 5 13H2C1.44772 13 1 12.5523 1 12C1 11.4477 1.44772 11 2 11H5C5.55228 11 6 11.4477 6 12Z',
  d12: 'M12 7C12.5523 7 13 7.44772 13 8V8.33333H13.5625C14.6924 8.33333 15.5 9.29054 15.5 10.3333V11C15.5 11.3547 15.4066 11.6994 15.2388 12C15.4066 12.3006 15.5 12.6453 15.5 13V13.6667C15.5 14.7095 14.6924 15.6667 13.5625 15.6667H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V15.6667H9.5C8.94772 15.6667 8.5 15.219 8.5 14.6667C8.5 14.1354 8.91433 13.7009 9.4375 13.6686L9.4375 10.3314C8.91433 10.2991 8.5 9.86463 8.5 9.33333C8.5 8.78105 8.94772 8.33333 9.5 8.33333H11V8C11 7.44772 11.4477 7 12 7ZM11.4375 10.3333V11H13.5V10.3333L11.4375 10.3333ZM11.4375 13L11.4375 13.6667H13.5V13H11.4375Z',
  d13: 'M13 1V6H11V1H13Z',
  d14: 'M23 13L18 13L18 11L23 11L23 13Z',
  d15: 'M13 18L13 23L11 23L11 18L13 18Z',
  d16: 'M6 13H1V11H6V13Z',
  d17: 'M13 7V8.33333H13.5625C14.6924 8.33333 15.5 9.29054 15.5 10.3333V11C15.5 11.3547 15.4066 11.6994 15.2388 12C15.4066 12.3006 15.5 12.6453 15.5 13V13.6667C15.5 14.7095 14.6924 15.6667 13.5625 15.6667H13V17H11V15.6667H8.5V13.6667H9.4375L9.4375 10.3333H8.5V8.33333H11V7H13ZM11.4375 10.3333V11H13.5V10.3333L11.4375 10.3333ZM11.4375 13L11.4375 13.6667H13.5V13H11.4375Z',
};

export const IconBitcoinTargetStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinTarget StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinTargetDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinTarget DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinTargetTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinTarget TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sr sw"
      />
      <path 
        d={d.d6}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinTargetSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinTarget SolidRounded"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinTargetBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinTarget BulkRounded"
    >
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinTargetStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinTarget StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s ss sw"
      />
      <path 
        d={d.d2}
        i-c="s ss sw"
      />
      <path 
        d={d.d3}
        i-c="s ss sw"
      />
      <path 
        d={d.d4}
        i-c="s ss sw"
      />
      <path 
        d={d.d5}
        i-c="s ss sw"
      />
      <path 
        d={d.d6}
        i-c="s ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinTargetSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BitcoinTarget SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d13}
        i-c="c f fr"
      />
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
      <path 
        d={d.d16}
        i-c="c f fr"
      />
      <path 
        d={d.d17}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBitcoinTarget: TheIconSelfPack = [
  'BitcoinTarget',
  IconBitcoinTargetStrokeRounded,
  IconBitcoinTargetDuotoneRounded,
  IconBitcoinTargetTwotoneRounded,
  IconBitcoinTargetSolidRounded,
  IconBitcoinTargetBulkRounded,
  IconBitcoinTargetStrokeSharp,
  IconBitcoinTargetSolidSharp,
];