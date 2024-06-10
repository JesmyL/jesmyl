import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4.5 10C4.5 6.22876 4.5 4.34315 5.67157 3.17157C6.84315 2 8.72876 2 12.5 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H12.5C8.72876 22 6.84315 22 5.67157 20.8284C4.5 19.6569 4.5 17.7712 4.5 14V10Z',
  d2: 'M4.5 6H2M4.5 12H2M4.5 18H2',
  d3: 'M15.2748 8.49261C15.2748 9.59715 14.3794 10.4926 13.2749 10.4926C12.1704 10.4926 11.275 9.59715 11.275 8.49261C11.275 7.38808 12.1704 6.49268 13.2749 6.49268C14.3794 6.49268 15.2748 7.38808 15.2748 8.49261Z',
  d4: 'M9.31982 15.7161C10.3782 14.0868 12.0589 13.4762 13.2749 13.4774C14.491 13.4787 16.1224 14.0868 17.1807 15.7161C17.2492 15.8215 17.268 15.9512 17.2063 16.0607C16.9588 16.4996 16.1903 17.3705 15.6352 17.4296C14.9975 17.4974 13.3291 17.5069 13.2762 17.5072C13.2232 17.5069 11.5034 17.4974 10.8653 17.4296C10.3103 17.3705 9.5418 16.4996 9.29429 16.0607C9.23254 15.9512 9.25139 15.8215 9.31982 15.7161Z',
  d5: 'M5.67157 3.17157C4.5 4.34315 4.5 6.22876 4.5 10V14C4.5 17.7712 4.5 19.6569 5.67157 20.8284C6.84315 22 8.72876 22 12.5 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14V10C22 6.22876 22 4.34315 20.8284 3.17157C19.6569 2 17.7712 2 14 2H12.5C8.72876 2 6.84315 2 5.67157 3.17157ZM13.25 10.5C14.3546 10.5 15.25 9.60457 15.25 8.5C15.25 7.39543 14.3546 6.5 13.25 6.5C12.1454 6.5 11.25 7.39543 11.25 8.5C11.25 9.60457 12.1454 10.5 13.25 10.5ZM10.6259 14.3792C10.7048 14.3289 10.7776 14.2826 10.84 14.2408C12.3145 13.2531 14.1855 13.2531 15.66 14.2408C15.7225 14.2827 15.7951 14.3289 15.8742 14.3793C16.5905 14.8352 17.8375 15.6291 16.9333 16.5983C16.4428 17.124 15.8964 17.5 15.2096 17.5H11.2904C10.6036 17.5 10.0572 17.124 9.56674 16.5983C8.66248 15.6291 9.90963 14.8352 10.6259 14.3792Z',
  d6: 'M15.2743 8.4931C15.2743 9.59763 14.3789 10.4931 13.2743 10.4931C12.1698 10.4931 11.2744 9.59763 11.2744 8.4931C11.2744 7.38856 12.1698 6.49316 13.2743 6.49316C14.3789 6.49316 15.2743 7.38856 15.2743 8.4931Z',
  d7: 'M9.31982 15.7162C10.3782 14.0869 12.0589 13.4763 13.2749 13.4775C14.491 13.4788 16.1224 14.0869 17.1808 15.7162C17.2492 15.8216 17.268 15.9513 17.2063 16.0608C16.9588 16.4997 16.1903 17.3706 15.6352 17.4297C14.9975 17.4975 13.3291 17.507 13.2762 17.5073C13.2232 17.507 11.5034 17.4975 10.8654 17.4297C10.3103 17.3706 9.5418 16.4997 9.29429 16.0608C9.23253 15.9513 9.25139 15.8216 9.31982 15.7162Z',
  d8: 'M1.25 6C1.25 5.44772 1.69772 5 2.25 5L4.75 5C5.30229 5 5.75 5.44772 5.75 6C5.75 6.55229 5.30228 7 4.75 7L2.25 7C1.69772 7 1.25 6.55228 1.25 6ZM1.25 12C1.25 11.4477 1.69772 11 2.25 11L4.75 11C5.30229 11 5.75 11.4477 5.75 12C5.75 12.5523 5.30228 13 4.75 13H2.25C1.69772 13 1.25 12.5523 1.25 12ZM1.25 18C1.25 17.4477 1.69772 17 2.25 17H4.75C5.30228 17 5.75 17.4477 5.75 18C5.75 18.5523 5.30228 19 4.75 19H2.25C1.69772 19 1.25 18.5523 1.25 18Z',
  d9: 'M14.0564 1.25H14.0564H14.0564H12.4436H12.4436H12.4436C10.6058 1.24998 9.15019 1.24997 8.01098 1.40314C6.83856 1.56076 5.88961 1.89288 5.14124 2.64124C4.39288 3.38961 4.06076 4.33856 3.90314 5.51098C3.74997 6.65019 3.74998 8.10581 3.75 9.94356V9.94357V9.94358V14.0564V14.0564V14.0564C3.74998 15.8942 3.74997 17.3498 3.90314 18.489C4.06076 19.6614 4.39288 20.6104 5.14124 21.3588C5.88961 22.1071 6.83856 22.4392 8.01098 22.5969C9.15018 22.75 10.6058 22.75 12.4435 22.75H12.4436H14.0564H14.0565C15.8942 22.75 17.3498 22.75 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.75 17.3498 22.75 15.8942 22.75 14.0565V14.0564V9.94359V9.94354C22.75 8.1058 22.75 6.65018 22.5969 5.51098C22.4392 4.33856 22.1071 3.38961 21.3588 2.64124C20.6104 1.89288 19.6614 1.56076 18.489 1.40314C17.3498 1.24997 15.8942 1.24998 14.0564 1.25ZM13.2501 5.75C11.7313 5.75 10.5001 6.98122 10.5001 8.5C10.5001 10.0188 11.7313 11.25 13.2501 11.25C14.7689 11.25 16.0001 10.0188 16.0001 8.5C16.0001 6.98122 14.7689 5.75 13.2501 5.75ZM17.4643 14.6697C17.0935 14.2614 16.3875 13.8137 16.0775 13.6177C14.3504 12.4608 12.1498 12.4608 10.4227 13.6177C10.1127 13.8137 9.40667 14.2614 9.03592 14.6697C8.80059 14.9288 8.55253 15.2967 8.50726 15.7626C8.45867 16.2627 8.65665 16.7221 9.01846 17.1099C9.56558 17.6963 10.2972 18.25 11.2905 18.25H15.2097C16.203 18.25 16.9346 17.6963 17.4817 17.1099C17.8435 16.7221 18.0415 16.2627 17.9929 15.7626C17.9477 15.2967 17.6996 14.9288 17.4643 14.6697Z',
  d10: 'M14.0564 1.25C15.8942 1.24998 17.3498 1.24997 18.489 1.40314C19.6614 1.56076 20.6104 1.89288 21.3588 2.64124C22.1071 3.38961 22.4392 4.33856 22.5969 5.51098C22.75 6.65018 22.75 8.1058 22.75 9.94354V9.94359V14.0564V14.0565C22.75 15.8942 22.75 17.3498 22.5969 18.489C22.4392 19.6614 22.1071 20.6104 21.3588 21.3588C20.6104 22.1071 19.6614 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0565 22.75H14.0564H12.4436H12.4435C10.6058 22.75 9.15018 22.75 8.01098 22.5969C6.83856 22.4392 5.88961 22.1071 5.14124 21.3588C4.39288 20.6104 4.06076 19.6614 3.90314 18.489C3.74997 17.3498 3.74998 15.8942 3.75 14.0564V14.0564V9.94358V9.94357C3.74998 8.10582 3.74997 6.65019 3.90314 5.51098C4.06076 4.33856 4.39288 3.38961 5.14124 2.64124C5.88961 1.89288 6.83856 1.56076 8.01098 1.40314C9.15019 1.24997 10.6058 1.24998 12.4436 1.25H12.4436H14.0564H14.0564Z',
  d11: 'M10.5001 8.5C10.5001 6.98122 11.7313 5.75 13.2501 5.75C14.7689 5.75 16.0001 6.98122 16.0001 8.5C16.0001 10.0188 14.7689 11.25 13.2501 11.25C11.7313 11.25 10.5001 10.0188 10.5001 8.5Z',
  d12: 'M10.4227 13.6177C12.1498 12.4608 14.3504 12.4608 16.0775 13.6177C16.3875 13.8137 17.0935 14.2614 17.4643 14.6697C17.6996 14.9288 17.9477 15.2967 17.9929 15.7626C18.0415 16.2627 17.8435 16.7221 17.4817 17.1099C16.9346 17.6963 16.203 18.25 15.2097 18.25H11.2905C10.2972 18.25 9.56558 17.6963 9.01846 17.1099C8.65665 16.7221 8.45867 16.2627 8.50726 15.7626C8.55253 15.2967 8.80059 14.9288 9.03592 14.6697C9.40667 14.2614 10.1127 13.8137 10.4227 13.6177Z',
  d13: 'M22 2H5V22H22V2Z',
  d14: 'M5 6H2M5 12H2M5 18H2',
  d15: 'M15.5 8.5C15.5 9.60457 14.6046 10.5 13.5 10.5C12.3954 10.5 11.5 9.60457 11.5 8.5C11.5 7.39543 12.3954 6.5 13.5 6.5C14.6046 6.5 15.5 7.39543 15.5 8.5Z',
  d16: 'M17.5 17.5H9.5C9.5 15.0454 11.2909 13.5 13.5 13.5C15.7091 13.5 17.5 15.0454 17.5 17.5Z',
  d17: 'M5 1.25C4.58579 1.25 4.25 1.58579 4.25 2V5H1.25V7H4.25V11H1.25V13H4.25V17H1.25V19H4.25V22C4.25 22.4142 4.58579 22.75 5 22.75H22C22.4142 22.75 22.75 22.4142 22.75 22V2C22.75 1.58579 22.4142 1.25 22 1.25H5ZM10.75 8.5C10.75 6.98122 11.9812 5.75 13.5 5.75C15.0188 5.75 16.25 6.98122 16.25 8.5C16.25 10.0188 15.0188 11.25 13.5 11.25C11.9812 11.25 10.75 10.0188 10.75 8.5ZM13.5 12.75C10.9076 12.75 8.75 14.6009 8.75 17.5C8.75 17.9142 9.08579 18.25 9.5 18.25H17.5C17.9142 18.25 18.25 17.9142 18.25 17.5C18.25 14.6009 16.0924 12.75 13.5 12.75Z',
};

export const IconContactBookStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-book-stroke-rounded IconContactBookStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconContactBookDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-book-duotone-rounded IconContactBookDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
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
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconContactBookTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-book-twotone-rounded IconContactBookTwotoneRounded"
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
        strokeLinejoin="round" 
      />
      <g 
        opacity="var(--icon-opacity)">
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
      </g>
    </TheIconWrapper>
  );
};

export const IconContactBookSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-book-solid-rounded IconContactBookSolidRounded"
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

export const IconContactBookBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-book-bulk-rounded IconContactBookBulkRounded"
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

export const IconContactBookStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-book-stroke-sharp IconContactBookStrokeSharp"
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

export const IconContactBookSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="contact-book-solid-sharp IconContactBookSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfContactBook: TheIconSelfPack = {
  name: 'ContactBook',
  StrokeRounded: IconContactBookStrokeRounded,
  DuotoneRounded: IconContactBookDuotoneRounded,
  TwotoneRounded: IconContactBookTwotoneRounded,
  SolidRounded: IconContactBookSolidRounded,
  BulkRounded: IconContactBookBulkRounded,
  StrokeSharp: IconContactBookStrokeSharp,
  SolidSharp: IconContactBookSolidSharp,
};