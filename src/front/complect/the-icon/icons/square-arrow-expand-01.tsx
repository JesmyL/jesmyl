import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.4852 16.5149C6.9104 15.9401 7.00595 13.4982 7.00595 13.4982M7.4852 16.5149C8.06001 17.0897 10.5019 16.994 10.5019 16.994M7.4852 16.5149L11 13M16.5149 7.48512C15.9401 6.91031 13.4982 7.00596 13.4982 7.00596M16.5149 7.48512C17.0897 8.05993 16.994 10.5018 16.994 10.5018M16.5149 7.48512L13 11',
  d2: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d3: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM13.91 6.55196C13.4964 6.53024 13.1434 6.84796 13.1217 7.2616C13.1101 7.48255 13.1954 7.68618 13.3403 7.83126L14.0475 8.53836L12.5 10.0858C12.1095 10.4764 12.1095 11.1095 12.5 11.5001C12.8905 11.8906 13.5237 11.8906 13.9142 11.5001L15.4617 9.95258L16.1691 10.66C16.3141 10.8048 16.5176 10.8899 16.7384 10.8783C17.1521 10.8566 17.4698 10.5037 17.4481 10.09C17.4437 10.0073 17.4504 9.84737 17.4644 9.58823L17.4675 9.53159C17.4798 9.30472 17.4945 9.0342 17.4988 8.76598C17.5034 8.47871 17.497 8.16199 17.4553 7.8765C17.42 7.635 17.3378 7.23254 17.0527 6.94738C16.7675 6.66221 16.365 6.58 16.1235 6.54474C15.8381 6.50307 15.5213 6.49667 15.2341 6.50128C14.9659 6.50558 14.6954 6.52026 14.4685 6.53257L14.4118 6.53564C14.1527 6.54962 13.9928 6.55631 13.91 6.55196ZM10.09 17.448C10.5036 17.4698 10.8566 17.152 10.8783 16.7384C10.8899 16.5176 10.8047 16.3141 10.6599 16.169L9.95253 15.4616L11.5 13.9142C11.8905 13.5237 11.8905 12.8905 11.5 12.5C11.1095 12.1094 10.4763 12.1094 10.0858 12.5L8.53832 14.0474L7.83122 13.3403C7.68614 13.1953 7.48251 13.1101 7.26156 13.1217C6.84792 13.1434 6.5302 13.4963 6.55192 13.91C6.55626 13.9927 6.54957 14.1526 6.5356 14.4118L6.53253 14.4684C6.52022 14.6953 6.50554 14.9658 6.50123 15.234C6.49662 15.5213 6.50303 15.838 6.5447 16.1235C6.57995 16.365 6.66217 16.7675 6.94733 17.0526C7.2325 17.3378 7.63495 17.42 7.87646 17.4553C8.16194 17.4969 8.47867 17.5033 8.76593 17.4987C9.03415 17.4944 9.30465 17.4797 9.53152 17.4674L9.58818 17.4644C9.84732 17.4504 10.0072 17.4437 10.09 17.448Z',
  d4: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d5: 'M10.8783 16.7384C10.8566 17.152 10.5037 17.4698 10.09 17.448C10.0073 17.4437 9.84737 17.4504 9.58823 17.4644L9.53156 17.4674C9.3047 17.4797 9.03419 17.4944 8.76598 17.4987C8.47872 17.5033 8.16199 17.4969 7.8765 17.4553C7.635 17.42 7.23254 17.3378 6.94738 17.0526C6.66222 16.7675 6.58 16.365 6.54474 16.1235C6.50307 15.838 6.49667 15.5213 6.50128 15.234C6.50559 14.9658 6.52026 14.6953 6.53257 14.4684L6.53564 14.4118C6.54962 14.1526 6.55631 13.9927 6.55196 13.91C6.53024 13.4963 6.84796 13.1434 7.26161 13.1217C7.48256 13.1101 7.68618 13.1953 7.83126 13.3403L8.53836 14.0474L10.0858 12.5C10.4763 12.1094 11.1095 12.1094 11.5 12.5C11.8906 12.8905 11.8906 13.5237 11.5 13.9142L9.95258 15.4616L10.66 16.169C10.8048 16.3141 10.8899 16.5176 10.8783 16.7384Z',
  d6: 'M13.1218 7.2616C13.1435 6.84796 13.4964 6.53024 13.9101 6.55196C13.9928 6.55631 14.1527 6.54962 14.4119 6.53564L14.4686 6.53257C14.6954 6.52026 14.9659 6.50558 15.2341 6.50128C15.5214 6.49667 15.8381 6.50307 16.1236 6.54474C16.3651 6.58 16.7676 6.66221 17.0527 6.94738C17.3379 7.23254 17.4201 7.635 17.4553 7.8765C17.497 8.16199 17.5034 8.47871 17.4988 8.76598C17.4945 9.0342 17.4798 9.30472 17.4675 9.53159L17.4644 9.58823C17.4505 9.84737 17.4438 10.0073 17.4481 10.09C17.4698 10.5037 17.1521 10.8566 16.7385 10.8783C16.5177 10.8899 16.3142 10.8048 16.1691 10.66L15.4617 9.95258L13.9142 11.5001C13.5237 11.8906 12.8906 11.8906 12.5 11.5001C12.1095 11.1095 12.1095 10.4764 12.5 10.0858L14.0475 8.53836L13.3404 7.83126C13.1954 7.68618 13.1102 7.48255 13.1218 7.2616Z',
  d7: 'M13.0071 11.0047L16.7595 7.25221M17.0059 11.0047V7.00586H13.0071M11.0047 13.0071L7.31134 16.7004M7.00586 13.0071V17.0059H11.0047',
  d8: 'M21 3V21H3V3H21Z',
  d9: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H3ZM17.75 6.25H13.0012V7.75H15.1894L12.4709 10.4685L13.5315 11.5291L16.25 8.81066V10.9988H17.75V6.25ZM10.4685 12.4709L7.75007 15.1893L7.75014 13.0012L6.25014 13.0012L6.25 17.75H10.9988V16.25H8.81068L11.5292 13.5315L10.4685 12.4709Z',
};

export const IconSquareArrowExpand01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-expand-01-stroke-rounded IconSquareArrowExpand01StrokeRounded"
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

export const IconSquareArrowExpand01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-expand-01-duotone-rounded IconSquareArrowExpand01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareArrowExpand01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-expand-01-twotone-rounded IconSquareArrowExpand01TwotoneRounded"
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

export const IconSquareArrowExpand01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-expand-01-solid-rounded IconSquareArrowExpand01SolidRounded"
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

export const IconSquareArrowExpand01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-expand-01-bulk-rounded IconSquareArrowExpand01BulkRounded"
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

export const IconSquareArrowExpand01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-expand-01-stroke-sharp IconSquareArrowExpand01StrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareArrowExpand01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-expand-01-solid-sharp IconSquareArrowExpand01SolidSharp"
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

export const iconPackOfSquareArrowExpand01: TheIconSelfPack = {
  name: 'SquareArrowExpand01',
  StrokeRounded: IconSquareArrowExpand01StrokeRounded,
  DuotoneRounded: IconSquareArrowExpand01DuotoneRounded,
  TwotoneRounded: IconSquareArrowExpand01TwotoneRounded,
  SolidRounded: IconSquareArrowExpand01SolidRounded,
  BulkRounded: IconSquareArrowExpand01BulkRounded,
  StrokeSharp: IconSquareArrowExpand01StrokeSharp,
  SolidSharp: IconSquareArrowExpand01SolidSharp,
};