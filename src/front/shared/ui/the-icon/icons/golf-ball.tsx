import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10.0078 7L9.99883 7',
  d2: 'M9 18C10.5 18 12 19.4617 12 22C12 19.4617 13.5 18 15 18',
  d3: 'M12 1C7.71979 1 4.25 4.46979 4.25 8.75C4.25 13.0302 7.71979 16.5 12 16.5C16.2802 16.5 19.75 13.0302 19.75 8.75C19.75 4.46979 16.2802 1 12 1ZM10.0045 8C10.6924 8 11.25 7.44036 11.25 6.75C11.25 6.05964 10.6924 5.5 10.0045 5.5H9.99553C9.30764 5.5 8.75 6.05964 8.75 6.75C8.75 7.44036 9.30764 8 9.99552 8H10.0045Z',
  d4: 'M8 17.875C8 17.3227 8.44772 16.875 9 16.875C10.1555 16.875 11.1898 17.4413 11.917 18.3921C11.9586 18.4465 12.0414 18.4465 12.083 18.3921C12.8102 17.4413 13.8445 16.875 15 16.875C15.5523 16.875 16 17.3227 16 17.875C16 18.4273 15.5523 18.875 15 18.875C14.2247 18.875 13 19.699 13 21.875C13 22.4273 12.5523 22.875 12 22.875C11.4477 22.875 11 22.4273 11 21.875C11 19.699 9.77525 18.875 9 18.875C8.44772 18.875 8 18.4273 8 17.875Z',
  d5: 'M4.25 8.75C4.25 4.46979 7.71979 1 12 1C16.2802 1 19.75 4.46979 19.75 8.75C19.75 13.0302 16.2802 16.5 12 16.5C7.71979 16.5 4.25 13.0302 4.25 8.75Z',
  d6: 'M11.25 6.75C11.25 7.44036 10.6924 8 10.0045 8H9.99552C9.30764 8 8.75 7.44036 8.75 6.75C8.75 6.05964 9.30764 5.5 9.99553 5.5L10.0045 5.5C10.6924 5.5 11.25 6.05964 11.25 6.75Z',
  d7: 'M12 1.75C7.71979 1.75 4.25 5.21979 4.25 9.5C4.25 13.7802 7.71979 17.25 12 17.25C16.2802 17.25 19.75 13.7802 19.75 9.5C19.75 5.21979 16.2802 1.75 12 1.75ZM10.0078 8.5C10.5601 8.5 11.0078 8.05228 11.0078 7.5C11.0078 6.94772 10.5601 6.5 10.0078 6.5H9.99883C9.44655 6.5 8.99883 6.94771 8.99883 7.5C8.99883 8.05228 9.44655 8.5 9.99883 8.5H10.0078Z',
  d8: 'M11 22.25C11 20.5092 9.77525 19.85 9 19.85V18.25C10.2002 18.25 11.2696 18.7388 12 19.5533C12.7304 18.7388 13.7998 18.25 15 18.25V19.85C14.2247 19.85 13 20.5092 13 22.25H11Z',
};

export const IconGolfBallStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GolfBall StrokeRounded"
    >
      <circle 
        cx="12"
        cy="9"
        r="7"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGolfBallDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GolfBall DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="9"
        r="7"
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="9"
        r="7"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGolfBallTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GolfBall TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="9"
        r="7"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconGolfBallSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GolfBall SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconGolfBallBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GolfBall BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconGolfBallStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GolfBall StrokeSharp"
    >
      <circle 
        cx="12"
        cy="9"
        r="7"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconGolfBallSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="GolfBall SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGolfBall: TheIconSelfPack = [
  'GolfBall',
  IconGolfBallStrokeRounded,
  IconGolfBallDuotoneRounded,
  IconGolfBallTwotoneRounded,
  IconGolfBallSolidRounded,
  IconGolfBallBulkRounded,
  IconGolfBallStrokeSharp,
  IconGolfBallSolidSharp,
];