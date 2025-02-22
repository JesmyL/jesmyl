import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10 3H14C17.7712 3 19.6569 3 20.8284 4.17157C22 5.34315 22 7.22876 22 11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19H10C6.22876 19 4.34315 19 3.17157 17.8284C2 16.6569 2 14.7712 2 11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3Z',
  d2: 'M5.5 7L8.5 7',
  d3: 'M5.5 10L8.5 10',
  d4: 'M15.5 7L18.5 7',
  d5: 'M15.5 10L18.5 10',
  d6: 'M20 19V21M4 19V21',
  d7: 'M12 3L12 19',
  d8: 'M17.992 14L18.001 14',
  d9: 'M8.5 14L8.50898 14',
  d10: 'M20.8284 17.8284C19.6569 19 17.7712 19 14 19H12V3H14C17.7712 3 19.6569 3 20.8284 4.17157C22 5.34315 22 7.22876 22 11C22 14.7712 22 16.6569 20.8284 17.8284Z',
  d11: 'M3.17157 17.8284C2 16.6569 2 14.7712 2 11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H12V19H10C6.22876 19 4.34315 19 3.17157 17.8284Z',
  d12: 'M17.9922 14L18.0012 14',
  d13: 'M4 17.75C4.55229 17.75 5 18.1977 5 18.75V20.75C5 21.3023 4.55229 21.75 4 21.75C3.44772 21.75 3 21.3023 3 20.75V18.75C3 18.1977 3.44772 17.75 4 17.75ZM20 17.75C20.5523 17.75 21 18.1977 21 18.75V20.75C21 21.3023 20.5523 21.75 20 21.75C19.4477 21.75 19 21.3023 19 20.75V18.75C19 18.1977 19.4477 17.75 20 17.75Z',
  d14: 'M11.25 2.85C11.25 2.56716 11.25 2.42574 11.1621 2.33787C11.0743 2.25 10.9328 2.25 10.65 2.25L9.94358 2.25H9.94357C8.10583 2.24999 6.65019 2.24997 5.51098 2.40314C4.33856 2.56076 3.38961 2.89288 2.64124 3.64124C1.89288 4.38961 1.56076 5.33856 1.40314 6.51098C1.24997 7.65019 1.24999 9.10581 1.25 10.9436V10.9436V11.0564V11.0564C1.24999 12.8942 1.24997 14.3498 1.40314 15.489C1.56076 16.6614 1.89288 17.6104 2.64125 18.3588C3.38961 19.1071 4.33856 19.4392 5.51098 19.5969C6.65019 19.75 8.10581 19.75 9.94354 19.75H10.65C10.9328 19.75 11.0743 19.75 11.1621 19.6621C11.25 19.5743 11.25 19.4328 11.25 19.15L11.25 2.85ZM12.75 19.15C12.75 19.4328 12.75 19.5743 12.8379 19.6621C12.9257 19.75 13.0672 19.75 13.35 19.75H14.0564C15.8942 19.75 17.3498 19.75 18.489 19.5969C19.6614 19.4392 20.6104 19.1071 21.3588 18.3588C22.1071 17.6104 22.4392 16.6614 22.5969 15.489C22.75 14.3498 22.75 12.8942 22.75 11.0565V10.9436C22.75 9.10585 22.75 7.65019 22.5969 6.51098C22.4392 5.33856 22.1071 4.38961 21.3588 3.64124C20.6104 2.89288 19.6614 2.56076 18.489 2.40314C17.3498 2.24997 15.8942 2.24999 14.0564 2.25H14.0564L13.35 2.25C13.0672 2.25 12.9257 2.25 12.8379 2.33787C12.75 2.42574 12.75 2.56716 12.75 2.85L12.75 19.15ZM4.75 7C4.75 7.41421 5.08579 7.75 5.5 7.75H8.5C8.91421 7.75 9.25 7.41421 9.25 7C9.25 6.58579 8.91421 6.25 8.5 6.25H5.5C5.08579 6.25 4.75 6.58579 4.75 7ZM5.5 10.75C5.08579 10.75 4.75 10.4142 4.75 10C4.75 9.58579 5.08579 9.25 5.5 9.25H8.5C8.91421 9.25 9.25 9.58579 9.25 10C9.25 10.4142 8.91421 10.75 8.5 10.75H5.5ZM7.24219 14C7.24219 14.5523 7.6899 15 8.24219 15H8.25117C8.80345 15 9.25117 14.5523 9.25117 14C9.25117 13.4477 8.80345 13 8.25117 13H8.24219C7.6899 13 7.24219 13.4477 7.24219 14ZM15.5 7.75C15.0858 7.75 14.75 7.41421 14.75 7C14.75 6.58579 15.0858 6.25 15.5 6.25H18.5C18.9142 6.25 19.25 6.58579 19.25 7C19.25 7.41421 18.9142 7.75 18.5 7.75H15.5ZM14.75 10C14.75 10.4142 15.0858 10.75 15.5 10.75H18.5C18.9142 10.75 19.25 10.4142 19.25 10C19.25 9.58579 18.9142 9.25 18.5 9.25H15.5C15.0858 9.25 14.75 9.58579 14.75 10ZM17.75 15C17.1977 15 16.75 14.5523 16.75 14C16.75 13.4477 17.1977 13 17.75 13H17.759C18.3113 13 18.759 13.4477 18.759 14C18.759 14.5523 18.3113 15 17.759 15H17.75Z',
  d15: 'M11.25 2.85C11.25 2.56716 11.25 2.42574 11.1621 2.33787C11.0743 2.25 10.9328 2.25 10.65 2.25H9.94358C8.10583 2.24999 6.65019 2.24997 5.51098 2.40314C4.33856 2.56076 3.38961 2.89288 2.64124 3.64124C1.89288 4.38961 1.56076 5.33856 1.40314 6.51098C1.24997 7.65019 1.24999 9.10581 1.25 10.9436V11.0564C1.24999 12.8942 1.24997 14.3498 1.40314 15.489C1.56076 16.6614 1.89288 17.6104 2.64125 18.3588C3.38961 19.1071 4.33856 19.4392 5.51098 19.5969C6.65018 19.75 8.10581 19.75 9.94354 19.75H10.65C10.9328 19.75 11.0743 19.75 11.1621 19.6621C11.25 19.5743 11.25 19.4328 11.25 19.15L11.25 2.85Z',
  d16: 'M12.75 19.15C12.75 19.4328 12.75 19.5743 12.8379 19.6621C12.9257 19.75 13.0672 19.75 13.35 19.75H14.0564C15.8942 19.75 17.3498 19.75 18.489 19.5969C19.6614 19.4392 20.6104 19.1071 21.3588 18.3588C22.1071 17.6104 22.4392 16.6614 22.5969 15.489C22.75 14.3498 22.75 12.8942 22.75 11.0565V10.9436C22.75 9.10585 22.75 7.65018 22.5969 6.51098C22.4392 5.33856 22.1071 4.38961 21.3588 3.64124C20.6104 2.89288 19.6614 2.56076 18.489 2.40314C17.3498 2.24997 15.8942 2.24999 14.0564 2.25H13.35C13.0672 2.25 12.9257 2.25 12.8379 2.33787C12.75 2.42574 12.75 2.56716 12.75 2.85L12.75 19.15Z',
  d17: 'M3.00264 18.6768C3.56699 19.1121 4.2302 19.3639 5 19.5136V20.75C5 21.3023 4.55228 21.75 4 21.75C3.44772 21.75 3 21.3023 3 20.75L3 18.75C3 18.7254 3.00089 18.7009 3.00264 18.6768ZM19 19.5136C19.7698 19.3639 20.433 19.1121 20.9974 18.6768C20.9991 18.7009 21 18.7254 21 18.75V20.75C21 21.3023 20.5523 21.75 20 21.75C19.4477 21.75 19 21.3023 19 20.75V19.5136Z',
  d18: 'M4.75 7C4.75 7.41421 5.08579 7.75 5.5 7.75L8.5 7.75C8.91421 7.75 9.25 7.41421 9.25 7C9.25 6.58579 8.91421 6.25 8.5 6.25L5.5 6.25C5.08579 6.25 4.75 6.58579 4.75 7Z',
  d19: 'M4.75 10C4.75 10.4142 5.08579 10.75 5.5 10.75L8.5 10.75C8.91421 10.75 9.25 10.4142 9.25 10C9.25 9.58579 8.91421 9.25 8.5 9.25L5.5 9.25C5.08579 9.25 4.75 9.58579 4.75 10Z',
  d20: 'M7.24219 14C7.24219 14.5523 7.6899 15 8.24219 15L8.25117 15C8.80345 15 9.25117 14.5523 9.25117 14C9.25117 13.4477 8.80345 13 8.25117 13L8.24219 13C7.6899 13 7.24219 13.4477 7.24219 14Z',
  d21: 'M14.75 7C14.75 7.41421 15.0858 7.75 15.5 7.75L18.5 7.75C18.9142 7.75 19.25 7.41421 19.25 7C19.25 6.58579 18.9142 6.25 18.5 6.25L15.5 6.25C15.0858 6.25 14.75 6.58579 14.75 7Z',
  d22: 'M14.75 10C14.75 10.4142 15.0858 10.75 15.5 10.75L18.5 10.75C18.9142 10.75 19.25 10.4142 19.25 10C19.25 9.58579 18.9142 9.25 18.5 9.25L15.5 9.25C15.0858 9.25 14.75 9.58579 14.75 10Z',
  d23: 'M16.75 14C16.75 14.5523 17.1977 15 17.75 15L17.759 15C18.3113 15 18.759 14.5523 18.759 14C18.759 13.4477 18.3113 13 17.759 13L17.75 13C17.1977 13 16.75 13.4477 16.75 14Z',
  d24: 'M22 3H2V18H22V3Z',
  d25: 'M5 7L9 7',
  d26: 'M5 10L9 10',
  d27: 'M15 7H19',
  d28: 'M15 10H19',
  d29: 'M20 18V21M4 18V21',
  d30: 'M12 3L12 18',
  d31: 'M3 21.25V18.25H5V21.25H3ZM19 21.25V18.25H21V21.25H19Z',
  d32: 'M11.25 2.75V19.25H2C1.58579 19.25 1.25 18.9142 1.25 18.5V3.5C1.25 3.08579 1.58579 2.75 2 2.75H11.25ZM9 8.25H5V6.75H9V8.25ZM5 11.25H9V9.75H5V11.25ZM9.25898 15.25H7.75L7.75 13.75H9.25898V15.25Z',
  d33: 'M12.75 19.25H22C22.4142 19.25 22.75 18.9142 22.75 18.5V3.5C22.75 3.08579 22.4142 2.75 22 2.75H12.75V19.25ZM19 8.25H15V6.75H19V8.25ZM15 11.25H19V9.75H15V11.25ZM17.2422 15.25H18.7512V13.75H17.2422V15.25Z',
};

export const IconLocker01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="locker-01-stroke-rounded IconLocker01StrokeRounded"
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
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLocker01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="locker-01-duotone-rounded IconLocker01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
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
        d={d.d11} 
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
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLocker01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="locker-01-twotone-rounded IconLocker01TwotoneRounded"
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
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLocker01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="locker-01-solid-rounded IconLocker01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconLocker01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="locker-01-bulk-rounded IconLocker01BulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      </g>
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconLocker01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="locker-01-stroke-sharp IconLocker01StrokeSharp"
    >
      <path 
        d={d.d24} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d25} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d26} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d27} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d28} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d29} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d30} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLocker01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="locker-01-solid-sharp IconLocker01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d31} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d32} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d33} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLocker01: TheIconSelfPack = {
  name: 'Locker01',
  StrokeRounded: IconLocker01StrokeRounded,
  DuotoneRounded: IconLocker01DuotoneRounded,
  TwotoneRounded: IconLocker01TwotoneRounded,
  SolidRounded: IconLocker01SolidRounded,
  BulkRounded: IconLocker01BulkRounded,
  StrokeSharp: IconLocker01StrokeSharp,
  SolidSharp: IconLocker01SolidSharp,
};