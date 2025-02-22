import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.5061 13.602C12.905 13.7883 12.2654 13.8887 11.602 13.8887C9.12036 13.8887 6.96846 12.4845 5.93046 10.4312C5.48592 9.55186 4.39999 9.19306 3.50496 9.62982C2.60993 10.0666 2.24474 11.1335 2.68928 12.0128C4.3146 15.2279 7.69305 17.4443 11.602 17.4443C12.8475 17.4443 14.0394 17.2194 15.138 16.8086',
  d2: 'M18.2384 14.9503C20.013 13.3868 21.2128 11.2055 21.4889 8.75051C21.5986 7.7746 20.8824 6.89607 19.8891 6.78825C18.8958 6.68043 18.0016 7.38415 17.8918 8.36006C17.7555 9.57236 17.2644 10.6796 16.5229 11.5795',
  d3: 'M11.5473 4C12.2327 4 12.8592 4.38045 13.1658 4.98273L19.4989 17.4272C19.9458 18.3054 19.5835 19.3733 18.6897 19.8124C17.7958 20.2515 16.7089 19.8955 16.262 19.0173L11.5473 9.75303L9.6037 13.5722C8.41018 13.1821 7.37371 12.4519 6.61386 11.4967L9.92887 4.98273C10.2354 4.38045 10.8619 4 11.5473 4Z',
  d4: 'M6.8326 19.0173C6.38568 19.8955 5.29878 20.2515 4.40494 19.8124C3.5111 19.3733 3.1488 18.3054 3.59572 17.4272L4.89047 14.8831C5.78379 15.6862 6.82705 16.3316 7.97447 16.7736L6.8326 19.0173Z',
  d5: 'M11.5473 4C12.2327 4 12.8592 4.38045 13.1658 4.98273L19.4989 17.4272C19.9458 18.3054 19.5835 19.3733 18.6897 19.8124C17.7958 20.2515 16.7089 19.8955 16.262 19.0173L11.5473 9.75303L9.60371 13.5722C8.41019 13.1821 7.37372 12.4519 6.61386 11.4967L9.92887 4.98273C10.2354 4.38045 10.8619 4 11.5473 4Z',
  d6: 'M6.8326 19.0175C6.38568 19.8957 5.29878 20.2517 4.40494 19.8126C3.5111 19.3735 3.1488 18.3056 3.59572 17.4274L4.89047 14.8833C5.78379 15.6865 6.82705 16.3318 7.97447 16.7738L6.8326 19.0175Z',
  d7: 'M11.602 17.4443C7.69305 17.4443 4.3146 15.2279 2.68928 12.0128C2.24474 11.1335 2.60993 10.0666 3.50496 9.62982C4.39999 9.19306 5.48592 9.55186 5.93046 10.4312C6.96846 12.4845 9.12036 13.8887 11.602 13.8887C12.2654 13.8887 12.905 13.7883 13.5061 13.602L15.138 16.8086C14.0394 17.2194 12.8475 17.4443 11.602 17.4443Z',
  d8: 'M19.8891 6.78825C20.8824 6.89607 21.5986 7.7746 21.4889 8.75051C21.2128 11.2055 20.013 13.3868 18.2384 14.9503L16.5229 11.5795C17.2644 10.6796 17.7555 9.57236 17.8918 8.36006C18.0016 7.38415 18.8958 6.68043 19.8891 6.78825Z',
};

export const IconArcBrowserStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arc-browser-stroke-rounded IconArcBrowserStrokeRounded"
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

export const IconArcBrowserDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arc-browser-duotone-rounded IconArcBrowserDuotoneRounded"
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
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconArcBrowserTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arc-browser-twotone-rounded IconArcBrowserTwotoneRounded"
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArcBrowserSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arc-browser-solid-rounded IconArcBrowserSolidRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArcBrowserBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arc-browser-bulk-rounded IconArcBrowserBulkRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconArcBrowserStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arc-browser-stroke-sharp IconArcBrowserStrokeSharp"
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
      />
    </TheIconWrapper>
  );
};

export const IconArcBrowserSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arc-browser-solid-sharp IconArcBrowserSolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArcBrowser: TheIconSelfPack = {
  name: 'ArcBrowser',
  StrokeRounded: IconArcBrowserStrokeRounded,
  DuotoneRounded: IconArcBrowserDuotoneRounded,
  TwotoneRounded: IconArcBrowserTwotoneRounded,
  SolidRounded: IconArcBrowserSolidRounded,
  BulkRounded: IconArcBrowserBulkRounded,
  StrokeSharp: IconArcBrowserStrokeSharp,
  SolidSharp: IconArcBrowserSolidSharp,
};