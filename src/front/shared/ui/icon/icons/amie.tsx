import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 8.5C3 9.82963 3.47182 11.0491 4.25716 12C3.47182 12.9509 3 14.1704 3 15.5C3 18.5376 5.46243 21 8.5 21C9.82963 21 11.0491 20.5282 12 19.7428C12.9509 20.5282 14.1704 21 15.5 21C18.5376 21 21 18.5376 21 15.5C21 14.1704 20.5282 12.9509 19.7428 12C20.5282 11.0491 21 9.82963 21 8.5C21 5.46243 18.5376 3 15.5 3C14.1704 3 12.9509 3.47182 12 4.25716C11.0491 3.47182 9.82963 3 8.5 3C5.46243 3 3 5.46243 3 8.5Z',
  d2: 'M10.5 9.5C10.5 8.67157 11.1716 8 12 8C12.8284 8 13.5 8.67157 13.5 9.5V14.5C13.5 15.3284 12.8284 16 12 16C11.1716 16 10.5 15.3284 10.5 14.5V9.5Z',
  d3: 'M4.25716 12C3.47182 11.0491 3 9.82963 3 8.5C3 5.46243 5.46243 3 8.5 3C9.82963 3 11.0491 3.47182 12 4.25716C12.9509 3.47182 14.1704 3 15.5 3C18.5376 3 21 5.46243 21 8.5C21 9.82963 20.5282 11.0491 19.7428 12C20.5282 12.9509 21 14.1704 21 15.5C21 18.5376 18.5376 21 15.5 21C14.1704 21 12.9509 20.5282 12 19.7428C11.0491 20.5282 9.82963 21 8.5 21C5.46243 21 3 18.5376 3 15.5C3 14.1704 3.47182 12.9509 4.25716 12ZM12 8C11.1716 8 10.5 8.67157 10.5 9.5V14.5C10.5 15.3284 11.1716 16 12 16C12.8284 16 13.5 15.3284 13.5 14.5V9.5C13.5 8.67157 12.8284 8 12 8Z',
  d4: 'M8.5 2.25C5.04822 2.25 2.25 5.04822 2.25 8.5C2.25 9.79611 2.64523 11.0014 3.32127 12C2.64523 12.9986 2.25 14.2039 2.25 15.5C2.25 18.9518 5.04822 21.75 8.5 21.75C9.79611 21.75 11.0014 21.3548 12 20.6787C12.9986 21.3548 14.2039 21.75 15.5 21.75C18.9518 21.75 21.75 18.9518 21.75 15.5C21.75 14.2039 21.3548 12.9986 20.6787 12C21.3548 11.0014 21.75 9.79611 21.75 8.5C21.75 5.04822 18.9518 2.25 15.5 2.25C14.2039 2.25 12.9986 2.64523 12 3.32127C11.0014 2.64523 9.79611 2.25 8.5 2.25ZM12 7.25C10.7574 7.25 9.75 8.25736 9.75 9.5V14.5C9.75 15.7426 10.7574 16.75 12 16.75C13.2426 16.75 14.25 15.7426 14.25 14.5V9.5C14.25 8.25736 13.2426 7.25 12 7.25Z',
  d5: 'M2.25 8.5C2.25 5.04822 5.04822 2.25 8.5 2.25C9.79611 2.25 11.0014 2.64523 12 3.32127C12.9986 2.64523 14.2039 2.25 15.5 2.25C18.9518 2.25 21.75 5.04822 21.75 8.5C21.75 9.79611 21.3548 11.0014 20.6787 12C21.3548 12.9986 21.75 14.2039 21.75 15.5C21.75 18.9518 18.9518 21.75 15.5 21.75C14.2039 21.75 12.9986 21.3548 12 20.6787C11.0014 21.3548 9.79611 21.75 8.5 21.75C5.04822 21.75 2.25 18.9518 2.25 15.5C2.25 14.2039 2.64523 12.9986 3.32127 12C2.64523 11.0014 2.25 9.79611 2.25 8.5Z',
  d6: 'M9.75 9.5C9.75 8.25736 10.7574 7.25 12 7.25C13.2426 7.25 14.25 8.25736 14.25 9.5V14.5C14.25 15.7426 13.2426 16.75 12 16.75C10.7574 16.75 9.75 15.7426 9.75 14.5V9.5Z',
};

export const IconAmieStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="amie-stroke-rounded IconAmieStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconAmieDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="amie-duotone-rounded IconAmieDuotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAmieTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="amie-twotone-rounded IconAmieTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAmieSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="amie-solid-rounded IconAmieSolidRounded"
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

export const IconAmieBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="amie-bulk-rounded IconAmieBulkRounded"
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

export const IconAmieStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="amie-stroke-sharp IconAmieStrokeSharp"
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

export const IconAmieSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="amie-solid-sharp IconAmieSolidSharp"
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

export const iconPackOfAmie: TheIconSelfPack = {
  name: 'Amie',
  StrokeRounded: IconAmieStrokeRounded,
  DuotoneRounded: IconAmieDuotoneRounded,
  TwotoneRounded: IconAmieTwotoneRounded,
  SolidRounded: IconAmieSolidRounded,
  BulkRounded: IconAmieBulkRounded,
  StrokeSharp: IconAmieStrokeSharp,
  SolidSharp: IconAmieSolidSharp,
};