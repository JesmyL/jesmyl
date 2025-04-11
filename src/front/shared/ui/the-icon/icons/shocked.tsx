import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9 16.9998C9.83563 16.372 10.8744 16 12 16C13.1256 16 14.1644 16.372 15 16.9998',
  d2: 'M10 9.5C10 10.3284 9.32843 11 8.5 11C7.67157 11 7 10.3284 7 9.5C7 8.67157 7.67157 8 8.5 8C9.32843 8 10 8.67157 10 9.5Z',
  d3: 'M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z',
  d4: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11ZM15.5 11C16.3284 11 17 10.3284 17 9.5C17 8.67157 16.3284 8 15.5 8C14.6716 8 14 8.67157 14 9.5C14 10.3284 14.6716 11 15.5 11Z',
  d5: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM8.54954 16.4002C9.5106 15.6782 10.7064 15.25 12 15.25C13.2937 15.25 14.4895 15.6782 15.4505 16.4002C15.7817 16.649 15.8485 17.1192 15.5997 17.4503C15.3509 17.7815 14.8807 17.8483 14.5495 17.5995C13.8393 17.0659 12.9577 16.75 12 16.75C11.0424 16.75 10.1607 17.0659 9.45054 17.5995C9.11938 17.8483 8.64922 17.7815 8.40042 17.4503C8.15161 17.1192 8.21838 16.649 8.54954 16.4002ZM7.75 9.5C7.75 9.08579 8.08579 8.75 8.5 8.75C8.91421 8.75 9.25 9.08579 9.25 9.5C9.25 9.91421 8.91421 10.25 8.5 10.25C8.08579 10.25 7.75 9.91421 7.75 9.5ZM8.5 7.25C7.25736 7.25 6.25 8.25736 6.25 9.5C6.25 10.7426 7.25736 11.75 8.5 11.75C9.74264 11.75 10.75 10.7426 10.75 9.5C10.75 8.25736 9.74264 7.25 8.5 7.25ZM14.75 9.5C14.75 9.08579 15.0858 8.75 15.5 8.75C15.9142 8.75 16.25 9.08579 16.25 9.5C16.25 9.91421 15.9142 10.25 15.5 10.25C15.0858 10.25 14.75 9.91421 14.75 9.5ZM15.5 7.25C14.2574 7.25 13.25 8.25736 13.25 9.5C13.25 10.7426 14.2574 11.75 15.5 11.75C16.7426 11.75 17.75 10.7426 17.75 9.5C17.75 8.25736 16.7426 7.25 15.5 7.25Z',
  d6: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d7: 'M8.54954 16.4002C9.5106 15.6782 10.7064 15.25 12 15.25C13.2937 15.25 14.4895 15.6782 15.4505 16.4002C15.7817 16.649 15.8485 17.1192 15.5997 17.4503C15.3509 17.7815 14.8807 17.8483 14.5495 17.5995C13.8393 17.0659 12.9577 16.75 12 16.75C11.0424 16.75 10.1607 17.0659 9.45054 17.5995C9.11938 17.8483 8.64922 17.7815 8.40042 17.4503C8.15161 17.1192 8.21838 16.649 8.54954 16.4002Z',
  d8: 'M8.5 8.75C8.08579 8.75 7.75 9.08579 7.75 9.5C7.75 9.91421 8.08579 10.25 8.5 10.25C8.91421 10.25 9.25 9.91421 9.25 9.5C9.25 9.08579 8.91421 8.75 8.5 8.75ZM6.25 9.5C6.25 8.25736 7.25736 7.25 8.5 7.25C9.74264 7.25 10.75 8.25736 10.75 9.5C10.75 10.7426 9.74264 11.75 8.5 11.75C7.25736 11.75 6.25 10.7426 6.25 9.5ZM15.5 8.75C15.0858 8.75 14.75 9.08579 14.75 9.5C14.75 9.91421 15.0858 10.25 15.5 10.25C15.9142 10.25 16.25 9.91421 16.25 9.5C16.25 9.08579 15.9142 8.75 15.5 8.75ZM13.25 9.5C13.25 8.25736 14.2574 7.25 15.5 7.25C16.7426 7.25 17.75 8.25736 17.75 9.5C17.75 10.7426 16.7426 11.75 15.5 11.75C14.2574 11.75 13.25 10.7426 13.25 9.5Z',
  d9: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM8.54883 16.4002C9.50988 15.6782 10.7057 15.25 11.9993 15.25C13.293 15.25 14.4888 15.6782 15.4498 16.4002L14.5488 17.5995C13.8386 17.0659 12.9569 16.75 11.9993 16.75C11.0417 16.75 10.16 17.0659 9.44983 17.5995L8.54883 16.4002ZM7.75 9.5C7.75 9.08579 8.08579 8.75 8.5 8.75C8.91421 8.75 9.25 9.08579 9.25 9.5C9.25 9.91421 8.91421 10.25 8.5 10.25C8.08579 10.25 7.75 9.91421 7.75 9.5ZM8.5 7.25C7.25736 7.25 6.25 8.25736 6.25 9.5C6.25 10.7426 7.25736 11.75 8.5 11.75C9.74264 11.75 10.75 10.7426 10.75 9.5C10.75 8.25736 9.74264 7.25 8.5 7.25ZM14.75 9.5C14.75 9.08579 15.0858 8.75 15.5 8.75C15.9142 8.75 16.25 9.08579 16.25 9.5C16.25 9.91421 15.9142 10.25 15.5 10.25C15.0858 10.25 14.75 9.91421 14.75 9.5ZM15.5 7.25C14.2574 7.25 13.25 8.25736 13.25 9.5C13.25 10.7426 14.2574 11.75 15.5 11.75C16.7426 11.75 17.75 10.7426 17.75 9.5C17.75 8.25736 16.7426 7.25 15.5 7.25Z',
};

export const IconShockedStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Shocked StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconShockedDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Shocked DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconShockedTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Shocked TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <g    i-c="o7">
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconShockedSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Shocked SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconShockedBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Shocked BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconShockedStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Shocked StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconShockedSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Shocked SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfShocked: TheIconSelfPack = [
  'Shocked',
  IconShockedStrokeRounded,
  IconShockedDuotoneRounded,
  IconShockedTwotoneRounded,
  IconShockedSolidRounded,
  IconShockedBulkRounded,
  IconShockedStrokeSharp,
  IconShockedSolidSharp,
];