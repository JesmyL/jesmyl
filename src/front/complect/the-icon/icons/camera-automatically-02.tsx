import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 6C19.3456 6 20.0184 6 20.8263 6.61994C21.0343 6.77954 21.2205 6.96572 21.3801 7.17372C22 7.98164 22 9.15442 22 11.5V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16V11.5C2 9.15442 2 7.98164 2.61994 7.17372C2.77954 6.96572 2.96572 6.77954 3.17372 6.61994C3.98164 6 4.65442 6 7 6',
  d2: 'M17 7L16.1142 4.78543C15.732 3.82996 15.3994 2.7461 14.4166 2.25955C13.8924 2 13.2616 2 12 2C10.7384 2 10.1076 2 9.58335 2.25955C8.6006 2.7461 8.26801 3.82996 7.88583 4.78543L7 7',
  d3: 'M11.9998 6H12.0088',
  d4: 'M14.5 17L12 11L9.5 17M10.2143 15.2857H13.7857',
  d5: 'M2 16V11.5C2 9.15442 2 7.98164 2.61994 7.17372C2.77954 6.96572 2.96572 6.77954 3.17372 6.61994C3.98164 6 4.65442 6 7 6H7.4L7.88583 4.78543C8.26801 3.82996 8.60061 2.7461 9.58335 2.25955C10.1076 2 10.7384 2 12 2C13.2616 2 13.8924 2 14.4166 2.25955C15.3994 2.7461 15.732 3.82996 16.1142 4.78543L16.6 6H17C19.3456 6 20.0184 6 20.8263 6.61994C21.0343 6.77954 21.2205 6.96572 21.3801 7.17372C22 7.98164 22 9.15442 22 11.5V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z',
  d6: 'M11.9686 1.25H12.0314H12.0314C12.6355 1.24999 13.1356 1.24998 13.5485 1.28515C13.9812 1.32201 14.3723 1.40069 14.7494 1.58742C15.4214 1.92009 15.8461 2.44877 16.1443 2.979C16.3755 3.39004 16.555 3.85182 16.7071 4.24318C16.743 4.33553 16.7774 4.42396 16.8105 4.50689L16.9569 4.87283C17.0299 5.05536 17.0664 5.14662 17.1425 5.19819C17.2185 5.24975 17.317 5.24991 17.5141 5.25022C18.3986 5.2516 19.0637 5.26171 19.5921 5.33452C20.2753 5.42866 20.7694 5.63092 21.2829 6.02493C21.5429 6.22443 21.7756 6.45715 21.9751 6.71715C22.4019 7.27343 22.5828 7.92195 22.6678 8.67622C22.75 9.40571 22.75 10.3204 22.75 11.4548V16.0549C22.75 17.4225 22.75 18.5248 22.6335 19.3918C22.5125 20.2919 22.2536 21.0497 21.6517 21.6517C21.0497 22.2536 20.2919 22.5125 19.3918 22.6335C18.5248 22.75 17.4225 22.75 16.0549 22.75H7.94513C6.57754 22.75 5.47522 22.75 4.60825 22.6335C3.70814 22.5125 2.95027 22.2536 2.34835 21.6517C1.74644 21.0497 1.48754 20.2919 1.36653 19.3918C1.24997 18.5248 1.24998 17.4225 1.25 16.0549V16.0549V11.4548V11.4548C1.24999 10.3204 1.24998 9.4057 1.33222 8.67622C1.41725 7.92195 1.59808 7.27343 2.02493 6.71715C2.22443 6.45715 2.45715 6.22443 2.71715 6.02493C3.23063 5.63092 3.72467 5.42866 4.40786 5.33452C4.93626 5.26171 5.60137 5.2516 6.48592 5.25022C6.68297 5.24991 6.7815 5.24975 6.85754 5.19819C6.93358 5.14662 6.97009 5.05536 7.0431 4.87283L7.18947 4.50689C7.22264 4.42397 7.25701 4.33554 7.2929 4.2432C7.44502 3.85184 7.62451 3.39004 7.85567 2.979C8.15388 2.44877 8.57866 1.92009 9.25059 1.58742C9.62775 1.40069 10.0188 1.32201 10.4515 1.28515C10.8644 1.24998 11.3645 1.24999 11.9686 1.25H11.9686ZM11 6C11 5.44772 11.4457 5 11.9955 5C12.5433 5 13 5.44981 13 6C13 6.55228 12.5543 7 12.0045 7C11.4567 7 11 6.55019 11 6ZM12.6925 10.7115C12.5761 10.4321 12.303 10.25 12.0002 10.25C11.6974 10.25 11.4243 10.4321 11.3079 10.7115L9.52862 14.9818C9.52401 14.9922 9.51963 15.0027 9.51549 15.0133L8.80789 16.7115C8.64857 17.0939 8.82938 17.533 9.21173 17.6923C9.59408 17.8516 10.0332 17.6708 10.1925 17.2885L10.7145 16.0357H13.2859L13.8079 17.2885C13.9672 17.6708 14.4063 17.8516 14.7887 17.6923C15.171 17.533 15.3518 17.0939 15.1925 16.7115L14.4849 15.0133C14.4808 15.0027 14.4764 14.9922 14.4718 14.9818L12.6925 10.7115ZM12.0002 12.95L12.6609 14.5357H11.3395L12.0002 12.95Z',
  d7: 'M11.9686 1.25H12.0314C12.6355 1.24999 13.1356 1.24998 13.5485 1.28515C13.9812 1.32201 14.3723 1.40069 14.7494 1.58742C15.4214 1.92009 15.8461 2.44877 16.1443 2.979C16.3755 3.39004 16.555 3.85182 16.7071 4.24318C16.743 4.33553 16.7774 4.42396 16.8105 4.50689L16.9569 4.87283C17.0299 5.05536 17.0664 5.14662 17.1425 5.19819C17.2185 5.24975 17.317 5.24991 17.5141 5.25022C18.3986 5.2516 19.0637 5.26171 19.5921 5.33452C20.2753 5.42866 20.7694 5.63092 21.2829 6.02493C21.5429 6.22443 21.7756 6.45715 21.9751 6.71715C22.4019 7.27343 22.5828 7.92195 22.6678 8.67622C22.75 9.40571 22.75 10.3204 22.75 11.4548V16.0549C22.75 17.4225 22.75 18.5248 22.6335 19.3918C22.5125 20.2919 22.2536 21.0497 21.6517 21.6517C21.0497 22.2536 20.2919 22.5125 19.3918 22.6335C18.5248 22.75 17.4225 22.75 16.0549 22.75H7.94513C6.57754 22.75 5.47522 22.75 4.60825 22.6335C3.70814 22.5125 2.95027 22.2536 2.34835 21.6517C1.74644 21.0497 1.48754 20.2919 1.36653 19.3918C1.24997 18.5248 1.24998 17.4225 1.25 16.0549V11.4548C1.24999 10.3204 1.24998 9.4057 1.33222 8.67622C1.41725 7.92195 1.59808 7.27343 2.02493 6.71715C2.22443 6.45715 2.45715 6.22443 2.71715 6.02493C3.23063 5.63092 3.72467 5.42866 4.40786 5.33452C4.93626 5.26171 5.60137 5.2516 6.48592 5.25022C6.68297 5.24991 6.7815 5.24975 6.85754 5.19819C6.93358 5.14662 6.97009 5.05536 7.0431 4.87283L7.18947 4.50689C7.22264 4.42397 7.25701 4.33554 7.2929 4.2432C7.44502 3.85184 7.62451 3.39004 7.85567 2.979C8.15388 2.44877 8.57866 1.92009 9.25059 1.58742C9.62775 1.40069 10.0188 1.32201 10.4515 1.28515C10.8644 1.24998 11.3645 1.24999 11.9686 1.25Z',
  d8: 'M11 6C11 5.44772 11.4457 5 11.9955 5C12.5433 5 13 5.44981 13 6C13 6.55228 12.5543 7 12.0045 7C11.4567 7 11 6.55019 11 6Z',
  d9: 'M12.0002 10.25C12.303 10.25 12.5761 10.4321 12.6925 10.7115L14.4718 14.9818C14.4764 14.9922 14.4808 15.0027 14.4849 15.0133L15.1925 16.7115C15.3518 17.0939 15.171 17.533 14.7887 17.6923C14.4063 17.8516 13.9672 17.6708 13.8079 17.2885L13.2859 16.0357H10.7145L10.1925 17.2885C10.0332 17.6708 9.59409 17.8516 9.21173 17.6923C8.82938 17.533 8.64858 17.0939 8.80789 16.7115L9.51549 15.0133C9.51963 15.0027 9.52401 14.9922 9.52862 14.9818L11.3079 10.7115C11.4243 10.4321 11.6974 10.25 12.0002 10.25ZM11.3395 14.5357H12.6609L12.0002 12.95L11.3395 14.5357Z',
  d10: 'M15 18L12.5 11H11.5L9 18M9.85714 16H14.1429',
  d11: 'M12 6H12.009',
  d12: 'M22.0635 21.9107V6.11047C22.0635 6.05524 22.0187 6.01047 21.9635 6.01047H17.0621L15.074 2.0638C15.057 2.03007 15.0225 2.00879 14.9847 2.00879H9.09895C9.0609 2.00879 9.02615 2.03038 9.00929 2.06449L7.05978 6.01047H6.89845H2.15859C2.10337 6.01047 2.05859 6.05524 2.05859 6.11047V21.9107C2.05859 21.966 2.10337 22.0107 2.15859 22.0107H21.9635C22.0187 22.0107 22.0635 21.966 22.0635 21.9107Z',
  d13: 'M11.9988 11.8297L13.2202 15.2498H10.7773L11.9988 11.8297Z',
  d14: 'M8.32866 1.6644C8.4557 1.41028 8.71541 1.24976 8.99951 1.24976H14.9995C15.2836 1.24976 15.5433 1.41026 15.6703 1.66435L17.463 5.24976H22.0005C22.4147 5.24976 22.7505 5.58554 22.7505 5.99976V22.0001C22.7505 22.4143 22.4147 22.7501 22.0005 22.7501H1.99951C1.5853 22.7501 1.24951 22.4143 1.24951 22.0001V6.00059C1.24951 5.58637 1.5853 5.25059 1.99951 5.25059H6.53594L8.32866 1.6644ZM12.9995 4.99976H10.9995V6.99976H12.9995V4.99976ZM13.0273 10.2498H10.9702L8.29248 17.7475L9.70509 18.252L10.2416 16.7498H13.756L14.2925 18.252L15.7051 17.7475L13.0273 10.2498Z',
};

export const IconCameraAutomatically02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-automatically-02-stroke-rounded IconCameraAutomatically02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconCameraAutomatically02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-automatically-02-duotone-rounded IconCameraAutomatically02DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconCameraAutomatically02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-automatically-02-twotone-rounded IconCameraAutomatically02TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconCameraAutomatically02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-automatically-02-solid-rounded IconCameraAutomatically02SolidRounded"
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

export const IconCameraAutomatically02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-automatically-02-bulk-rounded IconCameraAutomatically02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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

export const IconCameraAutomatically02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-automatically-02-stroke-sharp IconCameraAutomatically02StrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCameraAutomatically02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-automatically-02-solid-sharp IconCameraAutomatically02SolidSharp"
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

export const iconPackOfCameraAutomatically02: TheIconSelfPack = {
  name: 'CameraAutomatically02',
  StrokeRounded: IconCameraAutomatically02StrokeRounded,
  DuotoneRounded: IconCameraAutomatically02DuotoneRounded,
  TwotoneRounded: IconCameraAutomatically02TwotoneRounded,
  SolidRounded: IconCameraAutomatically02SolidRounded,
  BulkRounded: IconCameraAutomatically02BulkRounded,
  StrokeSharp: IconCameraAutomatically02StrokeSharp,
  SolidSharp: IconCameraAutomatically02SolidSharp,
};