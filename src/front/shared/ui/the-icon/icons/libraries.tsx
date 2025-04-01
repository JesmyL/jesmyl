import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.5 17.5V6.5C7.5 5.56538 7.5 5.09808 7.29904 4.75C7.16739 4.52197 6.97803 4.33261 6.75 4.20096C6.40192 4 5.93462 4 5 4C4.06538 4 3.59808 4 3.25 4.20096C3.02197 4.33261 2.83261 4.52197 2.70096 4.75C2.5 5.09808 2.5 5.56538 2.5 6.5V17.5C2.5 18.4346 2.5 18.9019 2.70096 19.25C2.83261 19.478 3.02197 19.6674 3.25 19.799C3.59808 20 4.06538 20 5 20C5.93462 20 6.40192 20 6.75 19.799C6.97803 19.6674 7.16739 19.478 7.29904 19.25C7.5 18.9019 7.5 18.4346 7.5 17.5Z',
  d2: 'M12.5 17.5V9.5C12.5 8.56538 12.5 8.09808 12.299 7.75C12.1674 7.52197 11.978 7.33261 11.75 7.20096C11.4019 7 10.9346 7 10 7C9.06538 7 8.59808 7 8.25 7.20096C8.02197 7.33261 7.83261 7.52197 7.70096 7.75C7.5 8.09808 7.5 8.56538 7.5 9.5V17.5C7.5 18.4346 7.5 18.9019 7.70096 19.25C7.83261 19.478 8.02197 19.6674 8.25 19.799C8.59808 20 9.06538 20 10 20C10.9346 20 11.4019 20 11.75 19.799C11.978 19.6674 12.1674 19.478 12.299 19.25C12.5 18.9019 12.5 18.4346 12.5 17.5Z',
  d3: 'M18.6795 9.78092C18.3599 8.90175 18.2 8.46217 17.8919 8.20363C17.6902 8.03442 17.4476 7.92127 17.1883 7.87555C16.7922 7.80568 16.3527 7.9658 15.4738 8.28605C14.5959 8.60591 14.157 8.76584 13.8987 9.07376C13.7297 9.2753 13.6166 9.51773 13.5709 9.77675C13.501 10.1725 13.6606 10.6116 13.9799 11.4896L16.3754 18.0781C16.6951 18.9573 16.8549 19.3969 17.163 19.6554C17.3647 19.8246 17.6074 19.9378 17.8666 19.9835C18.2627 20.0534 18.7022 19.8933 19.5812 19.573C20.4591 19.2532 20.898 19.0932 21.1562 18.7853C21.3252 18.5838 21.4383 18.3413 21.484 18.0823C21.5539 17.6866 21.3943 17.2475 21.075 16.3694L18.6795 9.78092Z',
  d4: 'M13.5 17.5V9.5C13.5 8.56538 13.5 8.09808 13.299 7.75C13.1674 7.52197 12.978 7.33261 12.75 7.20096C12.4019 7 11.9346 7 11 7C10.0654 7 9.59808 7 9.25 7.20096C9.02197 7.33261 8.83261 7.52197 8.70096 7.75C8.5 8.09808 8.5 8.56538 8.5 9.5V17.5C8.5 18.4346 8.5 18.9019 8.70096 19.25C8.83261 19.478 9.02197 19.6674 9.25 19.799C9.59808 20 10.0654 20 11 20C11.9346 20 12.4019 20 12.75 19.799C12.978 19.6674 13.1674 19.478 13.299 19.25C13.5 18.9019 13.5 18.4346 13.5 17.5Z',
  d5: 'M19.6795 9.78092C19.3599 8.90175 19.2 8.46217 18.8919 8.20363C18.6902 8.03442 18.4476 7.92127 18.1883 7.87555C17.7922 7.80568 17.3527 7.9658 16.4738 8.28605C15.5959 8.60591 15.157 8.76584 14.8987 9.07376C14.7297 9.2753 14.6166 9.51773 14.5709 9.77675C14.501 10.1725 14.6606 10.6116 14.9799 11.4896L17.3754 18.0781C17.6951 18.9573 17.8549 19.3969 18.163 19.6554C18.3647 19.8246 18.6074 19.9378 18.8666 19.9835C19.2627 20.0534 19.7022 19.8933 20.5812 19.573C21.4591 19.2532 21.898 19.0932 22.1562 18.7853C22.3252 18.5838 22.4383 18.3413 22.484 18.0823C22.5539 17.6866 22.3943 17.2475 22.075 16.3694L19.6795 9.78092Z',
  d6: 'M7 4H2V20H7V4Z',
  d7: 'M12 7H7V20H12V7Z',
  d8: 'M17.8957 7L13.1973 8.71189L17.3015 20L22 18.2881L17.8957 7Z',
  d9: 'M13 7H8V20H13V7Z',
  d10: 'M14 10.9197V8.41941L17.8957 7L22 18.2881L17.3015 20L14 10.9197Z',
};

export const IconLibrariesStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="libraries-stroke-rounded IconLibrariesStrokeRounded"
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

export const IconLibrariesDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="libraries-duotone-rounded IconLibrariesDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
    </TheIconWrapper>
  );
};

export const IconLibrariesTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="libraries-twotone-rounded IconLibrariesTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
    </TheIconWrapper>
  );
};

export const IconLibrariesSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="libraries-solid-rounded IconLibrariesSolidRounded"
    >
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLibrariesBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="libraries-bulk-rounded IconLibrariesBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLibrariesStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="libraries-stroke-sharp IconLibrariesStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLibrariesSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="libraries-solid-sharp IconLibrariesSolidSharp"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLibraries: TheIconSelfPack = {
  name: 'Libraries',
  StrokeRounded: IconLibrariesStrokeRounded,
  DuotoneRounded: IconLibrariesDuotoneRounded,
  TwotoneRounded: IconLibrariesTwotoneRounded,
  SolidRounded: IconLibrariesSolidRounded,
  BulkRounded: IconLibrariesBulkRounded,
  StrokeSharp: IconLibrariesStrokeSharp,
  SolidSharp: IconLibrariesSolidSharp,
};