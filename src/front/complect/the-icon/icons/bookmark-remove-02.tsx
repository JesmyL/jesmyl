import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 2C7.22876 2 5.34315 2 4.17157 3.12874C3 4.25748 3 6.07416 3 9.70753V17.9808C3 20.2867 3 21.4396 3.77285 21.8523C5.26947 22.6514 8.0768 19.9852 9.41 19.1824C10.1832 18.7168 10.5698 18.484 11 18.484C11.4302 18.484 11.8168 18.7168 12.59 19.1824C13.9232 19.9852 16.7305 22.6514 18.2272 21.8523C19 21.4396 19 20.2867 19 17.9808V12',
  d2: 'M21 2L14 8.99954M21 9L14 2.00046',
  d3: 'M3 17.9808V9.70753C3 6.07416 3 4.25748 4.17157 3.12874C5.34315 2 7.22876 2 11 2C14.7712 2 16.6569 2 17.8284 3.12874C19 4.25748 19 6.07416 19 9.70753V17.9808C19 20.2867 19 21.4396 18.2272 21.8523C16.7305 22.6514 13.9232 19.9852 12.59 19.1824C11.8168 18.7168 11.4302 18.484 11 18.484C10.5698 18.484 10.1832 18.7168 9.41 19.1824C8.0768 19.9852 5.26947 22.6514 3.77285 21.8523C3 21.4396 3 20.2867 3 17.9808Z',
  d4: 'M21.5821 1.41792C21.9726 1.80845 21.9726 2.44162 21.5821 2.83213L18.789 5.625L21.5821 8.41787C21.9726 8.80838 21.9726 9.44155 21.5821 9.83208C21.1916 10.2226 20.5585 10.2226 20.1679 9.83213L17.3748 7.03917L14.5821 9.83167C14.1915 10.2222 13.5584 10.2222 13.1679 9.83162C12.7774 9.44109 12.7774 8.80792 13.1679 8.41741L15.9605 5.625L13.1679 2.83259C12.7774 2.44208 12.7774 1.80891 13.1679 1.41838C13.5584 1.02784 14.1915 1.02782 14.5821 1.41833L17.3748 4.21083L20.1679 1.41787C20.5585 1.02736 21.1916 1.02738 21.5821 1.41792Z',
  d5: 'M11.3831 1.92387C11.3976 1.7431 11.4049 1.65271 11.3944 1.60743C11.3672 1.48943 11.3084 1.42571 11.1929 1.38906C11.1486 1.375 11.0756 1.375 10.9296 1.375H10.8204C8.9811 1.37499 7.527 1.37498 6.38958 1.52231C5.22212 1.67353 4.27551 1.99172 3.52621 2.71363C2.773 3.43931 2.43743 4.36243 2.27865 5.50025C2.12497 6.6015 2.12499 8.00706 2.12501 9.77443L2.125 18.1708C2.12496 19.2683 2.12493 20.1803 2.23033 20.8655C2.33938 21.5745 2.59357 22.2645 3.29458 22.6389C3.91976 22.9727 4.6074 22.9048 5.19044 22.7278C5.78014 22.5488 6.37954 22.2239 6.92835 21.8771C7.48239 21.527 8.0812 21.0868 8.55354 20.7377C9.01636 20.3956 9.38808 20.1208 9.6719 19.9499C10.0715 19.7093 10.3238 19.5585 10.5283 19.4621C10.717 19.3732 10.8087 19.359 10.875 19.359C10.9413 19.359 11.033 19.3732 11.2217 19.4621C11.4263 19.5585 11.6785 19.7093 12.0781 19.9499C12.3619 20.1208 12.7337 20.3956 13.1965 20.7377C13.6688 21.0868 14.2676 21.527 14.8217 21.8771C15.3705 22.2239 15.9699 22.5488 16.5596 22.7278C17.1426 22.9048 17.8303 22.9727 18.4554 22.6389C19.1564 22.2645 19.4106 21.5745 19.5197 20.8655C19.6251 20.1803 19.625 19.2684 19.625 18.1708V11.637C19.625 11.4779 19.625 11.3983 19.5946 11.3361C19.5643 11.2738 19.4889 11.2149 19.3383 11.0972C19.2582 11.0347 19.181 10.9665 19.1073 10.8928L17.799 9.58464C17.599 9.38466 17.499 9.28467 17.3748 9.28467C17.2505 9.28467 17.1505 9.38466 16.9505 9.58464L15.6427 10.8924C14.6664 11.8686 13.0835 11.8686 12.1072 10.8922C11.1309 9.9159 11.131 8.33299 12.1073 7.35672L13.4148 6.04928C13.6148 5.84927 13.7148 5.74927 13.7148 5.625C13.7148 5.50073 13.6148 5.40073 13.4148 5.20072L12.1073 3.89329C11.5678 3.35381 11.3264 2.6291 11.3831 1.92387Z',
  d6: 'M19 12V22L11 18L3 22V2.05C3 2.02238 3.02239 2 3.05 2H11',
  d7: 'M18.0428 4.04296L20.8359 1.25L22.2501 2.66426L19.4571 5.45713L22.2501 8.25L20.8359 9.66426L18.0428 6.8713L15.2501 9.6638L13.8359 8.24954L16.6285 5.45713L13.8359 2.66472L15.2501 1.25046L18.0428 4.04296Z',
  d8: 'M13.1825 1.25H2.5C2.30109 1.25 2.11032 1.32902 1.96967 1.46967C1.82902 1.61032 1.75 1.80109 1.75 2V22.75L10.5 18.375L19.25 22.75V10.1469L18.0958 8.99277L15.303 11.7853L11.7676 8.2497L14.5601 5.45736L11.7676 2.66502L13.1825 1.25Z',
};

export const IconBookmarkRemove02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-remove-02-stroke-rounded IconBookmarkRemove02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconBookmarkRemove02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-remove-02-duotone-rounded IconBookmarkRemove02DuotoneRounded"
    >
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
    </TheIconWrapper>
  );
};

export const IconBookmarkRemove02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-remove-02-twotone-rounded IconBookmarkRemove02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBookmarkRemove02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-remove-02-solid-rounded IconBookmarkRemove02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconBookmarkRemove02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-remove-02-bulk-rounded IconBookmarkRemove02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconBookmarkRemove02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-remove-02-stroke-sharp IconBookmarkRemove02StrokeSharp"
    >
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBookmarkRemove02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-remove-02-solid-sharp IconBookmarkRemove02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBookmarkRemove02: TheIconSelfPack = {
  name: 'BookmarkRemove02',
  StrokeRounded: IconBookmarkRemove02StrokeRounded,
  DuotoneRounded: IconBookmarkRemove02DuotoneRounded,
  TwotoneRounded: IconBookmarkRemove02TwotoneRounded,
  SolidRounded: IconBookmarkRemove02SolidRounded,
  BulkRounded: IconBookmarkRemove02BulkRounded,
  StrokeSharp: IconBookmarkRemove02StrokeSharp,
  SolidSharp: IconBookmarkRemove02SolidSharp,
};