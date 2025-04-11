import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 16L12 8M12 16C11.2998 16 9.99153 14.0057 9.5 13.5M12 16C12.7002 16 14.0085 14.0057 14.5 13.5',
  d2: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM13.0059 8C13.0059 7.44772 12.5581 7 12.0059 7C11.4536 7 11.0059 7.44772 11.0059 8V12.5L10.4116 12.5C10.236 12.4999 10.0203 12.4997 9.84387 12.5218L9.84053 12.5222C9.71408 12.538 9.13804 12.6098 8.86368 13.1754C8.58872 13.7423 8.89065 14.2424 8.95597 14.3506L8.95841 14.3546C9.05062 14.5076 9.18477 14.6785 9.29511 14.8191L9.31885 14.8493C9.61348 15.2252 9.99545 15.7094 10.3759 16.1004C10.5657 16.2955 10.783 16.4967 11.0139 16.6556C11.2191 16.7968 11.5693 17 12 17C12.4307 17 12.7809 16.7968 12.9861 16.6556C13.217 16.4967 13.4343 16.2955 13.6241 16.1004C14.0046 15.7094 14.3865 15.2252 14.6812 14.8493L14.7049 14.8191C14.8152 14.6785 14.9494 14.5077 15.0416 14.3546L15.044 14.3506C15.1093 14.2424 15.4113 13.7422 15.1363 13.1754C14.862 12.6098 14.2859 12.538 14.1595 12.5222L14.1561 12.5218C13.9797 12.4997 13.764 12.4999 13.5884 12.5L13.0059 12.5V8Z',
  d3: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z',
  d4: 'M12.0059 7C12.5581 7 13.0059 7.44772 13.0059 8V12.5L13.5884 12.5C13.764 12.4999 13.9797 12.4997 14.1561 12.5218L14.1595 12.5222C14.2859 12.538 14.862 12.6098 15.1363 13.1754C15.4113 13.7422 15.1093 14.2424 15.044 14.3506L15.0416 14.3546C14.9494 14.5077 14.8152 14.6785 14.7049 14.8191L14.6812 14.8493C14.3865 15.2252 14.0046 15.7094 13.6241 16.1004C13.4343 16.2955 13.217 16.4967 12.9861 16.6556C12.7809 16.7968 12.4307 17 12 17C11.5693 17 11.2191 16.7968 11.0139 16.6556C10.783 16.4967 10.5657 16.2955 10.3759 16.1004C9.99545 15.7094 9.61348 15.2252 9.31885 14.8493L9.29511 14.8191C9.18477 14.6785 9.05062 14.5076 8.95841 14.3546L8.95597 14.3506C8.89065 14.2424 8.58872 13.7423 8.86368 13.1754C9.13804 12.6098 9.71408 12.538 9.84053 12.5222L9.84387 12.5218C10.0203 12.4997 10.236 12.4999 10.4116 12.5L11.0059 12.5V8C11.0059 7.44772 11.4536 7 12.0059 7Z',
  d5: 'M12 8L12 15.5952M9 12.9998L12 16L15 12.9998',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.7491 13.6589L12.7491 7.46967H11.2491V13.6589L9.52945 11.9391L8.46875 12.9998L11.9991 16.5304L15.5294 12.9998L14.4688 11.9391L12.7491 13.6589Z',
};

export const IconDownloadCircle01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DownloadCircle01 StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDownloadCircle01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DownloadCircle01 DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDownloadCircle01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DownloadCircle01 TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDownloadCircle01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DownloadCircle01 SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDownloadCircle01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DownloadCircle01 BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDownloadCircle01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DownloadCircle01 StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d5}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconDownloadCircle01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DownloadCircle01 SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDownloadCircle01: TheIconSelfPack = [
  'DownloadCircle01',
  IconDownloadCircle01StrokeRounded,
  IconDownloadCircle01DuotoneRounded,
  IconDownloadCircle01TwotoneRounded,
  IconDownloadCircle01SolidRounded,
  IconDownloadCircle01BulkRounded,
  IconDownloadCircle01StrokeSharp,
  IconDownloadCircle01SolidSharp,
];