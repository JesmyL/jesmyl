import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9 21C10.6569 21 12 19.6569 12 18V15H9C7.34315 15 6 16.3431 6 18C6 19.6569 7.34315 21 9 21Z',
  d2: 'M12 9V15H9C7.34315 15 6 13.6569 6 12C6 10.3431 7.34315 9 9 9H12Z',
  d3: 'M12 3V9H9C7.34315 9 6 7.65685 6 6C6 4.34315 7.34315 3 9 3H12Z',
  d4: 'M12 3V9H15C16.6569 9 18 7.65685 18 6C18 4.34315 16.6569 3 15 3H12Z',
  d5: 'M8.33334 2H15.667C17.508 2 19.0003 3.49238 19.0003 5.33333C19.0003 7.17428 17.508 8.66667 15.667 8.66667L12.0002 8.66683V15.3335L12.0002 18.334C12.0002 20.3591 10.3585 22.0008 8.33333 22.0008C6.49238 22.0008 5 20.5084 5 18.6675C5 16.8265 6.49238 15.3335 8.33333 15.3335C6.49238 15.3335 5 13.8411 5 12.0002C5 10.1592 6.49238 8.66667 8.33333 8.66667C6.49238 8.66667 5 7.17428 5 5.33333C5 3.49238 6.49239 2 8.33334 2Z',
};

export const IconFigmaStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Figma StrokeRounded"
    >
      <circle 
        cx="15"
        cy="12"
        r="3"
        i-c="s sj sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconFigmaDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Figma DuotoneRounded"
    >
      <circle 
        cx="15"
        cy="12"
        r="3"
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <circle 
        cx="15"
        cy="12"
        r="3"
        i-c="s sj sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="f o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconFigmaTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Figma TwotoneRounded"
    >
      <circle 
        cx="15"
        cy="12"
        r="3"
        i-c="o7 s sj sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconFigmaSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Figma SolidRounded"
    >
      <circle 
        cx="15.5"
        cy="12.1641"
        r="3.5"
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconFigmaBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Figma BulkRounded"
    >
      <circle 
        cx="15.5"
        cy="12.1641"
        r="3.5"
        i-c="f o7"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconFigmaStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Figma StrokeSharp"
    >
      <circle 
        cx="15"
        cy="12"
        r="3"
        i-c="s sj sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconFigmaSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Figma SolidSharp"
    >
      <circle 
        cx="15"
        cy="12"
        r="3"
        i-c="f"
      />
      <path 
        d={d.d1}
        i-c="f"
      />
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFigma: TheIconSelfPack = [
  'Figma',
  IconFigmaStrokeRounded,
  IconFigmaDuotoneRounded,
  IconFigmaTwotoneRounded,
  IconFigmaSolidRounded,
  IconFigmaBulkRounded,
  IconFigmaStrokeSharp,
  IconFigmaSolidSharp,
];