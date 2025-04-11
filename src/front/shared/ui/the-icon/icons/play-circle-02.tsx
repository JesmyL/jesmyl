import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.95576 15.3862C9.5 15.0791 9.5 14.3195 9.5 12.8002V11.1998C9.5 9.6805 9.5 8.92086 9.95576 8.61382C10.4115 8.30678 11.0348 8.6465 12.2815 9.32594L13.7497 10.1262C15.2499 10.9438 16 11.3526 16 12C16 12.6474 15.2499 13.0562 13.7497 13.8738L12.2815 14.6741C11.0348 15.3535 10.4115 15.6932 9.95576 15.3862Z',
  d3: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z',
  d4: 'M9.95576 15.3862C9.5 15.0791 9.5 14.3195 9.5 12.8002V11.1998C9.5 9.6805 9.5 8.92086 9.95576 8.61382C10.4115 8.30678 11.0348 8.6465 12.2815 9.32594L13.7497 10.1262C15.2499 10.9438 16 11.3526 16 12C16 12.6474 15.2499 13.0562 13.7497 13.8738L12.2815 14.6741C11.0348 15.3535 10.4115 15.6932 9.95576 15.3862Z',
  d5: 'M16.5 12L9.5 8V16L16.5 12Z',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.5 8L16.5 12L9.5 16V8Z',
};

export const IconPlayCircle02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlayCircle02 StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconPlayCircle02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlayCircle02 DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconPlayCircle02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlayCircle02 TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconPlayCircle02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlayCircle02 SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconPlayCircle02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlayCircle02 BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconPlayCircle02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlayCircle02 StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconPlayCircle02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="PlayCircle02 SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPlayCircle02: TheIconSelfPack = [
  'PlayCircle02',
  IconPlayCircle02StrokeRounded,
  IconPlayCircle02DuotoneRounded,
  IconPlayCircle02TwotoneRounded,
  IconPlayCircle02SolidRounded,
  IconPlayCircle02BulkRounded,
  IconPlayCircle02StrokeSharp,
  IconPlayCircle02SolidSharp,
];