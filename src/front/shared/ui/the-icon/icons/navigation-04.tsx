import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.7078 8.33055C16.6507 9.26482 15.1422 16.8628 13.5942 16.9967C12.2957 17.109 11.891 14.5478 11.6175 13.7361C11.3476 12.9349 11.0472 12.6465 10.2527 12.3836C8.23415 11.7159 7.22489 11.382 7.02507 10.8533C6.49595 9.45337 14.5036 7.13731 15.7078 8.33055Z',
  d2: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
  d3: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13.5942 16.9967C15.1422 16.8628 16.6507 9.26482 15.7078 8.33055C14.5036 7.13731 6.49595 9.45337 7.02507 10.8533C7.22489 11.382 8.23414 11.7159 10.2526 12.3836C11.0472 12.6465 11.3476 12.9349 11.6175 13.7361C11.6646 13.876 11.7157 14.0678 11.7745 14.2889C12.057 15.3511 12.5194 17.0896 13.5942 16.9967Z',
  d4: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM13.5942 16.9967C15.1422 16.8628 16.6507 9.26482 15.7078 8.33055C14.5036 7.13731 6.49595 9.45337 7.02507 10.8533C7.22489 11.382 8.23414 11.7159 10.2526 12.3836L10.2527 12.3836C11.0472 12.6465 11.3476 12.9349 11.6175 13.7361C11.6646 13.876 11.7157 14.0678 11.7745 14.2889C12.057 15.3511 12.5194 17.0896 13.5942 16.9967Z',
  d5: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d6: 'M16 8L6 10.8571L11.0006 13L13.1438 18L16 8Z',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM6 10.8571L16 8L13.1438 18L11.0006 13L6 10.8571Z',
};

export const IconNavigation04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-04-stroke-rounded IconNavigation04StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconNavigation04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-04-duotone-rounded IconNavigation04DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
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
      />
    </TheIconWrapper>
  );
};

export const IconNavigation04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-04-twotone-rounded IconNavigation04TwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconNavigation04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-04-solid-rounded IconNavigation04SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNavigation04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-04-bulk-rounded IconNavigation04BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNavigation04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-04-stroke-sharp IconNavigation04StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconNavigation04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="navigation-04-solid-sharp IconNavigation04SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNavigation04: TheIconSelfPack = {
  name: 'Navigation04',
  StrokeRounded: IconNavigation04StrokeRounded,
  DuotoneRounded: IconNavigation04DuotoneRounded,
  TwotoneRounded: IconNavigation04TwotoneRounded,
  SolidRounded: IconNavigation04SolidRounded,
  BulkRounded: IconNavigation04BulkRounded,
  StrokeSharp: IconNavigation04StrokeSharp,
  SolidSharp: IconNavigation04SolidSharp,
};