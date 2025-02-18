import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 22L9.52157 19.6461C8.49181 18.0065 7.97692 17.1867 7.16053 17.0393C5.83152 16.7993 4.45794 17.7045 3.5 18.509',
  d2: 'M3.5 9V16.0279C3.5 17.2307 3.5 17.8321 3.7987 18.3154C4.0974 18.7987 4.63531 19.0677 5.71115 19.6056L9.65542 21.5777C10.4962 21.9981 10.5043 22 11.4443 22H14.5C17.3284 22 18.7426 22 19.6213 21.1213C20.5 20.2426 20.5 18.8284 20.5 16V9C20.5 6.17157 20.5 4.75736 19.6213 3.87868C18.7426 3 17.3284 3 14.5 3H9.5C6.67157 3 5.25736 3 4.37868 3.87868C3.5 4.75736 3.5 6.17157 3.5 9Z',
  d3: 'M12 9H8M16 14H8',
  d4: 'M17 2V4M12 2V4M7 2V4',
  d5: 'M10.5 3H13.5C16.7998 3 18.4497 3 19.4749 4.02513C20.5 5.05025 20.5 6.70017 20.5 10V15C20.5 18.2998 20.5 19.9497 19.4749 20.9749C18.4497 22 16.7998 22 13.5 22L10.9987 21.997L9.52215 19.6461C8.49239 18.0065 7.9775 17.1867 7.16111 17.0393C6.00317 16.8302 4.81139 17.4904 3.89018 18.196L3.54962 18C3.5 17.1861 3.5 16.2026 3.5 15V10C3.5 6.70017 3.5 5.05025 4.52513 4.02513C5.55025 3 7.20017 3 10.5 3Z',
  d6: 'M7 1.125C7.55228 1.125 8 1.57272 8 2.125V4.125C8 4.67728 7.55228 5.125 7 5.125C6.44772 5.125 6 4.67728 6 4.125V2.125C6 1.57272 6.44772 1.125 7 1.125ZM12 1.125C12.5523 1.125 13 1.57272 13 2.125V4.125C13 4.67728 12.5523 5.125 12 5.125C11.4477 5.125 11 4.67728 11 4.125V2.125C11 1.57272 11.4477 1.125 12 1.125ZM17 1.125C17.5523 1.125 18 1.57272 18 2.125V4.125C18 4.67728 17.5523 5.125 17 5.125C16.4477 5.125 16 4.67728 16 4.125V2.125C16 1.57272 16.4477 1.125 17 1.125Z',
  d7: 'M14.5549 2.375H14.5549H14.5549C15.9225 2.37498 17.0248 2.37497 17.8918 2.49153C18.7919 2.61254 19.5497 2.87144 20.1517 3.47335C20.7536 4.07527 21.0125 4.83314 21.1335 5.73325C21.25 6.60022 21.25 7.70254 21.25 9.07013L21.25 16.1799C21.25 17.5475 21.25 18.6498 21.1335 19.5168C21.0125 20.4169 20.7536 21.1747 20.1517 21.7767C19.5497 22.3786 18.7919 22.6375 17.8918 22.7585C17.0248 22.875 15.9225 22.875 14.5549 22.875H12.0196L10.1707 19.3957L10.1274 19.3268C9.63712 18.5461 9.228 17.8947 8.83504 17.4265C8.42091 16.9331 7.94572 16.5446 7.29331 16.4268C6.36916 16.2599 5.33322 16.6422 4.51567 17.0599C3.9085 17.3701 3.33119 17.7478 2.86361 18.0951C2.83008 17.9485 2.8073 17.7982 2.79132 17.6436C2.74997 17.2437 2.74998 16.7598 2.75 16.1898V16.1898V16.1898V16.1897L2.75 9.07013V9.0701V9.07008V9.07004C2.74998 7.70249 2.74997 6.6002 2.86653 5.73325C2.98754 4.83314 3.24644 4.07527 3.84835 3.47335C4.45027 2.87144 5.20815 2.61254 6.10825 2.49153C6.97521 2.37497 8.07752 2.37498 9.44508 2.375H9.4451H9.44511H9.44513L14.5549 2.375H14.5549ZM8.87155 20.1475L10.2728 22.7843C9.98524 22.7065 9.71338 22.5704 9.37575 22.4014L9.37572 22.4014L9.32001 22.3735L5.34282 20.3849L5.34275 20.3849C4.83294 20.13 4.40009 19.9136 4.06088 19.6978C3.91063 19.6022 3.76937 19.5011 3.63908 19.3889C4.06648 19.0621 4.62206 18.69 5.19813 18.3957C5.97284 17.9999 6.62193 17.8298 7.02679 17.9029C7.19078 17.9325 7.38123 18.0276 7.68609 18.3908C8.00152 18.7666 8.35283 19.3217 8.87155 20.1475ZM8 8.375C7.58579 8.375 7.25 8.71079 7.25 9.125C7.25 9.53921 7.58579 9.875 8 9.875L12 9.875C12.4142 9.875 12.75 9.53921 12.75 9.125C12.75 8.71079 12.4142 8.375 12 8.375L8 8.375ZM8 13.375C7.58579 13.375 7.25 13.7108 7.25 14.125C7.25 14.5392 7.58579 14.875 8 14.875L16 14.875C16.4142 14.875 16.75 14.5392 16.75 14.125C16.75 13.7108 16.4142 13.375 16 13.375L8 13.375Z',
  d8: 'M14.5549 2.375H9.44513C8.07755 2.37498 6.97521 2.37497 6.10825 2.49153C5.20814 2.61254 4.45027 2.87144 3.84835 3.47335C3.24644 4.07527 2.98754 4.83314 2.86653 5.73325C2.74997 6.60021 2.74998 7.70251 2.75 9.07008V16.1897C2.74998 16.7597 2.74997 17.2437 2.79132 17.6436C2.80336 17.76 2.80938 17.8182 2.83929 17.8608C2.87878 17.9171 2.95327 17.9514 3.02167 17.945C3.0735 17.9401 3.12742 17.903 3.23526 17.8288C3.62294 17.5619 4.06093 17.2917 4.51567 17.0594C5.33322 16.6417 6.36916 16.2594 7.29331 16.4262C7.94572 16.544 8.42091 16.9325 8.83504 17.426C9.228 17.8941 9.63712 18.5456 10.1274 19.3263L10.1707 19.3951L11.8507 22.5566C11.9331 22.7117 11.9743 22.7893 12.0457 22.8321C12.117 22.875 12.2048 22.875 12.3805 22.875H14.5549C15.9225 22.875 17.0248 22.875 17.8918 22.7585C18.7919 22.6375 19.5497 22.3786 20.1517 21.7767C20.7536 21.1747 21.0125 20.4169 21.1335 19.5168C21.25 18.6498 21.25 17.5475 21.25 16.1799V9.07013C21.25 7.70254 21.25 6.60022 21.1335 5.73325C21.0125 4.83314 20.7536 4.07527 20.1517 3.47335C19.5497 2.87144 18.7919 2.61254 17.8918 2.49153C17.0248 2.37497 15.9225 2.37498 14.5549 2.375Z',
  d9: 'M9.84043 22.6259C10.0113 22.7019 10.0968 22.7399 10.1454 22.6878C10.194 22.6356 10.1482 22.5494 10.0566 22.3771L8.87155 20.147C8.35283 19.3212 8.00152 18.7661 7.68609 18.3903C7.38123 18.027 7.19078 17.932 7.02679 17.9024C6.62193 17.8293 5.97284 17.9993 5.19813 18.3951C4.78758 18.6049 4.38744 18.8541 4.03669 19.0983C3.85131 19.2274 3.75862 19.2919 3.7605 19.3986C3.76238 19.5053 3.85315 19.5639 4.03469 19.681C4.04339 19.6866 4.05212 19.6922 4.06088 19.6978C4.40009 19.9136 4.83294 20.13 5.34275 20.3849L9.37572 22.4014C9.54354 22.4854 9.69511 22.5613 9.84043 22.6259Z',
  d10: 'M9.83972 22.6268C10.0106 22.7028 10.0961 22.7408 10.1447 22.6887C10.1933 22.6365 10.1475 22.5503 10.0559 22.378L8.87084 20.1479C8.35212 19.3221 8.00082 18.767 7.68538 18.3912C7.38053 18.028 7.19008 17.9329 7.02608 17.9033C6.62122 17.8302 5.97213 18.0002 5.19742 18.396C4.78688 18.6058 4.38674 18.855 4.03598 19.0992C3.85061 19.2283 3.75792 19.2928 3.75979 19.3995C3.76167 19.5062 3.85244 19.5648 4.03398 19.6819C4.04268 19.6875 4.05141 19.6931 4.06017 19.6987C4.39939 19.9145 4.83223 20.1309 5.34204 20.3858L9.37501 22.4023C9.54283 22.4863 9.6944 22.5622 9.83972 22.6268Z',
  d11: 'M7.25 9.125C7.25 8.71079 7.58579 8.375 8 8.375H12C12.4142 8.375 12.75 8.71079 12.75 9.125C12.75 9.53921 12.4142 9.875 12 9.875H8C7.58579 9.875 7.25 9.53921 7.25 9.125ZM7.25 14.125C7.25 13.7108 7.58579 13.375 8 13.375H16C16.4142 13.375 16.75 13.7108 16.75 14.125C16.75 14.5392 16.4142 14.875 16 14.875H8C7.58579 14.875 7.25 14.5392 7.25 14.125Z',
  d12: 'M17 2V6M12 2V6M7 2V6',
  d13: 'M3.43784 15H10V21.5749M10 22H21V4H3V15L10 22Z',
  d14: 'M13 16H16M8 11H16',
  d15: 'M2.25092 16.4998L8.25092 22.4998V16.4998H2.25092Z',
  d16: 'M8 3H11V1.5H13V3H16V1.5H18V3H21C21.4142 3 21.75 3.33579 21.75 3.75V21.75C21.75 21.9489 21.671 22.1397 21.5303 22.2803C21.3897 22.421 21.1989 22.5 21 22.5L9.75023 22.5V15H2.25V3.75C2.25 3.33579 2.58579 3 3 3H6V1.5H8V3ZM8 10.501H16V9.00098H8V10.501ZM13 16.501H16V15.001H13V16.501Z',
};

export const IconNote02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-02-stroke-rounded IconNote02StrokeRounded"
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

export const IconNote02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-02-duotone-rounded IconNote02DuotoneRounded"
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

export const IconNote02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-02-twotone-rounded IconNote02TwotoneRounded"
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

export const IconNote02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-02-solid-rounded IconNote02SolidRounded"
    >
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

export const IconNote02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-02-bulk-rounded IconNote02BulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d10} 
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
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNote02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-02-stroke-sharp IconNote02StrokeSharp"
    >
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
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNote02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="note-02-solid-sharp IconNote02SolidSharp"
    >
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNote02: TheIconSelfPack = {
  name: 'Note02',
  StrokeRounded: IconNote02StrokeRounded,
  DuotoneRounded: IconNote02DuotoneRounded,
  TwotoneRounded: IconNote02TwotoneRounded,
  SolidRounded: IconNote02SolidRounded,
  BulkRounded: IconNote02BulkRounded,
  StrokeSharp: IconNote02StrokeSharp,
  SolidSharp: IconNote02SolidSharp,
};