import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14.9531 12.3948C14.8016 13.0215 14.0857 13.4644 12.6539 14.3502C11.2697 15.2064 10.5777 15.6346 10.0199 15.4625C9.78934 15.3913 9.57925 15.2562 9.40982 15.07C9 14.6198 9 13.7465 9 12C9 10.2535 9 9.38018 9.40982 8.92995C9.57925 8.74381 9.78934 8.60868 10.0199 8.53753C10.5777 8.36544 11.2697 8.79357 12.6539 9.64983C14.0857 10.5356 14.8016 10.9785 14.9531 11.6052C15.0156 11.8639 15.0156 12.1361 14.9531 12.3948Z',
  d2: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d3: 'M3.89124 3.89124C2.5 5.28249 2.5 7.52166 2.5 12C2.5 16.4783 2.5 18.7175 3.89124 20.1088C5.28249 21.5 7.52166 21.5 12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.1088C21.5 18.7175 21.5 16.4783 21.5 12C21.5 7.52166 21.5 5.28249 20.1088 3.89124C18.7175 2.5 16.4783 2.5 12 2.5C7.52166 2.5 5.28249 2.5 3.89124 3.89124ZM12.6539 14.3502C14.0857 13.4644 14.8016 13.0215 14.9531 12.3948C15.0156 12.1361 15.0156 11.8639 14.9531 11.6052C14.8016 10.9785 14.0857 10.5356 12.6539 9.64983C11.2697 8.79357 10.5777 8.36544 10.0199 8.53753C9.78934 8.60868 9.57925 8.74381 9.40982 8.92995C9 9.38018 9 10.2535 9 12C9 13.7465 9 14.6198 9.40982 15.07C9.57925 15.2562 9.78934 15.3913 10.0199 15.4625C10.5777 15.6346 11.2697 15.2064 12.6539 14.3502Z',
  d4: 'M11.9273 1.75012H12.0727H12.0727C14.1968 1.7501 15.8903 1.75008 17.218 1.92859C18.589 2.11291 19.7153 2.50349 20.606 3.39416C21.4966 4.28483 21.8872 5.41116 22.0715 6.7821C22.25 8.10986 22.25 9.80329 22.25 11.9275V12.0728C22.25 14.197 22.25 15.8904 22.0715 17.2181C21.8872 18.5891 21.4966 19.7154 20.606 20.6061C19.7153 21.4967 18.589 21.8873 17.218 22.0717C15.8903 22.2502 14.1968 22.2501 12.0727 22.2501H11.9273C9.80317 22.2501 8.10974 22.2502 6.78198 22.0717C5.41104 21.8873 4.28471 21.4967 3.39404 20.6061C2.50337 19.7154 2.11279 18.5891 1.92847 17.2181C1.74996 15.8904 1.74998 14.197 1.75 12.0728V12.0728V11.9274V11.9274C1.74998 9.80325 1.74996 8.10985 1.92847 6.7821C2.11279 5.41116 2.50337 4.28483 3.39404 3.39416C4.28471 2.50349 5.41104 2.11291 6.78198 1.92859C8.10973 1.75008 9.80316 1.7501 11.9273 1.75012H11.9273ZM13.1276 8.76715L13.1277 8.76716L13.2308 8.83094L13.2308 8.83096C13.9033 9.24692 14.4825 9.60522 14.9061 9.94215C15.3458 10.2919 15.7713 10.7342 15.9251 11.3704C16.025 11.7835 16.025 12.2167 15.9251 12.6298C15.7713 13.2661 15.3458 13.7084 14.9061 14.0581C14.4825 14.395 13.9033 14.7533 13.2308 15.1693L13.1277 15.2331C12.4804 15.6335 11.9183 15.9813 11.4473 16.1995C10.9678 16.4216 10.3671 16.6162 9.72509 16.4181C9.31618 16.292 8.95465 16.0557 8.67031 15.7433C8.24275 15.2736 8.11346 14.6719 8.05659 14.1246C7.99995 13.5797 7.99997 12.8814 8 12.0549V11.9453C7.99997 11.1188 7.99995 10.4206 8.05659 9.87561C8.11346 9.32832 8.24275 8.72665 8.6703 8.25693C8.95465 7.94455 9.31618 7.70828 9.72509 7.58211C10.3671 7.384 10.9678 7.57869 11.4473 7.80076C11.9183 8.01892 12.4804 8.36671 13.1276 8.76715Z',
  d5: 'M12.0727 1.75012H11.9273C9.80316 1.7501 8.10973 1.75008 6.78198 1.92859C5.41104 2.11291 4.28471 2.50349 3.39404 3.39416C2.50337 4.28483 2.11279 5.41116 1.92847 6.7821C1.74996 8.10985 1.74998 9.80327 1.75 11.9274V12.0728C1.74998 14.197 1.74996 15.8904 1.92847 17.2181C2.11279 18.5891 2.50337 19.7154 3.39404 20.6061C4.28471 21.4967 5.41104 21.8873 6.78198 22.0717C8.10974 22.2502 9.80317 22.2501 11.9273 22.2501H12.0727C14.1968 22.2501 15.8903 22.2502 17.218 22.0717C18.589 21.8873 19.7153 21.4967 20.606 20.6061C21.4966 19.7154 21.8872 18.5891 22.0715 17.2181C22.25 15.8904 22.25 14.197 22.25 12.0728V11.9275C22.25 9.80329 22.25 8.10986 22.0715 6.7821C21.8872 5.41116 21.4966 4.28483 20.606 3.39416C19.7153 2.50349 18.589 2.11291 17.218 1.92859C15.8903 1.75008 14.1968 1.7501 12.0727 1.75012Z',
  d6: 'M13.1277 8.76722C12.4804 8.36678 11.9183 8.01898 11.4473 7.80082C10.9678 7.57875 10.3671 7.38406 9.72509 7.58217C9.31618 7.70834 8.95465 7.94461 8.67031 8.25699C8.24275 8.72671 8.11347 9.32838 8.05659 9.87567C7.99995 10.4206 7.99998 11.1188 8 11.9454V12.0549C7.99998 12.8815 7.99995 13.5798 8.05659 14.1247C8.11347 14.672 8.24275 15.2737 8.67031 15.7434C8.95465 16.0558 9.31618 16.292 9.72509 16.4182C10.3671 16.6163 10.9678 16.4216 11.4473 16.1995C11.9183 15.9814 12.4804 15.6336 13.1277 15.2331L13.2308 15.1694C13.9033 14.7534 14.4825 14.3951 14.9061 14.0582C15.3458 13.7084 15.7713 13.2661 15.9251 12.6299C16.025 12.2168 16.025 11.7836 15.9251 11.3705C15.7713 10.7342 15.3458 10.2919 14.9061 9.94221C14.4825 9.60528 13.9033 9.24697 13.2308 8.831L13.1277 8.76722Z',
  d7: 'M9.5 16V8L16 12L9.5 16Z',
  d8: 'M21 21V3H3V21H21Z',
  d9: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H3ZM9.25 7.5L16.75 12L9.25 16.5V7.5Z',
};

export const IconPlaySquareStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-square-stroke-rounded IconPlaySquareStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPlaySquareDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-square-duotone-rounded IconPlaySquareDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPlaySquareTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-square-twotone-rounded IconPlaySquareTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPlaySquareSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-square-solid-rounded IconPlaySquareSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPlaySquareBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-square-bulk-rounded IconPlaySquareBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPlaySquareStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-square-stroke-sharp IconPlaySquareStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPlaySquareSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-square-solid-sharp IconPlaySquareSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPlaySquare: TheIconSelfPack = {
  name: 'PlaySquare',
  StrokeRounded: IconPlaySquareStrokeRounded,
  DuotoneRounded: IconPlaySquareDuotoneRounded,
  TwotoneRounded: IconPlaySquareTwotoneRounded,
  SolidRounded: IconPlaySquareSolidRounded,
  BulkRounded: IconPlaySquareBulkRounded,
  StrokeSharp: IconPlaySquareStrokeSharp,
  SolidSharp: IconPlaySquareSolidSharp,
};