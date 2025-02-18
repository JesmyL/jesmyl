import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
  d2: 'M7.5 12H16.5',
  d3: 'M16.5032 9.30152L9.46318 9.30167C8.4767 9.30167 7.64254 9.34937 7.51979 9.01499C7.42402 8.75401 7.91977 8.1 8.39977 7.5',
  d4: 'M7.50465 14.6985L14.5446 14.6983C15.5311 14.6983 16.3653 14.6506 16.488 14.985C16.5838 15.246 16.088 15.9 15.608 16.5',
  d5: 'M7.49805 12H16.498',
  d6: 'M16.5012 9.30152L9.46122 9.30167C8.47474 9.30167 7.64058 9.34937 7.51783 9.01499C7.42206 8.75401 7.91781 8.1 8.39781 7.5',
  d7: 'M7.50293 14.6988L14.5429 14.6986C15.5294 14.6986 16.3636 14.6509 16.4863 14.9853C16.5821 15.2463 16.0863 15.9003 15.6063 16.5003',
  d8: 'M7.49805 12H16.498M16.5012 9.30152L9.46123 9.30167C8.47475 9.30167 7.64059 9.34937 7.51784 9.01499C7.42207 8.75401 7.91782 8.1 8.39782 7.5M7.5027 14.6985L14.5426 14.6983C15.5291 14.6983 16.3633 14.6506 16.486 14.985C16.5818 15.246 16.086 15.9 15.606 16.5',
  d9: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.17029 7.83728L9.04077 7.99935L16.5003 7.99925C17.0525 7.99924 17.5003 8.44695 17.5003 8.99923C17.5003 9.55152 17.0526 9.99924 16.5003 9.99925L9.12752 9.99939C8.66948 9.99949 8.22702 9.99958 7.88659 9.95335C7.5821 9.91201 6.90107 9.78116 6.60723 9.09994C6.45903 8.75637 6.52491 8.43845 6.55582 8.31375C6.59515 8.15512 6.65741 8.01198 6.71068 7.90346C6.81929 7.68221 6.96546 7.45572 7.09264 7.27186C7.22191 7.08497 7.51993 6.70274 7.62459 6.5685L7.6304 6.56105C7.98286 6.13586 8.61328 6.0769 9.03847 6.42937C9.46355 6.78175 9.52246 7.41209 9.17029 7.83728ZM6.50028 11.9991C6.50028 11.4469 6.94799 10.9991 7.50028 10.9991H16.5003C17.0526 10.9991 17.5003 11.4469 17.5003 11.9991C17.5003 12.5514 17.0526 12.9991 16.5003 12.9991H7.50028C6.94799 12.9991 6.50028 12.5514 6.50028 11.9991ZM7.50002 15.9993L14.9594 15.9992L14.8299 16.1612C14.4777 16.5864 14.5367 17.2166 14.9618 17.569C15.3869 17.9215 16.0174 17.8625 16.3698 17.4374L16.3757 17.4299C16.4804 17.2956 16.7784 16.9135 16.9076 16.7266C17.0348 16.5428 17.181 16.3163 17.2896 16.0951C17.3429 15.9865 17.4051 15.8434 17.4444 15.6848C17.4754 15.5601 17.5412 15.2421 17.393 14.8986C17.0992 14.2174 16.4182 14.0865 16.1137 14.0452C15.7733 13.9989 15.3308 13.999 14.8728 13.9991L7.49998 13.9993C6.9477 13.9993 6.49999 14.447 6.5 14.9993C6.50001 15.5516 6.94773 15.9993 7.50002 15.9993Z',
  d10: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d11: 'M9.17029 7.83728L9.04077 7.99935L16.5003 7.99925C17.0525 7.99924 17.5003 8.44695 17.5003 8.99923C17.5003 9.55152 17.0526 9.99924 16.5003 9.99925L9.12752 9.99939H9.12752C8.66948 9.99949 8.22702 9.99958 7.88659 9.95335C7.5821 9.91201 6.90107 9.78116 6.60723 9.09994C6.45903 8.75637 6.52491 8.43845 6.55582 8.31375C6.59515 8.15512 6.65741 8.01198 6.71068 7.90346C6.81929 7.68221 6.96546 7.45572 7.09264 7.27186C7.22191 7.08497 7.51993 6.70274 7.62459 6.5685L7.6304 6.56105C7.98286 6.13586 8.61328 6.0769 9.03847 6.42937C9.46355 6.78175 9.52246 7.41209 9.17029 7.83728Z',
  d12: 'M6.50028 11.9991C6.50028 11.4469 6.94799 10.9991 7.50028 10.9991H16.5003C17.0526 10.9991 17.5003 11.4469 17.5003 11.9991C17.5003 12.5514 17.0526 12.9991 16.5003 12.9991H7.50028C6.94799 12.9991 6.50028 12.5514 6.50028 11.9991Z',
  d13: 'M14.9594 15.9992L7.50002 15.9993C6.94773 15.9993 6.50001 15.5516 6.5 14.9993C6.49999 14.447 6.9477 13.9993 7.49998 13.9993L14.8728 13.9991C15.3308 13.999 15.7733 13.9989 16.1137 14.0452C16.4182 14.0865 17.0992 14.2174 17.393 14.8986C17.5412 15.2421 17.4754 15.5601 17.4444 15.6848C17.4051 15.8434 17.3429 15.9865 17.2896 16.0951C17.181 16.3163 17.0348 16.5428 16.9076 16.7266C16.7784 16.9135 16.4804 17.2956 16.3757 17.4299L16.3698 17.4374C16.0174 17.8625 15.3869 17.9215 14.9618 17.569C14.5367 17.2166 14.4777 16.5864 14.8299 16.1612L14.9594 15.9992Z',
  d14: 'M7.00964 12.0007H17.0131M17.0035 8.99243H7.00964L8.99168 7.0166M7.00293 15.0035H16.9985L14.9924 17.0063',
  d15: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM8.29395 6.29297L6.29305 8.29312C6.00698 8.57909 5.92135 9.00924 6.07612 9.38296C6.23088 9.75668 6.59555 10.0004 7.00004 10.0004L17.0009 10.0002L17.0009 8.00021L9.41491 8.00032L9.7079 7.70745L8.29395 6.29297ZM7.00092 13H17.0009V11H7.00092V13ZM17.0009 14.0002L7.00091 14.0003L7.00094 16.0003L14.5859 16.0002L14.2931 16.293L15.707 17.7075L17.7079 15.7074C17.994 15.4215 18.0796 14.9913 17.9248 14.6176C17.7701 14.2438 17.4054 14.0002 17.0009 14.0002Z',
};

export const IconMoreOrLessCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-or-less-circle-stroke-rounded IconMoreOrLessCircleStrokeRounded"
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

export const IconMoreOrLessCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-or-less-circle-duotone-rounded IconMoreOrLessCircleDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconMoreOrLessCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-or-less-circle-twotone-rounded IconMoreOrLessCircleTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMoreOrLessCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-or-less-circle-solid-rounded IconMoreOrLessCircleSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoreOrLessCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-or-less-circle-bulk-rounded IconMoreOrLessCircleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoreOrLessCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-or-less-circle-stroke-sharp IconMoreOrLessCircleStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconMoreOrLessCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-or-less-circle-solid-sharp IconMoreOrLessCircleSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMoreOrLessCircle: TheIconSelfPack = {
  name: 'MoreOrLessCircle',
  StrokeRounded: IconMoreOrLessCircleStrokeRounded,
  DuotoneRounded: IconMoreOrLessCircleDuotoneRounded,
  TwotoneRounded: IconMoreOrLessCircleTwotoneRounded,
  SolidRounded: IconMoreOrLessCircleSolidRounded,
  BulkRounded: IconMoreOrLessCircleBulkRounded,
  StrokeSharp: IconMoreOrLessCircleStrokeSharp,
  SolidSharp: IconMoreOrLessCircleSolidSharp,
};