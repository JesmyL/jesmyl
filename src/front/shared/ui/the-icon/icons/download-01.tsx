import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.09502 10C3.03241 10.457 3 10.9245 3 11.4C3 16.7019 7.02944 21 12 21C16.9706 21 21 16.7019 21 11.4C21 10.9245 20.9676 10.457 20.905 10',
  d2: 'M12 13L12 3M12 13C11.2998 13 9.99153 11.0057 9.5 10.5M12 13C12.7002 13 14.0085 11.0057 14.5 10.5',
  d3: 'M12 21C16.9706 21 21 16.7019 21 11.4C21 10.9245 20.9676 10.457 20.905 10H3.09502C3.03241 10.457 3 10.9245 3 11.4C3 16.7019 7.02944 21 12 21Z',
  d4: 'M3.23073 9.00937C3.7779 9.08432 4.16072 9.58866 4.08576 10.1358C4.02931 10.548 4 10.9701 4 11.4001C4 16.2115 7.64154 20.0001 12 20.0001C16.3585 20.0001 20 16.2115 20 11.4001C20 10.9701 19.9707 10.5479 19.9142 10.1358C19.8393 9.58866 20.2221 9.08432 20.7693 9.00937C21.3164 8.93442 21.8208 9.31723 21.8957 9.86441C21.9645 10.3663 22 10.8791 22 11.4001C22 17.1926 17.5827 22.0001 12 22.0001C6.41734 22.0001 2 17.1926 2 11.4001C2 10.8791 2.03552 10.3663 2.10427 9.86441C2.17922 9.31723 2.68355 8.93442 3.23073 9.00937Z',
  d5: 'M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3L11 9.50004L10.4057 9.50002C10.2301 9.49989 10.0145 9.49974 9.83801 9.52181L9.83467 9.52223C9.70822 9.538 9.13218 9.60983 8.85782 10.1754C8.58286 10.7423 8.88479 11.2424 8.95011 11.3506L8.95255 11.3546C9.04476 11.5076 9.17891 11.6785 9.28925 11.8191L9.31299 11.8493C9.60762 12.2252 9.98959 12.7094 10.37 13.1004C10.5598 13.2955 10.7771 13.4967 11.008 13.6556C11.2133 13.7968 11.5635 14 11.9941 14C12.4248 14 12.775 13.7968 12.9803 13.6556C13.2112 13.4967 13.4284 13.2955 13.6183 13.1004C13.9987 12.7094 14.3807 12.2252 14.6753 11.8493L14.699 11.8191C14.8094 11.6785 14.9435 11.5077 15.0357 11.3546L15.0382 11.3506C15.1035 11.2424 15.4054 10.7422 15.1305 10.1754C14.8561 9.60983 14.2801 9.53799 14.1536 9.52223L14.1503 9.52181C13.9738 9.49974 13.7582 9.49989 13.5825 9.50002L13 9.50004L13 3Z',
  d6: 'M12 3L12 12.4961M9 9.99979L12 13L15 9.99979',
  d7: 'M20 10.9C20 10.4699 19.9707 10.0478 19.9142 9.63568L21.8957 9.36426C21.9645 9.86616 22 10.379 22 10.9C22 16.6924 17.5827 21.5 12 21.5C6.41734 21.5 2 16.6924 2 10.9C2 10.379 2.03552 9.86615 2.10427 9.36426L4.08576 9.63568C4.02931 10.0478 4 10.4699 4 10.9C4 15.7114 7.64154 19.5 12 19.5C16.3585 19.5 20 15.7114 20 10.9Z',
  d8: 'M13.0001 2.5L13.0001 10.0857L14.293 8.7927L15.7072 10.2069L12.0001 13.9143L8.29297 10.2069L9.70723 8.7927L11.0001 10.0857L11.0001 2.5H13.0001Z',
};

export const IconDownload01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-01-stroke-rounded IconDownload01StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconDownload01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-01-duotone-rounded IconDownload01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
    </TheIconWrapper>
  );
};

export const IconDownload01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-01-twotone-rounded IconDownload01TwotoneRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDownload01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-01-solid-rounded IconDownload01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDownload01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-01-bulk-rounded IconDownload01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDownload01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-01-stroke-sharp IconDownload01StrokeSharp"
    >
      <path 
        d={d.d1} 
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

export const IconDownload01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="download-01-solid-sharp IconDownload01SolidSharp"
    >
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

export const iconPackOfDownload01: TheIconSelfPack = {
  name: 'Download01',
  StrokeRounded: IconDownload01StrokeRounded,
  DuotoneRounded: IconDownload01DuotoneRounded,
  TwotoneRounded: IconDownload01TwotoneRounded,
  SolidRounded: IconDownload01SolidRounded,
  BulkRounded: IconDownload01BulkRounded,
  StrokeSharp: IconDownload01StrokeSharp,
  SolidSharp: IconDownload01SolidSharp,
};