import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 8L12 16M12 8C11.2998 8 9.99153 9.9943 9.5 10.5M12 8C12.7002 8 14.0085 9.9943 14.5 10.5',
  d2: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12ZM13.0059 16C13.0059 16.5523 12.5581 17 12.0059 17C11.4536 17 11.0059 16.5523 11.0059 16V11.5L10.4116 11.5C10.236 11.5001 10.0203 11.5003 9.84387 11.4782L9.84053 11.4778C9.71408 11.462 9.13804 11.3902 8.86368 10.8246C8.58872 10.2577 8.89065 9.75761 8.95597 9.6494L8.95841 9.64537C9.05062 9.49235 9.18477 9.32147 9.29511 9.18092L9.31885 9.15067C9.61348 8.77485 9.99545 8.29063 10.3759 7.89962C10.5657 7.70451 10.783 7.50328 11.0139 7.34443C11.2191 7.20323 11.5693 6.99996 12 6.99996C12.4307 6.99996 12.7809 7.20323 12.9861 7.34443C13.217 7.50328 13.4343 7.70451 13.6241 7.89962C14.0046 8.29063 14.3865 8.77485 14.6812 9.15067L14.7049 9.18091C14.8152 9.32147 14.9494 9.49235 15.0416 9.64537L15.044 9.64941C15.1093 9.75761 15.4113 10.2578 15.1363 10.8246C14.862 11.3902 14.2859 11.462 14.1595 11.4778L14.1561 11.4782C13.9797 11.5003 13.764 11.5001 13.5884 11.5L13.0059 11.5V16Z',
  d3: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75Z',
  d4: 'M12.0059 17C12.5581 17 13.0059 16.5523 13.0059 16V11.5L13.5884 11.5C13.764 11.5001 13.9797 11.5003 14.1561 11.4782L14.1595 11.4778C14.2859 11.462 14.862 11.3902 15.1363 10.8246C15.4113 10.2578 15.1093 9.75761 15.044 9.64941L15.0416 9.64537C14.9494 9.49235 14.8152 9.32147 14.7049 9.18091L14.6812 9.15067C14.3865 8.77485 14.0046 8.29063 13.6241 7.89962C13.4343 7.70451 13.217 7.50328 12.9861 7.34443C12.7809 7.20323 12.4307 6.99996 12 6.99996C11.5693 6.99996 11.2191 7.20323 11.0139 7.34443C10.783 7.50328 10.5657 7.70451 10.3759 7.89962C9.99545 8.29063 9.61348 8.77485 9.31885 9.15067L9.29511 9.18092C9.18477 9.32147 9.05062 9.49235 8.95841 9.64537L8.95597 9.6494C8.89065 9.75761 8.58872 10.2577 8.86368 10.8246C9.13804 11.3902 9.71408 11.462 9.84053 11.4778L9.84387 11.4782C10.0203 11.5003 10.236 11.5001 10.4116 11.5L11.0059 11.5V16C11.0059 16.5523 11.4536 17 12.0059 17Z',
  d5: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
  d6: 'M12 16L12 8.76294M9 11.0002L12 8L15 11.0002',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.7491 10.3411L12.7491 16.5304H11.2491V10.3411L9.52945 12.0609L8.46875 11.0003L11.9991 7.46967L15.5294 11.0003L14.4688 12.0609L12.7491 10.3411Z',
};

export const IconUploadCircle01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-circle-01-stroke-rounded IconUploadCircle01StrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUploadCircle01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-circle-01-duotone-rounded IconUploadCircle01DuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUploadCircle01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-circle-01-twotone-rounded IconUploadCircle01TwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUploadCircle01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-circle-01-solid-rounded IconUploadCircle01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUploadCircle01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-circle-01-bulk-rounded IconUploadCircle01BulkRounded"
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

export const IconUploadCircle01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-circle-01-stroke-sharp IconUploadCircle01StrokeSharp"
    >
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
    </TheIconWrapper>
  );
};

export const IconUploadCircle01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-circle-01-solid-sharp IconUploadCircle01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUploadCircle01: TheIconSelfPack = {
  name: 'UploadCircle01',
  StrokeRounded: IconUploadCircle01StrokeRounded,
  DuotoneRounded: IconUploadCircle01DuotoneRounded,
  TwotoneRounded: IconUploadCircle01TwotoneRounded,
  SolidRounded: IconUploadCircle01SolidRounded,
  BulkRounded: IconUploadCircle01BulkRounded,
  StrokeSharp: IconUploadCircle01StrokeSharp,
  SolidSharp: IconUploadCircle01SolidSharp,
};