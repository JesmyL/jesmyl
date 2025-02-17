import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
  d2: 'M12 7V12.5M10 11L11.2929 12.2929C11.6262 12.6262 11.7929 12.7929 12 12.7929C12.2071 12.7929 12.3738 12.6262 12.7071 12.2929L14 11',
  d3: 'M8.99023 16H14.9902',
  d4: 'M11.6904 21.7783C17.2133 21.7783 21.6904 17.3012 21.6904 11.7783C21.6904 6.25547 17.2133 1.77832 11.6904 1.77832C6.16758 1.77832 1.69043 6.25547 1.69043 11.7783C1.69043 17.3012 6.16758 21.7783 11.6904 21.7783Z',
  d5: 'M11.7002 6.75098V12.5157M9.7002 10.9435L10.9931 12.2986C11.3264 12.648 11.4931 12.8227 11.7002 12.8227C11.9073 12.8227 12.074 12.648 12.4073 12.2986L13.7002 10.9435',
  d6: 'M8.69043 15.7783H14.6904',
  d7: 'M12.0072 7L12.0071 12.9755M12.0071 12.9755C12.2686 12.979 12.5265 12.796 12.7168 12.5727L13.9912 11.1173M12.0071 12.9755C11.7549 12.972 11.4995 12.79 11.2975 12.5727L10.0157 11.1173M9 16L15 16',
  d8: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 6C12.5523 6 13 6.44772 13 7V10.1284H13.5501L13.5692 10.1283C13.6415 10.1281 13.7856 10.1277 13.9131 10.146C14.0276 10.1624 14.5425 10.2468 14.7802 10.7816C15.0179 11.3164 14.7355 11.7551 14.6711 11.8511C14.5992 11.958 14.5023 12.0648 14.4537 12.1182L14.4409 12.1324L13.7691 12.8767C13.549 13.1206 13.3215 13.3729 13.1049 13.556C12.8592 13.7636 12.4949 14 12 14C11.5051 14 11.1408 13.7636 10.8951 13.556C10.6785 13.3729 10.4509 13.1206 10.2309 12.8767L9.55915 12.1324L9.54626 12.1182C9.4977 12.0648 9.40076 11.958 9.32894 11.8511C9.26446 11.7551 8.98208 11.3164 9.2198 10.7816C9.45752 10.2468 9.97239 10.1624 10.0869 10.146C10.2144 10.1277 10.3585 10.1281 10.4308 10.1283L10.4499 10.1284H11V7C11 6.44772 11.4477 6 12 6ZM8 17C8 16.4477 8.44772 16 9 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H9C8.44772 18 8 17.5523 8 17Z',
  d9: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z',
  d10: 'M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V10.1284H10.4499L10.4308 10.1283C10.3585 10.1281 10.2144 10.1277 10.0869 10.146C9.97239 10.1624 9.45752 10.2468 9.2198 10.7816C8.98208 11.3164 9.26446 11.7551 9.32894 11.8511C9.40076 11.958 9.4977 12.0648 9.54626 12.1182L9.55915 12.1324L10.2309 12.8767C10.4509 13.1206 10.6785 13.3729 10.8951 13.556C11.1408 13.7636 11.5051 14 12 14C12.4949 14 12.8592 13.7636 13.1049 13.556C13.3215 13.3729 13.549 13.1206 13.7691 12.8767L14.4409 12.1324L14.4537 12.1182C14.5023 12.0648 14.5992 11.958 14.6711 11.8511C14.7355 11.7551 15.0179 11.3164 14.7802 10.7816C14.5425 10.2468 14.0276 10.1624 13.9131 10.146C13.7856 10.1277 13.6415 10.1281 13.5692 10.1283L13.5501 10.1284H13V7ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H15C15.5523 18 16 17.5523 16 17C16 16.4477 15.5523 16 15 16H9Z',
  d11: 'M11.9983 7V12.7694M9.51286 10.9908L12.0081 12.9995L14.5112 10.983M9.00391 16H15.0039',
  d12: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.75 11.5645V7.125H11.25V11.5645L9.96852 10.5393L9.03148 11.7107L12 14.0855L14.9685 11.7107L14.0315 10.5393L12.75 11.5645ZM15 16.875V15.375H9V16.875H15Z',
};

export const IconDownloadCircle02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-circle-02-stroke-rounded IconDownloadCircle02StrokeRounded"
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

export const IconDownloadCircle02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-circle-02-duotone-rounded IconDownloadCircle02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDownloadCircle02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-circle-02-twotone-rounded IconDownloadCircle02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDownloadCircle02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-circle-02-solid-rounded IconDownloadCircle02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDownloadCircle02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-circle-02-bulk-rounded IconDownloadCircle02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconDownloadCircle02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-circle-02-stroke-sharp IconDownloadCircle02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconDownloadCircle02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-circle-02-solid-sharp IconDownloadCircle02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDownloadCircle02: TheIconSelfPack = {
  name: 'DownloadCircle02',
  StrokeRounded: IconDownloadCircle02StrokeRounded,
  DuotoneRounded: IconDownloadCircle02DuotoneRounded,
  TwotoneRounded: IconDownloadCircle02TwotoneRounded,
  SolidRounded: IconDownloadCircle02SolidRounded,
  BulkRounded: IconDownloadCircle02BulkRounded,
  StrokeSharp: IconDownloadCircle02StrokeSharp,
  SolidSharp: IconDownloadCircle02SolidSharp,
};