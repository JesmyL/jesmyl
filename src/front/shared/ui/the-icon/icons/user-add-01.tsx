import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.5 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C7.67837 14.2307 10.1368 13.7719 12.5 14.1052C13.3575 14.2261 14.1926 14.4514 15 14.7809',
  d2: 'M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z',
  d3: 'M18.5 22L18.5 15M15 18.5H22',
  d4: 'M5.57757 15.4816C4.1628 16.324 0.453365 18.0441 2.71266 20.1966C3.81631 21.248 5.04549 22 6.59087 22H15.4091C16.9545 22 18.1837 21.248 19.2873 20.1966C21.5466 18.0441 17.8372 16.324 16.4224 15.4816C13.1048 13.5061 8.89519 13.5061 5.57757 15.4816Z',
  d5: 'M6.62598 6.375C6.62598 3.4755 8.97648 1.125 11.876 1.125C14.7755 1.125 17.126 3.4755 17.126 6.375C17.126 9.2745 14.7755 11.625 11.876 11.625C8.97648 11.625 6.62598 9.2745 6.62598 6.375Z',
  d6: 'M18.376 13.875C18.9283 13.875 19.376 14.3227 19.376 14.875V17.375H21.876C22.4283 17.375 22.876 17.8227 22.876 18.375C22.876 18.9273 22.4283 19.375 21.876 19.375H19.376V21.875C19.376 22.4273 18.9283 22.875 18.376 22.875C17.8237 22.875 17.376 22.4273 17.376 21.875L17.376 19.375H14.876C14.3237 19.375 13.876 18.9273 13.876 18.375C13.876 17.8227 14.3237 17.375 14.876 17.375H17.376L17.376 14.875C17.376 14.3227 17.8237 13.875 18.376 13.875Z',
  d7: 'M15.7262 14.2045C15.852 14.2637 15.9155 14.4032 15.8971 14.5409C15.8825 14.6502 15.875 14.7617 15.875 14.875V15.575C15.875 15.7407 15.7407 15.875 15.575 15.875H14.875C13.4943 15.875 12.375 16.9943 12.375 18.375C12.375 19.7557 13.4943 20.875 14.875 20.875H15.575C15.7407 20.875 15.875 21.0093 15.875 21.175V21.875C15.875 21.9983 15.8839 22.1195 15.9012 22.238C15.9277 22.4204 15.8105 22.6027 15.6265 22.6143C15.5141 22.6214 15.4 22.625 15.2843 22.625H6.46604C4.64774 22.625 3.24195 21.7306 2.0705 20.6146C1.39149 19.9677 1.05302 19.2396 1.13783 18.4638C1.21757 17.7342 1.65623 17.1387 2.1179 16.6868C2.85606 15.9643 3.93357 15.3564 4.64639 14.9543C4.80901 14.8625 4.95275 14.7814 5.06904 14.7122C6.37389 13.9352 7.80596 13.4441 9.27043 13.2375C10.3343 13.0875 11.4161 13.0875 12.4799 13.2375C13.5948 13.3948 14.6908 13.7169 15.7262 14.2045Z',
  d8: 'M11.8755 1.125C8.97599 1.125 6.62549 3.4755 6.62549 6.375C6.62549 9.2745 8.97599 11.625 11.8755 11.625C14.775 11.625 17.1255 9.2745 17.1255 6.375C17.1255 3.4755 14.775 1.125 11.8755 1.125Z',
  d9: 'M15.8971 14.5409C15.9155 14.4032 15.852 14.2637 15.7262 14.2045C14.6908 13.7169 13.5948 13.3948 12.4799 13.2375C11.4161 13.0875 10.3343 13.0875 9.27043 13.2375C7.80596 13.4441 6.37389 13.9352 5.06904 14.7122C4.95278 14.7814 4.80908 14.8625 4.64651 14.9542C3.93369 15.3563 2.85606 15.9643 2.1179 16.6868C1.65623 17.1387 1.21757 17.7342 1.13783 18.4638C1.05302 19.2396 1.39149 19.9677 2.0705 20.6146C3.24195 21.7306 4.64774 22.625 6.46604 22.625H15.2843C15.4 22.625 15.5141 22.6214 15.6265 22.6143C15.8105 22.6027 15.9277 22.4204 15.9012 22.238C15.8839 22.1195 15.875 21.9983 15.875 21.875V21.175C15.875 21.0093 15.7407 20.875 15.575 20.875H14.875C13.4943 20.875 12.375 19.7557 12.375 18.375C12.375 16.9943 13.4943 15.875 14.875 15.875H15.575C15.7407 15.875 15.875 15.7407 15.875 15.575V14.875C15.875 14.7617 15.8825 14.6502 15.8971 14.5409Z',
  d10: 'M12 20H2C2 16.134 5.58172 13 10 13C11.8919 13 13.6304 13.5746 15 14.5353M14 6C14 8.20914 12.2091 10 10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6Z',
  d11: 'M18 22L18 14M14 18H22',
  d12: 'M19.25 19.25L19.25 22.25H17.25L17.25 19.25H14.25V17.25H17.25L17.25 14.25H19.25L19.25 17.25H22.25V19.25H19.25Z',
  d13: 'M10.5 1.75C7.87665 1.75 5.75 3.87665 5.75 6.5C5.75 9.12335 7.87665 11.25 10.5 11.25C13.1234 11.25 15.25 9.12335 15.25 6.5C15.25 3.87665 13.1234 1.75 10.5 1.75Z',
  d14: 'M10.5 12.75C5.76471 12.75 1.75 16.1289 1.75 20.5V21.25H12.75V15.75H15.75V14.3001C14.275 13.3221 12.4485 12.75 10.5 12.75Z',
};

export const IconUserAdd01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserAdd01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserAdd01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserAdd01 DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserAdd01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserAdd01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserAdd01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserAdd01 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconUserAdd01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserAdd01 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <g    i-c="o7">
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconUserAdd01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserAdd01 StrokeSharp"
    >
      <path 
        d={d.d10}
        i-c="s sw"
      />
      <path 
        d={d.d11}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconUserAdd01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UserAdd01 SolidSharp"
    >
      <path 
        d={d.d12}
        i-c="c f fr"
      />
      <path 
        d={d.d13}
        i-c="f"
      />
      <path 
        d={d.d14}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUserAdd01: TheIconSelfPack = [
  'UserAdd01',
  IconUserAdd01StrokeRounded,
  IconUserAdd01DuotoneRounded,
  IconUserAdd01TwotoneRounded,
  IconUserAdd01SolidRounded,
  IconUserAdd01BulkRounded,
  IconUserAdd01StrokeSharp,
  IconUserAdd01SolidSharp,
];