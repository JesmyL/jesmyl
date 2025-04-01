import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M11.9998 16H12.0088',
  d3: 'M12 13L12 7',
  d4: 'M12.0572 1.74979C14.2479 1.74978 15.9686 1.74977 17.312 1.93038C18.6886 2.11547 19.7809 2.50251 20.6391 3.3607C21.4973 4.2189 21.8843 5.31116 22.0694 6.68781C22.25 8.03122 22.25 9.75189 22.25 11.9426V11.9426V12.057V12.057C22.25 14.2477 22.25 15.9684 22.0694 17.3118C21.8843 18.6884 21.4973 19.7807 20.6391 20.6389C19.7809 21.4971 18.6886 21.8841 17.312 22.0692C15.9686 22.2498 14.2479 22.2498 12.0572 22.2498H12.0572H11.9428H11.9428C9.7521 22.2498 8.03143 22.2498 6.68802 22.0692C5.31137 21.8841 4.21911 21.4971 3.36091 20.6389C2.50272 19.7807 2.11568 18.6884 1.93059 17.3118C1.74998 15.9684 1.74999 14.2477 1.75 12.057V11.9426C1.74999 9.75191 1.74998 8.03123 1.93059 6.68781C2.11568 5.31116 2.50272 4.2189 3.36091 3.3607C4.21911 2.50251 5.31137 2.11547 6.68802 1.93038C8.03144 1.74977 9.75212 1.74978 11.9428 1.74979H12.0572ZM11 16.4998C11 15.9475 11.4457 15.4998 11.9955 15.4998H12.0045C12.5543 15.4998 13 15.9475 13 16.4998C13 17.0521 12.5543 17.4998 12.0045 17.4998H11.9955C11.4457 17.4998 11 17.0521 11 16.4998ZM11.0001 12.4998C11.0001 13.0521 11.4478 13.4998 12.0001 13.4998C12.5524 13.4998 13.0001 13.0521 13.0001 12.4998V8.49979C13.0001 7.94751 12.5524 7.49979 12.0001 7.49979C11.4478 7.49979 11.0001 7.94751 11.0001 8.49979V12.4998Z',
  d5: 'M12.0572 1.74979C14.2479 1.74978 15.9686 1.74977 17.312 1.93038C18.6886 2.11547 19.7809 2.50251 20.6391 3.3607C21.4973 4.2189 21.8843 5.31116 22.0694 6.68781C22.25 8.03122 22.25 9.75189 22.25 11.9426V11.9426V12.057V12.057C22.25 14.2477 22.25 15.9684 22.0694 17.3118C21.8843 18.6884 21.4973 19.7807 20.6391 20.6389C19.7809 21.4971 18.6886 21.8841 17.312 22.0692C15.9686 22.2498 14.2479 22.2498 12.0572 22.2498H12.0572H11.9428H11.9428C9.7521 22.2498 8.03143 22.2498 6.68802 22.0692C5.31137 21.8841 4.21911 21.4971 3.36091 20.6389C2.50271 19.7807 2.11568 18.6884 1.93059 17.3118C1.74998 15.9684 1.74999 14.2477 1.75 12.057V11.9426C1.74999 9.75191 1.74998 8.03123 1.93059 6.68781C2.11568 5.31116 2.50272 4.2189 3.36091 3.3607C4.21911 2.50251 5.31137 2.11547 6.68802 1.93038C8.03144 1.74977 9.75212 1.74978 11.9428 1.74979H12.0572Z',
  d6: 'M11 16.4996C11 15.9473 11.4457 15.4996 11.9955 15.4996H12.0045C12.5543 15.4996 13 15.9473 13 16.4996C13 17.0519 12.5543 17.4996 12.0045 17.4996H11.9955C11.4457 17.4996 11 17.0519 11 16.4996Z',
  d7: 'M12.0001 13.4996C11.4478 13.4996 11.0001 13.0519 11.0001 12.4996L11.0001 8.49958C11.0001 7.9473 11.4478 7.49958 12.0001 7.49958C12.5524 7.49958 13.0001 7.9473 13.0001 8.49958L13.0001 12.4996C13.0001 13.0519 12.5524 13.4996 12.0001 13.4996Z',
  d8: 'M2.99908 21L20.9991 21L20.9991 3L2.99909 2.99999L2.99908 21Z',
  d9: 'M11.9991 14L11.9991 6.99999M11.9991 15.5L11.9991 17',
  d10: 'M2.99909 2.24999C2.80017 2.24999 2.60941 2.32901 2.46876 2.46966C2.3281 2.61031 2.24909 2.80108 2.24909 2.99999L2.24908 21C2.24908 21.1989 2.3281 21.3897 2.46875 21.5303C2.60941 21.671 2.80017 21.75 2.99908 21.75L20.9991 21.75C21.4133 21.75 21.7491 21.4142 21.7491 21L21.7491 3C21.7491 2.58578 21.4133 2.25 20.9991 2.25L2.99909 2.24999ZM12.9991 17V15H10.9991V17H12.9991ZM12.9991 13V6.99999H10.9991V13H12.9991Z',
};

export const IconAlertSquareStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-square-stroke-rounded IconAlertSquareStrokeRounded"
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

export const IconAlertSquareDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-square-duotone-rounded IconAlertSquareDuotoneRounded"
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

export const IconAlertSquareTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-square-twotone-rounded IconAlertSquareTwotoneRounded"
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

export const IconAlertSquareSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-square-solid-rounded IconAlertSquareSolidRounded"
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

export const IconAlertSquareBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-square-bulk-rounded IconAlertSquareBulkRounded"
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

export const IconAlertSquareStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-square-stroke-sharp IconAlertSquareStrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAlertSquareSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="alert-square-solid-sharp IconAlertSquareSolidSharp"
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

export const iconPackOfAlertSquare: TheIconSelfPack = {
  name: 'AlertSquare',
  StrokeRounded: IconAlertSquareStrokeRounded,
  DuotoneRounded: IconAlertSquareDuotoneRounded,
  TwotoneRounded: IconAlertSquareTwotoneRounded,
  SolidRounded: IconAlertSquareSolidRounded,
  BulkRounded: IconAlertSquareBulkRounded,
  StrokeSharp: IconAlertSquareStrokeSharp,
  SolidSharp: IconAlertSquareSolidSharp,
};