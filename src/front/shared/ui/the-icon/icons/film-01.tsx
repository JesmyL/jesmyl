import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M2.5 7H21.5',
  d3: 'M2.5 17H21.5',
  d4: 'M12 17L12 7',
  d5: 'M8 7L8 3M16 7L16 3',
  d6: 'M8 21L8 17M16 21L16 17',
  d7: 'M2.64733 7C2.5 8.26368 2.5 9.88124 2.5 12C2.5 14.1188 2.5 15.7363 2.64733 17L21.3527 17C21.5 15.7363 21.5 14.1188 21.5 12C21.5 9.88124 21.5 8.26368 21.3527 7H2.64733Z',
  d8: 'M3 11.5C3 7.02166 3 4.78249 4.39124 3.39124C5.78249 2 8.02166 2 12.5 2C16.9783 2 19.2175 2 20.6088 3.39124C22 4.78249 22 7.02166 22 11.5C22 15.9783 22 18.2175 20.6088 19.6088C19.2175 21 16.9783 21 12.5 21C8.02166 21 5.78249 21 4.39124 19.6088C3 18.2175 3 15.9783 3 11.5Z',
  d9: 'M3 6.5H22',
  d10: 'M3 16.5H22',
  d11: 'M12.5 16.5L12.5 6.5',
  d12: 'M8.5 6.5L8.5 2.5M16.5 6.5L16.5 2.5',
  d13: 'M8.5 20.5L8.5 16.5M16.5 20.5L16.5 16.5',
  d14: 'M1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.75212 22.25 11.9428 22.25H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V11.9428C22.25 9.75214 22.25 8.03143 22.0694 6.68802C21.8843 5.31136 21.4973 4.21911 20.6391 3.36091C19.7809 2.50271 18.6886 2.11568 17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H12.0572H11.9428H11.9428C9.75213 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50271 3.36091 3.36091C2.50271 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428ZM11.0001 14.9998C11.0001 15.4713 11.0001 15.707 10.8537 15.8534C10.7072 15.9998 10.4715 15.9998 10.0001 15.9998L4.2564 15.9998H4.25639C3.80822 15.9998 3.58414 15.9998 3.43859 15.8583C3.29303 15.7167 3.28693 15.4974 3.27472 15.0588C3.25056 14.1905 3.25012 13.1829 3.25012 11.9998C3.25012 10.8168 3.25056 9.80923 3.27472 8.94091C3.28693 8.50228 3.29303 8.28297 3.43859 8.14141C3.58414 7.99985 3.80823 7.99985 4.2564 7.99985H10.0001C10.4715 7.99985 10.7072 7.99985 10.8537 8.14629C11.0001 8.29274 11.0001 8.52844 11.0001 8.99985L11.0001 14.9998ZM13.0001 8.99985V8.99984C13.0001 8.52844 13.0001 8.29274 13.1466 8.14629C13.293 7.99985 13.5287 7.99985 14.0001 7.99985H19.7438C20.192 7.99985 20.4161 7.99985 20.5617 8.14141C20.7072 8.28297 20.7133 8.50228 20.7255 8.94091C20.7497 9.80923 20.7501 10.8168 20.7501 11.9998C20.7501 13.1829 20.7497 14.1905 20.7255 15.0588C20.7133 15.4974 20.7072 15.7167 20.5617 15.8583C20.4161 15.9998 20.192 15.9998 19.7438 15.9998L14.0001 15.9998C13.5287 15.9998 13.293 15.9998 13.1466 15.8534C13.0001 15.707 13.0001 15.4713 13.0001 14.9999V14.9998L13.0001 8.99985ZM8.93804 3.55959C8.87661 3.50057 8.78043 3.50441 8.58808 3.5121C8.14563 3.52978 7.7312 3.55547 7.35306 3.59281C7.18899 3.609 7.10695 3.6171 7.05517 3.67417C7.00339 3.73123 7.00327 3.81544 7.00303 3.98386V3.98387L7.00003 6.09771C6.99977 6.28651 6.99963 6.38092 7.05823 6.4396C7.11682 6.49828 7.21123 6.49828 7.40003 6.49828H8.59947C8.78803 6.49828 8.88231 6.49828 8.94089 6.4397C8.99947 6.38112 8.99947 6.28684 8.99947 6.09828L8.99947 3.90971C8.99947 3.71565 8.99947 3.61862 8.93804 3.55959ZM15.0609 3.55959C15.1223 3.50057 15.2185 3.50441 15.4108 3.5121C15.8533 3.52978 16.2677 3.55547 16.6459 3.59281C16.8099 3.609 16.892 3.6171 16.9438 3.67417C16.9955 3.73123 16.9957 3.81544 16.9959 3.98387L16.9989 6.09771C16.9992 6.28651 16.9993 6.38092 16.9407 6.4396C16.8821 6.49828 16.7877 6.49828 16.5989 6.49828H15.3995C15.2109 6.49828 15.1166 6.49828 15.058 6.4397C14.9995 6.38112 14.9995 6.28684 14.9995 6.09828V3.90971C14.9995 3.71565 14.9995 3.61862 15.0609 3.55959ZM8.58808 20.4843C8.78043 20.4919 8.8766 20.4958 8.93804 20.4368C8.99947 20.3777 8.99947 20.2807 8.99947 20.0867V17.8981C8.99947 17.7095 8.99947 17.6152 8.94089 17.5567C8.88231 17.4981 8.78803 17.4981 8.59947 17.4981H7.40003C7.21123 17.4981 7.11682 17.4981 7.05823 17.5568C6.99963 17.6154 6.99977 17.7098 7.00003 17.8987L7.00303 20.0125C7.00327 20.1809 7.00339 20.2651 7.05517 20.3222C7.10695 20.3793 7.18899 20.3874 7.35306 20.4036C7.7312 20.4409 8.14563 20.4666 8.58808 20.4843ZM15.0609 20.4368C15.1223 20.4958 15.2185 20.4919 15.4108 20.4843C15.8533 20.4666 16.2677 20.4409 16.6459 20.4036C16.8099 20.3874 16.892 20.3793 16.9438 20.3222C16.9955 20.2651 16.9957 20.1809 16.9959 20.0125L16.9989 17.8987C16.9992 17.7098 16.9993 17.6154 16.9407 17.5568C16.8821 17.4981 16.7877 17.4981 16.5989 17.4981H15.3995C15.2109 17.4981 15.1166 17.4981 15.058 17.5567C14.9995 17.6152 14.9995 17.7095 14.9995 17.8981V20.0867C14.9995 20.2807 14.9995 20.3777 15.0609 20.4368Z',
  d15: 'M1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.75212 22.25 11.9428 22.25H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V11.9428C22.25 9.75214 22.25 8.03143 22.0694 6.68802C21.8843 5.31136 21.4973 4.21911 20.6391 3.36091C19.7809 2.50271 18.6886 2.11568 17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75213 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50271 3.36091 3.36091C2.50271 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428Z',
  d16: 'M11 14.9998C11 15.4712 11 15.7069 10.8536 15.8533C10.7071 15.9998 10.4714 15.9998 10 15.9998L4.25628 15.9998C3.8081 15.9998 3.58402 15.9998 3.43846 15.8582C3.2929 15.7166 3.2868 15.4973 3.2746 15.0587C3.25044 14.1904 3.25 13.1828 3.25 11.9998C3.25 10.8167 3.25044 9.80914 3.2746 8.94082C3.2868 8.50219 3.2929 8.28288 3.43846 8.14132C3.58402 7.99976 3.80811 7.99976 4.25628 7.99976H10C10.4714 7.99976 10.7071 7.99976 10.8536 8.1462C11 8.29265 11 8.52835 11 8.99976L11 14.9998Z',
  d17: 'M13 8.99976C13 8.52835 13 8.29265 13.1464 8.1462C13.2929 7.99976 13.5286 7.99976 14 7.99976H19.7437C20.1919 7.99976 20.416 7.99976 20.5615 8.14132C20.7071 8.28288 20.7132 8.50219 20.7254 8.94082C20.7496 9.80915 20.75 10.8167 20.75 11.9998C20.75 13.1828 20.7496 14.1904 20.7254 15.0587C20.7132 15.4973 20.7071 15.7166 20.5615 15.8582C20.416 15.9998 20.1919 15.9998 19.7437 15.9998L14 15.9998C13.5286 15.9998 13.2929 15.9998 13.1464 15.8533C13 15.7069 13 15.4712 13 14.9998L13 8.99976Z',
  d18: 'M8.58808 3.5121C8.78043 3.50441 8.87661 3.50057 8.93804 3.55959C8.99947 3.61862 8.99947 3.71565 8.99947 3.90971L8.99947 6.09828C8.99947 6.28684 8.99947 6.38112 8.94089 6.4397C8.88231 6.49828 8.78803 6.49828 8.59947 6.49828H7.40003C7.21123 6.49828 7.11682 6.49828 7.05823 6.4396C6.99963 6.38092 6.99977 6.28651 7.00003 6.09771L7.00303 3.98387C7.00327 3.81544 7.00339 3.73123 7.05517 3.67417C7.10695 3.6171 7.18899 3.609 7.35306 3.59281C7.73121 3.55547 8.14563 3.52978 8.58808 3.5121Z',
  d19: 'M15.4108 3.5121C15.2185 3.50441 15.1223 3.50057 15.0609 3.55959C14.9995 3.61862 14.9995 3.71565 14.9995 3.90971V6.09828C14.9995 6.28684 14.9995 6.38112 15.058 6.4397C15.1166 6.49828 15.2109 6.49828 15.3995 6.49828H16.5989C16.7877 6.49828 16.8821 6.49828 16.9407 6.4396C16.9993 6.38092 16.9992 6.28651 16.9989 6.09771L16.9959 3.98387C16.9957 3.81544 16.9955 3.73123 16.9438 3.67417C16.892 3.6171 16.8099 3.609 16.6459 3.59281C16.2677 3.55547 15.8533 3.52978 15.4108 3.5121Z',
  d20: 'M8.58808 20.4843C8.78043 20.4919 8.8766 20.4958 8.93804 20.4368C8.99947 20.3777 8.99947 20.2807 8.99947 20.0867L8.99947 17.8981C8.99947 17.7095 8.99947 17.6152 8.94089 17.5567C8.88231 17.4981 8.78803 17.4981 8.59947 17.4981H7.40003C7.21123 17.4981 7.11682 17.4981 7.05823 17.5568C6.99963 17.6154 6.99977 17.7098 7.00003 17.8987L7.00303 20.0125C7.00327 20.1809 7.00339 20.2651 7.05517 20.3222C7.10695 20.3793 7.18899 20.3874 7.35306 20.4036C7.7312 20.4409 8.14563 20.4666 8.58808 20.4843Z',
  d21: 'M15.4108 20.4843C15.2185 20.4919 15.1223 20.4958 15.0609 20.4368C14.9995 20.3777 14.9995 20.2807 14.9995 20.0867V17.8981C14.9995 17.7095 14.9995 17.6152 15.058 17.5567C15.1166 17.4981 15.2109 17.4981 15.3995 17.4981H16.5989C16.7877 17.4981 16.8821 17.4981 16.9407 17.5568C16.9993 17.6154 16.9992 17.7098 16.9989 17.8987L16.9959 20.0125C16.9957 20.1809 16.9955 20.2651 16.9438 20.3222C16.892 20.3793 16.8099 20.3874 16.6459 20.4036C16.2677 20.4409 15.8533 20.4666 15.4108 20.4843Z',
  d22: 'M2 7H22',
  d23: 'M2 17H22',
  d24: 'M21.5 21.5V2.5H2.5V21.5H21.5Z',
  d25: 'M2.72619 1.75C2.18706 1.75 1.75 2.18706 1.75 2.72619V21.2738C1.75 21.8129 2.18706 22.25 2.72619 22.25H21.2738C21.8129 22.25 22.25 21.8129 22.25 21.2738V2.72619C22.25 2.18706 21.8129 1.75 21.2738 1.75H2.72619ZM3.70312 16V8H11V16H3.70312ZM13 16H20.2984V8H13V16ZM7 3.70215V6H9L9 3.70215H7ZM17 3.70215L17 6H15V3.70215H17ZM7 18V20.2976H9V18H7ZM15 18V20.2976H17L17 18H15Z',
};

export const IconFilm01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="film-01-stroke-rounded IconFilm01StrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconFilm01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="film-01-duotone-rounded IconFilm01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconFilm01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="film-01-twotone-rounded IconFilm01TwotoneRounded"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFilm01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="film-01-solid-rounded IconFilm01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFilm01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="film-01-bulk-rounded IconFilm01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconFilm01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="film-01-stroke-sharp IconFilm01StrokeSharp"
    >
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d23} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d24} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFilm01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="film-01-solid-sharp IconFilm01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFilm01: TheIconSelfPack = {
  name: 'Film01',
  StrokeRounded: IconFilm01StrokeRounded,
  DuotoneRounded: IconFilm01DuotoneRounded,
  TwotoneRounded: IconFilm01TwotoneRounded,
  SolidRounded: IconFilm01SolidRounded,
  BulkRounded: IconFilm01BulkRounded,
  StrokeSharp: IconFilm01StrokeSharp,
  SolidSharp: IconFilm01SolidSharp,
};