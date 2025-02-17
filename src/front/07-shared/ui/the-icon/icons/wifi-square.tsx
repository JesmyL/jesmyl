import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M8 10.3136C9.14883 9.48279 10.5209 9 11.9946 9C13.4729 9 14.849 9.48584 16 10.3214M14.1743 13C13.5182 12.6363 12.7779 12.4317 11.9946 12.4317C11.2152 12.4317 10.4784 12.6343 9.82477 12.9945',
  d3: 'M12 16H12.0064',
  d4: 'M12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75ZM11.9946 8C10.2968 8 8.72195 8.55747 7.41409 9.50323C6.96656 9.82686 6.86612 10.452 7.18975 10.8995C7.51337 11.3471 8.13852 11.4475 8.58605 11.1239C9.57587 10.4081 10.7451 10 11.9946 10C13.2481 10 14.4208 10.4107 15.4126 11.1307C15.8595 11.4551 16.4849 11.3558 16.8093 10.9089C17.1338 10.462 17.0345 9.83663 16.5875 9.51219C15.2773 8.56101 13.6979 8 11.9946 8ZM11.9946 11.4317C11.0388 11.4317 10.1368 11.6808 9.34215 12.1187C8.85847 12.3853 8.68247 12.9935 8.94905 13.4772C9.21563 13.9609 9.82385 14.1369 10.3075 13.8703C10.8202 13.5878 11.3917 13.4317 11.9946 13.4317C12.6006 13.4317 13.1749 13.5893 13.6895 13.8746C14.1726 14.1424 14.7812 13.9678 15.049 13.4848C15.3167 13.0018 15.1422 12.3931 14.6591 12.1254C13.8616 11.6833 12.9554 11.4317 11.9946 11.4317ZM11.9969 15C11.4464 15 11.0001 15.4477 11.0001 16C11.0001 16.5523 11.4464 17 11.9969 17C12.5439 17 13.0001 16.5487 13.0001 16C13.0001 15.4513 12.5439 15 11.9969 15Z',
  d5: 'M11.9428 1.75H12.0572C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.75212 22.25 11.9428V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H11.9428C9.75212 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75Z',
  d6: 'M7.41409 9.50324C8.72195 8.55747 10.2968 8 11.9946 8C13.6979 8 15.2773 8.56101 16.5875 9.51219C17.0345 9.83663 17.1338 10.462 16.8093 10.9089C16.4849 11.3558 15.8595 11.4551 15.4126 11.1307C14.4208 10.4107 13.2481 10 11.9946 10C10.7451 10 9.57587 10.4081 8.58605 11.1239C8.13852 11.4475 7.51337 11.3471 7.18975 10.8995C6.86612 10.452 6.96656 9.82686 7.41409 9.50324ZM9.34215 12.1187C10.1368 11.6808 11.0388 11.4317 11.9946 11.4317C12.9554 11.4317 13.8616 11.6833 14.6591 12.1254C15.1422 12.3931 15.3167 13.0018 15.049 13.4848C14.7812 13.9678 14.1726 14.1424 13.6895 13.8746C13.1748 13.5893 12.6006 13.4317 11.9946 13.4317C11.3917 13.4317 10.8202 13.5878 10.3075 13.8703C9.82385 14.1369 9.21563 13.9609 8.94905 13.4772C8.68247 12.9935 8.85847 12.3853 9.34215 12.1187Z',
  d7: 'M11.0001 16C11.0001 15.4477 11.4464 15 11.9969 15C12.5439 15 13.0001 15.4513 13.0001 16C13.0001 16.5487 12.5439 17 11.9969 17C11.4464 17 11.0001 16.5523 11.0001 16Z',
  d8: 'M21 3V21H3V3H21Z',
  d9: 'M2.25 3C2.25 2.58579 2.58579 2.25 3 2.25H21C21.4142 2.25 21.75 2.58579 21.75 3V21C21.75 21.4142 21.4142 21.75 21 21.75H3C2.58579 21.75 2.25 21.4142 2.25 21V3ZM7.41406 9.50323C8.72192 8.55747 10.2968 8 11.9946 8C13.6979 8 15.2772 8.56101 16.5875 9.51219L15.4126 11.1307C14.4208 10.4107 13.2481 10 11.9946 10C10.7451 10 9.57584 10.4081 8.58602 11.1239L7.41406 9.50323ZM9.34212 12.1187C10.1367 11.6808 11.0387 11.4317 11.9946 11.4317C12.9553 11.4317 13.8616 11.6833 14.6591 12.1254L13.6895 13.8746C13.1748 13.5893 12.6006 13.4317 11.9946 13.4317C11.3917 13.4317 10.8202 13.5878 10.3075 13.8703L9.34212 12.1187ZM12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17H12.0064C12.5586 17 13.0064 16.5523 13.0064 16C13.0064 15.4477 12.5586 15 12.0064 15H12Z',
};

export const IconWifiSquareStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-square-stroke-rounded IconWifiSquareStrokeRounded"
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

export const IconWifiSquareDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-square-duotone-rounded IconWifiSquareDuotoneRounded"
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

export const IconWifiSquareTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-square-twotone-rounded IconWifiSquareTwotoneRounded"
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

export const IconWifiSquareSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-square-solid-rounded IconWifiSquareSolidRounded"
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

export const IconWifiSquareBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-square-bulk-rounded IconWifiSquareBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconWifiSquareStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-square-stroke-sharp IconWifiSquareStrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconWifiSquareSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-square-solid-sharp IconWifiSquareSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWifiSquare: TheIconSelfPack = {
  name: 'WifiSquare',
  StrokeRounded: IconWifiSquareStrokeRounded,
  DuotoneRounded: IconWifiSquareDuotoneRounded,
  TwotoneRounded: IconWifiSquareTwotoneRounded,
  SolidRounded: IconWifiSquareSolidRounded,
  BulkRounded: IconWifiSquareBulkRounded,
  StrokeSharp: IconWifiSquareStrokeSharp,
  SolidSharp: IconWifiSquareSolidSharp,
};