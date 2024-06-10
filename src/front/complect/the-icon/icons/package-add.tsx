import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 22C10.1818 22 9.40019 21.6698 7.83693 21.0095C3.94564 19.3657 2 18.5438 2 17.1613C2 16.7742 2 10.0645 2 7M11 22L11 11.3548M11 22C11.7248 22 12.293 21.7409 13.5 21.2226M20 7V11',
  d2: 'M15 17.5H22M18.5 21L18.5 14',
  d3: 'M7.32592 9.69138L4.40472 8.27785C2.80157 7.5021 2 7.11423 2 6.5C2 5.88577 2.80157 5.4979 4.40472 4.72215L7.32592 3.30862C9.12883 2.43621 10.0303 2 11 2C11.9697 2 12.8712 2.4362 14.6741 3.30862L17.5953 4.72215C19.1984 5.4979 20 5.88577 20 6.5C20 7.11423 19.1984 7.5021 17.5953 8.27785L14.6741 9.69138C12.8712 10.5638 11.9697 11 11 11C10.0303 11 9.12883 10.5638 7.32592 9.69138Z',
  d4: 'M5 12L7 13',
  d5: 'M16 4L6 9',
  d6: 'M20 17.1613C20 18.5438 18.0544 19.3657 14.1631 21.0095C12.5998 21.6698 11.8182 22 11 22C10.1818 22 9.40019 21.6698 7.83693 21.0095C3.94564 19.3657 2 18.5438 2 17.1613L2 7L11 11.3548L20 7V17.1613Z',
  d7: 'M18.375 13C18.9273 13 19.375 13.4477 19.375 14V16.5H21.875C22.4273 16.5 22.875 16.9477 22.875 17.5C22.875 18.0523 22.4273 18.5 21.875 18.5H19.375V21C19.375 21.5523 18.9273 22 18.375 22C17.8227 22 17.375 21.5523 17.375 21L17.375 18.5H14.875C14.3227 18.5 13.875 18.0523 13.875 17.5C13.875 16.9477 14.3227 16.5 14.875 16.5H17.375L17.375 14C17.375 13.4477 17.8227 13 18.375 13Z',
  d8: 'M10.875 3.15909C10.2053 3.15909 9.5597 3.44018 7.71745 4.31292L4.86928 5.6622C4.05859 6.04626 3.5507 6.28957 3.23235 6.5C3.5507 6.71043 4.05859 6.95374 4.86928 7.3378L5.94362 7.84675L13.5898 4.10386C12.0809 3.39461 11.488 3.15909 10.875 3.15909ZM15.8064 5.15325L8.1602 8.89613C9.66915 9.60539 10.262 9.84091 10.875 9.84091C11.5447 9.84091 12.1903 9.55982 14.0325 8.68708L16.8807 7.3378C17.6914 6.95374 18.1993 6.71043 18.5177 6.5C18.1993 6.28957 17.6914 6.04626 16.8807 5.6622L15.8064 5.15325ZM7.06588 2.50066C8.63051 1.7585 9.70254 1.25 10.875 1.25C12.0475 1.25 13.1195 1.7585 14.6841 2.50066C14.7492 2.53152 14.8151 2.56279 14.8819 2.59444L17.7962 3.97504C18.521 4.31831 19.16 4.62098 19.6096 4.91829C20.0597 5.21596 20.625 5.7042 20.625 6.5C20.625 7.2958 20.0597 7.78404 19.6096 8.08171C19.16 8.37902 18.521 8.68169 17.7962 9.02496L14.8819 10.4056C14.8151 10.4372 14.7492 10.4685 14.6841 10.4993C13.1195 11.2415 12.0475 11.75 10.875 11.75C9.70254 11.75 8.63052 11.2415 7.06589 10.4993C7.00082 10.4685 6.9349 10.4372 6.86809 10.4056L4.01991 9.05627C3.99779 9.04579 3.97575 9.03535 3.95378 9.02495C3.22902 8.68168 2.59 8.37902 2.14041 8.08171C1.69027 7.78404 1.125 7.2958 1.125 6.5C1.125 5.7042 1.69027 5.21596 2.14041 4.91829C2.59 4.62098 3.22902 4.31832 3.95378 3.97505C3.97575 3.96465 3.99779 3.95421 4.01991 3.94373L6.86809 2.59444C6.9349 2.56279 7.00081 2.53153 7.06588 2.50066Z',
  d9: 'M15.875 14.0024C15.875 12.6217 16.9943 11.5024 18.375 11.5024C19.0529 11.5024 19.6678 11.7722 20.1181 12.2103L20.1181 12.2104C20.3746 12.4598 20.5028 12.5846 20.5639 12.5588C20.625 12.533 20.625 12.3693 20.625 12.042L20.625 6.50244C20.625 6.47315 20.6233 6.44426 20.6201 6.41584C20.6043 6.27866 20.5964 6.21007 20.4605 6.13543C20.3245 6.06079 20.2255 6.1089 20.0273 6.20511L17.1436 7.60518L14.2224 9.01871C12.3546 9.92254 11.6326 10.2524 10.875 10.2524C10.1174 10.2524 9.39544 9.92254 7.5276 9.01871L4.6064 7.60517L1.72271 6.20511C1.52454 6.1089 1.42546 6.06079 1.28953 6.13543C1.1536 6.21007 1.14572 6.27866 1.12995 6.41584C1.12668 6.44426 1.125 6.47315 1.125 6.50244L1.125 17.1637C1.125 18.2841 1.94234 19.0293 2.94833 19.6329C3.96672 20.244 5.67603 20.9661 7.56913 21.7658L7.56914 21.7658C8.98817 22.3657 9.90296 22.7524 10.875 22.7524C11.847 22.7524 12.7619 22.3657 14.1809 21.7658C14.7544 21.5235 15.311 21.2884 15.8366 21.0613C15.8601 21.0512 15.875 21.0279 15.875 21.0024V20.6024C15.875 20.3196 15.875 20.1781 15.7871 20.0903C15.6993 20.0024 15.5578 20.0024 15.275 20.0024H14.875C13.4943 20.0024 12.375 18.8831 12.375 17.5024C12.375 16.1217 13.4943 15.0024 14.875 15.0024H15.275C15.5578 15.0024 15.6993 15.0024 15.7871 14.9145C15.875 14.8267 15.875 14.6852 15.875 14.4024V14.0024ZM5.21057 11.3306C4.84009 11.1454 4.38959 11.2955 4.20434 11.666C4.0191 12.0365 4.16927 12.487 4.53975 12.6723L6.53975 13.6723C6.91024 13.8575 7.36074 13.7073 7.54598 13.3368C7.73123 12.9664 7.58106 12.5159 7.21057 12.3306L5.21057 11.3306Z',
  d10: 'M18.25 13C18.8023 13 19.25 13.4477 19.25 14V16.5H21.75C22.3023 16.5 22.75 16.9477 22.75 17.5C22.75 18.0523 22.3023 18.5 21.75 18.5H19.25V21C19.25 21.5523 18.8023 22 18.25 22C17.6977 22 17.25 21.5523 17.25 21L17.25 18.5H14.75C14.1977 18.5 13.75 18.0523 13.75 17.5C13.75 16.9477 14.1977 16.5 14.75 16.5H17.25L17.25 14C17.25 13.4477 17.6977 13 18.25 13Z',
  d11: 'M6.06836 7.84835L13.7145 4.10547L15.9311 5.15485L8.28495 8.89774L6.06836 7.84835Z',
  d12: 'M3.20434 11.6648C3.38959 11.2943 3.84009 11.1441 4.21057 11.3293L6.21057 12.3293C6.58106 12.5146 6.73123 12.9651 6.54598 13.3356C6.36074 13.7061 5.91024 13.8562 5.53975 13.671L3.53975 12.671C3.16927 12.4857 3.0191 12.0352 3.20434 11.6648Z',
  d13: 'M18.25 11.5002C16.8693 11.5002 15.75 12.6195 15.75 14.0002V15.0002H14.75C13.3693 15.0002 12.25 16.1195 12.25 17.5002C12.25 18.8809 13.3693 20.0002 14.75 20.0002H15.75V21.0002C15.75 21.05 15.7515 21.0994 15.7543 21.1485C15.2904 21.3478 14.8045 21.553 14.3058 21.7637C12.8868 22.3636 11.972 22.7503 11 22.7503C10.028 22.7503 9.11317 22.3636 7.69413 21.7636C5.80103 20.964 4.09172 20.2419 3.07333 19.6308C2.06734 19.0271 1.25 18.282 1.25 17.1616V6.50031C1.25 5.7045 1.81527 5.21596 2.26541 4.91829C2.715 4.62098 3.35402 4.31832 4.07878 3.97505L7.19088 2.50066C8.75551 1.7585 9.82754 1.25 11 1.25C12.1725 1.25 13.2445 1.7585 14.8091 2.50066L17.9213 3.97507C18.646 4.31832 19.285 4.621 19.7346 4.91829C20.1847 5.21596 20.75 5.7045 20.75 6.50031V12.1279C20.75 12.8326 20.75 13.1849 20.6187 13.2329C20.4874 13.2809 20.2445 12.9932 19.7586 12.4178C19.3393 11.9213 18.8167 11.5002 18.25 11.5002ZM11.0001 3.15912C10.3304 3.15912 9.68477 3.4402 7.84253 4.31294L4.99436 5.66223C4.18366 6.04629 3.67577 6.28959 3.35742 6.50003C3.67577 6.71046 4.18366 6.95377 4.99436 7.33782L8.28528 8.89616C9.79422 9.60541 10.387 9.84094 11.0001 9.84094C11.6698 9.84094 12.3154 9.55985 14.1576 8.68711L17.0058 7.33783C17.8165 6.95377 18.3244 6.71046 18.6427 6.50003C18.3244 6.28959 17.8165 6.04628 17.0058 5.66223L13.7149 4.10389C12.2059 3.39464 11.6131 3.15912 11.0001 3.15912Z',
  d14: 'M11.0038 10L20.0007 6L11.0038 2L2.00684 6L11.0038 10Z',
  d15: 'M15.5028 4L6.50586 8',
  d16: 'M5.00586 12L7.00518 13',
  d17: 'M15.002 17.5H21.9996M18.5008 21V14',
  d18: 'M2.00195 6V18.0275L10.9524 21.978C10.9642 21.9832 10.9766 21.9861 10.9892 21.9866M10.9892 10.0176V21.9866M10.9892 21.9866V22M10.9892 21.9866C11.0043 21.9872 11.0196 21.9843 11.0338 21.978L14.002 20.6593M19.9897 12.0007L19.9784 6.00743',
  d19: 'M1.25 6C1.25 5.62457 1.47692 5.28435 1.82902 5.13188L10.604 1.33188C10.8561 1.22271 11.1439 1.22271 11.396 1.33188L20.171 5.13188C20.5231 5.28435 20.75 5.62457 20.75 6V12.75H17V15.25H14.5V19.75H17V20.1541L11.3046 22.6854C11.1107 22.7715 10.8893 22.7715 10.6954 22.6854L1.25 18.4874V6ZM4.62566 6L6.61244 6.86037L12.9868 4.09997L11 3.2396L4.62566 6ZM15.3874 5.13957L9.0131 7.89997L11 8.7604L17.3743 6L15.3874 5.13957ZM7.5 14L5 12.5V11L7.5 12.5V14Z',
  d20: 'M20.25 18.5V21L18.25 21L18.25 18.5H15.75V16.5H18.25L18.25 14H20.25V16.5H22.75V18.5H20.25Z',
};

export const IconPackageAddStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="package-add-stroke-rounded IconPackageAddStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconPackageAddDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="package-add-duotone-rounded IconPackageAddDuotoneRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPackageAddTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="package-add-twotone-rounded IconPackageAddTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPackageAddSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="package-add-solid-rounded IconPackageAddSolidRounded"
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

export const IconPackageAddBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="package-add-bulk-rounded IconPackageAddBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPackageAddStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="package-add-stroke-sharp IconPackageAddStrokeSharp"
    >
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPackageAddSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="package-add-solid-sharp IconPackageAddSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPackageAdd: TheIconSelfPack = {
  name: 'PackageAdd',
  StrokeRounded: IconPackageAddStrokeRounded,
  DuotoneRounded: IconPackageAddDuotoneRounded,
  TwotoneRounded: IconPackageAddTwotoneRounded,
  SolidRounded: IconPackageAddSolidRounded,
  BulkRounded: IconPackageAddBulkRounded,
  StrokeSharp: IconPackageAddStrokeSharp,
  SolidSharp: IconPackageAddSolidSharp,
};