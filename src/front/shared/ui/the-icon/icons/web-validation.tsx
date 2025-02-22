import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.9992 10C20.9907 6.41543 20.8861 4.52814 19.6088 3.31802C18.2175 2 15.9783 2 11.5 2C7.02166 2 4.78249 2 3.39124 3.31802C2 4.63604 2 6.75736 2 11C2 15.2426 2 17.364 3.39124 18.682C4.61763 19.8438 6.50289 19.9815 10 19.9978',
  d2: 'M15 17.5C15 17.5 15.5 17.5 16 18.5C16 18.5 17.5882 16 19 15.5',
  d3: 'M22 17C22 19.7614 19.7614 22 17 22C14.2386 22 12 19.7614 12 17C12 14.2386 14.2386 12 17 12C19.7614 12 22 14.2386 22 17Z',
  d4: 'M2 8.5H21',
  d5: 'M6.49981 5.5H6.50879',
  d6: 'M10.4998 5.5H10.5088',
  d7: 'M2 11C2 15.2426 2 17.364 3.39124 18.682C4.61763 19.8438 6.50289 19.9815 10 19.9978H12.998C12.3713 19.1625 12 18.1246 12 17C12 14.2386 14.2386 12 17 12C18.6301 12 20.0779 12.78 20.9907 13.9872C20.9992 13.3892 20.9992 12.729 20.9992 11.9978V10C20.998 9.46306 20.9945 8.9642 20.9853 8.5H2.01469C2 9.24051 2 10.0692 2 11Z',
  d8: 'M17 11.25C13.8244 11.25 11.25 13.8244 11.25 17C11.25 20.1756 13.8244 22.75 17 22.75C20.1756 22.75 22.75 20.1756 22.75 17C22.75 13.8244 20.1756 11.25 17 11.25ZM19.2504 16.2072C19.6408 16.0689 19.8453 15.6403 19.707 15.2498C19.5687 14.8594 19.1401 14.6549 18.7496 14.7932C18.2675 14.964 17.8199 15.2838 17.4411 15.616C17.0546 15.955 16.6963 16.3457 16.3947 16.7073C16.2485 16.8825 16.1135 17.0534 15.9928 17.2119C15.9046 17.1294 15.8162 17.0596 15.7285 17.0012C15.7105 16.9892 15.6926 16.9767 15.6743 16.9639C15.5311 16.8642 15.3673 16.7502 15 16.7502C14.5858 16.7502 14.25 17.086 14.25 17.5002C14.25 17.8749 14.5248 18.1855 14.8839 18.2413C14.8875 18.2434 14.8917 18.246 14.8965 18.2492C14.9522 18.2864 15.1237 18.4246 15.3292 18.8356C15.4501 19.0774 15.6917 19.2354 15.9616 19.2492C16.2315 19.263 16.4882 19.1302 16.6332 18.9021C16.796 18.6715 17.276 17.9924 17.5465 17.6681C17.8184 17.3422 18.1219 17.0142 18.4302 16.7438C18.7463 16.4666 19.0266 16.2864 19.2504 16.2072Z',
  d9: 'M11.5697 1.25H11.4311H11.431C9.30393 1.24998 7.61334 1.24997 6.2889 1.41847C4.92719 1.59171 3.80533 1.95804 2.913 2.80244C2.01323 3.65388 1.61601 4.73626 1.42946 6.04925C1.24995 7.31268 1.24997 8.92115 1.25 10.9254V10.9254V11.0767V11.0768C1.24997 13.081 1.24995 14.6895 1.42946 15.9529C1.61601 17.2659 2.01323 18.3483 2.913 19.1997C3.69851 19.943 4.66286 20.3166 5.81428 20.5134C6.94176 20.7061 8.33303 20.7421 10.0315 20.75C10.5706 20.7525 11.0097 20.318 11.0123 19.7794C11.0148 19.2409 10.5797 18.8023 10.0406 18.7998C8.32508 18.7918 7.08914 18.7527 6.1436 18.5911C5.222 18.4336 4.66751 18.1735 4.25579 17.7839C3.7974 17.3502 3.51553 16.7557 3.36254 15.6789C3.20476 14.5683 3.20245 13.0986 3.20245 11.0011C3.20245 10.3616 3.20267 9.7804 3.20744 9.25H19.7934C19.7956 9.49778 19.7969 9.75695 19.7976 10.0283C19.7988 10.5668 20.237 11.0024 20.7761 11.0011C21.3153 10.9998 21.7513 10.5622 21.75 10.0236C21.7459 8.29147 21.7205 6.87293 21.5212 5.7323C21.3162 4.55842 20.9122 3.58258 20.0877 2.80244C19.1954 1.95804 18.0736 1.59171 16.7118 1.41847C15.3874 1.24997 13.6968 1.24998 11.5697 1.25H11.5697ZM5.5 5.5C5.5 4.94772 5.94772 4.5 6.5 4.5H6.50898C7.06127 4.5 7.50898 4.94772 7.50898 5.5C7.50898 6.05228 7.06127 6.5 6.50898 6.5H6.5C5.94772 6.5 5.5 6.05228 5.5 5.5ZM10.5 4.5C9.94771 4.5 9.5 4.94772 9.5 5.5C9.5 6.05228 9.94771 6.5 10.5 6.5H10.509C11.0613 6.5 11.509 6.05228 11.509 5.5C11.509 4.94772 11.0613 4.5 10.509 4.5H10.5Z',
  d10: 'M11.5697 1.25H11.4311H11.431C9.30393 1.24998 7.61334 1.24997 6.2889 1.41847C4.92719 1.59171 3.80533 1.95804 2.913 2.80244C2.01323 3.65388 1.61601 4.73626 1.42946 6.04925C1.24995 7.31268 1.24997 8.92115 1.25 10.9254V10.9254V11.0767V11.0768C1.24997 13.081 1.24995 14.6895 1.42946 15.9529C1.61601 17.2659 2.01323 18.3483 2.913 19.1997C3.69851 19.943 4.66286 20.3166 5.81428 20.5134C6.94176 20.7061 8.33303 20.7421 10.0315 20.75C10.5706 20.7525 11.0097 20.318 11.0123 19.7794C11.0148 19.2409 10.5797 18.8023 10.0406 18.7998C8.32508 18.7918 7.08914 18.7527 6.1436 18.5911C5.222 18.4336 4.66751 18.1735 4.25579 17.7839C3.7974 17.3502 3.51553 16.7557 3.36254 15.6789C3.20476 14.5683 3.20245 13.0986 3.20245 11.0011C3.20245 10.3616 3.20267 9.7804 3.20744 9.25H19.7934C19.7956 9.49778 19.7969 9.75695 19.7976 10.0283C19.7988 10.5668 20.237 11.0024 20.7761 11.0011C21.3153 10.9998 21.7513 10.5622 21.75 10.0236C21.7459 8.29147 21.7205 6.87293 21.5212 5.7323C21.3162 4.55842 20.9122 3.58258 20.0877 2.80244C19.1954 1.95804 18.0736 1.59171 16.7118 1.41847C15.3874 1.24997 13.6968 1.24998 11.5697 1.25H11.5697Z',
  d11: 'M5.5 5.5C5.5 4.94772 5.94772 4.5 6.5 4.5H6.50898C7.06127 4.5 7.50898 4.94772 7.50898 5.5C7.50898 6.05228 7.06127 6.5 6.50898 6.5H6.5C5.94772 6.5 5.5 6.05228 5.5 5.5Z',
  d12: 'M9.5 5.5C9.5 4.94772 9.94772 4.5 10.5 4.5H10.509C11.0613 4.5 11.509 4.94772 11.509 5.5C11.509 6.05228 11.0613 6.5 10.509 6.5H10.5C9.94772 6.5 9.5 6.05228 9.5 5.5Z',
  d13: 'M20.9989 10.0002V2.00001L1.99951 2L2.00022 19.9981H9.99971',
  d14: 'M2 8H21',
  d15: 'M6.49121 5H6.50019',
  d16: 'M10.4912 5H10.5002',
  d17: 'M14.75 17L16.25 18.5L19.25 15.5M22 17C22 19.7614 19.7614 22 17 22C14.2386 22 12 19.7614 12 17C12 14.2386 14.2386 12 17 12C19.7614 12 22 14.2386 22 17Z',
  d18: 'M17 11.25C13.8244 11.25 11.25 13.8244 11.25 17C11.25 20.1756 13.8244 22.75 17 22.75C20.1756 22.75 22.75 20.1756 22.75 17C22.75 13.8244 20.1756 11.25 17 11.25ZM19.7804 16.0304L18.7197 14.9697L16.2501 17.4394L15.2804 16.4697L14.2197 17.5304L16.2501 19.5607L19.7804 16.0304Z',
  d19: 'M2.22622 1.25C1.9673 1.25 1.71899 1.35274 1.53591 1.53561C1.35284 1.71849 1.24999 1.96652 1.25 2.22513L1.25069 19.7749C1.25071 20.3135 1.68777 20.75 2.22691 20.75H10.0361V18.7998H3.20309L3.20269 8.75H19.7976V10.0261H21.75V2.2251C21.75 1.68657 21.3129 1.25001 20.7738 1.25001L2.22622 1.25ZM5.49072 4H7.4997V6H5.49072V4ZM11.4997 4H9.49072V6H11.4997V4Z',
};

export const IconWebValidationStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-validation-stroke-rounded IconWebValidationStrokeRounded"
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
        strokeLinejoin="round" 
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

export const IconWebValidationDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-validation-duotone-rounded IconWebValidationDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
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
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconWebValidationTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-validation-twotone-rounded IconWebValidationTwotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconWebValidationSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-validation-solid-rounded IconWebValidationSolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconWebValidationBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-validation-bulk-rounded IconWebValidationBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconWebValidationStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-validation-stroke-sharp IconWebValidationStrokeSharp"
    >
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
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
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

export const IconWebValidationSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="web-validation-solid-sharp IconWebValidationSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
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

export const iconPackOfWebValidation: TheIconSelfPack = {
  name: 'WebValidation',
  StrokeRounded: IconWebValidationStrokeRounded,
  DuotoneRounded: IconWebValidationDuotoneRounded,
  TwotoneRounded: IconWebValidationTwotoneRounded,
  SolidRounded: IconWebValidationSolidRounded,
  BulkRounded: IconWebValidationBulkRounded,
  StrokeSharp: IconWebValidationStrokeSharp,
  SolidSharp: IconWebValidationSolidSharp,
};