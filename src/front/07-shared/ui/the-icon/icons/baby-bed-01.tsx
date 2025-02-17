import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 7L12 15M8 7L8 15M16 7L16 15',
  d2: 'M20 20V6C20 4.89543 20.8954 4 22 4M4 20V6C4 4.89543 3.10457 4 2 4',
  d3: 'M4 7H20',
  d4: 'M4 15H20',
  d5: 'M4 18H20',
  d6: 'M20 7V15H16V7H20Z',
  d7: 'M4 15V7H8V15H4Z',
  d8: 'M8 15V7H16V15H8Z',
  d9: 'M8 6C8.55229 6 9 6.44772 9 7L9 15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15L7 7C7 6.44772 7.44772 6 8 6ZM12 6C12.5523 6 13 6.44772 13 7L13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15L11 7C11 6.44772 11.4477 6 12 6ZM16 6C16.5523 6 17 6.44772 17 7L17 15C17 15.5523 16.5523 16 16 16C15.4477 16 15 15.5523 15 15L15 7C15 6.44772 15.4477 6 16 6Z',
  d10: 'M1 4C1 3.44772 1.44772 3 2 3C3.65685 3 5 4.34315 5 6V20C5 20.5523 4.55228 21 4 21C3.44772 21 3 20.5523 3 20V6C3 5.44772 2.55228 5 2 5C1.44772 5 1 4.55228 1 4ZM19 6C19 4.34315 20.3431 3 22 3C22.5523 3 23 3.44772 23 4C23 4.55228 22.5523 5 22 5C21.4477 5 21 5.44772 21 6V20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20V6Z',
  d11: 'M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7Z',
  d12: 'M3 15C3 14.4477 3.44772 14 4 14H20C20.5523 14 21 14.4477 21 15V18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18V15Z',
  d13: 'M9 14H7V8H9L9 14Z',
  d14: 'M13 8H11L11 14H13L13 8Z',
  d15: 'M17 8H15L15 14H17L17 8Z',
  d16: 'M20 20V4H22M4 20V4.00001L2 4',
  d17: 'M7 15.5L7 7.5H9L9 15.5H7ZM11 15.5L11 7.5H13L13 15.5H11ZM15 15.5L15 7.5H17L17 15.5H15Z',
  d18: 'M3 5.5L2 5.5L2.00001 3.5L5 3.50001V20.5H3V5.5ZM19 3.5H22V5.5H21V20.5H19V3.5Z',
  d19: 'M20 8.5H4V6.5H20V8.5Z',
  d20: 'M4 14.5H20V18.5H4V14.5Z',
};

export const IconBabyBed01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-01-stroke-rounded IconBabyBed01StrokeRounded"
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

export const IconBabyBed01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-01-duotone-rounded IconBabyBed01DuotoneRounded"
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
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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

export const IconBabyBed01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-01-twotone-rounded IconBabyBed01TwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBabyBed01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-01-solid-rounded IconBabyBed01SolidRounded"
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

export const IconBabyBed01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-01-bulk-rounded IconBabyBed01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
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

export const IconBabyBed01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-01-stroke-sharp IconBabyBed01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
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

export const IconBabyBed01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-bed-01-solid-sharp IconBabyBed01SolidSharp"
    >
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
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBabyBed01: TheIconSelfPack = {
  name: 'BabyBed01',
  StrokeRounded: IconBabyBed01StrokeRounded,
  DuotoneRounded: IconBabyBed01DuotoneRounded,
  TwotoneRounded: IconBabyBed01TwotoneRounded,
  SolidRounded: IconBabyBed01SolidRounded,
  BulkRounded: IconBabyBed01BulkRounded,
  StrokeSharp: IconBabyBed01StrokeSharp,
  SolidSharp: IconBabyBed01SolidSharp,
};