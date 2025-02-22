import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 8L19 5M19 5L16 2M19 5L16 8M19 5L22 2',
  d2: 'M9 10.0294C10.3726 8.65685 12.598 8.65685 13.9706 10.0294C15.3431 11.402 15.3431 13.6274 13.9706 15',
  d3: 'M4.85289 19.1471C8.04869 22.3429 12.9127 22.8538 16.6418 20.6797C17.5285 20.1627 17.9719 19.9043 17.999 19.3782C18.0261 18.8522 17.5277 18.4882 16.531 17.7603C14.683 16.4107 12.8636 14.7603 11.0516 12.9484C9.23967 11.1364 7.58927 9.31705 6.23969 7.46904C5.51179 6.47231 5.14784 5.97395 4.62178 6.00105C4.09572 6.02815 3.83725 6.47149 3.32031 7.35818C1.14624 11.0873 1.6571 15.9513 4.85289 19.1471Z',
  d4: 'M13.9706 10.0294C12.598 8.65685 10.3726 8.65685 9 10.0294L13.9706 15C15.3431 13.6274 15.3431 11.402 13.9706 10.0294Z',
  d5: 'M13.2635 10.7365C12.2815 9.75449 10.6892 9.75449 9.70718 10.7365L8.29297 9.32233C10.0561 7.55922 12.9146 7.55922 14.6777 9.32233C16.4409 11.0854 16.4409 13.944 14.6777 15.7071L13.2635 14.2929C14.2456 13.3108 14.2456 11.7186 13.2635 10.7365Z',
  d6: 'M6.81182 6.98094C6.82294 6.99616 6.83409 7.01144 6.84528 7.02676C8.16328 8.83152 9.78421 10.6204 11.5819 12.4181C13.3795 14.2157 15.1684 15.8367 16.9732 17.1547L17.019 17.1881C17.4779 17.5232 17.8928 17.8261 18.1812 18.1168C18.4993 18.4374 18.7768 18.8544 18.7479 19.4168C18.721 19.9388 18.4657 20.3117 18.1337 20.5993C17.8548 20.8409 17.4693 21.0655 17.0696 21.2984C17.0529 21.3082 17.0362 21.3179 17.0195 21.3277C13.0034 23.669 7.76507 23.1201 4.32247 19.6775C0.87986 16.2349 0.330924 10.9966 2.67229 6.98048C2.68205 6.96374 2.69179 6.94703 2.70151 6.93034C2.93442 6.5306 3.159 6.14515 3.40069 5.8662C3.6883 5.53424 4.06113 5.27897 4.5831 5.25208C5.14551 5.22311 5.56255 5.50061 5.88319 5.81874C6.17385 6.10712 6.47678 6.52205 6.81182 6.98094Z',
  d7: 'M15.2929 1.29289C15.6834 0.902369 16.3166 0.902369 16.7071 1.29289L19 3.58579L21.2929 1.29289C21.6834 0.902369 22.3166 0.902369 22.7071 1.29289C23.0976 1.68342 23.0976 2.31658 22.7071 2.70711L20.4142 5L22.7071 7.29289C23.0976 7.68342 23.0976 8.31658 22.7071 8.70711C22.3166 9.09763 21.6834 9.09763 21.2929 8.70711L19 6.41421L16.7071 8.70711C16.3166 9.09763 15.6834 9.09763 15.2929 8.70711C14.9024 8.31658 14.9024 7.68342 15.2929 7.29289L17.5858 5L15.2929 2.70711C14.9024 2.31658 14.9024 1.68342 15.2929 1.29289Z',
  d8: 'M2 12.3699C2 17.6885 6.31155 22 11.6301 22C14.0724 22 16.3024 21.0908 18 19.5925L4.40753 6C2.90917 7.69763 2 9.92759 2 12.3699Z',
  d9: 'M20.4573 4.95711L22.7502 2.66421L21.3359 1.25L19.043 3.54289L16.7502 1.25L15.3359 2.66421L17.6288 4.95711L15.3359 7.25L16.7502 8.66421L19.043 6.37132L21.3359 8.66421L22.7502 7.25L20.4573 4.95711Z',
  d10: 'M19.0948 19.6266L18.4963 20.1548C16.6669 21.7695 14.2621 22.75 11.6301 22.75C5.89733 22.75 1.25 18.1027 1.25 12.3699C1.25 9.73792 2.23057 7.33312 3.84522 5.50373L4.37343 4.90527L19.0948 19.6266Z',
};

export const IconGpsDisconnectedStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gps-disconnected-stroke-rounded IconGpsDisconnectedStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGpsDisconnectedDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gps-disconnected-duotone-rounded IconGpsDisconnectedDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGpsDisconnectedTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gps-disconnected-twotone-rounded IconGpsDisconnectedTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGpsDisconnectedSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gps-disconnected-solid-rounded IconGpsDisconnectedSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGpsDisconnectedBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gps-disconnected-bulk-rounded IconGpsDisconnectedBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGpsDisconnectedStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gps-disconnected-stroke-sharp IconGpsDisconnectedStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconGpsDisconnectedSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="gps-disconnected-solid-sharp IconGpsDisconnectedSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGpsDisconnected: TheIconSelfPack = {
  name: 'GpsDisconnected',
  StrokeRounded: IconGpsDisconnectedStrokeRounded,
  DuotoneRounded: IconGpsDisconnectedDuotoneRounded,
  TwotoneRounded: IconGpsDisconnectedTwotoneRounded,
  SolidRounded: IconGpsDisconnectedSolidRounded,
  BulkRounded: IconGpsDisconnectedBulkRounded,
  StrokeSharp: IconGpsDisconnectedStrokeSharp,
  SolidSharp: IconGpsDisconnectedSolidSharp,
};