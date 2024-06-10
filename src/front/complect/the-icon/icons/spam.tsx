import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.3107 3H11.6893C9.25367 3 8.03584 3 7.03946 3.55252C6.04307 4.10503 5.45164 5.10831 4.26878 7.11486L3.67928 8.11486C2.55976 10.0139 2 10.9635 2 12C2 13.0365 2.55976 13.9861 3.67928 15.8851L4.26878 16.8851C5.45164 18.8917 6.04307 19.895 7.03946 20.4475C8.03584 21 9.25367 21 11.6893 21H12.3107C14.7463 21 15.9642 21 16.9605 20.4475C17.9569 19.895 18.5484 18.8917 19.7312 16.8851L20.3207 15.8851C21.4402 13.9861 22 13.0365 22 12C22 10.9635 21.4402 10.0139 20.3207 8.11485L19.7312 7.11486C18.5484 5.10831 17.9569 4.10503 16.9605 3.55252C15.9642 3 14.7463 3 12.3107 3Z',
  d2: 'M11.992 16H12.001',
  d3: 'M11.9922 13L11.9922 8',
  d4: 'M12.3478 2C13.5342 1.99999 14.477 1.99999 15.2456 2.07422C16.0372 2.15067 16.703 2.30987 17.3243 2.66319C17.9478 3.01783 18.4207 3.50789 18.8799 4.14738C19.323 4.76451 19.7828 5.56464 20.3573 6.56405L20.9864 7.65875L20.9865 7.6588C21.5296 8.60371 21.9652 9.36157 22.2607 10.0161C22.5667 10.6937 22.75 11.3171 22.75 12C22.75 12.6829 22.5667 13.3063 22.2607 13.9839C21.9652 14.6385 21.5296 15.3963 20.9864 16.3413L20.3572 17.436C19.7828 18.4354 19.323 19.2355 18.8799 19.8526C18.4207 20.4921 17.9478 20.9822 17.3243 21.3368C16.703 21.6901 16.0372 21.8493 15.2456 21.9258C14.477 22 13.5342 22 12.3478 22H11.6523C10.4659 22 9.52305 22 8.75436 21.9258C7.96284 21.8493 7.29698 21.6901 6.67574 21.3368C6.05218 20.9822 5.57928 20.4921 5.12013 19.8526C4.67705 19.2355 4.21718 18.4354 3.64277 17.436L3.64274 17.4359L3.01358 16.3413C2.47044 15.3963 2.03482 14.6385 1.73926 13.9839C1.43332 13.3063 1.25 12.6829 1.25 12C1.25 11.3171 1.43332 10.6937 1.73926 10.0161C2.03482 9.36156 2.47044 8.60367 3.01357 7.65873L3.64274 6.56407C4.21716 5.56465 4.67704 4.76451 5.12013 4.14738C5.57928 3.50789 6.05218 3.01783 6.67574 2.66319C7.29698 2.30987 7.96284 2.15067 8.75436 2.07422C9.52305 1.99999 10.4658 1.99999 11.6522 2L12.3478 2H12.3478ZM11 16C11 15.4477 11.4457 15 11.9955 15H12.0045C12.5543 15 13 15.4477 13 16C13 16.5523 12.5543 17 12.0045 17H11.9955C11.4457 17 11 16.5523 11 16ZM11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12V8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V12Z',
  d5: 'M12.3478 2C13.5342 1.99999 14.477 1.99999 15.2456 2.07422C16.0372 2.15067 16.703 2.30987 17.3243 2.66319C17.9478 3.01783 18.4207 3.50789 18.8799 4.14738C19.323 4.76451 19.7828 5.56464 20.3573 6.56405L20.9864 7.65875L20.9865 7.6588C21.5296 8.60371 21.9652 9.36157 22.2607 10.0161C22.5667 10.6937 22.75 11.3171 22.75 12C22.75 12.6829 22.5667 13.3063 22.2607 13.9839C21.9652 14.6385 21.5296 15.3963 20.9864 16.3413L20.3572 17.436C19.7828 18.4354 19.323 19.2355 18.8799 19.8526C18.4207 20.4921 17.9478 20.9822 17.3243 21.3368C16.703 21.6901 16.0372 21.8493 15.2456 21.9258C14.477 22 13.5342 22 12.3478 22H11.6523C10.4659 22 9.52305 22 8.75436 21.9258C7.96284 21.8493 7.29698 21.6901 6.67574 21.3368C6.05218 20.9822 5.57928 20.4921 5.12013 19.8526C4.67705 19.2355 4.21718 18.4354 3.64277 17.436L3.64274 17.4359L3.01358 16.3413C2.47044 15.3963 2.03482 14.6385 1.73926 13.9839C1.43332 13.3063 1.25 12.6829 1.25 12C1.25 11.3171 1.43332 10.6937 1.73926 10.0161C2.03482 9.36156 2.47044 8.60367 3.01357 7.65873L3.64274 6.56407C4.21716 5.56465 4.67704 4.76451 5.12013 4.14738C5.57928 3.50789 6.05218 3.01783 6.67574 2.66319C7.29698 2.30987 7.96284 2.15067 8.75436 2.07422C9.52305 1.99999 10.4658 1.99999 11.6522 2H12.3478H12.3478Z',
  d6: 'M11 16C11 15.4477 11.4457 15 11.9955 15H12.0045C12.5543 15 13 15.4477 13 16C13 16.5523 12.5543 17 12.0045 17H11.9955C11.4457 17 11 16.5523 11 16Z',
  d7: 'M12 13C11.4477 13 11 12.5523 11 12L11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8L13 12C13 12.5523 12.5523 13 12 13Z',
  d8: 'M22 12L17.5 3H6.5L2 12L6.5 21H17.5L22 12Z',
  d9: 'M11.9922 14L11.9922 7',
  d10: 'M6.08518 2.25H17.9148L22.75 12L17.9148 21.75H6.08518L1.25 12L6.08518 2.25ZM11.248 15.25H12.757V16.75H11.248V15.25ZM12.75 14V7H11.25V14H12.75Z',
};

export const IconSpamStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spam-stroke-rounded IconSpamStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconSpamDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spam-duotone-rounded IconSpamDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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
    </TheIconWrapper>
  );
};

export const IconSpamTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spam-twotone-rounded IconSpamTwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpamSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spam-solid-rounded IconSpamSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSpamBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spam-bulk-rounded IconSpamBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
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

export const IconSpamStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spam-stroke-sharp IconSpamStrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSpamSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="spam-solid-sharp IconSpamSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSpam: TheIconSelfPack = {
  name: 'Spam',
  StrokeRounded: IconSpamStrokeRounded,
  DuotoneRounded: IconSpamDuotoneRounded,
  TwotoneRounded: IconSpamTwotoneRounded,
  SolidRounded: IconSpamSolidRounded,
  BulkRounded: IconSpamBulkRounded,
  StrokeSharp: IconSpamStrokeSharp,
  SolidSharp: IconSpamSolidSharp,
};