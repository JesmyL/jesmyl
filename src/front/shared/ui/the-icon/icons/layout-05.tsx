import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28248 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28248 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088Z',
  d2: 'M2.5 9L21.5 9',
  d3: 'M16 21.5L16 9',
  d4: 'M8 21.5L8 9',
  d5: 'M3.88734 20.1127C5.27858 21.5039 7.51775 21.5039 11.9961 21.5039C16.4744 21.5039 18.7136 21.5039 20.1049 20.1127C21.4961 18.7214 21.4961 16.4822 21.4961 12.0039L21.4961 9.00391L2.51884 9.00391C2.49609 9.87482 2.49609 10.8672 2.49609 12.0039C2.49609 16.4822 2.49609 18.7214 3.88734 20.1127Z',
  d6: 'M1.5 11.9257V12.0746C1.49998 14.2505 1.49996 15.9853 1.68282 17.3454C1.87164 18.7498 2.27175 19.9036 3.18414 20.816C4.09653 21.7284 5.25033 22.1285 6.65471 22.3173C6.83878 22.342 7 22.1969 7 22.0112L7 11.0001C7 10.5287 7 10.293 6.85355 10.1466C6.70711 10.0001 6.47141 10.0001 6 10.0001H2.49623C2.02855 10.0001 1.79471 10.0001 1.64832 10.1462C1.50193 10.2923 1.50148 10.5251 1.50058 10.9907C1.49999 11.2929 1.5 11.6045 1.5 11.9257ZM22.4994 10.9907C22.4985 10.5251 22.4981 10.2923 22.3517 10.1462C22.2053 10.0001 21.9715 10.0001 21.5038 10.0001H18C17.5286 10.0001 17.2929 10.0001 17.1464 10.1466C17 10.293 17 10.5287 17 11.0001L17 22.0112C17 22.1969 17.1612 22.342 17.3453 22.3173C18.7497 22.1285 19.9035 21.7284 20.8159 20.816C21.7283 19.9036 22.1284 18.7498 22.3172 17.3454C22.5 15.9853 22.5 14.2505 22.5 12.0745V11.9257C22.5 11.6045 22.5 11.2929 22.4994 10.9907ZM14.0256 22.4942C14.4823 22.4897 14.7106 22.4875 14.8553 22.3413C15 22.1952 15 21.9645 15 21.5031L15 11.0001C15 10.5287 15 10.293 14.8536 10.1466C14.7071 10.0001 14.4714 10.0001 14 10.0001L10 10.0001C9.5286 10.0001 9.29289 10.0001 9.14645 10.1466C9 10.293 9 10.5287 9 11.0001L9 21.5031C9 21.9645 9 22.1952 9.14472 22.3413C9.28944 22.4875 9.51775 22.4897 9.97436 22.4942C10.5812 22.5001 11.2309 22.5001 11.9255 22.5001H12.0745C12.7691 22.5001 13.4188 22.5001 14.0256 22.4942Z',
  d7: 'M1.64615 6.94654C1.59242 7.42669 1.56556 7.66676 1.71463 7.83344C1.8637 8.00012 2.11512 8.00012 2.61797 8.00012H21.3804C21.8832 8.00012 22.1346 8.00012 22.2837 7.83344C22.4328 7.66676 22.4059 7.42669 22.3522 6.94654C22.3411 6.84745 22.3292 6.75022 22.3163 6.65483C22.1275 5.25046 21.7274 4.09665 20.815 3.18426C19.9026 2.27187 18.7488 1.87176 17.3444 1.68295C15.9843 1.50008 14.2496 1.5001 12.0736 1.50012L11.9247 1.50012C9.74875 1.5001 8.01401 1.50008 6.65387 1.68295C5.24949 1.87176 4.09569 2.27187 3.1833 3.18426C2.27091 4.09665 1.8708 5.25046 1.68198 6.65484C1.66916 6.75022 1.65724 6.84745 1.64615 6.94654Z',
  d8: 'M3 21H21V3H3V21Z',
  d9: 'M3 9L21 9',
  d10: 'M16 21L16 9',
  d11: 'M8 21L8 9',
  d12: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V8H21.75V3C21.75 2.58579 21.4142 2.25 21 2.25H3Z',
  d13: 'M21.75 10H17V21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V10Z',
  d14: 'M15 21.75V10H9V21.75H15Z',
  d15: 'M7 21.75V10H2.25V21C2.25 21.4142 2.58579 21.75 3 21.75H7Z',
};

export const IconLayout05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout05 StrokeRounded"
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
      <path 
        d={d.d4}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayout05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout05 DuotoneRounded"
    >
      <path 
        d={d.d5}
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
      <path 
        d={d.d4}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayout05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout05 TwotoneRounded"
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
      <path 
        d={d.d4}
        i-c="o7 s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayout05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout05 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLayout05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout05 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLayout05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout05 StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s sj sw"
      />
      <path 
        d={d.d9}
        i-c="s sw"
      />
      <path 
        d={d.d10}
        i-c="s sw"
      />
      <path 
        d={d.d11}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayout05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout05 SolidSharp"
    >
      <path 
        d={d.d12}
        i-c="f"
      />
      <path 
        d={d.d13}
        i-c="f"
      />
      <path 
        d={d.d14}
        i-c="f"
      />
      <path 
        d={d.d15}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLayout05: TheIconSelfPack = [
  'Layout05',
  IconLayout05StrokeRounded,
  IconLayout05DuotoneRounded,
  IconLayout05TwotoneRounded,
  IconLayout05SolidRounded,
  IconLayout05BulkRounded,
  IconLayout05StrokeSharp,
  IconLayout05SolidSharp,
];