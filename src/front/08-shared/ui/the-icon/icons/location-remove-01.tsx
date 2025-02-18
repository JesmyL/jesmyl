import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z',
  d2: 'M15.5 11H8.5',
  d3: 'M12.0015 1.25C8.17538 1.25 4.52505 3.51303 2.99714 7.08468C1.57518 10.4086 2.34496 13.2373 3.94771 15.6595C5.26177 17.6454 7.17835 19.4178 8.90742 21.0168L8.90758 21.0169L8.90824 21.0175C9.23768 21.3222 9.56031 21.6206 9.87066 21.9129L9.87231 21.9145C10.4473 22.4528 11.2112 22.75 12.0015 22.75C12.7919 22.75 13.5558 22.4528 14.1308 21.9144C14.4243 21.6396 14.7286 21.3592 15.039 21.0732L15.0391 21.0732L15.0391 21.0732C16.787 19.4627 18.7304 17.672 20.0582 15.6609C21.6591 13.2362 22.4261 10.4045 21.0059 7.08468C19.478 3.51303 15.8277 1.25 12.0015 1.25ZM8.5 10C7.94772 10 7.5 10.4477 7.5 11C7.5 11.5523 7.94772 12 8.5 12H15.5C16.0523 12 16.5 11.5523 16.5 11C16.5 10.4477 16.0523 10 15.5 10H8.5Z',
  d4: 'M2.99714 7.08468C4.52505 3.51303 8.17538 1.25 12.0015 1.25C15.8277 1.25 19.478 3.51303 21.0059 7.08468C22.4261 10.4045 21.6591 13.2362 20.0582 15.6609C18.7304 17.672 16.787 19.4627 15.0391 21.0732L15.0391 21.0732L15.039 21.0732C14.7286 21.3592 14.4243 21.6396 14.1308 21.9144C13.5558 22.4528 12.7919 22.75 12.0015 22.75C11.2112 22.75 10.4473 22.4528 9.87231 21.9145L9.87066 21.9129C9.5601 21.6204 9.23725 21.3218 8.90758 21.0169L8.90742 21.0168C7.17835 19.4178 5.26177 17.6454 3.94771 15.6595C2.34496 13.2373 1.57518 10.4086 2.99714 7.08468Z',
  d5: 'M7.5 11C7.5 10.4477 7.94772 10 8.5 10H15.5C16.0523 10 16.5 10.4477 16.5 11C16.5 11.5523 16.0523 12 15.5 12H8.5C7.94772 12 7.5 11.5523 7.5 11Z',
  d6: 'M21 11C21 18 12 22 12 22C12 22 3 18 3 11C3 6.02944 7.02944 2 12 2C16.9706 2 21 6.02944 21 11Z',
  d7: 'M16 11H8',
  d8: 'M10.2223 21.8483C10.6581 22.0977 11.0225 22.2874 11.2798 22.4156L12.002 22.75L12.7241 22.4156C12.9814 22.2874 13.3458 22.0977 13.7816 21.8483C14.6516 21.3505 15.8149 20.6101 16.9821 19.6407C19.2912 17.7227 21.752 14.7912 21.752 10.968C21.752 5.60091 17.3867 1.25 12.002 1.25C6.61718 1.25 2.25195 5.60091 2.25195 10.968C2.25195 14.7912 4.71272 17.7227 7.02181 19.6407C8.18898 20.6101 9.35234 21.3505 10.2223 21.8483ZM16.002 10H8.00195V12H16.002V10Z',
};

export const IconLocationRemove01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-remove-01-stroke-rounded IconLocationRemove01StrokeRounded"
    >
      <path 
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

export const IconLocationRemove01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-remove-01-duotone-rounded IconLocationRemove01DuotoneRounded"
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
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLocationRemove01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-remove-01-twotone-rounded IconLocationRemove01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLocationRemove01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-remove-01-solid-rounded IconLocationRemove01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLocationRemove01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-remove-01-bulk-rounded IconLocationRemove01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLocationRemove01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-remove-01-stroke-sharp IconLocationRemove01StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLocationRemove01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-remove-01-solid-sharp IconLocationRemove01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLocationRemove01: TheIconSelfPack = {
  name: 'LocationRemove01',
  StrokeRounded: IconLocationRemove01StrokeRounded,
  DuotoneRounded: IconLocationRemove01DuotoneRounded,
  TwotoneRounded: IconLocationRemove01TwotoneRounded,
  SolidRounded: IconLocationRemove01SolidRounded,
  BulkRounded: IconLocationRemove01BulkRounded,
  StrokeSharp: IconLocationRemove01StrokeSharp,
  SolidSharp: IconLocationRemove01SolidSharp,
};