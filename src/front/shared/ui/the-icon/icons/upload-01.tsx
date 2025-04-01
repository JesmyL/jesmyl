import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.09502 10C3.03241 10.457 3 10.9245 3 11.4C3 16.7019 7.02944 21 12 21C16.9706 21 21 16.7019 21 11.4C21 10.9245 20.9676 10.457 20.905 10',
  d2: 'M12 3L12 13M12 3C11.2998 3 9.99153 4.9943 9.5 5.5M12 3C12.7002 3 14.0085 4.9943 14.5 5.5',
  d3: 'M12 21C16.9706 21 21 16.7019 21 11.4C21 10.9245 20.9676 10.457 20.905 10H3.09502C3.03241 10.457 3 10.9245 3 11.4C3 16.7019 7.02944 21 12 21Z',
  d4: 'M3.23073 9.00937C3.7779 9.08432 4.16072 9.58866 4.08576 10.1358C4.02931 10.548 4 10.9701 4 11.4001C4 16.2115 7.64154 20.0001 12 20.0001C16.3585 20.0001 20 16.2115 20 11.4001C20 10.9701 19.9707 10.5479 19.9142 10.1358C19.8393 9.58866 20.2221 9.08432 20.7693 9.00937C21.3164 8.93442 21.8208 9.31723 21.8957 9.86441C21.9645 10.3663 22 10.8791 22 11.4001C22 17.1926 17.5827 22.0001 12 22.0001C6.41734 22.0001 2 17.1926 2 11.4001C2 10.8791 2.03552 10.3663 2.10427 9.86441C2.17922 9.31723 2.68355 8.93442 3.23073 9.00937Z',
  d5: 'M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13L11 6.49996L10.4057 6.49998C10.2301 6.50011 10.0145 6.50026 9.83801 6.47819L9.83467 6.47777C9.70822 6.462 9.13218 6.39017 8.85782 5.82457C8.58286 5.25775 8.88479 4.75761 8.95011 4.6494L8.95255 4.64537C9.04476 4.49235 9.17891 4.32147 9.28925 4.18092L9.31299 4.15067C9.60762 3.77485 9.98959 3.29063 10.37 2.89962C10.5598 2.70451 10.7771 2.50328 11.008 2.34443C11.2133 2.20323 11.5635 1.99996 11.9941 1.99996C12.4248 1.99996 12.775 2.20323 12.9803 2.34443C13.2112 2.50328 13.4284 2.70451 13.6183 2.89962C13.9987 3.29063 14.3807 3.77485 14.6753 4.15067L14.699 4.18091C14.8094 4.32147 14.9435 4.49235 15.0357 4.64537L15.0382 4.64941C15.1035 4.75761 15.4054 5.25775 15.1305 5.82457C14.8561 6.39017 14.2801 6.46201 14.1536 6.47777L14.1503 6.47819C13.9738 6.50026 13.7582 6.50011 13.5825 6.49998L13 6.49996L13 13Z',
  d6: 'M12 13L12 3.33585M9 6.00021L12 3L15 6.00021',
  d7: 'M20 11.4C20 10.9699 19.9707 10.5478 19.9142 10.1357L21.8957 9.86429C21.9645 10.3662 22 10.879 22 11.4C22 17.1924 17.5827 22 12 22C6.41734 22 2 17.1924 2 11.4C2 10.879 2.03552 10.3662 2.10427 9.86429L4.08576 10.1357C4.02931 10.5478 4 10.9699 4 11.4C4 16.2114 7.64154 20 12 20C16.3585 20 20 16.2114 20 11.4Z',
  d8: 'M12.0001 2L15.7072 5.7074L14.293 7.12156L13.0001 5.8286L13.0001 13.4143H11.0001L11.0001 5.8286L9.70723 7.12156L8.29297 5.7074L12.0001 2Z',
};

export const IconUpload01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-01-stroke-rounded IconUpload01StrokeRounded"
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

export const IconUpload01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-01-duotone-rounded IconUpload01DuotoneRounded"
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

export const IconUpload01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-01-twotone-rounded IconUpload01TwotoneRounded"
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

export const IconUpload01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-01-solid-rounded IconUpload01SolidRounded"
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

export const IconUpload01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-01-bulk-rounded IconUpload01BulkRounded"
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

export const IconUpload01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-01-stroke-sharp IconUpload01StrokeSharp"
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

export const IconUpload01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="upload-01-solid-sharp IconUpload01SolidSharp"
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

export const iconPackOfUpload01: TheIconSelfPack = {
  name: 'Upload01',
  StrokeRounded: IconUpload01StrokeRounded,
  DuotoneRounded: IconUpload01DuotoneRounded,
  TwotoneRounded: IconUpload01TwotoneRounded,
  SolidRounded: IconUpload01SolidRounded,
  BulkRounded: IconUpload01BulkRounded,
  StrokeSharp: IconUpload01StrokeSharp,
  SolidSharp: IconUpload01SolidSharp,
};