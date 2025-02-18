import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8.25 14.5C10.25 12.5 13.75 12.5 15.75 14.5',
  d2: 'M18.5 11.5C14.7324 8.16667 9.5 8.16667 5.5 11.5',
  d3: 'M2 8.5C8.31579 3.16669 15.6842 3.16668 22 8.49989',
  d4: 'M7.54289 13.7929C9.93342 11.4024 14.0666 11.4024 16.4571 13.7929C16.8476 14.1834 16.8476 14.8166 16.4571 15.2071C16.0666 15.5976 15.4334 15.5976 15.0429 15.2071C13.4334 13.5976 10.5666 13.5976 8.95711 15.2071C8.56658 15.5976 7.93342 15.5976 7.54289 15.2071C7.15237 14.8166 7.15237 14.1834 7.54289 13.7929Z',
  d5: 'M4.85984 10.7318C9.21914 7.09903 15.0058 7.07336 19.1626 10.751C19.5763 11.117 19.6149 11.749 19.249 12.1626C18.883 12.5763 18.251 12.6149 17.8374 12.249C14.459 9.25997 9.78091 9.2343 6.14021 12.2682C5.71593 12.6218 5.08537 12.5645 4.7318 12.1402C4.37824 11.7159 4.43556 11.0853 4.85984 10.7318Z',
  d6: 'M12 3.5C15.695 3.49998 19.3379 4.94312 22.6452 7.73585C23.0672 8.09217 23.1204 8.72309 22.7641 9.14506C22.4077 9.56703 21.7768 9.62024 21.3548 9.26393C18.3463 6.72345 15.1472 5.49999 12 5.5C8.85288 5.50001 5.65374 6.7235 2.6452 9.26403C2.22324 9.62035 1.59231 9.56714 1.23599 9.14518C0.879668 8.72322 0.93288 8.09229 1.35484 7.73597C4.6621 4.94319 8.30506 3.50002 12 3.5Z',
  d7: 'M9.75 18C9.75 16.7574 10.7574 15.75 12 15.75C13.2426 15.75 14.25 16.7574 14.25 18C14.25 19.2426 13.2426 20.25 12 20.25C10.7574 20.25 9.75 19.2426 9.75 18Z',
  d8: 'M11.9999 3.75C15.4573 3.74998 18.8689 5.02591 22 7.5L20.5817 8.92531C17.8024 6.78419 14.8793 5.74999 11.9999 5.75C9.1206 5.75001 6.19753 6.78421 3.41835 8.92531L2 7.5C5.1311 5.02594 8.54264 3.75002 11.9999 3.75Z',
  d9: 'M14.5135 15.0233C13.0517 13.9923 10.9483 13.9922 9.48647 15.0232L8.06492 13.5947C10.3128 11.8017 13.6871 11.8018 15.935 13.5948L14.5135 15.0233Z',
  d10: 'M6.62988 12.1526L5.21012 10.7259C9.39276 7.44102 14.7903 7.41099 18.7975 10.7182L17.3819 12.1407C14.2061 9.62815 10.0255 9.60741 6.62988 12.1526Z',
  d11: 'M10 18.25C10 17.1454 10.8954 16.25 12 16.25C13.1046 16.25 14 17.1454 14 18.25C14 19.3546 13.1046 20.25 12 20.25C10.8954 20.25 10 19.3546 10 18.25Z',
};

export const IconWifi01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-01-stroke-rounded IconWifi01StrokeRounded"
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
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="18" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconWifi01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-01-duotone-rounded IconWifi01DuotoneRounded"
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
        strokeLinejoin="round" 
      />
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="18" 
        r="1.5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="18" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconWifi01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-01-twotone-rounded IconWifi01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        strokeLinejoin="round" 
      />
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="18" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconWifi01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-01-solid-rounded IconWifi01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWifi01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-01-bulk-rounded IconWifi01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWifi01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-01-stroke-sharp IconWifi01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="18" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconWifi01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wifi-01-solid-sharp IconWifi01SolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWifi01: TheIconSelfPack = {
  name: 'Wifi01',
  StrokeRounded: IconWifi01StrokeRounded,
  DuotoneRounded: IconWifi01DuotoneRounded,
  TwotoneRounded: IconWifi01TwotoneRounded,
  SolidRounded: IconWifi01SolidRounded,
  BulkRounded: IconWifi01BulkRounded,
  StrokeSharp: IconWifi01StrokeSharp,
  SolidSharp: IconWifi01SolidSharp,
};