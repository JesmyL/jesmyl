import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z',
  d2: 'M12.2422 17V13C12.2422 12.5286 12.2422 12.2929 12.0957 12.1464C11.9493 12 11.7136 12 11.2422 12',
  d3: 'M11.992 8.99997H12.001',
  d4: 'M5.32171 9.6829C7.73538 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z',
  d5: 'M10.362 2.015C11.4264 1.66167 12.5736 1.66167 13.638 2.015C14.6981 2.36687 15.5304 3.20141 16.3665 4.37395C17.1999 5.5426 18.1208 7.17206 19.3078 9.2725L19.3544 9.35496C20.5417 11.4557 21.4625 13.0851 22.0364 14.4065C22.613 15.7343 22.9002 16.8807 22.6711 17.9821C22.4403 19.0911 21.8714 20.0995 21.0428 20.8617C20.2162 21.622 19.0907 21.9428 17.6736 22.0968C16.2645 22.25 14.4212 22.25 12.0488 22.25H11.9513C9.57882 22.25 7.73554 22.25 6.32642 22.0968C4.90927 21.9428 3.78379 21.622 2.95722 20.8617C2.12862 20.0995 1.55968 19.0911 1.32895 17.9821C1.0998 16.8807 1.387 15.7343 1.96365 14.4065C2.53752 13.0851 3.45835 11.4557 4.64558 9.35495L4.69218 9.2725L4.69218 9.27249C5.87921 7.17206 6.80008 5.5426 7.63347 4.37395C8.46963 3.20141 9.30194 2.36687 10.362 2.015ZM11.6819 11.0273C11.9289 11.0605 12.2707 11.1494 12.5607 11.4394C12.8507 11.7294 12.9396 12.0711 12.9728 12.3182C13.0003 12.5228 13.0001 12.7608 13 12.9606L13 13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L11.0394 11C11.2393 10.9999 11.4772 10.9997 11.6819 11.0273ZM11.9954 7C11.4456 7 10.9999 7.44772 10.9999 8C10.9999 8.55228 11.4456 9 11.9954 9H12.0044C12.5542 9 12.9999 8.55228 12.9999 8C12.9999 7.44772 12.5542 7 12.0044 7H11.9954Z',
  d6: 'M10.362 2.015C11.4264 1.66167 12.5736 1.66167 13.638 2.015C14.6981 2.36687 15.5304 3.20141 16.3665 4.37395C17.1999 5.5426 18.1208 7.17206 19.3078 9.2725L19.3544 9.35496C20.5417 11.4557 21.4625 13.0851 22.0364 14.4065C22.613 15.7343 22.9002 16.8807 22.6711 17.9821C22.4403 19.0911 21.8714 20.0995 21.0428 20.8617C20.2162 21.622 19.0907 21.9428 17.6736 22.0968C16.2645 22.25 14.4212 22.25 12.0488 22.25H11.9513C9.57882 22.25 7.73554 22.25 6.32642 22.0968C4.90927 21.9428 3.78379 21.622 2.95722 20.8617C2.12862 20.0995 1.55968 19.0911 1.32895 17.9821C1.0998 16.8807 1.387 15.7343 1.96365 14.4065C2.53752 13.0851 3.45835 11.4557 4.64558 9.35495L4.69218 9.2725L4.69218 9.27249C5.87921 7.17206 6.80008 5.5426 7.63347 4.37395C8.46963 3.20141 9.30194 2.36687 10.362 2.015Z',
  d7: 'M11.6819 11.0273C11.9289 11.0605 12.2707 11.1494 12.5607 11.4394C12.8507 11.7294 12.9396 12.0711 12.9728 12.3182C13.0003 12.5228 13.0001 12.7608 13 12.9606C13 12.974 13 12.9871 13 13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11C11.0129 11 11.0261 11 11.0394 11C11.2393 10.9999 11.4772 10.9997 11.6819 11.0273Z',
  d8: 'M10.9999 8C10.9999 7.44772 11.4456 7 11.9954 7H12.0044C12.5542 7 12.9999 7.44772 12.9999 8C12.9999 8.55228 12.5542 9 12.0044 9H11.9954C11.4456 9 10.9999 8.55228 10.9999 8Z',
  d9: 'M22 21L12 3L2 21H22Z',
  d10: 'M12 18.5V13.5H10M12 10V11.5',
  d11: 'M12.6556 2.63577C12.5233 2.39767 12.2724 2.25 12 2.25C11.7276 2.25 11.4767 2.39767 11.3444 2.63577L1.34438 20.6358C1.21533 20.8681 1.21883 21.1513 1.3536 21.3803C1.48836 21.6094 1.73426 21.75 2 21.75H22C22.2657 21.75 22.5116 21.6094 22.6464 21.3803C22.7812 21.1513 22.7847 20.8681 22.6556 20.6358L12.6556 2.63577ZM11.25 10V11.5H12.75V10H11.25ZM10 14.25H11.25V18.5H12.75V12.75H10V14.25Z',
};

export const IconAlert01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-01-stroke-rounded IconAlert01StrokeRounded"
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

export const IconAlert01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-01-duotone-rounded IconAlert01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconAlert01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-01-twotone-rounded IconAlert01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconAlert01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-01-solid-rounded IconAlert01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAlert01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-01-bulk-rounded IconAlert01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAlert01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-01-stroke-sharp IconAlert01StrokeSharp"
    >
      <path 
        d={d.d9} 
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

export const IconAlert01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-01-solid-sharp IconAlert01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAlert01: TheIconSelfPack = {
  name: 'Alert01',
  StrokeRounded: IconAlert01StrokeRounded,
  DuotoneRounded: IconAlert01DuotoneRounded,
  TwotoneRounded: IconAlert01TwotoneRounded,
  SolidRounded: IconAlert01SolidRounded,
  BulkRounded: IconAlert01BulkRounded,
  StrokeSharp: IconAlert01StrokeSharp,
  SolidSharp: IconAlert01SolidSharp,
};