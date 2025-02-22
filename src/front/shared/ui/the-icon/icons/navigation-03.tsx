import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.922 4.79004C16.6963 3.16245 19.0834 2.34866 20.3674 3.63261C21.6513 4.91656 20.8375 7.30371 19.21 12.078L18.1016 15.3292C16.8517 18.9958 16.2267 20.8291 15.1964 20.9808C14.9195 21.0216 14.6328 20.9971 14.3587 20.9091C13.3395 20.5819 12.8007 18.6489 11.7231 14.783C11.4841 13.9255 11.3646 13.4967 11.0924 13.1692C11.0134 13.0742 10.9258 12.9866 10.8308 12.9076C10.5033 12.6354 10.0745 12.5159 9.21705 12.2769C5.35111 11.1993 3.41814 10.6605 3.0909 9.64127C3.00292 9.36724 2.97837 9.08053 3.01916 8.80355C3.17088 7.77332 5.00419 7.14834 8.6708 5.89838L11.922 4.79004Z',
  d2: 'M10.9676 13C10.9239 12.9565 10.8783 12.915 10.8308 12.8756C10.5033 12.6043 10.0745 12.4852 9.21705 12.247C5.35111 11.1729 3.41814 10.6358 3.0909 9.61983C3.00292 9.34668 2.97837 9.06089 3.01916 8.78481C3.17088 7.75791 5.00419 7.13494 8.6708 5.88901L11.922 4.78426C16.2741 3.30539 18.6426 2.50057 20 3.33922',
  d3: 'M20.4157 3.6611C22.3014 5.52964 19.2843 20.7256 16.1885 20.9933C13.5913 21.218 12.782 16.0957 12.235 14.4721C11.6952 12.8698 11.0944 12.293 9.50531 11.7673C5.46829 10.4317 3.44979 9.76399 3.05015 8.70663C1.99189 5.90673 18.0073 1.27463 20.4157 3.6611Z',
  d4: 'M3.05015 8.70663C3.44979 9.76399 5.46829 10.4317 9.50531 11.7673C10.331 12.0404 10.8898 12.3274 11.312 12.7648L20.4157 3.6611C18.0073 1.27463 1.99189 5.90673 3.05015 8.70663Z',
  d5: 'M21 3L3 8.14286L12.0012 12L15.8588 21L21 3Z',
};

export const IconNavigation03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-03-stroke-rounded IconNavigation03StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconNavigation03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-03-duotone-rounded IconNavigation03DuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconNavigation03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-03-twotone-rounded IconNavigation03TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNavigation03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-03-solid-rounded IconNavigation03SolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNavigation03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-03-bulk-rounded IconNavigation03BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNavigation03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-03-stroke-sharp IconNavigation03StrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNavigation03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-03-solid-sharp IconNavigation03SolidSharp"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNavigation03: TheIconSelfPack = {
  name: 'Navigation03',
  StrokeRounded: IconNavigation03StrokeRounded,
  DuotoneRounded: IconNavigation03DuotoneRounded,
  TwotoneRounded: IconNavigation03TwotoneRounded,
  SolidRounded: IconNavigation03SolidRounded,
  BulkRounded: IconNavigation03BulkRounded,
  StrokeSharp: IconNavigation03StrokeSharp,
  SolidSharp: IconNavigation03SolidSharp,
};