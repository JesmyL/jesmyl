import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 21C20.7284 21.2035 20.4288 21.3807 20.1062 21.5273C19.0659 22 17.6917 22 14.9432 22H9.05683C6.30834 22 4.9341 22 3.89382 21.5273C3.57124 21.3807 3.27158 21.2035 3 21',
  d2: 'M2 10C2 6.46252 2 4.69377 3.0528 3.5129C3.22119 3.32403 3.40678 3.14935 3.60746 2.99087C4.86213 2 6.74142 2 10.5 2H13.5C17.2586 2 19.1379 2 20.3925 2.99087C20.5932 3.14935 20.7788 3.32403 20.9472 3.5129C22 4.69377 22 6.46252 22 10C22 13.5375 22 15.3062 20.9472 16.4871C20.7788 16.676 20.5932 16.8506 20.3925 17.0091C19.1379 18 17.2586 18 13.5 18H10.5C6.74142 18 4.86213 18 3.60746 17.0091C3.40678 16.8506 3.22119 16.676 3.0528 16.4871C2 15.3062 2 13.5375 2 10Z',
  d3: 'M18.5 10H18.491',
  d4: 'M5.5 10H5.49102',
  d5: 'M14.551 10C14.551 11.3807 13.4317 12.5 12.051 12.5C10.6703 12.5 9.55099 11.3807 9.55099 10C9.55099 8.61929 10.6703 7.5 12.051 7.5C13.4317 7.5 14.551 8.61929 14.551 10Z',
  d6: 'M3.0528 3.5129C2 4.69377 2 6.46252 2 10C2 13.5375 2 15.3062 3.0528 16.4871C3.22119 16.676 3.40678 16.8506 3.60746 17.0091C4.86213 18 6.74142 18 10.5 18H13.5C17.2586 18 19.1379 18 20.3925 17.0091C20.5932 16.8506 20.7788 16.676 20.9472 16.4871C22 15.3062 22 13.5375 22 10C22 6.46252 22 4.69377 20.9472 3.5129C20.7788 3.32403 20.5932 3.14935 20.3925 2.99087C19.1379 2 17.2586 2 13.5 2H10.5C6.74142 2 4.86213 2 3.60746 2.99087C3.40678 3.14935 3.22119 3.32403 3.0528 3.5129ZM12.051 12.5C13.4317 12.5 14.551 11.3807 14.551 10C14.551 8.61929 13.4317 7.5 12.051 7.5C10.6703 7.5 9.55099 8.61929 9.55099 10C9.55099 11.3807 10.6703 12.5 12.051 12.5Z',
  d7: 'M17.9694 1.3786C16.8308 1.24998 15.3865 1.24999 13.5475 1.25H10.4525C8.61345 1.24999 7.16917 1.24998 6.03058 1.3786C4.86842 1.50988 3.926 1.78362 3.14263 2.40229C2.90811 2.58749 2.69068 2.79205 2.49298 3.0138C1.82681 3.76101 1.52932 4.66669 1.38763 5.77785C1.24997 6.85727 1.24999 8.22325 1.25 9.94726V9.94727V10.0527V10.0527C1.24999 11.7768 1.24997 13.1427 1.38763 14.2222C1.52932 15.3333 1.82681 16.239 2.49298 16.9862C2.69068 17.2079 2.90811 17.4125 3.14263 17.5977C3.926 18.2164 4.86842 18.4901 6.03058 18.6214C7.16917 18.75 8.61345 18.75 10.4525 18.75H13.5475C15.3866 18.75 16.8308 18.75 17.9694 18.6214C19.1316 18.4901 20.074 18.2164 20.8574 17.5977C21.0919 17.4125 21.3093 17.208 21.507 16.9862C22.1732 16.239 22.4707 15.3333 22.6124 14.2222C22.75 13.1427 22.75 11.7768 22.75 10.0528V9.94725C22.75 8.22325 22.75 6.85727 22.6124 5.77785C22.4707 4.66669 22.1732 3.76101 21.507 3.0138C21.3093 2.79205 21.0919 2.58749 20.8574 2.40229C20.074 1.78362 19.1316 1.50988 17.9694 1.3786ZM18.5 11C19.0523 11 19.5 10.5523 19.5 10C19.5 9.44772 19.0523 9 18.5 9H18.491C17.9387 9 17.491 9.44772 17.491 10C17.491 10.5523 17.9387 11 18.491 11H18.5ZM6.5 10C6.5 10.5523 6.05228 11 5.5 11H5.49102C4.93873 11 4.49102 10.5523 4.49102 10C4.49102 9.44772 4.93873 9 5.49102 9H5.5C6.05228 9 6.5 9.44772 6.5 10ZM12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7Z',
  d8: 'M2.19978 20.1504C2.53095 19.7084 3.15771 19.6186 3.59969 19.9498C3.81184 20.1087 4.04891 20.2494 4.30757 20.3669C4.67296 20.533 5.1423 20.6383 5.90693 20.6936C6.67963 20.7494 7.66799 20.7501 9.05689 20.7501H14.9432C16.3321 20.7501 17.3205 20.7494 18.0932 20.6936C18.8578 20.6383 19.3272 20.533 19.6925 20.3669C19.9512 20.2494 20.1883 20.1087 20.4004 19.9498C20.8424 19.6186 21.4692 19.7084 21.8003 20.1504C22.1315 20.5924 22.0417 21.2192 21.5997 21.5503C21.2687 21.7984 20.9064 22.0121 20.5199 22.1878C19.845 22.4944 19.1071 22.6255 18.2374 22.6884C17.3841 22.7501 16.3235 22.7501 14.9824 22.7501H9.01767C7.67664 22.7501 6.616 22.7501 5.76269 22.6884C4.89301 22.6255 4.15508 22.4944 3.48019 22.1878C3.09368 22.0121 2.73144 21.7984 2.40043 21.5503C1.95845 21.2192 1.86862 20.5924 2.19978 20.1504Z',
  d9: 'M13.5475 1.25C15.3865 1.24999 16.8308 1.24998 17.9694 1.3786C19.1316 1.50988 20.074 1.78362 20.8574 2.40229C21.0919 2.58749 21.3093 2.79205 21.507 3.0138C22.1732 3.76101 22.4707 4.66669 22.6124 5.77785C22.75 6.85727 22.75 8.22325 22.75 9.94725V10.0528C22.75 11.7768 22.75 13.1427 22.6124 14.2222C22.4707 15.3333 22.1732 16.239 21.507 16.9862C21.3093 17.208 21.0919 17.4125 20.8574 17.5977C20.074 18.2164 19.1316 18.4901 17.9694 18.6214C16.8308 18.75 15.3866 18.75 13.5475 18.75H10.4525C8.61345 18.75 7.16917 18.75 6.03058 18.6214C4.86842 18.4901 3.926 18.2164 3.14263 17.5977C2.90811 17.4125 2.69068 17.2079 2.49298 16.9862C1.82681 16.239 1.52932 15.3333 1.38763 14.2222C1.24997 13.1427 1.24999 11.7768 1.25 10.0527V10.0527V9.94727V9.94726C1.24999 8.22325 1.24997 6.85727 1.38763 5.77785C1.52932 4.66669 1.82681 3.76101 2.49298 3.0138C2.69068 2.79205 2.90811 2.58749 3.14263 2.40229C3.926 1.78362 4.86842 1.50988 6.03058 1.3786C7.16917 1.24998 8.61345 1.24999 10.4525 1.25H13.5475Z',
  d10: 'M19.5 10C19.5 10.5523 19.0523 11 18.5 11H18.491C17.9387 11 17.491 10.5523 17.491 10C17.491 9.44772 17.9387 9 18.491 9H18.5C19.0523 9 19.5 9.44772 19.5 10Z',
  d11: 'M6.5 10C6.5 10.5523 6.05228 11 5.5 11H5.49102C4.93873 11 4.49102 10.5523 4.49102 10C4.49102 9.44772 4.93873 9 5.49102 9H5.5C6.05228 9 6.5 9.44772 6.5 10Z',
  d12: 'M9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10Z',
  d13: 'M3 21L21 21',
  d14: 'M22 3H2V18H22V3Z',
  d15: 'M18.5 10.5H18.491',
  d16: 'M5.50928 10.5H5.5003',
  d17: 'M14.501 10.5C14.501 11.8807 13.3817 13 12.001 13C10.6203 13 9.50098 11.8807 9.50098 10.5C9.50098 9.11929 10.6203 8 12.001 8C13.3817 8 14.501 9.11929 14.501 10.5Z',
  d18: 'M3 20.25H21V21.75H3V20.25Z',
  d19: 'M2 2.25C1.58579 2.25 1.25 2.58579 1.25 3V18C1.25 18.4142 1.58579 18.75 2 18.75H22C22.4142 18.75 22.75 18.4142 22.75 18V3C22.75 2.58579 22.4142 2.25 22 2.25H2ZM17.491 11.5H19.5V9.5H17.491V11.5ZM6.50977 11.5H4.50078V9.5H6.50977V11.5ZM12 7.25C10.2051 7.25 8.75 8.70507 8.75 10.5C8.75 12.2949 10.2051 13.75 12 13.75C13.7949 13.75 15.25 12.2949 15.25 10.5C15.25 8.70507 13.7949 7.25 12 7.25Z',
};

export const IconCash01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-01-stroke-rounded IconCash01StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconCash01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-01-duotone-rounded IconCash01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
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
      />
    </TheIconWrapper>
  );
};

export const IconCash01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-01-twotone-rounded IconCash01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconCash01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-01-solid-rounded IconCash01SolidRounded"
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

export const IconCash01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-01-bulk-rounded IconCash01BulkRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCash01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-01-stroke-sharp IconCash01StrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCash01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-01-solid-sharp IconCash01SolidSharp"
    >
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

export const iconPackOfCash01: TheIconSelfPack = {
  name: 'Cash01',
  StrokeRounded: IconCash01StrokeRounded,
  DuotoneRounded: IconCash01DuotoneRounded,
  TwotoneRounded: IconCash01TwotoneRounded,
  SolidRounded: IconCash01SolidRounded,
  BulkRounded: IconCash01BulkRounded,
  StrokeSharp: IconCash01StrokeSharp,
  SolidSharp: IconCash01SolidSharp,
};