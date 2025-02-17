import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.5 5V19',
  d2: 'M13.5 5V19',
  d3: 'M20.5 19H16.5V18.6907C16.5 18.2521 16.5 18.0327 16.5865 17.8385C16.673 17.6443 16.836 17.4976 17.1621 17.2041L19.7671 14.8596C20.2336 14.4397 20.5 13.8416 20.5 13.214V13C20.5 11.8954 19.6046 11 18.5 11C17.3954 11 16.5 11.8954 16.5 13V13.4',
  d4: 'M3.5 12L13.5 12',
  d5: 'M3 4C3.55228 4 4 4.44772 4 5V19C4 19.5523 3.55228 20 3 20C2.44772 20 2 19.5523 2 19V5C2 4.44772 2.44772 4 3 4Z',
  d6: 'M13 4C13.5523 4 14 4.44772 14 5V19C14 19.5523 13.5523 20 13 20C12.4477 20 12 19.5523 12 19V5C12 4.44772 12.4477 4 13 4Z',
  d7: 'M16.0006 13C16.0006 11.3431 17.3437 10 19.0006 10C20.6575 10 22.0006 11.3431 22.0006 13V13.214C22.0006 14.1251 21.6139 14.9934 20.9367 15.6029L18.3316 17.9474C18.311 17.966 18.2916 17.9835 18.2733 18H21.0006C21.5529 18 22.0006 18.4477 22.0006 19C22.0006 19.5523 21.5529 20 21.0006 20H17.0006C16.4483 20 16.0006 19.5523 16.0006 19V18.6907C16.0006 18.6612 16.0005 18.6308 16.0003 18.5997C15.9987 18.2607 15.9967 17.8289 16.1736 17.4317C16.3505 17.0344 16.6728 16.7471 16.9258 16.5215C16.9491 16.5008 16.9718 16.4806 16.9937 16.4608L19.5987 14.1163C19.8545 13.8861 20.0006 13.5581 20.0006 13.214V13C20.0006 12.4477 19.5529 12 19.0006 12C18.4483 12 18.0006 12.4477 18.0006 13V13.4C18.0006 13.9523 17.5529 14.4 17.0006 14.4C16.4483 14.4 16.0006 13.9523 16.0006 13.4V13Z',
  d8: 'M2 12C2 11.4477 2.44772 11 3 11L13 11C13.5523 11 14 11.4477 14 12C14 12.5523 13.5523 13 13 13L3 13C2.44772 13 2 12.5523 2 12Z',
  d9: 'M3 5V19',
  d10: 'M13.1445 5V19',
  d11: 'M3 12H13.1444',
  d12: 'M16.1777 12.3914C16.1777 11.3015 16.6262 9.82175 18.5733 10.0283C20.3361 10.2152 20.7751 12.6288 19.6019 13.7651L16.1861 17.0009V18.0188H21.0019',
  d13: 'M2 19V5H4V19H2Z',
  d14: 'M12 19V5H14V19H12Z',
  d15: 'M16 12C16 10.3431 17.3431 9 19 9C20.6569 9 22 10.3431 22 12V12.214C22 13.1191 21.6184 13.982 20.9494 14.5909L18.443 17H22V19H16V16.5742L19.5859 13.1273L19.5981 13.1163C19.8539 12.8861 20 12.5581 20 12.214V12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12V12.4H16V12Z',
  d16: 'M13 13L3 13L3 11L13 11V13Z',
};

export const IconHeading02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heading-02-stroke-rounded IconHeading02StrokeRounded"
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

export const IconHeading02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heading-02-duotone-rounded IconHeading02DuotoneRounded"
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

export const IconHeading02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heading-02-twotone-rounded IconHeading02TwotoneRounded"
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

export const IconHeading02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heading-02-solid-rounded IconHeading02SolidRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHeading02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heading-02-bulk-rounded IconHeading02BulkRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHeading02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heading-02-stroke-sharp IconHeading02StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconHeading02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="heading-02-solid-sharp IconHeading02SolidSharp"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHeading02: TheIconSelfPack = {
  name: 'Heading02',
  StrokeRounded: IconHeading02StrokeRounded,
  DuotoneRounded: IconHeading02DuotoneRounded,
  TwotoneRounded: IconHeading02TwotoneRounded,
  SolidRounded: IconHeading02SolidRounded,
  BulkRounded: IconHeading02BulkRounded,
  StrokeSharp: IconHeading02StrokeSharp,
  SolidSharp: IconHeading02SolidSharp,
};