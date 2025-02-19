import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 3.5V2',
  d2: 'M10 2H14',
  d3: 'M14.7728 10.2571C15.5061 10.9837 14.3328 16.8933 13.1289 16.9974C12.1189 17.0848 11.8041 15.0928 11.5914 14.4614C11.3815 13.8383 11.1478 13.6139 10.5298 13.4095C8.95989 12.8901 8.17492 12.6304 8.0195 12.2192C7.60796 11.1304 13.8362 9.32902 14.7728 10.2571Z',
  d4: 'M12 22C16.9706 22 21 17.9706 21 13C21 8.02944 16.9706 4 12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22ZM13.1289 16.9974C14.3328 16.8933 15.5061 10.9837 14.7728 10.2571C13.8362 9.32902 7.60796 11.1304 8.0195 12.2192C8.17492 12.6304 8.95989 12.8901 10.5298 13.4095C11.1478 13.6139 11.3815 13.8383 11.5914 14.4614C11.6281 14.5702 11.6677 14.7194 11.7135 14.8914C11.9332 15.7176 12.2929 17.0697 13.1289 16.9974Z',
  d5: 'M9.25 2C9.25 1.58579 9.58579 1.25 10 1.25H14C14.4142 1.25 14.75 1.58579 14.75 2C14.75 2.41421 14.4142 2.75 14 2.75H12.75V3.5C12.75 3.91421 12.4142 4.25 12 4.25C11.5858 4.25 11.25 3.91421 11.25 3.5V2.75H10C9.58579 2.75 9.25 2.41421 9.25 2Z',
  d6: 'M12 3.25C6.61522 3.25 2.25 7.61522 2.25 13C2.25 18.3848 6.61522 22.75 12 22.75C17.3848 22.75 21.75 18.3848 21.75 13C21.75 7.61522 17.3848 3.25 12 3.25ZM13.1289 16.9972C14.3328 16.8931 15.5061 10.9837 14.7728 10.2571C13.8362 9.32904 7.60796 11.1304 8.0195 12.2192C8.17492 12.6304 8.95989 12.89 10.5298 13.4094C11.1478 13.6138 11.3815 13.8382 11.5914 14.4613C11.6281 14.5701 11.6677 14.7193 11.7135 14.8913C11.9332 15.7174 12.2929 17.0695 13.1289 16.9972Z',
  d7: 'M2.25 13C2.25 7.61522 6.61522 3.25 12 3.25C17.3848 3.25 21.75 7.61522 21.75 13C21.75 18.3848 17.3848 22.75 12 22.75C6.61522 22.75 2.25 18.3848 2.25 13Z',
  d8: 'M10 1.25C9.58579 1.25 9.25 1.58579 9.25 2C9.25 2.41421 9.58579 2.75 10 2.75H11.25V3.27842C11.4975 3.25959 11.7476 3.25 12 3.25C12.2524 3.25 12.5025 3.25959 12.75 3.27842V2.75H14C14.4142 2.75 14.75 2.41421 14.75 2C14.75 1.58579 14.4142 1.25 14 1.25H10Z',
  d9: 'M14.7728 10.2571C15.5061 10.9837 14.3328 16.8931 13.1289 16.9972C12.1189 17.0846 11.8041 15.0926 11.5914 14.4613C11.3815 13.8382 11.1478 13.6138 10.5298 13.4094C8.95989 12.89 8.17492 12.6304 8.0195 12.2192C7.60796 11.1304 13.8362 9.32904 14.7728 10.2571Z',
  d10: 'M20.877 13.25C20.877 18.0825 16.9027 22 12.0001 22C7.09761 22 3.37695 18.5825 3.37695 13.75C3.37695 8.91751 7.09761 4.5 12.0001 4.5C16.9027 4.5 20.877 8.41751 20.877 13.25Z',
  d11: 'M12 5V2',
  d12: 'M9 2H15',
  d13: 'M15.501 9.5L7.50098 11.7857L11.5015 13.5L13.216 17.5L15.501 9.5Z',
  d14: 'M11.1211 2.75H8.87109V1.25H14.8711V2.75H12.6211V5H11.1211V2.75Z',
  d15: 'M11.8732 3.75C6.4864 3.75 2.5 8.577 2.5 13.75C2.5 19.036 6.59683 22.75 11.8732 22.75C17.1797 22.75 21.5 18.5068 21.5 13.25C21.5 7.99316 17.1797 3.75 11.8732 3.75ZM7.375 11.7857L15.375 9.5L13.09 17.5L11.3755 13.5L7.375 11.7857Z',
};

export const IconCompassStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-stroke-rounded IconCompassStrokeRounded"
    >
      <circle 
        cx="12" 
        cy="13" 
        r="9" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
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
    </TheIconWrapper>
  );
};

export const IconCompassDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-duotone-rounded IconCompassDuotoneRounded"
    >
      <circle 
        cx="12" 
        cy="13" 
        r="9" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
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
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCompassTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-twotone-rounded IconCompassTwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="13" 
        r="9" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCompassSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-solid-rounded IconCompassSolidRounded"
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

export const IconCompassBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-bulk-rounded IconCompassBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCompassStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-stroke-sharp IconCompassStrokeSharp"
    >
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCompassSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="compass-solid-sharp IconCompassSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCompass: TheIconSelfPack = {
  name: 'Compass',
  StrokeRounded: IconCompassStrokeRounded,
  DuotoneRounded: IconCompassDuotoneRounded,
  TwotoneRounded: IconCompassTwotoneRounded,
  SolidRounded: IconCompassSolidRounded,
  BulkRounded: IconCompassBulkRounded,
  StrokeSharp: IconCompassStrokeSharp,
  SolidSharp: IconCompassSolidSharp,
};