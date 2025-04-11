import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 3H21',
  d2: 'M3 21H21',
  d3: 'M3 9H5',
  d4: 'M19 9H21',
  d5: 'M3 15H5',
  d6: 'M19 15H21',
  d7: 'M8.58579 15.4142C9.17157 16 10.1144 16 12 16C13.8856 16 14.8284 16 15.4142 15.4142C16 14.8284 16 13.8856 16 12C16 10.1144 16 9.17157 15.4142 8.58579C14.8284 8 13.8856 8 12 8C10.1144 8 9.17157 8 8.58579 8.58579C8 9.17157 8 10.1144 8 12C8 13.8856 8 14.8284 8.58579 15.4142Z',
  d8: 'M2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3C22 3.55228 21.5523 4 21 4H3C2.44772 4 2 3.55228 2 3Z',
  d9: 'M2 21C2 20.4477 2.44772 20 3 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21Z',
  d10: 'M2 9C2 8.44772 2.44772 8 3 8H5C5.55228 8 6 8.44772 6 9C6 9.55228 5.55228 10 5 10H3C2.44772 10 2 9.55228 2 9Z',
  d11: 'M18 9C18 8.44772 18.4477 8 19 8H21C21.5523 8 22 8.44772 22 9C22 9.55228 21.5523 10 21 10H19C18.4477 10 18 9.55228 18 9Z',
  d12: 'M2 15C2 14.4477 2.44772 14 3 14H5C5.55228 14 6 14.4477 6 15C6 15.5523 5.55228 16 5 16H3C2.44772 16 2 15.5523 2 15Z',
  d13: 'M18 15C18 14.4477 18.4477 14 19 14H21C21.5523 14 22 14.4477 22 15C22 15.5523 21.5523 16 21 16H19C18.4477 16 18 15.5523 18 15Z',
  d14: 'M12.052 7.25C12.9505 7.24997 13.6997 7.24995 14.2945 7.32991C14.9223 7.41432 15.4891 7.59999 15.9445 8.05546C16.4 8.51093 16.5857 9.07773 16.6701 9.70552C16.7501 10.3003 16.75 11.0495 16.75 11.948V11.948V12.052V12.052C16.75 12.9505 16.7501 13.6997 16.6701 14.2945C16.5857 14.9223 16.4 15.4891 15.9445 15.9445C15.4891 16.4 14.9223 16.5857 14.2945 16.6701C13.6997 16.7501 12.9505 16.75 12.052 16.75H12.052H11.948H11.948C11.0495 16.75 10.3003 16.7501 9.70552 16.6701C9.07773 16.5857 8.51093 16.4 8.05546 15.9445C7.59999 15.4891 7.41432 14.9223 7.32991 14.2945C7.24995 13.6997 7.24997 12.9505 7.25 12.052V12.052V11.948V11.948C7.24997 11.0495 7.24995 10.3003 7.32991 9.70552C7.41432 9.07773 7.59999 8.51093 8.05546 8.05546C8.51093 7.59999 9.07773 7.41432 9.70552 7.32991C10.3003 7.24995 11.0495 7.24997 11.948 7.25H11.948H12.052H12.052Z',
  d15: 'M16 8H8V16H16V8Z',
  d16: 'M2 2H22V4H2V2Z',
  d17: 'M2 20H22V22H2V20Z',
  d18: 'M2 8H5V10H2V8Z',
  d19: 'M19 8H22V10H19V8Z',
  d20: 'M2 14H5V16H2V14Z',
  d21: 'M19 14H22V16H19V14Z',
  d22: 'M7.25 8C7.25 7.58579 7.58579 7.25 8 7.25H16C16.4142 7.25 16.75 7.58579 16.75 8V16C16.75 16.4142 16.4142 16.75 16 16.75H8C7.58579 16.75 7.25 16.4142 7.25 16V8Z',
};

export const IconTextCenterlineMiddleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextCenterlineMiddle StrokeRounded"
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

export const IconTextCenterlineMiddleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextCenterlineMiddle DuotoneRounded"
    >
      <path 
        d={d.d7}
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

export const IconTextCenterlineMiddleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextCenterlineMiddle TwotoneRounded"
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
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextCenterlineMiddleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextCenterlineMiddle SolidRounded"
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
      <path 
        d={d.d13}
        i-c="c f fr"
      />
      <path 
        d={d.d14}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconTextCenterlineMiddleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextCenterlineMiddle BulkRounded"
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
        i-c="c f fr o7"
      />
      <path 
        d={d.d11}
        i-c="c f fr o7"
      />
      <path 
        d={d.d12}
        i-c="c f fr o7"
      />
      <path 
        d={d.d13}
        i-c="c f fr o7"
      />
      <path 
        d={d.d14}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconTextCenterlineMiddleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextCenterlineMiddle StrokeSharp"
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
        i-c="s sj ss sw"
      />
      <path 
        d={d.d4}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d5}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d6}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d15}
        i-c="s sj ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextCenterlineMiddleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextCenterlineMiddle SolidSharp"
    >
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
        i-c="c f fr"
      />
      <path 
        d={d.d19}
        i-c="c f fr"
      />
      <path 
        d={d.d20}
        i-c="c f fr"
      />
      <path 
        d={d.d21}
        i-c="c f fr"
      />
      <path 
        d={d.d22}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTextCenterlineMiddle: TheIconSelfPack = [
  'TextCenterlineMiddle',
  IconTextCenterlineMiddleStrokeRounded,
  IconTextCenterlineMiddleDuotoneRounded,
  IconTextCenterlineMiddleTwotoneRounded,
  IconTextCenterlineMiddleSolidRounded,
  IconTextCenterlineMiddleBulkRounded,
  IconTextCenterlineMiddleStrokeSharp,
  IconTextCenterlineMiddleSolidSharp,
];