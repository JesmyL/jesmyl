import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 21.9999V5.99988C5 4.11426 5 3.17145 5.58579 2.58566C6.17157 1.99988 7.11438 1.99988 9 1.99988H15C16.8856 1.99988 17.8284 1.99988 18.4142 2.58566C19 3.17145 19 4.11426 19 5.99988V21.9999',
  d2: 'M3 21.9999H21',
  d3: 'M16 12.9999L16 10.9999',
  d4: 'M5 5.99988V21.9999H19V5.99988C19 4.11426 19 3.17145 18.4142 2.58566C17.8284 1.99988 16.8856 1.99988 15 1.99988H9C7.11438 1.99988 6.17157 1.99988 5.58579 2.58566C5 3.17145 5 4.11426 5 5.99988Z',
  d5: 'M8.948 1.24988H15.052C15.9505 1.24985 16.6997 1.24983 17.2945 1.32979C17.9223 1.4142 18.4891 1.59987 18.9445 2.05534C19.4 2.51081 19.5857 3.07761 19.6701 3.7054C19.7501 4.30018 19.75 5.04942 19.75 5.94789L19.75 22.7499H4.25L4.25 5.94785V5.94782C4.24997 5.04937 4.24995 4.30017 4.32991 3.7054C4.41432 3.07761 4.59999 2.51081 5.05546 2.05534C5.51093 1.59987 6.07773 1.4142 6.70552 1.32979C7.30031 1.24983 8.04952 1.24985 8.948 1.24988ZM17 10.9999C17 10.4476 16.5523 9.99988 16 9.99988C15.4477 9.99988 15 10.4476 15 10.9999V12.9999C15 13.5522 15.4477 13.9999 16 13.9999C16.5523 13.9999 17 13.5522 17 12.9999V10.9999Z',
  d6: 'M2 22C2 21.4477 2.44772 21 3 21H21C21.5523 21 22 21.4477 22 22C22 22.5523 21.5523 23 21 23H3C2.44772 23 2 22.5523 2 22Z',
  d7: 'M5 21.9999V1.99988L19 1.99988V21.9999',
  d8: 'M16 14L16 10',
  d9: 'M21 22.7499H3V20.7499H21V22.7499Z',
  d10: 'M5 1.24988C4.80109 1.24988 4.61032 1.3289 4.46967 1.46955C4.32902 1.6102 4.25 1.80097 4.25 1.99988V21.9999H19.75V1.99988C19.75 1.58566 19.4142 1.24988 19 1.24988H5ZM17 13.9999V9.99988H15V13.9999H17Z',
};

export const IconDoor02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="door-02-stroke-rounded IconDoor02StrokeRounded"
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

export const IconDoor02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="door-02-duotone-rounded IconDoor02DuotoneRounded"
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
        strokeLinecap="round" 
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

export const IconDoor02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="door-02-twotone-rounded IconDoor02TwotoneRounded"
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

export const IconDoor02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="door-02-solid-rounded IconDoor02SolidRounded"
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

export const IconDoor02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="door-02-bulk-rounded IconDoor02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconDoor02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="door-02-stroke-sharp IconDoor02StrokeSharp"
    >
      <path 
        d={d.d7} 
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
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDoor02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="door-02-solid-sharp IconDoor02SolidSharp"
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
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDoor02: TheIconSelfPack = {
  name: 'Door02',
  StrokeRounded: IconDoor02StrokeRounded,
  DuotoneRounded: IconDoor02DuotoneRounded,
  TwotoneRounded: IconDoor02TwotoneRounded,
  SolidRounded: IconDoor02SolidRounded,
  BulkRounded: IconDoor02BulkRounded,
  StrokeSharp: IconDoor02StrokeSharp,
  SolidSharp: IconDoor02SolidSharp,
};