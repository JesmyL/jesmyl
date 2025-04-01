import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14.7 7L15.7298 8.30021C16.3216 9.04753 16.2127 9.27273 15.2594 9.27273L9.3 9.27273C7.65577 9.27273 7.5 10.1251 7.5 11.5455M9.3 17L8.27024 15.6998C7.67835 14.9525 7.78727 14.7273 8.74059 14.7273H14.7C16.3442 14.7273 16.5 13.875 16.5 12.4545',
  d2: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d3: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM15.2879 6.53438C15.0308 6.20967 14.5591 6.15492 14.2344 6.41209C14.0476 6.56001 13.9501 6.77892 13.95 7V8.52276L9.3 8.52276C8.36034 8.52276 7.59021 8.77144 7.14765 9.47859C6.77131 10.0799 6.75 10.8698 6.75 11.5455C6.75 11.9597 7.08579 12.2955 7.5 12.2955C7.91421 12.2955 8.25 11.9597 8.25 11.5455C8.25 10.8007 8.30658 10.4543 8.41917 10.2744C8.46556 10.2002 8.59543 10.0228 9.3 10.0228H15.2594C15.5138 10.0228 15.7714 10.0091 15.9953 9.95471C16.1966 9.90583 16.5634 9.77752 16.7492 9.39329C16.9351 9.00906 16.8079 8.64187 16.7213 8.45372C16.6249 8.24447 16.4756 8.03399 16.3177 7.83459L15.2879 6.53438ZM17.25 12.4546C17.25 12.0404 16.9142 11.7046 16.5 11.7046C16.0858 11.7046 15.75 12.0404 15.75 12.4546C15.75 13.1993 15.6934 13.5458 15.5808 13.7257C15.5344 13.7998 15.4046 13.9773 14.7 13.9773H8.74059C8.48623 13.9773 8.22856 13.991 8.00469 14.0454C7.80339 14.0942 7.43661 14.2225 7.25078 14.6068C7.06495 14.991 7.19209 15.3582 7.27875 15.5463C7.37512 15.7556 7.52437 15.9661 7.6823 16.1655L8.71206 17.4657C8.96923 17.7904 9.44094 17.8451 9.76565 17.588C9.95244 17.44 10.0499 17.2211 10.05 17V15.4773H14.7C15.6397 15.4773 16.4098 15.2286 16.8523 14.5215C17.2287 13.9201 17.25 13.1302 17.25 12.4546Z',
  d4: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d5: 'M14.2344 6.41209C14.5591 6.15492 15.0308 6.20967 15.2879 6.53438L16.3177 7.83459C16.4756 8.03399 16.6249 8.24447 16.7213 8.45372C16.8079 8.64187 16.9351 9.00906 16.7492 9.39329C16.5634 9.77752 16.1966 9.90583 15.9953 9.95471C15.7714 10.0091 15.5138 10.0228 15.2594 10.0228L9.3 10.0228C8.59543 10.0228 8.46556 10.2002 8.41917 10.2744C8.30658 10.4543 8.25 10.8007 8.25 11.5455C8.25 11.9597 7.91421 12.2955 7.5 12.2955C7.08579 12.2955 6.75 11.9597 6.75 11.5455C6.75 10.8698 6.77131 10.0799 7.14765 9.47859C7.59021 8.77144 8.36034 8.52276 9.3 8.52276L13.95 8.52276V7C13.9501 6.77892 14.0476 6.56001 14.2344 6.41209Z',
  d6: 'M16.5 11.7046C16.9142 11.7046 17.25 12.0404 17.25 12.4546C17.25 13.1302 17.2287 13.9201 16.8523 14.5215C16.4098 15.2286 15.6397 15.4773 14.7 15.4773H10.05V17C10.0499 17.2211 9.95244 17.44 9.76565 17.588C9.44094 17.8451 8.96923 17.7904 8.71206 17.4657L7.6823 16.1655C7.52437 15.9661 7.37512 15.7556 7.27875 15.5463C7.19209 15.3582 7.06495 14.991 7.25078 14.6068C7.43661 14.2225 7.80339 14.0942 8.00469 14.0454C8.22856 13.991 8.48623 13.9773 8.74059 13.9773H14.7C15.4046 13.9773 15.5344 13.7998 15.5808 13.7257C15.6934 13.5458 15.75 13.1993 15.75 12.4546C15.75 12.0404 16.0858 11.7046 16.5 11.7046Z',
  d7: 'M21 3V21H3V3H21Z',
  d8: 'M16.0127 12.0039V14.4144L8.14301 14.4144C8.05795 14.4144 8.01128 14.5129 8.06544 14.5781L10.4932 17.5039M8.0127 12.0039L8.0127 9.59345L15.8824 9.59345C15.9674 9.59345 16.0141 9.49494 15.96 9.42968L13.5322 6.50391',
  d9: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H3ZM17.0865 8.53137L15.0856 6.03137L13.9145 6.96868L14.94 8.25002H7.50001C7.08579 8.25002 6.75001 8.58581 6.75001 9.00002V12H8.25001V9.75002H16.5009C16.7893 9.75002 17.0521 9.58473 17.1769 9.32484C17.3018 9.06495 17.2666 8.75648 17.0865 8.53137ZM17.2509 15V12H15.7509V14.25H7.50001C7.2117 14.25 6.94892 14.4153 6.82403 14.6751C6.69914 14.935 6.73425 15.2434 6.91436 15.4685L8.91436 17.9685L10.0857 17.0315L9.06048 15.75H16.5009C16.9151 15.75 17.2509 15.4142 17.2509 15Z',
};

export const IconSquareArrowReload01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-reload-01-stroke-rounded IconSquareArrowReload01StrokeRounded"
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

export const IconSquareArrowReload01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-reload-01-duotone-rounded IconSquareArrowReload01DuotoneRounded"
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

export const IconSquareArrowReload01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-reload-01-twotone-rounded IconSquareArrowReload01TwotoneRounded"
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

export const IconSquareArrowReload01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-reload-01-solid-rounded IconSquareArrowReload01SolidRounded"
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

export const IconSquareArrowReload01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-reload-01-bulk-rounded IconSquareArrowReload01BulkRounded"
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

export const IconSquareArrowReload01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-reload-01-stroke-sharp IconSquareArrowReload01StrokeSharp"
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

export const IconSquareArrowReload01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-reload-01-solid-sharp IconSquareArrowReload01SolidSharp"
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

export const iconPackOfSquareArrowReload01: TheIconSelfPack = {
  name: 'SquareArrowReload01',
  StrokeRounded: IconSquareArrowReload01StrokeRounded,
  DuotoneRounded: IconSquareArrowReload01DuotoneRounded,
  TwotoneRounded: IconSquareArrowReload01TwotoneRounded,
  SolidRounded: IconSquareArrowReload01SolidRounded,
  BulkRounded: IconSquareArrowReload01BulkRounded,
  StrokeSharp: IconSquareArrowReload01StrokeSharp,
  SolidSharp: IconSquareArrowReload01SolidSharp,
};