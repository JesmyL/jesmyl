import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 5.5C20 7.433 16.4183 9 12 9C7.58172 9 4 7.433 4 5.5C4 3.567 7.58172 2 12 2C16.4183 2 20 3.567 20 5.5Z',
  d2: 'M20 18.5C20 20.433 16.4183 22 12 22C7.58172 22 4 20.433 4 18.5C4 16.567 7.58172 15 12 15C16.4183 15 20 16.567 20 18.5Z',
  d3: 'M20 18.5V5.5M4 18.5V5.5',
  d4: 'M6.04253 2.33801C7.60557 1.65418 9.71244 1.25 12 1.25C14.2876 1.25 16.3944 1.65418 17.9575 2.33801C18.7379 2.67944 19.4165 3.10535 19.9105 3.61634C20.408 4.13095 20.75 4.7686 20.75 5.5C20.75 6.2314 20.408 6.86905 19.9105 7.38366C19.4165 7.89465 18.7379 8.32056 17.9575 8.66199C16.3944 9.34582 14.2876 9.75 12 9.75C9.71244 9.75 7.60557 9.34582 6.04253 8.66199C5.26212 8.32056 4.58348 7.89465 4.08947 7.38366C3.59196 6.86905 3.25 6.2314 3.25 5.5C3.25 4.7686 3.59196 4.13095 4.08947 3.61634C4.58348 3.10535 5.26212 2.67944 6.04253 2.33801Z',
  d5: 'M6.04253 15.338C7.60557 14.6542 9.71244 14.25 12 14.25C14.2876 14.25 16.3944 14.6542 17.9575 15.338C18.7379 15.6794 19.4165 16.1054 19.9105 16.6163C20.408 17.1309 20.75 17.7686 20.75 18.5C20.75 19.2314 20.408 19.8691 19.9105 20.3837C19.4165 20.8946 18.7379 21.3206 17.9575 21.662C16.3944 22.3458 14.2876 22.75 12 22.75C9.71244 22.75 7.60557 22.3458 6.04253 21.662C5.26212 21.3206 4.58348 20.8946 4.08947 20.3837C3.59196 19.8691 3.25 19.2314 3.25 18.5C3.25 17.7686 3.59196 17.1309 4.08947 16.6163C4.58348 16.1054 5.26212 15.6794 6.04253 15.338Z',
  d6: 'M4.25 4.5C4.80228 4.5 5.25 4.94772 5.25 5.5V18.5C5.25 19.0523 4.80228 19.5 4.25 19.5C3.69772 19.5 3.25 19.0523 3.25 18.5V5.5C3.25 4.94772 3.69772 4.5 4.25 4.5ZM19.75 4.5C20.3023 4.5 20.75 4.94772 20.75 5.5V18.5C20.75 19.0523 20.3023 19.5 19.75 19.5C19.1977 19.5 18.75 19.0523 18.75 18.5V5.5C18.75 4.94772 19.1977 4.5 19.75 4.5Z',
  d7: 'M5.25 5.5V18.5H3.25V5.5H5.25ZM20.75 5.5V18.5H18.75V5.5H20.75Z',
};

export const IconCylinder01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-01-stroke-rounded IconCylinder01StrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCylinder01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-01-duotone-rounded IconCylinder01DuotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCylinder01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-01-twotone-rounded IconCylinder01TwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCylinder01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-01-solid-rounded IconCylinder01SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCylinder01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-01-bulk-rounded IconCylinder01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCylinder01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-01-stroke-sharp IconCylinder01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCylinder01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cylinder-01-solid-sharp IconCylinder01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
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

export const iconPackOfCylinder01: TheIconSelfPack = {
  name: 'Cylinder01',
  StrokeRounded: IconCylinder01StrokeRounded,
  DuotoneRounded: IconCylinder01DuotoneRounded,
  TwotoneRounded: IconCylinder01TwotoneRounded,
  SolidRounded: IconCylinder01SolidRounded,
  BulkRounded: IconCylinder01BulkRounded,
  StrokeSharp: IconCylinder01StrokeSharp,
  SolidSharp: IconCylinder01SolidSharp,
};