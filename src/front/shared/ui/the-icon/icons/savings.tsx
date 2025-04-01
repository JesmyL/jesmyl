import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 13.5H3C2.44772 13.5 2 13.9477 2 14.5V21C2 21.5523 2.44772 22 3 22H5C5.55228 22 6 21.5523 6 21V14.5C6 13.9477 5.55228 13.5 5 13.5Z',
  d2: 'M6 14.5H11.75C12.4404 14.5 13 15.0596 13 15.75C13 16.4404 12.4404 17 11.75 17H9.5',
  d3: 'M11 16.9998H14.6917C15.5417 16.9998 16.3697 16.729 17.0554 16.2267L19.6836 14.3015C20.2549 13.8584 21.0678 13.9088 21.5796 14.4192C22.1734 15.0112 22.1328 15.9828 21.4918 16.5236L17.0951 20.1022C16.3817 20.6828 15.49 20.9998 14.5701 20.9998H6',
  d4: 'M19 7C19 9.76133 16.7614 12 14 12C11.2386 12 9 9.76133 9 7C9 4.23857 11.2386 2 14 2C16.7614 2 19 4.23857 19 7Z',
  d5: 'M1.25 14.5C1.25 13.5335 2.0335 12.75 3 12.75H4C4.9665 12.75 5.75 13.5335 5.75 14.5V21C5.75 21.9665 4.9665 22.75 4 22.75H3C2.0335 22.75 1.25 21.9665 1.25 21V14.5Z',
  d6: 'M8.25 7C8.25 3.82435 10.8244 1.25 14 1.25C17.1756 1.25 19.75 3.82435 19.75 7C19.75 10.1755 17.1757 12.75 14 12.75C10.8243 12.75 8.25 10.1755 8.25 7Z',
  d7: 'M7 21.7498H14.5701C15.6624 21.7498 16.7214 21.3734 17.5686 20.6838L21.9653 17.1053L21.9755 17.0968C22.9523 16.2726 23.0144 14.7907 22.1092 13.8881C21.3326 13.1138 20.1019 13.0351 19.2329 13.7019L16.6122 15.6217C16.0551 16.0298 15.3823 16.2498 14.6917 16.2498H13.687C13.7281 16.0901 13.75 15.9226 13.75 15.75C13.75 14.6454 12.8546 13.75 11.75 13.75H7V21.7498Z',
  d8: 'M6 13.5H2V22H6V13.5Z',
  d9: 'M11 16.9998H16L19.6836 14.3015C20.2549 13.8584 21.0678 13.9088 21.5796 14.4192C22.1734 15.0112 22.1328 15.9828 21.4918 16.5236L16 20.9998H6',
  d10: 'M1.25 12.75H5.75V22.75H1.25V12.75Z',
  d11: 'M7 21.7498H16.2669L21.9657 17.105L21.9755 17.0968C22.9523 16.2726 23.0144 14.7907 22.1092 13.8881C21.3326 13.1138 20.1019 13.0351 19.2329 13.7019L15.7547 16.2498H13.687C13.7281 16.0901 13.75 15.9226 13.75 15.75C13.75 14.6454 12.8546 13.75 11.75 13.75H7V21.7498Z',
};

export const IconSavingsStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="savings-stroke-rounded IconSavingsStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconSavingsDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="savings-duotone-rounded IconSavingsDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
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
    </TheIconWrapper>
  );
};

export const IconSavingsTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="savings-twotone-rounded IconSavingsTwotoneRounded"
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

export const IconSavingsSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="savings-solid-rounded IconSavingsSolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSavingsBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="savings-bulk-rounded IconSavingsBulkRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSavingsStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="savings-stroke-sharp IconSavingsStrokeSharp"
    >
      <path 
        d={d.d8} 
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
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconSavingsSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="savings-solid-sharp IconSavingsSolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSavings: TheIconSelfPack = {
  name: 'Savings',
  StrokeRounded: IconSavingsStrokeRounded,
  DuotoneRounded: IconSavingsDuotoneRounded,
  TwotoneRounded: IconSavingsTwotoneRounded,
  SolidRounded: IconSavingsSolidRounded,
  BulkRounded: IconSavingsBulkRounded,
  StrokeSharp: IconSavingsStrokeSharp,
  SolidSharp: IconSavingsSolidSharp,
};