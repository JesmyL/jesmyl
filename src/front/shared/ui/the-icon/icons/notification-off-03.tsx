import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.5 17.8286C13.319 18.9099 8.23949 18.6851 4.43205 17.1542C3.268 16.6862 2.31727 15.7471 2.52992 14.394C2.66061 13.5625 3.30684 12.8701 3.78561 12.194C4.41272 11.2975 4.47503 10.3197 4.47513 9.27941C4.47513 7.94101 4.84851 6.57748 5.5 5.49997',
  d2: 'M7.5 3.5C8.76108 2.55917 10.339 2 12.0511 2C16.1846 2 19.5355 5.2591 19.5355 9.27941C19.5356 10.3197 19.5976 11.2975 20.2213 12.194C20.6975 12.8701 21.3403 13.5625 21.4702 14.394C21.6084 15.278 21.2527 15.9853 20.6666 16.5',
  d3: 'M22 22L2 2',
  d4: 'M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21',
  d5: 'M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.39263 18.7467 13.7297 18.9259 18 17.6918L5.56753 5.5C4.87437 6.60166 4.47513 7.89543 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z',
  d6: 'M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z',
  d7: 'M4.33746 17.8436C3.05056 17.3119 1.75836 16.1253 2.03868 14.2925C2.12459 13.7307 2.37452 13.2486 2.63033 12.8488C2.85872 12.4919 3.20169 12.0479 3.38271 11.7855C3.85838 11.0856 3.92776 10.3069 3.92786 9.27525C3.92787 7.7462 4.35764 6.31745 5.1034 5.10156L18.3282 18.3263C13.9571 19.6996 8.43994 19.5387 4.33746 17.8436Z',
  d8: 'M11.9986 1.25C16.4545 1.25 20.0708 4.84155 20.0708 9.27703C20.0709 10.3088 20.1403 11.0874 20.616 11.7873C20.797 12.0497 21.14 12.4937 21.3683 12.8505C21.6241 13.2503 21.8741 13.7324 21.96 14.2942C22.1025 15.2258 21.8387 15.9904 21.3758 16.587C21.1499 16.8782 21.0369 17.0237 20.8116 17.0379C20.5864 17.0521 20.4308 16.8965 20.1196 16.5853L7.49333 3.95903C7.12846 3.59416 6.94602 3.41172 6.97101 3.17447C6.99601 2.93722 7.1953 2.80794 7.59387 2.54937C8.86076 1.72753 10.3739 1.25 11.9986 1.25Z',
  d9: 'M14.7776 21.9511C13.9742 22.4563 13.0187 22.7477 11.9985 22.7477C10.9782 22.7477 10.0227 22.4563 9.21934 21.9511C8.5063 21.5027 8.14977 21.2784 8.27454 20.9057C8.3993 20.533 8.89126 20.5747 9.87518 20.6582C11.2824 20.7776 12.7146 20.7776 14.1217 20.6582C15.1057 20.5747 15.5976 20.533 15.7224 20.9057C15.8472 21.2784 15.4906 21.5027 14.7776 21.9511Z',
  d10: 'M7.07596 3.87534C8.39813 2.70939 10.1347 2.00195 12.0366 2.00195C16.1792 2.00195 19.5375 5.35821 19.5375 9.49837V12.409L21.458 15.8276C21.4817 15.8697 21.4719 15.9228 21.4345 15.9534C21.0051 16.3045 20.5606 16.6206 20.1041 16.9041M5.62892 5.59936C4.93537 6.73536 4.53578 8.07023 4.53578 9.49837V12.409L2.54054 15.8544C2.51757 15.8941 2.52316 15.9431 2.55654 15.9746C4.96747 18.2443 12.0218 20.3036 17.9747 17.9688',
  d11: 'M9.46139 20.409C10.1226 20.9255 11.0106 21.2501 11.9997 21.2501C12.9888 21.2501 13.8768 20.9255 14.538 20.409L15.4614 21.5911C14.5304 22.3184 13.3157 22.7501 11.9997 22.7501C10.6838 22.7501 9.46906 22.3184 8.53802 21.5911L9.46139 20.409Z',
  d12: 'M21.3367 22.75L1.25092 2.66424L2.66513 1.25003L22.7509 21.3358L21.3367 22.75Z',
  d13: 'M12.0016 1.25012C16.4673 1.25012 20.0874 4.94377 20.0874 9.50012V12.3009L22.2516 16.1653L21.7917 16.5688C21.4974 16.827 21.1798 17.0724 20.8408 17.3038L6.75744 3.22038C8.16929 1.99178 10.0006 1.25012 12.0016 1.25012Z',
  d14: 'M12.0016 19.7501C8.0309 19.7501 4.44634 18.5296 2.21149 16.5688L1.75162 16.1653L3.91586 12.3009V9.50012C3.91586 7.89791 4.3635 6.40238 5.13813 5.13661L18.5333 18.5318C16.635 19.3092 14.388 19.7501 12.0016 19.7501Z',
};

export const IconNotificationOff03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationOff03 StrokeRounded"
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
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationOff03 DuotoneRounded"
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
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationOff03 TwotoneRounded"
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
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationOff03 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationOff03 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f o7"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationOff03 StrokeSharp"
    >
      <path 
        d={d.d3}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationOff03 SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="f"
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

export const iconPackOfNotificationOff03: TheIconSelfPack = [
  'NotificationOff03',
  IconNotificationOff03StrokeRounded,
  IconNotificationOff03DuotoneRounded,
  IconNotificationOff03TwotoneRounded,
  IconNotificationOff03SolidRounded,
  IconNotificationOff03BulkRounded,
  IconNotificationOff03StrokeSharp,
  IconNotificationOff03SolidSharp,
];