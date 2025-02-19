import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19 12C19 13.6569 17.6569 15 16 15C14.3431 15 13 13.6569 13 12C13 10.3431 14.3431 9 16 9C17.6569 9 19 10.3431 19 12Z',
  d2: 'M16 6H8C4.68629 6 2 8.68629 2 12C2 15.3137 4.68629 18 8 18H16C19.3137 18 22 15.3137 22 12C22 8.68629 19.3137 6 16 6Z',
  d3: 'M8 6H16C19.3137 6 22 8.68629 22 12C22 15.3137 19.3137 18 16 18H8C4.68629 18 2 15.3137 2 12C2 8.68629 4.68629 6 8 6ZM16 15C17.6569 15 19 13.6569 19 12C19 10.3431 17.6569 9 16 9C14.3431 9 13 10.3431 13 12C13 13.6569 14.3431 15 16 15Z',
  d4: 'M8 5.25C4.27208 5.25 1.25 8.27208 1.25 12C1.25 15.7279 4.27208 18.75 8 18.75H16C19.7279 18.75 22.75 15.7279 22.75 12C22.75 8.27208 19.7279 5.25 16 5.25H8ZM16 8.25C13.9289 8.25 12.25 9.92893 12.25 12C12.25 14.0711 13.9289 15.75 16 15.75C18.0711 15.75 19.75 14.0711 19.75 12C19.75 9.92893 18.0711 8.25 16 8.25Z',
  d5: 'M1.25 12C1.25 8.27208 4.27208 5.25 8 5.25H16C19.7279 5.25 22.75 8.27208 22.75 12C22.75 15.7279 19.7279 18.75 16 18.75H8C4.27208 18.75 1.25 15.7279 1.25 12Z',
  d6: 'M12.25 12C12.25 9.92893 13.9289 8.25 16 8.25C18.0711 8.25 19.75 9.92893 19.75 12C19.75 14.0711 18.0711 15.75 16 15.75C13.9289 15.75 12.25 14.0711 12.25 12Z',
  d7: 'M22 6H2V18H22V6Z',
  d8: 'M19 9H13V15H19V9Z',
  d9: 'M2 5.25C1.58579 5.25 1.25 5.58579 1.25 6V18C1.25 18.4142 1.58579 18.75 2 18.75H22C22.4142 18.75 22.75 18.4142 22.75 18V6C22.75 5.58579 22.4142 5.25 22 5.25H2ZM19.75 8.25H12.25V15.75H19.75V8.25Z',
};

export const IconToggleOnStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-on-stroke-rounded IconToggleOnStrokeRounded"
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

export const IconToggleOnDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-on-duotone-rounded IconToggleOnDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconToggleOnTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-on-twotone-rounded IconToggleOnTwotoneRounded"
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

export const IconToggleOnSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-on-solid-rounded IconToggleOnSolidRounded"
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

export const IconToggleOnBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-on-bulk-rounded IconToggleOnBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconToggleOnStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-on-stroke-sharp IconToggleOnStrokeSharp"
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
    </TheIconWrapper>
  );
};

export const IconToggleOnSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="toggle-on-solid-sharp IconToggleOnSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfToggleOn: TheIconSelfPack = {
  name: 'ToggleOn',
  StrokeRounded: IconToggleOnStrokeRounded,
  DuotoneRounded: IconToggleOnDuotoneRounded,
  TwotoneRounded: IconToggleOnTwotoneRounded,
  SolidRounded: IconToggleOnSolidRounded,
  BulkRounded: IconToggleOnBulkRounded,
  StrokeSharp: IconToggleOnStrokeSharp,
  SolidSharp: IconToggleOnSolidSharp,
};