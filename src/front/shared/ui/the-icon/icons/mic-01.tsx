import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z',
  d2: 'M17 7H14M17 11H14',
  d3: 'M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22M12 22H15M12 22H9',
  d4: 'M17 7V11M17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7V11C7 13.7614 9.23858 16 12 16C14.7614 16 17 13.7614 17 11M17 7H14M17 11H14',
  d5: 'M12 1.25C8.82436 1.25 6.25 3.82436 6.25 7V11C6.25 14.1756 8.82436 16.75 12 16.75C14.6852 16.75 16.9406 14.9093 17.5731 12.4209C17.6475 12.1281 17.6847 11.9817 17.5947 11.8658C17.5046 11.75 17.3425 11.75 17.0183 11.75H14C13.5858 11.75 13.25 11.4142 13.25 11C13.25 10.5858 13.5858 10.25 14 10.25H17.15C17.4328 10.25 17.5743 10.25 17.6621 10.1621C17.75 10.0743 17.75 9.93284 17.75 9.65V8.35C17.75 8.06716 17.75 7.92574 17.6621 7.83787C17.5743 7.75 17.4328 7.75 17.15 7.75H14C13.5858 7.75 13.25 7.41421 13.25 7C13.25 6.58579 13.5858 6.25 14 6.25H17.0183C17.3425 6.25 17.5046 6.25 17.5947 6.13416C17.6847 6.01832 17.6475 5.87191 17.5731 5.57911C16.9406 3.09067 14.6852 1.25 12 1.25Z',
  d6: 'M4.22222 10.25C4.75917 10.25 5.19444 10.6805 5.19444 11.2115C5.19444 14.9288 8.2414 17.9423 12 17.9423C15.7586 17.9423 18.8056 14.9288 18.8056 11.2115C18.8056 10.6805 19.2408 10.25 19.7778 10.25C20.3147 10.25 20.75 10.6805 20.75 11.2115C20.75 15.6659 17.3472 19.3343 12.9722 19.8126V20.8269H14.9167C15.4536 20.8269 15.8889 21.2574 15.8889 21.7885C15.8889 22.3195 15.4536 22.75 14.9167 22.75H9.08333C8.54639 22.75 8.11111 22.3195 8.11111 21.7885C8.11111 21.2574 8.54639 20.8269 9.08333 20.8269H11.0278V19.8126C6.65283 19.3343 3.25 15.6659 3.25 11.2115C3.25 10.6805 3.68528 10.25 4.22222 10.25Z',
  d7: 'M6.25 7C6.25 3.82436 8.82436 1.25 12 1.25C15.1756 1.25 17.75 3.82436 17.75 7V11C17.75 14.1756 15.1756 16.75 12 16.75C8.82436 16.75 6.25 14.1756 6.25 11V7Z',
  d8: 'M17.75 10.25V11C17.75 11.2542 17.7335 11.5045 17.7015 11.75H14C13.5858 11.75 13.25 11.4142 13.25 11C13.25 10.5858 13.5858 10.25 14 10.25H17.75Z',
  d9: 'M17.7015 6.25C17.7335 6.49547 17.75 6.74581 17.75 7V7.75H14C13.5858 7.75 13.25 7.41421 13.25 7C13.25 6.58579 13.5858 6.25 14 6.25H17.7015Z',
  d10: 'M17 7H13M17 11H13',
  d11: 'M11 19.6951C6.50005 19.1976 3 15.3826 3 10.75H5C5 14.616 8.13401 17.75 12 17.75C15.866 17.75 19 14.616 19 10.75H21C21 15.3826 17.5 19.1976 13 19.6951V21H15V23H9V21H11V19.6951Z',
  d12: 'M12.0005 1C8.82491 1 6.25055 3.57436 6.25055 6.75V10.75C6.25055 13.9256 8.82491 16.5 12.0005 16.5C14.922 16.5 17.3346 14.3213 17.7021 11.5H14.0005V10H17.7505V7.5H14.0005V6H17.7021C17.3346 3.17873 14.922 1 12.0005 1Z',
};

export const IconMic01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-01-stroke-rounded IconMic01StrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMic01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-01-duotone-rounded IconMic01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMic01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-01-twotone-rounded IconMic01TwotoneRounded"
    >
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
      />
    </TheIconWrapper>
  );
};

export const IconMic01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-01-solid-rounded IconMic01SolidRounded"
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

export const IconMic01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-01-bulk-rounded IconMic01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMic01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-01-stroke-sharp IconMic01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
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
    </TheIconWrapper>
  );
};

export const IconMic01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-01-solid-sharp IconMic01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMic01: TheIconSelfPack = {
  name: 'Mic01',
  StrokeRounded: IconMic01StrokeRounded,
  DuotoneRounded: IconMic01DuotoneRounded,
  TwotoneRounded: IconMic01TwotoneRounded,
  SolidRounded: IconMic01SolidRounded,
  BulkRounded: IconMic01BulkRounded,
  StrokeSharp: IconMic01StrokeSharp,
  SolidSharp: IconMic01SolidSharp,
};