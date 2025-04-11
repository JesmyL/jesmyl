import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75334 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75334 2.5 12 2.5C15.8956 2.5 19.2436 4.84478 20.7095 8.2M21.5 5.5L21.025 8.675L18 8',
  d2: 'M10 11V9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5V11M11.25 16.5H12.75C13.9228 16.5 14.5092 16.5 14.9131 16.19C15.0171 16.1102 15.1102 16.0171 15.19 15.9131C15.5 15.5092 15.5 14.9228 15.5 13.75C15.5 12.5772 15.5 11.9908 15.19 11.5869C15.1102 11.4829 15.0171 11.3898 14.9131 11.31C14.5092 11 13.9228 11 12.75 11H11.25C10.0772 11 9.49082 11 9.08686 11.31C8.98286 11.3898 8.88977 11.4829 8.80997 11.5869C8.5 11.9908 8.5 12.5772 8.5 13.75C8.5 14.9228 8.5 15.5092 8.80997 15.9131C8.88977 16.0171 8.98286 16.1102 9.08686 16.19C9.49082 16.5 10.0772 16.5 11.25 16.5Z',
  d3: 'M12.75 16.5H11.25C10.0772 16.5 9.49082 16.5 9.08686 16.19C8.98286 16.1102 8.88977 16.0171 8.80997 15.9131C8.5 15.5092 8.5 14.9228 8.5 13.75C8.5 12.5772 8.5 11.9908 8.80997 11.5869C8.88977 11.4829 8.98286 11.3898 9.08686 11.31C9.49082 11 10.0772 11 11.25 11H12.75C13.9228 11 14.5092 11 14.9131 11.31C15.0171 11.3898 15.1102 11.4829 15.19 11.5869C15.5 11.9908 15.5 12.5772 15.5 13.75C15.5 14.9228 15.5 15.5092 15.19 15.9131C15.1102 16.0171 15.0171 16.1102 14.9131 16.19C14.5092 16.5 13.9228 16.5 12.75 16.5Z',
  d4: 'M1.75 12C1.75 6.33908 6.3391 1.75 11.9999 1.75C15.3829 1.75 18.3817 3.3888 20.2479 5.91374L20.3082 5.51032C20.388 4.97712 20.8849 4.60955 21.4181 4.68932C21.9513 4.76909 22.3189 5.266 22.2391 5.7992L21.7754 8.8986C21.7353 9.16656 21.5857 9.4058 21.3623 9.55909C21.1389 9.71238 20.8618 9.76593 20.5974 9.70693L17.6444 9.048C17.1182 8.93058 16.7869 8.40883 16.9043 7.88264C17.0217 7.35644 17.5434 7.02506 18.0696 7.14248L18.8508 7.31678C17.3552 5.13329 14.8439 3.70238 11.9999 3.70238C7.41736 3.70238 3.70237 7.41735 3.70237 12C3.70237 16.5826 7.41736 20.2976 11.9999 20.2976C16.5826 20.2976 20.2975 16.5826 20.2975 12C20.2975 11.4609 20.7346 11.0238 21.2737 11.0238C21.8128 11.0238 22.2499 11.4609 22.2499 12C22.2499 17.6609 17.6608 22.25 11.9999 22.25C6.3391 22.25 1.75 17.6609 1.75 12Z',
  d5: 'M12.7907 10.25C13.3423 10.25 13.8179 10.25 14.2039 10.2935C14.6145 10.3398 15.0154 10.4431 15.3697 10.715C15.5257 10.8347 15.6653 10.9743 15.785 11.1303C16.0569 11.4846 16.1602 11.8855 16.2065 12.2961C16.2501 12.6821 16.25 13.239 16.25 13.7907C16.25 14.3423 16.2501 14.8179 16.2065 15.2039C16.1602 15.6145 16.0569 16.0154 15.785 16.3697C15.6653 16.5257 15.5257 16.6653 15.3697 16.785C15.0154 17.0569 14.6145 17.1602 14.2039 17.2065C13.8179 17.2501 13.3423 17.25 12.7907 17.25H11.2093C10.6577 17.25 10.1821 17.2501 9.7961 17.2065C9.38552 17.1602 8.98459 17.0569 8.63029 16.785C8.47429 16.6653 8.33466 16.5257 8.21496 16.3697C7.94309 16.0154 7.83976 15.6145 7.79347 15.2039C7.74995 14.8179 7.74998 14.3423 7.75 13.7907V13.7907C7.74998 13.239 7.74995 12.6821 7.79347 12.2961C7.83976 11.8855 7.94309 11.4846 8.21496 11.1303C8.33466 10.9743 8.47429 10.8347 8.63029 10.715C8.98459 10.4431 9.38552 10.3398 9.7961 10.2935C10.1821 10.25 10.6577 10.25 11.2093 10.25H11.2093H12.7907H12.7907Z',
  d6: 'M12 8.25C11.3096 8.25 10.75 8.80964 10.75 9.5V11H9.25V9.5C9.25 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5V11H13.25V9.5C13.25 8.80964 12.6904 8.25 12 8.25Z',
  d7: 'M15.5 11H8.5V16.5H15.5V11Z',
  d8: 'M14 11V9.5C14 8.39543 13.1046 7.5 12 7.5C10.8954 7.5 10 8.39543 10 9.5V11',
  d9: 'M1.75 12.0001C1.75 6.33914 6.30939 1.75006 11.9336 1.75006C15.2947 1.75006 18.274 3.38886 20.1282 5.9138L20.3316 4.54494L22.25 4.83381L21.4917 9.93525L19.8841 9.57419L19.8802 9.57591L19.879 9.57303L16.595 8.83546L17.0174 6.92994L18.7401 7.31684C17.2542 5.13335 14.7592 3.70244 11.9336 3.70244C7.38067 3.70244 3.68973 7.41741 3.68973 12.0001C3.68973 16.5827 7.38067 20.2977 11.9336 20.2977C16.4865 20.2977 20.1774 16.5827 20.1774 12.0001H22.1172C22.1172 17.6609 17.5578 22.2501 11.9336 22.2501C6.30939 22.2501 1.75 17.6609 1.75 12.0001Z',
  d10: 'M7.75 10.25H16.25V17.25H7.75V10.25Z',
  d11: 'M9.25 9.5C9.25 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5V11.75H13.25V9.5C13.25 8.80964 12.6904 8.25 12 8.25C11.3096 8.25 10.75 8.80964 10.75 9.5V11.75H9.25V9.5Z',
};

export const IconResetPasswordStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ResetPassword StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconResetPasswordDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ResetPassword DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconResetPasswordTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ResetPassword TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconResetPasswordSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ResetPassword SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconResetPasswordBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ResetPassword BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o4"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconResetPasswordStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ResetPassword StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s ss sw"
      />
      <path 
        d={d.d7}
        i-c="s ss sw"
      />
      <path 
        d={d.d8}
        i-c="s ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconResetPasswordSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ResetPassword SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="f"
      />
      <path 
        d={d.d10}
        i-c="f"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfResetPassword: TheIconSelfPack = [
  'ResetPassword',
  IconResetPasswordStrokeRounded,
  IconResetPasswordDuotoneRounded,
  IconResetPasswordTwotoneRounded,
  IconResetPasswordSolidRounded,
  IconResetPasswordBulkRounded,
  IconResetPasswordStrokeSharp,
  IconResetPasswordSolidSharp,
];