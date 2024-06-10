import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.8824 12C14.0519 12 15 12.8954 15 14C15 15.1046 14.0519 16 12.8824 16H10.6C9.84575 16 9.46863 16 9.23431 15.7657C9 15.5314 9 15.1542 9 14.4V12M12.8824 12C14.0519 12 15 11.1046 15 10C15 8.89543 14.0519 8 12.8824 8H10.6C9.84575 8 9.46863 8 9.23431 8.23431C9 8.46863 9 8.84575 9 9.6V12M12.8824 12H9',
  d2: 'M22 12C20.8954 12 20 11.1046 20 10V8C20 4.69067 19.3093 4 16 4H8C4.69067 4 4 4.69067 4 8V10C4 11.1046 3.10457 12 2 12',
  d3: 'M2 12C3.10457 12 4 12.8954 4 14L4 16C4 19.3093 4.69067 20 8 20H16C19.3093 20 20 19.3093 20 16V14C20 12.8954 20.8954 12 22 12',
  d4: 'M4.7448 5.17157C3.5 6.34315 3.5 8.22876 3.5 12C3.5 15.7712 3.5 17.6569 4.7448 18.8284C5.98959 20 7.99306 20 12 20C16.0069 20 18.0104 20 19.2552 18.8284C20.5 17.6569 20.5 15.7712 20.5 12C20.5 8.22876 20.5 6.34315 19.2552 5.17157C18.0104 4 16.0069 4 12 4C7.99306 4 5.98959 4 4.7448 5.17157ZM12.8824 16C14.0519 16 15 15.1046 15 14C15 12.8954 14.0519 12 12.8824 12C14.0519 12 15 11.1046 15 10C15 8.89543 14.0519 8 12.8824 8H10.6C9.84575 8 9.46863 8 9.23431 8.23431C9 8.46863 9 8.84575 9 9.6V14.4C9 15.1542 9 15.5314 9.23431 15.7657C9.46863 16 9.84575 16 10.6 16H12.8824Z',
  d5: 'M2 12C3.10457 12 4 12.8954 4 14L4 16C4 19.3093 4.69067 20 8 20L16 20C19.3093 20 20 19.3093 20 16L20 14C20 12.8954 20.8954 12 22 12',
  d6: 'M22 11.25C21.3096 11.25 20.75 10.6904 20.75 10V8C20.75 7.15644 20.707 6.42823 20.5729 5.81795C20.437 5.19918 20.1974 4.65476 19.7713 4.22867C19.3452 3.80257 18.8008 3.56303 18.182 3.42709C17.5718 3.29303 16.8436 3.25 16 3.25L8 3.25C7.15644 3.25 6.42823 3.29303 5.81795 3.42709C5.19918 3.56303 4.65476 3.80257 4.22867 4.22867C3.80257 4.65477 3.56303 5.19918 3.42709 5.81795C3.29303 6.42823 3.25 7.15644 3.25 8L3.25 10C3.25 10.6904 2.69036 11.25 2 11.25C1.58579 11.25 1.25 11.5858 1.25 12C1.25 12.4142 1.58579 12.75 2 12.75C2.69036 12.75 3.25 13.3096 3.25 14L3.25 16C3.25 16.8436 3.29302 17.5718 3.42709 18.182C3.56303 18.8008 3.80257 19.3452 4.22867 19.7713C4.65476 20.1974 5.19917 20.437 5.81795 20.5729C6.42823 20.707 7.15644 20.75 8 20.75L16 20.75C16.8436 20.75 17.5718 20.707 18.182 20.5729C18.8008 20.437 19.3452 20.1974 19.7713 19.7713C20.1974 19.3452 20.437 18.8008 20.5729 18.182C20.707 17.5718 20.75 16.8436 20.75 16V14C20.75 13.3096 21.3096 12.75 22 12.75C22.4142 12.75 22.75 12.4142 22.75 12C22.75 11.5858 22.4142 11.25 22 11.25ZM10.6 7.25001L10.5583 7.25C10.2174 7.24994 9.89076 7.24989 9.62226 7.28599C9.32124 7.32646 8.98373 7.42426 8.70399 7.70399C8.42426 7.98373 8.32646 8.32124 8.28599 8.62226C8.24989 8.89076 8.24995 9.21738 8.25 9.55827L8.25001 9.60001L8.25001 14.4L8.25 14.4417C8.24995 14.7826 8.24989 15.1093 8.28599 15.3778C8.32646 15.6788 8.42426 16.0163 8.70399 16.296C8.98373 16.5758 9.32124 16.6736 9.62226 16.714C9.89074 16.7501 10.2173 16.7501 10.5582 16.75H10.5583L10.6 16.75H12.8824C14.4252 16.75 15.75 15.5586 15.75 14C15.75 13.1991 15.4002 12.4952 14.8507 12C15.4002 11.5049 15.75 10.8009 15.75 10C15.75 8.44141 14.4252 7.25001 12.8824 7.25001H10.6ZM14.25 10C14.25 10.6506 13.6787 11.25 12.8824 11.25H9.75001V9.60001C9.75001 9.20168 9.7516 8.97839 9.77261 8.82213C9.77486 8.80537 9.77714 8.7912 9.7793 8.7793C9.7912 8.77714 9.80537 8.77486 9.82213 8.77261C9.97839 8.7516 10.2017 8.75001 10.6 8.75001H12.8824C13.6787 8.75001 14.25 9.34947 14.25 10ZM12.8824 12.75L9.75001 12.75L9.75001 14.4C9.75001 14.7983 9.7516 15.0216 9.77261 15.1779C9.77486 15.1946 9.77714 15.2088 9.7793 15.2207C9.7912 15.2229 9.80537 15.2252 9.82213 15.2274C9.97839 15.2484 10.2017 15.25 10.6 15.25L12.8824 15.25C13.6787 15.25 14.25 14.6506 14.25 14C14.25 13.3495 13.6787 12.75 12.8824 12.75Z',
  d7: 'M20.75 10C20.75 10.6904 21.3096 11.25 22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75C21.3096 12.75 20.75 13.3096 20.75 14V16C20.75 16.8436 20.707 17.5718 20.5729 18.182C20.437 18.8008 20.1974 19.3452 19.7713 19.7713C19.3452 20.1974 18.8008 20.437 18.182 20.5729C17.5718 20.707 16.8436 20.75 16 20.75H8C7.15644 20.75 6.42823 20.707 5.81795 20.5729C5.19917 20.437 4.65476 20.1974 4.22867 19.7713C3.80257 19.3452 3.56303 18.8008 3.42709 18.182C3.29302 17.5718 3.25 16.8436 3.25 16L3.25 14C3.25 13.3096 2.69036 12.75 2 12.75C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25C2.69036 11.25 3.25 10.6904 3.25 10V8C3.25 7.15644 3.29303 6.42823 3.42709 5.81795C3.56303 5.19918 3.80257 4.65477 4.22867 4.22867C4.65476 3.80257 5.19918 3.56303 5.81795 3.42709C6.42823 3.29303 7.15644 3.25 8 3.25H16C16.8436 3.25 17.5718 3.29303 18.182 3.42709C18.8008 3.56303 19.3452 3.80257 19.7713 4.22867C20.1974 4.65477 20.437 5.19918 20.5729 5.81795C20.707 6.42823 20.75 7.15644 20.75 8V10Z',
  d8: 'M10.5583 7.25C10.5722 7.25001 10.5861 7.25001 10.6 7.25001H12.8824C14.4252 7.25001 15.75 8.44141 15.75 10C15.75 10.8009 15.4002 11.5049 14.8507 12C15.4002 12.4952 15.75 13.1991 15.75 14C15.75 15.5586 14.4252 16.75 12.8824 16.75H10.6C10.5861 16.75 10.5722 16.75 10.5583 16.75C10.2174 16.7501 9.89076 16.7501 9.62226 16.714C9.32124 16.6736 8.98373 16.5758 8.70399 16.296C8.42426 16.0163 8.32646 15.6788 8.28599 15.3778C8.24989 15.1093 8.24995 14.7826 8.25 14.4417C8.25001 14.4279 8.25001 14.4139 8.25001 14.4V9.60001C8.25001 9.58608 8.25001 9.57216 8.25 9.55827C8.24995 9.21738 8.24989 8.89076 8.28599 8.62226C8.32646 8.32124 8.42426 7.98373 8.70399 7.70399C8.98373 7.42426 9.32124 7.32646 9.62226 7.28599C9.89076 7.24989 10.2174 7.24995 10.5583 7.25ZM12.8824 11.25C13.6787 11.25 14.25 10.6506 14.25 10C14.25 9.34947 13.6787 8.75001 12.8824 8.75001H10.6C10.2017 8.75001 9.97839 8.7516 9.82213 8.77261C9.80537 8.77486 9.7912 8.77714 9.7793 8.7793C9.77714 8.7912 9.77486 8.80537 9.77261 8.82213C9.7516 8.97839 9.75001 9.20168 9.75001 9.60001V11.25H12.8824ZM9.75001 12.75H12.8824C13.6787 12.75 14.25 13.3495 14.25 14C14.25 14.6506 13.6787 15.25 12.8824 15.25H10.6C10.2017 15.25 9.97839 15.2484 9.82213 15.2274C9.80537 15.2252 9.7912 15.2229 9.7793 15.2207C9.77714 15.2088 9.77486 15.1946 9.77261 15.1779C9.7516 15.0216 9.75001 14.7983 9.75001 14.4V12.75Z',
  d9: 'M12.8824 12C14.0519 12 15 12.8954 15 14C15 15.1046 14.0519 16 12.8824 16H9V12M12.8824 12C14.0519 12 15 11.1046 15 10C15 8.89543 14.0519 8 12.8824 8H9V12M12.8824 12H9',
  d10: 'M4 4L4 10C4 11.1046 3.10457 12 2 12C3.10457 12 4 12.8954 4 14L4 20H20V14C20 12.8954 20.8954 12 22 12C20.8954 12 20 11.1046 20 10V4H4Z',
  d11: 'M4 3.25C3.80109 3.25 3.61032 3.32902 3.46967 3.46967C3.32902 3.61032 3.25 3.80109 3.25 4L3.25 10C3.25 10.6904 2.69036 11.25 2 11.25C1.58579 11.25 1.25 11.5858 1.25 12C1.25 12.4142 1.58579 12.75 2 12.75C2.69036 12.75 3.25 13.3096 3.25 14L3.25 20C3.25 20.1989 3.32902 20.3897 3.46967 20.5303C3.61032 20.671 3.80109 20.75 4 20.75L20 20.75C20.4142 20.75 20.75 20.4142 20.75 20V14C20.75 13.3096 21.3096 12.75 22 12.75C22.4142 12.75 22.75 12.4142 22.75 12C22.75 11.5858 22.4142 11.25 22 11.25C21.3096 11.25 20.75 10.6904 20.75 10L20.75 4C20.75 3.58579 20.4142 3.25 20 3.25L4 3.25ZM9 7.25C8.58579 7.25 8.25 7.58579 8.25 8L8.25 16C8.25 16.4142 8.58579 16.75 9 16.75H12.8824C14.4251 16.75 15.75 15.5586 15.75 14C15.75 13.1991 15.4002 12.4952 14.8507 12C15.4002 11.5049 15.75 10.8009 15.75 10C15.75 8.4414 14.4251 7.25 12.8824 7.25H9ZM14.25 10C14.25 10.6505 13.6786 11.25 12.8824 11.25H9.75V8.75H12.8824C13.6786 8.75 14.25 9.34946 14.25 10ZM12.8824 12.75L9.75 12.75L9.75 15.25L12.8824 15.25C13.6786 15.25 14.25 14.6505 14.25 14C14.25 13.3495 13.6786 12.75 12.8824 12.75Z',
};

export const IconBootstrapStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bootstrap-stroke-rounded IconBootstrapStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconBootstrapDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bootstrap-duotone-rounded IconBootstrapDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
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
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBootstrapTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bootstrap-twotone-rounded IconBootstrapTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconBootstrapSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bootstrap-solid-rounded IconBootstrapSolidRounded"
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

export const IconBootstrapBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bootstrap-bulk-rounded IconBootstrapBulkRounded"
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
    </TheIconWrapper>
  );
};

export const IconBootstrapStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bootstrap-stroke-sharp IconBootstrapStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBootstrapSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bootstrap-solid-sharp IconBootstrapSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBootstrap: TheIconSelfPack = {
  name: 'Bootstrap',
  StrokeRounded: IconBootstrapStrokeRounded,
  DuotoneRounded: IconBootstrapDuotoneRounded,
  TwotoneRounded: IconBootstrapTwotoneRounded,
  SolidRounded: IconBootstrapSolidRounded,
  BulkRounded: IconBootstrapBulkRounded,
  StrokeSharp: IconBootstrapStrokeSharp,
  SolidSharp: IconBootstrapSolidSharp,
};