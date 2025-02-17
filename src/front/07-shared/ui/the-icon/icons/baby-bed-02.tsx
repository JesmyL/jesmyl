import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 7L12 15M16 7L16 15M8 7L8 15',
  d2: 'M22 17C19.3349 18.8671 15.8341 20 12 20C8.16586 20 4.66508 18.8671 2 17',
  d3: 'M20 18V6C20 4.89543 20.8954 4 22 4M4 18V6C4 4.89543 3.10457 4 2 4',
  d4: 'M4 7H20',
  d5: 'M4 15H20',
  d6: 'M16 15V7H20V15H16Z',
  d7: 'M4 15V7H8V15H4Z',
  d8: 'M8 6C8.55229 6 9 6.44772 9 7L9 15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15L7 7C7 6.44772 7.44772 6 8 6ZM12 6C12.5523 6 13 6.44772 13 7L13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15L11 7C11 6.44772 11.4477 6 12 6ZM16 6C16.5523 6 17 6.44772 17 7L17 15C17 15.5523 16.5523 16 16 16C15.4477 16 15 15.5523 15 15L15 7C15 6.44772 15.4477 6 16 6Z',
  d9: 'M11.9999 19C15.6408 19 18.9388 17.9236 21.4261 16.181C21.8785 15.8641 22.502 15.9739 22.8189 16.4262C23.1358 16.8785 23.026 17.5021 22.5737 17.819C19.7309 19.8106 16.0273 21 11.9999 21C7.9725 21 4.26895 19.8106 1.42613 17.819C0.973808 17.5021 0.864014 16.8785 1.1809 16.4262C1.49779 15.9739 2.12137 15.8641 2.57369 16.181C5.06104 17.9236 8.35905 19 11.9999 19Z',
  d10: 'M1 4C1 3.44772 1.44772 3 2 3C3.65685 3 5 4.34315 5 6V18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18V6C3 5.44772 2.55228 5 2 5C1.44772 5 1 4.55228 1 4ZM19 6C19 4.34315 20.3431 3 22 3C22.5523 3 23 3.44772 23 4C23 4.55228 22.5523 5 22 5C21.4477 5 21 5.44772 21 6V18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18V6Z',
  d11: 'M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7Z',
  d12: 'M3 15C3 14.4477 3.44772 14 4 14H20C20.5523 14 21 14.4477 21 15C21 15.5523 20.5523 16 20 16H4C3.44772 16 3 15.5523 3 15Z',
  d13: 'M4 8H7L7 14H4C3.44772 14 3 14.4477 3 15C3 15.5523 3.44772 16 4 16H8H12H16L20 16C20.5523 16 21 15.5523 21 15C21 14.4477 20.5523 14 20 14H17L17 8H20C20.5523 8 21 7.55228 21 7C21 6.44771 20.5523 6 20 6H16H12L8 6H4C3.44772 6 3 6.44771 3 7C3 7.55228 3.44772 8 4 8ZM15 14H13L13 8L15 8L15 14ZM11 14H9L9 8H11L11 14Z',
  d14: 'M20 18V4.00001L22 4M4 18V4.00001L2 4',
  d15: 'M6.99951 15L6.99951 7H8.99951L8.99951 15H6.99951ZM10.9995 15L10.9995 7H12.9995L12.9995 15H10.9995ZM14.9995 15L14.9995 7H16.9995L16.9995 15H14.9995Z',
  d16: 'M12 19C15.7015 19 19.0545 17.9236 21.5833 16.181L22.75 17.8191C19.8598 19.8107 16.0945 21 12 21C7.90546 21 4.1402 19.8107 1.25 17.8191L2.41668 16.181C4.94548 17.9236 8.29845 19 12 19Z',
  d17: 'M2.99952 5L1.99951 5L1.99952 3L3.99952 3.00001C4.5518 3.00001 4.99952 3.44773 4.99952 4.00001V18H2.99952V5ZM19.9995 3.00001L21.9995 3L21.9995 5L20.9995 5V18H18.9995V4.00001C18.9995 3.44772 19.4472 3.00001 19.9995 3.00001Z',
  d18: 'M19.9995 8H3.99951V6H19.9995V8Z',
  d19: 'M19.9995 16H3.99951V14H19.9995V16Z',
};

export const IconBabyBed02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-02-stroke-rounded IconBabyBed02StrokeRounded"
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBabyBed02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-02-duotone-rounded IconBabyBed02DuotoneRounded"
    >
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBabyBed02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-02-twotone-rounded IconBabyBed02TwotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBabyBed02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-02-solid-rounded IconBabyBed02SolidRounded"
    >
      <path 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconBabyBed02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-02-bulk-rounded IconBabyBed02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
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

export const IconBabyBed02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-02-stroke-sharp IconBabyBed02StrokeSharp"
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
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBabyBed02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-02-solid-sharp IconBabyBed02SolidSharp"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBabyBed02: TheIconSelfPack = {
  name: 'BabyBed02',
  StrokeRounded: IconBabyBed02StrokeRounded,
  DuotoneRounded: IconBabyBed02DuotoneRounded,
  TwotoneRounded: IconBabyBed02TwotoneRounded,
  SolidRounded: IconBabyBed02SolidRounded,
  BulkRounded: IconBabyBed02BulkRounded,
  StrokeSharp: IconBabyBed02StrokeSharp,
  SolidSharp: IconBabyBed02SolidSharp,
};