import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M9 8V16M9 8C8.20516 8 7 10 7 10M9 8C9.78225 8 11 10 11 10M15 16V8M15 16C14.2178 16 13 14 13 14M15 16C15.7822 16 17 14 17 14',
  d3: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM9.77502 15.9751C9.77502 16.4031 9.42804 16.7501 9.00002 16.7501C8.572 16.7501 8.22502 16.4031 8.22502 15.9751V10.25H7.26006C7.12093 10.2514 6.97974 10.2168 6.85306 10.1425C6.50088 9.93595 6.39431 9.50102 6.61487 9.17125L6.81102 8.89539C6.92915 8.73586 7.09665 8.51983 7.29018 8.30082C7.4802 8.08578 7.71323 7.84731 7.96384 7.65649C8.18318 7.48948 8.55343 7.25 8.99996 7.25C9.44648 7.25 9.81673 7.48948 10.0361 7.65649C10.2867 7.84731 10.5197 8.08578 10.7097 8.30082C10.9033 8.51983 11.0708 8.73586 11.1889 8.89539L11.3852 9.17144C11.6057 9.5012 11.499 9.93595 11.1469 10.1425C11.0225 10.2154 10.8842 10.2501 10.7475 10.25H9.77502V15.9751ZM15.775 8.0251C15.775 7.59708 15.428 7.2501 15 7.2501C14.572 7.2501 14.225 7.59708 14.225 8.0251V13.7502H13.2601C13.1209 13.7488 12.9797 13.7834 12.8531 13.8577C12.5009 14.0642 12.3943 14.4992 12.6149 14.8289L12.811 15.1048C12.9292 15.2643 13.0967 15.4804 13.2902 15.6994C13.4802 15.9144 13.7132 16.1529 13.9638 16.3437C14.1832 16.5107 14.5534 16.7502 15 16.7502C15.4465 16.7502 15.8167 16.5107 16.0361 16.3437C16.2867 16.1529 16.5197 15.9144 16.7097 15.6994C16.9033 15.4804 17.0708 15.2643 17.1889 15.1048L17.3852 14.8288C17.6057 14.499 17.499 14.0642 17.1468 13.8577C17.0225 13.7848 16.8842 13.7501 16.7475 13.7502H15.775V8.0251Z',
  d4: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d5: 'M15 7.2501C15.428 7.2501 15.775 7.59708 15.775 8.0251V13.7502H16.7475C16.8842 13.7501 17.0225 13.7848 17.1468 13.8577C17.499 14.0642 17.6057 14.499 17.3852 14.8288L17.1889 15.1048C17.0708 15.2643 16.9033 15.4804 16.7097 15.6994C16.5197 15.9144 16.2867 16.1529 16.0361 16.3437C15.8167 16.5107 15.4465 16.7502 15 16.7502C14.5534 16.7502 14.1832 16.5107 13.9638 16.3437C13.7132 16.1529 13.4802 15.9144 13.2902 15.6994C13.0967 15.4804 12.9292 15.2643 12.811 15.1048L12.6149 14.8289C12.3943 14.4992 12.5009 14.0642 12.8531 13.8577C12.9797 13.7834 13.1209 13.7488 13.2601 13.7502H14.225V8.0251C14.225 7.59708 14.572 7.2501 15 7.2501Z',
  d6: 'M9.00002 16.7501C9.42804 16.7501 9.77502 16.4031 9.77502 15.9751V10.25H10.7475C10.8842 10.2501 11.0225 10.2154 11.1469 10.1425C11.499 9.93595 11.6057 9.5012 11.3852 9.17144L11.1889 8.89539C11.0708 8.73586 10.9033 8.51983 10.7097 8.30082C10.5197 8.08578 10.2867 7.84731 10.0361 7.65649C9.81673 7.48948 9.44648 7.25 8.99996 7.25C8.55343 7.25 8.18318 7.48948 7.96384 7.65649C7.71323 7.84731 7.4802 8.08578 7.29018 8.30082C7.09665 8.51983 6.92915 8.73586 6.81102 8.89539L6.61487 9.17125C6.39431 9.50102 6.50088 9.93595 6.85306 10.1425C6.97974 10.2168 7.12093 10.2514 7.26006 10.25H8.22502V15.9751C8.22502 16.4031 8.572 16.7501 9.00002 16.7501Z',
  d7: 'M21 3V21H3V3H21Z',
  d8: 'M9 16V8.28652M7 10L9 8L11 10M15 8V15.6255M17 14L15 16L13 14',
  d9: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H3ZM11.5294 9.46966L8.99908 6.93933L6.46875 9.46966L7.52941 10.5303L8.24908 9.81065V16H9.74908V9.81065L10.4688 10.5303L11.5294 9.46966ZM15.7491 14.1893V7.99999H14.2491V14.1893L13.5294 13.4697L12.4688 14.5303L14.9991 17.0607L17.5294 14.5303L16.4688 13.4697L15.7491 14.1893Z',
};

export const IconSquareArrowUpDownStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-down-stroke-rounded IconSquareArrowUpDownStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconSquareArrowUpDownDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-down-duotone-rounded IconSquareArrowUpDownDuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconSquareArrowUpDownTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-down-twotone-rounded IconSquareArrowUpDownTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconSquareArrowUpDownSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-down-solid-rounded IconSquareArrowUpDownSolidRounded"
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

export const IconSquareArrowUpDownBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-down-bulk-rounded IconSquareArrowUpDownBulkRounded"
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
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareArrowUpDownStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-down-stroke-sharp IconSquareArrowUpDownStrokeSharp"
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

export const IconSquareArrowUpDownSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-up-down-solid-sharp IconSquareArrowUpDownSolidSharp"
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

export const iconPackOfSquareArrowUpDown: TheIconSelfPack = {
  name: 'SquareArrowUpDown',
  StrokeRounded: IconSquareArrowUpDownStrokeRounded,
  DuotoneRounded: IconSquareArrowUpDownDuotoneRounded,
  TwotoneRounded: IconSquareArrowUpDownTwotoneRounded,
  SolidRounded: IconSquareArrowUpDownSolidRounded,
  BulkRounded: IconSquareArrowUpDownBulkRounded,
  StrokeSharp: IconSquareArrowUpDownStrokeSharp,
  SolidSharp: IconSquareArrowUpDownSolidSharp,
};