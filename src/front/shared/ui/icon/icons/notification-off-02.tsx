import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 18.1673C13.7297 19.4388 8.39263 19.2542 4.43205 17.6135C3.268 17.1312 2.31727 16.1637 2.52992 14.7696C2.66061 13.9129 3.30684 13.1995 3.78561 12.5029C4.41272 11.5793 4.47503 10.5718 4.47513 9.50001C4.47513 8.12105 4.84851 6.61015 5.5 5.49998',
  d2: 'M7.5 3.48831C8.75404 2.55352 10.3103 2 11.9962 2C16.1487 2 19.5149 5.35786 19.5149 9.5C19.5149 10.5718 19.5772 11.5793 20.2038 12.5029C20.6822 13.1995 21.3279 13.9129 21.4584 14.7696C21.5788 15.5596 21.4422 15.9946 20.9887 16.5',
  d3: 'M22 22L2 2',
  d4: 'M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19',
  d5: 'M2.52992 14.7696C2.31727 16.1636 3.268 17.1312 4.43205 17.6134C8.54879 19.3188 14.1527 19.4511 18.5 18.0101L5.63352 5.5C4.89977 6.6577 4.47513 8.02942 4.47513 9.5C4.47503 10.5718 4.41272 11.5793 3.78561 12.5029C3.30684 13.1995 2.66061 13.9129 2.52992 14.7696Z',
  d6: 'M7.74341 17.7838C8.27717 17.6419 8.82485 17.9596 8.9667 18.4934C9.30659 19.7724 10.5207 20.7502 12.0002 20.7502C13.4798 20.7502 14.6939 19.7724 15.0338 18.4934C15.1756 17.9596 15.7233 17.6419 16.2571 17.7838C16.7908 17.9256 17.1086 18.4733 16.9667 19.0071C16.3896 21.1786 14.3697 22.7502 12.0002 22.7502C9.63084 22.7502 7.61087 21.1786 7.03379 19.0071C6.89194 18.4733 7.20965 17.9256 7.74341 17.7838Z',
  d7: 'M4.33746 17.8433C3.05056 17.3115 1.75836 16.1249 2.03868 14.2921C2.12459 13.7303 2.37452 13.2482 2.63033 12.8484C2.77528 12.6219 2.96636 12.3603 3.13291 12.1324C3.22879 12.0011 3.31657 11.881 3.38271 11.7851C3.85838 11.0852 3.92776 10.3066 3.92786 9.27487C3.92787 7.74598 4.35755 6.31737 5.10317 5.10156L18.3277 18.3261C13.9567 19.6992 8.43979 19.5383 4.33746 17.8433Z',
  d8: 'M11.999 1.25C16.4548 1.25 20.0711 4.84155 20.0711 9.27703C20.0712 10.3088 20.1406 11.0874 20.6163 11.7873C20.6824 11.883 20.7704 12.0035 20.8661 12.1345C21.0326 12.3624 21.2237 12.624 21.3687 12.8505C21.6245 13.2503 21.8744 13.7324 21.9603 14.2942C22.1028 15.226 21.8389 15.9908 21.3758 16.5874C21.1499 16.8785 21.0369 17.0241 20.8117 17.0382C20.5864 17.0523 20.4308 16.8968 20.1196 16.5856L7.49331 3.95927C7.12845 3.59441 6.94603 3.41199 6.97101 3.17474C6.996 2.9375 7.19527 2.80822 7.59381 2.54964C8.86078 1.72763 10.3741 1.25 11.999 1.25Z',
  d9: 'M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z',
  d10: 'M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18',
  d11: 'M20.1489 16.9669C20.6445 16.6701 21.097 16.3466 21.5 16L19.5 12.5V9.49998C19.5 5.35785 16.1421 1.99998 12 1.99998C10.1025 1.99998 8.36953 2.70466 7.0486 3.8666M5.59533 5.59532C4.90044 6.73269 4.5 8.06957 4.5 9.49998V12.5L2.5 16C4.61145 17.8156 8.07958 19 12 19C14.1896 19 16.2381 18.6305 17.988 17.988',
  d12: 'M12.0008 21.25C10.2058 21.25 8.75076 19.7949 8.75076 18H7.25076C7.25076 20.6233 9.37741 22.75 12.0008 22.75C14.6241 22.75 16.7508 20.6233 16.7508 18H15.2508C15.2508 19.7949 13.7957 21.25 12.0008 21.25Z',
  d13: 'M21.3365 22.75L1.25076 2.6642L2.66498 1.24998L22.7508 21.3358L21.3365 22.75Z',
  d14: 'M12.0013 1.24997C16.4669 1.24997 20.0871 4.94362 20.0871 9.49997V12.3008L22.2513 16.1652L21.7914 16.5686C21.4971 16.8268 21.1794 17.0722 20.8405 17.3036L6.75712 3.22024C8.16898 1.99163 10.0003 1.24997 12.0013 1.24997Z',
  d15: 'M12.0013 19.75C8.03059 19.75 4.44603 18.5294 2.21118 16.5686L1.75131 16.1652L3.91556 12.3008V9.49997C3.91556 7.89777 4.36319 6.40224 5.13782 5.13648L18.533 18.5316C16.6347 19.3091 14.3877 19.75 12.0013 19.75Z',
};

export const IconNotificationOff02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-02-stroke-rounded IconNotificationOff02StrokeRounded"
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-02-duotone-rounded IconNotificationOff02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-02-twotone-rounded IconNotificationOff02TwotoneRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-02-solid-rounded IconNotificationOff02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-02-bulk-rounded IconNotificationOff02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-02-stroke-sharp IconNotificationOff02StrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationOff02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-off-02-solid-sharp IconNotificationOff02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNotificationOff02: TheIconSelfPack = {
  name: 'NotificationOff02',
  StrokeRounded: IconNotificationOff02StrokeRounded,
  DuotoneRounded: IconNotificationOff02DuotoneRounded,
  TwotoneRounded: IconNotificationOff02TwotoneRounded,
  SolidRounded: IconNotificationOff02SolidRounded,
  BulkRounded: IconNotificationOff02BulkRounded,
  StrokeSharp: IconNotificationOff02StrokeSharp,
  SolidSharp: IconNotificationOff02SolidSharp,
};