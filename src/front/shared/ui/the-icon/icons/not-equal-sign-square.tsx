import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M7 9.77778H17M7 14.2222H17M8.66667 17L15.3333 7',
  d3: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM16.1654 7.55472C16.4717 7.09519 16.3476 6.47432 15.888 6.16796C15.4285 5.86161 14.8076 5.98579 14.5013 6.44531L12.9463 8.77779H7C6.44772 8.77779 6 9.22551 6 9.77779C6 10.3301 6.44772 10.7778 7 10.7778H11.613L9.98334 13.2222H7C6.44772 13.2222 6 13.67 6 14.2222C6 14.7745 6.44772 15.2222 7 15.2222H8.65L7.83462 16.4453C7.52826 16.9048 7.65244 17.5257 8.11197 17.8321C8.5715 18.1384 9.19236 18.0142 9.49872 17.5547L11.0537 15.2222H17C17.5523 15.2222 18 14.7745 18 14.2222C18 13.67 17.5523 13.2222 17 13.2222H12.387L14.0167 10.7778H17C17.5523 10.7778 18 10.3301 18 9.77779C18 9.22551 17.5523 8.77779 17 8.77779H15.35L16.1654 7.55472Z',
  d4: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d5: 'M15.888 6.16806C16.3476 6.47441 16.4717 7.09528 16.1654 7.55481L15.35 8.77788H17C17.5523 8.77788 18 9.2256 18 9.77788C18 10.3302 17.5523 10.7779 17 10.7779H14.0167L12.387 13.2223H17C17.5523 13.2223 18 13.67 18 14.2223C18 14.7746 17.5523 15.2223 17 15.2223H11.0537L9.49872 17.5548C9.19236 18.0143 8.5715 18.1385 8.11197 17.8322C7.65244 17.5258 7.52826 16.9049 7.83462 16.4454L8.65 15.2223H7C6.44772 15.2223 6 14.7746 6 14.2223C6 13.67 6.44772 13.2223 7 13.2223H9.98334L11.613 10.7779H7C6.44772 10.7779 6 10.3302 6 9.77788C6 9.2256 6.44772 8.77788 7 8.77788H12.9463L14.5013 6.44541C14.8076 5.98588 15.4285 5.8617 15.888 6.16806Z',
  d6: 'M3 21H21V3.00046L3 3V21Z',
  d7: 'M3.00002 2.25C2.8011 2.24999 2.61033 2.32901 2.46968 2.46966C2.32902 2.61032 2.25 2.80108 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3.00046C21.75 2.58626 21.4142 2.25047 21 2.25046L3.00002 2.25ZM9.49872 17.5547L11.0537 15.2222H17V13.2222H12.387L14.0167 10.7778H17V8.77779H15.35L16.1654 7.55471L14.5013 6.44531L12.9463 8.77779H7V10.7778H11.613L9.98334 13.2222H7V15.2222H8.65L7.83462 16.4453L9.49872 17.5547Z',
};

export const IconNotEqualSignSquareStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-square-stroke-rounded IconNotEqualSignSquareStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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

export const IconNotEqualSignSquareDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-square-duotone-rounded IconNotEqualSignSquareDuotoneRounded"
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
        strokeLinejoin="round" 
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

export const IconNotEqualSignSquareTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-square-twotone-rounded IconNotEqualSignSquareTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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

export const IconNotEqualSignSquareSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-square-solid-rounded IconNotEqualSignSquareSolidRounded"
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

export const IconNotEqualSignSquareBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-square-bulk-rounded IconNotEqualSignSquareBulkRounded"
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

export const IconNotEqualSignSquareStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-square-stroke-sharp IconNotEqualSignSquareStrokeSharp"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotEqualSignSquareSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-square-solid-sharp IconNotEqualSignSquareSolidSharp"
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

export const iconPackOfNotEqualSignSquare: TheIconSelfPack = {
  name: 'NotEqualSignSquare',
  StrokeRounded: IconNotEqualSignSquareStrokeRounded,
  DuotoneRounded: IconNotEqualSignSquareDuotoneRounded,
  TwotoneRounded: IconNotEqualSignSquareTwotoneRounded,
  SolidRounded: IconNotEqualSignSquareSolidRounded,
  BulkRounded: IconNotEqualSignSquareBulkRounded,
  StrokeSharp: IconNotEqualSignSquareStrokeSharp,
  SolidSharp: IconNotEqualSignSquareSolidSharp,
};