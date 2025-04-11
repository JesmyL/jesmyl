import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 20C3 20 10 4 21 4',
  d2: 'M10 9.50005C12.9152 6.46907 16.644 4 21 4',
  d3: 'M3.91615 20.4008L3.91943 20.3934L3.93282 20.3634C3.9451 20.336 3.96407 20.2941 3.98964 20.2385C4.04079 20.1274 4.11831 19.962 4.22145 19.7501C4.42781 19.326 4.73634 18.7164 5.14107 17.9833C5.95183 16.5148 7.14215 14.5624 8.66302 12.6156C11.7489 8.66572 15.9892 5 21 5C21.5523 5 22 4.55228 22 4C22 3.44772 21.5523 3 21 3C15.0108 3 10.2511 7.33428 7.08697 11.3844C5.48284 13.4376 4.23566 15.4852 3.39018 17.0167C2.96678 17.7836 2.64249 18.424 2.42307 18.8749C2.31332 19.1005 2.22971 19.2788 2.17295 19.4021C2.14457 19.4637 2.12289 19.5116 2.10801 19.5448L2.0908 19.5834L2.08603 19.5942L2.08415 19.5985C2.08398 19.5989 2.08384 19.5992 3 20L2.08415 19.5985C1.86278 20.1045 2.0932 20.6948 2.59918 20.9162C3.10505 21.1375 3.69467 20.9066 3.91615 20.4008Z',
  d4: 'M21 5C17.0364 5 13.5515 7.25004 10.7207 10.1933C10.3379 10.5913 9.70485 10.6036 9.3068 10.2208C8.90874 9.83794 8.89641 9.2049 9.27926 8.80684C12.2789 5.68809 16.2515 3 21 3C21.5523 3 22 3.44772 22 4C22 4.55228 21.5523 5 21 5Z',
  d5: 'M2.75 19.6248C2.75 19.6248 3.21679 18.2836 3.64018 17.5167C4.48566 15.9852 5.73284 13.9376 7.33698 11.8844C10.5011 7.83428 15.2608 3.5 21.25 3.5V5.5C16.2392 5.5 11.9989 9.16572 8.91302 13.1156C7.39215 15.0624 6.20184 17.0148 5.39107 18.4833C4.98634 19.2164 4.54839 20.5 4.54839 20.5L2.75 19.6248Z',
};

export const IconEaseOutStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseOut StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEaseOutDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseOut DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEaseOutTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseOut TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEaseOutSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseOut SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconEaseOutBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseOut BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr o7"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconEaseOutStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseOut StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconEaseOutSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseOut SolidSharp"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfEaseOut: TheIconSelfPack = [
  'EaseOut',
  IconEaseOutStrokeRounded,
  IconEaseOutDuotoneRounded,
  IconEaseOutTwotoneRounded,
  IconEaseOutSolidRounded,
  IconEaseOutBulkRounded,
  IconEaseOutStrokeSharp,
  IconEaseOutSolidSharp,
];