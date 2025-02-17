import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 13C6 9.68629 8.68629 7 12 7C15.3137 7 18 9.68629 18 13C18 16.3137 15.3137 19 12 19C8.68629 19 6 16.3137 6 13Z',
  d2: 'M15.5 8V5.52063C15.5 3.57624 13.933 2 12 2C10.067 2 8.5 3.57624 8.5 5.52063V8',
  d3: 'M11.9998 13H12.0088',
  d4: 'M12 19V22M12 22H20M12 22H4',
  d5: 'M12 1C9.50919 1 7.5 3.0295 7.5 5.52063V7.96876C6.11906 9.20473 5.25 11.0009 5.25 13C5.25 16.7279 8.27208 19.75 12 19.75C15.7279 19.75 18.75 16.7279 18.75 13C18.75 11.0009 17.8809 9.20473 16.5 7.96876V5.52063C16.5 3.0295 14.4908 1 12 1ZM14.5 6.7281V5.52063C14.5 4.12298 13.3752 3 12 3C10.6248 3 9.5 4.12298 9.5 5.52063V6.7281C10.2732 6.41963 11.1168 6.25 12 6.25C12.8832 6.25 13.7268 6.41963 14.5 6.7281ZM10.9998 13C10.9998 12.4477 11.4475 12 11.9998 12H12.0088C12.5611 12 13.0088 12.4477 13.0088 13C13.0088 13.5523 12.5611 14 12.0088 14H11.9998C11.4475 14 10.9998 13.5523 10.9998 13Z',
  d6: 'M12 18C12.5523 18 13 18.4477 13 19V21H20C20.5523 21 21 21.4477 21 22C21 22.5523 20.5523 23 20 23H4C3.44772 23 3 22.5523 3 22C3 21.4477 3.44772 21 4 21H11V19C11 18.4477 11.4477 18 12 18Z',
  d7: 'M7.5 5.77063C7.5 3.2795 9.50919 1.25 12 1.25C14.4908 1.25 16.5 3.2795 16.5 5.77063V8.25H14.5V5.77063C14.5 4.37298 13.3752 3.25 12 3.25C10.6248 3.25 9.5 4.37298 9.5 5.77063V8.25H7.5V5.77063Z',
  d8: 'M12 6.25C8.27208 6.25 5.25 9.27208 5.25 13C5.25 16.7279 8.27208 19.75 12 19.75C15.7279 19.75 18.75 16.7279 18.75 13C18.75 9.27208 15.7279 6.25 12 6.25ZM13 12H11V14H13V12Z',
  d9: 'M11 20.75V18.75H13V20.75H20V22.75H4V20.75H11Z',
};

export const IconSecuredNetworkStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="secured-network-stroke-rounded IconSecuredNetworkStrokeRounded"
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
      <path 
        d={d.d3} 
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
    </TheIconWrapper>
  );
};

export const IconSecuredNetworkDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="secured-network-duotone-rounded IconSecuredNetworkDuotoneRounded"
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

export const IconSecuredNetworkTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="secured-network-twotone-rounded IconSecuredNetworkTwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
    </TheIconWrapper>
  );
};

export const IconSecuredNetworkSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="secured-network-solid-rounded IconSecuredNetworkSolidRounded"
    >
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

export const IconSecuredNetworkBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="secured-network-bulk-rounded IconSecuredNetworkBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
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

export const IconSecuredNetworkStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="secured-network-stroke-sharp IconSecuredNetworkStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSecuredNetworkSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="secured-network-solid-sharp IconSecuredNetworkSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfSecuredNetwork: TheIconSelfPack = {
  name: 'SecuredNetwork',
  StrokeRounded: IconSecuredNetworkStrokeRounded,
  DuotoneRounded: IconSecuredNetworkDuotoneRounded,
  TwotoneRounded: IconSecuredNetworkTwotoneRounded,
  SolidRounded: IconSecuredNetworkSolidRounded,
  BulkRounded: IconSecuredNetworkBulkRounded,
  StrokeSharp: IconSecuredNetworkStrokeSharp,
  SolidSharp: IconSecuredNetworkSolidSharp,
};