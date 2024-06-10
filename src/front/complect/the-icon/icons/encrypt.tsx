import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 16L20 14H10.5322C9.7959 12.5183 8.26687 11.5 6.5 11.5C4.01471 11.5 2 13.5147 2 16C2 18.4852 4.01471 20.5 6.5 20.5C8.26685 20.5 9.79587 19.4817 10.5322 18H16.5L17.75 16.7073L19 18H20L22 16Z',
  d2: 'M6 16H7',
  d3: 'M3 3.5V8.5',
  d4: 'M6 7V5C6 4.17157 6.67157 3.5 7.5 3.5C8.32843 3.5 9 4.17157 9 5V7C9 7.82843 8.32843 8.5 7.5 8.5C6.67157 8.5 6 7.82843 6 7Z',
  d5: 'M12 3.5V8.5',
  d6: 'M15 3.5V8.5',
  d7: 'M18 7V5C18 4.17157 18.6716 3.5 19.5 3.5C20.3284 3.5 21 4.17157 21 5V7C21 7.82843 20.3284 8.5 19.5 8.5C18.6716 8.5 18 7.82843 18 7Z',
  d8: 'M6.5 10.75C3.6005 10.75 1.25 13.1005 1.25 16C1.25 18.8994 3.60049 21.25 6.5 21.25C8.39221 21.25 10.0494 20.2488 10.9728 18.75H16.5C16.7033 18.75 16.8978 18.6675 17.0392 18.5214L17.75 17.7862L18.4608 18.5214C18.6022 18.6675 18.7967 18.75 19 18.75H20C20.1989 18.75 20.3897 18.671 20.5303 18.5303L22.5303 16.5303C22.8232 16.2374 22.8232 15.7626 22.5303 15.4697L20.5303 13.4697C20.3897 13.329 20.1989 13.25 20 13.25H10.9729C10.0494 11.7511 8.39222 10.75 6.5 10.75ZM6 15.25C5.58579 15.25 5.25 15.5858 5.25 16C5.25 16.4142 5.58579 16.75 6 16.75H7C7.41421 16.75 7.75 16.4142 7.75 16C7.75 15.5858 7.41421 15.25 7 15.25H6Z',
  d9: 'M3 2.75C3.41421 2.75 3.75 3.08579 3.75 3.5V8.5C3.75 8.91421 3.41421 9.25 3 9.25C2.58579 9.25 2.25 8.91421 2.25 8.5V3.5C2.25 3.08579 2.58579 2.75 3 2.75Z',
  d10: 'M7.5 4.25C7.08579 4.25 6.75 4.58579 6.75 5V7C6.75 7.41421 7.08579 7.75 7.5 7.75C7.91421 7.75 8.25 7.41421 8.25 7V5C8.25 4.58579 7.91421 4.25 7.5 4.25ZM5.25 5C5.25 3.75736 6.25736 2.75 7.5 2.75C8.74264 2.75 9.75 3.75736 9.75 5V7C9.75 8.24264 8.74264 9.25 7.5 9.25C6.25736 9.25 5.25 8.24264 5.25 7V5Z',
  d11: 'M12 2.75C12.4142 2.75 12.75 3.08579 12.75 3.5V8.5C12.75 8.91421 12.4142 9.25 12 9.25C11.5858 9.25 11.25 8.91421 11.25 8.5V3.5C11.25 3.08579 11.5858 2.75 12 2.75Z',
  d12: 'M15 2.75C15.4142 2.75 15.75 3.08579 15.75 3.5V8.5C15.75 8.91421 15.4142 9.25 15 9.25C14.5858 9.25 14.25 8.91421 14.25 8.5V3.5C14.25 3.08579 14.5858 2.75 15 2.75Z',
  d13: 'M19.5 4.25C19.0858 4.25 18.75 4.58579 18.75 5V7C18.75 7.41421 19.0858 7.75 19.5 7.75C19.9142 7.75 20.25 7.41421 20.25 7V5C20.25 4.58579 19.9142 4.25 19.5 4.25ZM17.25 5C17.25 3.75736 18.2574 2.75 19.5 2.75C20.7426 2.75 21.75 3.75736 21.75 5V7C21.75 8.24264 20.7426 9.25 19.5 9.25C18.2574 9.25 17.25 8.24264 17.25 7V5Z',
  d14: 'M1.25 16C1.25 13.1005 3.6005 10.75 6.5 10.75C8.39222 10.75 10.0494 11.7511 10.9729 13.25H20C20.1989 13.25 20.3897 13.329 20.5303 13.4697L22.5303 15.4697C22.8232 15.7626 22.8232 16.2374 22.5303 16.5303L20.5303 18.5303C20.3897 18.671 20.1989 18.75 20 18.75H19C18.7967 18.75 18.6022 18.6675 18.4608 18.5214L17.75 17.7862L17.0392 18.5214C16.8978 18.6675 16.7033 18.75 16.5 18.75H10.9728C10.0494 20.2488 8.39221 21.25 6.5 21.25C3.60049 21.25 1.25 18.8994 1.25 16Z',
  d15: 'M5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H7C7.41421 15.25 7.75 15.5858 7.75 16C7.75 16.4142 7.41421 16.75 7 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16Z',
  d16: 'M6.5 10.75C3.6005 10.75 1.25 13.1005 1.25 16C1.25 18.8994 3.60049 21.25 6.5 21.25C8.39221 21.25 10.0494 20.2488 10.9728 18.75H16.5074L17.4393 17.7862L18.3713 18.75H20L22.75 16L20 13.25H10.9729C10.0494 11.7511 8.39222 10.75 6.5 10.75ZM7.75 15.25H5.25V16.75H7.75V15.25Z',
  d17: 'M3.75 2.75V9.25H2.25V2.75H3.75Z',
  d18: 'M12.75 2.75V9.25H11.25V2.75H12.75Z',
  d19: 'M15.75 2.75V9.25H14.25V2.75H15.75Z',
};

export const IconEncryptStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="encrypt-stroke-rounded IconEncryptStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconEncryptDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="encrypt-duotone-rounded IconEncryptDuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconEncryptTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="encrypt-twotone-rounded IconEncryptTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconEncryptSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="encrypt-solid-rounded IconEncryptSolidRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
    </TheIconWrapper>
  );
};

export const IconEncryptBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="encrypt-bulk-rounded IconEncryptBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
    </TheIconWrapper>
  );
};

export const IconEncryptStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="encrypt-stroke-sharp IconEncryptStrokeSharp"
    >
      <path 
        d={d.d1} 
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
        d={d.d5} 
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
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconEncryptSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="encrypt-solid-sharp IconEncryptSolidSharp"
    >
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
        d={d.d10} 
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
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfEncrypt: TheIconSelfPack = {
  name: 'Encrypt',
  StrokeRounded: IconEncryptStrokeRounded,
  DuotoneRounded: IconEncryptDuotoneRounded,
  TwotoneRounded: IconEncryptTwotoneRounded,
  SolidRounded: IconEncryptSolidRounded,
  BulkRounded: IconEncryptBulkRounded,
  StrokeSharp: IconEncryptStrokeSharp,
  SolidSharp: IconEncryptSolidSharp,
};