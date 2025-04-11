import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 5L12 15M12 5C11.2998 5 9.99153 6.9943 9.5 7.5M12 5C12.7002 5 14.0085 6.9943 14.5 7.5',
  d2: 'M5 19H19.0001',
  d3: 'M4 5C4 5.55228 4.44772 6 5 6H19.0001C19.5524 6 20.0001 5.55228 20.0001 5C20.0001 4.44772 19.5524 4 19.0001 4H5C4.44772 4 4 4.44772 4 5Z',
  d4: 'M13.0059 19C13.0059 19.5523 12.5581 20 12.0059 20C11.4536 20 11.0059 19.5523 11.0059 19L11.0059 12.5L10.4116 12.5C10.236 12.5001 10.0203 12.5003 9.84387 12.4782L9.84053 12.4778C9.71408 12.462 9.13804 12.3902 8.86368 11.8246C8.58872 11.2577 8.89065 10.7576 8.95597 10.6494L8.95841 10.6454C9.05062 10.4924 9.18477 10.3215 9.29511 10.1809L9.31885 10.1507C9.61348 9.77485 9.99545 9.29063 10.3759 8.89962C10.5657 8.70451 10.783 8.50328 11.0139 8.34443C11.2191 8.20323 11.5693 7.99996 12 7.99996C12.4307 7.99996 12.7809 8.20323 12.9861 8.34443C13.217 8.50328 13.4343 8.70451 13.6241 8.89962C14.0046 9.29063 14.3865 9.77485 14.6812 10.1507L14.7049 10.1809C14.8152 10.3215 14.9494 10.4923 15.0416 10.6454L15.044 10.6494C15.1093 10.7576 15.4113 11.2578 15.1363 11.8246C14.862 12.3902 14.2859 12.462 14.1595 12.4778L14.1561 12.4782C13.9797 12.5003 13.764 12.5001 13.5884 12.5L13.0059 12.5L13.0059 19Z',
  d5: 'M12 15L12 5.2727M9 8.00021L12 5L15 8.00021',
  d6: 'M12.0001 3.75L15.7072 7.4574L14.293 8.87156L13.0001 7.5786L13.0001 15.1643H11.0001L11.0001 7.5786L9.70723 8.87156L8.29297 7.4574L12.0001 3.75Z',
  d7: 'M19.0001 20.25H5V18.25H19.0001V20.25Z',
};

export const IconUpload05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Upload05 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUpload05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Upload05 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUpload05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Upload05 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUpload05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Upload05 SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconUpload05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Upload05 BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconUpload05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Upload05 StrokeSharp"
    >
      <path 
        d={d.d5}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconUpload05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Upload05 SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUpload05: TheIconSelfPack = [
  'Upload05',
  IconUpload05StrokeRounded,
  IconUpload05DuotoneRounded,
  IconUpload05TwotoneRounded,
  IconUpload05SolidRounded,
  IconUpload05BulkRounded,
  IconUpload05StrokeSharp,
  IconUpload05SolidSharp,
];