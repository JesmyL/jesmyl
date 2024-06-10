import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 18C10.6675 18.6224 8.91707 19 7 19C5.93408 19 4.91969 18.8833 4 18.6726C3.4088 18.5372 3.11319 18.4695 2.75898 18.1892C2.55696 18.0294 2.30483 17.7129 2.19412 17.4803C2 17.0725 2 16.677 2 15.886V5.11397C2 4.12914 3.04003 3.45273 4 3.6726C4.91969 3.88325 5.93408 4 7 4C8.91707 4 10.6675 3.62236 12 3C13.3325 2.37764 15.0829 2 17 2C18.0659 2 19.0803 2.11675 20 2.3274C20.5912 2.46281 20.8868 2.53051 21.241 2.81079C21.443 2.97064 21.6952 3.28705 21.8059 3.51966C22 3.92751 22 4.32299 22 5.11397V15.886C22 16.8709 20.96 17.5473 20 17.3274C19.0803 17.1167 18.0659 17 17 17C15.0829 17 13.3325 17.3776 12 18Z',
  d2: 'M2 21C3.33254 21.6224 5.08293 22 7 22C8.91707 22 10.6675 21.6224 12 21C13.3325 20.3776 15.0829 20 17 20C18.9171 20 20.6675 20.3776 22 21',
  d3: 'M14.5 10.5C14.5 11.8807 13.3807 13 12 13C10.6193 13 9.5 11.8807 9.5 10.5C9.5 9.11929 10.6193 8 12 8C13.3807 8 14.5 9.11929 14.5 10.5Z',
  d4: 'M5.5 11.5L5.5 11.509',
  d5: 'M18.5 9.49219L18.5 9.50117',
  d6: 'M7 19C8.91707 19 10.6675 18.6224 12 18C13.3325 17.3776 15.0829 17 17 17C18.0659 17 19.0803 17.1167 20 17.3274C20.96 17.5473 22 16.8709 22 15.886V5.11397C22 4.32299 22 3.92751 21.8059 3.51966C21.6952 3.28705 21.443 2.97064 21.241 2.81079C20.8868 2.53051 20.5912 2.46281 20 2.3274C19.0803 2.11675 18.0659 2 17 2C15.0829 2 13.3325 2.37764 12 3C10.6675 3.62236 8.91707 4 7 4C5.93408 4 4.91969 3.88325 4 3.6726C3.04003 3.45273 2 4.12914 2 5.11397V15.886C2 16.677 2 17.0725 2.19412 17.4803C2.30483 17.7129 2.55696 18.0294 2.75898 18.1892C3.11319 18.4695 3.4088 18.5372 4 18.6726C4.91969 18.8833 5.93408 19 7 19ZM12 13C13.3807 13 14.5 11.8807 14.5 10.5C14.5 9.11929 13.3807 8 12 8C10.6193 8 9.5 9.11929 9.5 10.5C9.5 11.8807 10.6193 13 12 13Z',
  d7: 'M7.00018 21.25C5.17453 21.25 3.53542 20.8893 2.31756 20.3205C1.94226 20.1452 1.49592 20.3073 1.32064 20.6826C1.14536 21.0579 1.3075 21.5043 1.6828 21.6795C3.13001 22.3555 4.99168 22.75 7.00018 22.75C9.00867 22.75 10.8703 22.3555 12.3176 21.6795C13.5354 21.1107 15.1745 20.75 17.0002 20.75C18.8258 20.75 20.4649 21.1107 21.6828 21.6795C22.0581 21.8548 22.5044 21.6927 22.6797 21.3174C22.855 20.9421 22.6929 20.4957 22.3176 20.3205C20.8703 19.6445 19.0087 19.25 17.0002 19.25C14.9917 19.25 13.13 19.6445 11.6828 20.3205C10.4649 20.8893 8.82583 21.25 7.00018 21.25Z',
  d8: 'M17.0001 1.25C14.9916 1.25 13.13 1.64454 11.6828 2.32046C10.4649 2.88927 8.82578 3.25 7.00013 3.25C5.98813 3.25 5.03002 3.13907 4.16758 2.94153C2.84114 2.63772 1.25013 3.54678 1.25013 5.11397V15.886L1.25007 15.9915C1.2494 16.6817 1.24885 17.2392 1.51704 17.8027C1.67709 18.1389 2.0017 18.5463 2.29374 18.7774C2.78191 19.1636 3.22743 19.2654 3.77432 19.3903L3.83269 19.4037C4.80962 19.6274 5.88029 19.75 7.00013 19.75C9.00863 19.75 10.8703 19.3555 12.3175 18.6795C13.5354 18.1107 15.1745 17.75 17.0001 17.75C18.0121 17.75 18.9702 17.8609 19.8327 18.0585C21.1591 18.3623 22.7501 17.4532 22.7501 15.886V5.11397L22.7502 5.00845V5.00843C22.7509 4.31824 22.7514 3.76081 22.4832 3.19734C22.3232 2.86108 21.9986 2.45372 21.7065 2.22264C21.2184 1.83636 20.7728 1.73459 20.2259 1.60967L20.1676 1.59633C19.1906 1.37257 18.12 1.25 17.0001 1.25ZM6.5 11.5C6.5 10.9477 6.05228 10.5 5.5 10.5C4.94772 10.5 4.5 10.9477 4.5 11.5V11.509C4.5 12.0613 4.94772 12.509 5.5 12.509C6.05228 12.509 6.5 12.0613 6.5 11.509V11.5ZM18.5 8.49219C19.0523 8.49219 19.5 8.9399 19.5 9.49219V9.50117C19.5 10.0535 19.0523 10.5012 18.5 10.5012C17.9477 10.5012 17.5 10.0535 17.5 9.50117V9.49219C17.5 8.9399 17.9477 8.49219 18.5 8.49219ZM12 13.5C13.6569 13.5 15 12.1569 15 10.5C15 8.84315 13.6569 7.5 12 7.5C10.3431 7.5 9 8.84315 9 10.5C9 12.1569 10.3431 13.5 12 13.5Z',
  d9: 'M11.6828 2.32046C13.13 1.64454 14.9916 1.25 17.0001 1.25C18.12 1.25 19.1906 1.37257 20.1676 1.59633L20.2259 1.60967C20.7728 1.73459 21.2184 1.83636 21.7065 2.22264C21.9986 2.45372 22.3232 2.86108 22.4832 3.19734C22.7514 3.76081 22.7509 4.31824 22.7502 5.00843V5.00845L22.7501 5.11397V15.886C22.7501 17.4532 21.1591 18.3623 19.8327 18.0585C18.9702 17.8609 18.0121 17.75 17.0001 17.75C15.1745 17.75 13.5354 18.1107 12.3175 18.6795C10.8703 19.3555 9.00863 19.75 7.00013 19.75C5.88029 19.75 4.80962 19.6274 3.83269 19.4037L3.77432 19.3903C3.22743 19.2654 2.78191 19.1636 2.29374 18.7774C2.0017 18.5463 1.67709 18.1389 1.51704 17.8027C1.24885 17.2392 1.2494 16.6817 1.25007 15.9915L1.25013 15.886V5.11397C1.25013 3.54678 2.84114 2.63772 4.16758 2.94153C5.03002 3.13907 5.98813 3.25 7.00013 3.25C8.82578 3.25 10.4649 2.88927 11.6828 2.32046Z',
  d10: 'M5.5 10.5C6.05228 10.5 6.5 10.9477 6.5 11.5L6.5 11.509C6.5 12.0613 6.05228 12.509 5.5 12.509C4.94772 12.509 4.5 12.0613 4.5 11.509L4.5 11.5C4.5 10.9477 4.94772 10.5 5.5 10.5Z',
  d11: 'M18.5 8.49219C19.0523 8.49219 19.5 8.9399 19.5 9.49219L19.5 9.50117C19.5 10.0535 19.0523 10.5012 18.5 10.5012C17.9477 10.5012 17.5 10.0535 17.5 9.50117L17.5 9.49219C17.5 8.9399 17.9477 8.49219 18.5 8.49219Z',
  d12: 'M15 10.5C15 12.1569 13.6569 13.5 12 13.5C10.3431 13.5 9 12.1569 9 10.5C9 8.84315 10.3431 7.5 12 7.5C13.6569 7.5 15 8.84315 15 10.5Z',
  d13: 'M12 3C10.6675 3.62236 8.91707 4 7 4C5.93408 4 4.5 4 2 3V17C4.5 18 5.93408 18 7 18C8.91707 18 10.6675 17.6224 12 17C13.3325 16.3776 15.0829 16 17 16C20 16 22 17 22 17V3C22 3 20 2 17 2C15.0829 2 13.3325 2.37764 12 3Z',
  d14: 'M2 20C3.33254 20.6224 5.08293 21 7 21C8.91707 21 10.6675 20.6224 12 20C13.3325 19.3776 15.0829 19 17 19C18.9171 19 20.6675 19.3776 22 20',
  d15: 'M14.4507 10C14.4507 11.3807 13.3314 12.5 11.9507 12.5C10.57 12.5 9.45068 11.3807 9.45068 10C9.45068 8.61929 10.57 7.5 11.9507 7.5C13.3314 7.5 14.4507 8.61929 14.4507 10Z',
  d16: 'M5.5 11L5.5 11.009',
  d17: 'M18.5 8.99126L18.5 9.00024',
  d18: 'M7 20.25C5.17435 20.25 3.53524 19.8893 2.31737 19.3205L1.68262 20.6795C3.12983 21.3555 4.9915 21.75 7 21.75C9.00849 21.75 10.8702 21.3555 12.3174 20.6795C13.5352 20.1107 15.1743 19.75 17 19.75C18.8256 19.75 20.4648 20.1107 21.6826 20.6795L22.3174 19.3205C20.8702 18.6445 19.0085 18.25 17 18.25C14.9915 18.25 13.1298 18.6445 11.6826 19.3205C10.4648 19.8893 8.82564 20.25 7 20.25Z',
  d19: 'M22.75 2.53647L22.2169 2.2735C22.1469 2.2419 22.047 2.19853 21.9192 2.14739C21.6636 2.04516 21.2956 1.91159 20.831 1.77886C19.9028 1.51364 18.5827 1.25 17 1.25C14.9915 1.25 13.1298 1.64454 11.6826 2.32046C10.4648 2.88927 8.82565 3.25 7 3.25L6.98161 3.25C5.97319 3.25004 4.64464 3.25008 2.27854 2.30364L1.25 1.89223V17.5078L1.72146 17.6964C4.34095 18.7442 5.87882 18.75 7 18.75C9.00849 18.75 10.8702 18.3555 12.3174 17.6795C13.5352 17.1107 15.1744 16.75 17 16.75C18.4173 16.75 19.5972 16.9864 20.419 17.2211C20.8294 17.3384 21.1489 17.4548 21.3621 17.5401L22.75 18.2135V2.53647ZM11.9512 6.75C10.1562 6.75 8.70117 8.20507 8.70117 10C8.70117 11.7949 10.1562 13.25 11.9512 13.25C13.7461 13.25 15.2012 11.7949 15.2012 10C15.2012 8.20507 13.7461 6.75 11.9512 6.75ZM6.5 10.0001V12.009H4.5V10.0001H6.5ZM19.5 10.0001V7.99109H17.5V10.0001H19.5Z',
};

export const IconCash02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-02-stroke-rounded IconCash02StrokeRounded"
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

export const IconCash02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-02-duotone-rounded IconCash02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconCash02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-02-twotone-rounded IconCash02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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

export const IconCash02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-02-solid-rounded IconCash02SolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconCash02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-02-bulk-rounded IconCash02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCash02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-02-stroke-sharp IconCash02StrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCash02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cash-02-solid-sharp IconCash02SolidSharp"
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

export const iconPackOfCash02: TheIconSelfPack = {
  name: 'Cash02',
  StrokeRounded: IconCash02StrokeRounded,
  DuotoneRounded: IconCash02DuotoneRounded,
  TwotoneRounded: IconCash02TwotoneRounded,
  SolidRounded: IconCash02SolidRounded,
  BulkRounded: IconCash02BulkRounded,
  StrokeSharp: IconCash02StrokeSharp,
  SolidSharp: IconCash02SolidSharp,
};