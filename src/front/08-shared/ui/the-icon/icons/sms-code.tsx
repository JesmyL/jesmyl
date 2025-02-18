import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18.6436 4C18.4955 3.61742 18.2933 3.29898 18.0175 3.02513C16.9851 2 15.3234 2 12 2C8.67661 2 7.01491 2 5.98247 3.02513C5.70666 3.29898 5.50453 3.61742 5.3564 4M5 18C5.08715 19.4194 5.32629 20.3233 5.98247 20.9749C7.01491 22 8.67661 22 12 22C15.3234 22 16.9851 22 18.0175 20.9749C18.6737 20.3233 18.9128 19.4194 19 18',
  d2: 'M6 10L8 12M8 10L6 12',
  d3: 'M11 10L13 12M13 10L11 12',
  d4: 'M16 10L18 12M18 10L16 12',
  d5: 'M17 7H7C5.11438 7 4.17157 7 3.58579 7.58579C3 8.17157 3 9.11438 3 11C3 12.8856 3 13.8284 3.58579 14.4142C4.17157 15 5.11438 15 7 15H17C18.8856 15 19.8284 15 20.4142 14.4142C21 13.8284 21 12.8856 21 11C21 9.11438 21 8.17157 20.4142 7.58579C19.8284 7 18.8856 7 17 7Z',
  d6: 'M12 19V19.01',
  d7: 'M11 2H13C15.8284 2 17.2426 2 18.1213 2.87868C18.8956 3.653 18.9876 4.8432 18.9985 7.0506C18.4829 7 17.8335 7 17 7H7C6.16646 7 5.51715 7 5.00147 7.0506C5.01239 4.8432 5.10436 3.653 5.87868 2.87868C6.75736 2 8.17157 2 11 2Z',
  d8: 'M5 14.9493V16C5 18.8284 5 20.2426 5.87868 21.1213C6.75736 22 8.17157 22 11 22H13C15.8284 22 17.2426 22 18.1213 21.1213C19 20.2426 19 18.8284 19 16V14.9493C18.4841 15 17.8343 15 17 15H7C6.16566 15 5.51591 15 5 14.9493Z',
  d9: 'M17.0521 6.25H17.052H17.052L6.948 6.25H6.94797H6.94794C6.04949 6.24997 5.30029 6.24995 4.70552 6.32992C4.07773 6.41432 3.51093 6.59999 3.05546 7.05546C2.59999 7.51093 2.41432 8.07773 2.32992 8.70552C2.24995 9.30029 2.24997 10.0495 2.25 10.9479V10.948V10.948V11.052V11.052V11.0521C2.24997 11.9505 2.24995 12.6997 2.32992 13.2945C2.41432 13.9223 2.59999 14.4891 3.05546 14.9445C3.51093 15.4 4.07773 15.5857 4.70552 15.6701C5.3003 15.7501 6.04951 15.75 6.94798 15.75H6.94801L17.052 15.75H17.052C17.9505 15.75 18.6997 15.7501 19.2945 15.6701C19.9223 15.5857 20.4891 15.4 20.9445 14.9445C21.4 14.4891 21.5857 13.9223 21.6701 13.2945C21.7501 12.6997 21.75 11.9505 21.75 11.052V10.948C21.75 10.0495 21.7501 9.30031 21.6701 8.70552C21.5857 8.07773 21.4 7.51093 20.9445 7.05546C20.4891 6.59999 19.9223 6.41432 19.2945 6.32992C18.6997 6.24995 17.9505 6.24997 17.0521 6.25ZM6.53033 9.46967C6.23744 9.17678 5.76257 9.17678 5.46967 9.46967C5.17678 9.76257 5.17678 10.2374 5.46967 10.5303L5.93934 11L5.46967 11.4697C5.17678 11.7626 5.17678 12.2374 5.46967 12.5303C5.76257 12.8232 6.23744 12.8232 6.53033 12.5303L7 12.0607L7.46967 12.5303C7.76256 12.8232 8.23744 12.8232 8.53033 12.5303C8.82323 12.2374 8.82323 11.7626 8.53033 11.4697L8.06066 11L8.53033 10.5303C8.82323 10.2374 8.82323 9.76257 8.53033 9.46967C8.23744 9.17678 7.76256 9.17678 7.46967 9.46967L7 9.93934L6.53033 9.46967ZM10.4697 9.46967C10.7626 9.17678 11.2374 9.17678 11.5303 9.46967L12 9.93934L12.4697 9.46967C12.7626 9.17678 13.2374 9.17678 13.5303 9.46967C13.8232 9.76257 13.8232 10.2374 13.5303 10.5303L13.0607 11L13.5303 11.4697C13.8232 11.7626 13.8232 12.2374 13.5303 12.5303C13.2374 12.8232 12.7626 12.8232 12.4697 12.5303L12 12.0607L11.5303 12.5303C11.2374 12.8232 10.7626 12.8232 10.4697 12.5303C10.1768 12.2374 10.1768 11.7626 10.4697 11.4697L10.9393 11L10.4697 10.5303C10.1768 10.2374 10.1768 9.76257 10.4697 9.46967ZM16.5303 9.46967C16.2374 9.17678 15.7626 9.17678 15.4697 9.46967C15.1768 9.76257 15.1768 10.2374 15.4697 10.5303L15.9393 11L15.4697 11.4697C15.1768 11.7626 15.1768 12.2374 15.4697 12.5303C15.7626 12.8232 16.2374 12.8232 16.5303 12.5303L17 12.0607L17.4697 12.5303C17.7626 12.8232 18.2374 12.8232 18.5303 12.5303C18.8232 12.2374 18.8232 11.7626 18.5303 11.4697L18.0607 11L18.5303 10.5303C18.8232 10.2374 18.8232 9.76257 18.5303 9.46967C18.2374 9.17678 17.7626 9.17678 17.4697 9.46967L17 9.93934L16.5303 9.46967Z',
  d10: 'M10.9454 1.25L13.0552 1.25H13.0552C14.4228 1.24998 15.5251 1.24997 16.3921 1.36653C17.2922 1.48754 18.0501 1.74644 18.652 2.34835C19.2539 2.95027 19.5128 3.70814 19.6338 4.60825C19.6507 4.73387 19.6651 4.86442 19.6775 5.00001L4.32317 5.00001C4.33552 4.86442 4.34996 4.73387 4.36685 4.60825C4.48786 3.70814 4.74676 2.95027 5.34867 2.34835C5.95059 1.74644 6.70847 1.48754 7.60857 1.36653C8.47553 1.24997 9.57786 1.24998 10.9454 1.25H10.9454ZM4.25195 17L19.7487 17C19.7436 17.9413 19.7222 18.7342 19.6338 19.3918C19.5128 20.2919 19.2539 21.0497 18.652 21.6517C18.0501 22.2536 17.2922 22.5125 16.3921 22.6335C15.5251 22.75 14.4228 22.75 13.0552 22.75L10.9455 22.75C9.57786 22.75 8.47554 22.75 7.60857 22.6335C6.70847 22.5125 5.95059 22.2536 5.34867 21.6517C4.74676 21.0497 4.48786 20.2919 4.36685 19.3918C4.27845 18.7342 4.2571 17.9413 4.25195 17ZM13 20C13 19.4477 12.5523 19 12 19C11.4477 19 11 19.4477 11 20V20.01C11 20.5623 11.4477 21.01 12 21.01C12.5523 21.01 13 20.5623 13 20.01V20Z',
  d11: 'M17.052 6.25C17.9505 6.24997 18.6997 6.24995 19.2945 6.32991C19.9223 6.41432 20.4891 6.59999 20.9445 7.05546C21.4 7.51093 21.5857 8.07773 21.6701 8.70552C21.7501 9.30031 21.75 10.0495 21.75 10.948V11.052C21.75 11.9505 21.7501 12.6997 21.6701 13.2945C21.5857 13.9223 21.4 14.4891 20.9445 14.9445C20.4891 15.4 19.9223 15.5857 19.2945 15.6701C18.6997 15.7501 17.9505 15.75 17.052 15.75H17.052H6.94801H6.94798C6.04951 15.75 5.3003 15.7501 4.70552 15.6701C4.07773 15.5857 3.51093 15.4 3.05546 14.9445C2.59999 14.4891 2.41432 13.9223 2.32991 13.2945C2.24995 12.6997 2.24997 11.9505 2.25 11.052V11.052V10.948V10.948C2.24997 10.0495 2.24995 9.3003 2.32991 8.70552C2.41432 8.07773 2.59999 7.51093 3.05546 7.05546C3.51093 6.59999 4.07773 6.41432 4.70552 6.32991C5.3003 6.24995 6.04951 6.24997 6.94797 6.25H6.948H17.052H17.052Z',
  d12: 'M5.46967 9.46967C5.76256 9.17678 6.23744 9.17678 6.53033 9.46967L7 9.93934L7.46967 9.46967C7.76256 9.17678 8.23744 9.17678 8.53033 9.46967C8.82322 9.76256 8.82322 10.2374 8.53033 10.5303L8.06066 11L8.53033 11.4697C8.82322 11.7626 8.82322 12.2374 8.53033 12.5303C8.23744 12.8232 7.76256 12.8232 7.46967 12.5303L7 12.0607L6.53033 12.5303C6.23744 12.8232 5.76256 12.8232 5.46967 12.5303C5.17678 12.2374 5.17678 11.7626 5.46967 11.4697L5.93934 11L5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967Z',
  d13: 'M10.4697 9.46967C10.7626 9.17678 11.2374 9.17678 11.5303 9.46967L12 9.93934L12.4697 9.46967C12.7626 9.17678 13.2374 9.17678 13.5303 9.46967C13.8232 9.76256 13.8232 10.2374 13.5303 10.5303L13.0607 11L13.5303 11.4697C13.8232 11.7626 13.8232 12.2374 13.5303 12.5303C13.2374 12.8232 12.7626 12.8232 12.4697 12.5303L12 12.0607L11.5303 12.5303C11.2374 12.8232 10.7626 12.8232 10.4697 12.5303C10.1768 12.2374 10.1768 11.7626 10.4697 11.4697L10.9393 11L10.4697 10.5303C10.1768 10.2374 10.1768 9.76256 10.4697 9.46967Z',
  d14: 'M15.4697 9.46967C15.7626 9.17678 16.2374 9.17678 16.5303 9.46967L17 9.93934L17.4697 9.46967C17.7626 9.17678 18.2374 9.17678 18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303L18.0607 11L18.5303 11.4697C18.8232 11.7626 18.8232 12.2374 18.5303 12.5303C18.2374 12.8232 17.7626 12.8232 17.4697 12.5303L17 12.0607L16.5303 12.5303C16.2374 12.8232 15.7626 12.8232 15.4697 12.5303C15.1768 12.2374 15.1768 11.7626 15.4697 11.4697L15.9393 11L15.4697 10.5303C15.1768 10.2374 15.1768 9.76256 15.4697 9.46967Z',
  d15: 'M21 7H3V15H21V7Z',
  d16: 'M19 4V2H5V4M5 18V22H19V18',
  d17: 'M21.75 6.25L2.25 6.25L2.25 15.75L21.75 15.75L21.75 6.25ZM6.56066 9.93945L5.56066 8.93945L4.5 10.0001L5.5 11.0001L4.5 12.0001L5.56066 13.0608L6.56066 12.0608L7.56066 13.0608L8.62132 12.0001L7.62132 11.0001L8.62132 10.0001L7.56066 8.93945L6.56066 9.93945ZM11.0001 8.93945L12.0001 9.93945L13.0001 8.93945L14.0608 10.0001L13.0608 11.0001L14.0608 12.0001L13.0001 13.0608L12.0001 12.0608L11.0001 13.0608L9.93945 12.0001L10.9395 11.0001L9.93945 10.0001L11.0001 8.93945ZM17.4393 9.93945L16.4393 8.93945L15.3787 10.0001L16.3787 11.0001L15.3787 12.0001L16.4393 13.0608L17.4393 12.0608L18.4393 13.0608L19.5 12.0001L18.5 11.0001L19.5 10.0001L18.4393 8.93945L17.4393 9.93945Z',
  d18: 'M4.25 1.25L19.75 1.25V5L4.25 5L4.25 1.25ZM4.25 17L19.75 17L19.75 22.75L4.25 22.75L4.25 17ZM13 21.01L13 19L11 19V21.01L13 21.01Z',
};

export const IconSmsCodeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sms-code-stroke-rounded IconSmsCodeStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconSmsCodeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sms-code-duotone-rounded IconSmsCodeDuotoneRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      </g>
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
    </TheIconWrapper>
  );
};

export const IconSmsCodeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sms-code-twotone-rounded IconSmsCodeTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
    </TheIconWrapper>
  );
};

export const IconSmsCodeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sms-code-solid-rounded IconSmsCodeSolidRounded"
    >
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

export const IconSmsCodeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sms-code-bulk-rounded IconSmsCodeBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSmsCodeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sms-code-stroke-sharp IconSmsCodeStrokeSharp"
    >
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
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
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconSmsCodeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sms-code-solid-sharp IconSmsCodeSolidSharp"
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

export const iconPackOfSmsCode: TheIconSelfPack = {
  name: 'SmsCode',
  StrokeRounded: IconSmsCodeStrokeRounded,
  DuotoneRounded: IconSmsCodeDuotoneRounded,
  TwotoneRounded: IconSmsCodeTwotoneRounded,
  SolidRounded: IconSmsCodeSolidRounded,
  BulkRounded: IconSmsCodeBulkRounded,
  StrokeSharp: IconSmsCodeStrokeSharp,
  SolidSharp: IconSmsCodeSolidSharp,
};