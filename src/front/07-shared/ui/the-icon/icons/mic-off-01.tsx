import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 2L22 22',
  d2: 'M4 11C4 15.4183 7.58172 19 12 19M12 19C13.9545 19 15.7454 18.2991 17.1348 17.1348M12 19V22M12 22H15M12 22H9M20 11C20 12.6514 19.4996 14.1859 18.6422 15.4603',
  d3: 'M17.0078 6.99599C17.0078 4.23457 14.7692 2.01599 12.0078 2.01599C10.139 2.01599 8.5379 2.98126 7.67981 4.49999M17.0078 6.99599L13.9798 7.00799M17.0078 6.99599V11.004M7.00781 6.99599V11.016C7.00781 13.7774 9.24639 16.016 12.0078 16.016C13.1432 16.016 14.1725 15.6256 15.0118 14.988M16.4465 13.26C16.8051 12.5705 17.0078 11.8469 17.0078 11.016V11.004M14.1829 11.004H17.0078',
  d4: 'M7 7V11C7 13.7614 9.23858 16 12 16C13.1257 16 14.1645 15.628 15.0002 15.0002L7 7Z',
  d5: 'M17 6.98C17 4.21858 14.7614 2 12 2C10.1312 2 8.53009 2.96527 7.672 4.484M17 6.98L13.972 6.99201M17 6.98V10.988M17 10.988V11C17 11.8309 16.7973 12.5545 16.4387 13.244M17 10.988H14.1751M7 6.98V11C7 13.7614 9.23858 16 12 16C13.1354 16 14.1647 15.6096 15.004 14.972',
  d6: 'M4 11C4 15.4183 7.58172 19 12 19M12 19C13.9545 19 15.7454 18.2991 17.1348 17.1348M12 19V22M12 22H15M12 22H9',
  d7: 'M7 6.98001V11C7 13.7614 9.23858 16 12 16C13.1354 16 14.1647 15.6096 15.004 14.972',
  d8: 'M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z',
  d9: 'M6.25 7.00012V11.0001C6.25 14.1758 8.82436 16.7501 12 16.7501C13.0898 16.7501 14.1087 16.447 14.9772 15.9204C15.2338 15.7647 15.3621 15.6869 15.3796 15.542C15.3971 15.3971 15.2833 15.2833 15.0555 15.0555L6.79426 6.79426C6.76014 6.76014 6.74307 6.74307 6.72091 6.72771C6.55245 6.61093 6.29136 6.71908 6.25481 6.92077C6.25 6.9473 6.25 6.96491 6.25 7.00012Z',
  d10: 'M17.75 9.65012V8.35012C17.75 8.06728 17.75 7.92586 17.6621 7.83799C17.5743 7.75012 17.4328 7.75012 17.15 7.75012H14C13.5858 7.75012 13.25 7.41434 13.25 7.00012C13.25 6.58591 13.5858 6.25012 14 6.25012H17.0183C17.3425 6.25012 17.5046 6.25012 17.5947 6.13428C17.6847 6.01844 17.6475 5.87204 17.5731 5.57923C16.9406 3.09079 14.6852 1.25012 12 1.25012C10.2178 1.25012 8.62506 2.06089 7.57037 3.3337C7.42537 3.50869 7.35287 3.59618 7.3583 3.71218C7.36372 3.82819 7.44982 3.91429 7.62202 4.08649L13.6099 10.0744C13.6966 10.1611 13.74 10.2044 13.7951 10.2273C13.8502 10.2501 13.9116 10.2501 14.0342 10.2501H17.15C17.4328 10.2501 17.5743 10.2501 17.6621 10.1623C17.75 10.0744 17.75 9.93296 17.75 9.65012Z',
  d11: 'M17.5947 11.866C17.6847 11.9818 17.6475 12.1282 17.5731 12.421C17.5376 12.5607 17.497 12.6983 17.4515 12.8337C17.3373 13.1733 17.2802 13.3432 17.1176 13.3813C16.955 13.4195 16.8189 13.2834 16.5467 13.0111L15.6271 12.0915C15.4818 11.9462 15.4091 11.8736 15.4347 11.8119C15.4603 11.7501 15.563 11.7501 15.7685 11.7501H17.0183C17.3425 11.7501 17.5046 11.7501 17.5947 11.866Z',
  d12: 'M4.22222 10.2501C4.75917 10.2501 5.19444 10.6806 5.19444 11.2117C5.19444 14.929 8.2414 17.9424 12 17.9424C13.664 17.9424 15.1885 17.3518 16.3709 16.3709L17.7418 17.7418C16.435 18.8667 14.7873 19.6143 12.9722 19.8127V20.827H14.9167C15.4536 20.827 15.8889 21.2575 15.8889 21.7886C15.8889 22.3196 15.4536 22.7501 14.9167 22.7501H9.08333C8.54639 22.7501 8.11111 22.3196 8.11111 21.7886C8.11111 21.2575 8.54639 20.827 9.08333 20.827H11.0278V19.8127C6.65283 19.3344 3.25 15.666 3.25 11.2117C3.25 10.6806 3.68528 10.2501 4.22222 10.2501Z',
  d13: 'M18.8056 11.2117C18.8056 10.6806 19.2408 10.2501 19.7778 10.2501C20.3147 10.2501 20.75 10.6806 20.75 11.2117C20.75 12.6538 20.3933 14.0136 19.7624 15.2094C19.6076 15.5029 19.5301 15.6497 19.3803 15.6723C19.2305 15.695 19.1073 15.5718 18.8611 15.3255L18.2934 14.7579C18.1427 14.6071 18.0673 14.5317 18.0509 14.4384C18.0345 14.3452 18.0827 14.2421 18.1792 14.036C18.5812 13.1772 18.8056 12.2203 18.8056 11.2117Z',
  d14: 'M4.22222 10.25C4.75917 10.25 5.19444 10.6805 5.19444 11.2115C5.19444 14.9288 8.2414 17.9423 12 17.9423C13.664 17.9423 15.1885 17.3517 16.3709 16.3708L17.7418 17.7417C16.435 18.8666 14.7873 19.6141 12.9722 19.8126V20.8269H14.9167C15.4536 20.8269 15.8889 21.2574 15.8889 21.7885C15.8889 22.3195 15.4536 22.75 14.9167 22.75H9.08333C8.54639 22.75 8.11111 22.3195 8.11111 21.7885C8.11111 21.2574 8.54639 20.8269 9.08333 20.8269H11.0278V19.8126C6.65283 19.3343 3.25 15.6659 3.25 11.2115C3.25 10.6805 3.68528 10.25 4.22222 10.25Z',
  d15: 'M6.25 7V11C6.25 14.1756 8.82436 16.75 12 16.75C13.0898 16.75 14.1087 16.4468 14.9772 15.9202C15.2338 15.7646 15.3621 15.6868 15.3796 15.5419C15.3971 15.397 15.2833 15.2831 15.0555 15.0554L6.79426 6.79413C6.76014 6.76001 6.74307 6.74294 6.72091 6.72758C6.55245 6.61081 6.29136 6.71895 6.25481 6.92065C6.25 6.94718 6.25 6.96478 6.25 7Z',
  d16: 'M17 11V6.99999C17 4.23857 14.7614 1.99999 12 1.99999C10.1634 1.96273 8.52889 3.0403 7.67623 4.48831M17 11C17 11.7913 16.7873 12.6616 16.4387 13.2939M17 11L14.1878 10.9996M7 6.99999V11C7 13.7614 9.23858 16 12 16C13.1462 16 14.2023 15.6143 15.0457 14.9656M14.0033 7.00435H17',
  d17: 'M21.3358 23L1.25 2.91424L2.66421 1.50003L22.75 21.5858L21.3358 23Z',
  d18: 'M10.9998 19.695C6.4998 19.1976 2.99976 15.3825 2.99976 10.75H4.99976C4.99976 14.616 8.13376 17.75 11.9998 17.75C13.5505 17.75 14.9834 17.2457 16.1435 16.3923L17.5704 17.8192C16.2844 18.8341 14.7147 19.5055 12.9998 19.695V21H14.9998V23H8.99976V21H10.9998V19.695Z',
  d19: 'M18.9998 10.75H20.9998C20.9998 12.7154 20.3697 14.5337 19.3007 16.0139L17.8627 14.5759C18.5817 13.4762 18.9998 12.1619 18.9998 10.75Z',
  d20: 'M6.24976 6.74997V10.75C6.24976 13.9256 8.82412 16.5 11.9998 16.5C13.2047 16.5 14.3231 16.1293 15.2471 15.4959L6.25493 6.5037C6.25149 6.58536 6.24976 6.66746 6.24976 6.74997Z',
  d21: 'M17.7498 9.99997H13.9998V10.75L7.072 3.78523C8.07834 2.11616 9.9087 0.999969 11.9998 0.999969C14.9212 0.999969 17.3338 3.1787 17.7013 5.99997H13.9998V7.49997H17.7498V9.99997Z',
  d22: 'M16.9551 13.6684C17.3396 13.017 17.5993 12.2833 17.7013 11.5H14.7867L16.9551 13.6684Z',
};

export const IconMicOff01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-01-stroke-rounded IconMicOff01StrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMicOff01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-01-duotone-rounded IconMicOff01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
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
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMicOff01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-01-twotone-rounded IconMicOff01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d1} 
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
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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

export const IconMicOff01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-01-solid-rounded IconMicOff01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconMicOff01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-01-bulk-rounded IconMicOff01BulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMicOff01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-01-stroke-sharp IconMicOff01StrokeSharp"
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
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMicOff01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-01-solid-sharp IconMicOff01SolidSharp"
    >
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMicOff01: TheIconSelfPack = {
  name: 'MicOff01',
  StrokeRounded: IconMicOff01StrokeRounded,
  DuotoneRounded: IconMicOff01DuotoneRounded,
  TwotoneRounded: IconMicOff01TwotoneRounded,
  SolidRounded: IconMicOff01SolidRounded,
  BulkRounded: IconMicOff01BulkRounded,
  StrokeSharp: IconMicOff01StrokeSharp,
  SolidSharp: IconMicOff01SolidSharp,
};