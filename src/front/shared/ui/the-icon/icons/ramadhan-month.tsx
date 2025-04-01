import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 2V4M6 2V4',
  d2: 'M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z',
  d3: 'M3 8H21',
  d4: 'M15 16.4343C14.4347 17.3725 13.406 18 12.2308 18C10.4465 18 9 16.5535 9 14.7692C9 13.594 9.6275 12.5653 10.5657 12',
  d5: 'M14 13H14.009',
  d6: 'M21.5 12.7558V12.2423C21.5 10.5134 21.5 9.12747 21.4218 8H2.57822C2.5 9.12747 2.5 10.5134 2.5 12.2423V12.7558C2.5 17.1131 2.5 19.2918 3.75212 20.6454C5.00424 21.999 7.01949 21.999 11.05 21.999H12.95C16.9805 21.999 18.9958 21.999 20.2479 20.6454C21.5 19.2918 21.5 17.1131 21.5 12.7558Z',
  d7: 'M6 1.12488C6.55228 1.12488 7 1.57259 7 2.12488V4.12488C7 4.67716 6.55228 5.12488 6 5.12488C5.44772 5.12488 5 4.67716 5 4.12488V2.12488C5 1.57259 5.44772 1.12488 6 1.12488ZM18 1.12488C18.5523 1.12488 19 1.57259 19 2.12488V4.12488C19 4.67716 18.5523 5.12488 18 5.12488C17.4477 5.12488 17 4.67716 17 4.12488V2.12488C17 1.57259 17.4477 1.12488 18 1.12488Z',
  d8: 'M10.9957 2.37512H13.0043C14.9062 2.37509 16.4403 2.37507 17.6469 2.55045C18.9062 2.73348 19.9493 3.12465 20.7681 4.00985C21.5769 4.88423 21.9251 5.97992 22.0897 7.30357C22.25 8.59243 22.25 10.2374 22.25 12.3068V12.9435C22.25 15.0128 22.25 16.6578 22.0897 17.9467C21.9251 19.2703 21.5769 20.366 20.7681 21.2404C19.9493 22.1256 18.9062 22.5168 17.6469 22.6998C16.4403 22.8752 14.9062 22.8752 13.0043 22.8751H10.9957C9.09381 22.8752 7.55972 22.8752 6.35306 22.6998C5.09379 22.5168 4.05069 22.1256 3.23188 21.2404C2.42308 20.366 2.07487 19.2703 1.91025 17.9467C1.74997 16.6578 1.74998 15.0128 1.75 12.9435V12.9435L1.75 12.3068V12.3067C1.74998 10.2374 1.74997 8.59242 1.91025 7.30357C2.07487 5.97992 2.42308 4.88423 3.23188 4.00985C4.05069 3.12465 5.09379 2.73348 6.35306 2.55045C7.55972 2.37507 9.09381 2.37509 10.9957 2.37512ZM6.63388 4.48253C5.6203 4.62985 5.06862 4.89939 4.66512 5.3356C4.31834 5.71049 4.07746 6.21295 3.9256 7.03387C3.89242 7.21326 4.0333 7.37512 4.21573 7.37512L19.7843 7.37512C19.9667 7.37512 20.1076 7.21326 20.0744 7.03387C19.9225 6.21295 19.6817 5.71049 19.3349 5.3356C18.9314 4.89939 18.3797 4.62985 17.3661 4.48253C16.3162 4.32992 14.9244 4.32751 12.9274 4.32751H11.0726C9.07558 4.32751 7.68385 4.32992 6.63388 4.48253ZM11.0818 12.9817C11.5549 12.6966 11.7073 12.0821 11.4223 11.6091C11.1372 11.136 10.5227 10.9836 10.0496 11.2686C8.8236 12.0074 8 13.3542 8 14.8944C8 17.231 9.89418 19.1252 12.2308 19.1252C13.7709 19.1252 15.1178 18.3016 15.8565 17.0755C16.1416 16.6025 15.9892 15.9879 15.5161 15.7029C15.0431 15.4179 14.4285 15.5703 14.1435 16.0433C13.7515 16.6938 13.0411 17.1252 12.2308 17.1252C10.9987 17.1252 10 16.1264 10 14.8944C10 14.0841 10.4314 13.3736 11.0818 12.9817ZM14 12.1255C13.4477 12.1255 13 12.5732 13 13.1255C13 13.6778 13.4477 14.1255 14 14.1255H14.009C14.5613 14.1255 15.009 13.6778 15.009 13.1255C15.009 12.5732 14.5613 12.1255 14.009 12.1255H14Z',
  d9: 'M10.9957 2.37512H13.0043C14.5814 2.3751 15.9057 2.37507 17 2.47508V2.12512C17 1.57284 17.4477 1.12512 18 1.12512C18.5523 1.12512 19 1.57284 19 2.12512V2.86902C19.6733 3.1062 20.2634 3.46416 20.7681 4.00985C21.5769 4.88423 21.9251 5.97992 22.0897 7.30357C22.25 8.59243 22.25 10.2374 22.25 12.3068V12.9435C22.25 15.0128 22.25 16.6578 22.0897 17.9467C21.9251 19.2703 21.5769 20.366 20.7681 21.2404C19.9493 22.1256 18.9062 22.5168 17.6469 22.6998C16.4403 22.8752 14.9062 22.8752 13.0043 22.8751H10.9957C9.09381 22.8752 7.55972 22.8752 6.35306 22.6998C5.09379 22.5168 4.05069 22.1256 3.23188 21.2404C2.42308 20.366 2.07487 19.2703 1.91025 17.9467C1.74997 16.6578 1.74998 15.0128 1.75 12.9435V12.9435L1.75 12.3068V12.3067C1.74998 10.2374 1.74997 8.59242 1.91025 7.30357C2.07487 5.97992 2.42308 4.88423 3.23188 4.00985C3.73665 3.46416 4.32666 3.1062 5 2.86902V2.12512C5 1.57284 5.44772 1.12512 6 1.12512C6.55229 1.12512 7 1.57284 7 2.12512V2.47508C8.09433 2.37507 9.41856 2.3751 10.9957 2.37512ZM6.94865 4.4423C7.95897 4.32947 9.2689 4.32751 11.0726 4.32751H12.9274C14.7311 4.32751 16.041 4.32948 17.0514 4.4423C17.184 4.83911 17.5586 5.12512 18 5.12512C18.2661 5.12512 18.508 5.02117 18.6871 4.85165C18.9499 4.98305 19.1568 5.1431 19.3349 5.3356C19.6817 5.71049 19.9225 6.21295 20.0744 7.03387C20.1076 7.21326 19.9667 7.37512 19.7843 7.37512L4.21573 7.37512C4.0333 7.37512 3.89242 7.21326 3.9256 7.03387C4.07746 6.21295 4.31834 5.71049 4.66512 5.3356C4.84319 5.1431 5.05011 4.98305 5.31286 4.85165C5.49204 5.02117 5.73388 5.12512 6 5.12512C6.44142 5.12512 6.81603 4.83911 6.94865 4.4423Z',
  d10: 'M11.4223 11.6092C11.7073 12.0822 11.5549 12.6968 11.0818 12.9818C10.4314 13.3737 10 14.0842 10 14.8945C10 16.1265 10.9987 17.1253 12.2308 17.1253C13.0411 17.1253 13.7515 16.6939 14.1435 16.0434C14.4285 15.5704 15.0431 15.418 15.5161 15.703C15.9892 15.9881 16.1416 16.6026 15.8565 17.0756C15.1178 18.3017 13.7709 19.1253 12.2308 19.1253C9.89418 19.1253 8 17.2311 8 14.8945C8 13.3543 8.8236 12.0075 10.0496 11.2687C10.5227 10.9837 11.1372 11.1361 11.4223 11.6092Z',
  d11: 'M13 13.1256C13 12.5733 13.4477 12.1256 14 12.1256H14.009C14.5613 12.1256 15.009 12.5733 15.009 13.1256C15.009 13.6779 14.5613 14.1256 14.009 14.1256H14C13.4477 14.1256 13 13.6779 13 13.1256Z',
  d12: 'M17.5 2V6M6.5 2V6',
  d13: 'M21 4H3V22H21V4Z',
  d14: 'M3 9H21',
  d15: 'M15 16.9343C14.4347 17.8725 13.406 18.5 12.2308 18.5C10.4465 18.5 9 17.0535 9 15.2692C9 14.094 9.6275 13.0653 10.5657 12.5',
  d16: 'M13.4996 13.9999H13.5086',
  d17: 'M5.75 5.75V1.5H7.25V5.75H5.75ZM16.75 5.75V1.5H18.25V5.75H16.75Z',
  d18: 'M2.25 3.75C2.25 3.33579 2.58579 3 3 3H21C21.4142 3 21.75 3.33579 21.75 3.75V21.75C21.75 22.1642 21.4142 22.5 21 22.5H3C2.58579 22.5 2.25 22.1642 2.25 21.75V3.75ZM20.25 8H3.75V4.5H20.25V8ZM11.0818 13.1066C10.4314 13.4985 10 14.209 10 15.0193C10 16.2513 10.9987 17.2501 12.2308 17.2501C13.0411 17.2501 13.7515 16.8187 14.1435 16.1682L15.8565 17.2005C15.1178 18.4265 13.7709 19.2501 12.2308 19.2501C9.89418 19.2501 8 17.3559 8 15.0193C8 13.4791 8.8236 12.1323 10.0496 11.3936L11.0818 13.1066ZM13.5 12.75C12.9477 12.75 12.5 13.1977 12.5 13.75C12.5 14.3023 12.9477 14.75 13.5 14.75H13.509C14.0613 14.75 14.509 14.3023 14.509 13.75C14.509 13.1977 14.0613 12.75 13.509 12.75H13.5Z',
};

export const IconRamadhanMonthStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ramadhan-month-stroke-rounded IconRamadhanMonthStrokeRounded"
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

export const IconRamadhanMonthDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ramadhan-month-duotone-rounded IconRamadhanMonthDuotoneRounded"
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

export const IconRamadhanMonthTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ramadhan-month-twotone-rounded IconRamadhanMonthTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconRamadhanMonthSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ramadhan-month-solid-rounded IconRamadhanMonthSolidRounded"
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

export const IconRamadhanMonthBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ramadhan-month-bulk-rounded IconRamadhanMonthBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRamadhanMonthStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ramadhan-month-stroke-sharp IconRamadhanMonthStrokeSharp"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconRamadhanMonthSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ramadhan-month-solid-sharp IconRamadhanMonthSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRamadhanMonth: TheIconSelfPack = {
  name: 'RamadhanMonth',
  StrokeRounded: IconRamadhanMonthStrokeRounded,
  DuotoneRounded: IconRamadhanMonthDuotoneRounded,
  TwotoneRounded: IconRamadhanMonthTwotoneRounded,
  SolidRounded: IconRamadhanMonthSolidRounded,
  BulkRounded: IconRamadhanMonthBulkRounded,
  StrokeSharp: IconRamadhanMonthStrokeSharp,
  SolidSharp: IconRamadhanMonthSolidSharp,
};