import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
  d2: 'M9 12H12.5M9 12V7H12.5C13.8807 7 15 8.11929 15 9.5C15 10.8807 13.8807 12 12.5 12M9 12V17M12.5 12L15 17',
  d3: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9 6.25C8.58579 6.25 8.25 6.58579 8.25 7V17C8.25 17.4142 8.58579 17.75 9 17.75C9.41421 17.75 9.75 17.4142 9.75 17V12.75H12.0365L14.3292 17.3354C14.5144 17.7059 14.9649 17.8561 15.3354 17.6708C15.7059 17.4856 15.8561 17.0351 15.6708 16.6646L13.6153 12.5536C14.8609 12.0985 15.75 10.9031 15.75 9.5C15.75 7.70507 14.2949 6.25 12.5 6.25H9ZM12.5 11.25H9.75V7.75H12.5C13.4665 7.75 14.25 8.5335 14.25 9.5C14.25 10.4665 13.4665 11.25 12.5 11.25Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d5: 'M8.25 7C8.25 6.58579 8.58579 6.25 9 6.25H12.5C14.2949 6.25 15.75 7.70507 15.75 9.5C15.75 10.9031 14.8609 12.0985 13.6153 12.5536L15.6708 16.6646C15.8561 17.0351 15.7059 17.4856 15.3354 17.6708C14.9649 17.8561 14.5144 17.7059 14.3292 17.3354L12.0365 12.75H9.75V17C9.75 17.4142 9.41421 17.75 9 17.75C8.58579 17.75 8.25 17.4142 8.25 17V7ZM9.75 11.25H12.5C13.4665 11.25 14.25 10.4665 14.25 9.5C14.25 8.5335 13.4665 7.75 12.5 7.75H9.75V11.25Z',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9 6.25C8.58579 6.25 8.25 6.58579 8.25 7V17H9.75V12.75H12.0365L14.3292 17.3354L15.6708 16.6646L13.6153 12.5536C14.8609 12.0985 15.75 10.9031 15.75 9.5C15.75 7.70507 14.2949 6.25 12.5 6.25H9ZM12.5 11.25H9.75V7.75H12.5C13.4665 7.75 14.25 8.5335 14.25 9.5C14.25 10.4665 13.4665 11.25 12.5 11.25Z',
};

export const IconRegisteredStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Registered StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRegisteredDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Registered DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRegisteredTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Registered TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRegisteredSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Registered SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconRegisteredBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Registered BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconRegisteredStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Registered StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRegisteredSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Registered SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRegistered: TheIconSelfPack = [
  'Registered',
  IconRegisteredStrokeRounded,
  IconRegisteredDuotoneRounded,
  IconRegisteredTwotoneRounded,
  IconRegisteredSolidRounded,
  IconRegisteredBulkRounded,
  IconRegisteredStrokeSharp,
  IconRegisteredSolidSharp,
];