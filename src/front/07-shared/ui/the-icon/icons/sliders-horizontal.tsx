import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 5.00024L10 5',
  d2: 'M13 5L20 5',
  d3: 'M16 9L16 15',
  d4: 'M10 2L10 8',
  d5: 'M12 16L12 22',
  d6: 'M16 12L20 12.0002',
  d7: 'M4 12.0002L13 12',
  d8: 'M12 19L20 19',
  d9: 'M4 19.0002L9 19',
  d10: 'M12.9995 5.00098L19.9995 5.00098',
  d11: 'M3.99951 5.00122L9.99951 5.00098M9.99951 2.00098V8.00098',
  d12: 'M15.9995 9V15M15.9995 11.9998L19.9995 12',
  d13: 'M3.99951 12.0012L12.9995 12.001',
  d14: 'M11.9995 16V22M11.9995 19H19.9995',
  d15: 'M3.99951 19.0012L8.99951 19.001',
  d16: 'M9.99955 6L3.99955 6.00024C3.44727 6.00027 2.99953 5.55257 2.99951 5.00029C2.99949 4.448 3.44719 4.00027 3.99947 4.00024L9.99947 4C10.5518 3.99998 10.9995 4.44767 10.9995 4.99996C10.9995 5.55224 10.5518 5.99998 9.99955 6Z',
  d17: 'M11.9995 5C11.9995 4.44772 12.4472 4 12.9995 4L19.9995 4C20.5518 4 20.9995 4.44772 20.9995 5C20.9995 5.55229 20.5518 6 19.9995 6L12.9995 6C12.4472 6 11.9995 5.55228 11.9995 5Z',
  d18: 'M15.9995 8C16.5518 8 16.9995 8.44772 16.9995 9L16.9995 15C16.9995 15.5523 16.5518 16 15.9995 16C15.4472 16 14.9995 15.5523 14.9995 15L14.9995 9C14.9995 8.44772 15.4472 8 15.9995 8Z',
  d19: 'M9.99951 1C10.5518 1 10.9995 1.44772 10.9995 2L10.9995 8C10.9995 8.55228 10.5518 9 9.99951 9C9.44723 9 8.99951 8.55228 8.99951 8L8.99951 2C8.99951 1.44772 9.44723 1 9.99951 1Z',
  d20: 'M11.9995 15C12.5518 15 12.9995 15.4477 12.9995 16L12.9995 22C12.9995 22.5523 12.5518 23 11.9995 23C11.4472 23 10.9995 22.5523 10.9995 22L10.9995 16C10.9995 15.4477 11.4472 15 11.9995 15Z',
  d21: 'M14.9995 11.9999C14.9995 11.4477 15.4473 11 15.9996 11L19.9996 11.0002C20.5519 11.0003 20.9995 11.448 20.9995 12.0003C20.9995 12.5526 20.5517 13.0003 19.9995 13.0002L15.9995 13C15.4472 13 14.9995 12.5522 14.9995 11.9999Z',
  d22: 'M12.9995 13L3.99954 13.0002C3.44725 13.0003 2.99953 12.5526 2.99951 12.0003C2.9995 11.448 3.4472 11.0003 3.99948 11.0002L12.9995 11C13.5518 11 13.9995 11.4477 13.9995 12C13.9995 12.5523 13.5518 13 12.9995 13Z',
  d23: 'M10.9995 19C10.9995 18.4477 11.4472 18 11.9995 18L19.9995 18C20.5518 18 20.9995 18.4477 20.9995 19C20.9995 19.5523 20.5518 20 19.9995 20L11.9995 20C11.4472 20 10.9995 19.5523 10.9995 19Z',
  d24: 'M8.99956 20L3.99956 20.0002C3.44728 20.0003 2.99954 19.5526 2.99951 19.0003C2.99948 18.448 3.44718 18.0003 3.99946 18.0002L8.99946 18C9.55175 18 9.99948 18.4477 9.99951 19C9.99954 19.5522 9.55185 20 8.99956 20Z',
  d25: 'M9.99959 6L3.99959 6.00024L3.99951 4.00024L9.99951 4L9.99959 6Z',
  d26: 'M19.9995 6L12.9995 6V4L19.9995 4V6Z',
  d27: 'M14.9995 15L14.9995 9H16.9995L16.9995 15H14.9995Z',
  d28: 'M8.99951 8L8.99951 2H10.9995L10.9995 8H8.99951Z',
  d29: 'M10.9995 22L10.9995 16H12.9995L12.9995 22H10.9995Z',
  d30: 'M19.9995 13.0002L15.9995 13L15.9996 11L19.9996 11.0002L19.9995 13.0002Z',
  d31: 'M12.9996 13L3.99957 13.0002L3.99951 11.0002L12.9995 11L12.9996 13Z',
  d32: 'M19.9995 20L11.9995 20V18L19.9995 18V20Z',
  d33: 'M8.99961 20L3.99961 20.0002L3.99951 18.0002L8.99951 18L8.99961 20Z',
};

export const IconSlidersHorizontalStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sliders-horizontal-stroke-rounded IconSlidersHorizontalStrokeRounded"
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
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSlidersHorizontalDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sliders-horizontal-duotone-rounded IconSlidersHorizontalDuotoneRounded"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSlidersHorizontalTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sliders-horizontal-twotone-rounded IconSlidersHorizontalTwotoneRounded"
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
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSlidersHorizontalSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sliders-horizontal-solid-rounded IconSlidersHorizontalSolidRounded"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSlidersHorizontalBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sliders-horizontal-bulk-rounded IconSlidersHorizontalBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSlidersHorizontalStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sliders-horizontal-stroke-sharp IconSlidersHorizontalStrokeSharp"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSlidersHorizontalSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sliders-horizontal-solid-sharp IconSlidersHorizontalSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d28} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d29} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d30} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d31} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d32} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d33} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSlidersHorizontal: TheIconSelfPack = {
  name: 'SlidersHorizontal',
  StrokeRounded: IconSlidersHorizontalStrokeRounded,
  DuotoneRounded: IconSlidersHorizontalDuotoneRounded,
  TwotoneRounded: IconSlidersHorizontalTwotoneRounded,
  SolidRounded: IconSlidersHorizontalSolidRounded,
  BulkRounded: IconSlidersHorizontalBulkRounded,
  StrokeSharp: IconSlidersHorizontalStrokeSharp,
  SolidSharp: IconSlidersHorizontalSolidSharp,
};