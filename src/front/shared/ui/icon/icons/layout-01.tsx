import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28248 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28248 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088Z',
  d2: 'M2.5 9L21.5 9',
  d3: 'M8 21.5L8 9',
  d4: 'M3.89124 20.1088C5.28249 21.5 7.52166 21.5 12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.1088C21.5 18.7175 21.5 16.4783 21.5 12V9H2.52275C2.5 9.87091 2.5 10.8633 2.5 12C2.5 16.4783 2.5 18.7175 3.89124 20.1088Z',
  d5: 'M1.5 11.9255V12.0745C1.49998 14.2504 1.49996 15.9852 1.68282 17.3453C1.87164 18.7497 2.27175 19.9035 3.18414 20.8159C4.09653 21.7283 5.25033 22.1284 6.65471 22.3172C6.83878 22.3419 7 22.1968 7 22.0111V11C7 10.5286 7 10.2929 6.85355 10.1464C6.70711 10 6.47141 10 6 10H2.49623C2.02855 10 1.79471 10 1.64832 10.1461C1.50193 10.2922 1.50148 10.525 1.50058 10.9905C1.49999 11.2927 1.5 11.6043 1.5 11.9255ZM22.4994 10.9905C22.4985 10.525 22.4981 10.2922 22.3517 10.1461C22.2053 10 21.9715 10 21.5038 10L10 10C9.5286 10 9.29289 10 9.14645 10.1464C9 10.2929 9 10.5286 9 11V21.503C9 21.9644 9 22.1951 9.14472 22.3412C9.28944 22.4874 9.51775 22.4896 9.97436 22.4941C10.5812 22.5 11.2309 22.5 11.9255 22.5H12.0745C14.2504 22.5 15.9852 22.5 17.3453 22.3172C18.7497 22.1284 19.9035 21.7283 20.8159 20.8159C21.7283 19.9035 22.1284 18.7497 22.3172 17.3453C22.5 15.9851 22.5 14.2504 22.5 12.0744V11.9256C22.5 11.6043 22.5 11.2927 22.4994 10.9905Z',
  d6: 'M1.64615 6.94642C1.59242 7.42656 1.56556 7.66663 1.71463 7.83332C1.8637 8 2.11513 8 2.61797 8H21.3804C21.8832 8 22.1346 8 22.2837 7.83332C22.4328 7.66663 22.4059 7.42656 22.3522 6.94642C22.3411 6.84733 22.3292 6.7501 22.3163 6.65471C22.1275 5.25033 21.7274 4.09653 20.815 3.18414C19.9026 2.27175 18.7488 1.87164 17.3444 1.68282C15.9843 1.49996 14.2496 1.49998 12.0736 1.5L11.9247 1.5C9.74875 1.49998 8.01401 1.49996 6.65387 1.68282C5.24949 1.87164 4.09569 2.27175 3.1833 3.18414C2.27091 4.09653 1.8708 5.25033 1.68198 6.65471C1.66916 6.7501 1.65724 6.84733 1.64615 6.94642Z',
  d7: 'M3 21H21V3H3V21Z',
  d8: 'M3 9L21 9',
  d9: 'M8 21L8 9',
  d10: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V8H21.75V3C21.75 2.58579 21.4142 2.25 21 2.25H3Z',
  d11: 'M21.75 10H9V21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V10Z',
  d12: 'M7 21.75V10H2.25V21C2.25 21.4142 2.58579 21.75 3 21.75H7Z',
};

export const IconLayout01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-01-stroke-rounded IconLayout01StrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayout01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-01-duotone-rounded IconLayout01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayout01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-01-twotone-rounded IconLayout01TwotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayout01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-01-solid-rounded IconLayout01SolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconLayout01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-01-bulk-rounded IconLayout01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconLayout01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-01-stroke-sharp IconLayout01StrokeSharp"
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
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayout01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-01-solid-sharp IconLayout01SolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLayout01: TheIconSelfPack = {
  name: 'Layout01',
  StrokeRounded: IconLayout01StrokeRounded,
  DuotoneRounded: IconLayout01DuotoneRounded,
  TwotoneRounded: IconLayout01TwotoneRounded,
  SolidRounded: IconLayout01SolidRounded,
  BulkRounded: IconLayout01BulkRounded,
  StrokeSharp: IconLayout01StrokeSharp,
  SolidSharp: IconLayout01SolidSharp,
};