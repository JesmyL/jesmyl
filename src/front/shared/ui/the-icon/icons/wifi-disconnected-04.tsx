import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 21C11.0173 21 10.2863 20.003 8.82421 18.009L3.48742 10.7306C2.40801 9.25847 1.86831 8.52241 2.02741 7.57659C2.18651 6.63078 2.81754 6.2161 4.07962 5.38675C6.38289 3.87318 9.0958 3 12 3C14.9042 3 17.6171 3.87318 19.9204 5.38675C21.1825 6.2161 21.8135 6.63078 21.9726 7.57659C22.1317 8.52241 21.592 9.25847 20.5126 10.7306L19 12.6988',
  d2: 'M21.0002 15L15.0002 21M21.0002 21L15.0002 15',
  d3: 'M20.5126 10.7306L15.1758 18.009C13.7137 20.003 12.9827 21 12 21C11.0173 21 10.2863 20.003 8.82421 18.009L3.48742 10.7306C2.40801 9.25847 1.86831 8.52241 2.02741 7.57659C2.18651 6.63078 2.81754 6.2161 4.07962 5.38675C6.38289 3.87318 9.0958 3 12 3C14.9042 3 17.6171 3.87318 19.9204 5.38675C21.1825 6.2161 21.8135 6.63078 21.9726 7.57659C22.1317 8.52241 21.592 9.25847 20.5126 10.7306Z',
  d4: 'M4.26436 5.30293C6.51398 3.84259 9.16448 3 12 3C14.8355 3 17.486 3.84259 19.7356 5.30293L19.7834 5.33394C20.3295 5.68832 20.8178 6.0052 21.1785 6.35107C21.5861 6.74191 21.8589 7.19254 21.9636 7.80729C22.0731 8.45033 21.9266 9.00592 21.6425 9.55188C21.3827 10.0512 20.9766 10.5982 20.5031 11.2361L18.4142 14.0502C18.3579 14.1066 18.3297 14.1348 18.3028 14.1552C18.1239 14.2914 17.8761 14.2914 17.6972 14.1552C17.6703 14.1348 17.6421 14.1066 17.5858 14.0502L16.7678 13.2322C15.7915 12.2559 14.2085 12.2559 13.2322 13.2322C12.2559 14.2085 12.2559 15.7915 13.2322 16.7678L13.7574 17.2929C14.0907 17.6262 14.2574 17.7929 14.2574 18C14.2574 18.2071 14.0907 18.3738 13.7574 18.7071L13.2322 19.2322C12.8889 19.5756 12.6663 19.994 12.5644 20.4346C12.5282 20.5912 12.5101 20.6695 12.4842 20.7219C12.4209 20.8497 12.2902 20.9536 12.1514 20.9865C12.0946 21 12.063 21 12 21C11.2821 21 10.7179 20.6248 10.2059 20.1085C9.71526 19.6137 9.17973 18.8922 8.52851 18.0148L3.4969 11.236C3.02338 10.5982 2.61732 10.0512 2.3575 9.55188C2.07339 9.00592 1.92688 8.45033 2.03638 7.80729C2.14107 7.19254 2.41393 6.74191 2.82154 6.35107C3.18224 6.0052 3.67053 5.68831 4.21659 5.33394L4.26436 5.30293Z',
  d5: 'M14.2929 14.2929C14.6834 13.9024 15.3166 13.9024 15.7071 14.2929L18 16.5858L20.2929 14.2929C20.6834 13.9024 21.3166 13.9024 21.7071 14.2929C22.0976 14.6834 22.0976 15.3166 21.7071 15.7071L19.4142 18L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L18 19.4142L15.7071 21.7071C15.3166 22.0976 14.6834 22.0976 14.2929 21.7071C13.9024 21.3166 13.9024 20.6834 14.2929 20.2929L16.5858 18L14.2929 15.7071C13.9024 15.3166 13.9024 14.6834 14.2929 14.2929Z',
  d6: 'M22 7.20203L22.6073 7.64216C22.8219 7.34604 22.7916 6.93831 22.5357 6.67711L22 7.20203ZM2 7.20203L1.46432 6.67711C1.20836 6.93831 1.17811 7.34604 1.39272 7.64216L2 7.20203ZM12 3.75C15.7077 3.75 19.0585 5.27188 21.4643 7.72696L22.5357 6.67711C19.8594 3.94598 16.1271 2.25 12 2.25V3.75ZM2.53568 7.72696C4.94146 5.27188 8.29233 3.75 12 3.75V2.25C7.87292 2.25 4.14061 3.94598 1.46432 6.67711L2.53568 7.72696ZM1.39272 7.64216L11.3927 21.4401L12.6073 20.5599L2.60728 6.76191L1.39272 7.64216ZM19.13 12.4401L22.6073 7.64216L21.3927 6.76191L17.9154 11.5599L19.13 12.4401Z',
  d7: 'M19.4573 18.043L21.7502 20.3359L20.3359 21.7502L18.043 19.4573L15.7502 21.7502L14.3359 20.3359L16.6288 18.043L14.3359 15.7502L15.7502 14.3359L18.043 16.6288L20.3359 14.3359L21.7502 15.7502L19.4573 18.043Z',
  d8: 'M12 2.25C7.87293 2.25 4.14061 3.94598 1.46433 6.67711C1.20837 6.93831 1.17812 7.34604 1.39273 7.64216L11.3927 21.4401C11.5338 21.6348 11.7596 21.75 12 21.75C12.2404 21.75 12.4662 21.6348 12.6073 21.4401L12.9063 21.0276L12.2148 20.3362L14.5077 18.0433L12.2148 15.7504L15.7504 12.2148L17.8045 14.269L22.6073 7.64216C22.8219 7.34604 22.7916 6.93831 22.5357 6.67711C19.8594 3.94598 16.1271 2.25 12 2.25Z',
};

export const IconWifiDisconnected04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-disconnected-04-stroke-rounded IconWifiDisconnected04StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWifiDisconnected04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-disconnected-04-duotone-rounded IconWifiDisconnected04DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWifiDisconnected04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-disconnected-04-twotone-rounded IconWifiDisconnected04TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWifiDisconnected04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-disconnected-04-solid-rounded IconWifiDisconnected04SolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconWifiDisconnected04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-disconnected-04-bulk-rounded IconWifiDisconnected04BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWifiDisconnected04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-disconnected-04-stroke-sharp IconWifiDisconnected04StrokeSharp"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWifiDisconnected04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-disconnected-04-solid-sharp IconWifiDisconnected04SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfWifiDisconnected04: TheIconSelfPack = {
  name: 'WifiDisconnected04',
  StrokeRounded: IconWifiDisconnected04StrokeRounded,
  DuotoneRounded: IconWifiDisconnected04DuotoneRounded,
  TwotoneRounded: IconWifiDisconnected04TwotoneRounded,
  SolidRounded: IconWifiDisconnected04SolidRounded,
  BulkRounded: IconWifiDisconnected04BulkRounded,
  StrokeSharp: IconWifiDisconnected04StrokeSharp,
  SolidSharp: IconWifiDisconnected04SolidSharp,
};