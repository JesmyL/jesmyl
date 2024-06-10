import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 22H22',
  d2: 'M14 4H10C8.34533 4 8 4.34533 8 6V22H16V6C16 4.34533 15.6547 4 14 4Z',
  d3: 'M8 13H5C3.34533 13 3 13.3453 3 15V22H8V13Z',
  d4: 'M19 13H16V22H21V15C21 13.3453 20.6547 13 19 13Z',
  d5: 'M12 4L12 2',
  d6: 'M12 22L12 20',
  d7: 'M11 15H13M11 11.5H13M11 8L13 8',
  d8: 'M1 21.75C1 21.1977 1.44772 20.75 2 20.75H22C22.5523 20.75 23 21.1977 23 21.75C23 22.3023 22.5523 22.75 22 22.75H2C1.44772 22.75 1 22.3023 1 21.75Z',
  d9: 'M4.02487 11.8531C4.39681 11.7714 4.81469 11.75 5.25 11.75H8.25C8.80228 11.75 9.25 12.1977 9.25 12.75C9.25 13.3023 8.80228 13.75 8.25 13.75H5.25C4.85798 13.75 4.61219 13.7718 4.454 13.8065C4.39488 13.8195 4.35937 13.8319 4.34003 13.84C4.33188 13.8594 4.31951 13.8949 4.30652 13.954C4.27177 14.1122 4.25 14.358 4.25 14.75V21.75C4.25 22.3023 3.80228 22.75 3.25 22.75C2.69772 22.75 2.25 22.3023 2.25 21.75V14.75C2.25 14.3147 2.27139 13.8968 2.3531 13.5249C2.4373 13.1416 2.59857 12.7462 2.92239 12.4224C3.24621 12.0986 3.64161 11.9373 4.02487 11.8531ZM4.34972 13.8207C4.34976 13.8207 4.34913 13.8219 4.34772 13.8238C4.34898 13.8216 4.34969 13.8206 4.34972 13.8207ZM4.32384 13.8477C4.32188 13.8491 4.32075 13.8498 4.32067 13.8497C4.3206 13.8497 4.32158 13.849 4.32384 13.8477Z',
  d10: 'M19.9751 11.8531C19.6032 11.7714 19.1853 11.75 18.75 11.75H15.75C15.1977 11.75 14.75 12.1977 14.75 12.75C14.75 13.3023 15.1977 13.75 15.75 13.75H18.75C19.142 13.75 19.3878 13.7718 19.546 13.8065C19.6051 13.8195 19.6406 13.8319 19.66 13.84C19.6681 13.8594 19.6805 13.8949 19.6935 13.954C19.7282 14.1122 19.75 14.358 19.75 14.75V21.75C19.75 22.3023 20.1977 22.75 20.75 22.75C21.3023 22.75 21.75 22.3023 21.75 21.75V14.75C21.75 14.3147 21.7286 13.8968 21.6469 13.5249C21.5627 13.1416 21.4014 12.7462 21.0776 12.4224C20.7538 12.0986 20.3584 11.9373 19.9751 11.8531ZM19.6503 13.8207C19.6502 13.8207 19.6509 13.8219 19.6523 13.8238C19.651 13.8216 19.6503 13.8206 19.6503 13.8207ZM19.6762 13.8477C19.6781 13.8491 19.6793 13.8498 19.6793 13.8497C19.6794 13.8497 19.6784 13.849 19.6762 13.8477Z',
  d11: 'M13 2.25V4.00007H11V2.25C11 1.69772 11.4477 1.25 12 1.25C12.5523 1.25 13 1.69771 13 2.25Z',
  d12: 'M12 17.75C12.5523 17.75 13 18.1977 13 18.75L13 21.75C13 22.3023 12.5523 22.75 12 22.75C11.4477 22.75 11 22.3023 11 21.75L11 18.75C11 18.1977 11.4477 17.75 12 17.75Z',
  d13: 'M9.75 18.75C9.75 17.5074 10.7574 16.5 12 16.5C13.2426 16.5 14.25 17.5074 14.25 18.75L14.25 22.75H16C16.4142 22.75 16.75 22.4142 16.75 22V6C16.75 5.5701 16.7286 5.17373 16.6527 4.82851C16.575 4.4748 16.4303 4.12868 16.1508 3.84917C15.8713 3.56966 15.5252 3.42498 15.1715 3.34728C14.8263 3.27144 14.4299 3.25 14 3.25H10C9.5701 3.25 9.17373 3.27144 8.82851 3.34728C8.4748 3.42498 8.12868 3.56966 7.84917 3.84917C7.56966 4.12868 7.42498 4.4748 7.34728 4.82851C7.27144 5.17373 7.25 5.5701 7.25 6L7.25 22C7.25 22.4142 7.58579 22.75 8 22.75H9.75V18.75ZM11 5.52344C10.5858 5.52344 10.25 5.85922 10.25 6.27344C10.25 6.68765 10.5858 7.02344 11 7.02344H13C13.4142 7.02344 13.75 6.68765 13.75 6.27344C13.75 5.85922 13.4142 5.52344 13 5.52344H11ZM11 9.02344C10.5858 9.02344 10.25 9.35922 10.25 9.77344C10.25 10.1877 10.5858 10.5234 11 10.5234H13C13.4142 10.5234 13.75 10.1877 13.75 9.77344C13.75 9.35922 13.4142 9.02344 13 9.02344H11ZM11 12.5234C10.5858 12.5234 10.25 12.8592 10.25 13.2734C10.25 13.6877 10.5858 14.0234 11 14.0234H13C13.4142 14.0234 13.75 13.6877 13.75 13.2734C13.75 12.8592 13.4142 12.5234 13 12.5234H11Z',
  d14: 'M5.25 11.75C4.81469 11.75 4.39681 11.7714 4.02487 11.8531C3.64161 11.9373 3.24621 12.0986 2.92239 12.4224C2.59857 12.7462 2.4373 13.1416 2.3531 13.5249C2.27139 13.8968 2.25 14.3147 2.25 14.75L2.25 21.75C2.25 22.3023 2.69772 22.75 3.25 22.75C3.80228 22.75 4.25 22.3023 4.25 21.75L4.25 14.75C4.25 14.358 4.27177 14.1122 4.30652 13.954C4.31951 13.8949 4.33188 13.8594 4.34003 13.84C4.35937 13.8319 4.39488 13.8195 4.454 13.8065C4.61219 13.7718 4.85798 13.75 5.25 13.75H7.25L7.25 11.75H5.25ZM11 3.25V2.25C11 1.69772 11.4477 1.25 12 1.25C12.5523 1.25 13 1.69771 13 2.25V3.25H11ZM16.75 11.75H18.75C19.1853 11.75 19.6032 11.7714 19.9751 11.8531C20.3584 11.9373 20.7538 12.0986 21.0776 12.4224C21.4014 12.7462 21.5627 13.1416 21.6469 13.5249C21.7286 13.8968 21.75 14.3147 21.75 14.75V21.75C21.75 22.3023 21.3023 22.75 20.75 22.75C20.1977 22.75 19.75 22.3023 19.75 21.75V14.75C19.75 14.358 19.7282 14.1122 19.6935 13.954C19.6805 13.8949 19.6681 13.8594 19.66 13.84C19.6406 13.8319 19.6051 13.8195 19.546 13.8065C19.3878 13.7718 19.142 13.75 18.75 13.75H16.75V11.75ZM4.34972 13.8207C4.34976 13.8207 4.34913 13.8219 4.34772 13.8238C4.34898 13.8216 4.34969 13.8206 4.34972 13.8207ZM4.32067 13.8497L4.32102 13.8496L4.32384 13.8477L4.32122 13.8493C4.32082 13.8496 4.32064 13.8497 4.32067 13.8497Z',
  d15: 'M8 22.75H9.75H14.25H16C16.4142 22.75 16.75 22.4142 16.75 22V6C16.75 5.5701 16.7286 5.17373 16.6527 4.82851C16.575 4.4748 16.4303 4.12868 16.1508 3.84917C15.8713 3.56966 15.5252 3.42498 15.1715 3.34728C14.8263 3.27144 14.4299 3.25 14 3.25H10C9.5701 3.25 9.17373 3.27144 8.82851 3.34728C8.4748 3.42498 8.12868 3.56966 7.84917 3.84917C7.56966 4.12868 7.42498 4.4748 7.34728 4.82851C7.27144 5.17373 7.25 5.5701 7.25 6V22C7.25 22.4142 7.58579 22.75 8 22.75Z',
  d16: 'M13 18.75C13 18.1977 12.5523 17.75 12 17.75C11.4477 17.75 11 18.1977 11 18.75L11 22.75H9.75V18.75C9.75 17.5074 10.7574 16.5 12 16.5C13.2426 16.5 14.25 17.5074 14.25 18.75V22.75H13L13 18.75Z',
  d17: 'M10.25 6.27344C10.25 5.85922 10.5858 5.52344 11 5.52344L13 5.52344C13.4142 5.52344 13.75 5.85922 13.75 6.27344C13.75 6.68765 13.4142 7.02344 13 7.02344H11C10.5858 7.02344 10.25 6.68765 10.25 6.27344ZM10.25 9.77344C10.25 9.35922 10.5858 9.02344 11 9.02344H13C13.4142 9.02344 13.75 9.35922 13.75 9.77344C13.75 10.1877 13.4142 10.5234 13 10.5234H11C10.5858 10.5234 10.25 10.1877 10.25 9.77344ZM10.25 13.2734C10.25 12.8592 10.5858 12.5234 11 12.5234H13C13.4142 12.5234 13.75 12.8592 13.75 13.2734C13.75 13.6877 13.4142 14.0234 13 14.0234H11C10.5858 14.0234 10.25 13.6877 10.25 13.2734Z',
  d18: 'M16 4H8V22H16V4Z',
  d19: 'M8 13L4 13V22H8V13Z',
  d20: 'M20 13H16V22H20V13Z',
  d21: 'M12 22L12 18',
  d22: 'M18.75 14.25H15.75V12.25H19.75C20.3023 12.25 20.75 12.6977 20.75 13.25V22.25H18.75V14.25Z',
  d23: 'M5.25 14.25H8.25V12.25H4.25C3.69772 12.25 3.25 12.6977 3.25 13.25V22.25H5.25V14.25Z',
  d24: 'M22 22.75H2V20.75H22V22.75Z',
  d25: 'M13 1.25L13 3.25L11 3.25L11 1.25L13 1.25Z',
  d26: 'M7.25 4C7.25 3.58579 7.58579 3.25 8 3.25H16C16.4142 3.25 16.75 3.58579 16.75 4V22C16.75 22.4142 16.4142 22.75 16 22.75H8C7.58579 22.75 7.25 22.4142 7.25 22L7.25 4ZM12.75 18V22L11.25 22V18H12.75ZM11 8.75H13V7.25H11V8.75ZM11 12.25H13L13 10.75H11V12.25ZM11 15.75H13V14.25H11V15.75Z',
};

export const IconCity02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="city-02-stroke-rounded IconCity02StrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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

export const IconCity02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="city-02-duotone-rounded IconCity02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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

export const IconCity02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="city-02-twotone-rounded IconCity02TwotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconCity02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="city-02-solid-rounded IconCity02SolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconCity02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="city-02-bulk-rounded IconCity02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCity02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="city-02-stroke-sharp IconCity02StrokeSharp"
    >
      <path 
        d={d.d1} 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d21} 
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

export const IconCity02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="city-02-solid-sharp IconCity02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCity02: TheIconSelfPack = {
  name: 'City02',
  StrokeRounded: IconCity02StrokeRounded,
  DuotoneRounded: IconCity02DuotoneRounded,
  TwotoneRounded: IconCity02TwotoneRounded,
  SolidRounded: IconCity02SolidRounded,
  BulkRounded: IconCity02BulkRounded,
  StrokeSharp: IconCity02StrokeSharp,
  SolidSharp: IconCity02SolidSharp,
};