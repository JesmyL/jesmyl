import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
  d2: 'M6.5 15.9897C6.89898 16.5649 7.38193 17.0746 7.93053 17.5M16.0261 6.5C16.5947 6.94079 17.0928 7.47217 17.5 8.07321',
  d3: 'M14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5C13.3807 14.5 14.5 13.3807 14.5 12Z',
  d4: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z',
  d5: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5ZM16.4857 5.90729C16.1584 5.65351 15.6872 5.71316 15.4335 6.04052C15.1797 6.36788 15.2393 6.839 15.5667 7.09278C16.0723 7.48476 16.5161 7.95795 16.8791 8.4939C17.1115 8.83683 17.5778 8.92649 17.9207 8.69417C18.2637 8.46185 18.3533 7.99552 18.121 7.65259C17.6697 6.98647 17.1173 6.39689 16.4857 5.90729ZM7.11634 15.5623C6.88027 15.2219 6.41299 15.1374 6.07263 15.3734C5.73227 15.6095 5.64772 16.0768 5.88379 16.4172C6.32599 17.0547 6.86168 17.6203 7.47103 18.0927C7.79837 18.3465 8.26949 18.2869 8.5233 17.9596C8.77711 17.6323 8.7175 17.1611 8.39016 16.9073C7.90232 16.5291 7.4721 16.0752 7.11634 15.5623Z',
  d6: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d7: 'M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z',
  d8: 'M15.4335 6.04052C15.6872 5.71316 16.1584 5.65351 16.4857 5.90729C17.1173 6.39689 17.6697 6.98647 18.121 7.65259C18.3533 7.99552 18.2637 8.46185 17.9207 8.69417C17.5778 8.92649 17.1115 8.83683 16.8791 8.4939C16.5161 7.95795 16.0723 7.48476 15.5667 7.09278C15.2393 6.839 15.1797 6.36788 15.4335 6.04052ZM6.07263 15.3734C6.41299 15.1374 6.88027 15.2219 7.11634 15.5623C7.4721 16.0752 7.90232 16.5291 8.39016 16.9073C8.7175 17.1611 8.77711 17.6323 8.5233 17.9596C8.26949 18.2869 7.79837 18.3465 7.47103 18.0927C6.86168 17.6203 6.32599 17.0547 5.88379 16.4172C5.64772 16.0768 5.73227 15.6095 6.07263 15.3734Z',
  d9: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM15.8937 5.44775L16.4864 5.90727C17.1179 6.39687 17.6704 6.98644 18.1217 7.65257L18.5423 8.27349L17.3005 9.1148L16.8798 8.49388C16.5167 7.95793 16.073 7.48474 15.5674 7.09276L14.9746 6.63324L15.8937 5.44775ZM6.68958 14.946L7.11702 15.5623C7.47278 16.0752 7.903 16.529 8.39084 16.9073L8.98355 17.3669L8.06441 18.5523L7.47171 18.0927C6.86236 17.6202 6.32667 17.0547 5.88447 16.4171L5.45703 15.8009L6.68958 14.946ZM12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z',
};

export const IconCdStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Cd StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconCdDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Cd DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconCdTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Cd TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconCdSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Cd SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCdBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Cd BulkRounded"
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

export const IconCdStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Cd StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s ss sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconCdSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Cd SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCd: TheIconSelfPack = [
  'Cd',
  IconCdStrokeRounded,
  IconCdDuotoneRounded,
  IconCdTwotoneRounded,
  IconCdSolidRounded,
  IconCdBulkRounded,
  IconCdStrokeSharp,
  IconCdSolidSharp,
];