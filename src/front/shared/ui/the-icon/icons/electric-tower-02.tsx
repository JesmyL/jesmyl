import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 2H9V7H15V2Z',
  d2: 'M19.5 22H4.5L9 7H15L19.5 22Z',
  d3: 'M2 22H22',
  d4: 'M3 7H21M3 7V9M3 7L9 2M21 7V9M21 7L15 2',
  d5: 'M15.5 9.5L7 14.5L18.5 20',
  d6: 'M8.5 9.5L17 14.5L5.5 20',
  d7: 'M5.5 20L7 14.5L8.5 9.5L12 11.5588L7 14.5L12 16.8913L5.5 20Z',
  d8: 'M15.5 9.5L17 14.5L18.5 20L12 16.8913L17 14.5L12 11.5588L15.5 9.5Z',
  d9: 'M15.5 9.5L7 14.5L18.5 20M8.5 9.5L17 14.5L5.5 20',
  d10: 'M8.25 2C8.25 1.58579 8.58579 1.25 9 1.25H15C15.4142 1.25 15.75 1.58579 15.75 2V7C15.75 7.41421 15.4142 7.75 15 7.75H9C8.58579 7.75 8.25 7.41421 8.25 7V2ZM9.75 2.75V6.25H14.25V2.75H9.75Z',
  d11: 'M3.89829 22.4477C4.03981 22.6379 4.26293 22.75 4.50001 22.75H19.5C19.7371 22.75 19.9602 22.6379 20.1017 22.4477C20.2432 22.2575 20.2865 22.0116 20.2184 21.7845L15.7184 6.78449C15.6232 6.46725 15.3312 6.25 15 6.25H9.00001C8.6688 6.25 8.37681 6.46725 8.28164 6.78449L3.78164 21.7845C3.71351 22.0116 3.75677 22.2575 3.89829 22.4477ZM5.50803 21.25L9.55803 7.75H14.442L18.492 21.25H5.50803Z',
  d12: 'M1.25 22C1.25 21.5858 1.58579 21.25 2 21.25H22C22.4142 21.25 22.75 21.5858 22.75 22C22.75 22.4142 22.4142 22.75 22 22.75H2C1.58579 22.75 1.25 22.4142 1.25 22Z',
  d13: 'M9.57617 1.51988C9.84134 1.83809 9.79835 2.31101 9.48014 2.57618L5.07154 6.25002H18.9285L14.5199 2.57618C14.2017 2.31101 14.1587 1.83809 14.4238 1.51988C14.689 1.20167 15.1619 1.15868 15.4801 1.42385L21.4801 6.42385C21.6511 6.56635 21.75 6.77743 21.75 7.00002V9.00002C21.75 9.41423 21.4142 9.75002 21 9.75002C20.5858 9.75002 20.25 9.41423 20.25 9.00002V7.75002H3.75V9.00002C3.75 9.41423 3.41421 9.75002 3 9.75002C2.58579 9.75002 2.25 9.41423 2.25 9.00002V7.00002C2.25 6.77743 2.34887 6.56635 2.51986 6.42385L8.51986 1.42385C8.83807 1.15868 9.31099 1.20167 9.57617 1.51988Z',
  d14: 'M16.1463 9.11985C15.9363 8.76283 15.4766 8.64365 15.1196 8.85367L6.61956 13.8537C6.38058 13.9942 6.23865 14.2552 6.25051 14.5322C6.26238 14.8092 6.4261 15.0571 6.67624 15.1767L18.1762 20.6767C18.5499 20.8554 18.9977 20.6974 19.1764 20.3237C19.3551 19.95 19.1971 19.5022 18.8234 19.3235L8.59523 14.4318L15.8801 10.1466C16.2371 9.93656 16.3563 9.47688 16.1463 9.11985Z',
  d15: 'M7.85372 9.11985C8.06374 8.76283 8.52341 8.64365 8.88044 8.85367L17.3804 13.8537C17.6194 13.9942 17.7614 14.2552 17.7495 14.5322C17.7376 14.8092 17.5739 15.0571 17.3238 15.1767L5.82377 20.6767C5.45009 20.8554 5.00229 20.6974 4.82357 20.3237C4.64486 19.95 4.80291 19.5022 5.17658 19.3235L15.4048 14.4318L8.11991 10.1466C7.76288 9.93656 7.64371 9.47688 7.85372 9.11985Z',
  d16: 'M8.88044 8.85367C8.52341 8.64365 8.06374 8.76283 7.85372 9.11985C7.64371 9.47688 7.76288 9.93656 8.11991 10.1466L10.5208 11.5588L6.61956 13.8537C6.38058 13.9942 6.23865 14.2552 6.25051 14.5322C6.26238 14.8092 6.4261 15.0571 6.67624 15.1767L10.2617 16.8915L5.17658 19.3235C4.80291 19.5022 4.64486 19.95 4.82357 20.3237C5.00229 20.6974 5.45009 20.8554 5.82377 20.6767L12 17.7229L18.1762 20.6767C18.5499 20.8554 18.9977 20.6974 19.1764 20.3237C19.3551 19.95 19.1971 19.5022 18.8234 19.3235L13.7383 16.8915L17.3238 15.1767C17.5739 15.0571 17.7376 14.8092 17.7495 14.5322C17.7614 14.2552 17.6194 13.9942 17.3804 13.8537L13.4792 11.5588L15.8801 10.1466C16.2371 9.93656 16.3563 9.47688 16.1463 9.11985C15.9363 8.76283 15.4766 8.64365 15.1196 8.85367L12 10.6887L8.88044 8.85367ZM12 12.429L15.4048 14.4318L12 16.0601L8.59523 14.4318L12 12.429Z',
  d17: 'M21 9V7L15 2H9L3 7V9M15 2.50944V7H9V2.59647M20.4274 7H3.557',
  d18: 'M3.49219 22.75H20.5082L15.5582 6.25H8.44219L3.49219 22.75ZM5.50823 21.25L9.55823 7.75H14.4422L18.4922 21.25H5.50823Z',
  d19: 'M1.25 21.25H22.75V22.75H1.25V21.25Z',
  d20: 'M8.72846 1.25H15.2715L21.75 6.64872V9.75H20.25V7.75H3.75V9.75H2.25V6.64872L8.72846 1.25ZM5.07154 6.25H8.25V3.60128L5.07154 6.25ZM9.75 2.75V6.25H14.25V2.75H9.75ZM15.75 3.60128L18.9285 6.25H15.75V3.60128Z',
  d21: 'M15.766 8.47339L6.61954 13.8537C6.38056 13.9942 6.23863 14.2552 6.25049 14.5322C6.26236 14.8092 6.42609 15.0571 6.67622 15.1767L18.8528 21.0003L19.5 19.6471L8.59522 14.4318L16.5265 9.76629L15.766 8.47339Z',
  d22: 'M8.23401 8.47339L17.3805 13.8537C17.6194 13.9942 17.7614 14.2552 17.7495 14.5322C17.7376 14.8092 17.5739 15.0571 17.3238 15.1767L5.14718 21.0003L4.5 19.6471L15.4048 14.4318L7.47348 9.76629L8.23401 8.47339Z',
};

export const IconElectricTower02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="electric-tower-02-stroke-rounded IconElectricTower02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconElectricTower02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="electric-tower-02-duotone-rounded IconElectricTower02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconElectricTower02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="electric-tower-02-twotone-rounded IconElectricTower02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconElectricTower02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="electric-tower-02-solid-rounded IconElectricTower02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconElectricTower02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="electric-tower-02-bulk-rounded IconElectricTower02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconElectricTower02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="electric-tower-02-stroke-sharp IconElectricTower02StrokeSharp"
    >
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconElectricTower02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="electric-tower-02-solid-sharp IconElectricTower02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfElectricTower02: TheIconSelfPack = {
  name: 'ElectricTower02',
  StrokeRounded: IconElectricTower02StrokeRounded,
  DuotoneRounded: IconElectricTower02DuotoneRounded,
  TwotoneRounded: IconElectricTower02TwotoneRounded,
  SolidRounded: IconElectricTower02SolidRounded,
  BulkRounded: IconElectricTower02BulkRounded,
  StrokeSharp: IconElectricTower02StrokeSharp,
  SolidSharp: IconElectricTower02SolidSharp,
};