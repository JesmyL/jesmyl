import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14 22V8C14 5.17157 14 3.75736 13.1213 2.87868C12.2426 2 10.8284 2 8 2C5.17157 2 3.75736 2 2.87868 2.87868C2 3.75736 2 5.17157 2 8V16C2 18.8284 2 20.2426 2.87868 21.1213C3.75736 22 5.17157 22 8 22H14Z',
  d2: 'M6.5 11H5.5M10.5 11H9.5M6.5 7H5.5M6.5 15H5.5M10.5 7H9.5M10.5 15H9.5',
  d3: 'M18.5 15H17.5M18.5 11H17.5',
  d4: 'M18 8H14V22H18C19.8856 22 20.8284 22 21.4142 21.4142C22 20.8284 22 19.8856 22 18V12C22 10.1144 22 9.17157 21.4142 8.58579C20.8284 8 19.8856 8 18 8Z',
  d5: 'M7.93195 1.25H8.06805C9.37381 1.24997 10.4505 1.24994 11.3027 1.36606C12.1974 1.48796 12.9876 1.75375 13.6203 2.39495C14.2529 3.03615 14.5152 3.83695 14.6355 4.74369C14.7501 5.60736 14.75 6.6986 14.75 8.02194L14.75 22.75H7.93197C6.6262 22.75 5.54946 22.7501 4.69726 22.6339C3.80257 22.512 3.01241 22.2463 2.37973 21.6051C1.74706 20.9639 1.4848 20.1631 1.36451 19.2563C1.24994 18.3926 1.24997 17.3014 1.25 15.9781V8.02194C1.24997 6.6986 1.24994 5.60736 1.36451 4.74369C1.4848 3.83695 1.74706 3.03615 2.37973 2.39495C3.01241 1.75375 3.80257 1.48796 4.69726 1.36606C5.54946 1.24994 6.62619 1.24997 7.93195 1.25ZM4.95424 3.30317C4.2734 3.39594 3.95806 3.55951 3.74344 3.77702C3.52882 3.99453 3.36742 4.31412 3.27589 5.00413C3.18062 5.72225 3.17857 6.68121 3.17857 8.09091V15.9091C3.17857 17.3188 3.18062 18.2778 3.27589 18.9959C3.36742 19.6859 3.52882 20.0055 3.74344 20.223C3.95806 20.4405 4.2734 20.6041 4.95424 20.6968C5.66282 20.7934 6.60903 20.7955 8 20.7955H12.8214V8.09091C12.8214 6.68121 12.8194 5.72225 12.7241 5.00413C12.6326 4.31412 12.4712 3.99453 12.2566 3.77702C12.0419 3.55951 11.7266 3.39594 11.0458 3.30317C10.3372 3.20662 9.39097 3.20455 8 3.20455C6.60903 3.20455 5.66282 3.20662 4.95424 3.30317Z',
  d6: 'M4.5 7C4.5 6.44772 4.94772 6 5.5 6H6.5C7.05228 6 7.5 6.44772 7.5 7C7.5 7.55228 7.05228 8 6.5 8H5.5C4.94772 8 4.5 7.55228 4.5 7ZM8.5 7C8.5 6.44772 8.94772 6 9.5 6H10.5C11.0523 6 11.5 6.44772 11.5 7C11.5 7.55228 11.0523 8 10.5 8H9.5C8.94772 8 8.5 7.55228 8.5 7ZM4.5 11C4.5 10.4477 4.94772 10 5.5 10H6.5C7.05228 10 7.5 10.4477 7.5 11C7.5 11.5523 7.05228 12 6.5 12H5.5C4.94772 12 4.5 11.5523 4.5 11ZM8.5 11C8.5 10.4477 8.94772 10 9.5 10H10.5C11.0523 10 11.5 10.4477 11.5 11C11.5 11.5523 11.0523 12 10.5 12H9.5C8.94772 12 8.5 11.5523 8.5 11ZM4.5 15C4.5 14.4477 4.94772 14 5.5 14H6.5C7.05228 14 7.5 14.4477 7.5 15C7.5 15.5523 7.05228 16 6.5 16H5.5C4.94772 16 4.5 15.5523 4.5 15ZM8.5 15C8.5 14.4477 8.94772 14 9.5 14H10.5C11.0523 14 11.5 14.4477 11.5 15C11.5 15.5523 11.0523 16 10.5 16H9.5C8.94772 16 8.5 15.5523 8.5 15Z',
  d7: 'M21.9445 8.05546C21.4891 7.59999 20.9223 7.41432 20.2945 7.32991C19.6997 7.24995 18.9505 7.24997 18.0521 7.25H18.052H18.052L13.25 7.25V22.75L18.052 22.75H18.052C18.9505 22.75 19.6997 22.7501 20.2945 22.6701C20.9223 22.5857 21.4891 22.4 21.9445 21.9445C22.4 21.4891 22.5857 20.9223 22.6701 20.2945C22.7501 19.6997 22.75 18.9505 22.75 18.052V18.052V11.948V11.948C22.75 11.0495 22.7501 10.3003 22.6701 9.70552C22.5857 9.07773 22.4 8.51093 21.9445 8.05546ZM17.5 10.25C17.0858 10.25 16.75 10.5858 16.75 11C16.75 11.4142 17.0858 11.75 17.5 11.75H18.5C18.9142 11.75 19.25 11.4142 19.25 11C19.25 10.5858 18.9142 10.25 18.5 10.25H17.5ZM17.5 14.25C17.0858 14.25 16.75 14.5858 16.75 15C16.75 15.4142 17.0858 15.75 17.5 15.75H18.5C18.9142 15.75 19.25 15.4142 19.25 15C19.25 14.5858 18.9142 14.25 18.5 14.25H17.5Z',
  d8: 'M20.2945 7.32991C20.9223 7.41432 21.4891 7.59999 21.9445 8.05546C22.4 8.51093 22.5857 9.07773 22.6701 9.70552C22.7501 10.3003 22.75 11.0495 22.75 11.948V11.948V18.052V18.052C22.75 18.9505 22.7501 19.6997 22.6701 20.2945C22.5857 20.9223 22.4 21.4891 21.9445 21.9445C21.4891 22.4 20.9223 22.5857 20.2945 22.6701C19.6997 22.7501 18.9505 22.75 18.052 22.75H18.052L13.25 22.75V7.25L18.052 7.25H18.052C18.9505 7.24997 19.6997 7.24995 20.2945 7.32991Z',
  d9: 'M16.75 11C16.75 10.5858 17.0858 10.25 17.5 10.25H18.5C18.9142 10.25 19.25 10.5858 19.25 11C19.25 11.4142 18.9142 11.75 18.5 11.75H17.5C17.0858 11.75 16.75 11.4142 16.75 11ZM16.75 15C16.75 14.5858 17.0858 14.25 17.5 14.25H18.5C18.9142 14.25 19.25 14.5858 19.25 15C19.25 15.4142 18.9142 15.75 18.5 15.75H17.5C17.0858 15.75 16.75 15.4142 16.75 15Z',
  d10: 'M7 11H5M11 11H9M7 7H5M11 7H9M5 15H7M9 15H11',
  d11: 'M19 15H17M19 11H17',
  d12: 'M14 7.99997V2H2V22L14 22M14 7.99997H22V22L14 22M14 7.99997V22',
  d13: 'M5 6H7V8H5V6ZM9 6H11V8H9V6ZM5 10H7V12H5V10ZM9 10H11V12H9V10ZM7 16H5V14H7V16ZM11 16H9V14H11V16Z',
  d14: 'M14 7.25C13.5858 7.25 13.25 7.58579 13.25 8V22C13.25 22.4142 13.5858 22.75 14 22.75L22 22.75C22.1989 22.75 22.3897 22.671 22.5303 22.5304C22.671 22.3897 22.75 22.1989 22.75 22V8C22.75 7.58579 22.4142 7.25 22 7.25H14ZM19 10.25H17V11.75H19V10.25ZM19 14.25H17V15.75H19V14.25Z',
  d15: 'M1.25 2.22727C1.25 1.68754 1.68173 1.25 2.21429 1.25H13.7857C14.3183 1.25 14.75 1.68754 14.75 2.22727V21.7727C14.75 22.3124 14.3183 22.75 13.7857 22.75L2.21429 22.75C1.95854 22.75 1.71327 22.647 1.53243 22.4638C1.35159 22.2805 1.25 22.0319 1.25 21.7727V2.22727ZM3.17857 3.20455V20.7955L12.8214 20.7954V3.20455H3.17857Z',
};

export const IconOfficeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-stroke-rounded IconOfficeStrokeRounded"
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconOfficeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-duotone-rounded IconOfficeDuotoneRounded"
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconOfficeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-twotone-rounded IconOfficeTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconOfficeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-solid-rounded IconOfficeSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconOfficeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-bulk-rounded IconOfficeBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconOfficeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-stroke-sharp IconOfficeStrokeSharp"
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
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconOfficeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="office-solid-sharp IconOfficeSolidSharp"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfOffice: TheIconSelfPack = {
  name: 'Office',
  StrokeRounded: IconOfficeStrokeRounded,
  DuotoneRounded: IconOfficeDuotoneRounded,
  TwotoneRounded: IconOfficeTwotoneRounded,
  SolidRounded: IconOfficeSolidRounded,
  BulkRounded: IconOfficeBulkRounded,
  StrokeSharp: IconOfficeStrokeSharp,
  SolidSharp: IconOfficeSolidSharp,
};