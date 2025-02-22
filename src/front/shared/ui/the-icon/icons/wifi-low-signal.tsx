import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.5126 10.7306L15.1758 18.009C13.7137 20.003 12.9827 21 12 21C11.0173 21 10.2863 20.003 8.82421 18.009L3.48742 10.7306C2.40801 9.25847 1.86831 8.52241 2.02741 7.57659C2.18651 6.63078 2.81754 6.2161 4.07962 5.38675C6.38289 3.87318 9.0958 3 12 3C14.9042 3 17.6171 3.87318 19.9204 5.38675C21.1825 6.2161 21.8135 6.63078 21.9726 7.57659C22.1317 8.52241 21.592 9.25847 20.5126 10.7306Z',
  d2: 'M16 17C13.465 15.6667 10.535 15.6667 8 17',
  d3: 'M19.9204 5.38675C17.6171 3.87318 14.9042 3 12 3C9.0958 3 6.38289 3.87318 4.07962 5.38675C2.81754 6.2161 2.18651 6.63078 2.02741 7.57659C1.86831 8.52241 2.40801 9.25847 3.48742 10.7306L8 17C10.535 15.6667 13.465 15.6667 16 17L20.5126 10.7306C21.592 9.25847 22.1317 8.52241 21.9726 7.57659C21.8135 6.63078 21.1825 6.2161 19.9204 5.38675Z',
  d4: 'M3.66779 4.50997C6.0874 2.91996 8.94247 2 12.0001 2C15.0576 2 17.9127 2.91996 20.3323 4.50997L20.4786 4.60593C21.5958 5.33798 22.4981 5.92924 22.7123 7.20218C22.8258 7.877 22.6756 8.46261 22.3741 9.04912C22.0968 9.58861 21.6621 10.1813 21.1513 10.878L17.8453 15.3867C17.61 15.7076 17.4923 15.8681 17.3309 15.916C17.1695 15.9639 16.9638 15.8862 16.5523 15.7308C15.2318 15.2319 13.5917 15 12 15C10.4083 15 8.76822 15.2319 7.44775 15.7307C7.03632 15.8862 6.8306 15.9639 6.66918 15.916C6.50776 15.8681 6.39009 15.7076 6.15475 15.3866L2.84886 10.878C2.33797 10.1813 1.90334 9.58862 1.626 9.04912C1.3245 8.46261 1.17434 7.877 1.28786 7.20218C1.50199 5.92924 2.4043 5.33798 3.52149 4.60593L3.66779 4.50997ZM15.3369 16.9125C14.3614 16.6436 13.1959 16.5 11.9991 16.5C10.8023 16.5 9.63689 16.6436 8.66135 16.9125L8.66134 16.9125C8.20438 17.0384 7.97589 17.1014 7.88032 17.3194C7.87072 17.3414 7.86063 17.3704 7.85457 17.3935C7.79427 17.6238 7.94749 17.8328 8.25393 18.2507C8.95483 19.2067 9.52923 19.9901 10.0553 20.5271C10.6004 21.0835 11.2113 21.5 11.9992 21.5C12.7871 21.5 13.398 21.0835 13.9431 20.5271C14.4691 19.9901 15.0435 19.2067 15.7444 18.2508C16.0508 17.8328 16.2041 17.6238 16.1437 17.3935C16.1377 17.3704 16.1276 17.3414 16.118 17.3195C16.0225 17.1014 15.794 17.0385 15.3369 16.9125Z',
  d5: 'M12.0001 2C8.94247 2 6.0874 2.91996 3.66779 4.50997L3.52149 4.60593C2.4043 5.33798 1.50199 5.92924 1.28786 7.20218C1.17434 7.877 1.3245 8.46261 1.626 9.04912C1.90334 9.58862 2.33797 10.1813 2.84886 10.878L6.15475 15.3866C6.39009 15.7076 6.50776 15.8681 6.66918 15.916C6.8306 15.9639 7.03632 15.8862 7.44775 15.7307C8.76822 15.2319 10.4083 15 12 15C13.5917 15 15.2318 15.2319 16.5523 15.7308C16.9638 15.8862 17.1695 15.9639 17.3309 15.916C17.4923 15.8681 17.61 15.7076 17.8453 15.3867L21.1513 10.878C21.6621 10.1813 22.0968 9.58861 22.3741 9.04912C22.6756 8.46261 22.8258 7.877 22.7123 7.20218C22.4981 5.92924 21.5958 5.33798 20.4786 4.60593L20.3323 4.50997C17.9127 2.91996 15.0576 2 12.0001 2Z',
  d6: 'M11.9991 16.5C13.196 16.5 14.3614 16.6436 15.3369 16.9125C15.794 17.0385 16.0225 17.1014 16.118 17.3195C16.1276 17.3414 16.1377 17.3704 16.1437 17.3935C16.2041 17.6238 16.0508 17.8328 15.7444 18.2508C15.0435 19.2067 14.4691 19.9901 13.943 20.5271C13.398 21.0835 12.7871 21.5 11.9992 21.5C11.2113 21.5 10.6004 21.0835 10.0553 20.5271C9.52923 19.9901 8.95483 19.2067 8.25393 18.2507C7.94749 17.8328 7.79427 17.6238 7.85457 17.3935C7.86063 17.3704 7.87072 17.3414 7.88032 17.3194C7.9759 17.1014 8.20438 17.0384 8.66135 16.9125C9.63689 16.6436 10.8023 16.5 11.9991 16.5Z',
  d7: 'M12 21L11.3927 21.4401C11.5338 21.6348 11.7596 21.75 12 21.75C12.2404 21.75 12.4662 21.6348 12.6073 21.4401L12 21ZM22 7.20203L22.6073 7.64216C22.8219 7.34604 22.7916 6.93831 22.5357 6.67711L22 7.20203ZM2 7.20203L1.46432 6.67711C1.20836 6.93831 1.17811 7.34604 1.39272 7.64216L2 7.20203ZM12 3.75C15.7077 3.75 19.0585 5.27188 21.4643 7.72696L22.5357 6.67711C19.8594 3.94598 16.1271 2.25 12 2.25V3.75ZM2.53568 7.72696C4.94146 5.27188 8.29233 3.75 12 3.75V2.25C7.87292 2.25 4.14061 3.94598 1.46432 6.67711L2.53568 7.72696ZM1.39272 7.64216L11.3927 21.4401L12.6073 20.5599L2.60728 6.76191L1.39272 7.64216ZM12.6073 21.4401L22.6073 7.64216L21.3927 6.76191L11.3927 20.5599L12.6073 21.4401Z',
  d8: 'M9.10379 17.3145C10.9773 16.5618 13.022 16.5618 14.8956 17.3145L15.4547 15.9226C13.2223 15.0258 10.777 15.0258 8.54465 15.9226L9.10379 17.3145Z',
  d9: 'M12 2.25C7.87293 2.25 4.14061 3.94598 1.46433 6.67711C1.20837 6.93831 1.17812 7.34604 1.39273 7.64216L8.02426 16.7923C9.2893 16.439 10.6229 16.25 12.0005 16.25C13.3778 16.25 14.7111 16.4389 15.9759 16.7921L22.6073 7.64216C22.8219 7.34604 22.7916 6.93831 22.5357 6.67711C19.8594 3.94598 16.1271 2.25 12 2.25Z',
  d10: 'M12.0005 17.75C13.0428 17.75 14.0569 17.8703 15.0297 18.0977L12.6073 21.4401C12.4662 21.6348 12.2404 21.75 12 21.75C11.7596 21.75 11.5338 21.6348 11.3927 21.4401L8.97049 18.0979C9.94356 17.8703 10.9579 17.75 12.0005 17.75Z',
};

export const IconWifiLowSignalStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-low-signal-stroke-rounded IconWifiLowSignalStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconWifiLowSignalDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-low-signal-duotone-rounded IconWifiLowSignalDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconWifiLowSignalTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-low-signal-twotone-rounded IconWifiLowSignalTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconWifiLowSignalSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-low-signal-solid-rounded IconWifiLowSignalSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWifiLowSignalBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-low-signal-bulk-rounded IconWifiLowSignalBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconWifiLowSignalStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-low-signal-stroke-sharp IconWifiLowSignalStrokeSharp"
    >
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

export const IconWifiLowSignalSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-low-signal-solid-sharp IconWifiLowSignalSolidSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWifiLowSignal: TheIconSelfPack = {
  name: 'WifiLowSignal',
  StrokeRounded: IconWifiLowSignalStrokeRounded,
  DuotoneRounded: IconWifiLowSignalDuotoneRounded,
  TwotoneRounded: IconWifiLowSignalTwotoneRounded,
  SolidRounded: IconWifiLowSignalSolidRounded,
  BulkRounded: IconWifiLowSignalBulkRounded,
  StrokeSharp: IconWifiLowSignalStrokeSharp,
  SolidSharp: IconWifiLowSignalSolidSharp,
};