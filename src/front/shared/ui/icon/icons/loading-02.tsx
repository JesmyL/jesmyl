import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18.001 20C16.3295 21.2558 14.2516 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.8634 21.8906 13.7011 21.6849 14.5003C21.4617 15.3673 20.5145 15.77 19.6699 15.4728C18.9519 15.2201 18.6221 14.3997 18.802 13.66C18.9314 13.1279 19 12.572 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C13.3197 19 14.554 18.6348 15.6076 18',
  d2: 'M2 12C2 17.5228 6.47715 22 12 22C14.2516 22 16.3295 21.2558 18.001 20L15.6076 18C14.554 18.6348 13.3197 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 12.572 18.9314 13.1279 18.802 13.66C18.6221 14.3997 18.9519 15.2201 19.6699 15.4728C20.5145 15.77 21.4617 15.3673 21.6849 14.5003C21.8906 13.7011 22 12.8634 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z',
  d3: 'M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.8634 21.8906 13.7011 21.6849 14.5003C21.4617 15.3673 20.5145 15.77 19.6699 15.4728C18.9519 15.2201 18.6221 14.3997 18.802 13.66C18.9314 13.1279 19 12.572 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12',
  d4: 'M2 12C2 17.5228 6.47715 22 12 22C14.2516 22 16.3295 21.2558 18.001 20M5 12C5 15.866 8.13401 19 12 19C13.3197 19 14.554 18.6348 15.6076 18',
  d5: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 12.9269 22.6325 13.8275 22.4112 14.6873C22.0584 16.0577 20.6008 16.5955 19.421 16.1803C18.2539 15.7696 17.8255 14.5016 18.0732 13.4828C18.1886 13.0082 18.25 12.5118 18.25 12C18.25 8.54822 15.4518 5.75 12 5.75C8.54822 5.75 5.75 8.54822 5.75 12C5.75 15.4518 8.54822 18.25 12 18.25C12.8219 18.25 13.605 18.0917 14.3219 17.8047C15.1381 17.4779 16.1746 17.4964 16.9525 18.1464C17.5247 18.6246 17.8116 19.3217 17.7718 20.001C17.7311 20.6933 17.3471 21.3624 16.622 21.7082C15.221 22.3764 13.6531 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d6: 'M5.75 12C5.75 15.4518 8.54822 18.25 12 18.25C12.8219 18.25 13.605 18.0917 14.3219 17.8047C15.1381 17.4779 16.1746 17.4964 16.9525 18.1464C17.5247 18.6246 17.8116 19.3217 17.7718 20.001C17.7311 20.6933 17.3471 21.3624 16.622 21.7082C15.221 22.3764 13.6531 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12H5.75Z',
  d7: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 12.9269 22.6325 13.8275 22.4112 14.6873C22.0584 16.0577 20.6008 16.5955 19.421 16.1803C18.2539 15.7696 17.8255 14.5016 18.0732 13.4828C18.1886 13.0082 18.25 12.5118 18.25 12C18.25 8.54822 15.4518 5.75 12 5.75C8.54822 5.75 5.75 8.54822 5.75 12H1.25Z',
  d8: 'M18.001 20C16.3295 21.2558 14.2516 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.8634 21.8906 13.7011 21.6849 14.5003L18.802 13.66C18.9314 13.1279 19 12.572 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C13.3197 19 14.554 18.6348 15.6076 18',
  d9: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 12.9269 22.6325 13.8275 22.4112 14.6873L18.0732 13.4828C18.1886 13.0082 18.25 12.5118 18.25 12C18.25 8.54822 15.4518 5.75 12 5.75C8.54822 5.75 5.75 8.54822 5.75 12C5.75 15.4518 8.54822 18.25 12 18.25C13.1795 18.25 14.2805 17.924 15.2205 17.3576L18.4515 20.5996C16.6546 21.9497 14.4197 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
};

export const IconLoading02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-02-stroke-rounded IconLoading02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLoading02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-02-duotone-rounded IconLoading02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLoading02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-02-twotone-rounded IconLoading02TwotoneRounded"
    >
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLoading02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-02-solid-rounded IconLoading02SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLoading02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-02-bulk-rounded IconLoading02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLoading02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-02-stroke-sharp IconLoading02StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLoading02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="loading-02-solid-sharp IconLoading02SolidSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLoading02: TheIconSelfPack = {
  name: 'Loading02',
  StrokeRounded: IconLoading02StrokeRounded,
  DuotoneRounded: IconLoading02DuotoneRounded,
  TwotoneRounded: IconLoading02TwotoneRounded,
  SolidRounded: IconLoading02SolidRounded,
  BulkRounded: IconLoading02BulkRounded,
  StrokeSharp: IconLoading02StrokeSharp,
  SolidSharp: IconLoading02SolidSharp,
};