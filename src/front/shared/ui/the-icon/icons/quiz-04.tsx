import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.5 14V10.5C20.5 8.16537 20.5 6.99805 20.0277 6.11441C19.6548 5.4167 19.0833 4.84525 18.3856 4.47231C17.5019 4 16.3346 4 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C7.66537 4 6.49805 4 5.61441 4.47231C4.9167 4.84525 4.34525 5.4167 3.97231 6.11441C3.5 6.99805 3.5 8.16537 3.5 10.5V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5C16.2712 22 18.1569 22 19.3284 20.8284C20.5 19.6569 20.5 17.7712 20.5 14Z',
  d2: 'M6.5 10L10.5 10',
  d3: 'M13.5 11C13.5 11 14 11 14.5 12C14.5 12 16.0882 9.5 17.5 9',
  d4: 'M6.5 16L10.5 16',
  d5: 'M13.5 17C13.5 17 14 17 14.5 18C14.5 18 16.0882 15.5 17.5 15',
  d6: 'M9.3534 3.2504C9.67974 2.09594 10.7411 1.25 12 1.25C13.2589 1.25 14.3203 2.09594 14.6466 3.2504C15.5027 3.25214 16.2098 3.2615 16.8005 3.31174C17.5431 3.3749 18.1701 3.50674 18.7391 3.81087C19.5677 4.25373 20.2463 4.93233 20.6891 5.76087C20.9933 6.32985 21.1251 6.95693 21.1883 7.69952C21.25 8.42547 21.25 9.32737 21.25 10.4655V10.4655V14.0564V14.0565C21.25 15.8942 21.25 17.3498 21.0969 18.489C20.9392 19.6614 20.6071 20.6104 19.8588 21.3588C19.1104 22.1071 18.1614 22.4392 16.989 22.5969C15.8498 22.75 14.3942 22.75 12.5565 22.75H12.5564H11.4436H11.4435C9.6058 22.75 8.15018 22.75 7.01098 22.5969C5.83856 22.4392 4.88961 22.1071 4.14124 21.3588C3.39288 20.6104 3.06076 19.6614 2.90314 18.489C2.74997 17.3498 2.74998 15.8942 2.75 14.0564V14.0564V10.4656V10.4656C2.74999 9.32742 2.74999 8.42549 2.81174 7.69952C2.8749 6.95693 3.00675 6.32985 3.31087 5.76087C3.75373 4.93233 4.43234 4.25373 5.26087 3.81087C5.82985 3.50674 6.45693 3.3749 7.19952 3.31174C7.79018 3.2615 8.49733 3.25214 9.3534 3.2504ZM18.207 14.7498C18.3453 15.1403 18.1408 15.5689 17.7504 15.7072C17.5266 15.7864 17.2463 15.9666 16.9302 16.2438C16.6219 16.5142 16.3184 16.8422 16.0465 17.1681C15.776 17.4924 15.5458 17.8036 15.3829 18.0343C15.3018 18.1492 15.1761 18.3377 15.1332 18.4021C14.9882 18.6302 14.7315 18.763 14.4616 18.7492C14.1917 18.7354 13.9501 18.5774 13.8292 18.3356C13.6237 17.9246 13.4522 17.7864 13.3965 17.7492L13.3885 17.7441L13.3839 17.7413C13.0248 17.6855 12.75 17.3749 12.75 17.0002C12.75 16.586 13.0858 16.2502 13.5 16.2502C13.859 16.2502 14.0392 16.3727 14.1894 16.4748L14.2285 16.5012C14.3162 16.5596 14.4046 16.6294 14.4928 16.7119C14.6135 16.5534 14.7485 16.3825 14.8947 16.2073C15.1963 15.8457 15.5546 15.455 15.9411 15.116C16.3199 14.7838 16.7675 14.464 17.2496 14.2932C17.6401 14.155 18.0687 14.3594 18.207 14.7498ZM6.5 9.25C6.08579 9.25 5.75 9.58579 5.75 10C5.75 10.4142 6.08579 10.75 6.5 10.75H10.5C10.9142 10.75 11.25 10.4142 11.25 10C11.25 9.58579 10.9142 9.25 10.5 9.25H6.5ZM18.207 8.74982C18.3453 9.14027 18.1408 9.56889 17.7504 9.70717C17.5266 9.78642 17.2463 9.96657 16.9302 10.2438C16.6219 10.5142 16.3184 10.8422 16.0465 11.1681C15.776 11.4924 15.5458 11.8036 15.3829 12.0343C15.3018 12.1492 15.1761 12.3377 15.1332 12.4021C14.9882 12.6302 14.7315 12.763 14.4616 12.7492C14.1917 12.7354 13.9501 12.5774 13.8292 12.3356C13.6237 11.9246 13.4522 11.7864 13.3965 11.7492C13.3917 11.746 13.3875 11.7434 13.3839 11.7413C13.0248 11.6855 12.75 11.3749 12.75 11.0002C12.75 10.586 13.0858 10.2502 13.5 10.2502C13.859 10.2502 14.0392 10.3727 14.1894 10.4748L14.2285 10.5012C14.3162 10.5596 14.4046 10.6294 14.4928 10.7119C14.6135 10.5534 14.7485 10.3825 14.8947 10.2073C15.1963 9.84574 15.5546 9.455 15.9411 9.11601C16.3199 8.78384 16.7675 8.46399 17.2496 8.29323C17.6401 8.15495 18.0687 8.35937 18.207 8.74982ZM6.5 15.25C6.08579 15.25 5.75 15.5858 5.75 16C5.75 16.4142 6.08579 16.75 6.5 16.75H10.5C10.9142 16.75 11.25 16.4142 11.25 16C11.25 15.5858 10.9142 15.25 10.5 15.25H6.5Z',
  d7: 'M9.3534 3.2504C9.67974 2.09594 10.7411 1.25 12 1.25C13.2589 1.25 14.3203 2.09594 14.6466 3.2504C15.5027 3.25214 16.2098 3.2615 16.8005 3.31174C17.5431 3.3749 18.1701 3.50674 18.7391 3.81087C19.5677 4.25373 20.2463 4.93233 20.6891 5.76087C20.9933 6.32985 21.1251 6.95693 21.1883 7.69952C21.25 8.42547 21.25 9.32737 21.25 10.4655V10.4655V14.0564V14.0565C21.25 15.8942 21.25 17.3498 21.0969 18.489C20.9392 19.6614 20.6071 20.6104 19.8588 21.3588C19.1104 22.1071 18.1614 22.4392 16.989 22.5969C15.8498 22.75 14.3942 22.75 12.5565 22.75H12.5564H11.4436H11.4435C9.6058 22.75 8.15018 22.75 7.01098 22.5969C5.83856 22.4392 4.88961 22.1071 4.14124 21.3588C3.39288 20.6104 3.06076 19.6614 2.90314 18.489C2.74997 17.3498 2.74998 15.8942 2.75 14.0564V14.0564V10.4656V10.4656C2.74999 9.32742 2.74999 8.42549 2.81174 7.69952C2.8749 6.95693 3.00674 6.32985 3.31087 5.76087C3.75373 4.93233 4.43234 4.25373 5.26087 3.81087C5.82985 3.50674 6.45693 3.3749 7.19952 3.31174C7.79018 3.2615 8.49732 3.25214 9.3534 3.2504Z',
  d8: 'M18.207 14.7498C18.3453 15.1403 18.1408 15.5689 17.7504 15.7072C17.5266 15.7864 17.2463 15.9666 16.9302 16.2438C16.6219 16.5142 16.3184 16.8422 16.0465 17.1681C15.776 17.4924 15.5458 17.8036 15.3829 18.0343C15.3018 18.1492 15.1761 18.3377 15.1332 18.4021C14.9882 18.6302 14.7315 18.763 14.4616 18.7492C14.1917 18.7354 13.9501 18.5774 13.8292 18.3356C13.6237 17.9246 13.4522 17.7864 13.3965 17.7492C13.3917 17.746 13.3875 17.7434 13.3839 17.7413C13.0248 17.6855 12.75 17.3749 12.75 17.0002C12.75 16.586 13.0858 16.2502 13.5 16.2502C13.8906 16.2502 14.0696 16.3952 14.2285 16.5012C14.3162 16.5596 14.4046 16.6294 14.4928 16.7119C14.6135 16.5534 14.7485 16.3825 14.8947 16.2073C15.1963 15.8457 15.5546 15.455 15.9411 15.116C16.3199 14.7838 16.7675 14.464 17.2496 14.2932C17.6401 14.1549 18.0687 14.3594 18.207 14.7498Z',
  d9: 'M5.75 10C5.75 9.58579 6.08579 9.25 6.5 9.25L10.5 9.25C10.9142 9.25 11.25 9.58579 11.25 10C11.25 10.4142 10.9142 10.75 10.5 10.75L6.5 10.75C6.08579 10.75 5.75 10.4142 5.75 10Z',
  d10: 'M18.207 8.74982C18.3453 9.14027 18.1408 9.56889 17.7504 9.70717C17.5266 9.78642 17.2463 9.96657 16.9302 10.2438C16.6219 10.5142 16.3184 10.8422 16.0465 11.1681C15.776 11.4924 15.5458 11.8036 15.3829 12.0343C15.3018 12.1492 15.1761 12.3377 15.1332 12.4021C14.9882 12.6302 14.7315 12.763 14.4616 12.7492C14.1917 12.7354 13.9501 12.5774 13.8292 12.3356C13.6237 11.9246 13.4522 11.7864 13.3965 11.7492C13.3917 11.746 13.3875 11.7434 13.3839 11.7413C13.0248 11.6855 12.75 11.3749 12.75 11.0002C12.75 10.586 13.0858 10.2502 13.5 10.2502C13.8906 10.2502 14.0696 10.3952 14.2285 10.5012C14.3162 10.5596 14.4046 10.6294 14.4928 10.7119C14.6135 10.5534 14.7485 10.3825 14.8947 10.2073C15.1963 9.84574 15.5546 9.455 15.9411 9.11601C16.3199 8.78384 16.7675 8.46399 17.2496 8.29323C17.6401 8.15495 18.0687 8.35937 18.207 8.74982Z',
  d11: 'M5.75 16C5.75 15.5858 6.08579 15.25 6.5 15.25L10.5 15.25C10.9142 15.25 11.25 15.5858 11.25 16C11.25 16.4142 10.9142 16.75 10.5 16.75H6.5C6.08579 16.75 5.75 16.4142 5.75 16Z',
  d12: 'M20 4H14C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4H4V22H20V4Z',
  d13: 'M13.5 11L14.5 12L17.5 9',
  d14: 'M13.5 17L14.5 18L17.5 15',
  d15: 'M9.35352 3.25C9.67998 2.09575 10.7412 1.25 12 1.25C13.2588 1.25 14.32 2.09575 14.6465 3.25H20.75V22.75H3.25V3.25H9.35352ZM5.75 9.25H11.25V10.75H5.75V9.25ZM14.5001 13.0608L18.5608 9.00011L17.5001 7.93945L14.5001 10.9395L13.5001 9.93945L12.4395 11.0001L14.5001 13.0608ZM5.75 15.25H11.25V16.75H5.75V15.25ZM14.5001 19.0608L18.5608 15.0001L17.5001 13.9395L14.5001 16.9395L13.5001 15.9395L12.4395 17.0001L14.5001 19.0608Z',
};

export const IconQuiz04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-04-stroke-rounded IconQuiz04StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
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

export const IconQuiz04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-04-duotone-rounded IconQuiz04DuotoneRounded"
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
        strokeLinecap="square" 
        strokeLinejoin="round" 
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

export const IconQuiz04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-04-twotone-rounded IconQuiz04TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
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

export const IconQuiz04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-04-solid-rounded IconQuiz04SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconQuiz04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-04-bulk-rounded IconQuiz04BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconQuiz04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-04-stroke-sharp IconQuiz04StrokeSharp"
    >
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconQuiz04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-04-solid-sharp IconQuiz04SolidSharp"
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

export const iconPackOfQuiz04: TheIconSelfPack = {
  name: 'Quiz04',
  StrokeRounded: IconQuiz04StrokeRounded,
  DuotoneRounded: IconQuiz04DuotoneRounded,
  TwotoneRounded: IconQuiz04TwotoneRounded,
  SolidRounded: IconQuiz04SolidRounded,
  BulkRounded: IconQuiz04BulkRounded,
  StrokeSharp: IconQuiz04StrokeSharp,
  SolidSharp: IconQuiz04SolidSharp,
};