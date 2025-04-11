import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 20H12.0118',
  d2: 'M8.25 17C10.25 15 13.75 15 15.75 17',
  d3: 'M18.5 14C14.7324 10.6667 9.5 10.6667 5.5 14',
  d4: 'M2 11C5.15789 8.33335 8.57895 7.00002 12 7',
  d5: 'M15 7.49908C15 7.49908 16 7.49908 17 9.49908C17 9.49908 19.4766 5.60074 22 4',
  d6: 'M12 6C8.30506 6.00002 4.6621 7.44319 1.35484 10.236C0.93288 10.5923 0.879668 11.2232 1.23599 11.6452C1.59231 12.0671 2.22324 12.1204 2.6452 11.764C5.65374 9.2235 8.85287 8.00001 12 8C12.5523 8 13 7.55228 13 7C13 6.44771 12.5523 6 12 6Z',
  d7: 'M4.85984 13.2318C9.21914 9.59903 15.0058 9.57336 19.1626 13.251C19.5763 13.617 19.6149 14.249 19.249 14.6626C18.883 15.0763 18.251 15.1149 17.8374 14.749C14.459 11.76 9.78091 11.7343 6.14021 14.7682C5.71593 15.1218 5.08536 15.0645 4.7318 14.6402C4.37824 14.2159 4.43556 13.5853 4.85984 13.2318Z',
  d8: 'M16.4571 16.2929C14.0666 13.9024 9.93344 13.9024 7.54292 16.2929C7.15239 16.6834 7.15239 17.3166 7.54292 17.7071C7.93344 18.0976 8.5666 18.0976 8.95713 17.7071C10.5666 16.0976 13.4334 16.0976 15.0429 17.7071C15.4334 18.0976 16.0666 18.0976 16.4571 17.7071C16.8477 17.3166 16.8477 16.6834 16.4571 16.2929Z',
  d9: 'M12 18.5C11.1716 18.5 10.5 19.1716 10.5 20C10.5 20.8284 11.1716 21.5 12 21.5H12.0118C12.8402 21.5 13.5118 20.8284 13.5118 20C13.5118 19.1716 12.8402 18.5 12.0118 18.5H12Z',
  d10: 'M22.8444 3.46446C23.1403 3.93082 23.002 4.54871 22.5357 4.84456C21.4216 5.55127 20.2569 6.81543 19.3363 7.97254C18.8853 8.53938 18.5098 9.05882 18.2473 9.4361C18.1163 9.62446 18.014 9.77663 17.9451 9.88064C17.9107 9.93263 17.8847 9.97253 17.8676 9.99885L17.8489 10.0279L17.8447 10.0344L17.8441 10.0354C17.6508 10.3395 17.3087 10.5163 16.9489 10.4979C16.5889 10.4795 16.2668 10.2688 16.1056 9.94642C15.6649 9.06505 15.2696 8.7141 15.0703 8.58126C14.986 8.52505 14.929 8.50253 14.9064 8.49489C14.398 8.44768 14 8.01992 14 7.49921C14 6.94693 14.4477 6.49921 15 6.49921L15.0759 6.50177C15.1055 6.50369 15.1393 6.50686 15.1771 6.51189C15.2527 6.52197 15.3434 6.53945 15.4466 6.56894C15.6545 6.62833 15.9053 6.73423 16.1797 6.91716C16.454 7.10001 16.7416 7.35278 17.0304 7.69864C17.2458 7.40431 17.4951 7.07442 17.7712 6.72735C18.7197 5.53511 20.055 4.04972 21.4643 3.1557C21.9307 2.85986 22.5486 2.99809 22.8444 3.46446Z',
  d11: 'M15 7.49908L17 9.49908L22 4',
  d12: 'M11.499 6C8.04269 6.00002 4.63192 7.26356 1.49902 9.71401L2.81393 11.2247C5.62499 9.0501 8.58428 8.00001 11.499 8L11.499 6Z',
  d13: 'M14.5403 17.7071C12.9313 16.0976 10.0654 16.0976 8.45646 17.7071L7.14148 16.1964C9.51168 13.9345 13.4853 13.9345 15.8554 16.1965L14.5403 17.7071Z',
  d14: 'M18.5226 13.1329L17.2095 14.6411C13.8893 11.8 9.36334 11.7715 5.79082 14.6447L4.47704 13.1353C8.77358 9.63752 14.415 9.60646 18.5226 13.1329Z',
  d15: 'M11.499 19C10.9467 19 10.499 19.4477 10.499 20C10.499 20.5523 10.9467 21 11.499 21H11.5108C12.0631 21 12.5108 20.5523 12.5108 20C12.5108 19.4477 12.0631 19 11.5108 19H11.499Z',
  d16: 'M22.5007 4.34547L16.7952 10.6204L14.0537 7.87892L15.4679 6.46471L16.7264 7.72319L21.0209 3L22.5007 4.34547Z',
};

export const IconWifiConnected03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiConnected03 StrokeRounded"
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
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconWifiConnected03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiConnected03 DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconWifiConnected03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiConnected03 TwotoneRounded"
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
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconWifiConnected03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiConnected03 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="f"
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
      <path 
        d={d.d10}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconWifiConnected03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiConnected03 BulkRounded"
    >
      <g    i-c="o7">
      <path 
        d={d.d6}
        i-c="f"
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
      </g>
      <path 
        d={d.d10}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconWifiConnected03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiConnected03 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
      <path 
        d={d.d11}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconWifiConnected03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="WifiConnected03 SolidSharp"
    >
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
      <path 
        d={d.d15}
        i-c="f"
      />
      <path 
        d={d.d16}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWifiConnected03: TheIconSelfPack = [
  'WifiConnected03',
  IconWifiConnected03StrokeRounded,
  IconWifiConnected03DuotoneRounded,
  IconWifiConnected03TwotoneRounded,
  IconWifiConnected03SolidRounded,
  IconWifiConnected03BulkRounded,
  IconWifiConnected03StrokeSharp,
  IconWifiConnected03SolidSharp,
];