import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M16.3239 9.89944C17.924 13.046 16.637 17.2613 12.9613 17.8739C8.14733 18.9394 4.93596 13.0006 8.55235 9.5186C8.74548 9.32596 9.278 8.827 9.49988 8.66658C9.49988 9.15796 9.78589 10.6668 10.1249 10.6668C12.1448 10.6668 12.625 8.00025 12.3669 6C14.0544 6.89118 15.4839 8.13225 16.3239 9.89944Z',
  d3: 'M3.89124 3.89124C2.5 5.28249 2.5 7.52166 2.5 12C2.5 16.4783 2.5 18.7175 3.89124 20.1088C5.28249 21.5 7.52166 21.5 12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.1088C21.5 18.7175 21.5 16.4783 21.5 12C21.5 7.52166 21.5 5.28249 20.1088 3.89124C18.7175 2.5 16.4783 2.5 12 2.5C7.52166 2.5 5.28249 2.5 3.89124 3.89124ZM12.9613 17.8739C16.637 17.2613 17.924 13.046 16.3239 9.89945C15.4839 8.13225 14.0544 6.89118 12.3669 6C12.625 8.00025 12.1448 10.6668 10.1249 10.6668C9.78589 10.6668 9.49988 9.15796 9.49988 8.66658C9.278 8.827 8.74548 9.32596 8.55235 9.5186C4.93596 13.0006 8.14733 18.9394 12.9613 17.8739Z',
  d4: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM13.0574 18.3634C17.1007 17.6997 18.5164 13.1332 16.7563 9.7244C15.8322 7.80994 14.2599 6.46544 12.4036 5.5C12.6875 7.66694 12.1592 10.5557 9.9374 10.5557C9.56448 10.5557 9.24987 8.92112 9.24987 8.38879C9.0058 8.56259 8.42003 9.10312 8.20758 9.31181C4.22956 13.0839 7.76207 19.5177 13.0574 18.3634Z',
  d5: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d6: 'M16.7563 9.7244C18.5164 13.1332 17.1007 17.6997 13.0574 18.3634C7.76207 19.5177 4.22956 13.0839 8.20758 9.31181C8.42003 9.10312 9.0058 8.56259 9.24987 8.38879C9.24987 8.92112 9.56448 10.5557 9.9374 10.5557C12.1592 10.5557 12.6875 7.66694 12.4036 5.5C14.2599 6.46544 15.8322 7.80994 16.7563 9.7244Z',
  d7: 'M21 3V21H3V3H21Z',
  d8: 'M7.89093 10.2362C6.50419 12.5083 6.56884 15.5031 9.49366 17.3948C11.8253 18.8119 15.2974 17.6637 16.3678 15.4052C17.6308 13.3394 17.0421 10.0105 14.9461 7.81341C14.1796 7.10899 12.9414 6.11661 12.1503 6.0225C12.146 6.02199 12.1429 6.02624 12.1444 6.03029C12.7605 7.70754 12.1205 9.65223 11.0942 10.4276C10.8961 10.5773 10.5882 10.6437 10.3424 10.6788C10.0368 10.7225 9.99981 10.3672 9.93707 10.0649C9.84039 9.59922 9.62332 9.19753 9.48524 8.69396C8.80368 9.1779 8.45768 9.52886 7.89093 10.2362Z',
  d9: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H3ZM16.3239 9.89945C17.924 13.046 16.637 17.2613 12.9613 17.8739C8.14733 18.9394 4.93596 13.0006 8.55235 9.5186C8.74548 9.32596 9.278 8.827 9.49988 8.66658L10.1249 10.6668C12.1447 10.6668 12.625 8.00025 12.3669 6C14.0544 6.89118 15.4839 8.13225 16.3239 9.89945Z',
};

export const IconSquareSingleFireStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-single-fire-stroke-rounded IconSquareSingleFireStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareSingleFireDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-single-fire-duotone-rounded IconSquareSingleFireDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareSingleFireTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-single-fire-twotone-rounded IconSquareSingleFireTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareSingleFireSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-single-fire-solid-rounded IconSquareSingleFireSolidRounded"
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

export const IconSquareSingleFireBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-single-fire-bulk-rounded IconSquareSingleFireBulkRounded"
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
    </TheIconWrapper>
  );
};

export const IconSquareSingleFireStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-single-fire-stroke-sharp IconSquareSingleFireStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareSingleFireSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-single-fire-solid-sharp IconSquareSingleFireSolidSharp"
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

export const iconPackOfSquareSingleFire: TheIconSelfPack = {
  name: 'SquareSingleFire',
  StrokeRounded: IconSquareSingleFireStrokeRounded,
  DuotoneRounded: IconSquareSingleFireDuotoneRounded,
  TwotoneRounded: IconSquareSingleFireTwotoneRounded,
  SolidRounded: IconSquareSingleFireSolidRounded,
  BulkRounded: IconSquareSingleFireBulkRounded,
  StrokeSharp: IconSquareSingleFireStrokeSharp,
  SolidSharp: IconSquareSingleFireSolidSharp,
};