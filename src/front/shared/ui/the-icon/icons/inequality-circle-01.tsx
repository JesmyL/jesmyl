import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
  d2: 'M13.9799 7.5L8.13585 12.6714C7.79985 13.08 8.12887 13.5 8.57985 13.5H15.9958',
  d3: 'M7.98047 16.5H16.0023',
  d4: 'M13.9887 7.5L8.14464 12.6714C7.80864 13.08 8.13766 13.5 8.58864 13.5H16.0046',
  d5: 'M7.98926 16.5H16.0111',
  d6: 'M13.9887 7.5L8.14464 12.6714C7.80864 13.08 8.13766 13.5 8.58864 13.5H16.0046M7.98926 16.5H16.0111',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM14.6613 7.75017C15.0756 7.38496 15.1154 6.75305 14.7502 6.33875C14.3849 5.92445 13.753 5.88465 13.3387 6.24986L7.50046 11.3963L7.48798 11.4075C6.97691 11.8735 6.88413 12.5585 7.1324 13.105C7.37441 13.6377 7.91475 14 8.5495 14H16C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12H9.84012L14.6613 7.75017ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H16C16.5523 18 17 17.5523 17 17C17 16.4477 16.5523 16 16 16H8Z',
  d8: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d9: 'M14.7502 6.33875C15.1154 6.75305 15.0756 7.38496 14.6613 7.75017L9.84012 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8.5495C7.91475 14 7.37441 13.6377 7.1324 13.105C6.88413 12.5585 6.97691 11.8735 7.48798 11.4075L7.50046 11.3963L13.3387 6.24986C13.753 5.88465 14.3849 5.92445 14.7502 6.33875ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z',
  d10: 'M8 16H16M16 13H8.00061L14 8',
  d11: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM14.6397 7.76782L10.7619 10.9996H15.9994V12.9996H8.00005C7.57904 12.9996 7.20312 12.7359 7.05979 12.3401C6.91646 11.9442 7.03641 11.501 7.35983 11.2314L13.3592 6.23145L14.6397 7.76782ZM7.05979 16.9996H15.9994V14.9996H7.05979V16.9996Z',
};

export const IconInequalityCircle01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InequalityCircle01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconInequalityCircle01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InequalityCircle01 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconInequalityCircle01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InequalityCircle01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d6}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconInequalityCircle01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InequalityCircle01 SolidRounded"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconInequalityCircle01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InequalityCircle01 BulkRounded"
    >
      <path 
        d={d.d8}
        i-c="f o7"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconInequalityCircle01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InequalityCircle01 StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconInequalityCircle01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="InequalityCircle01 SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfInequalityCircle01: TheIconSelfPack = [
  'InequalityCircle01',
  IconInequalityCircle01StrokeRounded,
  IconInequalityCircle01DuotoneRounded,
  IconInequalityCircle01TwotoneRounded,
  IconInequalityCircle01SolidRounded,
  IconInequalityCircle01BulkRounded,
  IconInequalityCircle01StrokeSharp,
  IconInequalityCircle01SolidSharp,
];