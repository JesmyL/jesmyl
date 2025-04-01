import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 10H8',
  d2: 'M2 14H8',
  d3: 'M13 6C12.0521 4.77011 10.6954 4 9.18869 4C6.32306 4 4 6.78578 4 10.2222V13.7778C4 17.2142 6.32306 20 9.18869 20C10.6954 20 12.0521 19.2299 13 18',
  d4: 'M14.5 13H22M14.5 13C14.5 13.7002 16.4943 15.0085 17 15.5M14.5 13C14.5 12.2998 16.4943 10.9915 17 10.5',
  d5: 'M3.08999 9C3.57732 5.71134 5.99674 3 9.18869 3C11.0556 3 12.6876 3.95661 13.792 5.38954C14.1292 5.82698 14.0479 6.4549 13.6105 6.79205C13.173 7.1292 12.5451 7.04789 12.208 6.61046C11.4165 5.58362 10.3352 5 9.18869 5C7.33699 5 5.56919 6.60101 5.11314 9H8C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11H5V13H8C8.55228 13 9 13.4477 9 14C9 14.5523 8.55228 15 8 15H5.11314C5.56919 17.399 7.33699 19 9.18869 19C10.3352 19 11.4165 18.4164 12.208 17.3895C12.5451 16.9521 13.173 16.8708 13.6105 17.208C14.0479 17.5451 14.1292 18.173 13.792 18.6105C12.6876 20.0434 11.0556 21 9.18869 21C5.99674 21 3.57732 18.2887 3.08999 15H2C1.44772 15 1 14.5523 1 14C1 13.4477 1.44772 13 2 13H3V11H2C1.44772 11 1 10.5523 1 10C1 9.44772 1.44772 9 2 9H3.08999Z',
  d6: 'M22 11.9941C22.5523 11.9941 23 12.4419 23 12.9941C23 13.5464 22.5523 13.9941 22 13.9941L18.5 13.9941L18.5 14.5884C18.5001 14.764 18.5003 14.9797 18.4782 15.1561L18.4778 15.1595C18.462 15.2859 18.3902 15.862 17.8246 16.1363C17.2577 16.4113 16.7576 16.1093 16.6494 16.044L16.6454 16.0416C16.4924 15.9494 16.3215 15.8152 16.1809 15.7049L16.1507 15.6812C15.7748 15.3865 15.2906 15.0046 14.8996 14.6241C14.7045 14.4343 14.5033 14.217 14.3444 13.9861C14.2032 13.7809 14 13.4307 14 13C14 12.5693 14.2032 12.2191 14.3444 12.0139C14.5033 11.783 14.7045 11.5657 14.8996 11.3759C15.2906 10.9954 15.7748 10.6135 16.1507 10.3188L16.1809 10.2951C16.3215 10.1848 16.4923 10.0506 16.6454 9.95841L16.6494 9.95597C16.7576 9.89065 17.2578 9.58872 17.8246 9.86368C18.3902 10.138 18.462 10.7141 18.4778 10.8405L18.4782 10.8439C18.5003 11.0203 18.5001 11.236 18.5 11.4116L18.5 11.9941L22 11.9941Z',
  d7: 'M1 10C1 9.44772 1.44772 9 2 9H8C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11H2C1.44772 11 1 10.5523 1 10Z',
  d8: 'M1 14C1 13.4477 1.44772 13 2 13H8C8.55228 13 9 13.4477 9 14C9 14.5523 8.55228 15 8 15H2C1.44772 15 1 14.5523 1 14Z',
  d9: 'M3 10.2222C3 6.41128 5.60837 3 9.18869 3C11.0556 3 12.6876 3.95661 13.792 5.38954C14.1292 5.82698 14.0479 6.4549 13.6105 6.79205C13.173 7.1292 12.5451 7.04789 12.208 6.61046C11.4165 5.58362 10.3352 5 9.18869 5C7.03775 5 5 7.16029 5 10.2222V13.7778C5 16.8397 7.03775 19 9.18869 19C10.3352 19 11.4165 18.4164 12.208 17.3895C12.5451 16.9521 13.173 16.8708 13.6105 17.208C14.0479 17.5451 14.1292 18.173 13.792 18.6105C12.6876 20.0434 11.0556 21 9.18869 21C5.60837 21 3 17.5887 3 13.7778V10.2222Z',
  d10: 'M22 13L14.4037 13M17 16L14 13L17 10',
  d11: 'M8 11H2V9H8V11Z',
  d12: 'M8 15H2V13H8V15Z',
  d13: 'M3 10.2222C3 6.41128 5.60837 3 9.18869 3C11.0556 3 12.6876 3.95661 13.792 5.38954L12.208 6.61046C11.4165 5.58362 10.3352 5 9.18869 5C7.03775 5 5 7.16029 5 10.2222V13.7778C5 16.8397 7.03775 19 9.18869 19C10.3352 19 11.4165 18.4164 12.208 17.3895L13.792 18.6105C12.6876 20.0434 11.0556 21 9.18869 21C5.60837 21 3 17.5887 3 13.7778V10.2222Z',
  d14: 'M16.2928 9.29297L17.707 10.7072L16.4141 12.0001L21.9999 12.0001V14.0001L16.4141 14.0001L17.707 15.293L16.2928 16.7072L12.5857 13.0001L16.2928 9.29297Z',
};

export const IconEuroReceiveStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-receive-stroke-rounded IconEuroReceiveStrokeRounded"
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

export const IconEuroReceiveDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-receive-duotone-rounded IconEuroReceiveDuotoneRounded"
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

export const IconEuroReceiveTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-receive-twotone-rounded IconEuroReceiveTwotoneRounded"
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

export const IconEuroReceiveSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-receive-solid-rounded IconEuroReceiveSolidRounded"
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

export const IconEuroReceiveBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-receive-bulk-rounded IconEuroReceiveBulkRounded"
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

export const IconEuroReceiveStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-receive-stroke-sharp IconEuroReceiveStrokeSharp"
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

export const IconEuroReceiveSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-receive-solid-sharp IconEuroReceiveSolidSharp"
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

export const iconPackOfEuroReceive: TheIconSelfPack = {
  name: 'EuroReceive',
  StrokeRounded: IconEuroReceiveStrokeRounded,
  DuotoneRounded: IconEuroReceiveDuotoneRounded,
  TwotoneRounded: IconEuroReceiveTwotoneRounded,
  SolidRounded: IconEuroReceiveSolidRounded,
  BulkRounded: IconEuroReceiveBulkRounded,
  StrokeSharp: IconEuroReceiveStrokeSharp,
  SolidSharp: IconEuroReceiveSolidSharp,
};