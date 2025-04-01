import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 15L12 5M12 15C11.2998 15 9.99153 13.0057 9.5 12.5M12 15C12.7002 15 14.0085 13.0057 14.5 12.5',
  d2: 'M5 19H19.0001',
  d3: 'M4 19C4 18.4477 4.44772 18 5 18H19.0001C19.5524 18 20.0001 18.4477 20.0001 19C20.0001 19.5523 19.5524 20 19.0001 20H5C4.44772 20 4 19.5523 4 19Z',
  d4: 'M13.0059 5C13.0059 4.44772 12.5581 4 12.0059 4C11.4536 4 11.0059 4.44772 11.0059 5L11.0059 11.5L10.4116 11.5C10.236 11.4999 10.0203 11.4997 9.84387 11.5218L9.84053 11.5222C9.71408 11.538 9.13804 11.6098 8.86368 12.1754C8.58872 12.7423 8.89065 13.2424 8.95597 13.3506L8.95841 13.3546C9.05062 13.5076 9.18477 13.6785 9.29511 13.8191L9.31885 13.8493C9.61348 14.2252 9.99545 14.7094 10.3759 15.1004C10.5657 15.2955 10.783 15.4967 11.0139 15.6556C11.2191 15.7968 11.5693 16 12 16C12.4307 16 12.7809 15.7968 12.9861 15.6556C13.217 15.4967 13.4343 15.2955 13.6241 15.1004C14.0046 14.7094 14.3865 14.2252 14.6812 13.8493L14.7049 13.8191C14.8152 13.6785 14.9494 13.5077 15.0416 13.3546L15.044 13.3506C15.1093 13.2424 15.4113 12.7422 15.1363 12.1754C14.862 11.6098 14.2859 11.538 14.1595 11.5222L14.1561 11.5218C13.9797 11.4997 13.764 11.4999 13.5884 11.5L13.0059 11.5L13.0059 5Z',
  d5: 'M12 5L12 14.6372M9 11.9998L12 15L15 11.9998',
  d6: 'M13.0001 4.5L13.0001 12.0857L14.293 10.7927L15.7072 12.2069L12.0001 15.9143L8.29297 12.2069L9.70723 10.7927L11.0001 12.0857L11.0001 4.5H13.0001Z',
  d7: 'M19.0001 19.5H5V17.5H19.0001V19.5Z',
};

export const IconDownload05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-05-stroke-rounded IconDownload05StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconDownload05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-05-duotone-rounded IconDownload05DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconDownload05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-05-twotone-rounded IconDownload05TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="0.3" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDownload05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-05-solid-rounded IconDownload05SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconDownload05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-05-bulk-rounded IconDownload05BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDownload05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-05-stroke-sharp IconDownload05StrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconDownload05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-05-solid-sharp IconDownload05SolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfDownload05: TheIconSelfPack = {
  name: 'Download05',
  StrokeRounded: IconDownload05StrokeRounded,
  DuotoneRounded: IconDownload05DuotoneRounded,
  TwotoneRounded: IconDownload05TwotoneRounded,
  SolidRounded: IconDownload05SolidRounded,
  BulkRounded: IconDownload05BulkRounded,
  StrokeSharp: IconDownload05StrokeSharp,
  SolidSharp: IconDownload05SolidSharp,
};