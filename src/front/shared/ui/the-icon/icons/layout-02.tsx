import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.1088 20.1088C21.5 18.7175 21.5 16.4783 21.5 12C21.5 7.52166 21.5 5.28249 20.1088 3.89124C18.7175 2.5 16.4783 2.5 12 2.5C7.52166 2.5 5.28249 2.5 3.89124 3.89124C2.5 5.28248 2.5 7.52166 2.5 12C2.5 16.4783 2.5 18.7175 3.89124 20.1088C5.28249 21.5 7.52166 21.5 12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.1088Z',
  d2: 'M21.5 9L2.5 9',
  d3: 'M16 21.5L16 9',
  d4: 'M3.89124 20.1088C5.28249 21.5 7.52166 21.5 12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.1088C21.5 18.7175 21.5 16.4783 21.5 12V9H2.52275C2.5 9.87091 2.5 10.8633 2.5 12C2.5 16.4783 2.5 18.7175 3.89124 20.1088Z',
  d5: 'M1.5 11.9257V12.0746C1.49998 14.2506 1.49996 15.9853 1.68282 17.3454C1.87164 18.7498 2.27175 19.9036 3.18414 20.816C4.09653 21.7284 5.25033 22.1285 6.65471 22.3173C8.01485 22.5002 9.74957 22.5001 11.9255 22.5001H12.0745C12.7691 22.5001 13.4188 22.5001 14.0256 22.4942C14.4823 22.4897 14.7106 22.4875 14.8553 22.3413C15 22.1952 15 21.9645 15 21.5031L15 11.0001C15 10.5287 15 10.293 14.8536 10.1466C14.7071 10.0001 14.4714 10.0001 14 10.0001H2.49623C2.02855 10.0001 1.79471 10.0001 1.64832 10.1462C1.50193 10.2923 1.50148 10.5251 1.50058 10.9907C1.49999 11.2929 1.5 11.6045 1.5 11.9257ZM22.4994 10.9907C22.4985 10.5251 22.4981 10.2923 22.3517 10.1462C22.2053 10.0001 21.9715 10.0001 21.5038 10.0001L18 10.0001C17.5286 10.0001 17.2929 10.0001 17.1464 10.1466C17 10.293 17 10.5287 17 11.0001L17 22.0112C17 22.1969 17.1612 22.342 17.3453 22.3173C18.7497 22.1285 19.9035 21.7284 20.8159 20.816C21.7283 19.9036 22.1284 18.7498 22.3172 17.3454C22.5 15.9853 22.5 14.2505 22.5 12.0745V11.9257C22.5 11.6045 22.5 11.2929 22.4994 10.9907Z',
  d6: 'M1.64615 6.94654C1.59242 7.42669 1.56556 7.66676 1.71463 7.83344C1.8637 8.00012 2.11512 8.00012 2.61797 8.00012L21.3804 8.00013C21.8832 8.00013 22.1346 8.00013 22.2837 7.83344C22.4328 7.66676 22.4059 7.42669 22.3522 6.94654C22.3411 6.84745 22.3292 6.75022 22.3163 6.65483C22.1275 5.25045 21.7274 4.09665 20.815 3.18426C19.9026 2.27187 18.7488 1.87176 17.3444 1.68295C15.9843 1.50008 14.2496 1.5001 12.0736 1.50012L11.9247 1.50012C9.74875 1.5001 8.01401 1.50008 6.65387 1.68295C5.24949 1.87176 4.09569 2.27187 3.1833 3.18426C2.27091 4.09665 1.8708 5.25046 1.68198 6.65484C1.66916 6.75022 1.65724 6.84745 1.64615 6.94654Z',
  d7: 'M3 21H21V3H3V21Z',
  d8: 'M21 9L3 9',
  d9: 'M16 21L16 9',
  d10: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V8H21.75V3C21.75 2.58579 21.4142 2.25 21 2.25H3Z',
  d11: 'M21.75 10H17V21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V10Z',
  d12: 'M15 21.75V10H2.25V21C2.25 21.4142 2.58579 21.75 3 21.75H15Z',
};

export const IconLayout02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayout02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout02 DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayout02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayout02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout02 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLayout02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout02 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLayout02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout02 StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sj sw"
      />
      <path 
        d={d.d8}
        i-c="s sj sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayout02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout02 SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="f"
      />
      <path 
        d={d.d11}
        i-c="f"
      />
      <path 
        d={d.d12}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLayout02: TheIconSelfPack = [
  'Layout02',
  IconLayout02StrokeRounded,
  IconLayout02DuotoneRounded,
  IconLayout02TwotoneRounded,
  IconLayout02SolidRounded,
  IconLayout02BulkRounded,
  IconLayout02StrokeSharp,
  IconLayout02SolidSharp,
];