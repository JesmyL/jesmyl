import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M15.5 9.17157C13.8987 7.60948 11.3024 7.60948 9.70101 9.17157C8.09966 10.7337 8.09966 13.2663 9.70101 14.8284C11.3024 16.3905 13.8987 16.3905 15.5 14.8284',
  d3: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM16.1983 8.45575C14.2085 6.51475 10.9925 6.51475 9.00273 8.45575C6.99909 10.4103 6.99909 13.5897 9.00273 15.5443C10.9925 17.4852 14.2085 17.4852 16.1983 15.5443C16.5936 15.1586 16.6015 14.5255 16.2158 14.1301C15.8302 13.7348 15.1971 13.727 14.8017 14.1126C13.5888 15.2958 11.6122 15.2958 10.3993 14.1126C9.20024 12.9429 9.20024 11.0571 10.3993 9.8874C11.6122 8.7042 13.5888 8.7042 14.8017 9.8874C15.1971 10.273 15.8302 10.2652 16.2158 9.86985C16.6015 9.47451 16.5936 8.8414 16.1983 8.45575Z',
  d4: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d5: 'M9.00273 8.45575C10.9925 6.51475 14.2085 6.51475 16.1983 8.45575C16.5936 8.8414 16.6015 9.47451 16.2158 9.86985C15.8302 10.2652 15.1971 10.273 14.8017 9.8874C13.5888 8.7042 11.6122 8.7042 10.3993 9.8874C9.20024 11.0571 9.20024 12.9429 10.3993 14.1126C11.6122 15.2958 13.5888 15.2958 14.8017 14.1126C15.1971 13.727 15.8302 13.7348 16.2158 14.1301C16.6015 14.5255 16.5936 15.1586 16.1983 15.5443C14.2085 17.4852 10.9925 17.4852 9.00273 15.5443C6.99909 13.5897 6.99909 10.4103 9.00273 8.45575Z',
  d6: 'M21 21V3H3V21L21 21Z',
  d7: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75L21 21.75C21.1989 21.75 21.3897 21.671 21.5303 21.5303C21.671 21.3897 21.75 21.1989 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H3ZM16.1983 8.45575C14.2085 6.51475 10.9925 6.51475 9.00273 8.45575C6.99909 10.4103 6.99909 13.5897 9.00273 15.5443C10.9925 17.4852 14.2085 17.4852 16.1983 15.5443L14.8017 14.1126C13.5888 15.2958 11.6122 15.2958 10.3993 14.1126C9.20024 12.9429 9.20024 11.0571 10.3993 9.8874C11.6122 8.7042 13.5888 8.7042 14.8017 9.8874L16.1983 8.45575Z',
};

export const IconCProgrammingStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-programming-stroke-rounded IconCProgrammingStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconCProgrammingDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-programming-duotone-rounded IconCProgrammingDuotoneRounded"
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
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCProgrammingTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-programming-twotone-rounded IconCProgrammingTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCProgrammingSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-programming-solid-rounded IconCProgrammingSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCProgrammingBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-programming-bulk-rounded IconCProgrammingBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconCProgrammingStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-programming-stroke-sharp IconCProgrammingStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCProgrammingSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-programming-solid-sharp IconCProgrammingSolidSharp"
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

export const iconPackOfCProgramming: TheIconSelfPack = {
  name: 'CProgramming',
  StrokeRounded: IconCProgrammingStrokeRounded,
  DuotoneRounded: IconCProgrammingDuotoneRounded,
  TwotoneRounded: IconCProgrammingTwotoneRounded,
  SolidRounded: IconCProgrammingSolidRounded,
  BulkRounded: IconCProgrammingBulkRounded,
  StrokeSharp: IconCProgrammingStrokeSharp,
  SolidSharp: IconCProgrammingSolidSharp,
};