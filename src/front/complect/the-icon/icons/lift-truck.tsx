import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 17.5C7 18.8807 5.88071 20 4.5 20C3.11929 20 2 18.8807 2 17.5C2 16.1193 3.11929 15 4.5 15C5.88071 15 7 16.1193 7 17.5Z',
  d2: 'M17 17.5C17 18.8807 15.8807 20 14.5 20C13.1193 20 12 18.8807 12 17.5C12 16.1193 13.1193 15 14.5 15C15.8807 15 17 16.1193 17 17.5Z',
  d3: 'M20 4V15.0106C20 15.9433 20 16.4097 20.1522 16.7776C20.4767 17.5617 21.1896 17.9585 22 18',
  d4: 'M4 9H5.74643C6.6103 9 7.04224 9 7.43781 9.11037C7.83828 9.22211 8.21115 9.41587 8.53276 9.67935C8.85045 9.93962 9.09871 10.2931 9.59524 11C10.0918 11.7069 10.34 12.0604 10.6577 12.3206C10.9793 12.5841 11.3522 12.7779 11.7527 12.8896C12.1482 13 12.5802 13 13.444 13H15',
  d5: 'M18 13H20',
  d6: 'M4 15V6C4 4.89543 4.89543 4 6 4H8.89512C9.60829 4 10.2981 4.25406 10.8409 4.71663L14.2972 7.66198C14.7431 8.04197 15 8.59836 15 9.18422V15M7 17.5H12',
  d7: 'M15 13H13.444C12.5802 13 12.1482 13 11.7527 12.8896C11.3522 12.7779 10.9793 12.5841 10.6577 12.3206C10.34 12.0604 10.0918 11.7069 9.59524 11C9.09871 10.2931 8.85045 9.93962 8.53276 9.67935C8.21115 9.41587 7.83828 9.22211 7.43781 9.11037C7.04224 9 6.6103 9 5.74643 9C4.7819 9 4 9.7819 4 10.7464V15.05C4.16155 15.0172 4.32877 15 4.5 15C5.88071 15 7 16.1193 7 17.5H12C12 16.1193 13.1193 15 14.5 15C14.6712 15 14.8384 15.0172 15 15.05V13Z',
  d8: 'M20 4V15.0106C20 15.9433 20 16.4097 20.1522 16.7776C20.4767 17.5617 21.1896 17.9585 22 18M18 13H20',
  d9: 'M14 15.5C12.6193 15.5 11.5 16.6193 11.5 18C11.5 19.3807 12.6193 20.5 14 20.5C15.3807 20.5 16.5 19.3807 16.5 18C16.5 16.6193 15.3807 15.5 14 15.5Z',
  d10: 'M6.5 18C6.5 19.3807 5.38071 20.5 4 20.5C2.61929 20.5 1.5 19.3807 1.5 18C1.5 16.6193 2.61929 15.5 4 15.5C5.38071 15.5 6.5 16.6193 6.5 18Z',
  d11: 'M19.5 3.5C20.0523 3.5 20.5 3.94772 20.5 4.5V15.5106C20.5 15.9906 20.5005 16.3006 20.5167 16.5379C20.5323 16.7662 20.5589 16.8534 20.5763 16.8953C20.7236 17.2514 21.0428 17.4753 21.5511 17.5013C22.1027 17.5296 22.5269 17.9996 22.4987 18.5511C22.4704 19.1027 22.0004 19.5269 21.4489 19.4987C20.3364 19.4417 19.2298 18.872 18.7282 17.66C18.5933 17.334 18.5438 17.004 18.5213 16.6739C18.5 16.3604 18.5 15.9816 18.5 15.5425L18.5 14.5H17.5C16.9477 14.5 16.5 14.0523 16.5 13.5C16.5 12.9477 16.9477 12.5 17.5 12.5H18.5V4.5C18.5 3.94772 18.9477 3.5 19.5 3.5Z',
  d12: 'M14.2364 7.52502C14.8795 8.07662 15.25 8.88429 15.25 9.73473L15.25 13.8978C15.25 14.1474 15.25 14.2722 15.1775 14.3322C15.1051 14.3922 14.9715 14.3668 14.7044 14.3161C14.4763 14.2727 14.2408 14.25 14 14.25C11.9289 14.25 10.25 15.9289 10.25 18C10.25 18.0892 10.2531 18.1778 10.2592 18.2654C10.2759 18.5037 10.2842 18.6228 10.2249 18.6864C10.1656 18.75 10.0556 18.75 9.83565 18.75H8.16433C7.94435 18.75 7.83437 18.75 7.77506 18.6864C7.71575 18.6228 7.72408 18.5037 7.74074 18.2654C7.74687 18.1778 7.74999 18.0892 7.74999 18C7.74999 15.9289 6.07106 14.25 3.99999 14.25C3.75919 14.25 3.5237 14.2727 3.29553 14.3161C3.02845 14.3668 2.89492 14.3922 2.82245 14.3322C2.74999 14.2722 2.74999 14.1474 2.74999 13.8978V6.65323C2.74999 5.04982 4.04147 3.75 5.6346 3.75H8.41837C9.3327 3.75 10.2171 4.07783 10.913 4.67469L14.2364 7.52502ZM5.63341 5.6875C5.10237 5.6875 4.67188 6.12077 4.67188 6.65524V8.35193C4.67188 8.54022 4.67188 8.63437 4.73018 8.6929C4.78849 8.75143 4.88296 8.7518 5.07191 8.75252C6.32051 8.75731 7.49843 8.77508 8.50686 9.60125C8.95156 9.96557 9.26383 10.4477 9.57528 10.9285C9.8851 11.4069 10.1941 11.8839 10.6318 12.2425C11.2521 12.7507 11.9915 12.7509 12.7516 12.7511C12.8095 12.7511 12.8675 12.7511 12.9257 12.7514C13.1139 12.7522 13.208 12.7525 13.2668 12.6939C13.3257 12.6353 13.3257 12.5409 13.3257 12.3521V9.73675C13.3257 9.45327 13.2022 9.18404 12.9878 9.00018L9.66451 6.14984C9.31655 5.85141 8.87434 5.6875 8.41718 5.6875H5.63341Z',
  d13: 'M15.25 9.73473C15.25 8.88429 14.8795 8.07662 14.2364 7.52502L10.913 4.67469C10.2171 4.07783 9.33271 3.75 8.41839 3.75H5.63462C4.04149 3.75 2.75 5.04982 2.75 6.65323V13.8978C2.75 14.1474 2.75 14.2722 2.82246 14.3322C2.89493 14.3922 3.02847 14.3668 3.29554 14.3161C3.52371 14.2727 3.7592 14.25 4 14.25C6.07107 14.25 7.75 15.9289 7.75 18C7.75 18.0892 7.74688 18.1778 7.74075 18.2654C7.72409 18.5037 7.71576 18.6228 7.77507 18.6864C7.83438 18.75 7.94437 18.75 8.16434 18.75H9.83566C10.0556 18.75 10.1656 18.75 10.2249 18.6864C10.2842 18.6228 10.2759 18.5037 10.2592 18.2654C10.2531 18.1778 10.25 18.0892 10.25 18C10.25 15.9289 11.9289 14.25 14 14.25C14.2408 14.25 14.4763 14.2727 14.7045 14.3161C14.9715 14.3668 15.1051 14.3922 15.1775 14.3322C15.25 14.2722 15.25 14.1474 15.25 13.8978L15.25 9.73473Z',
  d14: 'M4.67188 6.65524C4.67188 6.12077 5.10237 5.6875 5.63341 5.6875H8.41718C8.87434 5.6875 9.31655 5.85141 9.66451 6.14984L12.9878 9.00018C13.2022 9.18404 13.3257 9.45327 13.3257 9.73675V12.3521C13.3257 12.5409 13.3257 12.6353 13.2668 12.6939C13.208 12.7525 13.1139 12.7522 12.9257 12.7514C12.1049 12.748 11.2993 12.7894 10.6318 12.2425C9.75406 11.5234 9.39392 10.328 8.50686 9.60125C7.49843 8.77508 6.32051 8.75731 5.07191 8.75252C4.88296 8.7518 4.78849 8.75143 4.73018 8.6929C4.67188 8.63437 4.67188 8.54022 4.67188 8.35193V6.65524Z',
  d15: 'M4 8H7L10 12H15',
  d16: 'M4 15V4H10L15 8V15M7 17.5H12',
  d17: 'M20 4V13M20 13H17M20 13V17.99C20 17.9955 20.0045 18 20.01 18H22',
  d18: 'M14 15.75C12.6193 15.75 11.5 16.8693 11.5 18.25C11.5 19.6307 12.6193 20.75 14 20.75C15.3807 20.75 16.5 19.6307 16.5 18.25C16.5 16.8693 15.3807 15.75 14 15.75Z',
  d19: 'M6.5 18.25C6.5 19.6307 5.38071 20.75 4 20.75C2.61929 20.75 1.5 19.6307 1.5 18.25C1.5 16.8693 2.61929 15.75 4 15.75C5.38071 15.75 6.5 16.8693 6.5 18.25Z',
  d20: 'M18.4993 12.0001L18.5 4L20.5 4.00018L20.4988 17.0001H22.5V19.0001H19.4988C19.2335 19.0001 18.9792 18.8947 18.7916 18.7072C18.6041 18.5196 18.4987 18.2652 18.4988 18L18.4991 14.0001H16.5V12.0001H18.4993Z',
  d21: 'M3.71154 3.25C3.1805 3.25 2.75 3.68327 2.75 4.21774V14.7134C3.14097 14.5752 3.56171 14.5 4 14.5C6.07107 14.5 7.75 16.1789 7.75 18.25H10.25C10.25 16.1789 11.9289 14.5 14 14.5C14.4383 14.5 14.859 14.5752 15.25 14.7134V8.08871C15.25 7.79473 15.1172 7.51668 14.8891 7.33303L10.0814 3.46206C9.91094 3.32479 9.69911 3.25 9.48077 3.25H3.71154ZM13.3257 11.2501V8.55389L9.14228 5.18555H4.67188V7.25006H6.4988C6.73487 7.25006 6.95716 7.36121 7.0988 7.55006L9.8738 11.2501H13.3257Z',
};

export const IconLiftTruckStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lift-truck-stroke-rounded IconLiftTruckStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconLiftTruckDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lift-truck-duotone-rounded IconLiftTruckDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
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
        d={d.d5} 
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

export const IconLiftTruckTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lift-truck-twotone-rounded IconLiftTruckTwotoneRounded"
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
        d={d.d4} 
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
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLiftTruckSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lift-truck-solid-rounded IconLiftTruckSolidRounded"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLiftTruckBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lift-truck-bulk-rounded IconLiftTruckBulkRounded"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconLiftTruckStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lift-truck-stroke-sharp IconLiftTruckStrokeSharp"
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
        d={d.d15} 
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
      />
    </TheIconWrapper>
  );
};

export const IconLiftTruckSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lift-truck-solid-sharp IconLiftTruckSolidSharp"
    >
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLiftTruck: TheIconSelfPack = {
  name: 'LiftTruck',
  StrokeRounded: IconLiftTruckStrokeRounded,
  DuotoneRounded: IconLiftTruckDuotoneRounded,
  TwotoneRounded: IconLiftTruckTwotoneRounded,
  SolidRounded: IconLiftTruckSolidRounded,
  BulkRounded: IconLiftTruckBulkRounded,
  StrokeSharp: IconLiftTruckStrokeSharp,
  SolidSharp: IconLiftTruckSolidSharp,
};