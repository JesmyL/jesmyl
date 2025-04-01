import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 10H8',
  d2: 'M2 14H8',
  d3: 'M13 6C12.0521 4.77011 10.6954 4 9.18869 4C6.32306 4 4 6.78578 4 10.2222V13.7778C4 17.2142 6.32306 20 9.18869 20C10.6954 20 12.0521 19.2299 13 18',
  d4: 'M22 13H14.5M22 13C22 13.7002 20.0057 15.0085 19.5 15.5M22 13C22 12.2998 20.0057 10.9915 19.5 10.5',
  d5: 'M3.08999 9C3.57732 5.71134 5.99674 3 9.18869 3C11.0556 3 12.6876 3.95661 13.792 5.38954C14.1292 5.82698 14.0479 6.4549 13.6105 6.79205C13.173 7.1292 12.5451 7.04789 12.208 6.61046C11.4165 5.58362 10.3352 5 9.18869 5C7.33699 5 5.56919 6.60101 5.11314 9H8C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11H5V13H8C8.55228 13 9 13.4477 9 14C9 14.5523 8.55228 15 8 15H5.11314C5.56919 17.399 7.33699 19 9.18869 19C10.3352 19 11.4165 18.4164 12.208 17.3895C12.5451 16.9521 13.173 16.8708 13.6105 17.208C14.0479 17.5451 14.1292 18.173 13.792 18.6105C12.6876 20.0434 11.0556 21 9.18869 21C5.99674 21 3.57732 18.2887 3.08999 15H2C1.44772 15 1 14.5523 1 14C1 13.4477 1.44772 13 2 13H3V11H2C1.44772 11 1 10.5523 1 10C1 9.44772 1.44772 9 2 9H3.08999Z',
  d6: 'M15 11.9941C14.4477 11.9941 14 12.4419 14 12.9941C14 13.5464 14.4477 13.9941 15 13.9941L18.5 13.9941L18.5 14.5884C18.4999 14.764 18.4997 14.9797 18.5218 15.1561L18.5222 15.1595C18.538 15.2859 18.6098 15.862 19.1754 16.1363C19.7423 16.4113 20.2424 16.1093 20.3506 16.044L20.3546 16.0416C20.5076 15.9494 20.6785 15.8152 20.8191 15.7049L20.8493 15.6812C21.2252 15.3865 21.7094 15.0046 22.1004 14.6241C22.2955 14.4343 22.4967 14.217 22.6556 13.9861C22.7968 13.7809 23 13.4307 23 13C23 12.5693 22.7968 12.2191 22.6556 12.0139C22.4967 11.783 22.2955 11.5657 22.1004 11.3759C21.7094 10.9954 21.2252 10.6135 20.8493 10.3188L20.8191 10.2951C20.6785 10.1848 20.5077 10.0506 20.3546 9.95841L20.3506 9.95597C20.2424 9.89065 19.7422 9.58872 19.1754 9.86368C18.6098 10.138 18.538 10.7141 18.5222 10.8405L18.5218 10.8439C18.4997 11.0203 18.4999 11.236 18.5 11.4116L18.5 11.9941L15 11.9941Z',
  d7: 'M1 10C1 9.44772 1.44772 9 2 9H8C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11H2C1.44772 11 1 10.5523 1 10Z',
  d8: 'M1 14C1 13.4477 1.44772 13 2 13H8C8.55228 13 9 13.4477 9 14C9 14.5523 8.55228 15 8 15H2C1.44772 15 1 14.5523 1 14Z',
  d9: 'M3 10.2222C3 6.41128 5.60837 3 9.18869 3C11.0556 3 12.6876 3.95661 13.792 5.38954C14.1292 5.82698 14.0479 6.4549 13.6105 6.79205C13.173 7.1292 12.5451 7.04789 12.208 6.61046C11.4165 5.58362 10.3352 5 9.18869 5C7.03775 5 5 7.16029 5 10.2222V13.7778C5 16.8397 7.03775 19 9.18869 19C10.3352 19 11.4165 18.4164 12.208 17.3895C12.5451 16.9521 13.173 16.8708 13.6105 17.208C14.0479 17.5451 14.1292 18.173 13.792 18.6105C12.6876 20.0434 11.0556 21 9.18869 21C5.60837 21 3 17.5887 3 13.7778V10.2222Z',
  d10: 'M14 13L21.5121 13M19 16L22 13L19 10',
  d11: 'M7.75 11H1.75V9H7.75V11Z',
  d12: 'M7.75 15H1.75V13H7.75V15Z',
  d13: 'M2.75 10.2222C2.75 6.41128 5.35837 3 8.93869 3C10.8056 3 12.4376 3.95661 13.542 5.38954L11.958 6.61046C11.1665 5.58362 10.0852 5 8.93869 5C6.78775 5 4.75 7.16029 4.75 10.2222V13.7778C4.75 16.8397 6.78775 19 8.93869 19C10.0852 19 11.1665 18.4164 11.958 17.3895L13.542 18.6105C12.4376 20.0434 10.8056 21 8.93869 21C5.35837 21 2.75 17.5887 2.75 13.7778V10.2222Z',
  d14: 'M18.4215 12.0001L17.1286 10.7072L18.5428 9.29297L22.2499 13.0001L18.5428 16.7072L17.1286 15.293L18.4215 14.0001L12.8357 14.0001V12.0001L18.4215 12.0001Z',
};

export const IconEuroSendStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-send-stroke-rounded IconEuroSendStrokeRounded"
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
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEuroSendDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-send-duotone-rounded IconEuroSendDuotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEuroSendTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-send-twotone-rounded IconEuroSendTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEuroSendSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-send-solid-rounded IconEuroSendSolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconEuroSendBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-send-bulk-rounded IconEuroSendBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
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

export const IconEuroSendStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-send-stroke-sharp IconEuroSendStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconEuroSendSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-send-solid-sharp IconEuroSendSolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfEuroSend: TheIconSelfPack = {
  name: 'EuroSend',
  StrokeRounded: IconEuroSendStrokeRounded,
  DuotoneRounded: IconEuroSendDuotoneRounded,
  TwotoneRounded: IconEuroSendTwotoneRounded,
  SolidRounded: IconEuroSendSolidRounded,
  BulkRounded: IconEuroSendBulkRounded,
  StrokeSharp: IconEuroSendStrokeSharp,
  SolidSharp: IconEuroSendSolidSharp,
};