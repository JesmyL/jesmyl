import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14 18C18.4183 18 22 14.4183 22 10C22 5.58172 18.4183 2 14 2C9.58172 2 6 5.58172 6 10C6 14.4183 9.58172 18 14 18Z',
  d2: 'M13.1669 20.9689C12.063 21.6239 10.7742 21.9999 9.3975 21.9999C5.31197 21.9999 2 18.688 2 14.6024C2 13.2258 2.37607 11.9369 3.03107 10.833',
  d3: 'M13 20.9843C11.9126 21.6296 10.643 22 9.28691 22C5.26246 22 2 18.7375 2 14.7131C2 13.357 2.37044 12.0874 3.01566 11',
  d4: 'M2.98539 10.205C3.25498 9.87581 3.38978 9.7112 3.52076 9.75811C3.65173 9.80502 3.65134 10.0334 3.65055 10.4902C3.65054 10.4959 3.65054 10.5017 3.65054 10.5075C3.65054 15.9432 8.05704 20.3497 13.4927 20.3497C13.4985 20.3497 13.5043 20.3497 13.5101 20.3497C13.9668 20.3489 14.1952 20.3485 14.2421 20.4795C14.289 20.6105 14.1244 20.7453 13.7952 21.0149C12.4707 22.0995 10.7772 22.7502 8.93172 22.7502C4.68922 22.7502 1.25 19.311 1.25 15.0685C1.25 13.223 1.90079 11.5296 2.98539 10.205Z',
  d5: 'M5.25 10.0002C5.25 5.16775 9.16751 1.25024 14 1.25024C18.8325 1.25024 22.75 5.16775 22.75 10.0002C22.75 14.8327 18.8325 18.7502 14 18.7502C9.16751 18.7502 5.25 14.8327 5.25 10.0002Z',
  d6: 'M5.25 10C5.25 5.16751 9.16751 1.25 14 1.25C18.8325 1.25 22.75 5.16751 22.75 10C22.75 14.8325 18.8325 18.75 14 18.75C9.16751 18.75 5.25 14.8325 5.25 10Z',
  d7: 'M4.03233 7.60083C3.84776 8.37045 3.75 9.17383 3.75 10C3.75 15.661 8.33908 20.25 14 20.25C14.8262 20.25 15.6296 20.1523 16.3992 19.9677C14.802 21.6797 12.526 22.75 10 22.75C5.16751 22.75 1.25 18.8325 1.25 14C1.25 11.474 2.32039 9.19802 4.03233 7.60083Z',
};

export const IconCoins02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coins-02-stroke-rounded IconCoins02StrokeRounded"
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
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCoins02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coins-02-duotone-rounded IconCoins02DuotoneRounded"
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

export const IconCoins02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coins-02-twotone-rounded IconCoins02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCoins02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coins-02-solid-rounded IconCoins02SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCoins02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coins-02-bulk-rounded IconCoins02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCoins02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coins-02-stroke-sharp IconCoins02StrokeSharp"
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

export const IconCoins02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coins-02-solid-sharp IconCoins02SolidSharp"
    >
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

export const iconPackOfCoins02: TheIconSelfPack = {
  name: 'Coins02',
  StrokeRounded: IconCoins02StrokeRounded,
  DuotoneRounded: IconCoins02DuotoneRounded,
  TwotoneRounded: IconCoins02TwotoneRounded,
  SolidRounded: IconCoins02SolidRounded,
  BulkRounded: IconCoins02BulkRounded,
  StrokeSharp: IconCoins02StrokeSharp,
  SolidSharp: IconCoins02SolidSharp,
};