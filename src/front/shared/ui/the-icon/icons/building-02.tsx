import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 2H9C5.69067 2 5 2.69067 5 6V22H19V6C19 2.69067 18.3093 2 15 2Z',
  d2: 'M3 22H21',
  d3: 'M15 22V19C15 17.3453 14.6547 17 13 17H11C9.34533 17 9 17.3453 9 19V22',
  d4: 'M13.5 6H10.5M13.5 9.5H10.5M13.5 13H10.5',
  d5: 'M9 2H15C18.3093 2 19 2.69067 19 6V22H13C13.9428 22 14.4142 22 14.7071 21.7071C15 21.4142 15 20.9428 15 20V19C15 17.3453 14.6547 17 13 17H11C9.34533 17 9 17.3453 9 19V20C9 20.9428 9 21.4142 9.29289 21.7071C9.58579 22 10.0572 22 11 22H5V6C5 2.69067 5.69067 2 9 2Z',
  d6: 'M2.50024 21.75C2.50024 21.1977 2.94796 20.75 3.50024 20.75H20.5002C21.0525 20.75 21.5002 21.1977 21.5002 21.75C21.5002 22.3023 21.0525 22.75 20.5002 22.75H3.50024C2.94796 22.75 2.50024 22.3023 2.50024 21.75Z',
  d7: 'M6.8182 1.42709C7.42848 1.29303 8.15668 1.25 9.00024 1.25H15.0002C15.8438 1.25 16.572 1.29303 17.1823 1.42709C17.8011 1.56303 18.3455 1.80257 18.7716 2.22867C19.1977 2.65476 19.4372 3.19917 19.5732 3.81795C19.7072 4.42823 19.7502 5.15644 19.7502 6V22L4.25024 22L4.25024 6C4.25024 5.15644 4.29327 4.42823 4.42734 3.81795C4.56327 3.19917 4.80282 2.65476 5.22891 2.22867C5.65501 1.80257 6.19942 1.56303 6.8182 1.42709ZM9.75024 6C9.75024 5.58579 10.086 5.25 10.5002 5.25H13.5002C13.9145 5.25 14.2502 5.58579 14.2502 6C14.2502 6.41421 13.9145 6.75 13.5002 6.75L10.5002 6.75C10.086 6.75 9.75024 6.41421 9.75024 6ZM9.75024 9.5C9.75024 9.08579 10.086 8.75 10.5002 8.75L13.5002 8.75C13.9145 8.75 14.2502 9.08579 14.2502 9.5C14.2502 9.91421 13.9145 10.25 13.5002 10.25L10.5002 10.25C10.086 10.25 9.75024 9.91421 9.75024 9.5ZM9.75024 13C9.75024 12.5858 10.086 12.25 10.5002 12.25L13.5002 12.25C13.9145 12.25 14.2502 12.5858 14.2502 13C14.2502 13.4142 13.9145 13.75 13.5002 13.75L10.5002 13.75C10.086 13.75 9.75024 13.4142 9.75024 13ZM11.1669 16C10.4911 16 9.72942 16.0624 9.24033 16.6494C9.00476 16.932 8.89026 17.2698 8.82901 17.6044C8.76809 17.9372 8.75024 18.3231 8.75024 18.75V21.75H10.2502V18.75C10.2502 18.3496 10.2684 18.0718 10.3045 17.8745C10.3403 17.6789 10.3839 17.6201 10.3927 17.6096C10.3962 17.6054 10.4006 17.6007 10.4127 17.5937C10.4269 17.5853 10.4575 17.5704 10.516 17.555C10.6425 17.5217 10.8422 17.5 11.1669 17.5H12.8336C13.1583 17.5 13.358 17.5217 13.4845 17.555C13.5429 17.5704 13.5736 17.5853 13.5878 17.5937C13.5998 17.6007 13.6043 17.6054 13.6078 17.6096C13.6166 17.6201 13.6602 17.6789 13.696 17.8745C13.7321 18.0718 13.7502 18.3496 13.7502 18.75V21.75H15.2502V18.75C15.2502 18.3231 15.2324 17.9372 15.1715 17.6044C15.1102 17.2698 14.9957 16.932 14.7602 16.6494C14.2711 16.0624 13.5094 16 12.8336 16H11.1669Z',
  d8: 'M6.8182 1.42709C7.42848 1.29303 8.15668 1.25 9.00024 1.25H15.0002C15.8438 1.25 16.572 1.29303 17.1823 1.42709C17.8011 1.56303 18.3455 1.80257 18.7716 2.22867C19.1977 2.65477 19.4372 3.19918 19.5732 3.81795C19.7072 4.42823 19.7502 5.15644 19.7502 6V22H4.25024V6C4.25024 5.15644 4.29327 4.42823 4.42734 3.81795C4.56327 3.19918 4.80282 2.65476 5.22891 2.22867C5.65501 1.80257 6.19942 1.56303 6.8182 1.42709Z',
  d9: 'M9.75024 6C9.75024 5.58579 10.086 5.25 10.5002 5.25H13.5002C13.9145 5.25 14.2502 5.58579 14.2502 6C14.2502 6.41421 13.9145 6.75 13.5002 6.75H10.5002C10.086 6.75 9.75024 6.41421 9.75024 6ZM9.75024 9.5C9.75024 9.08579 10.086 8.75 10.5002 8.75H13.5002C13.9145 8.75 14.2502 9.08579 14.2502 9.5C14.2502 9.91421 13.9145 10.25 13.5002 10.25H10.5002C10.086 10.25 9.75024 9.91421 9.75024 9.5ZM9.75024 13C9.75024 12.5858 10.086 12.25 10.5002 12.25H13.5002C13.9145 12.25 14.2502 12.5858 14.2502 13C14.2502 13.4142 13.9145 13.75 13.5002 13.75H10.5002C10.086 13.75 9.75024 13.4142 9.75024 13Z',
  d10: 'M9.24033 16.6494C9.72942 16.0624 10.4911 16 11.1669 16H12.8336C13.5094 16 14.2711 16.0624 14.7602 16.6494C14.9957 16.932 15.1102 17.2698 15.1715 17.6044C15.2324 17.9372 15.2502 18.3231 15.2502 18.75V21.75H13.7502V18.75C13.7502 18.3496 13.7321 18.0718 13.696 17.8745C13.6602 17.6789 13.6166 17.6201 13.6078 17.6096C13.6043 17.6054 13.5998 17.6007 13.5878 17.5937C13.5736 17.5853 13.5429 17.5704 13.4845 17.555C13.358 17.5217 13.1583 17.5 12.8336 17.5H11.1669C10.8422 17.5 10.6425 17.5217 10.516 17.555C10.4575 17.5704 10.4269 17.5853 10.4127 17.5937C10.4006 17.6007 10.3962 17.6054 10.3927 17.6096C10.3839 17.6201 10.3403 17.6789 10.3045 17.8745C10.2684 18.0718 10.2502 18.3496 10.2502 18.75V21.75H8.75024V18.75C8.75024 18.3231 8.76809 17.9372 8.82901 17.6044C8.89026 17.2698 9.00476 16.932 9.24033 16.6494Z',
  d11: 'M19 2.00002L5 2V22H19V2.00002Z',
  d12: 'M15 22V17H9V22',
  d13: 'M15 6H9M15 9.5H9M15 13H9',
  d14: 'M4.46967 1.46967C4.61032 1.32902 4.80109 1.25 5 1.25L19 1.25002C19.4142 1.25002 19.75 1.5858 19.75 2.00002V22C19.75 22.4142 19.4142 22.75 19 22.75L5 22.75C4.58579 22.75 4.25 22.4142 4.25 22L4.25 2C4.25 1.80109 4.32902 1.61032 4.46967 1.46967ZM8.25 17C8.25 16.5858 8.58579 16.25 9 16.25H15C15.4142 16.25 15.75 16.5858 15.75 17V22H14.25V17.75H9.75V22H8.25V17ZM15 5.25H9V6.75L15 6.75V5.25ZM15 8.75L9 8.75V10.25L15 10.25V8.75ZM15 12.25L9 12.25V13.75L15 13.75V12.25Z',
  d15: 'M21 22.75H3V20.75H21V22.75Z',
};

export const IconBuilding02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-02-stroke-rounded IconBuilding02StrokeRounded"
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
        strokeLinejoin="round" 
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

export const IconBuilding02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-02-duotone-rounded IconBuilding02DuotoneRounded"
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
        strokeLinejoin="round" 
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

export const IconBuilding02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-02-twotone-rounded IconBuilding02TwotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBuilding02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-02-solid-rounded IconBuilding02SolidRounded"
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

export const IconBuilding02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-02-bulk-rounded IconBuilding02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconBuilding02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-02-stroke-sharp IconBuilding02StrokeSharp"
    >
      <path 
        d={d.d11} 
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
    </TheIconWrapper>
  );
};

export const IconBuilding02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="building-02-solid-sharp IconBuilding02SolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfBuilding02: TheIconSelfPack = {
  name: 'Building02',
  StrokeRounded: IconBuilding02StrokeRounded,
  DuotoneRounded: IconBuilding02DuotoneRounded,
  TwotoneRounded: IconBuilding02TwotoneRounded,
  SolidRounded: IconBuilding02SolidRounded,
  BulkRounded: IconBuilding02BulkRounded,
  StrokeSharp: IconBuilding02StrokeSharp,
  SolidSharp: IconBuilding02SolidSharp,
};