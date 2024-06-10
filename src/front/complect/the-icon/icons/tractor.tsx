import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 10.4995C3.25349 9.55792 4.81159 9 6.5 9C10.6421 9 14 12.3579 14 16.5C14 16.596 13.9982 16.6915 13.9946 16.7866C13.9719 17.3913 13.9605 17.6937 14.1081 17.8469C14.2556 18 14.5282 18 15.0734 18H16',
  d2: 'M13 9L16.1057 9.58232C18.4466 10.0212 19.6171 10.2407 20.3085 11.0739C21 11.907 21 13.1047 21 15.5',
  d3: 'M20 12L19 12',
  d4: 'M13 12.5V9.58708C13 9.19778 12.9432 8.81056 12.8313 8.43768L11.5 3M4 9V3',
  d5: 'M3 3H13',
  d6: 'M18 9.5V8C18 6.89543 18.8954 6 20 6',
  d7: 'M7 9V3',
  d8: 'M16.1057 9.58232L13 9V13C14.0695 14.7825 14.0269 16.6974 14.005 17.6828C14.0024 17.803 14 17.9094 14 18H16C16 16.3431 17.3431 15 19 15C19.7684 15 20.4692 15.2889 21 15.7639V15.5C21 13.1047 21 11.907 20.3085 11.0739C19.6171 10.2407 18.4466 10.0212 16.1057 9.58232Z',
  d9: 'M6.46154 3V8.55029C8.83171 8.7062 11.8761 10.0542 13 12V8L11.0769 3H6.46154Z',
  d10: 'M6.5 11.25C3.60051 11.25 1.25 13.6005 1.25 16.5C1.25 19.3995 3.60051 21.75 6.5 21.75C9.3995 21.75 11.75 19.3995 11.75 16.5C11.75 13.6005 9.3995 11.25 6.5 11.25Z',
  d11: 'M19.5 15C17.567 15 16 16.567 16 18.5C16 20.433 17.567 22 19.5 22C21.433 22 23 20.433 23 18.5C23 16.567 21.433 15 19.5 15Z',
  d12: 'M13.3113 8.01979C13.0173 7.96043 12.7122 8.03615 12.4801 8.22608C12.248 8.41601 12.1133 8.70009 12.1133 9.00001V9.2323C12.1133 9.60757 12.1133 9.79521 12.005 9.85109C11.8968 9.90697 11.7378 9.79397 11.42 9.56798C10.0318 8.58094 8.33404 8.00001 6.50006 8.00001C4.58768 8.00001 2.8202 8.63275 1.39948 9.69989C0.957892 10.0316 0.868802 10.6584 1.20049 11.1C1.53218 11.5416 2.15905 11.6307 2.60064 11.299C3.6869 10.4831 5.03562 10 6.50006 10C8.97874 10 11.135 11.3871 12.2322 13.4321C12.7219 14.3449 13.0001 15.3885 13.0001 16.5C13.0001 16.6364 12.9954 16.7758 12.9908 16.9132C12.9832 17.1424 12.9758 17.3661 12.9904 17.5608C13.0476 18.3247 13.5541 18.8787 14.3188 18.9733L14.3268 18.9743C14.5215 18.9977 14.6189 19.0094 14.6863 18.9489C14.7537 18.8885 14.7526 18.7756 14.7503 18.5499L14.75 18.5C14.75 15.8766 16.8766 13.75 19.5 13.75C20.1933 13.75 20.852 13.8985 21.4458 14.1655L21.4458 14.1656C21.7635 14.3084 21.9223 14.3798 22.0147 14.3172C22.1071 14.2546 22.1003 14.0944 22.0867 13.7738C22.0729 13.4495 22.0521 13.1493 22.0205 12.8724C22.0125 12.8024 21.9528 12.75 21.8823 12.75L20.1133 12.75C19.6991 12.75 19.3633 12.4142 19.3633 12C19.3633 11.5858 19.6991 11.25 20.1133 11.25L20.9646 11.25C21.2552 11.25 21.4005 11.25 21.4562 11.141C21.5118 11.0319 21.4332 10.9232 21.2758 10.7058C21.2557 10.678 21.2351 10.6504 21.2139 10.623C20.7072 9.96547 20.0439 9.59278 19.2634 9.32512C18.5291 9.07333 17.597 8.88513 16.4814 8.65992L13.3113 8.01979Z',
  d13: 'M11.2622 2.02892C11.7986 1.89758 12.34 2.22599 12.4713 2.76243L13.7968 8.17655C13.9316 8.63464 14 9.10972 14 9.58731V12.5002C14 13.0525 13.5523 13.5002 13 13.5002C12.4477 13.5002 12 13.0525 12 12.5002V9.58731C12 9.29533 11.9574 9.00492 11.8735 8.72527C11.8686 8.70887 11.8641 8.69235 11.86 8.67572L10.5287 3.23804C10.3974 2.7016 10.7258 2.16026 11.2622 2.02892ZM4 2.00023C4.55228 2.00023 5 2.44795 5 3.00023V9.00023C5 9.55252 4.55228 10.0002 4 10.0002C3.44772 10.0002 3 9.55252 3 9.00023V3.00023C3 2.44795 3.44772 2.00023 4 2.00023Z',
  d14: 'M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3C14 3.55228 13.5523 4 13 4H3C2.44772 4 2 3.55228 2 3Z',
  d15: 'M20 7C19.4477 7 19 7.44772 19 8V9.5C19 10.0523 18.5523 10.5 18 10.5C17.4477 10.5 17 10.0523 17 9.5V8C17 6.34315 18.3431 5 20 5C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7Z',
  d16: 'M7 2C7.55228 2 8 2.44772 8 3V9C8 9.55229 7.55228 10 7 10C6.44772 10 6 9.55229 6 9V3C6 2.44772 6.44772 2 7 2Z',
  d17: 'M21.5979 11.25C21.8163 11.7089 21.9359 12.209 22.0056 12.75L20.1133 12.75C19.6991 12.75 19.3633 12.4142 19.3633 12C19.3633 11.5858 19.6991 11.25 20.1133 11.25H21.5979Z',
  d18: 'M12.4713 2.76243C12.34 2.22599 11.7986 1.89758 11.2622 2.02892C10.7258 2.16026 10.3974 2.7016 10.5287 3.23804L11.86 8.67572C11.8641 8.69235 11.8686 8.70887 11.8735 8.72527C11.9574 9.00492 12 9.29533 12 9.58731V10.0192C10.5181 8.76033 8.59818 8.00001 6.50006 8.00001C5.98838 8.00001 5.48707 8.04531 5 8.1321L5 3.00023C5 2.44795 4.55228 2.00023 4 2.00023C3.44772 2.00023 3 2.44795 3 3.00023L3 8.75206C2.43018 9.00984 1.89384 9.32857 1.39948 9.69989C0.957892 10.0316 0.868802 10.6584 1.20049 11.1C1.53218 11.5416 2.15905 11.6307 2.60064 11.299C3.6869 10.4831 5.03562 10 6.50006 10C8.97874 10 11.135 11.3871 12.2322 13.4321C12.7219 14.3449 13.0001 15.3885 13.0001 16.5C13.0001 16.6364 12.9954 16.7758 12.9908 16.9132C12.9832 17.1424 12.9758 17.3661 12.9904 17.5608C13.0476 18.3247 13.5541 18.8787 14.3188 18.9733L14.3268 18.9743C14.5215 18.9977 14.6189 19.0094 14.6863 18.9489C14.7537 18.8885 14.7526 18.7756 14.7503 18.5499L14.75 18.5C14.75 15.8766 16.8766 13.75 19.5 13.75C20.1933 13.75 20.852 13.8985 21.4458 14.1655C21.7635 14.3084 21.9223 14.3798 22.0147 14.3172C22.1071 14.2546 22.1003 14.0944 22.0867 13.7738C22.0729 13.4495 22.0521 13.1493 22.0205 12.8724C21.9236 12.0239 21.7153 11.2735 21.2139 10.623C20.7072 9.96547 20.0439 9.59278 19.2634 9.32512C18.5291 9.07333 17.597 8.88513 16.4814 8.65992L13.7817 8.11479L12.4713 2.76243Z',
  d19: 'M7 2C7.55228 2 8 2.44772 8 3L8 8.13196C7.51314 8.04526 7.0119 8.00001 6.50006 8.00001C6.33221 8.00001 6.16548 8.00488 6 8.0145L6 3C6 2.44772 6.44772 2 7 2ZM19 9.23994V8C19 7.44772 19.4477 7 20 7C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5C18.3431 5 17 6.34315 17 8V8.76503C17.7661 8.9216 18.4346 9.06712 19 9.23994Z',
  d20: 'M15.9998 18H13.8497C13.9481 17.5153 13.9998 17.0137 13.9998 16.5C13.9998 12.3579 10.6419 9 6.49975 9C4.81102 9 3.25264 9.55813 1.99902 10.5',
  d21: 'M13 8L21 10V15.5',
  d22: 'M21 12L19 12',
  d23: 'M13 13V8L11.5 3M4 9.5V3',
  d24: 'M2 3H13.5',
  d25: 'M18 9.5V6.00024L20 6',
  d26: 'M1.25098 16.5C1.25098 13.6005 3.60148 11.25 6.50098 11.25C9.40047 11.25 11.751 13.6005 11.751 16.5C11.751 19.3995 9.40047 21.75 6.50098 21.75C3.60148 21.75 1.25098 19.3995 1.25098 16.5Z',
  d27: 'M15.749 18.25C15.749 16.317 17.316 14.75 19.249 14.75C21.182 14.75 22.749 16.317 22.749 18.25C22.749 20.183 21.182 21.75 19.249 21.75C17.316 21.75 15.749 20.183 15.749 18.25Z',
  d28: 'M21.001 12L19.001 12',
  d29: 'M19.001 7.00012L20.0011 7L20.0009 5L18.0009 5.00024C17.4486 5.0003 17.001 5.448 17.001 6.00024V9.5H19.001V7.00012Z',
  d30: 'M3.20505 4.19118H2.23424V2.25H13.3985V4.19118H12.7617L13.6843 7.26582L20.915 9.0731C21.3472 9.18111 21.6504 9.56933 21.6504 10.0147V14.1514C20.9456 13.7374 20.1245 13.5 19.248 13.5C16.6247 13.5 14.498 15.6266 14.498 18.25C14.498 18.4189 14.5069 18.5857 14.524 18.75H13.7383C13.4469 18.75 13.171 18.6192 12.9866 18.3937C12.8023 18.1682 12.7289 17.8718 12.7869 17.5863C12.8696 17.1791 12.9131 16.7569 12.9131 16.3235C12.9131 12.8393 10.0879 10.0147 6.60287 10.0147C5.18091 10.0147 3.87133 10.4838 2.81667 11.276L1.65039 9.72402C2.13055 9.36335 2.65153 9.05378 3.20505 8.80344V4.19118ZM5.14648 4.19141V8.20196C5.46422 8.14535 5.78821 8.10693 6.11729 8.08782V4.19141H5.14648ZM8.05891 4.19141V8.20181C9.52337 8.4625 10.8542 9.1094 11.9421 10.0334V8.21621L10.7344 4.19141H8.05891Z',
};

export const IconTractorStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tractor-stroke-rounded IconTractorStrokeRounded"
    >
      <circle 
        cx="6.5" 
        cy="16.5" 
        r="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="19" 
        cy="18" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTractorDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tractor-duotone-rounded IconTractorDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="6.5" 
        cy="16.5" 
        r="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="19" 
        cy="18" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTractorTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tractor-twotone-rounded IconTractorTwotoneRounded"
    >
      <circle 
        cx="6.5" 
        cy="16.5" 
        r="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="19" 
        cy="18" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTractorSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tractor-solid-rounded IconTractorSolidRounded"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconTractorBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tractor-bulk-rounded IconTractorBulkRounded"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTractorStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tractor-stroke-sharp IconTractorStrokeSharp"
    >
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="6.5" 
        cy="16.5" 
        r="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="19" 
        cy="18" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d23} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d24} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d25} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTractorSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tractor-solid-sharp IconTractorSolidSharp"
    >
      <path 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d28} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d29} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d30} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTractor: TheIconSelfPack = {
  name: 'Tractor',
  StrokeRounded: IconTractorStrokeRounded,
  DuotoneRounded: IconTractorDuotoneRounded,
  TwotoneRounded: IconTractorTwotoneRounded,
  SolidRounded: IconTractorSolidRounded,
  BulkRounded: IconTractorBulkRounded,
  StrokeSharp: IconTractorStrokeSharp,
  SolidSharp: IconTractorSolidSharp,
};