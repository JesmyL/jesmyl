import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.5 10.5C9.99153 9.9943 11.2998 8 12 8M14.5 10.5C14.0085 9.9943 12.7002 8 12 8M12 8V16',
  d2: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d3: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM12 17C12.5523 17 13 16.5523 13 16V11.5H13.162C13.4524 11.5001 13.7597 11.5002 14.0022 11.4712C14.179 11.45 14.8295 11.3702 15.1296 10.7613C15.43 10.1519 15.0851 9.60918 14.9914 9.46263C14.8625 9.26085 14.6695 9.02819 14.4869 8.80808L14.4555 8.77028C14.168 8.42352 13.8257 8.02882 13.4824 7.71482C13.311 7.55802 13.1127 7.39647 12.8974 7.26884C12.6978 7.15052 12.3826 7 12 7C11.6174 7 11.3022 7.15052 11.1026 7.26884C10.8873 7.39647 10.689 7.55802 10.5176 7.71482C10.1743 8.02882 9.83196 8.42352 9.54449 8.77029L9.51315 8.80807C9.33054 9.02819 9.13753 9.26085 9.00859 9.46263C8.91494 9.60918 8.57002 10.1519 8.87038 10.7613C9.1705 11.3702 9.82103 11.45 9.99783 11.4712C10.2403 11.5002 10.5476 11.5001 10.838 11.5H11V16C11 16.5523 11.4477 17 12 17Z',
  d4: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d5: 'M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11.5H10.838C10.5476 11.5001 10.2403 11.5002 9.99783 11.4712C9.82103 11.45 9.1705 11.3702 8.87038 10.7613C8.57002 10.1519 8.91494 9.60918 9.00859 9.46263C9.13753 9.26085 9.33054 9.02819 9.51315 8.80807L9.54449 8.77029C9.83196 8.42352 10.1743 8.02882 10.5176 7.71482C10.689 7.55802 10.8873 7.39647 11.1026 7.26884C11.3022 7.15052 11.6174 7 12 7C12.3826 7 12.6978 7.15052 12.8974 7.26884C13.1127 7.39647 13.311 7.55802 13.4824 7.71482C13.8257 8.02882 14.168 8.42352 14.4555 8.77028L14.4869 8.80808C14.6695 9.02819 14.8625 9.26085 14.9914 9.46263C15.0851 9.60918 15.43 10.1519 15.1296 10.7613C14.8295 11.3702 14.179 11.45 14.0022 11.4712C13.7597 11.5002 13.4524 11.5001 13.162 11.5H13V16Z',
  d6: 'M12.0004 16V8.442M15 11L12.0004 8L9 11',
  d7: 'M21 3V21H3V3H21Z',
  d8: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H3ZM15.5294 10.4697L11.9991 6.93933L8.46875 10.4697L9.52941 11.5303L11.2491 9.81065V16H12.7491V9.81065L14.4688 11.5303L15.5294 10.4697Z',
};

export const IconSquareArrowUp02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-02-stroke-rounded IconSquareArrowUp02StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconSquareArrowUp02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-02-duotone-rounded IconSquareArrowUp02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
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
      />
    </TheIconWrapper>
  );
};

export const IconSquareArrowUp02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-02-twotone-rounded IconSquareArrowUp02TwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconSquareArrowUp02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-02-solid-rounded IconSquareArrowUp02SolidRounded"
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

export const IconSquareArrowUp02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-02-bulk-rounded IconSquareArrowUp02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareArrowUp02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-02-stroke-sharp IconSquareArrowUp02StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareArrowUp02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-02-solid-sharp IconSquareArrowUp02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSquareArrowUp02: TheIconSelfPack = {
  name: 'SquareArrowUp02',
  StrokeRounded: IconSquareArrowUp02StrokeRounded,
  DuotoneRounded: IconSquareArrowUp02DuotoneRounded,
  TwotoneRounded: IconSquareArrowUp02TwotoneRounded,
  SolidRounded: IconSquareArrowUp02SolidRounded,
  BulkRounded: IconSquareArrowUp02BulkRounded,
  StrokeSharp: IconSquareArrowUp02StrokeSharp,
  SolidSharp: IconSquareArrowUp02SolidSharp,
};