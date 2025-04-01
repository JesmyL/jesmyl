import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4.5 7.5H16.5C18.3856 7.5 19.3284 7.5 19.9142 8.08579C20.5 8.67157 20.5 9.61438 20.5 11.5V12.5M16.5 10.5H4.5M16.5 13.5H4.5M16.5 16.5H4.5',
  d2: 'M15.5002 19.5002H5.50018C4.39561 19.5002 3.50018 20.3957 3.50018 21.5002H17.5002C17.5002 20.3957 16.6048 19.5002 15.5002 19.5002Z',
  d3: 'M5.49988 4.49969L15.4999 4.49969C16.6044 4.49969 17.4999 3.60426 17.4999 2.49969L3.49988 2.49969C3.49988 3.60426 4.39531 4.49969 5.49988 4.49969Z',
  d4: 'M15.4999 19.4997H5.49988C4.39531 19.4997 3.49988 20.3951 3.49988 21.4997H17.4999C17.4999 20.3951 16.6044 19.4997 15.4999 19.4997Z',
  d5: 'M18.5946 8.31654C18.1116 8.2516 17.464 8.25 16.5 8.25H4.5C4.08579 8.25 3.75 7.91422 3.75 7.5C3.75 7.08579 4.08579 6.75 4.5 6.75L16.552 6.75H16.552C17.4505 6.74997 18.1997 6.74995 18.7945 6.82991C19.4223 6.91432 19.9891 7.09999 20.4445 7.55546C20.9 8.01093 21.0857 8.57773 21.1701 9.20552C21.2501 9.80031 21.25 10.5495 21.25 11.448V12.5C21.25 12.9142 20.9142 13.25 20.5 13.25C20.0858 13.25 19.75 12.9142 19.75 12.5V11.5C19.75 10.536 19.7484 9.88843 19.6835 9.40539C19.6214 8.94393 19.5142 8.74644 19.3839 8.61612C19.2536 8.4858 19.0561 8.37858 18.5946 8.31654Z',
  d6: 'M3.75 10.5C3.75 10.0858 4.08579 9.75 4.5 9.75H16.5C16.9142 9.75 17.25 10.0858 17.25 10.5C17.25 10.9142 16.9142 11.25 16.5 11.25H4.5C4.08579 11.25 3.75 10.9142 3.75 10.5Z',
  d7: 'M3.75 13.5C3.75 13.0858 4.08579 12.75 4.5 12.75H16.5C16.9142 12.75 17.25 13.0858 17.25 13.5C17.25 13.9142 16.9142 14.25 16.5 14.25H4.5C4.08579 14.25 3.75 13.9142 3.75 13.5Z',
  d8: 'M3.75 16.5C3.75 16.0858 4.08579 15.75 4.5 15.75H16.5C16.9142 15.75 17.25 16.0858 17.25 16.5C17.25 16.9142 16.9142 17.25 16.5 17.25H4.5C4.08579 17.25 3.75 16.9142 3.75 16.5Z',
  d9: 'M2.75018 21.5002C2.75018 19.9815 3.9814 18.7502 5.50018 18.7502H15.5002C17.019 18.7502 18.2502 19.9815 18.2502 21.5002C18.2502 21.9145 17.9144 22.2502 17.5002 22.2502H3.50018C3.08597 22.2502 2.75018 21.9145 2.75018 21.5002Z',
  d10: 'M18.2499 2.49969C18.2499 4.01848 17.0187 5.24969 15.4999 5.24969L5.49988 5.24969C3.9811 5.24969 2.74988 4.01848 2.74988 2.49969C2.74988 2.08548 3.08567 1.74969 3.49988 1.74969L17.4999 1.74969C17.9141 1.74969 18.2499 2.08548 18.2499 2.49969Z',
  d11: 'M4.5 7.5H18.5C19.6046 7.5 20.5 8.39543 20.5 9.5V12.5M16.5 10.5H4.5M16.5 13.5H4.5M16.5 16.5H4.5',
  d12: 'M15.5001 19.5002H5.50012C4.39555 19.5002 3.50012 20.3957 3.50012 21.5002H17.5001C17.5001 20.3957 16.6047 19.5002 15.5001 19.5002Z',
  d13: 'M18.5 6.75C20.0188 6.75 21.25 7.98122 21.25 9.5V13.25H19.75V9.5C19.75 8.80964 19.1904 8.25 18.5 8.25H3.75V6.75H18.5Z',
  d14: 'M17.25 9.75V11.25H3.75V9.75H17.25Z',
  d15: 'M17.25 12.75V14.25H3.75V12.75H17.25Z',
  d16: 'M17.25 15.75V17.25H3.75V15.75H17.25Z',
  d17: 'M2.75012 21.5002C2.75012 19.9815 3.98134 18.7502 5.50012 18.7502H15.5001C17.0189 18.7502 18.2501 19.9815 18.2501 21.5002V22.2502H2.75012V21.5002Z',
  d18: 'M18.2499 2.49969C18.2499 4.01848 17.0187 5.24969 15.4999 5.24969L5.49988 5.24969C3.9811 5.24969 2.74988 4.01848 2.74988 2.49969L2.74988 1.74969L18.2499 1.74969L18.2499 2.49969Z',
};

export const IconThreadStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thread-stroke-rounded IconThreadStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconThreadDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thread-duotone-rounded IconThreadDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconThreadTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thread-twotone-rounded IconThreadTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconThreadSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thread-solid-rounded IconThreadSolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconThreadBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thread-bulk-rounded IconThreadBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconThreadStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thread-stroke-sharp IconThreadStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconThreadSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thread-solid-sharp IconThreadSolidSharp"
    >
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
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfThread: TheIconSelfPack = {
  name: 'Thread',
  StrokeRounded: IconThreadStrokeRounded,
  DuotoneRounded: IconThreadDuotoneRounded,
  TwotoneRounded: IconThreadTwotoneRounded,
  SolidRounded: IconThreadSolidRounded,
  BulkRounded: IconThreadBulkRounded,
  StrokeSharp: IconThreadStrokeSharp,
  SolidSharp: IconThreadSolidSharp,
};