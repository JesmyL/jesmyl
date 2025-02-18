import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.15837 11.491C5.08489 12.887 5.16936 14.373 3.92213 15.3084C3.34164 15.7438 3 16.427 3 17.1527C3 18.1508 3.7818 19 4.8 19H19.2C20.2182 19 21 18.1508 21 17.1527C21 16.427 20.6584 15.7438 20.0779 15.3084C18.8306 14.373 18.9151 12.887 18.8416 11.491C18.6501 7.85223 15.6438 5 12 5C8.35617 5 5.34988 7.85222 5.15837 11.491Z',
  d2: 'M10.5 3.125C10.5 3.95343 11.1716 5 12 5C12.8284 5 13.5 3.95343 13.5 3.125C13.5 2.29657 12.8284 2 12 2C11.1716 2 10.5 2.29657 10.5 3.125Z',
  d3: 'M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19',
  d4: 'M4.4094 11.4516C4.62188 7.41446 7.95728 4.25 12 4.25C16.0427 4.25 19.3781 7.41446 19.5906 11.4516C19.5997 11.6241 19.6064 11.7893 19.6129 11.9485C19.6351 12.49 19.6544 12.9615 19.7525 13.4133C19.8698 13.9531 20.0867 14.3775 20.5279 14.7084C21.2972 15.2854 21.75 16.191 21.75 17.1527C21.75 18.534 20.6628 19.75 19.2 19.75H4.8C3.33719 19.75 2.25 18.534 2.25 17.1527C2.25 16.191 2.70278 15.2854 3.47213 14.7084C3.91329 14.3775 4.13025 13.9531 4.24749 13.4133C4.34561 12.9615 4.3649 12.49 4.38705 11.9485V11.9485L4.38705 11.9485C4.39356 11.7893 4.40032 11.6241 4.4094 11.4516Z',
  d5: 'M10.5286 1.37434C10.9737 1.08296 11.517 1 12 1C12.483 1 13.0263 1.08296 13.4714 1.37434C13.9652 1.69759 14.25 2.22083 14.25 2.875C14.25 3.47116 14.017 4.09375 13.6626 4.57057C13.3138 5.03989 12.7415 5.5 12 5.5C11.2585 5.5 10.6862 5.03989 10.3374 4.57057C9.98299 4.09375 9.75 3.47116 9.75 2.875C9.75 2.22083 10.0348 1.69759 10.5286 1.37434Z',
  d6: 'M9 18C9.55228 18 10 18.4477 10 19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19C14 18.4477 14.4477 18 15 18C15.5523 18 16 18.4477 16 19C16 21.2091 14.2091 23 12 23C9.79086 23 8 21.2091 8 19C8 18.4477 8.44772 18 9 18Z',
  d7: 'M8.07019 19.75C8.42125 21.6006 10.0472 23 12 23C13.9528 23 15.5787 21.6006 15.9298 19.75H13.8546C13.5579 20.483 12.8393 21 12 21C11.1606 21 10.4421 20.483 10.1454 19.75H8.07019Z',
  d8: 'M12 1C11.517 1 10.9737 1.08296 10.5286 1.37434C10.0348 1.69759 9.75 2.22083 9.75 2.875C9.75 3.42284 9.94675 3.993 10.2537 4.45184C10.8149 4.31978 11.3997 4.25 12 4.25C12.6003 4.25 13.1851 4.31978 13.7463 4.45184C14.0532 3.993 14.25 3.42284 14.25 2.875C14.25 2.22083 13.9652 1.69759 13.4714 1.37434C13.0263 1.08296 12.483 1 12 1Z',
  d9: 'M10.4718 3.50009C10.4718 4.32852 11.1452 5.00009 11.9759 5.00009C12.8065 5.00009 13.4799 4.32852 13.4799 3.50009C13.4799 2.67166 12.8065 2.00009 11.9759 2.00009C11.1452 2.00009 10.4718 2.67166 10.4718 3.50009Z',
  d10: 'M14.9837 19.0001C14.9837 20.657 13.6369 22.0001 11.9755 22.0001C10.3141 22.0001 8.96739 20.657 8.96739 19.0001',
  d11: 'M3.00255 19.0001H20.9984V16.44L18.8281 13.9664V11.4046C18.8281 8.2253 15.8552 5.00009 12.0128 5.00009C8.17027 5.00009 5.12068 8.37983 5.12068 11.373V13.9393L3.00255 16.5199V19.0001Z',
  d12: 'M4.4094 11.4516C4.62189 7.41446 7.95728 4.25 12 4.25C16.0427 4.25 19.3781 7.41446 19.5906 11.4516L19.5916 11.4713V13.721L21.5677 16.0099C21.6853 16.1461 21.75 16.32 21.75 16.5V19.75H2.25V16.5C2.25 16.32 2.3147 16.1461 2.4323 16.0099L4.40837 13.721V11.4713L4.4094 11.4516Z',
  d13: 'M9.75 3.5C9.75 2.25736 10.7574 1.25 12 1.25C13.2426 1.25 14.25 2.25736 14.25 3.5C14.25 4.74264 13.2426 5.75 12 5.75C10.7574 5.75 9.75 4.74264 9.75 3.5ZM12 2.75C11.5858 2.75 11.25 3.08578 11.25 3.5C11.25 3.91421 11.5858 4.25 12 4.25C12.4142 4.25 12.75 3.91421 12.75 3.5C12.75 3.08578 12.4142 2.75 12 2.75Z',
  d14: 'M10 18.75C10 19.8546 10.8954 20.75 12 20.75C13.1046 20.75 14 19.8546 14 18.75H16C16 20.9591 14.2091 22.75 12 22.75C9.79086 22.75 8 20.9591 8 18.75H10Z',
};

export const IconNotification01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-01-stroke-rounded IconNotification01StrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotification01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-01-duotone-rounded IconNotification01DuotoneRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotification01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-01-twotone-rounded IconNotification01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotification01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-01-solid-rounded IconNotification01SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotification01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-01-bulk-rounded IconNotification01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotification01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-01-stroke-sharp IconNotification01StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotification01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-01-solid-sharp IconNotification01SolidSharp"
    >
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNotification01: TheIconSelfPack = {
  name: 'Notification01',
  StrokeRounded: IconNotification01StrokeRounded,
  DuotoneRounded: IconNotification01DuotoneRounded,
  TwotoneRounded: IconNotification01TwotoneRounded,
  SolidRounded: IconNotification01SolidRounded,
  BulkRounded: IconNotification01BulkRounded,
  StrokeSharp: IconNotification01StrokeSharp,
  SolidSharp: IconNotification01SolidSharp,
};