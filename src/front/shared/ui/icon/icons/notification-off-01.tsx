import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19.0045 19H4.8005C3.78202 19 3 18.1508 3 17.1527C3 16.427 3.34173 15.7438 3.92239 15.3084C5.16997 14.373 5.08548 12.887 5.15897 11.491C5.24716 9.8159 5.93091 8.14023 7 7.00002',
  d2: 'M9.49997 5.5C10.2958 5.17734 11.0937 5 12.0025 5C15.6474 5 18.6545 7.85223 18.8461 11.491C18.9196 12.887 18.8351 14.373 20.0827 15.3084C20.6224 15.7131 20.9557 16.332 21 17',
  d3: 'M10.5 3.125C10.5 3.95343 11.1716 5 12 5C12.8284 5 13.5 3.95343 13.5 3.125C13.5 2.29657 12.8284 2 12 2C11.1716 2 10.5 2.29657 10.5 3.125Z',
  d4: 'M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19',
  d5: 'M22 22L2 2',
  d6: 'M4.8 18.9974H19.2L7.08254 7.07812C5.96653 8.22803 5.24878 9.77058 5.15837 11.4884C5.08489 12.8844 5.16936 14.3704 3.92213 15.3058C3.34164 15.7412 3 16.4245 3 17.1501C3 18.1482 3.7818 18.9974 4.8 18.9974Z',
  d7: 'M19.0045 19H4.8005C3.78202 19 3 18.1508 3 17.1527C3 16.427 3.34173 15.7438 3.92239 15.3084C5.16997 14.373 5.08548 12.887 5.15897 11.491C5.24716 9.81588 5.93091 8.14021 7 7',
  d8: 'M9.5 5.5C10.2958 5.17734 11.0937 5 12.0025 5C15.6474 5 18.6545 7.85223 18.8461 11.491C18.9196 12.887 18.8351 14.373 20.0827 15.3084C20.6224 15.7131 20.9557 16.332 21 17M10.5 3.125C10.5 3.95343 11.1716 5 12 5C12.8284 5 13.5 3.95343 13.5 3.125C13.5 2.29657 12.8284 2 12 2C11.1716 2 10.5 2.29657 10.5 3.125Z',
  d9: 'M10.5286 1.37434C10.9737 1.08296 11.517 1 12 1C12.483 1 13.0263 1.08296 13.4714 1.37434C13.9652 1.69759 14.25 2.22083 14.25 2.875C14.25 3.47116 14.017 4.09375 13.6626 4.57057C13.3138 5.03989 12.7415 5.5 12 5.5C11.2585 5.5 10.6862 5.03989 10.3374 4.57057C9.98299 4.09375 9.75 3.47116 9.75 2.875C9.75 2.22083 10.0348 1.69759 10.5286 1.37434Z',
  d10: 'M9 18C9.55228 18 10 18.4477 10 19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19C14 18.4477 14.4477 18 15 18C15.5523 18 16 18.4477 16 19C16 21.2091 14.2091 23 12 23C9.79086 23 8 21.2091 8 19C8 18.4477 8.44772 18 9 18Z',
  d11: 'M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z',
  d12: 'M7.30917 5.87109C5.63957 7.18177 4.52909 9.17888 4.4094 11.4529C4.40032 11.6254 4.39357 11.7906 4.38705 11.9497C4.3649 12.4912 4.34561 12.9628 4.24749 13.4145C4.13025 13.9544 3.91329 14.3788 3.47213 14.7097C2.70278 15.2867 2.25 16.1922 2.25 17.1539C2.25 18.5352 3.33719 19.7513 4.8 19.7513H19.2C19.7702 19.7513 20.2833 19.5665 20.6973 19.2592L7.30917 5.87109Z',
  d13: 'M21.1488 17.5891C21.3543 17.7946 21.457 17.8973 21.5761 17.855C21.6951 17.8127 21.7085 17.6821 21.7353 17.4209C21.7444 17.3324 21.749 17.2429 21.749 17.1527C21.749 16.191 21.2962 15.2854 20.5269 14.7084C20.0857 14.3775 19.8688 13.9531 19.7515 13.4133C19.6534 12.9615 19.6341 12.49 19.612 11.9485C19.6055 11.7893 19.5987 11.6241 19.5896 11.4516C19.3771 7.41446 16.0418 4.25 11.999 4.25C10.9789 4.25 10.0037 4.45151 9.11244 4.81771C8.88423 4.91148 8.77013 4.95836 8.74909 5.06336C8.72805 5.16836 8.81859 5.2589 8.99968 5.43999L21.1488 17.5891Z',
  d14: 'M12 1C11.517 1 10.9737 1.08296 10.5286 1.37434C10.0348 1.69759 9.75 2.22083 9.75 2.875C9.75 3.42276 9.9467 3.99284 10.2535 4.45165C9.86076 4.54402 9.47949 4.6669 9.11244 4.81771C8.88423 4.91148 8.77013 4.95836 8.74909 5.06336C8.72805 5.16836 8.81859 5.2589 8.99968 5.43999L21.1488 17.5891C21.3543 17.7946 21.457 17.8973 21.5761 17.855C21.6951 17.8127 21.7085 17.6821 21.7353 17.4209C21.7444 17.3324 21.749 17.2429 21.749 17.1527C21.749 16.191 21.2962 15.2854 20.5269 14.7084C20.0857 14.3775 19.8688 13.9531 19.7515 13.4133C19.6534 12.9615 19.6341 12.49 19.612 11.9485V11.9485C19.6055 11.7893 19.5987 11.6241 19.5896 11.4516C19.4087 8.01427 16.9639 5.20957 13.7462 4.45204C14.0532 3.99316 14.25 3.42292 14.25 2.875C14.25 2.22083 13.9652 1.69759 13.4714 1.37434C13.0263 1.08296 12.483 1 12 1Z',
  d15: 'M10.5 3.5C10.5 4.32843 11.1716 5 12 5C12.8284 5 13.5 4.32843 13.5 3.5C13.5 2.67157 12.8284 2 12 2C11.1716 2 10.5 2.67157 10.5 3.5Z',
  d16: 'M8.94514 5.75016C9.86592 5.27999 10.9062 5 12.0122 5C15.8547 5 18.8275 8.22521 18.8275 11.4045V13.9663L20.9978 16.4399V17.7974M7.09542 7.09338C5.87032 8.30861 5.12009 9.88832 5.12009 11.3729V13.9392L3.00195 16.5198V19H18.994',
  d17: 'M9.75 3.49997C9.75 2.25733 10.7574 1.24997 12 1.24997C13.2426 1.24997 14.25 2.25733 14.25 3.49997C14.25 4.74261 13.2426 5.74997 12 5.74997C10.7574 5.74997 9.75 4.74261 9.75 3.49997ZM12 2.74997C11.5858 2.74997 11.25 3.08576 11.25 3.49997C11.25 3.91418 11.5858 4.24997 12 4.24997C12.4142 4.24997 12.75 3.91418 12.75 3.49997C12.75 3.08576 12.4142 2.74997 12 2.74997Z',
  d18: 'M10 18.75C10 19.8545 10.8954 20.75 12 20.75C13.1046 20.75 14 19.8545 14 18.75H16C16 20.9591 14.2091 22.75 12 22.75C9.79086 22.75 8 20.9591 8 18.75H10Z',
  d19: 'M21.3358 22.75L1.25 2.66418L2.66422 1.24997L22.75 21.3358L21.3358 22.75Z',
  d20: 'M19.5904 11.4516C19.3779 7.41442 16.0425 4.24995 11.9998 4.24995C10.7765 4.24995 9.61792 4.53971 8.59107 5.05571L21.7498 18.2144V16.5C21.7498 16.32 21.6851 16.146 21.5675 16.0098L19.5914 13.721V11.4712L19.5904 11.4516Z',
  d21: 'M2.24978 16.5V19.75H19.7498L6.55103 6.55121C5.30884 7.82775 4.50968 9.54204 4.40918 11.4516L4.40815 11.4712V13.721L2.43208 16.0098C2.31448 16.146 2.24978 16.32 2.24978 16.5Z',
};

export const IconNotificationOff01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-01-stroke-rounded IconNotificationOff01StrokeRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-01-duotone-rounded IconNotificationOff01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-01-twotone-rounded IconNotificationOff01TwotoneRounded"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-01-solid-rounded IconNotificationOff01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-01-bulk-rounded IconNotificationOff01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-01-stroke-sharp IconNotificationOff01StrokeSharp"
    >
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-01-solid-sharp IconNotificationOff01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNotificationOff01: TheIconSelfPack = {
  name: 'NotificationOff01',
  StrokeRounded: IconNotificationOff01StrokeRounded,
  DuotoneRounded: IconNotificationOff01DuotoneRounded,
  TwotoneRounded: IconNotificationOff01TwotoneRounded,
  SolidRounded: IconNotificationOff01SolidRounded,
  BulkRounded: IconNotificationOff01BulkRounded,
  StrokeSharp: IconNotificationOff01StrokeSharp,
  SolidSharp: IconNotificationOff01SolidSharp,
};