import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.89754 6.73262C9.71204 3.57754 10.6193 2 12 2C13.3807 2 14.288 3.57754 16.1025 6.73262L19.8592 13.2648C21.5848 16.2653 22.4476 17.7656 21.7671 18.8828C21.0866 20 19.3099 20 15.7567 20H8.24328C4.69006 20 2.91344 20 2.23293 18.8828C1.55242 17.7656 2.41522 16.2653 4.14082 13.2648L7.89754 6.73262Z',
  d2: 'M12 20V22',
  d3: 'M20 9L18 10',
  d4: 'M4 9L6 10',
  d5: 'M4 14.409C5.88945 15.0512 7.25244 16.8771 7.25244 19.0294C7.25244 19.3617 7.21994 19.6863 7.158 20M16.842 20C16.7801 19.6863 16.7476 19.3617 16.7476 19.0294C16.7476 16.8771 18.1105 15.0512 20 14.409M15.2815 6C14.429 6.83606 13.273 7.34965 12 7.34965C10.727 7.34965 9.57102 6.83606 8.71851 6',
  d6: 'M15.2815 6C14.429 6.83606 13.273 7.34965 12 7.34965C10.727 7.34965 9.57102 6.83606 8.71851 6L4.14082 13.2648L4 14.409C5.88945 15.0512 7.25245 16.8771 7.25245 19.0294C7.25245 19.3613 7.22003 19.6854 7.15828 19.9986C7.49999 20 7.86137 20 8.24328 20H15.7567C16.1386 20 16.5 20 16.8417 19.9986C16.78 19.6854 16.7476 19.3613 16.7476 19.0294C16.7476 16.8771 18.1105 15.0512 20 14.409L19.8592 13.2648L15.2815 6Z',
  d7: 'M4 14.409C5.88945 15.0512 7.25245 16.8771 7.25245 19.0294C7.25245 19.3617 7.21994 19.6863 7.158 20M16.842 20C16.7801 19.6863 16.7476 19.3617 16.7476 19.0294C16.7476 16.8771 18.1105 15.0512 20 14.409M15.2815 6C14.429 6.83606 13.273 7.34965 12 7.34965C10.727 7.34965 9.57102 6.83606 8.71851 6',
  d8: 'M12 18.875C12.5523 18.875 13 19.3227 13 19.875V21.875C13 22.4273 12.5523 22.875 12 22.875C11.4477 22.875 11 22.4273 11 21.875V19.875C11 19.3227 11.4477 18.875 12 18.875Z',
  d9: 'M20.8946 8.42801C21.1416 8.92198 20.9414 9.52266 20.4474 9.76965L18.4474 10.7696C17.9535 11.0166 17.3528 10.8164 17.1058 10.3224C16.8588 9.82845 17.059 9.22778 17.553 8.98079L19.553 7.98079C20.047 7.7338 20.6477 7.93403 20.8946 8.42801Z',
  d10: 'M3.10579 8.42801C3.35278 7.93403 3.95345 7.7338 4.44743 7.98079L6.44743 8.98079C6.94141 9.22778 7.14164 9.82845 6.89465 10.3224C6.64766 10.8164 6.04698 11.0166 5.55301 10.7696L3.55301 9.76965C3.05903 9.52266 2.8588 8.92198 3.10579 8.42801Z',
  d11: 'M19.7803 20.479C19.0088 20.5896 18.0436 20.6165 16.8978 20.6229L7.1008 20.6229C5.9544 20.6165 4.98871 20.5897 4.21697 20.479C3.17879 20.33 2.2065 19.993 1.64304 19.0679C1.07211 18.1306 1.24233 17.1207 1.6175 16.1569C1.98208 15.2202 2.64314 14.0708 3.44837 12.6708L7.19559 6.15508C8.04435 4.67916 8.7375 3.47384 9.39367 2.64734C10.0681 1.79783 10.8765 1.125 11.9986 1.125C13.1207 1.125 13.9291 1.79783 14.6036 2.64734C15.2597 3.47383 15.9529 4.67917 16.8016 6.15507L20.5489 12.6709C21.3541 14.0708 22.0152 15.2203 22.3797 16.1569C22.7549 17.1207 22.9251 18.1306 22.3542 19.0679C21.7907 19.993 20.8184 20.33 19.7803 20.479ZM8.94308 7.02759L4.99316 13.8955C6.72074 14.7931 7.91491 16.592 7.99693 18.6749H16.0011C16.0831 16.5924 17.2766 14.7937 19.0036 13.8959L15.054 7.02818C14.1816 7.62488 13.1306 7.97465 11.999 7.97465C10.867 7.97465 9.81571 7.62464 8.94308 7.02759Z',
  d12: 'M20.8946 8.4241C21.1416 8.91808 20.9414 9.51875 20.4474 9.76574L18.4474 10.7657C17.9535 11.0127 17.3528 10.8125 17.1058 10.3185C16.8588 9.82455 17.059 9.22387 17.553 8.97689L19.553 7.97689C20.047 7.7299 20.6477 7.93012 20.8946 8.4241Z',
  d13: 'M3.10579 8.4241C3.35278 7.93012 3.95345 7.7299 4.44743 7.97689L6.44743 8.97689C6.94141 9.22387 7.14164 9.82455 6.89465 10.3185C6.64766 10.8125 6.04698 11.0127 5.55301 10.7657L3.55301 9.76574C3.05903 9.51875 2.8588 8.91808 3.10579 8.4241Z',
  d14: 'M10.9432 3.85591C10.3878 4.5539 9.76468 5.62953 8.86143 7.19648L5.19016 13.5654C4.3301 15.0574 3.74479 16.0783 3.43969 16.8603C3.13881 17.6315 3.22034 17.8976 3.31313 18.0496C3.4134 18.2138 3.63947 18.4214 4.50136 18.5448C5.36657 18.6687 6.58411 18.6711 8.35216 18.6711H15.6947C17.4628 18.6711 18.6803 18.6687 19.5455 18.5448C20.4074 18.4214 20.6335 18.2138 20.7337 18.0496C20.8265 17.8976 20.9081 17.6315 20.6072 16.8603C20.3021 16.0783 19.7168 15.0574 18.8567 13.5654L15.1854 7.19647C14.2822 5.62953 13.6591 4.5539 13.1037 3.85591C12.5557 3.16732 12.248 3.07109 12.0234 3.07109C11.7989 3.07109 11.4912 3.16732 10.9432 3.85591ZM9.41246 2.64343C10.0885 1.79392 10.8987 1.12109 12.0234 1.12109C13.1482 1.12109 13.9584 1.79392 14.6344 2.64343C15.2921 3.46993 15.9869 4.67526 16.8376 6.15119L20.5935 12.6669C21.4006 14.0669 22.0632 15.2163 22.4286 16.153C22.8046 17.1168 22.9752 18.1267 22.403 19.064C21.8382 19.989 20.8637 20.3261 19.8231 20.475C18.8023 20.6212 17.4431 20.6211 15.7758 20.6211H8.27111C6.6038 20.6211 5.24454 20.6212 4.22378 20.475C3.1832 20.3261 2.20865 19.989 1.6439 19.064C1.07165 18.1267 1.24225 17.1168 1.61829 16.153C1.98372 15.2163 2.64631 14.0669 3.45341 12.6669L7.16713 6.22432C7.18123 6.19987 7.19528 6.17548 7.20929 6.15117C8.06002 4.67526 8.75477 3.46993 9.41246 2.64343Z',
  d15: 'M22 20L12 2L2 20H22Z',
  d16: 'M19 9.5L17 11',
  d17: 'M5 9.5L7 11',
  d18: 'M9 20C9 17.2386 7.20914 15 5 15',
  d19: 'M19 15C16.7909 15 15 17.2386 15 20',
  d20: 'M15 7C13.3431 8.33333 10.6569 8.33333 9 7',
  d21: 'M11.0227 22.75V20.7955H12.9773V22.75H11.0227Z',
  d22: 'M12 1.25C12.3549 1.25 12.6819 1.44242 12.8543 1.75267L17.1392 9.4655L18.8409 8.18921L20.0136 9.75285L18.0973 11.1901L22.627 19.3436C22.7952 19.6463 22.7906 20.0153 22.615 20.3138C22.4394 20.6122 22.119 20.7955 21.7727 20.7955H12H2.22727C1.88101 20.7955 1.56059 20.6122 1.38499 20.3138C1.20939 20.0153 1.20482 19.6463 1.37298 19.3436L5.90273 11.19L3.98522 9.75189L5.15795 8.18825L6.86084 9.46543L11.1457 1.75267C11.3181 1.44242 11.6451 1.25 12 1.25ZM10.072 7.70916C11.2754 8.21787 12.7241 8.21786 13.9274 7.70916L18.0024 15.0442C16.4975 15.4552 15.3168 16.9497 15.0097 18.8407H8.98969C8.6826 16.9497 7.50186 15.4552 5.99703 15.0442L10.072 7.70916Z',
};

export const IconTriangle01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-01-stroke-rounded IconTriangle01StrokeRounded"
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

export const IconTriangle01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-01-duotone-rounded IconTriangle01DuotoneRounded"
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTriangle01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-01-twotone-rounded IconTriangle01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTriangle01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-01-solid-rounded IconTriangle01SolidRounded"
    >
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
    </TheIconWrapper>
  );
};

export const IconTriangle01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-01-bulk-rounded IconTriangle01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
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

export const IconTriangle01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-01-stroke-sharp IconTriangle01StrokeSharp"
    >
      <path 
        d={d.d15} 
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
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTriangle01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="triangle-01-solid-sharp IconTriangle01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTriangle01: TheIconSelfPack = {
  name: 'Triangle01',
  StrokeRounded: IconTriangle01StrokeRounded,
  DuotoneRounded: IconTriangle01DuotoneRounded,
  TwotoneRounded: IconTriangle01TwotoneRounded,
  SolidRounded: IconTriangle01SolidRounded,
  BulkRounded: IconTriangle01BulkRounded,
  StrokeSharp: IconTriangle01StrokeSharp,
  SolidSharp: IconTriangle01SolidSharp,
};