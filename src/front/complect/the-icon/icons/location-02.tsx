import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z',
  d2: 'M12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2',
  d3: 'M2.99714 7.08468C4.52505 3.51303 8.17538 1.25 12.0015 1.25C15.8277 1.25 19.478 3.51303 21.0059 7.08468C22.4261 10.4045 21.6591 13.2362 20.0582 15.6609C18.7304 17.672 16.787 19.4627 15.0391 21.0732L15.0391 21.0732L15.039 21.0732C14.7286 21.3592 14.4243 21.6396 14.1308 21.9144C13.5558 22.4528 12.7919 22.75 12.0015 22.75C11.2112 22.75 10.4473 22.4528 9.87231 21.9145L9.87066 21.9129C9.5601 21.6204 9.23725 21.3218 8.90758 21.0169L8.90742 21.0168C7.17835 19.4178 5.26177 17.6454 3.94771 15.6595C2.34496 13.2373 1.57518 10.4086 2.99714 7.08468Z',
  d4: 'M2.99714 7.08468C4.52505 3.51303 8.17538 1.25 12.0015 1.25V22.75C11.2112 22.75 10.4473 22.4528 9.87231 21.9145L9.87066 21.9129C9.5601 21.6204 9.23725 21.3218 8.90758 21.0169L8.90742 21.0168C7.17835 19.4178 5.26177 17.6454 3.94771 15.6595C2.34496 13.2373 1.57518 10.4086 2.99714 7.08468Z',
  d5: 'M21 11C21 18 12 22 12 22C12 22 3 18 3 11C3 6.02944 7.02944 2 12 2C16.9706 2 21 6.02944 21 11Z',
  d6: 'M11.2779 22.4156C11.0206 22.2874 10.6562 22.0977 10.2203 21.8483C9.35038 21.3505 8.18703 20.6101 7.01986 19.6407C4.71077 17.7227 2.25 14.7912 2.25 10.968C2.25 5.60091 6.61522 1.25 12 1.25C17.3848 1.25 21.75 5.60091 21.75 10.968C21.75 14.7912 19.2892 17.7227 16.9801 19.6407C15.813 20.6101 14.6496 21.3505 13.7797 21.8483C13.3438 22.0977 12.9794 22.2874 12.7221 22.4156L12 22.75L11.2779 22.4156Z',
};

export const IconLocation02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-02-stroke-rounded IconLocation02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLocation02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-02-duotone-rounded IconLocation02DuotoneRounded"
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

export const IconLocation02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-02-twotone-rounded IconLocation02TwotoneRounded"
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

export const IconLocation02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-02-solid-rounded IconLocation02SolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLocation02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-02-bulk-rounded IconLocation02BulkRounded"
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

export const IconLocation02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-02-stroke-sharp IconLocation02StrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLocation02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-02-solid-sharp IconLocation02SolidSharp"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLocation02: TheIconSelfPack = {
  name: 'Location02',
  StrokeRounded: IconLocation02StrokeRounded,
  DuotoneRounded: IconLocation02DuotoneRounded,
  TwotoneRounded: IconLocation02TwotoneRounded,
  SolidRounded: IconLocation02SolidRounded,
  BulkRounded: IconLocation02BulkRounded,
  StrokeSharp: IconLocation02StrokeSharp,
  SolidSharp: IconLocation02SolidSharp,
};