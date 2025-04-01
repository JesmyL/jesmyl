import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.5 5L17.5 19',
  d2: 'M2.5 13.5L6 17L6.73256 16.2326M16.5 6L12.593 10.093',
  d3: 'M7.5 13.5L11 17L13.1977 14.6977M21.5 6L15.1512 12.6512',
  d4: 'M2.79289 4.29289C3.18342 3.90237 3.81658 3.90237 4.20711 4.29289L18.2071 18.2929C18.5976 18.6834 18.5976 19.3166 18.2071 19.7071C17.8166 20.0976 17.1834 20.0976 16.7929 19.7071L2.79289 5.70711C2.40237 5.31658 2.40237 4.68342 2.79289 4.29289Z',
  d5: 'M17.1905 5.27665C17.59 5.65799 17.6047 6.29098 17.2234 6.69048L13.7234 10.3571C13.342 10.7566 12.709 10.7714 12.3095 10.39C11.91 10.0087 11.8953 9.37569 12.2766 8.97619L15.7766 5.30953C16.158 4.91003 16.791 4.89531 17.1905 5.27665ZM1.79289 12.7929C2.18342 12.4024 2.81658 12.4024 3.20711 12.7929L6.70711 16.2929C7.09763 16.6834 7.09763 17.3166 6.70711 17.7071C6.31658 18.0976 5.68342 18.0976 5.29289 17.7071L1.79289 14.2071C1.40237 13.8166 1.40237 13.1834 1.79289 12.7929Z',
  d6: 'M22.1905 5.27665C22.59 5.65799 22.6047 6.29098 22.2234 6.69048L16.2234 12.9762C15.842 13.3757 15.209 13.3904 14.8095 13.0091C14.41 12.6277 14.3953 11.9947 14.7766 11.5952L20.7766 5.30953C21.158 4.91003 21.791 4.89531 22.1905 5.27665ZM6.79289 12.7929C7.18342 12.4024 7.81658 12.4024 8.20711 12.7929L10.9834 15.5692L12.4743 14.0072C12.8557 13.6077 13.4887 13.593 13.8882 13.9743C14.2876 14.3557 14.3024 14.9887 13.921 15.3882L11.7234 17.6905C11.5374 17.8852 11.2809 17.9968 11.0116 17.9999C10.7424 18.0031 10.4833 17.8975 10.2929 17.7071L6.79289 14.2071C6.40237 13.8166 6.40237 13.1834 6.79289 12.7929Z',
  d7: 'M3.66421 3.5L19.25 19.0858L17.8358 20.5L2.25 4.91421L3.66421 3.5Z',
  d8: 'M13.1971 10.9943L11.7504 9.61338L16.25 5L17.75 6.5L13.1971 10.9943Z',
  d9: 'M1.25 13.4138L2.66421 11.9996L7.25038 16.5858L5.83617 18L1.25 13.4138Z',
  d10: 'M15.6963 13.6134L14.2496 12.2324L21.25 5L22.7492 6.5L15.6963 13.6134Z',
  d11: 'M13.329 13.353L14.7757 14.7339L11.1808 18.5L6.25 13.5692L7.66421 12.1549L11.1476 15.6383L13.329 13.353Z',
};

export const IconCheckUnread04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-04-stroke-rounded IconCheckUnread04StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconCheckUnread04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-04-duotone-rounded IconCheckUnread04DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconCheckUnread04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-04-twotone-rounded IconCheckUnread04TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCheckUnread04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-04-solid-rounded IconCheckUnread04SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconCheckUnread04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-04-bulk-rounded IconCheckUnread04BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCheckUnread04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-04-stroke-sharp IconCheckUnread04StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
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
    </TheIconWrapper>
  );
};

export const IconCheckUnread04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-04-solid-sharp IconCheckUnread04SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCheckUnread04: TheIconSelfPack = {
  name: 'CheckUnread04',
  StrokeRounded: IconCheckUnread04StrokeRounded,
  DuotoneRounded: IconCheckUnread04DuotoneRounded,
  TwotoneRounded: IconCheckUnread04TwotoneRounded,
  SolidRounded: IconCheckUnread04SolidRounded,
  BulkRounded: IconCheckUnread04BulkRounded,
  StrokeSharp: IconCheckUnread04StrokeSharp,
  SolidSharp: IconCheckUnread04SolidSharp,
};