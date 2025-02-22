import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 2.75H13V1.25H11V2.75ZM13.25 3V5H14.75V3H13.25ZM13 5.25H11V6.75H13V5.25ZM10.75 5V3H9.25V5H10.75ZM11 5.25C10.8619 5.25 10.75 5.13807 10.75 5H9.25C9.25 5.9665 10.0335 6.75 11 6.75V5.25ZM13.25 5C13.25 5.13807 13.1381 5.25 13 5.25V6.75C13.9665 6.75 14.75 5.9665 14.75 5H13.25ZM13 2.75C13.1381 2.75 13.25 2.86193 13.25 3H14.75C14.75 2.0335 13.9665 1.25 13 1.25V2.75ZM11 1.25C10.0335 1.25 9.25 2.0335 9.25 3H10.75C10.75 2.86193 10.8619 2.75 11 2.75V1.25Z',
  d2: 'M11 18.75H13V17.25H11V18.75ZM13.25 19V21H14.75V19H13.25ZM13 21.25H11V22.75H13V21.25ZM10.75 21V19H9.25V21H10.75ZM11 21.25C10.8619 21.25 10.75 21.1381 10.75 21H9.25C9.25 21.9665 10.0335 22.75 11 22.75V21.25ZM13.25 21C13.25 21.1381 13.1381 21.25 13 21.25V22.75C13.9665 22.75 14.75 21.9665 14.75 21H13.25ZM13 18.75C13.1381 18.75 13.25 18.8619 13.25 19H14.75C14.75 18.0335 13.9665 17.25 13 17.25V18.75ZM11 17.25C10.0335 17.25 9.25 18.0335 9.25 19H10.75C10.75 18.8619 10.8619 18.75 11 18.75V17.25Z',
  d3: 'M14 4H16C17.4142 4 18.1213 4 18.5607 4.43934C19 4.87868 19 5.58579 19 7',
  d4: 'M10 4H8C6.58579 4 5.87868 4 5.43934 4.43934C5 4.87868 5 5.58579 5 7',
  d5: 'M10 20H8C6.58579 20 5.87868 20 5.43934 19.5607C5 19.1213 5 18.4142 5 17',
  d6: 'M14 20H16C17.4142 20 18.1213 20 18.5607 19.5607C19 19.1213 19 18.4142 19 17',
  d7: 'M10 12H14',
  d8: 'M21 11H20.25H21ZM21 13H21.75H21ZM20 14V13.25V14ZM18 14V14.75V14ZM17 13H16.25H17ZM17 11L17.75 11L17 11ZM18 10V9.25V10ZM20 10V10.75V10ZM20.25 11V13H21.75V11H20.25ZM20 13.25H18V14.75H20V13.25ZM17.75 13L17.75 11L16.25 11L16.25 13H17.75ZM18 10.75L20 10.75V9.25L18 9.25V10.75ZM17.75 11C17.75 10.8619 17.8619 10.75 18 10.75V9.25C17.0335 9.25 16.25 10.0335 16.25 11L17.75 11ZM18 13.25C17.8619 13.25 17.75 13.1381 17.75 13H16.25C16.25 13.9665 17.0335 14.75 18 14.75L18 13.25ZM20.25 13C20.25 13.1381 20.1381 13.25 20 13.25V14.75C20.9665 14.75 21.75 13.9665 21.75 13H20.25ZM21.75 11C21.75 10.0335 20.9665 9.25 20 9.25V10.75C20.1381 10.75 20.25 10.8619 20.25 11H21.75Z',
  d9: 'M7 11H6.25H7ZM7 13H7.75H7ZM6 14V13.25V14ZM4 14V14.75V14ZM3 13H2.25H3ZM3 11L3.75 11L3 11ZM4 10V9.25V10ZM6 10V10.75V10ZM6.25 11V13H7.75V11H6.25ZM6 13.25H4V14.75H6V13.25ZM3.75 13L3.75 11L2.25 11L2.25 13H3.75ZM4 10.75L6 10.75V9.25L4 9.25V10.75ZM3.75 11C3.75 10.8619 3.86193 10.75 4 10.75V9.25C3.0335 9.25 2.25 10.0335 2.25 11L3.75 11ZM4 13.25C3.86193 13.25 3.75 13.1381 3.75 13H2.25C2.25 13.9665 3.0335 14.75 4 14.75L4 13.25ZM6.25 13C6.25 13.1381 6.13807 13.25 6 13.25V14.75C6.9665 14.75 7.75 13.9665 7.75 13H6.25ZM7.75 11C7.75 10.0335 6.9665 9.25 6 9.25V10.75C6.13807 10.75 6.25 10.8619 6.25 11H7.75Z',
  d10: 'M13 2H11C10.4477 2 10 2.44772 10 3V5C10 5.55228 10.4477 6 11 6H13C13.5523 6 14 5.55228 14 5V3C14 2.44772 13.5523 2 13 2Z',
  d11: 'M13 18H11C10.4477 18 10 18.4477 10 19V21C10 21.5523 10.4477 22 11 22H13C13.5523 22 14 21.5523 14 21V19C14 18.4477 13.5523 18 13 18Z',
  d12: 'M21 13V11C21 10.4477 20.5523 10 20 10L18 10C17.4477 10 17 10.4477 17 11L17 13C17 13.5523 17.4477 14 18 14H20C20.5523 14 21 13.5523 21 13Z',
  d13: 'M7 13V11C7 10.4477 6.55228 10 6 10L4 10C3.44772 10 3 10.4477 3 11L3 13C3 13.5523 3.44772 14 4 14H6C6.55228 14 7 13.5523 7 13Z',
  d14: 'M9.25 3C9.25 2.0335 10.0335 1.25 11 1.25H13C13.9665 1.25 14.75 2.0335 14.75 3V5C14.75 5.9665 13.9665 6.75 13 6.75H11C10.0335 6.75 9.25 5.9665 9.25 5V3Z',
  d15: 'M9.25 19C9.25 18.0335 10.0335 17.25 11 17.25H13C13.9665 17.25 14.75 18.0335 14.75 19V21C14.75 21.9665 13.9665 22.75 13 22.75H11C10.0335 22.75 9.25 21.9665 9.25 21V19Z',
  d16: 'M17.546 4.79823C17.1991 4.75159 16.7283 4.75 16 4.75H14C13.5858 4.75 13.25 4.41421 13.25 4C13.25 3.58579 13.5858 3.25 14 3.25H16C16.0165 3.25 16.033 3.25 16.0494 3.25C16.7142 3.24996 17.2871 3.24993 17.7458 3.31161C18.2375 3.3777 18.7087 3.52676 19.091 3.90901L18.5607 4.43934L19.091 3.90901C19.4732 4.29126 19.6223 4.76252 19.6884 5.25416C19.7501 5.7129 19.75 6.28576 19.75 6.95063L19.75 7C19.75 7.41421 19.4142 7.75 19 7.75C18.5858 7.75 18.25 7.41421 18.25 7C18.25 6.27169 18.2484 5.80091 18.2018 5.45403C18.158 5.12872 18.0874 5.02676 18.0303 4.96967C17.9732 4.91258 17.8713 4.84197 17.546 4.79823Z',
  d17: 'M7.95063 3.25C7.96703 3.25 7.98349 3.25 8 3.25H10C10.4142 3.25 10.75 3.58579 10.75 4C10.75 4.41421 10.4142 4.75 10 4.75H8C7.27169 4.75 6.80091 4.75159 6.45403 4.79823C6.12873 4.84197 6.02677 4.91258 5.96967 4.96967C5.91258 5.02676 5.84197 5.12872 5.79823 5.45403C5.7516 5.80091 5.75 6.27169 5.75 7C5.75 7.41421 5.41422 7.75 5 7.75C4.58579 7.75 4.25 7.41421 4.25 7C4.25 6.98349 4.25 6.96703 4.25 6.95063C4.24996 6.28576 4.24993 5.7129 4.31161 5.25416C4.37771 4.76252 4.52677 4.29126 4.90901 3.90901C5.29126 3.52676 5.76252 3.3777 6.25416 3.31161C6.71291 3.24993 7.28577 3.24996 7.95063 3.25Z',
  d18: 'M5 16.25C5.41422 16.25 5.75 16.5858 5.75 17C5.75 17.7283 5.7516 18.1991 5.79823 18.546C5.84197 18.8713 5.91258 18.9732 5.96967 19.0303C6.02677 19.0874 6.12873 19.158 6.45403 19.2018C6.80091 19.2484 7.27169 19.25 8 19.25H10C10.4142 19.25 10.75 19.5858 10.75 20C10.75 20.4142 10.4142 20.75 10 20.75H8C7.98349 20.75 7.96703 20.75 7.95063 20.75C7.28576 20.75 6.7129 20.7501 6.25416 20.6884C5.76252 20.6223 5.29126 20.4732 4.90901 20.091L5.43934 19.5607L4.90901 20.091C4.52677 19.7087 4.37771 19.2375 4.31161 18.7458C4.24993 18.2871 4.24996 17.7142 4.25 17.0494C4.25 17.033 4.25 17.0165 4.25 17C4.25 16.5858 4.58579 16.25 5 16.25Z',
  d19: 'M19 16.25C19.4142 16.25 19.75 16.5858 19.75 17L19.75 17.0494C19.75 17.7142 19.7501 18.2871 19.6884 18.7458C19.6223 19.2375 19.4732 19.7087 19.091 20.091C18.7087 20.4732 18.2375 20.6223 17.7458 20.6884C17.2871 20.7501 16.7142 20.75 16.0494 20.75C16.033 20.75 16.0165 20.75 16 20.75H14C13.5858 20.75 13.25 20.4142 13.25 20C13.25 19.5858 13.5858 19.25 14 19.25H16C16.7283 19.25 17.1991 19.2484 17.546 19.2018C17.8713 19.158 17.9732 19.0874 18.0303 19.0303C18.0874 18.9732 18.158 18.8713 18.2018 18.546C18.2484 18.1991 18.25 17.7283 18.25 17C18.25 16.5858 18.5858 16.25 19 16.25Z',
  d20: 'M9.25 12C9.25 11.5858 9.58579 11.25 10 11.25H14C14.4142 11.25 14.75 11.5858 14.75 12C14.75 12.4142 14.4142 12.75 14 12.75H10C9.58579 12.75 9.25 12.4142 9.25 12Z',
  d21: 'M16.25 11C16.25 10.0335 17.0335 9.25 18 9.25H20C20.9665 9.25 21.75 10.0335 21.75 11V13C21.75 13.9665 20.9665 14.75 20 14.75H18C17.0335 14.75 16.25 13.9665 16.25 13V11Z',
  d22: 'M2.25 11C2.25 10.0335 3.0335 9.25 4 9.25H6C6.9665 9.25 7.75 10.0335 7.75 11V13C7.75 13.9665 6.9665 14.75 6 14.75H4C3.0335 14.75 2.25 13.9665 2.25 13V11Z',
  d23: 'M9.25 20.75L7.95063 20.75C7.28577 20.75 6.71291 20.7501 6.25416 20.6884C5.76252 20.6223 5.29126 20.4732 4.90902 20.091C4.52677 19.7087 4.37771 19.2375 4.31161 18.7458C4.24994 18.2871 4.24997 17.7143 4.25 17.0494L4.25001 17C4.25001 16.5858 4.58579 16.25 5.00001 16.25C5.41422 16.25 5.75001 16.5858 5.75001 17C5.75001 17.7283 5.7516 18.1991 5.79823 18.546C5.84197 18.8713 5.91258 18.9732 5.96968 19.0303C6.02677 19.0874 6.12873 19.158 6.45403 19.2018C6.80091 19.2484 7.2717 19.25 8.00001 19.25H9.25V20.75Z',
  d24: 'M14.75 19.25V20.75L16.0494 20.75C16.7142 20.75 17.2871 20.7501 17.7458 20.6884C18.2375 20.6223 18.7087 20.4732 19.091 20.091C19.4732 19.7087 19.6223 19.2375 19.6884 18.7458C19.7501 18.2871 19.75 17.7142 19.75 17.0494L19.75 17C19.75 16.5858 19.4142 16.25 19 16.25C18.5858 16.25 18.25 16.5858 18.25 17C18.25 17.7283 18.2484 18.1991 18.2018 18.546C18.158 18.8713 18.0874 18.9732 18.0303 19.0303C17.9732 19.0874 17.8713 19.158 17.546 19.2018C17.1991 19.2484 16.7283 19.25 16 19.25H14.75Z',
  d25: 'M7.95063 3.25C7.28577 3.24996 6.7129 3.24993 6.25416 3.31161C5.76252 3.37771 5.29126 3.52677 4.90901 3.90901C4.52677 4.29126 4.37771 4.76252 4.31161 5.25416C4.24994 5.71289 4.24997 6.28574 4.25 6.95058L4.25001 7C4.25001 7.41422 4.58579 7.75 5.00001 7.75C5.41422 7.75 5.75001 7.41422 5.75001 7C5.75001 6.27169 5.7516 5.80091 5.79823 5.45403C5.84197 5.12873 5.91258 5.02677 5.96968 4.96967C6.02677 4.91258 6.12873 4.84197 6.45403 4.79823C6.80091 4.7516 7.2717 4.75 8.00001 4.75H9.25V3.25L7.95063 3.25Z',
  d26: 'M16 4.75C16.7283 4.75 17.1991 4.7516 17.546 4.79823C17.8713 4.84197 17.9732 4.91258 18.0303 4.96967C18.0874 5.02677 18.158 5.12873 18.2018 5.45403C18.2484 5.80091 18.25 6.27169 18.25 7C18.25 7.41422 18.5858 7.75 19 7.75C19.4142 7.75 19.75 7.41422 19.75 7L19.75 6.95064C19.75 6.28577 19.7501 5.71291 19.6884 5.25416C19.6223 4.76252 19.4732 4.29126 19.091 3.90901C18.7087 3.52677 18.2375 3.37771 17.7458 3.31161C17.2871 3.24993 16.7142 3.24996 16.0494 3.25L14.75 3.25V4.75H16Z',
  d27: 'M10 2V1.25H9.25V2H10ZM14 2H14.75V1.25H14V2ZM14 6V6.75H14.75V6H14ZM10 6H9.25V6.75H10V6ZM10 2.75H14V1.25H10V2.75ZM13.25 2V6H14.75V2H13.25ZM14 5.25H10V6.75H14V5.25ZM10.75 6V2H9.25V6H10.75Z',
  d28: 'M10 18V17.25H9.25V18H10ZM14 18H14.75V17.25H14V18ZM14 22V22.75H14.75V22H14ZM10 22H9.25V22.75H10V22ZM10 18.75H14V17.25H10V18.75ZM13.25 18V22H14.75V18H13.25ZM14 21.25H10V22.75H14V21.25ZM10.75 22V18H9.25V22H10.75Z',
  d29: 'M3 10V9.25H2.25V10H3ZM7 10H7.75V9.25H7V10ZM7 14V14.75H7.75V14H7ZM3 14H2.25V14.75H3V14ZM3 10.75H7V9.25H3V10.75ZM6.25 10V14H7.75V10H6.25ZM7 13.25H3V14.75H7V13.25ZM3.75 14V10H2.25V14H3.75Z',
  d30: 'M17 10V9.25H16.25V10H17ZM21 10H21.75V9.25H21V10ZM21 14V14.75H21.75V14H21ZM17 14H16.25V14.75H17V14ZM17 10.75H21V9.25H17V10.75ZM20.25 10V14H21.75V10H20.25ZM21 13.25H17V14.75H21V13.25ZM17.75 14V10H16.25V14H17.75Z',
  d31: 'M14 4H19V7',
  d32: 'M10 4.75H10.75V3.25H10V4.75ZM5 4V3.25H4.25V4H5ZM4.25 7V7.75H5.75V7H4.25ZM10 3.25H5V4.75H10V3.25ZM4.25 4V7H5.75V4H4.25Z',
  d33: 'M14 19.25H13.25V20.75H14V19.25ZM19 20V20.75H19.75V20H19ZM19.75 17V16.25H18.25V17H19.75ZM14 20.75H19V19.25H14V20.75ZM19.75 20V17H18.25V20H19.75Z',
  d34: 'M10 20.75H10.75V19.25H10V20.75ZM5 20H4.25V20.75H5V20ZM5.75 17V16.25H4.25V17H5.75ZM10 19.25H5V20.75H10V19.25ZM5.75 20V17H4.25V20H5.75Z',
  d35: 'M9.25 1.25H14.75V6.75H9.25V1.25Z',
  d36: 'M9.25 17.25H14.75V22.75H9.25V17.25Z',
  d37: 'M2.25 9.25H7.75V14.75H2.25V9.25Z',
  d38: 'M16.25 9.25H21.75V14.75H16.25V9.25Z',
  d39: 'M13.25 3.25H19.75V7.75H18.25V4.75H13.25V3.25Z',
  d40: 'M4.25 3.25H10.75V4.75H5.75V7.75H4.25V3.25Z',
  d41: 'M19.75 16.25V20.75H13.25V19.25H18.25V16.25H19.75Z',
  d42: 'M5.75 16.25V19.25H10.75V20.75H4.25V16.25H5.75Z',
  d43: 'M9.25 11.25H14.75V12.75H9.25V11.25Z',
};

export const IconFrameworksStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="frameworks-stroke-rounded IconFrameworksStrokeRounded"
    >
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
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
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFrameworksDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="frameworks-duotone-rounded IconFrameworksDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
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
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFrameworksTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="frameworks-twotone-rounded IconFrameworksTwotoneRounded"
    >
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
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
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFrameworksSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="frameworks-solid-rounded IconFrameworksSolidRounded"
    >
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
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

export const IconFrameworksBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="frameworks-bulk-rounded IconFrameworksBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFrameworksStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="frameworks-stroke-sharp IconFrameworksStrokeSharp"
    >
      <path 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d28} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d29} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d30} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d31} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d32} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d33} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d34} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFrameworksSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="frameworks-solid-sharp IconFrameworksSolidSharp"
    >
      <path 
        d={d.d35} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d36} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d37} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d38} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d39} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d40} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d41} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d42} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d43} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFrameworks: TheIconSelfPack = {
  name: 'Frameworks',
  StrokeRounded: IconFrameworksStrokeRounded,
  DuotoneRounded: IconFrameworksDuotoneRounded,
  TwotoneRounded: IconFrameworksTwotoneRounded,
  SolidRounded: IconFrameworksSolidRounded,
  BulkRounded: IconFrameworksBulkRounded,
  StrokeSharp: IconFrameworksStrokeSharp,
  SolidSharp: IconFrameworksSolidSharp,
};