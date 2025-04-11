import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9 2H15',
  d2: 'M10 2V8M14 2V8',
  d3: 'M8.5 20.5V22H9V20.5',
  d4: 'M15.5 20.5V22H15V20.5',
  d5: 'M13 20.5H11C8.64298 20.5 7.46447 20.5 6.73223 19.7678C6 19.0355 6 17.857 6 15.5V13C6 10.643 6 9.46447 6.73223 8.73223C7.46447 8 8.64298 8 11 8H13C15.357 8 16.5355 8 17.2678 8.73223C18 9.46447 18 10.643 18 13V15.5C18 17.857 18 19.0355 17.2678 19.7678C16.5355 20.5 15.357 20.5 13 20.5Z',
  d6: 'M10 11V17.5',
  d7: 'M14 11V17.5',
  d8: 'M8.25 2C8.25 1.58579 8.58579 1.25 9 1.25H15C15.4142 1.25 15.75 1.58579 15.75 2C15.75 2.41421 15.4142 2.75 15 2.75H9C8.58579 2.75 8.25 2.41421 8.25 2Z',
  d9: 'M10 1.25C10.4142 1.25 10.75 1.58579 10.75 2V8C10.75 8.41421 10.4142 8.75 10 8.75C9.58579 8.75 9.25 8.41421 9.25 8V2C9.25 1.58579 9.58579 1.25 10 1.25ZM14 1.25C14.4142 1.25 14.75 1.58579 14.75 2V8C14.75 8.41421 14.4142 8.75 14 8.75C13.5858 8.75 13.25 8.41421 13.25 8V2C13.25 1.58579 13.5858 1.25 14 1.25Z',
  d10: 'M8.5 19.75C8.58766 19.75 8.67181 19.765 8.75 19.7927C8.82819 19.765 8.91234 19.75 9 19.75C9.41421 19.75 9.75 20.0858 9.75 20.5V22C9.75 22.4142 9.41421 22.75 9 22.75H8.5C8.08579 22.75 7.75 22.4142 7.75 22V20.5C7.75 20.0858 8.08579 19.75 8.5 19.75Z',
  d11: 'M15 19.75C15.0877 19.75 15.1718 19.765 15.25 19.7927C15.3282 19.765 15.4123 19.75 15.5 19.75C15.9142 19.75 16.25 20.0858 16.25 20.5V22C16.25 22.4142 15.9142 22.75 15.5 22.75H15C14.5858 22.75 14.25 22.4142 14.25 22V20.5C14.25 20.0858 14.5858 19.75 15 19.75Z',
  d12: 'M13.0537 7.25H13.0537C14.1866 7.24998 15.1123 7.24996 15.8431 7.34822C16.6071 7.45093 17.2694 7.67321 17.7981 8.20191C18.3268 8.7306 18.5491 9.39294 18.6518 10.1569C18.75 10.8878 18.75 11.8135 18.75 12.9463V15.5537C18.75 16.6865 18.75 17.6123 18.6518 18.3431C18.5491 19.1071 18.3268 19.7694 17.7981 20.2981C17.2694 20.8268 16.6071 21.0491 15.8431 21.1518C15.1123 21.25 14.1865 21.25 13.0537 21.25H10.9463C9.81348 21.25 8.88775 21.25 8.15689 21.1518C7.39294 21.0491 6.7306 20.8268 6.20191 20.2981C5.67321 19.7694 5.45093 19.1071 5.34822 18.3431C5.24996 17.6123 5.24998 16.6866 5.25 15.5537V15.5537V15.5537V12.9463V12.9463V12.9463C5.24998 11.8135 5.24996 10.8877 5.34822 10.1569C5.45093 9.39294 5.67321 8.7306 6.20191 8.20191C6.7306 7.67321 7.39294 7.45093 8.15689 7.34822C8.88774 7.24996 9.81346 7.24998 10.9463 7.25H10.9463H10.9463H13.0537H13.0537ZM10 10.25C10.4142 10.25 10.75 10.5858 10.75 11V17.5C10.75 17.9142 10.4142 18.25 10 18.25C9.58579 18.25 9.25 17.9142 9.25 17.5V11C9.25 10.5858 9.58579 10.25 10 10.25ZM14.75 11C14.75 10.5858 14.4142 10.25 14 10.25C13.5858 10.25 13.25 10.5858 13.25 11V17.5C13.25 17.9142 13.5858 18.25 14 18.25C14.4142 18.25 14.75 17.9142 14.75 17.5V11Z',
  d13: 'M13.0537 7.25C14.1865 7.24998 15.1123 7.24996 15.8431 7.34822C16.6071 7.45093 17.2694 7.67321 17.7981 8.2019C18.3268 8.7306 18.5491 9.39293 18.6518 10.1569C18.75 10.8877 18.75 11.8135 18.75 12.9463V15.5537C18.75 16.6865 18.75 17.6123 18.6518 18.3431C18.5491 19.1071 18.3268 19.7694 17.7981 20.2981C17.2694 20.8268 16.6071 21.0491 15.8431 21.1518C15.1123 21.25 14.1865 21.25 13.0537 21.25H10.9463C9.81348 21.25 8.88775 21.25 8.15689 21.1518C7.39293 21.0491 6.7306 20.8268 6.2019 20.2981C5.67321 19.7694 5.45093 19.1071 5.34822 18.3431C5.24996 17.6123 5.24998 16.6865 5.25 15.5537V15.5537V12.9463V12.9463C5.24998 11.8135 5.24996 10.8877 5.34822 10.1569C5.45093 9.39294 5.67321 8.7306 6.2019 8.2019C6.7306 7.67321 7.39294 7.45093 8.15689 7.34822C8.88774 7.24996 9.81347 7.24998 10.9463 7.25H10.9463H13.0537H13.0537Z',
  d14: 'M7.75 21.083V22.0003C7.75 22.4145 8.08579 22.7503 8.5 22.7503H9C9.41421 22.7503 9.75 22.4145 9.75 22.0003V21.245C9.14159 21.2363 8.61153 21.2132 8.15689 21.1521C8.01783 21.1334 7.88213 21.1108 7.75 21.083Z',
  d15: 'M14.25 21.245V22.0003C14.25 22.4145 14.5858 22.7503 15 22.7503H15.5C15.9142 22.7503 16.25 22.4145 16.25 22.0003V21.083C16.1179 21.1108 15.9822 21.1334 15.8431 21.1521C15.3885 21.2132 14.8584 21.2363 14.25 21.245Z',
  d16: 'M10 10.25C10.4142 10.25 10.75 10.5858 10.75 11V17.5C10.75 17.9142 10.4142 18.25 10 18.25C9.58579 18.25 9.25 17.9142 9.25 17.5V11C9.25 10.5858 9.58579 10.25 10 10.25Z',
  d17: 'M14 10.25C14.4142 10.25 14.75 10.5858 14.75 11V17.5C14.75 17.9142 14.4142 18.25 14 18.25C13.5858 18.25 13.25 17.9142 13.25 17.5V11C13.25 10.5858 13.5858 10.25 14 10.25Z',
  d18: 'M10.75 2C10.75 1.58579 10.4142 1.25 10 1.25C9.58579 1.25 9.25 1.58579 9.25 2V7.26675C9.70014 7.25174 10.1996 7.25017 10.75 7.25002V2Z',
  d19: 'M14.75 7.26675C14.2999 7.25174 13.8004 7.25017 13.25 7.25002V2C13.25 1.58579 13.5858 1.25 14 1.25C14.4142 1.25 14.75 1.58579 14.75 2V7.26675Z',
  d20: 'M18 8H6V20.5H18V8Z',
  d21: 'M8.25 1.25H15.75V2.75H8.25V1.25Z',
  d22: 'M10.75 1.25V8.75H9.25V1.25H10.75ZM14.75 1.25V8.75H13.25V1.25H14.75Z',
  d23: 'M7.75 19.75H9.75V22.75H7.75V19.75Z',
  d24: 'M14.25 19.75H16.25V22.75H14.25V19.75Z',
  d25: 'M5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H18C18.4142 7.25 18.75 7.58579 18.75 8V20.5C18.75 20.9142 18.4142 21.25 18 21.25H6C5.58579 21.25 5.25 20.9142 5.25 20.5V8ZM10.75 10.25V18.25H9.25V10.25H10.75ZM14.75 18.25V10.25H13.25V18.25H14.75Z',
};

export const IconLuggage02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Luggage02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLuggage02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Luggage02 DuotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLuggage02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Luggage02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLuggage02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Luggage02 SolidRounded"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLuggage02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Luggage02 BulkRounded"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d13}
        i-c="f o7"
      />
      <path 
        d={d.d14}
        i-c="f"
      />
      <path 
        d={d.d15}
        i-c="f"
      />
      <path 
        d={d.d16}
        i-c="c f fr"
      />
      <path 
        d={d.d17}
        i-c="c f fr"
      />
      <path 
        d={d.d18}
        i-c="f"
      />
      <path 
        d={d.d19}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconLuggage02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Luggage02 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d2}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d3}
        i-c="s ss sw"
      />
      <path 
        d={d.d4}
        i-c="s ss sw"
      />
      <path 
        d={d.d20}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d6}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d7}
        i-c="s sj ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconLuggage02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Luggage02 SolidSharp"
    >
      <path 
        d={d.d21}
        i-c="c f fr"
      />
      <path 
        d={d.d22}
        i-c="c f fr"
      />
      <path 
        d={d.d23}
        i-c="c f fr"
      />
      <path 
        d={d.d24}
        i-c="c f fr"
      />
      <path 
        d={d.d25}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLuggage02: TheIconSelfPack = [
  'Luggage02',
  IconLuggage02StrokeRounded,
  IconLuggage02DuotoneRounded,
  IconLuggage02TwotoneRounded,
  IconLuggage02SolidRounded,
  IconLuggage02BulkRounded,
  IconLuggage02StrokeSharp,
  IconLuggage02SolidSharp,
];