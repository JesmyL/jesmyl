import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 7C16.807 4.06817 13.9174 2 10.5423 2C6.10066 2 2.5 5.58172 2.5 10C2.5 14.4183 6.10066 18 10.5423 18C12.2197 18 13.7772 17.4892 15.0661 16.6153',
  d2: 'M21.5 13C21.5 18.1004 17.1065 21.595 11.4999 21.9671C11.0444 21.9973 10.8167 22.0124 10.6584 21.8642C10.5 21.716 10.5 21.4773 10.5 21V18',
  d3: 'M2.5 10C2.5 14.4183 6.1104 18 10.564 18C12.246 18 13.8077 17.4892 15.1001 16.6153C16.0359 15.8996 16.7346 15.105 17.2469 14.2823C16.7859 13.8288 16.5 13.1978 16.5 12.5C16.5 11.2919 17.3569 10.2839 18.4961 10.0508C18.5324 8.8038 18.3083 7.71412 18.0419 7C16.8456 4.06817 13.9483 2 10.564 2C6.1104 2 2.5 5.58172 2.5 10ZM12.5 10C12.5 11.1046 11.6046 12 10.5 12C9.39543 12 8.5 11.1046 8.5 10C8.5 8.89543 9.39543 8 10.5 8C11.6046 8 12.5 8.89543 12.5 10Z',
  d4: 'M18 7.00238C16.807 4.06829 13.9174 1.99854 10.5423 1.99854C6.10066 1.99854 2.5 5.58301 2.5 10.0047C2.5 14.4264 6.10066 18.0108 10.5423 18.0108C12.2197 18.0108 13.7772 17.4996 15.0661 16.6251',
  d5: 'M10.5 12.0065C11.6046 12.0065 12.5 11.1104 12.5 10.005C12.5 8.89954 11.6046 8.00342 10.5 8.00342C9.39543 8.00342 8.5 8.89954 8.5 10.005C8.5 11.1104 9.39543 12.0065 10.5 12.0065Z',
  d6: 'M21.5 13.0072C21.5 18.1115 17.1065 21.6088 11.4999 21.9812C11.0444 22.0114 10.8167 22.0265 10.6584 21.8782C10.5 21.7299 10.5 21.491 10.5 21.0133V18.011M21.5 12.5068C21.5 13.8886 20.3807 15.0087 19 15.0087C17.6193 15.0087 16.5 13.8886 16.5 12.5068C16.5 11.125 17.6193 10.0049 19 10.0049C20.3807 10.0049 21.5 11.125 21.5 12.5068Z',
  d7: 'M10.5 1.25C5.66751 1.25 1.75 5.16751 1.75 10C1.75 14.8325 5.66751 18.75 10.5 18.75C12.4915 18.75 14.3276 18.0847 15.7981 16.9642C16.0611 16.7639 16.1926 16.6637 16.1991 16.5238C16.2056 16.384 16.0648 16.2543 15.7832 15.995C14.8406 15.127 14.25 13.8825 14.25 12.5C14.25 10.1532 15.9519 8.20395 18.1887 7.81901C18.5665 7.754 18.7554 7.72149 18.8258 7.60024C18.8962 7.47899 18.8397 7.32356 18.7268 7.0127C17.5059 3.65117 14.2834 1.25 10.5 1.25ZM10.5 12C11.6046 12 12.5 11.1046 12.5 10C12.5 8.89545 11.6046 8.00002 10.5 8.00002C9.39547 8.00002 8.50004 8.89545 8.50004 10C8.50004 11.1046 9.39547 12 10.5 12Z',
  d8: 'M19.0001 9.25C17.2051 9.25 15.7501 10.7065 15.7501 12.5032C15.7501 14.2999 17.2051 15.7564 19.0001 15.7564C19.2157 15.7564 19.4265 15.7354 19.6304 15.6952C18.3588 18.5208 15.2359 20.4445 11.25 20.7279V17.7632C11.25 17.2109 10.8023 16.7632 10.25 16.7632C9.69776 16.7632 9.25004 17.2109 9.25004 17.7632L9.25002 20.8039C9.24987 21.0053 9.2497 21.2499 9.27999 21.4608C9.31749 21.7221 9.41773 22.0699 9.7251 22.3575C10.0251 22.6383 10.3685 22.7204 10.636 22.7424C10.8462 22.7596 11.0853 22.7436 11.2763 22.7307L11.3162 22.7281C17.163 22.34 22.1088 18.6762 22.2471 13.0075L22.2501 13.0037V12.5032C22.2501 10.7065 20.795 9.25 19.0001 9.25Z',
  d9: 'M9.25003 18.6613L9.25002 20.8039C9.24987 21.0053 9.2497 21.2499 9.27999 21.4608C9.31749 21.7221 9.41773 22.0699 9.7251 22.3575C10.0251 22.6383 10.3685 22.7204 10.636 22.7424C10.8462 22.7596 11.0853 22.7436 11.2763 22.7307L11.3162 22.7281C17.163 22.34 22.1088 18.6762 22.2471 13.0075L22.2501 13.0037V12.5032C22.2501 10.7065 20.795 9.25 19.0001 9.25C17.2051 9.25 15.7501 10.7065 15.7501 12.5032C15.7501 14.2999 17.2051 15.7564 19.0001 15.7564C19.2157 15.7564 19.4265 15.7354 19.6304 15.6952C18.3588 18.5208 15.2359 20.4445 11.25 20.7279V18.7182C11.0028 18.7392 10.7527 18.7499 10.5 18.7499C10.0756 18.7499 9.65828 18.7197 9.25003 18.6613Z',
  d10: 'M1.75 10C1.75 5.16751 5.66751 1.25 10.5 1.25C14.2834 1.25 17.5059 3.65117 18.7268 7.0127C18.8397 7.32356 18.8962 7.47899 18.8258 7.60024C18.7554 7.72149 18.5665 7.754 18.1887 7.81901C15.9519 8.20395 14.25 10.1532 14.25 12.5C14.25 13.8825 14.8406 15.127 15.7832 15.995C16.0648 16.2543 16.2056 16.384 16.1991 16.5238C16.1926 16.6637 16.0611 16.7639 15.7981 16.9642C14.3276 18.0847 12.4915 18.75 10.5 18.75C5.66751 18.75 1.75 14.8325 1.75 10Z',
  d11: 'M21.5 12.5C21.5 18 17 22 10.5 22V18',
  d12: 'M12.5 10C12.5 11.1046 11.6046 12 10.5 12C9.39543 12 8.5 11.1046 8.5 10C8.5 8.89543 9.39543 8 10.5 8C11.6046 8 12.5 8.89543 12.5 10Z',
  d13: 'M19 9.25C17.2051 9.25 15.75 10.7051 15.75 12.5C15.75 14.2949 17.2051 15.75 19 15.75C19.4268 15.75 19.8344 15.6677 20.2078 15.5182C18.9761 18.7535 15.7233 21.005 11.25 21.2312V18H9.75V22.75H10.5C17.3136 22.75 22.25 18.5082 22.25 12.5C22.25 10.7051 20.7949 9.25 19 9.25Z',
  d14: 'M1.75 10C1.75 5.16751 5.66751 1.25 10.5 1.25C14.5547 1.25 17.9652 4.00791 18.9581 7.75018C16.354 7.77271 14.25 9.89065 14.25 12.5C14.25 14.1597 15.1012 15.6206 16.391 16.4699C14.8362 17.8864 12.769 18.75 10.5 18.75C5.66751 18.75 1.75 14.8325 1.75 10ZM10.3516 8C9.24699 8 8.35156 8.89543 8.35156 10C8.35156 11.1046 9.24699 12 10.3516 12C11.4561 12 12.3516 11.1046 12.3516 10C12.3516 8.89543 11.4561 8 10.3516 8Z',
};

export const IconSchoolBell01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="school-bell-01-stroke-rounded IconSchoolBell01StrokeRounded"
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
      <circle 
        cx="19" 
        cy="12.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="10.5" 
        cy="10" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
    </TheIconWrapper>
  );
};

export const IconSchoolBell01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="school-bell-01-duotone-rounded IconSchoolBell01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
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
      <circle 
        cx="19" 
        cy="12.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="10.5" 
        cy="10" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
    </TheIconWrapper>
  );
};

export const IconSchoolBell01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="school-bell-01-twotone-rounded IconSchoolBell01TwotoneRounded"
    >
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSchoolBell01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="school-bell-01-solid-rounded IconSchoolBell01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSchoolBell01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="school-bell-01-bulk-rounded IconSchoolBell01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="10.5" 
        cy="10" 
        r="2" 
        fill="var(--icon-fill)"></circle>
    </TheIconWrapper>
  );
};

export const IconSchoolBell01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="school-bell-01-stroke-sharp IconSchoolBell01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <circle 
        cx="19" 
        cy="12.5" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSchoolBell01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="school-bell-01-solid-sharp IconSchoolBell01SolidSharp"
    >
      <path 
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

export const iconPackOfSchoolBell01: TheIconSelfPack = {
  name: 'SchoolBell01',
  StrokeRounded: IconSchoolBell01StrokeRounded,
  DuotoneRounded: IconSchoolBell01DuotoneRounded,
  TwotoneRounded: IconSchoolBell01TwotoneRounded,
  SolidRounded: IconSchoolBell01SolidRounded,
  BulkRounded: IconSchoolBell01BulkRounded,
  StrokeSharp: IconSchoolBell01StrokeSharp,
  SolidSharp: IconSchoolBell01SolidSharp,
};