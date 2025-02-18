import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z',
  d2: 'M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22M12 22H15M12 22H9',
  d3: 'M6.25 7C6.25 3.82436 8.82436 1.25 12 1.25C15.1756 1.25 17.75 3.82436 17.75 7V11C17.75 14.1756 15.1756 16.75 12 16.75C8.82436 16.75 6.25 14.1756 6.25 11V7Z',
  d4: 'M4.22222 10.25C4.75917 10.25 5.19444 10.6805 5.19444 11.2115C5.19444 14.9288 8.2414 17.9423 12 17.9423C15.7586 17.9423 18.8056 14.9288 18.8056 11.2115C18.8056 10.6805 19.2408 10.25 19.7778 10.25C20.3147 10.25 20.75 10.6805 20.75 11.2115C20.75 15.6659 17.3472 19.3343 12.9722 19.8126V20.8269H14.9167C15.4536 20.8269 15.8889 21.2574 15.8889 21.7885C15.8889 22.3195 15.4536 22.75 14.9167 22.75H9.08333C8.54639 22.75 8.11111 22.3195 8.11111 21.7885C8.11111 21.2574 8.54639 20.8269 9.08333 20.8269H11.0278V19.8126C6.65283 19.3343 3.25 15.6659 3.25 11.2115C3.25 10.6805 3.68528 10.25 4.22222 10.25Z',
  d5: 'M6.25 6.75C6.25 3.57436 8.82436 1 12 1C15.1756 1 17.75 3.57436 17.75 6.75V10.75C17.75 13.9256 15.1756 16.5 12 16.5C8.82436 16.5 6.25 13.9256 6.25 10.75V6.75Z',
  d6: 'M11 19.6951C6.50005 19.1976 3 15.3826 3 10.75H5C5 14.616 8.13401 17.75 12 17.75C15.866 17.75 19 14.616 19 10.75H21C21 15.3826 17.5 19.1976 13 19.6951V21H15V23H9V21H11V19.6951Z',
};

export const IconMic02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-02-stroke-rounded IconMic02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconMic02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-02-duotone-rounded IconMic02DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconMic02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-02-twotone-rounded IconMic02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconMic02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-02-solid-rounded IconMic02SolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMic02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-02-bulk-rounded IconMic02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMic02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-02-stroke-sharp IconMic02StrokeSharp"
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
    </TheIconWrapper>
  );
};

export const IconMic02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-02-solid-sharp IconMic02SolidSharp"
    >
      <path 
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

export const iconPackOfMic02: TheIconSelfPack = {
  name: 'Mic02',
  StrokeRounded: IconMic02StrokeRounded,
  DuotoneRounded: IconMic02DuotoneRounded,
  TwotoneRounded: IconMic02TwotoneRounded,
  SolidRounded: IconMic02SolidRounded,
  BulkRounded: IconMic02BulkRounded,
  StrokeSharp: IconMic02StrokeSharp,
  SolidSharp: IconMic02SolidSharp,
};